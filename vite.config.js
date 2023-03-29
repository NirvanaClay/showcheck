import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

// vite.config.js
// import { defineConfig } from 'vite'
// import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig(({ command }) => ({
//   plugins: [
//     reactRefresh(),
//   ],
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
  base: command === 'serve' ? '' : '/build/',
}))

