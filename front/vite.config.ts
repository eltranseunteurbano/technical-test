/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/technical-test/front',
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@utils', replacement: '/src/utils' },
      { find: '@atoms', replacement: '/src/UI/atoms' },
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
