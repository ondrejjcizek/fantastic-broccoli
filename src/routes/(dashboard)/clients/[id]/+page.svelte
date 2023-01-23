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
    import type { Client } from '../../../../global';
    import { InvoiceStatus } from '../../../../enums';
    import { isLate } from '$lib/utils/dateHelpers';

    export let data: { client: Client };

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

    const getDraft = (): string => {
        if (!data.client.invoice || data.client.invoice.length < 1) return '0.00';
        const draftInvoices = data.client.invoice.filter(
            (invoice) => invoice.invoiceStatus === InvoiceStatus.draft
        );

        return String(sumInvoices(draftInvoices));
    };

    const getPaid = (): string => {
        if (!data.client.invoice || data.client.invoice.length < 1) return '0.00';
        const paidInvoices = data.client.invoice.filter(
            (invoice) => invoice.invoiceStatus === InvoiceStatus.paid
        );

        return String(sumInvoices(paidInvoices));
    };

    const getTotalOverdue = (): string => {
        if (!data.client.invoice || data.client.invoice.length < 1) return '0.00';
        const paidInvoices = data.client.invoice.filter(
            (invoice) => invoice.invoiceStatus === InvoiceStatus.unpaid && isLate(invoice.dueDate)
        );

        return String(sumInvoices(paidInvoices));
    };

    const getTotalOutstanding = (): string => {
        if (!data.client.invoice || data.client.invoice.length < 1) return '0.00';
        const paidInvoices = data.client.invoice.filter(
            (invoice) => invoice.invoiceStatus === InvoiceStatus.unpaid && !isLate(invoice.dueDate)
        );

        return String(sumInvoices(paidInvoices));
    };
</script>

<svelte:head>
    <title>Invoices | Fantastic Broccoli</title>
</svelte:head>

<div
    class="mb-7 flex flex-col-reverse items-start justify-between gap-y-6 md:flex-row md:items-center md:gap-y-4 lg:mb-16"
>
    <!-- search field -->
    {#if data.client.invoice && data.client.invoice.length > 0}
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
    <h1 class="font-sansSerif text-3xl font-bold text-daisyBush">{data.client.name}</h1>
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
        <div class="label">Po splatnosti</div>
        <div class="number">{getTotalOverdue()} Kč</div>
    </div>

    <div class="summary-block">
        <div class="label">Neuhrazeno</div>
        <div class="number">{getTotalOutstanding()} Kč</div>
    </div>

    <div class="summary-block">
        <div class="label">Kocepty</div>
        <div class="number">{getDraft()} Kč</div>
    </div>

    <div class="summary-block">
        <div class="label">Uhrazeno</div>
        <div class="number">{getPaid()} Kč</div>
    </div>
</div>

<!-- list of invoices -->
<div>
    <!-- invoices -->
    {#if data.client.invoice}
        {#if data.client.invoice === null}
            Loading ...
        {:else if data.client.invoice.length <= 0}
            <BlankState />
        {:else}
            <InvoiceRowHeader className="text-daisyBush" />
            <div class="flex flex-col-reverse">
                {#each data.client.invoice as invoice}
                    <InvoiceRow {invoice} />
                {/each}
            </div>
            <CircledAmount
                label="Celkem"
                amount={`${addThousandsSeparator(sumInvoices(data.client.invoice))} Kč`}
            />
        {/if}
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

    .number {
        @apply text-[2rem] font-black text-purple xl:text-[2.5rem];
    }
</style>
