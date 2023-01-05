{
    module.exports = {
        plugins: [require('prettier-plugin-svelte'), require('prettier-plugin-tailwindcss')],
        tailwindConfig: './tailwind.config.cjs',
        useTabs: false,
        singleQuote: true,
        trailingComma: 'none',
        printWidth: 100,
        tabWidth: 4
        // pluginSearchDirs: ["."],
        // overrides: [{ "files": "*.svelte", "options": { "parser": "svelte" } }]
    };
}
