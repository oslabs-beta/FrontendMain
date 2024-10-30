import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://StreamForgeBackEnd-env.eba-ck4xhmjr.us-east-1.elasticbeanstalk.com',
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  },
});
