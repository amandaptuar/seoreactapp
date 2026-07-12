import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/dashbaord-app"),
    },
  },
  server: {
    proxy: {
      // AI model service (generate-questions / analyze / PDFs / longitudinal).
      // Account & admin calls go to the Node backend via lib/backendApi.js
      // (http://localhost:4000 in dev) and don't use this proxy.
      '/api': {
        target: 'https://limitless-model.160-153-179-249.sslip.io',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
