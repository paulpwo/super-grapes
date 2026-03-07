import type { SuperGrapesConfig } from './types';
import { DEFAULT_DEVICES } from './devices';

/**
 * Build the full GrapesJS initialization config from SuperGrapesConfig.
 * Sets custom:true on all managers so we render our own Elementor-like UI.
 */
export function buildGrapesConfig(config: SuperGrapesConfig): Record<string, unknown> {
  const devices = (config.devices ?? DEFAULT_DEVICES).map((d) => ({
    name: d.name,
    width: d.width,
    ...(d.widthMedia ? { widthMedia: d.widthMedia } : {}),
  }));

  const base: Record<string, unknown> = {
    container: config.container,
    height: '100%',
    width: 'auto',
    fromElement: false,

    // No default panels — we render our own UI
    panels: { defaults: [] },

    // Custom rendering for all managers
    blockManager: { custom: true },
    styleManager: {
      custom: true,
      sectors: getStyleSectors(),
    },
    traitManager: { custom: true },
    layerManager: { custom: true },

    // Devices
    deviceManager: { devices },

    // We handle storage separately via configureStorage()
    storageManager: false,

    // Canvas styles — load Font Awesome 6 inside the iframe
    canvas: {
      styles: [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
      ],
    },
  };

  // Merge user-provided grapesjs overrides (shallow)
  if (config.grapesOptions) {
    Object.assign(base, config.grapesOptions);
  }

  return base;
}

