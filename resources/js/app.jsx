import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';
axios.defaults.xsrfCookieName = 'XSRF-TOKEN';


const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'LaravelRRR'

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
