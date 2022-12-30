<script lang="ts">
  import View from './Icon/View.svelte';
  export let options: {
    label: string;
    icon?: string;
    disabled: boolean;
    onClick: () => void;
  };
</script>

<ul class="absolute left-0 top-4 rounded-lg bg-white shadow-lg">
  <li>
    <button
      class="flex w-full gap-x-2 p-4 font-sansSerif font-bold text-pastelPurple hover:text-daisyBush "
    >
      <View />
      Send
    </button>
  </li>
  <li>
    <button
      class="flex w-full gap-x-2 p-4 font-sansSerif font-bold text-pastelPurple hover:text-daisyBush "
    >
      <View />
      Send
    </button>
  </li>
</ul>

<style lang="postcss">
  li {
    @apply border-b-2 border-whisper;
  }

  li:last-child {
    @apply border-b-0;
  }
</style>
