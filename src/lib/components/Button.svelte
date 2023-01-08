<script lang="ts">
    import type { SvelteComponent } from 'svelte';
    export let label: string;
    export let className: string = '';
    export let onClick: () => void;
    export let style:
        | 'primary'
        | 'secondary'
        | 'desctructive'
        | 'outline'
        | 'textOnly'
        | 'textOnlyDesctructive' = 'primary';
    export let height: 'short' | 'regular' = 'regular';
    export let isAnimated = true;
    export let iconLeft: (new (...args: any[]) => SvelteComponent) | null = null;
    export let iconRight: (new (...args: any[]) => SvelteComponent) | null = null;
</script>

<button
    on:click|preventDefault={() => onClick()}
    class={`button ${className}`}
    class:isAnimated
    class:primary={style === 'primary'}
    class:secondary={style === 'secondary'}
    class:desctructive={style === 'desctructive'}
    class:outline={style === 'outline'}
    class:textOnly={style === 'textOnly'}
    class:textOnlyDesctructive={style === 'textOnlyDesctructive'}
    class:short={height === 'short'}
>
    {#if iconLeft}
        <div class="mr-2">
            <svelte:component this={iconLeft} />
        </div>
    {/if}
    {label}
    {#if iconRight}
        <div class="ml-2">
            <svelte:component this={iconRight} />
        </div>
    {/if}
</button>

<style lang="postcss">
    .isAnimated {
        @apply translate-y-0 shadow-colored transition-all hover:-translate-y-1 hover:shadow-coloredHovered;
    }

    .primary {
        @apply bg-lavenderIndigo text-white;
    }

    .secondary {
        @apply bg-gallery text-daisyBush;
    }

    .desctructive {
        @apply bg-scarlet text-goldenFizz;
    }

    .textOnly {
        @apply bg-transparent px-0 text-lavenderIndigo no-underline hover:underline;
    }

    .textOnlyDesctructive {
        @apply bg-transparent px-0 text-scarlet underline hover:no-underline;
    }

    .outline {
        @apply border-daisyBush text-daisyBush hover:bg-daisyBush hover:text-white;
    }

    .short {
        @apply !py-1;
    }
</style>
