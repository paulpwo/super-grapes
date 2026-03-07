import type { DeviceConfig } from './types';

/** Default device breakpoints */
export const DEFAULT_DEVICES: DeviceConfig[] = [
  {
    name: 'Desktop',
    width: '',
    widthMedia: '',
  },
  {
    name: 'Tablet',
    width: '768px',
    widthMedia: '992px',
  },
  {
    name: 'Mobile',
    width: '375px',
    widthMedia: '480px',
  },
];
