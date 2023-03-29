import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel(['resources/js/Pages/Main.jsx']),
        react(),
    ],
    build: {
        target: 'esnext'
    }
});

// import { defineConfig } from 'vite';
// import laravel from 'laravel-vite-plugin';
// import react from '@vitejs/plugin-react';

// // Check if the environment is production
// const isProduction = process.env.NODE_ENV === 'production';

// export default defineConfig({
//   plugins: [
//     laravel(['resources/js/Pages/Main.jsx']),
//     react(),
//   ],
//   build: {
//     target: 'esnext',
//     outDir: 'public',
//     manifest: true,
//     rollupOptions: {
//       input: 'resources/js/app.jsx',
//     },
//   },
//   base: isProduction ? '/public/' : '/',
// });
