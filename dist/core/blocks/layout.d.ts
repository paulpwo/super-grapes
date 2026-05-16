/**
 * Layout block definitions.
 * Each block creates a structural layout component tree.
 */
export declare function getLayoutBlocks(): ({
    id: string;
    label: string;
    category: string;
    media: string;
    content: {
        type: string;
        components: {
            type: string;
        }[];
    };
} | {
    id: string;
    label: string;
    category: string;
    media: string;
    content: {
        type: string;
        components: {
            type: string;
            components: {
                type: string;
            }[];
        }[];
    };
} | {
    id: string;
    label: string;
    category: string;
    media: string;
    content: {
        type: string;
        components: {
            type: string;
            components: {
                type: string;
                style: {
                    flex: string;
                    'max-width': string;
                };
            }[];
        }[];
    };
})[];
//# sourceMappingURL=layout.d.ts.map