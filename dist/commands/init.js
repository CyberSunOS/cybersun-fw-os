import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import ora from 'ora';
import { buildManifest, writeManifest, MANIFEST_FILE } from '../lib/manifest.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export async function initCommand(options) {
    const spinner = ora('Initializing SeedFW...').start();
    try {
        const cwd = process.cwd();
        // Get the package root (where .claude, docs, etc. are located)
        const packageRoot = path.resolve(__dirname, '..', '..');
        // Check if already initialized
        if (await fs.pathExists(path.join(cwd, '.claude'))) {
            spinner.fail('SeedFW is already initialized in this directory');
            console.log(chalk.yellow('\n💡 Tip: Use "seedfw list" to see available commands'));
            return;
        }
        // Copy .claude/commands
        spinner.text = 'Copying commands...';
        await fs.copy(path.join(packageRoot, '.claude'), path.join(cwd, '.claude'));
        // Copy docs
        spinner.text = 'Copying documentation...';
        await fs.copy(path.join(packageRoot, 'docs'), path.join(cwd, 'docs'));
        // Copy PRP templates (referenced by the prp-creation commands)
        spinner.text = 'Copying PRP templates...';
        await fs.copy(path.join(packageRoot, 'PRPs', 'templates'), path.join(cwd, 'PRPs', 'templates'));
        // Create spec directories
        spinner.text = 'Creating spec structure...';
        await fs.ensureDir(path.join(cwd, 'spec', 'current'));
        await fs.ensureDir(path.join(cwd, 'spec', 'proposals'));
        // Create README in spec
        await fs.writeFile(path.join(cwd, 'spec', 'README.md'), `# Spec Workflow

## Two-Folder Model

- **current/** - Current truth (what IS built)
- **proposals/** - Proposed changes (what SHOULD change)

## Workflow

1. Draft a proposal in \`proposals/\`
2. Review and align with team
3. Implement the changes
4. Archive the proposal and update \`current/\`

See \`docs/WORKFLOW.md\` for details.

_Spec workflow inspired by OpenSpec (Fission AI)._
`);
        // Copy TECH_STACK.md
        spinner.text = 'Creating TECH_STACK.md...';
        await fs.copy(path.join(packageRoot, 'TECH_STACK.md'), path.join(cwd, 'TECH_STACK.md'));
        // Copy project.md.template
        spinner.text = 'Creating project.md template...';
        await fs.copy(path.join(packageRoot, 'project.md.template'), path.join(cwd, 'project.md.template'));
        // Copy AGENTS.md
        spinner.text = 'Creating AGENTS.md...';
        await fs.copy(path.join(packageRoot, 'AGENTS.md'), path.join(cwd, 'AGENTS.md'));
        // Create CLAUDE.md so Claude Code auto-loads the SeedFW workflow
        // (Claude Code reads CLAUDE.md, not AGENTS.md). Never overwrite an
        // existing one — the project may already have its own instructions.
        spinner.text = 'Creating CLAUDE.md...';
        const claudeMdPath = path.join(cwd, 'CLAUDE.md');
        if (!await fs.pathExists(claudeMdPath)) {
            await fs.writeFile(claudeMdPath, `# Project Instructions

This project uses the SeedFW AI-assisted development framework.

**Read and follow \`AGENTS.md\`** — it defines the workflow, commands, and
rules for working in this codebase.

Quick reference:
- New feature? Start with \`/intent-translator\`, then \`/create-prp\` → \`/create-plan\` → \`/execute-plan\` → \`/validate\`
- Small task (30 min - 2 h)? Use \`/prp-task\`
- Standards live in \`docs/GOLDEN_RULES.md\`; tech choices in \`TECH_STACK.md\`
`);
        }
        // Record what was installed so `seedfw update` can distinguish
        // framework files from local modifications later.
        spinner.text = 'Writing manifest...';
        const pkg = await fs.readJson(path.join(packageRoot, 'package.json'));
        await writeManifest(cwd, await buildManifest(cwd, pkg.version));
        // Initialize git (unless skipped)
        if (!options.skipGit) {
            spinner.text = 'Initializing git...';
            const { execSync } = await import('child_process');
            try {
                execSync('git rev-parse --git-dir', { stdio: 'ignore' });
                // Already a git repo
            }
            catch {
                execSync('git init', { cwd, stdio: 'ignore' });
            }
        }
        spinner.succeed(chalk.green('✅ SeedFW initialized successfully!'));
        // Print summary
        console.log(chalk.bold('\n📦 Created:'));
        console.log(chalk.cyan('  .claude/commands/     ') + chalk.gray('(37 commands)'));
        console.log(chalk.cyan('  docs/                 ') + chalk.gray('(documentation)'));
        console.log(chalk.cyan('  spec/                 ') + chalk.gray('(current and proposals)'));
        console.log(chalk.cyan('  PRPs/templates/       ') + chalk.gray('(PRP templates)'));
        console.log(chalk.cyan('  TECH_STACK.md         ') + chalk.gray('(tech stack template)'));
        console.log(chalk.cyan('  project.md.template   ') + chalk.gray('(project conventions)'));
        console.log(chalk.cyan('  AGENTS.md             ') + chalk.gray('(AI instructions)'));
        console.log(chalk.cyan('  CLAUDE.md             ') + chalk.gray('(Claude Code entry point)'));
        console.log(chalk.cyan(`  ${MANIFEST_FILE}  `) + chalk.gray('(for seedfw update)'));
        console.log(chalk.bold('\n🤖 Next: Open Your AI Assistant'));
        console.log(chalk.green('  ✨ The AI will automatically start asking you questions!'));
        console.log(chalk.gray('     (It reads AGENTS.md and starts the Intent Translator workflow)'));
        console.log('');
        console.log(chalk.yellow('  1. ') + 'Open your AI assistant (Augment, Claude, Cursor, etc.)');
        console.log(chalk.yellow('  2. ') + 'The AI will greet you and start asking questions');
        console.log(chalk.yellow('  3. ') + 'Answer the questions - the AI will guide you through everything');
        console.log('');
        console.log(chalk.gray('  💡 No need to type commands or fill files manually!'));
        console.log(chalk.gray('     The AI will ask about your tech stack and create everything for you.'));
        console.log(chalk.bold('\n📚 Documentation (Optional):'));
        console.log(chalk.cyan('  AGENTS.md             ') + chalk.gray('- AI workflow (auto-loaded)'));
        console.log(chalk.cyan('  docs/COMMAND_GUIDE.md ') + chalk.gray('- All commands'));
        console.log(chalk.cyan('  docs/GOLDEN_RULES.md  ') + chalk.gray('- Dev standards'));
        console.log(chalk.bold('\n🚀 Ready! Open your AI assistant now!'));
    }
    catch (error) {
        spinner.fail('Failed to initialize SeedFW');
        console.error(chalk.red('\n❌ Error:'), error);
        process.exit(1);
    }
}
//# sourceMappingURL=init.js.map