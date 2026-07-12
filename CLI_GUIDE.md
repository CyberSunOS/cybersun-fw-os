# SeedFW CLI Guide

**Purpose**: Complete guide to using the `seedfw` CLI tool

---

## 🚀 Quick Start

### **🔒 Private Installation (Recommended)**

**Want to keep it private?** See **[INSTALL.md](INSTALL.md)** for detailed options!

```bash
# Quick private setup with npm link
cd /path/to/seedfw
npm install
npm run build
npm link

# Verify
seedfw --version
```

### **📦 Other Installation Options**

```bash
# Option 1: Shell alias (private)
alias seedfw="node /path/to/seedfw/dist/index.js"

# Option 2: From private Git repository
npm install -g git+https://github.com/CyberSunOS/cybersun-fw-os.git

# Option 3: Public npm (only if published - NOT REQUIRED)
npm install -g seedfw
```

### **Verify Installation**

```bash
seedfw --version
seedfw --help
```

---

## 📋 Commands

### **`seedfw init`**

Initialize SeedFW in your project.

**Usage**:
```bash
seedfw init [options]
```

**Options**:
- `--skip-git` - Skip git initialization
- `--skip-install` - Skip dependency installation

**What it does**:
1. Creates `.claude/commands/` with all 37 commands
2. Creates `.claude/hooks/` + `.claude/settings.json` (enforcement hooks: commit/build gate, secret scan, package.json guard, 500-line warning)
3. Creates `docs/` with documentation
4. Creates `spec/` directory structure
5. Copies `TECH_STACK.md` template
6. Copies `project.md.template`
7. Copies `AGENTS.md` and generates `CLAUDE.md`
8. Writes `.seedfw-manifest.json` (for `seedfw update`)
9. Initializes git (unless `--skip-git`)

> Tip: set `SEEDFW_SKIP_HOOKS=1` to temporarily disable all enforcement hook gates.

**Example**:
```bash
# Initialize in current directory
seedfw init

# Initialize without git
seedfw init --skip-git

# Initialize without installing dependencies
seedfw init --skip-install
```

**Output**:
```
✅ SeedFW initialized successfully!

📦 Created:
  .claude/commands/     (37 commands)
  .claude/hooks/        (enforcement hooks)
  .claude/settings.json (hook configuration)
  docs/                 (documentation)
  spec/             (specs and changes)
  TECH_STACK.md         (tech stack template)
  project.md.template   (project conventions)
  AGENTS.md             (AI instructions)
  CLAUDE.md             (Claude Code entry point)

📝 Next steps:
  1. Copy project.md.template to project.md and fill in details
  2. Update TECH_STACK.md with your stack
  3. Open your AI assistant (Augment, Claude, etc.)
  4. Type: /intent-translator
  5. Or run: seedfw list to see all commands
```

---

### **`seedfw update`**

Update the framework files in your project (commands, docs, AGENTS.md) to the versions shipped with the installed package.

```bash
seedfw update             # apply safe changes
seedfw update --dry-run   # preview what would change
seedfw update --force     # also overwrite locally modified files
```

**How it stays safe:**
- `seedfw init` writes `.seedfw-manifest.json` recording the hash of every installed framework file.
- `update` overwrites a file only if it is unmodified since install (hash matches the manifest). Files you customized are **skipped** and listed — use `--force` to overwrite them.
- Commands removed or renamed upstream are cleaned up the same way (known obsolete files from the v2 consolidation are recognized even on installs that predate the manifest).
- `TECH_STACK.md`, `project.md`, and `CLAUDE.md` are yours — update never touches them.

**Example output:**

```
📦 SeedFW update → 2.1.0

+ 2 new
  .claude/commands/07-utilities/new-command.md
~ 3 updated
  .claude/commands/02-prp-creation/create-prp.md
! 1 locally modified — skipped (use --force to overwrite)
  .claude/commands/06-git-operations/commit.md

✅ Updated: 2 added, 3 updated, 0 removed
```

---

### **`seedfw list`**

List commands, specs, or changes.

**Usage**:
```bash
seedfw list [type] [options]
```

**Types**:
- `commands` - List all 37 commands (default)
- `specs` - List spec files (current) from `spec/current/`
- `changes` - List proposals from `spec/proposals/`

**Options**:
- `--step <number>` - Filter by workflow step (0-7)
- `--category <name>` - Filter by category
- `--long` - Show detailed information
- `--json` - Output as JSON

