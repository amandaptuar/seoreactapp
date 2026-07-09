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
      '/api': {
        target: 'https://limitless-b3he.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
