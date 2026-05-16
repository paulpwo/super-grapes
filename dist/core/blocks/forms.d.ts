/**
 * Form-related block definitions.
 */
export declare function getFormBlocks(): ({
    id: string;
    label: string;
    category: string;
    media: string;
    content: {
        type: string;
        components: ({
            tagName: string;
            content: string;
            style: {
                'font-weight': string;
                'font-size': string;
                padding?: undefined;
                border?: undefined;
                width?: undefined;
                'box-sizing'?: undefined;
                'background-color'?: undefined;
                color?: undefined;
                cursor?: undefined;
            };
            void?: undefined;
            attributes?: undefined;
        } | {
            tagName: string;
            void: boolean;
            attributes: {
                type: string;
                name: string;
                placeholder: string;
            };
            style: {
                padding: string;
                border: string;
                'font-size': string;
                width: string;
                'box-sizing': string;
                'font-weight'?: undefined;
                'background-color'?: undefined;
                color?: undefined;
                cursor?: undefined;
            };
            content?: undefined;
        } | {
            tagName: string;
            attributes: {
                type: string;
                name?: undefined;
                placeholder?: undefined;
            };
            content: string;
            style: {
                padding: string;
                'background-color': string;
                color: string;
                border: string;
                'font-weight': string;
                'font-size': string;
                cursor: string;
                width?: undefined;
                'box-sizing'?: undefined;
            };
            void?: undefined;
        })[];
    };
} | {
    id: string;
    label: string;
    category: string;
    media: string;
    content: string;
})[];
//# sourceMappingURL=forms.d.ts.map