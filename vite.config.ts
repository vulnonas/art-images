import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: '0.0.0.0', // Разрешает доступ со всех IP-адресов
    port: 5173,
    strictPort: true, // Не меняет порт автоматически, если 5173 занят
    hmr: {
      clientPort: 443 // Важно для работы через туннели
    }
  },
});