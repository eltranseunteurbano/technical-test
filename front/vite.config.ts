import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@utils', replacement: '/src/utils' },
      { find: '@atoms', replacement: '/src/UI/atoms' }
    ]
  },
})
