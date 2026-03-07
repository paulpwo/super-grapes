/** SuperGrapes custom event name constants */
export const SG_EVENTS = {
  /** Fired when the UI is fully initialized and ready */
  UI_READY: 'sg:ui:ready',
  /** Fired when a component is selected on the canvas */
  COMPONENT_SELECTED: 'sg:component:selected',
  /** Fired when a component is deselected */
  COMPONENT_DESELECTED: 'sg:component:deselected',
  /** Fired when the active panel changes */
  PANEL_CHANGE: 'sg:panel:change',
  /** Fired when the device/breakpoint changes */
  DEVICE_CHANGE: 'sg:device:change',
  /** Fired on save */
  SAVE: 'sg:save',
  /** Fired on load */
  LOAD: 'sg:load',
} as const;

export type SGEventName = (typeof SG_EVENTS)[keyof typeof SG_EVENTS];
