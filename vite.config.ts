import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const aiBaseURL = env.VITE_SG_AI_BASE_URL || '';

  // Auto-proxy AI requests to avoid CORS issues in development
  const proxy: Record<string, any> = {};
  if (aiBaseURL) {
    proxy['/ai-proxy'] = {
      target: aiBaseURL,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/ai-proxy/, ''),
    };
  }

  return {
    root: '.',
    server: { proxy },
  };
});
