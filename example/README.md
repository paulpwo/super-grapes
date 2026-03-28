# Super Grapes — Example

Minimal example showing how to use `@paulpwo/super-grapes` as a library.

## Prerequisites

1. A GitHub Personal Access Token with `read:packages` scope
2. Configure `~/.npmrc`:

```
@paulpwo:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

## Install & Run

```bash
cd example
pnpm install
pnpm dev
```

Open `http://localhost:5173` in your browser.

## What This Shows

- Installing `@paulpwo/super-grapes` from GitHub Packages
- Importing `createEditor` and `UIManager`
- Importing styles via `@paulpwo/super-grapes/style.css`
- Optional AI configuration with brand colors
