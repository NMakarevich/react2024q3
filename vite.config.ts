import { defineConfig } from 'vite';
import { vitePlugin as remix } from '@remix-run/dev';
import scss from 'sass';

export default defineConfig({
  plugins: [remix()],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: scss,
      },
    },
  },
});
