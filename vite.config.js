// @ts-check
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

const __dirname = import.meta.dirname;

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src', 'index.html'),
        // rsvp: resolve(__dirname, 'src', 'rsvp/index.html'),
      }
    },
  },
  plugins: [
    tailwindcss(),
  ],
});
