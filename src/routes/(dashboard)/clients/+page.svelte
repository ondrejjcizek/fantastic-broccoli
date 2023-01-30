<script lang="ts">
    import Button from '$components/Button.svelte';
    import Search from '$components/Search.svelte';
    import ClientRow from './ClientRow.svelte';
    import ClientRowHeader from './ClientRowHeader.svelte';
    import { clients, loadClients } from '$lib/stores/ClientStore';
    import { onMount } from 'svelte';
    import BlankState from './BlankState.svelte';
    import SlidePanel from '$components/SlidePanel.svelte';
    import ClientForm from './ClientForm.svelte';
    import type { Client } from '$global';
    import NoSearchResults from './NoSearchResults.svelte';

    let isClientFormShowing = false;
    let clientList: Client[] = [];

    const closePanel = () => {
        isClientFormShowing = false;
    };

    const SearchClients = (event: CustomEvent) => {
        const keywords = event.detail.searchTerms;

        clientList = $clients.filter((client) => {
            return (
                client.name?.toLowerCase().includes(keywords.toLowerCase()) ||
                client.email?.toLowerCase().includes(keywords.toLowerCase())
            );
        });
    };

    const ClearSearch = (event: CustomEvent) => {
        if (event.detail.searchTerms === '') {
            clientList = $clients;
        }
    };

    onMount(() => {
        loadClients();
        clientList = $clients;
    });
</script>

<svelte:head>
    <title>Clients | Fantastic Broccoli</title>
</svelte:head>

<div
    class="mb-7 flex flex-col-reverse items-start justify-between gap-y-6 md:flex-row md:items-center md:gap-y-4 lg:mb-16"
>
    <!-- search field -->
    {#if $clients.length > 0}
        <Search on:search={SearchClients} on:clear={ClearSearch} />
    {:else}
        <div />
    {/if}

    <!-- new invoice button -->
    <div>
        <Button
            label="Přidat klienta"
            onClick={() => {
                isClientFormShowing = true;
            }}
        />
    </div>
</div>

<!-- clients -->
<div>
    {#if $clients === null}
        Loading...
    {:else if $clients.length <= 0}
        <BlankState />
    {:else if clientList.length <= 0}
        <NoSearchResults />
    {:else}
        <!-- client header row -->
        <ClientRowHeader />

        <!-- client rows -->
        <div class="flex flex-col-reverse">
            {#each clientList as client}
                <ClientRow {client} />
            {/each}
        </div>
    {/if}
</div>

{#if isClientFormShowing}
    <SlidePanel on:closePanel={closePanel}>
        <ClientForm {closePanel} />
    </SlidePanel>
{/if}
