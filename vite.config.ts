import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target:
          // 'http://StreamForgeBackEnd-env.eba-ck4xhmjr.us-east-1.elasticbeanstalk.com',
        'http://localhost:3008',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false,
      },
    },
  },
});
