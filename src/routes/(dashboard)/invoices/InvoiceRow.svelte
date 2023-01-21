<script lang="ts">
    import AdditionalOptions from '$components/AdditionalOptions.svelte';
    import ThreeDots from '$components/Icon/ThreeDots.svelte';
    import View from '$components/Icon/View.svelte';
    import Tag from '$components/Tag.svelte';
    import { convertDate, isLate } from '$lib/utils/dateHelpers';
    import { addThousandsSeparator, invoiceTotal, sumLineItems } from '$lib/utils/moneyHelpers';
    import type { Invoice } from '../../../global';
    import Send from '$components/Icon/Send.svelte';
    import Trash from '$components/Icon/Trash.svelte';
    import Edit from '$components/Icon/Edit.svelte';
    import SlidePanel from '$components/SlidePanel.svelte';
    import InvoiceForm from './InvoiceForm.svelte';
    import ConfirmDelete from './ConfirmDelete.svelte';

    export let invoice: Invoice;
    let isAdditionalMenuShowing = false;
    let isOptionsDisabled = false;
    let isModalShowing = false;
    let isInvoiceFormShowing = false;

    const handleDelete = () => {
        isModalShowing = true;
        isAdditionalMenuShowing = false;
    };

    const handleEdit = () => {
        console.log('editing');
        isInvoiceFormShowing = true;
        isAdditionalMenuShowing = false;
    };

    const handleSendInvoice = () => {
        console.log('sending');
    };

    const getInvoiceLabel = () => {
        if (invoice.invoiceStatus === 'koncept') {
            return 'koncept';
        } else if (invoice.invoiceStatus === 'odesláno' && !isLate(invoice.dueDate)) {
            isOptionsDisabled = true;
            return 'odesláno';
        } else if (invoice.invoiceStatus === 'neuhrazeno' && isLate(invoice.dueDate)) {
            isOptionsDisabled = true;
            return 'neuhrazeno';
        } else if (invoice.invoiceStatus === 'uhrazeno') {
            isOptionsDisabled = true;
            return 'uhrazeno';
        }
    };
</script>

<div
    class="invoice-table invoice-area items-center rounded-lg bg-white py-3 shadow-tableRow lg:py-6"
>
    <div class="status lg:min-w-[400px]">
        <Tag className="ml-auto lg:ml-0" label={getInvoiceLabel()} />
    </div>
    <div class="dueDate text-sm lg:text-lg">{convertDate(invoice.dueDate)}</div>
    <div class="invoiceNumber text-sm lg:text-lg">{invoice.invoiceNumber}</div>
    <div class="clientName truncate whitespace-nowrap text-base font-bold">
        {invoice.client.name}
    </div>
    <div class="amount whitespace-nowrap text-right font-mono text-sm font-bold">
        {addThousandsSeparator(invoiceTotal(invoice.lineItems, invoice.discount))} Kč
    </div>
    <div class="viewButton hidden items-center  justify-center text-sm lg:flex lg:text-lg">
        <a
            href={`/invoices/${invoice.id}`}
            class="text-pastelPurple transition-colors hover:text-daisyBush"
        >
            <View />
        </a>
    </div>
    <div class="moreButton relative hidden items-center justify-center text-sm lg:flex lg:text-lg">
        <button
            class="text-pastelPurple transition-colors hover:text-daisyBush"
            on:click={() => {
                isAdditionalMenuShowing = !isAdditionalMenuShowing;
            }}
        >
            <ThreeDots />
        </button>
        {#if isAdditionalMenuShowing}
            <AdditionalOptions
                options={[
                    {
                        label: 'Upravit',
                        icon: Edit,
                        onClick: handleEdit,
                        disabled: isOptionsDisabled
                    },
                    { label: 'Smazat', icon: Trash, onClick: handleDelete, disabled: false },
                    {
                        label: 'Odeslat',
                        icon: Send,
                        onClick: handleSendInvoice,
                        disabled: isOptionsDisabled
                    }
                ]}
            />
        {/if}
    </div>
</div>

<ConfirmDelete {invoice} {isModalShowing} on:close={() => (isModalShowing = false)} />

{#if isInvoiceFormShowing}
    <SlidePanel
        on:closePanel={() => {
            isInvoiceFormShowing = false;
        }}
    >
        <InvoiceForm formState="edit" {invoice} closePanel={() => (isInvoiceFormShowing = false)} />
    </SlidePanel>
{/if}

<style lang="postcss">
    .invoice-area {
        grid-template-areas:
            'invoiceNumber invoiceNumber'
            'clientName amount'
            'dueDate status';
    }

    @media (min-width: 1024px) {
        .invoice-area {
            grid-template-areas: 'status dueDate invoiceNumber clientName amount viewButton moreButton';
        }
    }

    .invoice-area .status {
        grid-area: status;
    }

    .invoice-area .dueDate {
        grid-area: dueDate;
    }

    .invoice-area .invoiceNumber {
        grid-area: invoiceNumber;
    }

    .invoice-area .clientName {
        grid-area: clientName;
    }

    .invoice-area .amount {
        grid-area: amount;
    }

    .invoice-area .viewButton {
        grid-area: viewButton;
    }

    .invoice-area .moreButton {
        grid-area: moreButton;
    }
</style>
