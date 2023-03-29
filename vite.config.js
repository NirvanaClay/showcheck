import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

// import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';

export default defineConfig(({ command }) => ({
//   plugins: [reactRefresh()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/js'),
    },
  },
  build: {
    outDir: 'public/build',
    manifest: true,
    rollupOptions: {
      input: 'resources/js/app.jsx',
    },
  },
  base: command === 'serve' ? '' : process.env.NODE_ENV === 'production' ? 'https://showcheck.herokuapp.com/build/' : '/build/',
}));
