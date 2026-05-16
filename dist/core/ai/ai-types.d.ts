export interface TextContentPart {
    type: 'text';
    text: string;
}
export interface ImageContentPart {
    type: 'image_url';
    image_url: {
        url: string;
    };
}
export type ContentPart = TextContentPart | ImageContentPart;
export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string | ContentPart[];
}
//# sourceMappingURL=ai-types.d.ts.map