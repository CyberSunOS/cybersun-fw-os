# Install SeedFW

**Package**: `@cybersunos/seedfw`
**Registry**: GitHub Packages (`https://npm.pkg.github.com`)
**Repository**: `https://github.com/CyberSunOS/cybersun-fw-os` (private)
**CLI binary**: `seedfw` (subcommands: `init`, `list`, `show`, `validate`, `diff`, `archive`, `status`)

SeedFW can be installed several ways. Pick the one that fits your situation:

| Method | Best for | Privacy | Updates |
|--------|----------|---------|---------|
| [A. GitHub Packages npm registry](#method-a--github-packages-npm-registry-recommended) | Worldwide private distribution, teams | Private (token) | `npm update` |
| [B. Direct from the GitHub repo](#method-b--install-directly-from-the-github-repo) | Quick installs, version pinning by tag/branch/commit | Private (repo access) | Reinstall |
| [C. Private / local setup](#method-c--private--local-setup) | Personal use, development, testing | Local only | Automatic / manual |
| [D. Claude Code plugin (beta)](#method-d--claude-code-plugin-beta) | Claude Code users, team distribution of commands + hooks | Private (repo access) | `/plugin marketplace update` |

---

## Method A — GitHub Packages npm registry (Recommended)

Installs the published `@cybersunos/seedfw` package from GitHub Packages. Best for private, worldwide distribution and team use.

### 1. Create a GitHub token

1. Go to https://github.com/settings/tokens
2. **Generate new token (classic)**, name it e.g. `seedfw-install`
3. Select scope **`read:packages`** (minimum to install). Add `repo` if the repository is private and you need repo access.
4. Generate and copy the token.

### 2. Configure npm (one-time per machine)

```bash
echo "@cybersunos:registry=https://npm.pkg.github.com" >> ~/.npmrc
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> ~/.npmrc
```

Replace `YOUR_GITHUB_TOKEN` with the token from step 1. Use the lowercase scope `@cybersunos`.

### 3. Install

```bash
# Copy config so root/sudo can read it (one-time)
sudo cp ~/.npmrc /root/.npmrc

# Install globally
sudo npm install -g @cybersunos/seedfw
```

### 4. Verify

```bash
seedfw --version
seedfw --help
```

### Update

```bash
sudo npm update -g @cybersunos/seedfw
# or
sudo npm install -g @cybersunos/seedfw@latest
```

---

## Method B — Install directly from the GitHub repo

Installs straight from the git repository, no published package needed. Works worldwide; requires read access to the (private) repo.

### Prerequisites

You need read access to `https://github.com/CyberSunOS/cybersun-fw-os` and npm must be able to authenticate with GitHub. Choose one:

```bash
# SSH (recommended if you have SSH keys configured with GitHub)
npm install -g git+ssh://git@github.com/CyberSunOS/cybersun-fw-os.git

# HTTPS with a personal access token (scope: repo for private repos)
npm install -g git+https://<TOKEN>@github.com/CyberSunOS/cybersun-fw-os.git

# HTTPS via the GitHub CLI
gh auth login
npm install -g git+https://github.com/CyberSunOS/cybersun-fw-os.git
```

### Install a specific version, branch, or commit

```bash
# Latest (default branch)
npm install -g git+https://github.com/CyberSunOS/cybersun-fw-os.git

# Specific tag
npm install -g git+https://github.com/CyberSunOS/cybersun-fw-os.git#v2.0.0

# Specific branch
npm install -g git+https://github.com/CyberSunOS/cybersun-fw-os.git#main

# Specific commit
npm install -g git+https://github.com/CyberSunOS/cybersun-fw-os.git#dc92739
```

List available versions:

```bash
git ls-remote --tags https://github.com/CyberSunOS/cybersun-fw-os.git
# or visit https://github.com/CyberSunOS/cybersun-fw-os/tags
```

### Update / uninstall

```bash
# Force reinstall the latest
npm install -g git+https://github.com/CyberSunOS/cybersun-fw-os.git --force

# Uninstall
npm uninstall -g seedfw
```

### Project-local install (via npx)

```bash
cd my-project
npm install --save-dev git+https://github.com/CyberSunOS/cybersun-fw-os.git
npx seedfw init
npx seedfw list
```

### Granting team access

1. Go to https://github.com/CyberSunOS/cybersun-fw-os/settings/access
2. **Invite a collaborator**, enter their GitHub username
3. Read access is sufficient for CLI usage.

---

## Method C — Private / local setup

Use the CLI privately from a local checkout, without publishing or installing from a registry. Best for personal use and active development. You do **not** need an npm account, npm publish, or an npm organization for any of these.

First build the project once:

```bash
cd /path/to/seedfw
npm run build
```

### Option 1: npm link (recommended for development)

Creates a global symlink. Rebuilds are picked up automatically.

```bash
cd /path/to/seedfw
npm run build
npm link          # use 'sudo npm link' if you hit permission errors

seedfw --version
```

After changing source, just `npm run build` again — changes are live. Remove with `npm unlink -g seedfw`.

### Option 2: Shell alias

Add to `~/.bashrc` or `~/.zshrc`:

```bash
alias seedfw="node /path/to/seedfw/dist/index.js"
```

Then `source ~/.bashrc` (or `~/.zshrc`).

### Option 3: Direct execution

```bash
node /path/to/seedfw/dist/index.js --help
node /path/to/seedfw/dist/index.js init
```

### Option 4: Local npm install (project-specific)

```bash
cd my-project
npm install --save-dev /path/to/seedfw
npx seedfw init
```

---

## Method D — Claude Code plugin (beta)

The repository doubles as a Claude Code plugin and its own private marketplace (via `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json`). Installing the plugin delivers all SeedFW commands plus the enforcement hooks directly into Claude Code — no npm involved.

> **Beta**: the plugin manifests are new and have not yet been validated in a live Claude Code session. Treat this method as beta until a first-install test confirms it works end to end.

### Install

Anyone with git read access to the private repo can install — git permissions are the access control, no tokens or registry setup needed beyond your normal git auth:

```bash
# In Claude Code
/plugin marketplace add CyberSunOS/cybersun-fw-os
/plugin install seedfw@seedfw
```

### Command namespacing

Plugin-installed commands are namespaced: `/seedfw:create-prp`, `/seedfw:commit`, etc. (File-copied installs via `seedfw init` keep the bare `/create-prp` form.)

### Updates

```bash
/plugin marketplace update seedfw
```

New commits are picked up as new versions — no manual version bumps needed.

### Other git hosts

The marketplace works with any git host, including self-hosted:

```bash
/plugin marketplace add https://git.example.com/seedfw.git
```

### Team auto-onboarding

A project's `.claude/settings.json` can pre-register the marketplace and plugin via the `"extraKnownMarketplaces"` and `"enabledPlugins"` keys, so teammates opening the project in Claude Code get SeedFW automatically.

### You still need `seedfw init`

The plugin delivers commands + hooks. Per-project scaffolding (`spec/`, `TECH_STACK.md`, `PRPs/`, `CLAUDE.md`, `AGENTS.md`, `docs/`) is still created by `seedfw init` (installed via Method A, B, or C).

---

## Verify your installation

```bash
seedfw --version
seedfw --help

# List the available AI commands (37 commands)
seedfw list

# Try it in a throwaway project
mkdir /tmp/test-seedfw && cd /tmp/test-seedfw
seedfw init --skip-git
seedfw list
```

---

## Quick start

```bash
cd ~/my-project
seedfw init                 # Initialize SeedFW in your project
seedfw update               # Update framework files to the latest version
seedfw list                 # List available commands
seedfw show intent-translator   # Show command details
```

---

## Troubleshooting

### "404 Not Found" on install
- Ensure `~/.npmrc` is configured (Method A, step 2).
- Use the lowercase scope `@cybersunos/seedfw`.
- If installing with sudo, copy the config: `sudo cp ~/.npmrc /root/.npmrc`.
- Confirm your token has `read:packages` scope.

### "401 Unauthorized" / "Repository not found" / "Permission denied"
- Verify your token: `echo $GITHUB_TOKEN` and `cat ~/.npmrc`.
- Ensure you have access to the private repo: https://github.com/CyberSunOS/cybersun-fw-os
- For repo installs, try the SSH method or `gh auth login`.

### "EACCES: permission denied"
- Use `sudo` for the global install.
- Make sure root has the config: `sudo cp ~/.npmrc /root/.npmrc`.
- Or use Method C (npm link) for local development.

### "Command not found: seedfw"
- Check the npm global bin is on your PATH:
  ```bash
  npm config get prefix
  export PATH="$PATH:$(npm config get prefix)/bin"   # add to ~/.bashrc or ~/.zshrc
  ```

### "Cannot find module" / old version still showing
```bash
npm uninstall -g seedfw
npm cache clean --force
# Reinstall via your chosen method, adding --force for repo installs
```

---

## Related documentation

- **PUBLISHING.md** — How to build, version, and publish updates
- **README.md** — Project overview
