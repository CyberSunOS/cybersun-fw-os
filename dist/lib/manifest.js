import fs from 'fs-extra';
import path from 'path';
import crypto from 'crypto';
import { glob } from 'glob';
export const MANIFEST_FILE = '.seedfw-manifest.json';
// Framework-owned paths: init copies them, update may overwrite them.
// TECH_STACK.md, project.md.template and CLAUDE.md are user-owned after
// init seeds them, so they are deliberately NOT tracked here.
const FRAMEWORK_DIRS = ['.claude', 'docs', 'PRPs/templates'];
const FRAMEWORK_FILES = ['AGENTS.md'];
export function hashContent(content) {
    return crypto.createHash('md5').update(content).digest('hex');
}
export async function hashFile(filePath) {
    return hashContent(await fs.readFile(filePath));
}
/** List framework-owned files under root, as relative paths. */
export async function collectFrameworkFiles(root) {
    const files = [];
    for (const dir of FRAMEWORK_DIRS) {
        if (await fs.pathExists(path.join(root, dir))) {
            const found = await glob('**/*', { cwd: path.join(root, dir), nodir: true });
            files.push(...found.map(f => path.join(dir, f)));
        }
    }
    for (const file of FRAMEWORK_FILES) {
        if (await fs.pathExists(path.join(root, file))) {
            files.push(file);
        }
    }
    return files.sort();
}
/** Build a manifest describing the framework files currently under root. */
export async function buildManifest(root, version) {
    const manifest = { seedfwVersion: version, files: {} };
    for (const rel of await collectFrameworkFiles(root)) {
        manifest.files[rel] = await hashFile(path.join(root, rel));
    }
    return manifest;
}
export async function writeManifest(root, manifest) {
    await fs.writeFile(path.join(root, MANIFEST_FILE), JSON.stringify(manifest, null, 2) + '\n');
}
export async function readManifest(root) {
    const file = path.join(root, MANIFEST_FILE);
    if (!await fs.pathExists(file))
        return null;
    try {
        return JSON.parse(await fs.readFile(file, 'utf-8'));
    }
    catch {
        return null;
    }
}
//# sourceMappingURL=manifest.js.map