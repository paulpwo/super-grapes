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
