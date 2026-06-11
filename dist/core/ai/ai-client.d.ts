import type { AiConfig } from '../types';
import type { ChatMessage } from './ai-types';
/** Default max completion tokens — prevents provider-default truncation on full pages. */
export declare const DEFAULT_MAX_TOKENS = 8192;
/** Default sampling temperature. */
export declare const DEFAULT_TEMPERATURE = 0.7;
export declare class AiClient {
    private client;
    private model;
    private maxTokens;
    private temperature;
    /** The fully-assembled system prompt (base + skills + brand). Exposed for reuse by generation backends. */
    readonly systemPrompt: string;
    constructor(config: AiConfig);
    chat(messages: ChatMessage[]): Promise<string>;
}
//# sourceMappingURL=ai-client.d.ts.map