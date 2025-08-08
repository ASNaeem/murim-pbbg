import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // your backend server
        changeOrigin: true,
        // optionally:
        // rewrite: (path) => path.replace(/^\/api/, '') 
        // if your backend does NOT use the '/api' prefix
      },
    },
  },
});
