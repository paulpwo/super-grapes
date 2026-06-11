import type { AiConfig } from '../types';
import { AiClient } from './ai-client';
import { builtinSkills } from './skills';
import type { ChatMessage, ContentPart } from './ai-types';

/**
 * Generation mode, shared with the quality gate.
 * - 'generate': empty-canvas full-page generation.
 * - 'replace': modal full-page replace.
 * - 'append': add a section below existing content.
 * - 'edit': modify a single existing component.
 */
export type GenerationMode = 'generate' | 'replace' | 'append' | 'edit';

/** Context the host needs to fulfil a generation request. */
export interface GenerationContext {
  mode: GenerationMode;
  /** Current page HTML (for replace-with-context / append / edit). Null when not relevant. */
  currentHtml: string | null;
  /** Current page CSS. Null when not relevant. */
  currentCss: string | null;
}

/** A single generation request dispatched to a backend. */
export interface GenerationRequest {
  /** The raw user intent / instruction text. */
  intent: string;
  context: GenerationContext;
  /** Optional reference image as a data URL. */
  image?: string | null;
}

/**
 * Pluggable generation backend. Both the direct provider call and a host-owned
 * agentic endpoint implement this single method.
 */
export interface GenerationBackend {
  /** Generate (or modify) HTML for the given request. Resolves to raw HTML/markdown. */
  generate(request: GenerationRequest): Promise<string>;
}

/**
 * Default backend: single-shot OpenAI-compatible chat completion via {@link AiClient}.
 * Byte-for-byte equivalent to the original direct path — the intent + context are
 * folded into one user message exactly as the call sites previously did.
 */
export class DirectBackend implements GenerationBackend {
  private client: AiClient;

  constructor(config: AiConfig) {
    this.client = new AiClient(config);
  }

  async generate(request: GenerationRequest): Promise<string> {
    const text = buildDirectUserText(request);

    let content: string | ContentPart[];
    if (request.image) {
      content = [
        { type: 'text', text },
        { type: 'image_url', image_url: { url: request.image } },
      ];
    } else {
      content = text;
    }

    const messages: ChatMessage[] = [{ role: 'user', content }];
    return this.client.chat(messages);
  }
}

/**
 * Fold intent + context into the single user-message text, matching the prior
 * inline call-site behavior so the direct path is unchanged.
 */
function buildDirectUserText(request: GenerationRequest): string {
  const { intent, context } = request;
  if (context.mode === 'edit' && context.currentHtml) {
    return (
      `[Component to edit]\n${context.currentHtml}\n\n` +
      `[User request]\nModify the component above based on this instruction. ` +
      `Return ONLY the modified HTML for this component, not a full page:\n${intent}`
    );
  }
  if ((context.mode === 'replace' || context.mode === 'append') && context.currentHtml) {
    const css = context.currentCss ? `\n\n[Current template CSS]\n${context.currentCss}` : '';
    return `[Current template HTML]\n${context.currentHtml}${css}\n\n[User request]\n${intent}`;
  }
  return intent;
}

/** Wire-format request body POSTed to a generation endpoint. */
interface EndpointRequestBody {
  intent: string;
  context: {
    mode: GenerationMode;
    currentHtml: string | null;
    currentCss: string | null;
  };
  brandColors: AiConfig['brandColors'] | null;
  skills: string[] | null;
  image: string | null;
}

/** Default endpoint timeout: 5 minutes. The server may run a multi-call agent loop. */
const ENDPOINT_TIMEOUT_MS = 5 * 60 * 1000;

/**
 * Endpoint backend: POSTs intent + context to a host-provided URL that owns the
 * generation loop, and expects `{ html: string }` back. The host receives the
 * resolved skills (built-in + custom, unless disabled) and brand colors so it can
 * run an enriched server-side pipeline.
 */
export class EndpointBackend implements GenerationBackend {
  private endpoint: string;
  private headers: Record<string, string>;
  private brandColors: AiConfig['brandColors'] | null;
  private skills: string[] | null;

  constructor(config: AiConfig) {
    const endpoint = config.generation?.endpoint;
    if (!endpoint) {
      throw new Error('AiConfig.generation.endpoint is required when generation.mode === "endpoint".');
    }
    this.endpoint = endpoint;
    this.headers = config.generation?.headers ?? {};

    this.brandColors = config.brandColors ?? null;

    const skills: string[] = [];
    if (config.builtinSkills !== false) skills.push(...builtinSkills);
    if (config.skills?.length) skills.push(...config.skills);
    this.skills = skills.length > 0 ? skills : null;
  }

  async generate(request: GenerationRequest): Promise<string> {
    const body: EndpointRequestBody = {
      intent: request.intent,
      context: {
        mode: request.context.mode,
        currentHtml: request.context.currentHtml,
        currentCss: request.context.currentCss,
      },
      brandColors: this.brandColors,
      skills: this.skills,
      image: request.image ?? null,
    };

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ENDPOINT_TIMEOUT_MS);

    let res: Response;
    try {
      res = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...this.headers },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
    } catch (err: any) {
      clearTimeout(timer);
      if (err?.name === 'AbortError') {
        throw new Error('Generation timed out. The server took too long to respond.');
      }
      throw new Error(err?.message || 'Failed to reach the generation endpoint.');
    } finally {
      clearTimeout(timer);
    }

    if (!res.ok) {
      let message = `Generation failed (HTTP ${res.status}).`;
      try {
        const errBody = await res.json();
        message = errBody?.detail || errBody?.error || message;
      } catch {
        // body was not JSON — keep the status-based message
      }
      throw new Error(message);
    }

    const data = await res.json().catch(() => null);
    if (!data || typeof data.html !== 'string') {
      throw new Error('The generation endpoint did not return a valid { html } payload.');
    }
    return data.html;
  }
}

/**
 * Select the generation backend from config. Defaults to {@link DirectBackend}
 * when `generation` is absent or `mode` is 'direct' — backwards compatible.
 */
export function createGenerationBackend(config: AiConfig): GenerationBackend {
  if (config.generation?.mode === 'endpoint') {
    return new EndpointBackend(config);
  }
  return new DirectBackend(config);
}

/** True when config routes generation through a host endpoint (quality-gate retry is the server's job). */
export function isEndpointMode(config: AiConfig): boolean {
  return config.generation?.mode === 'endpoint';
}
