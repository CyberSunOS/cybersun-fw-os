import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';
import chalk from 'chalk';

interface ListOptions {
  step?: string;
  category?: string;
  long?: boolean;
  json?: boolean;
}

interface CommandInfo {
  name: string;
  path: string;
  step: number;
  category: string;
  description: string;
}

export async function listCommand(type: string = 'commands', options: ListOptions) {
  const cwd = process.cwd();
  const commandsDir = path.join(cwd, '.claude', 'commands');

  // Check if SeedFW is initialized
  if (!await fs.pathExists(commandsDir)) {
    console.error(chalk.red('❌ SeedFW not initialized in this directory'));
    console.log(chalk.yellow('\n💡 Run: ') + chalk.cyan('seedfw init'));
    process.exit(1);
  }

  if (type === 'commands' || !type) {
    await listCommands(commandsDir, options);
  } else if (type === 'specs') {
    await listSpecs(cwd, options);
  } else if (type === 'changes') {
    await listChanges(cwd, options);
  } else {
    console.error(chalk.red(`❌ Unknown type: ${type}`));
    console.log(chalk.yellow('Valid types: commands, specs, changes'));
    process.exit(1);
  }
}

async function listCommands(commandsDir: string, options: ListOptions) {
  // Find all command files
  const commandFiles = await glob('**/*.md', { cwd: commandsDir });
  
  // Parse command info
  const commands: CommandInfo[] = [];
  
  for (const file of commandFiles) {
    const fullPath = path.join(commandsDir, file);
    const content = await fs.readFile(fullPath, 'utf-8');
    
    // Extract step from directory name (e.g., "00-context-loading" -> 0)
    const stepMatch = file.match(/^(\d+)-/);
    const step = stepMatch ? parseInt(stepMatch[1]) : 99;
    
    // Extract category from directory name (e.g., "00-context-loading" -> "context-loading")
    const categoryMatch = file.match(/^\d+-([^/]+)/);
    const category = categoryMatch ? categoryMatch[1] : 'other';
    
    // Extract description from frontmatter or first heading
    let description = '';
    const descMatch = content.match(/description:\s*["'](.+?)["']/);
    if (descMatch) {
      description = descMatch[1];
    } else {
      const headingMatch = content.match(/^#\s+(.+)$/m);
      if (headingMatch) {
        description = headingMatch[1];
      }
    }
    
    // Get command name from filename
    const name = path.basename(file, '.md');
    
    commands.push({
      name,
      path: file,
      step,
      category,
      description
    });
  }

  // Filter by step
  let filtered = commands;
  if (options.step) {
    const stepNum = parseInt(options.step);
    filtered = filtered.filter(cmd => cmd.step === stepNum);
  }

  // Filter by category
  if (options.category) {
    filtered = filtered.filter(cmd => cmd.category === options.category);
  }

  // Sort by step, then by name
  filtered.sort((a, b) => {
    if (a.step !== b.step) return a.step - b.step;
    return a.name.localeCompare(b.name);
  });

  // Output as JSON
  if (options.json) {
    console.log(JSON.stringify(filtered, null, 2));
    return;
  }

  // Output as text
  console.log(chalk.bold(`\n📋 SeedFW Commands (${filtered.length} total)\n`));

  // Group by step
  const byStep = new Map<number, CommandInfo[]>();
  for (const cmd of filtered) {
    if (!byStep.has(cmd.step)) {
      byStep.set(cmd.step, []);
    }
    byStep.get(cmd.step)!.push(cmd);
  }

  // Print by step
  for (const [step, cmds] of Array.from(byStep.entries()).sort((a, b) => a[0] - b[0])) {
    const stepName = getStepName(step);
    console.log(chalk.bold.cyan(`Step ${step}: ${stepName}`) + chalk.gray(` (${cmds.length} commands)`));
    
    for (const cmd of cmds) {
      if (options.long) {
        console.log(chalk.yellow(`  /${cmd.name}`));
        console.log(chalk.gray(`    ${cmd.description}`));
        console.log(chalk.gray(`    Path: ${cmd.path}`));
      } else {
        const desc = cmd.description ? chalk.gray(` - ${cmd.description}`) : '';
        console.log(chalk.yellow(`  /${cmd.name}`) + desc);
      }
    }
    console.log();
  }

  console.log(chalk.bold('💡 Tips:'));
  console.log(chalk.gray('  • Use ') + chalk.cyan('seedfw show <command>') + chalk.gray(' to see command details'));
  console.log(chalk.gray('  • Use ') + chalk.cyan('seedfw list --step 2') + chalk.gray(' to filter by workflow step'));
  console.log(chalk.gray('  • Type ') + chalk.cyan('/intent-translator') + chalk.gray(' in your AI assistant to start'));
}

async function listSpecs(cwd: string, options: ListOptions) {
  const specsDir = path.join(cwd, 'spec', 'current');
  
  if (!await fs.pathExists(specsDir)) {
    console.log(chalk.yellow('📁 No specs directory found'));
    return;
  }

  const specs = await glob('**/*.md', { cwd: specsDir });
  
  if (specs.length === 0) {
    console.log(chalk.yellow('📁 No specs found'));
    console.log(chalk.gray('\n💡 Specs are stored in spec/current/'));
    return;
  }

  console.log(chalk.bold(`\n📋 Spec (current) (${specs.length} total)\n`));
  
  for (const spec of specs) {
    console.log(chalk.cyan(`  ${spec}`));
  }
}

async function listChanges(cwd: string, options: ListOptions) {
  const changesDir = path.join(cwd, 'spec', 'proposals');
  
  if (!await fs.pathExists(changesDir)) {
    console.log(chalk.yellow('📁 No changes directory found'));
    return;
  }

  const changes = await glob('**/*.md', { cwd: changesDir });
  
  if (changes.length === 0) {
    console.log(chalk.yellow('📁 No changes found'));
    console.log(chalk.gray('\n💡 Change proposals are stored in spec/proposals/'));
    return;
  }

  console.log(chalk.bold(`\n📋 Spec Proposals (${changes.length} total)\n`));
  
  for (const change of changes) {
    console.log(chalk.yellow(`  ${change}`));
  }
}

function getStepName(step: number): string {
  const names: Record<number, string> = {
    0: 'Context Loading',
    1: 'Intent Clarification',
    2: 'PRP Creation',
    3: 'Planning',
    4: 'Execution',
    5: 'Validation',
    6: 'Git Operations',
    7: 'Utilities'
  };
  return names[step] || 'Other';
}

