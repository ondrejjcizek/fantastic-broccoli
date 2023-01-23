import adapter from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    vitePlugin: {
        experimental: {
            inspector: true
        }
    },

    preprocess: [
        vitePreprocess({
            postcss: true
        }),
        sveltePreprocess({
            postcss: {
                // prependData: '@import "src/variables.styl"',
            }
        })
    ],

    kit: {
        adapter: adapter(),
        alias: {
            $utils: './src/lib/utils',
            $components: './src/lib/components',
            $stores: './src/lib/stores',
            $actions: './src/lib/actions',
            $global: './src/global.d.ts'
        }
    }
};

export default config;
