import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      assets: path.resolve(__dirname, 'src/assets/'),
      components: path.resolve(__dirname, 'src/components/'),
      constants: path.resolve(__dirname, 'src/constants/'),
      layouts: path.resolve(__dirname, 'src/layouts/'),
      pages: path.resolve(__dirname, 'src/pages/'),
      types: path.resolve(__dirname, 'src/types/'),
      router: path.resolve(__dirname, 'src/router/'),
    },
  },
  server: {
    host: true,
    headers: {
      'Content-Security-Policy': "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://code.jquery.com https://cdn.jsdelivr.net https://stackpath.bootstrapcdn.com;",
    }
  },
})
