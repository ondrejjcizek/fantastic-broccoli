<script lang="ts">
  export let label: 'koncept' | 'odesláno' | 'aktuální' | 'neuhrazeno' | 'uhrazeno' | 'archiv' = 'koncept';
  export let className = '';
</script>

<div
  class={`w-fit rounded-full border-1 p-1 px-[8px] text-center text-sm font-semibold capitalize ${className}`}
  class:inverted={label === 'koncept'}
  class:success={label === 'odesláno' || label === 'aktuální'}
  class:alert={label === 'neuhrazeno'}
  class:archive={label === 'uhrazeno' || label === 'archiv'}
>
  {label}
</div>

<style lang="postcss">
  .inverted {
    @apply border-pastelPurple text-pastelPurple;
  }

  .success {
    @apply border-robinEggBlue bg-robinEggBlue text-blueGem;
  }

  .alert {
    @apply border-scarlet bg-scarlet text-goldenFizz;
  }

  .archive {
    @apply border-pastelPurple bg-pastelPurple text-white;
  }
</style>
