/**
 * Icon toggle group for GrapesJS style properties.
 * Renders a row of icon buttons, one active at a time.
 */
export interface ToggleItem {
    value: string;
    icon: string;
    title?: string;
}
export declare function renderIconToggle(container: HTMLElement, property: any, label: string, items: ToggleItem[]): void;
//# sourceMappingURL=icon-toggle.d.ts.map