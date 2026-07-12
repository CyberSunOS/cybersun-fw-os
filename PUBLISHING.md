# SeedFW Publishing Guide

**Package**: `@cybersunos/seedfw`
**Registry**: GitHub Packages (`https://npm.pkg.github.com`)
**Repository**: `https://github.com/CyberSunOS/cybersun-fw-os`

This guide covers publishing `@cybersunos/seedfw` to GitHub Packages — a private npm registry that lets the package be installed from anywhere while staying private (free for public repos, included with GitHub Pro for private repos).

For installing the published package, see **INSTALL.md**.

---

## Quick reference

```bash
# 1. Bump the version in package.json (e.g. "version": "2.0.1")
# 2. Build
npm run build
# 3. Publish (token must have write:packages)
GITHUB_TOKEN=your_token npm publish
# 4. Tag the release
git add -A
git commit -m "Release v2.0.1"
git tag v2.0.1
git push && git push --tags
```

---

## 1. Create a GitHub token

1. Go to https://github.com/settings/tokens
2. **Generate new token (classic)**, name it e.g. `seedfw-npm-publish`
3. Select scopes:
   - `write:packages` — publish packages
   - `read:packages` — download packages
   - `repo` — required for private repositories
   - `delete:packages` — optional, to unpublish versions
4. Copy the token (you won't see it again).

### Make the token available to npm

The package's `publishConfig`/scope points at GitHub Packages, and npm reads the token from your environment or `~/.npmrc`.

```bash
# Environment variable (recommended) — add to ~/.bashrc or ~/.zshrc
export GITHUB_TOKEN=ghp_your_token_here
```

Or configure `~/.npmrc` directly:

```
@cybersunos:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=ghp_your_token_here
```

---

## 2. Bump the version

Each publish requires a new version number. Edit `package.json`:

```json
{
  "version": "2.0.1"
}
```

Versioning guidelines:
- **Patch** (`2.0.1`): bug fixes, small changes
- **Minor** (`2.1.0`): new features, backward compatible
- **Major** (`3.0.0`): breaking changes

---

## 3. Build

```bash
npm run build
```

This compiles the CLI to `dist/`.

---

## 4. Test locally (optional but recommended)

```bash
npm link            # use sudo if you hit permission errors
seedfw --version
seedfw --help
```

See INSTALL.md (Method C) for other local-testing options.

---

## 5. Publish

```bash
# If GITHUB_TOKEN is already exported:
npm publish

# Or inline:
GITHUB_TOKEN=ghp_your_token_here npm publish
```

Expected output:

```
npm notice Publishing to https://npm.pkg.github.com
+ @cybersunos/seedfw@2.0.1
```

---

## 6. Tag the release

```bash
git add -A
git commit -m "Release v2.0.1"
git tag v2.0.1
git push origin main
git push origin v2.0.1
```

---

## 7. Verify

```bash
# Check the package page
# https://github.com/CyberSunOS/cybersun-fw-os/packages

# Test install
sudo npm install -g @cybersunos/seedfw@latest
seedfw --version    # should show the new version
```

View all published versions at https://github.com/CyberSunOS?tab=packages or https://github.com/CyberSunOS/cybersun-fw-os/packages.

---

## What gets published

The package ships the compiled CLI plus the AI command set and docs:

- `dist/` — compiled JavaScript (the `seedfw` CLI executable)
- `.claude/commands/` — the 37 AI commands, organized by workflow stage
- `docs/` — documentation
- `AGENTS.md`, `README.md`, `LICENSE`, and project/tech-stack templates

The CLI binary is `seedfw` with subcommands: `init`, `list`, `show`, `validate`, `diff`, `archive`, `status`.

---

## Unpublishing a version (if needed)

```bash
# Remove a specific version
npm unpublish @cybersunos/seedfw@2.0.0

# Remove all versions (careful!)
npm unpublish @cybersunos/seedfw --force
```

---

## Troubleshooting

### "401 Unauthorized" / "403 Forbidden" when publishing
- Confirm the token has `write:packages` scope.
- Verify it is set: `echo $GITHUB_TOKEN` and `cat ~/.npmrc`.

### "Cannot publish over existing version"
- Bump the version in `package.json`; every publish needs a new version.

### "404 Not Found" when installing
- Ensure `~/.npmrc` uses the lowercase scope `@cybersunos` and points at `https://npm.pkg.github.com`.
- Confirm the package name matches `@cybersunos/seedfw` and the token has `read:packages`.
- If using sudo, copy the config: `sudo cp ~/.npmrc /root/.npmrc`.

### "EACCES: permission denied" when installing globally
- Use `sudo npm install -g @cybersunos/seedfw`.
- Make sure root has the config: `sudo cp ~/.npmrc /root/.npmrc`.

---

## Pre-publish checklist

- [ ] Bump version in `package.json`
- [ ] `npm run build`
- [ ] Test locally with `npm link`
- [ ] `GITHUB_TOKEN` set with `write:packages`
- [ ] `npm publish`
- [ ] Tag and push: `git tag v2.0.x && git push --tags`
- [ ] Verify on the GitHub Packages page and via `npm install -g @cybersunos/seedfw@latest`

---

## Links

- **Package**: https://github.com/CyberSunOS/cybersun-fw-os/packages
- **Repository**: https://github.com/CyberSunOS/cybersun-fw-os
- **Issues**: https://github.com/CyberSunOS/cybersun-fw-os/issues
- **Token settings**: https://github.com/settings/tokens
