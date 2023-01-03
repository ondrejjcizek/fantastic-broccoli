<script lang="ts">
  export let className = '';
</script>

<div class={`table-header invoice-table hidden lg:grid ${className}`}>
  <h3>Stav</h3>
  <h3>Splatnost</h3>
  <h3>#</h3>
  <h3>Klient</h3>
  <h3 class="text-right">Cena</h3>
  <div />
  <div />
</div>

<style lang="postcss">
  .table-header h3 {
    @apply text-xl font-black leading-snug;
  }
</style>