/** Comprehensive style manager sector definitions */
function getStyleSectors() {
  return [
    {
      name: 'General',
      open: false,
      properties: [
        { property: 'display', type: 'select', defaults: 'block', options: [
          { id: 'block', label: 'Block' },
          { id: 'inline', label: 'Inline' },
          { id: 'inline-block', label: 'Inline Block' },
          { id: 'flex', label: 'Flex' },
          { id: 'grid', label: 'Grid' },
          { id: 'none', label: 'None' },
        ]},
        { property: 'float', type: 'radio', defaults: 'none', options: [
          { id: 'none', label: 'None' },
          { id: 'left', label: 'Left' },
          { id: 'right', label: 'Right' },
        ]},
        { property: 'position', type: 'select', defaults: 'static', options: [
          { id: 'static', label: 'Static' },
          { id: 'relative', label: 'Relative' },
          { id: 'absolute', label: 'Absolute' },
          { id: 'fixed', label: 'Fixed' },
          { id: 'sticky', label: 'Sticky' },
        ]},
        { property: 'top', type: 'number', units: ['px', '%', 'em', 'rem', 'vh'] },
        { property: 'right', type: 'number', units: ['px', '%', 'em', 'rem', 'vw'] },
        { property: 'bottom', type: 'number', units: ['px', '%', 'em', 'rem', 'vh'] },
        { property: 'left', type: 'number', units: ['px', '%', 'em', 'rem', 'vw'] },
      ],
    },
    {
      name: 'Dimension',
      open: false,
      properties: [
        { property: 'width', type: 'number', units: ['px', '%', 'em', 'rem', 'vw', 'auto'], defaults: 'auto' },
        { property: 'height', type: 'number', units: ['px', '%', 'em', 'rem', 'vh', 'auto'], defaults: 'auto' },
        { property: 'max-width', type: 'number', units: ['px', '%', 'em', 'rem', 'vw', 'none'] },
        { property: 'max-height', type: 'number', units: ['px', '%', 'em', 'rem', 'vh', 'none'] },
        { property: 'margin', type: 'composite', properties: [
          { property: 'margin-top', type: 'number', units: ['px', '%', 'em', 'rem'], defaults: '0' },
          { property: 'margin-right', type: 'number', units: ['px', '%', 'em', 'rem'], defaults: '0' },
          { property: 'margin-bottom', type: 'number', units: ['px', '%', 'em', 'rem'], defaults: '0' },
          { property: 'margin-left', type: 'number', units: ['px', '%', 'em', 'rem'], defaults: '0' },
        ]},
        { property: 'padding', type: 'composite', properties: [
          { property: 'padding-top', type: 'number', units: ['px', '%', 'em', 'rem'], defaults: '0' },
          { property: 'padding-right', type: 'number', units: ['px', '%', 'em', 'rem'], defaults: '0' },
          { property: 'padding-bottom', type: 'number', units: ['px', '%', 'em', 'rem'], defaults: '0' },
          { property: 'padding-left', type: 'number', units: ['px', '%', 'em', 'rem'], defaults: '0' },
        ]},
      ],
    },
    {
      name: 'Typography',
      open: false,
      properties: [
        { property: 'font-family', type: 'select', defaults: 'Arial, sans-serif', options: [
          { id: 'Arial, sans-serif', label: 'Arial' },
          { id: 'Helvetica, sans-serif', label: 'Helvetica' },
          { id: 'Georgia, serif', label: 'Georgia' },
          { id: '"Times New Roman", serif', label: 'Times New Roman' },
          { id: '"Courier New", monospace', label: 'Courier New' },
          { id: 'Verdana, sans-serif', label: 'Verdana' },
          { id: '"Trebuchet MS", sans-serif', label: 'Trebuchet MS' },
          { id: 'system-ui, sans-serif', label: 'System UI' },
        ]},
        { property: 'font-size', type: 'number', units: ['px', 'em', 'rem', '%', 'vw'], defaults: '16px' },
        { property: 'font-weight', type: 'select', defaults: '400', options: [
          { id: '100', label: 'Thin' },
          { id: '200', label: 'Extra Light' },
          { id: '300', label: 'Light' },
          { id: '400', label: 'Normal' },
          { id: '500', label: 'Medium' },
          { id: '600', label: 'Semi Bold' },
          { id: '700', label: 'Bold' },
          { id: '800', label: 'Extra Bold' },
          { id: '900', label: 'Black' },
        ]},
        { property: 'letter-spacing', type: 'number', units: ['px', 'em', 'rem'] },
        { property: 'color', type: 'color', defaults: '#000000' },
        { property: 'line-height', type: 'number', units: ['px', 'em', 'rem', ''] },
        { property: 'text-align', type: 'radio', defaults: 'left', options: [
          { id: 'left', label: 'Left' },
          { id: 'center', label: 'Center' },
          { id: 'right', label: 'Right' },
          { id: 'justify', label: 'Justify' },
        ]},
        { property: 'text-decoration', type: 'select', defaults: 'none', options: [
          { id: 'none', label: 'None' },
          { id: 'underline', label: 'Underline' },
          { id: 'overline', label: 'Overline' },
          { id: 'line-through', label: 'Line Through' },
        ]},
        { property: 'text-shadow', type: 'stack', properties: [
          { property: 'text-shadow-h', type: 'number', units: ['px'], defaults: '0' },
          { property: 'text-shadow-v', type: 'number', units: ['px'], defaults: '0' },
          { property: 'text-shadow-blur', type: 'number', units: ['px'], defaults: '0' },
          { property: 'text-shadow-color', type: 'color', defaults: '#000000' },
        ]},
        { property: 'text-transform', type: 'select', defaults: 'none', options: [
          { id: 'none', label: 'None' },
          { id: 'uppercase', label: 'Uppercase' },
          { id: 'lowercase', label: 'Lowercase' },
          { id: 'capitalize', label: 'Capitalize' },
        ]},
      ],
    },
    {
      name: 'Decorations',
      open: false,
      properties: [
        { property: 'background-color', type: 'color', defaults: 'transparent' },
        { property: 'background-image', type: 'file' },
        { property: 'background-repeat', type: 'select', defaults: 'repeat', options: [
          { id: 'repeat', label: 'Repeat' },
          { id: 'repeat-x', label: 'Repeat X' },
          { id: 'repeat-y', label: 'Repeat Y' },
          { id: 'no-repeat', label: 'No Repeat' },
        ]},
        { property: 'background-position', type: 'select', defaults: 'left top', options: [
          { id: 'left top', label: 'Left Top' },
          { id: 'left center', label: 'Left Center' },
          { id: 'left bottom', label: 'Left Bottom' },
          { id: 'center top', label: 'Center Top' },
          { id: 'center center', label: 'Center' },
          { id: 'center bottom', label: 'Center Bottom' },
          { id: 'right top', label: 'Right Top' },
          { id: 'right center', label: 'Right Center' },
          { id: 'right bottom', label: 'Right Bottom' },
        ]},
        { property: 'background-size', type: 'select', defaults: 'auto', options: [
          { id: 'auto', label: 'Auto' },
          { id: 'cover', label: 'Cover' },
          { id: 'contain', label: 'Contain' },
          { id: '100% 100%', label: 'Stretch' },
        ]},
        { property: 'border-radius', type: 'composite', properties: [
          { property: 'border-top-left-radius', type: 'number', units: ['px', '%', 'em'], defaults: '0' },
          { property: 'border-top-right-radius', type: 'number', units: ['px', '%', 'em'], defaults: '0' },
          { property: 'border-bottom-right-radius', type: 'number', units: ['px', '%', 'em'], defaults: '0' },
          { property: 'border-bottom-left-radius', type: 'number', units: ['px', '%', 'em'], defaults: '0' },
        ]},
        { property: 'border', type: 'composite', properties: [
          { property: 'border-width', type: 'number', units: ['px', 'em'], defaults: '0' },
          { property: 'border-style', type: 'select', defaults: 'none', options: [
            { id: 'none', label: 'None' },
            { id: 'solid', label: 'Solid' },
            { id: 'dashed', label: 'Dashed' },
            { id: 'dotted', label: 'Dotted' },
            { id: 'double', label: 'Double' },
            { id: 'groove', label: 'Groove' },
          ]},
          { property: 'border-color', type: 'color', defaults: '#000000' },
        ]},
        { property: 'box-shadow', type: 'stack', properties: [
          { property: 'box-shadow-h', type: 'number', units: ['px'], defaults: '0' },
          { property: 'box-shadow-v', type: 'number', units: ['px'], defaults: '0' },
          { property: 'box-shadow-blur', type: 'number', units: ['px'], defaults: '5' },
          { property: 'box-shadow-spread', type: 'number', units: ['px'], defaults: '0' },
          { property: 'box-shadow-color', type: 'color', defaults: '#000000' },
          { property: 'box-shadow-type', type: 'select', defaults: '', options: [
            { id: '', label: 'Outside' },
            { id: 'inset', label: 'Inset' },
          ]},
        ]},
        { property: 'opacity', type: 'slider', defaults: 1, min: 0, max: 1, step: 0.01 },
      ],
    },
    {
      name: 'Flex',
      open: false,
      properties: [
        { property: 'flex-direction', type: 'select', defaults: 'row', options: [
          { id: 'row', label: 'Row' },
          { id: 'row-reverse', label: 'Row Reverse' },
          { id: 'column', label: 'Column' },
          { id: 'column-reverse', label: 'Column Reverse' },
        ]},
        { property: 'flex-wrap', type: 'select', defaults: 'nowrap', options: [
          { id: 'nowrap', label: 'No Wrap' },
          { id: 'wrap', label: 'Wrap' },
          { id: 'wrap-reverse', label: 'Wrap Reverse' },
        ]},
        { property: 'justify-content', type: 'select', defaults: 'flex-start', options: [
          { id: 'flex-start', label: 'Start' },
          { id: 'flex-end', label: 'End' },
          { id: 'center', label: 'Center' },
          { id: 'space-between', label: 'Space Between' },
          { id: 'space-around', label: 'Space Around' },
          { id: 'space-evenly', label: 'Space Evenly' },
        ]},
        { property: 'align-items', type: 'select', defaults: 'stretch', options: [
          { id: 'flex-start', label: 'Start' },
          { id: 'flex-end', label: 'End' },
          { id: 'center', label: 'Center' },
          { id: 'stretch', label: 'Stretch' },
          { id: 'baseline', label: 'Baseline' },
        ]},
        { property: 'align-content', type: 'select', defaults: 'stretch', options: [
          { id: 'flex-start', label: 'Start' },
          { id: 'flex-end', label: 'End' },
          { id: 'center', label: 'Center' },
          { id: 'stretch', label: 'Stretch' },
          { id: 'space-between', label: 'Space Between' },
          { id: 'space-around', label: 'Space Around' },
        ]},
        { property: 'order', type: 'number', defaults: 0 },
        { property: 'flex-basis', type: 'number', units: ['px', '%', 'em', 'rem', 'auto'], defaults: 'auto' },
        { property: 'flex-grow', type: 'number', defaults: 0 },
        { property: 'flex-shrink', type: 'number', defaults: 1 },
        { property: 'align-self', type: 'select', defaults: 'auto', options: [
          { id: 'auto', label: 'Auto' },
          { id: 'flex-start', label: 'Start' },
          { id: 'flex-end', label: 'End' },
          { id: 'center', label: 'Center' },
          { id: 'stretch', label: 'Stretch' },
          { id: 'baseline', label: 'Baseline' },
        ]},
      ],
    },
    {
      name: 'Extra',
      open: false,
      properties: [
        { property: 'transition', type: 'stack', properties: [
          { property: 'transition-property', type: 'select', defaults: 'all', options: [
            { id: 'all', label: 'All' },
            { id: 'opacity', label: 'Opacity' },
            { id: 'transform', label: 'Transform' },
            { id: 'background-color', label: 'Background' },
            { id: 'color', label: 'Color' },
            { id: 'width', label: 'Width' },
            { id: 'height', label: 'Height' },
          ]},
          { property: 'transition-duration', type: 'number', units: ['s', 'ms'], defaults: '0.3s' },
          { property: 'transition-timing-function', type: 'select', defaults: 'ease', options: [
            { id: 'ease', label: 'Ease' },
            { id: 'linear', label: 'Linear' },
            { id: 'ease-in', label: 'Ease In' },
            { id: 'ease-out', label: 'Ease Out' },
            { id: 'ease-in-out', label: 'Ease In Out' },
          ]},
        ]},
        { property: 'transform', type: 'stack', properties: [
          { property: 'transform-rotate', type: 'number', units: ['deg'], defaults: '0' },
          { property: 'transform-scale', type: 'number', defaults: '1' },
          { property: 'transform-translate-x', type: 'number', units: ['px', '%'], defaults: '0' },
          { property: 'transform-translate-y', type: 'number', units: ['px', '%'], defaults: '0' },
        ]},
        { property: 'cursor', type: 'select', defaults: 'auto', options: [
          { id: 'auto', label: 'Auto' },
          { id: 'pointer', label: 'Pointer' },
          { id: 'default', label: 'Default' },
          { id: 'move', label: 'Move' },
          { id: 'text', label: 'Text' },
          { id: 'crosshair', label: 'Crosshair' },
          { id: 'not-allowed', label: 'Not Allowed' },
          { id: 'grab', label: 'Grab' },
        ]},
        { property: 'overflow', type: 'select', defaults: 'visible', options: [
          { id: 'visible', label: 'Visible' },
          { id: 'hidden', label: 'Hidden' },
          { id: 'scroll', label: 'Scroll' },
          { id: 'auto', label: 'Auto' },
        ]},
      ],
    },
  ];
}
