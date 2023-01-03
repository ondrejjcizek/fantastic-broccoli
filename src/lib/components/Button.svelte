<script lang="ts">
  export let label: string;
  export let onClick: () => void;
  export let style: 'primary' | 'secondary' | 'desctructive' = 'primary';
  export let isAnimated = true;
</script>

<button
  on:click|preventDefault={() => onClick()}
  class="relative whitespace-nowrap rounded-lg px-5 py-2 font-sansSerif text-base font-black lg:px-10 lg:py-3 lg:text-xl"
  class:isAnimated
  class:primary={style === 'primary'}
  class:secondary={style === 'secondary'}
  class:desctructive={style === 'desctructive'}>{label}</button
>

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
</style>
