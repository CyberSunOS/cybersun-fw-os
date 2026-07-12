#!/usr/bin/env node
// SeedFW enforcement hook (PreToolUse / Edit|Write).
// Golden Rule: never manually edit package.json dependencies — use the package manager.
// Blocks Edit/Write calls that add or change dependency version lines in package.json.
// Escape hatch: SEEDFW_SKIP_HOOKS=1

import fs from 'fs';

const input = JSON.parse(fs.readFileSync(0, 'utf-8') || '{}');
if (process.env.SEEDFW_SKIP_HOOKS === '1') process.exit(0);

const filePath = input.tool_input?.file_path || '';
if (!/(^|\/)package\.json$/.test(filePath)) process.exit(0);

// Creating a brand-new package.json (project scaffolding) is allowed.
if (input.tool_input?.content !== undefined && !fs.existsSync(filePath)) process.exit(0);

const newText = input.tool_input?.new_string ?? input.tool_input?.content ?? '';
const oldText = input.tool_input?.old_string ?? '';

// Dependency lines look like  "name": "^1.2.3"  (semver-ish specifier)
const depLine = /"[^"]+"\s*:\s*"(?:[~^><=]|\d|latest|workspace:|file:|git\+|github:)[^"]*"/g;
const notADep = /^"(version|packageManager|engines?|node|npm|pnpm|yarn)"/;
const newDeps = new Set((newText.match(depLine) || []).filter(d => !notADep.test(d)));
const oldDeps = new Set((oldText.match(depLine) || []).filter(d => !notADep.test(d)));
const added = [...newDeps].filter(d => !oldDeps.has(d));

// Ignore edits that clearly aren't inside dependency blocks (e.g. scripts, engines)
const touchesDepBlock = /"(dependencies|devDependencies|peerDependencies|optionalDependencies)"/.test(newText + oldText);
const isFullWrite = input.tool_input?.content !== undefined;

if (added.length > 0 && (touchesDepBlock || isFullWrite)) {
  process.stderr.write(
    'SeedFW gate BLOCKED this edit: it adds/changes dependency versions in package.json by hand. ' +
    'Golden Rule: use the package manager instead (`pnpm add <pkg>` / `npm install <pkg>` / `pnpm add -D <pkg>`), ' +
    'which resolves versions and updates the lock file. ' +
    'Non-dependency edits (scripts, metadata) are allowed — split them from dependency changes. ' +
    `Detected: ${added.slice(0, 3).join(', ')}`
  );
  process.exit(2);
}

process.exit(0);
