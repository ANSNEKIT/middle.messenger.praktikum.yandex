import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    build: {
        target: 'esnext',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
        },
    },
    css: {
        postcss: './postcss.config.js',
    },
    resolve: {
        alias: {
            '@/': `${resolve(__dirname, './src')}/`,
        },
    },
});