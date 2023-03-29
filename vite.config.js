import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

// vite.config.js
// import { defineConfig } from 'vite'
// import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig(({ command }) => ({
//   plugins: [
//     reactRefresh(),
//   ],
  build: {
    outDir: 'public/build',
    manifest: true,
    rollupOptions: {
      input: 'resources/js/app.jsx',
    },
  },
  base: command === 'serve' ? '' : '/build/',
}))

