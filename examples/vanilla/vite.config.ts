import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@super-grapes/core': resolve(__dirname, '../../packages/core/src'),
      '@super-grapes/ui': resolve(__dirname, '../../packages/ui/src'),
    },
  },
});
