import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  build: {
    minify: 'terser',
    target: 'esnext',
    sourcemap: true,
  },
  base: './',
});
