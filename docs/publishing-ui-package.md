# Publishing UI Package to GitHub Packages

## 📦 Package Information

- **Package Name**: `@ukesjtu/nomad-ui`
- **Registry**: GitHub Packages
- **Location**: https://github.com/ukeSJTU/nomad/packages

## 🔐 Setup (One-time)

### 1. Create GitHub Token

Visit: https://github.com/settings/tokens/new

Required permissions:

- ✅ `write:packages` (for publishing)
- ✅ `read:packages` (for installing)

### 2. Configure npm

Add to your **global** `~/.npmrc`:

```bash
@ukesjtu:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=ghp_your_token_here
```

**Important**: Never commit `.npmrc` files with tokens to git!

## 📤 Publishing New Version

```bash
cd packages/ui

# Update version
npm version patch  # 0.1.0 -> 0.1.1
# or: npm version minor  # 0.1.0 -> 0.2.0
# or: npm version major  # 0.1.0 -> 1.0.0

# Publish
npm publish
```

## 📥 Using in External Projects

### 1. Configure Project

Create `.npmrc` in project root (or use global `~/.npmrc`):

```
@ukesjtu:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Add to `.gitignore`:

```
.npmrc
```

### 2. Install

```bash
pnpm add @ukesjtu/nomad-ui
```

### 3. Use Components

```tsx
// Import styles
import "@ukesjtu/nomad-ui/globals.css";

// Import components
import { Button } from "@ukesjtu/nomad-ui/components/primitives/button";
import { Card } from "@ukesjtu/nomad-ui/components/primitives/card";

export default function App() {
  return (
    <Card>
      <Button>Hello World</Button>
    </Card>
  );
}
```

## 🏠 Internal Monorepo Usage

Within this monorepo, continue using workspace reference:

```json
{
  "dependencies": {
    "@ukesjtu/nomad-ui": "workspace:*"
  }
}
```

No changes needed for existing apps (web, demo, etc.).

## 🤖 GitHub Actions (Optional)

You can automate publishing with GitHub Actions. Create `.github/workflows/publish-ui.yml`:

```yaml
name: Publish UI Package

on:
  push:
    tags:
      - "ui-v*"

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "22"
          registry-url: "https://npm.pkg.github.com"

      - name: Install dependencies
        run: pnpm install

      - name: Publish
        run: |
          cd packages/ui
          npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Then publish by creating a git tag:

```bash
git tag ui-v0.1.1
git push origin ui-v0.1.1
```

**Note**: Manual publishing is simpler for infrequent updates. Only add automation if you publish frequently.

## 📋 Checklist

Before publishing:

- [ ] Tests pass: `pnpm test`
- [ ] Types check: `pnpm type-check`
- [ ] Version updated
- [ ] Changelog updated (if any)
- [ ] Token configured in `~/.npmrc`

## 🔗 Links

- Package: https://github.com/ukeSJTU/nomad/packages
- Repository: https://github.com/ukeSJTU/nomad
- Issues: https://github.com/ukeSJTU/nomad/issues
