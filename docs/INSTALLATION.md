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

## Creating a Release

To publish a new version:

```bash
# Tag the release
git tag v1.0.0
git push origin v1.0.0
```

This triggers the GitHub Actions workflow which:
1. Type-checks the code
2. Builds the library (JS + CSS + type declarations)
3. Publishes to GitHub Packages
4. Creates a GitHub Release with auto-generated changelog
