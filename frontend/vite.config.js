import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5002, //явно указываем порт для фронтенда
    proxy: {
      //Прокси для REST API
      '/api': {
        target: 'http://localhost:5001', // Адрес сервера
        changeOrigin: true,  // Рекомендуется для корректного CORS
      },
      // Прокси для WebSocket (если используется)
      '/socket.io': {
        target: 'ws://localhost:5001',  // WebSocket-адрес
        ws: true,  // Обязательно для WebSocket
        rewriteWsOrigin: true,  // Сохраняем, как в примере
      },
    },
  },
})
