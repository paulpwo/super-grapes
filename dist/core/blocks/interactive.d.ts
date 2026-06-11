/**
 * Interactive widget block definitions.
 */
export declare function getInteractiveBlocks(): ({
    id: string;
    label: string;
    category: string;
    media: string;
    content: {
        type: string;
        attributes?: undefined;
        style?: undefined;
        components?: undefined;
    };
} | {
    id: string;
    label: string;
    category: string;
    media: string;
    content: {
        type: string;
        attributes: {
            'data-sg-type': string;
            'data-lightbox': string;
        };
        style?: undefined;
        components?: undefined;
    };
} | {
    id: string;
    label: string;
    category: string;
    media: string;
    content: {
        type: string;
        style: {
            'align-items': string;
            'text-align': string;
            padding: string;
        };
        components: ({
            type: string;
            attributes?: undefined;
            tagName?: undefined;
            content?: undefined;
        } | {
            type: string;
            attributes: {
                'data-sg-type': string;
            };
            tagName: string;
            content: string;
        } | {
            type: string;
            attributes: {
                'data-sg-type': string;
            };
            content: string;
            tagName?: undefined;
        })[];
        attributes?: undefined;
    };
})[];
//# sourceMappingURL=interactive.d.ts.map