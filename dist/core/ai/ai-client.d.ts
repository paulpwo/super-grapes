import type { AiConfig } from '../types';
import type { ChatMessage } from './ai-types';
export declare class AiClient {
    private client;
    private model;
    private systemPrompt;
    constructor(config: AiConfig);
    chat(messages: ChatMessage[]): Promise<string>;
}
//# sourceMappingURL=ai-client.d.ts.map