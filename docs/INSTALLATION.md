# Installing Super Grapes (Private Package)

Super Grapes is distributed as a private npm package via GitHub Packages.

## 1. Create a GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scope: `read:packages`
4. Copy the token

## 2. Configure npm authentication

Create or edit `~/.npmrc` (your home directory):

```
@paulpwo:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_TOKEN_HERE
```

## 3. Install

```bash
npm install @paulpwo/super-grapes
# or
pnpm add @paulpwo/super-grapes
```

## 4. Usage

```typescript
import { createEditor, UIManager } from '@paulpwo/super-grapes';
import '@paulpwo/super-grapes/style.css';

const app = document.getElementById('app')!;
const ui = new UIManager(app);
const editor = createEditor({
  container: '#sg-canvas',
  ai: {
    apiKey: 'sk-...',
    model: 'gpt-4o',
  },
});
ui.connect(editor);
```

## Development Workflow

### Branch Strategy

- **`main`** — Production branch. Every merge triggers an automatic release.
- **`develop`** — Development branch. Work here or create feature branches from it.

### Creating a Release

Releases are **fully automatic**. Just merge a PR to `main`:

```bash
# 1. Work on develop or a feature branch
git checkout develop
# ... make changes ...
git commit -m "feat: add new feature"
git push origin develop

# 2. Create a PR from develop -> main on GitHub
# 3. Merge the PR
# 4. Done!
```

On merge to `main`, the CI pipeline automatically:
1. Determines version bump from commit messages (conventional commits)
2. Bumps `package.json` version
3. Generates `CHANGELOG.md` from commit history
4. Creates a git tag (`v1.2.3`)
5. Builds the library (JS + CSS + type declarations)
6. Publishes to GitHub Packages
7. Creates a GitHub Release with changelog

### Version Bumps (Conventional Commits)

| Commit prefix | Bump | Example |
|---------------|------|---------|
| `fix:` | Patch (0.1.0 → 0.1.1) | `fix: correct hover state` |
| `feat:` | Minor (0.1.0 → 0.2.0) | `feat: add color picker` |
| `feat!:` or `BREAKING CHANGE` | Major (0.1.0 → 1.0.0) | `feat!: redesign API` |
| `chore:`, `docs:`, `refactor:` | Patch | `chore: update deps` |
