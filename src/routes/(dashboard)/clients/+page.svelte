<script lang="ts">
    import Button from '$components/Button.svelte';
    import Search from '$components/Search.svelte';
    import ClientRow from './ClientRow.svelte';
    import ClientRowHeader from './ClientRowHeader.svelte';
    import { clients, loadClients } from '$lib/stores/ClientStore';
    import { onMount } from 'svelte';

    onMount(() => {
        loadClients();
    });
</script>

<svelte:head>
    <title>Clients | Fantastic Broccoli</title>
</svelte:head>

<div
    class="mb-7 flex flex-col-reverse items-start justify-between gap-y-6 md:flex-row md:items-center md:gap-y-4 lg:mb-16"
>
    <!-- search field -->
    <!-- {#if $invoices.length > 0} -->
    <Search />
    <!-- {:else}
        <div />
    {/if} -->

    <!-- new invoice button -->
    <div>
        <Button
            label="Přidat klienta"
            onClick={() => {
                // isInvoiceFormShowing = true;
            }}
        />
    </div>
</div>

<!-- clients -->
<div>
    {#if $clients === null}
        Loading...
    {:else if $clients.length <= 0}
        Blank State
    {:else}
        <!-- client header row -->
        <ClientRowHeader />

        <!-- client rows -->
        <div class="flex flex-col-reverse">
            {#each $clients as client}
                <ClientRow {client} />
            {/each}
        </div>
    {/if}
</div>
