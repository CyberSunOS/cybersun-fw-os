#!/usr/bin/env node
// SeedFW enforcement hook (PostToolUse / Edit|Write).
// Golden Rule: source files under 500 lines. Warns the agent (non-destructive:
// the edit has already happened) so it splits the file now, not never.

import fs from 'fs';

const input = JSON.parse(fs.readFileSync(0, 'utf-8') || '{}');
if (process.env.SEEDFW_SKIP_HOOKS === '1') process.exit(0);

const filePath = input.tool_input?.file_path || '';
const SOURCE_EXT = /\.(ts|tsx|js|jsx|mjs|cjs|py|go|rs|java|rb|php|swift|kt|c|cc|cpp|h|hpp|cs|vue|svelte|astro)$/;
if (!SOURCE_EXT.test(filePath)) process.exit(0);

let lines = 0;
try { lines = fs.readFileSync(filePath, 'utf-8').split('\n').length; } catch { process.exit(0); }

if (lines > 500) {
  process.stderr.write(
    `SeedFW golden rule: ${filePath} is now ${lines} lines (limit: 500). ` +
    'Split it into smaller modules before continuing — by responsibility, following the vertical-slice layout ' +
    '(see docs/VERTICAL_SLICE_ARCHITECTURE.md). Do not defer this.'
  );
  process.exit(2); // PostToolUse: feeds the warning back to the agent
}

process.exit(0);
