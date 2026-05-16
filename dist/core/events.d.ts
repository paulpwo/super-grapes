/** SuperGrapes custom event name constants */
export declare const SG_EVENTS: {
    /** Fired when the UI is fully initialized and ready */
    readonly UI_READY: "sg:ui:ready";
    /** Fired when a component is selected on the canvas */
    readonly COMPONENT_SELECTED: "sg:component:selected";
    /** Fired when a component is deselected */
    readonly COMPONENT_DESELECTED: "sg:component:deselected";
    /** Fired when the active panel changes */
    readonly PANEL_CHANGE: "sg:panel:change";
    /** Fired when the device/breakpoint changes */
    readonly DEVICE_CHANGE: "sg:device:change";
    /** Fired on save */
    readonly SAVE: "sg:save";
    /** Fired on load */
    readonly LOAD: "sg:load";
};
export type SGEventName = (typeof SG_EVENTS)[keyof typeof SG_EVENTS];
//# sourceMappingURL=events.d.ts.map