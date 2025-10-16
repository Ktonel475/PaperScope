import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths'

export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:4000',
      '/uploads': {
        target: 'http://localhost:4000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
  }
});
