<script lang="ts">
  import Header from '$components/Header.svelte';
  import { formatMe } from '$utils/FormatText';
</script>

<Header />

{formatMe('Ondrej')}
