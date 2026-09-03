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
      '/api/v1/scenario': {
        target: 'https://scenario-v1.160-153-179-249.sslip.io',
        changeOrigin: true,
        secure: false,
      },
      '/api/v1/levers': {
        target: 'https://scenario-v1.160-153-179-249.sslip.io',
        changeOrigin: true,
        secure: false,
      },
      '/api/v1/engagement': {
        target: 'https://engagement-v1.160-153-179-249.sslip.io',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/v1\/engagement/, '/api/v1')
      },
      '/api/v1/executive': {
        target: 'https://limitless-executive.160-153-179-249.sslip.io',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/v1\/executive/, '/v1')
      },
      '/api/v1/coach': {
        target: 'https://coach-v1.160-153-179-249.sslip.io',
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'https://limitless-model.160-153-179-249.sslip.io',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
