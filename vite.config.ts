import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    build: {
        target: 'esnext',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'main.ts'),
            },
        },
    },
    css: {
        postcss: './postcss.config.js',
    },
});