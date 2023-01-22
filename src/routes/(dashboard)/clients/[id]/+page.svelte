<script lang="ts">
    import { loadInvoices } from '$lib/stores/InvoiceStore';
    import { onMount } from 'svelte';
    import Search from '$components/Search.svelte';
    import CircledAmount from '$components/CircledAmount.svelte';
    import InvoiceRow from '../../invoices/InvoiceRow.svelte';
    import { addThousandsSeparator, sumInvoices } from '$lib/utils/moneyHelpers';
    import BlankState from '../../invoices/BlankState.svelte';
    import InvoiceRowHeader from '../../invoices/InvoiceRowHeader.svelte';
    import Button from '$components/Button.svelte';
    import SlidePanel from '$components/SlidePanel.svelte';
    import ClientForm from '../ClientForm.svelte';
    import Edit from '$components/Icon/Edit.svelte';

    export let data;
    console.log({ data });

    let isClientFormShowing: boolean = false;
    let isEditingCurrentClient: boolean = false;

    onMount(() => {
        loadInvoices();
    });

    const editClient = () => {
        isEditingCurrentClient = true;
        isClientFormShowing = true;
    };

    const closePanel = () => {
        isClientFormShowing = false;
    };
</script>

<svelte:head>
    <title>Invoices | Fantastic Broccoli</title>
</svelte:head>

<div
    class="mb-7 flex flex-col-reverse items-start justify-between gap-y-6 md:flex-row md:items-center md:gap-y-4 lg:mb-16"
>
    <!-- search field -->
    {#if data.client.invoices && data.client.invoices.length > 0}
        <Search />
    {:else}
        <div />
    {/if}

    <!-- new invoice button -->
    <div>
        <Button
            label="+ klienta"
            onClick={() => {
                isClientFormShowing = true;
            }}
        />
    </div>
</div>

<div class="mb-7 flex w-full items-center justify-between">
    <h1 class="font-sansSerif text-3xl font-bold text-daisyBush">Compressed.fm</h1>
    <Button
        label="Upravit"
        isAnimated={false}
        style="textOnly"
        iconLeft={Edit}
        onClick={editClient}
    />
</div>

<div class="mb-10 grid grid-cols-1 gap-4 rounded-lg bg-gallery py-7 px-10 lg:grid-cols-4">
    <div class="summary-block">
        <div class="label">Total Overdue</div>
        <div class="number"><sup>$</sup>300.00</div>
    </div>

    <div class="summary-block">
        <div class="label">Total Outstanding</div>
        <div class="number"><sup>$</sup>300.00</div>
    </div>

    <div class="summary-block">
        <div class="label">Total Draft</div>
        <div class="number"><sup>$</sup>300.00</div>
    </div>

    <div class="summary-block">
        <div class="label">Total Paid</div>
        <div class="number"><sup>$</sup>300.00</div>
    </div>
</div>

<!-- list of invoices -->
<div>
    <!-- invoices -->
    {#if data.client.invoices === null}
        Loading ...
    {:else if data.client.invoices.length <= 0}
        <BlankState />
    {:else}
        <InvoiceRowHeader className="text-daisyBush" />
        <div class="flex flex-col-reverse">
            {#each data.client.invoices as invoice}
                <InvoiceRow {invoice} />
            {/each}
        </div>
        <CircledAmount
            label="Celkem"
            amount={`${addThousandsSeparator(sumInvoices(data.client.invoices))} Kč`}
        />
    {/if}
</div>

{#if isClientFormShowing}
    <SlidePanel on:closePanel={closePanel}>
        <ClientForm
            {closePanel}
            formStatus={isEditingCurrentClient ? 'edit' : 'create'}
            client={isEditingCurrentClient ? data.client : undefined}
        />
    </SlidePanel>
{/if}

<style lang="postcss">
    .summary-block {
        @apply text-center;
    }

    .label {
        @apply text-sm font-black text-[#A397AD];
    }

    sup {
        @apply relative -top-2;
    }

    .number {
        @apply truncate text-[2.5rem] font-black text-purple;
    }
</style>
