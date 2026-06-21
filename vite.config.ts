/// <reference types="vitest/config" />

import { fileURLToPath, URL } from 'node:url';

import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [svelte()],
    resolve: {
        alias: {
            '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
        },
    },
    test: {
        environment: 'node',
        include: ['src/**/*.{test,spec}.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
            exclude: [
                'src/lib/providers/anilist/anilist.generated.ts',
                'src/**/*.svelte',
                'src/**/*.config.ts',
                'src/**/*.mock.ts',
            ],
        },
    },
});
