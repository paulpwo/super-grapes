import OpenAI from 'openai';
import type { AiConfig } from '../types';
import type { ChatMessage } from './ai-types';
import { DEFAULT_SYSTEM_PROMPT } from './system-prompt';
import { builtinSkills } from './skills';

function buildSystemPrompt(config: AiConfig): string {
  let prompt = config.systemPrompt || DEFAULT_SYSTEM_PROMPT;

  // Append skills: built-in + user-provided
  const skills: string[] = [];

  if (config.builtinSkills !== false) {
    skills.push(...builtinSkills);
  }

  if (config.skills?.length) {
    skills.push(...config.skills);
  }

  if (skills.length > 0) {
    prompt += '\n\n' + skills.map(s => s.trim()).join('\n\n---\n\n');
  }

  // Append brand colors
  if (config.brandColors) {
    const colors = config.brandColors;
    const lines: string[] = [];
    for (const [key, value] of Object.entries(colors)) {
      if (value) lines.push(`- ${key}: ${value}`);
    }
    if (lines.length > 0) {
      prompt += `\n\n## Brand Color Palette\nUse these colors by default when generating pages. Only deviate if the user explicitly requests different colors.\n${lines.join('\n')}`;
    }
  }

  return prompt;
}

/** Default max completion tokens — prevents provider-default truncation on full pages. */
export const DEFAULT_MAX_TOKENS = 8192;
/** Default sampling temperature. */
export const DEFAULT_TEMPERATURE = 0.7;

export class AiClient {
  private client: OpenAI;
  private model: string;
  private maxTokens: number;
  private temperature: number;
  /** The fully-assembled system prompt (base + skills + brand). Exposed for reuse by generation backends. */
  readonly systemPrompt: string;

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
    this.maxTokens = config.maxTokens ?? DEFAULT_MAX_TOKENS;
    this.temperature = config.temperature ?? DEFAULT_TEMPERATURE;
    this.systemPrompt = buildSystemPrompt(config);
  }

  async chat(messages: ChatMessage[]): Promise<string> {
    const fullMessages: ChatMessage[] = [
      { role: 'system', content: this.systemPrompt },
      ...messages,
    ];

    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: fullMessages as any,
      max_tokens: this.maxTokens,
      temperature: this.temperature,
    });

    return response.choices[0]?.message?.content || '';
  }
}
