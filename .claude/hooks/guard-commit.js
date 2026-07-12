#!/usr/bin/env node
// SeedFW enforcement hook (PreToolUse / Bash).
// Golden Rule #1: build test is mandatory before every commit.
// Golden Rule: no secrets in code or git.
// Blocks `git commit` when the build fails or staged changes contain secrets.
// Escape hatch: SEEDFW_SKIP_HOOKS=1

import { execSync } from 'child_process';
import fs from 'fs';

const input = JSON.parse(fs.readFileSync(0, 'utf-8') || '{}');
const command = input.tool_input?.command || '';

if (process.env.SEEDFW_SKIP_HOOKS === '1') process.exit(0);
if (input.tool_name !== 'Bash') process.exit(0);
if (!/\bgit\b[^&;|]*\bcommit\b/.test(command)) process.exit(0);

const block = (msg) => { process.stderr.write(msg); process.exit(2); };

// --- Gate 1: secrets scan over uncommitted changes (added lines only) ---
const SECRET_PATTERNS = [
  /AKIA[0-9A-Z]{16}/,                       // AWS access key
  /-----BEGIN [A-Z ]*PRIVATE KEY/,          // private keys
  /ghp_[A-Za-z0-9]{36}/,                    // GitHub PAT
  /xox[baprs]-[A-Za-z0-9-]{10,}/,           // Slack tokens
  /sk-[A-Za-z0-9_-]{24,}/,                  // generic sk- API keys
  /eyJ[A-Za-z0-9_-]{20,}\.eyJ/              // JWTs
];
const FALSE_POSITIVE_HINTS = /example|placeholder|your[-_]|xxxx|<.*>|\$\{/i;
try {
  const diff = execSync('git diff HEAD -U0 2>/dev/null || git diff --cached -U0', {
    encoding: 'utf-8', maxBuffer: 20 * 1024 * 1024
  });
  for (const line of diff.split('\n')) {
    if (!line.startsWith('+') || line.startsWith('+++')) continue;
    if (FALSE_POSITIVE_HINTS.test(line)) continue;
    for (const pattern of SECRET_PATTERNS) {
      if (pattern.test(line)) {
        block(
          'SeedFW gate BLOCKED this commit: a staged change looks like a secret ' +
          `(matched ${pattern}). Golden Rule: no secrets in code or git. ` +
          'Move it to an environment variable (.env, gitignored) and use a placeholder in .env.example. ' +
          'If this is a false positive, add an "example"/"placeholder" marker to the line or ask the user to set SEEDFW_SKIP_HOOKS=1 for this commit.'
        );
      }
    }
  }
} catch { /* not a git repo or no HEAD yet — skip scan */ }

// --- Gate 2: build must pass ---
let pkg = null;
try { pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8')); } catch { /* no package.json */ }
if (pkg?.scripts?.build) {
  const pm = fs.existsSync('pnpm-lock.yaml') ? 'pnpm'
    : fs.existsSync('yarn.lock') ? 'yarn' : 'npm';
  try {
    execSync(`${pm} run build`, { encoding: 'utf-8', stdio: 'pipe', timeout: 300000 });
  } catch (err) {
    const output = ((err.stdout || '') + '\n' + (err.stderr || '')).slice(-2000);
    block(
      'SeedFW gate BLOCKED this commit: the build failed (Golden Rule #1 — build test is mandatory before every commit). ' +
      'Fix the build, then commit.\n--- build output (tail) ---\n' + output
    );
  }
}

process.exit(0);
