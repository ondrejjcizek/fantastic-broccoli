<script lang="ts">
    export let className: string = '';
    import { fade } from 'svelte/transition';
</script>

<svelte:head>
    <style lang="postcss">
        body {
            @apply overflow-hidden;
        }
    </style>
</svelte:head>

<div class={`fixed inset-0 z-overlay bg-blueGem opacity-60 ${className}`} transition:fade />