**Examples**:
```bash
# List all commands
seedfw list
seedfw list commands

# List commands by workflow step
seedfw list --step 0    # Context loading
seedfw list --step 1    # Intent clarification
seedfw list --step 2    # PRP creation

# List commands by category
seedfw list --category prp-creation
seedfw list --category execution

# Show detailed information
seedfw list --long

# Output as JSON
seedfw list --json

# List spec files in spec/current/
seedfw list specs

# List proposals in spec/proposals/
seedfw list changes
```

**Output**:
```
📋 SeedFW Commands (37 total)

Step 0: Context Loading (2 commands)
  /prime-context           - Load essential context
  /onboarding              - Comprehensive onboarding

Step 1: Intent Clarification (1 command)
  /intent-translator       - 7-step clarification protocol

Step 2: PRP Creation (10 commands)
  /create-prp              - Comprehensive PRP
  /prp-story               - User story PRP
  /prp-task                - Quick task PRP
  ...
```

---

### **`seedfw show`**

Show details of a specific command.

**Usage**:
```bash
seedfw show <command-name>
```

**Examples**:
```bash
# Show intent-translator command
seedfw show intent-translator

# Show create-prp command
seedfw show create-prp

# Partial match works too
seedfw show intent    # Finds intent-translator
```

**Output**:
```
📄 Command: /intent-translator

Step: 1 | Category: intent-clarification
Path: 01-intent-clarification/intent-translator.md
────────────────────────────────────────────────────────────

[Full command content displayed here]

────────────────────────────────────────────────────────────

💡 Usage:
  1. Open your AI assistant (Augment, Claude, etc.)
  2. Type: /intent-translator
  3. Follow the AI's instructions
```

---

## 🔄 Complete CLI Workflow

### **Step 1: Initialize SeedFW**

```bash
# Create a new project directory
mkdir my-project
cd my-project

# Initialize SeedFW
seedfw init

# Customize your setup
cp project.md.template project.md
nano project.md           # Fill in your project details
nano TECH_STACK.md        # Update with your tech stack
```

### **Step 2: Explore Commands**

```bash
# List all commands
seedfw list

# List commands by workflow step
seedfw list --step 1      # Intent clarification
seedfw list --step 2      # PRP creation
seedfw list --step 4      # Execution

# Show details of a specific command
seedfw show intent-translator
seedfw show create-prp
```

### **Step 3: Use with AI Assistant**

```bash
# Open your AI assistant (Augment, Claude, Cursor, etc.)
# The AI will automatically read .claude/commands/

# In AI chat, type:
/intent-translator

# AI will start asking questions
# The AI follows AGENTS.md automatically
```

### **Step 4: Build Your Feature**

```bash
# AI will guide you through:
# 1. Intent clarification (/intent-translator)
# 2. PRP creation (/create-prp)
# 3. Planning (/create-plan)
# 4. Execution (/execute-plan)
# 5. Validation (/validate)
# 6. Git operations (/commit)
```

---

## 💡 Tips & Tricks

### **Quick Reference**

```bash
# Initialize
seedfw init

# List all commands
seedfw list

# List by step
seedfw list --step 2

# Show command
seedfw show intent-translator

# Get help
seedfw --help
seedfw list --help
seedfw show --help
```

### **Common Workflows**

**New Project Setup**:
```bash
mkdir my-project && cd my-project
seedfw init
cp project.md.template project.md
nano TECH_STACK.md
# Open AI assistant and type: /intent-translator
```

**Explore Commands**:
```bash
seedfw list --step 0    # Context loading
seedfw list --step 1    # Intent clarification
seedfw list --step 2    # PRP creation
seedfw show create-prp  # See details
```

**Check Spec Status**:
```bash
seedfw list specs       # See current spec files (spec/current/)
seedfw list changes     # See proposals (spec/proposals/)
```

---

## 🔧 Troubleshooting

### **Command not found: seedfw**

```bash
# If installed globally
npm install -g seedfw

# If installed locally
npx seedfw --version

# If using from source
cd /path/to/seedfw
npm link
```

### **SeedFW not initialized**

```bash
# Error: "SeedFW not initialized in this directory"
# Solution: Run init first
seedfw init
```

### **Command not found in list**

```bash
# Use partial match
seedfw show intent      # Finds intent-translator

# Or list all commands
seedfw list
```

---

## 📚 Related Documentation

- **README.md** - Overview and quickstart
- **AGENTS.md** - AI assistant instructions
- **docs/COMMAND_GUIDE.md** - All 37 commands explained
- **docs/GOLDEN_RULES.md** - Development standards

---

## 🎯 Next Steps

1. **Initialize**: `seedfw init`
2. **Customize**: Edit `TECH_STACK.md` and `project.md`
3. **Explore**: `seedfw list`
4. **Build**: Open AI assistant and type `/intent-translator`

---

**Ready to build with SeedFW!** 🚀

