#!/usr/bin/env node

import { Command } from 'commander';
import { createRequire } from 'module';
import { initCommand } from './commands/init.js';
import { updateCommand } from './commands/update.js';
import { listCommand } from './commands/list.js';
import { showCommand } from './commands/show.js';

const require = createRequire(import.meta.url);
const pkg = require('../package.json') as { version: string };

const program = new Command();

program
  .name('seedfw')
  .description('CLI tool for SeedFW framework - AI-assisted development')
  .version(pkg.version);

// seedfw init
program
  .command('init')
  .description('Initialize SeedFW in your project')
  .option('--skip-git', 'Skip git initialization')
  .option('--skip-install', 'Skip dependency installation')
  .action(initCommand);

// seedfw update
program
  .command('update')
  .description('Update installed framework files to the current package version')
  .option('--dry-run', 'Show what would change without applying')
  .option('--force', 'Overwrite locally modified files and remove modified obsolete files')
  .action(updateCommand);

// seedfw list
program
  .command('list [type]')
  .description('List commands, spec files, or proposals')
  .option('--step <number>', 'Filter by workflow step (0-7)')
  .option('--category <name>', 'Filter by category')
  .option('--long', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(listCommand);

// seedfw show
program
  .command('show <item>')
  .description('Show details of a command')
  .action(showCommand);

program.parse();

