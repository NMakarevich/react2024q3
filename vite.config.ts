import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import scss from 'sass';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: scss,
      },
    },
  },
});
