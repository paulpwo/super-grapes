# AI Assistant — Setup Guide

Super-Grapes includes an AI assistant that generates page templates from text descriptions. It works with any OpenAI-compatible API (OpenAI, Groq, Google Gemini, Together AI, local LLMs via Ollama, etc.).

The AI button only appears in the topbar when credentials are configured.

---

## Quick Start (Standalone / Dev)

1. Copy the example env file:

```bash
cp .env.example .env
```

2. Edit `.env` with your credentials:

```env
VITE_SG_AI_API_KEY=sk-your-api-key-here
VITE_SG_AI_MODEL=gpt-4o
VITE_SG_AI_BASE_URL=https://api.openai.com/v1
```

3. Run the dev server:

```bash
pnpm dev
```

A sparkle button with an animated gradient border will appear in the topbar.

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_SG_AI_API_KEY` | Yes | — | API key for your provider |
| `VITE_SG_AI_MODEL` | No | `gpt-4o` | Model ID to use |
| `VITE_SG_AI_BASE_URL` | No | `https://api.openai.com/v1` | Base URL of the API endpoint |

---

## Library Usage

When using Super-Grapes as a library, pass the `ai` config directly — no env vars needed:

```typescript
import { createEditor, UIManager } from 'super-grapes';

const ui = new UIManager(document.getElementById('app')!);
const editor = createEditor({
  container: '#sg-canvas',
  ai: {
    apiKey: 'sk-...',
    model: 'gpt-4o',
    baseURL: 'https://api.openai.com/v1',  // optional
    systemPrompt: 'Custom system prompt...', // optional
    brandColors: {                           // optional
      primary: '#c0392b',
      secondary: '#2c3e50',
      background: '#ffffff',
      text: '#333333',
      accent: '#e74c3c',
    },
  },
});
ui.connect(editor);
```

### `AiConfig` Options

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `apiKey` | `string` | Yes | API key for the provider |
| `model` | `string` | Yes | Model ID (e.g. `gpt-4o`, `llama-3.3-70b-versatile`) |
| `baseURL` | `string` | No | API base URL. Defaults to `https://api.openai.com/v1` |
| `systemPrompt` | `string` | No | Override the built-in system prompt |
| `brandColors` | `BrandColors` | No | Brand color palette for AI-generated pages (see below) |
| `skills` | `string[]` | No | Additional design skill prompts (markdown strings) appended to system prompt |
| `builtinSkills` | `boolean` | No | Set to `false` to disable built-in skills. Default: `true` |

### `BrandColors` Options

Define your brand's color palette so AI-generated pages use your colors by default. The AI will only deviate from these if the user explicitly requests different colors in their prompt.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `primary` | `string` | Yes | Primary brand color (e.g. `'#c0392b'`) |
| `secondary` | `string` | No | Secondary color (e.g. `'#2c3e50'`) |
| `background` | `string` | No | Default background color (e.g. `'#ffffff'`) |
| `text` | `string` | No | Default text color (e.g. `'#333333'`) |
| `accent` | `string` | No | Accent for CTAs, links, highlights (e.g. `'#e74c3c'`) |
| `[custom]` | `string` | No | Any additional named colors (e.g. `success: '#27ae60'`) |

```typescript
// Example: Real estate brand
ai: {
  apiKey: 'sk-...',
  model: 'gpt-4o',
  brandColors: {
    primary: '#1a365d',
    secondary: '#c6a962',
    background: '#f8f6f0',
    text: '#2d3748',
    accent: '#c6a962',
    success: '#38a169',
  },
}
```

The colors are appended to the system prompt as a "Brand Color Palette" section. If you also provide a custom `systemPrompt`, the brand colors are appended to it.

---

### Design Skills

Super Grapes uses a **skill system** to enhance AI-generated page quality. Skills are markdown documents that provide design guidelines, aesthetic rules, and patterns to the AI model.

#### Built-in Skills

The following skill ships with Super Grapes and is included by default:

- **`frontend-design`** — Guidelines for creating distinctive, production-grade interfaces that avoid generic AI aesthetics. Covers typography, color theory, spatial composition, and visual details.

Built-in skills are loaded from `src/core/ai/skills/*.md` at build time via Vite's `import.meta.glob`.

#### Adding Custom Skills

Pass additional skills as markdown strings via the `skills` config:

