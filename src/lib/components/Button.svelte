<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  export let label: string;
  export let onClick: () => void;
  export let style: 'primary' | 'secondary' | 'desctructive' | 'outline' | 'textOnly' = 'primary';
  export let isAnimated = true;
  export let iconLeft: (new (...args: any[]) => SvelteComponent) | null = null;
  export let iconRight: (new (...args: any[]) => SvelteComponent) | null = null;
</script>

<button
  on:click|preventDefault={() => onClick()}
  class="relative flex items-center whitespace-nowrap rounded-lg px-5 py-2 font-sansSerif text-base font-black lg:px-10 lg:py-3 lg:text-xl"
  class:isAnimated
  class:primary={style === 'primary'}
  class:secondary={style === 'secondary'}
  class:desctructive={style === 'desctructive'}
  class:outline={style === 'outline'}
  class:textOnly={style === 'textOnly'}
>
  {#if iconLeft}
    <svelte:component this={iconLeft} class="mr-2" />
  {/if}
  {label}
  {#if iconRight}
    <svelte:component this={iconRight} class="ml-2" />
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

  .outline {
    @apply border-darkBroccoli text-darkBroccoli hover:bg-darkBroccoli hover:text-white;
  }

  .textOnly {
    @apply bg-transparent px-0 text-scarlet underline hover:no-underline;
  }
</style>
