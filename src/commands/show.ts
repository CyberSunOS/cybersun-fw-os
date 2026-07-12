import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';
import chalk from 'chalk';

export async function showCommand(item: string) {
  const cwd = process.cwd();
  const commandsDir = path.join(cwd, '.claude', 'commands');

  // Check if SeedFW is initialized
  if (!await fs.pathExists(commandsDir)) {
    console.error(chalk.red('❌ SeedFW not initialized in this directory'));
    console.log(chalk.yellow('\n💡 Run: ') + chalk.cyan('seedfw init'));
    process.exit(1);
  }

  // Find the command file
  const commandFiles = await glob('**/*.md', { cwd: commandsDir });
  
  // Try to find exact match or partial match
  let matchedFile: string | undefined;
  
  // First try exact match
  matchedFile = commandFiles.find(f => path.basename(f, '.md') === item);
  
  // If not found, try partial match
  if (!matchedFile) {
    const matches = commandFiles.filter(f => 
      path.basename(f, '.md').includes(item) || 
      f.includes(item)
    );
    
    if (matches.length === 0) {
      console.error(chalk.red(`❌ Command not found: ${item}`));
      console.log(chalk.yellow('\n💡 Run: ') + chalk.cyan('seedfw list') + chalk.yellow(' to see all commands'));
      process.exit(1);
    }
    
    if (matches.length > 1) {
      console.error(chalk.red(`❌ Multiple commands match "${item}":`));
      for (const match of matches) {
        console.log(chalk.yellow(`  /${path.basename(match, '.md')}`));
      }
      console.log(chalk.gray('\n💡 Be more specific'));
      process.exit(1);
    }
    
    matchedFile = matches[0];
  }

  // Read and display the command
  const fullPath = path.join(commandsDir, matchedFile);
  const content = await fs.readFile(fullPath, 'utf-8');
  
  // Extract metadata
  const name = path.basename(matchedFile, '.md');
  const stepMatch = matchedFile.match(/^(\d+)-/);
  const step = stepMatch ? parseInt(stepMatch[1]) : '?';
  const categoryMatch = matchedFile.match(/^\d+-([^/]+)/);
  const category = categoryMatch ? categoryMatch[1] : 'other';
  
  // Print header
  console.log(chalk.bold.cyan(`\n📄 Command: /${name}\n`));
  console.log(chalk.gray(`Step: ${step} | Category: ${category}`));
  console.log(chalk.gray(`Path: ${matchedFile}`));
  console.log(chalk.gray('─'.repeat(60)));
  
  // Print content
  console.log('\n' + content);
  
  // Print footer
  console.log(chalk.gray('\n─'.repeat(60)));
  console.log(chalk.bold('\n💡 Usage:'));
  console.log(chalk.gray('  1. Open your AI assistant (Augment, Claude, etc.)'));
  console.log(chalk.gray('  2. Type: ') + chalk.cyan(`/${name}`));
  console.log(chalk.gray('  3. Follow the AI\'s instructions'));
}

