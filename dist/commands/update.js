import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import ora from 'ora';
import { MANIFEST_FILE, buildManifest, collectFrameworkFiles, hashFile, readManifest, writeManifest } from '../lib/manifest.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Command files deleted/renamed by the v2 consolidation (62 -> 37).
// Lets update clean up installs that predate the manifest.
const OBSOLETE_FILES = [
    'onboarding-seedfw.md', 'prime-context-seedfw.md', 'prime-core.md'
].map(f => `.claude/commands/00-context-loading/${f}`).concat([
    'TS-create-base-prp.md', 'create-base-prp-parallel.md', 'create-planning-parallel.md',
    'parallel-prp-creation.md', 'prp-base-create.md', 'prp-core-create.md',
    'prp-planning-create.md', 'prp-story-create.md', 'prp-story-seedfw.md',
    'prp-task-create.md', 'prp-task-seedfw.md', 'prp-ts-create.md'
].map(f => `.claude/commands/02-prp-creation/${f}`)).concat([
    'TS-execute-base-prp.md', 'prp-base-execute.md', 'prp-core-execute.md', 'prp-ts-execute.md'
].map(f => `.claude/commands/04-execution/${f}`)).concat([
    'TS-review-general.md', 'TS-review-staged-unstaged.md', 'code-review-seedfw.md',
    'prp-core-review.md', 'prp-validate.md', 'review-general.md', 'review-staged-unstaged.md'
].map(f => `.claude/commands/05-validation/${f}`)).concat([
    'conflict-resolver-general.md', 'conflict-resolver-specific.md', 'new-dev-branch.md',
    'prp-core-commit.md', 'prp-core-new-branch.md', 'prp-core-pr.md',
    'smart-commit.md', 'smart-resolver.md'
].map(f => `.claude/commands/06-git-operations/${f}`)).concat([
    'debug-RCA.md', 'debug-rca-seedfw.md', 'refactor-seedfw.md', 'refactor-simple.md'
].map(f => `.claude/commands/07-utilities/${f}`));
export async function updateCommand(options) {
    const cwd = process.cwd();
    const packageRoot = path.resolve(__dirname, '..', '..');
    const pkg = await fs.readJson(path.join(packageRoot, 'package.json'));
    if (!await fs.pathExists(path.join(cwd, '.claude'))) {
        console.error(chalk.red('❌ SeedFW is not initialized in this directory'));
        console.log(chalk.yellow('\n💡 Run: ') + chalk.cyan('seedfw init'));
        process.exit(1);
    }
    const spinner = ora('Comparing installed framework with package...').start();
    const manifest = await readManifest(cwd);
    const packageFiles = await collectFrameworkFiles(packageRoot);
    const added = [];
    const updated = [];
    const skippedModified = [];
    const removed = [];
    const skippedObsolete = [];
    let unchanged = 0;
    // New and changed files
    for (const rel of packageFiles) {
        const pkgHash = await hashFile(path.join(packageRoot, rel));
        const projectPath = path.join(cwd, rel);
        if (!await fs.pathExists(projectPath)) {
            added.push(rel);
            continue;
        }
        const projectHash = await hashFile(projectPath);
        if (projectHash === pkgHash) {
            unchanged++;
            continue;
        }
        // Differs. Overwrite only if the installed copy is pristine
        // (matches the manifest hash) or --force is given.
        const pristine = manifest?.files[rel] === projectHash;
        if (pristine || options.force) {
            updated.push(rel);
        }
        else {
            skippedModified.push(rel);
        }
    }
    // Files removed upstream: tracked by manifest, or on the known-obsolete list
    const candidates = new Set([
        ...(manifest ? Object.keys(manifest.files) : []),
        ...OBSOLETE_FILES
    ]);
    for (const rel of candidates) {
        if (packageFiles.includes(rel))
            continue;
        const projectPath = path.join(cwd, rel);
        if (!await fs.pathExists(projectPath))
            continue;
        const projectHash = await hashFile(projectPath);
        const pristine = manifest?.files[rel] === projectHash;
        const knownObsolete = OBSOLETE_FILES.includes(rel);
        if (pristine || options.force || (knownObsolete && !manifest)) {
            removed.push(rel);
        }
        else {
            skippedObsolete.push(rel);
        }
    }
    spinner.stop();
    const changes = added.length + updated.length + removed.length;
    if (changes === 0 && skippedModified.length === 0 && skippedObsolete.length === 0) {
        console.log(chalk.green('✅ Already up to date') +
            chalk.gray(` (seedfw ${pkg.version}, ${unchanged} files verified)`));
        return;
    }
    console.log(chalk.bold(`\n📦 SeedFW update → ${pkg.version}\n`));
    const printList = (label, color, files) => {
        if (files.length === 0)
            return;
        console.log(color(label));
        for (const f of files)
            console.log(color(`  ${f}`));
        console.log();
    };
    printList(`+ ${added.length} new`, chalk.green, added);
    printList(`~ ${updated.length} updated`, chalk.cyan, updated);
    printList(`- ${removed.length} removed (obsolete upstream)`, chalk.yellow, removed);
    printList(`! ${skippedModified.length} locally modified — skipped (use --force to overwrite)`, chalk.red, skippedModified);
    printList(`! ${skippedObsolete.length} obsolete but locally modified — kept (use --force to remove)`, chalk.red, skippedObsolete);
    if (options.dryRun) {
        console.log(chalk.gray('Dry run — no files were changed.'));
        return;
    }
    const applySpinner = ora('Applying update...').start();
    try {
        for (const rel of [...added, ...updated]) {
            await fs.copy(path.join(packageRoot, rel), path.join(cwd, rel));
        }
        for (const rel of removed) {
            await fs.remove(path.join(cwd, rel));
        }
        // Record the PACKAGE's hashes, not the project's: locally modified
        // files must keep mismatching the manifest so future updates continue
        // to protect them instead of treating them as pristine.
        await writeManifest(cwd, await buildManifest(packageRoot, pkg.version));
        applySpinner.succeed(chalk.green(`✅ Updated: ${added.length} added, ${updated.length} updated, ${removed.length} removed`));
        if (skippedModified.length > 0 || skippedObsolete.length > 0) {
            console.log(chalk.yellow(`\n⚠️  ${skippedModified.length + skippedObsolete.length} locally modified file(s) left untouched.`));
            console.log(chalk.gray('   Re-run with --force to overwrite them with package versions.'));
        }
        console.log(chalk.gray(`\n${MANIFEST_FILE} refreshed.`));
    }
    catch (error) {
        applySpinner.fail('Update failed');
        console.error(chalk.red('\n❌ Error:'), error);
        process.exit(1);
    }
}
//# sourceMappingURL=update.js.map