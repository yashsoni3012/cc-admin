import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://codingcloud.pythonanywhere.com',
        changeOrigin: true,
        secure: false,
        // ✅ REWRITE ENABLED: This removes "/api" from the request path.
        // Frontend: /api/course/  --> Backend: /course/
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
})