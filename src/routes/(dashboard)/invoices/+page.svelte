<script lang="ts">
    import { invoices, loadInvoices } from '$lib/stores/InvoiceStore';
    import { onMount } from 'svelte';
    import Search from '$components/Search.svelte';
    import CircledAmount from '$components/CircledAmount.svelte';
    import InvoiceRow from './InvoiceRow.svelte';
    import { addThousandsSeparator, sumInvoices } from '$lib/utils/moneyHelpers';
    import BlankState from './BlankState.svelte';
    import InvoiceRowHeader from './InvoiceRowHeader.svelte';
    import Button from '$components/Button.svelte';
    import SlidePanel from '$components/SlidePanel.svelte';
    import InvoiceForm from './InvoiceForm.svelte';
    import type { Invoice } from '$global';
    import NoSearchResults from './NoSearchResults.svelte';

    let invoiceList: Invoice[] = [];
    let isInvoiceFormShowing: boolean = false;

    const SearchInvoices = (event: CustomEvent) => {
        const keywords = event.detail.searchTerms;

        invoiceList = $invoices.filter((invoice) => {
            return (
                invoice?.client?.name?.toLowerCase().includes(keywords.toLowerCase()) ||
                invoice?.invoiceNumber?.toLowerCase().includes(keywords.toLowerCase()) ||
                invoice?.subject?.toLowerCase().includes(keywords.toLowerCase())
            );
        });
    };

    const ClearSearch = (event: CustomEvent) => {
        if (event.detail.searchTerms === '') {
            invoiceList = $invoices;
        }
    };

    onMount(async () => {
        await loadInvoices();
        invoiceList = $invoices;
    });
</script>

<svelte:head>
    <title>Invoices | Fantastic Broccoli</title>
</svelte:head>

<div
    class="mb-7 flex flex-col-reverse items-start justify-between gap-y-6 md:flex-row md:items-center md:gap-y-4 lg:mb-16"
>
    <!-- search field -->
    {#if $invoices.length > 0}
        <Search on:search={SearchInvoices} on:clear={ClearSearch} />
    {:else}
        <div />
    {/if}

    <!-- new invoice button -->
    <div>
        <Button
            label="Přidat fakturu"
            onClick={() => {
                isInvoiceFormShowing = true;
            }}
        />
    </div>
</div>

<!-- list of invoices -->
<div>
    <!-- invoices -->
    {#if $invoices === null}
        Loading ...
    {:else if $invoices.length <= 0}
        <BlankState />
    {:else if invoiceList.length <= 0}
        <NoSearchResults />
    {:else}
        <InvoiceRowHeader className="text-daisyBush" />
        <div class="flex flex-col-reverse">
            {#each invoiceList as invoice}
                <InvoiceRow {invoice} />
            {/each}
        </div>
        <CircledAmount
            label="Celkem"
            amount={`${addThousandsSeparator(sumInvoices(invoiceList))} Kč`}
        />
    {/if}
</div>

{#if isInvoiceFormShowing}
    <SlidePanel
        on:closePanel={() => {
            isInvoiceFormShowing = false;
        }}
    >
        <InvoiceForm closePanel={() => (isInvoiceFormShowing = false)} />
    </SlidePanel>
{/if}
