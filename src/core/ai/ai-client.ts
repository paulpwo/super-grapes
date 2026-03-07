import OpenAI from 'openai';
import type { AiConfig } from '../types';
import type { ChatMessage } from './ai-types';
import { DEFAULT_SYSTEM_PROMPT } from './system-prompt';

export class AiClient {
  private client: OpenAI;
  private model: string;
  private systemPrompt: string;

  constructor(config: AiConfig) {
    // In dev mode, use Vite proxy to avoid CORS issues with providers
    // that don't send Access-Control-Allow-Origin (e.g. Google Gemini)
    const isDev = import.meta.env.DEV;
    const baseURL = (isDev && config.baseURL)
      ? `${window.location.origin}/ai-proxy`
      : (config.baseURL || 'https://api.openai.com/v1');

    this.client = new OpenAI({
      apiKey: config.apiKey,
      baseURL,
      dangerouslyAllowBrowser: true,
    });
    this.model = config.model;
    this.systemPrompt = config.systemPrompt || DEFAULT_SYSTEM_PROMPT;
  }

  async chat(messages: ChatMessage[]): Promise<string> {
    const fullMessages: ChatMessage[] = [
      { role: 'system', content: this.systemPrompt },
      ...messages,
    ];

    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: fullMessages as any,
    });

    return response.choices[0]?.message?.content || '';
  }
}