```typescript
const myEcommerceSkill = `
# Skill: E-commerce Design
- Product cards must show price, rating, and CTA button
- Use a warm color palette for food/lifestyle products
- Shopping cart icon should be prominent in the navbar
- Product grids: 3-4 columns with hover zoom effect
`;

const editor = createEditor({
  container: '#sg-canvas',
  ai: {
    apiKey: 'sk-...',
    model: 'gpt-4o',
    skills: [myEcommerceSkill],
  },
});
```

#### Loading Skills from Files

If your project uses Vite (or another bundler with raw import support), you can load `.md` files:

```typescript
// Load skills from a local directory
import ecommerceSkill from './my-skills/ecommerce.md?raw';
import saasSkill from './my-skills/saas-landing.md?raw';

const editor = createEditor({
  container: '#sg-canvas',
  ai: {
    apiKey: 'sk-...',
    model: 'gpt-4o',
    skills: [ecommerceSkill, saasSkill],
  },
});
```

Or load all `.md` files from a directory dynamically:

```typescript
// Load all skills from a folder at build time
const skillModules = import.meta.glob('./my-skills/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});
const mySkills = Object.values(skillModules) as string[];

const editor = createEditor({
  container: '#sg-canvas',
  ai: {
    apiKey: 'sk-...',
    model: 'gpt-4o',
    skills: mySkills,
  },
});
```

#### Disabling Built-in Skills

If you want full control over the AI behavior, disable built-in skills:

```typescript
ai: {
  apiKey: 'sk-...',
  model: 'gpt-4o',
  builtinSkills: false,       // disable built-in frontend-design skill
  skills: [myCustomSkill],    // only your skills are used
}
```

#### Writing a Skill

A skill is a markdown string with design guidelines. Recommended structure:

```markdown
# Skill: [Name]

[One-line description of what this skill does]

## Guidelines
- [Rule 1]
- [Rule 2]

## Patterns
[Specific layout/design patterns the AI should follow]

## Anti-Patterns
[Things the AI should avoid]
```

The prompt assembly order is: **System Prompt** + **Built-in Skills** + **Custom Skills** + **Brand Colors**. Each section is separated by `---`.

---

## Provider Examples

### OpenAI

```env
VITE_SG_AI_API_KEY=sk-proj-...
VITE_SG_AI_MODEL=gpt-4o
```

### Groq

```env
VITE_SG_AI_API_KEY=gsk_...
VITE_SG_AI_MODEL=llama-3.3-70b-versatile
VITE_SG_AI_BASE_URL=https://api.groq.com/openai/v1
```

### Google Gemini (OpenAI-compatible)

```env
VITE_SG_AI_API_KEY=your-gemini-key
VITE_SG_AI_MODEL=gemini-2.0-flash
VITE_SG_AI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai
```

### Together AI

```env
VITE_SG_AI_API_KEY=your-together-key
VITE_SG_AI_MODEL=meta-llama/Llama-3.3-70B-Instruct-Turbo
VITE_SG_AI_BASE_URL=https://api.together.xyz/v1
```

### Ollama (Local)

```env
VITE_SG_AI_API_KEY=ollama
VITE_SG_AI_MODEL=llama3
VITE_SG_AI_BASE_URL=http://localhost:11434/v1
```

No real API key is needed for Ollama — any non-empty string works.

---

## Using the AI Assistant

1. Click the sparkle button in the topbar (animated gradient border).
2. Type a description of what you want (e.g. "Create a modern SaaS landing page with hero, features, and pricing sections").
3. Press **Enter** to send (Shift+Enter for newline).
4. Wait for the response — a "Thinking..." indicator will show.
5. When the AI responds with valid HTML, an **Apply to Canvas** button appears.
6. Click it to replace the current canvas content (with confirmation).

### Features

- **Multi-turn conversation**: Ask follow-up questions to refine the design.
- **Image attachment**: Click the paperclip icon to attach a reference image (screenshot, mockup, etc.). The AI will use it as visual context.
- **Include current template**: Check this option to send the current canvas HTML/CSS as context, so the AI can modify or improve what's already there instead of starting from scratch.

---

## Security Notes

- The API key is sent directly from the browser to your configured provider. This is suitable for development and internal tools.
- For production deployments, consider proxying AI requests through your backend to avoid exposing the API key in client-side code.
- The `apiKey` is never stored in localStorage or sent anywhere other than the configured `baseURL`.
