import type { AiConfig } from '../types';
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
export declare class DirectBackend implements GenerationBackend {
    private client;
    constructor(config: AiConfig);
    generate(request: GenerationRequest): Promise<string>;
}
/**
 * Endpoint backend: POSTs intent + context to a host-provided URL that owns the
 * generation loop, and expects `{ html: string }` back. The host receives the
 * resolved skills (built-in + custom, unless disabled) and brand colors so it can
 * run an enriched server-side pipeline.
 */
export declare class EndpointBackend implements GenerationBackend {
    private endpoint;
    private headers;
    private brandColors;
    private skills;
    constructor(config: AiConfig);
    generate(request: GenerationRequest): Promise<string>;
}
/**
 * Select the generation backend from config. Defaults to {@link DirectBackend}
 * when `generation` is absent or `mode` is 'direct' — backwards compatible.
 */
export declare function createGenerationBackend(config: AiConfig): GenerationBackend;
/** True when config routes generation through a host endpoint (quality-gate retry is the server's job). */
export declare function isEndpointMode(config: AiConfig): boolean;
//# sourceMappingURL=generation-backend.d.ts.map