<script lang="ts">
    import { clickOutside } from '$actions/ClickOutside';
    import AdditionalOptions from '$components/AdditionalOptions.svelte';
    import ThreeDots from '$components/Icon/ThreeDots.svelte';
    import View from '$components/Icon/View.svelte';
    import Tag from '$components/Tag.svelte';
    import { convertDate, isLate } from '$lib/utils/dateHelpers';
    import { addThousandsSeparator, invoiceTotal } from '$lib/utils/moneyHelpers';
    import type { Invoice } from '../../../global';
    import Send from '$components/Icon/Send.svelte';
    import Trash from '$components/Icon/Trash.svelte';
    import Edit from '$components/Icon/Edit.svelte';
    import SlidePanel from '$components/SlidePanel.svelte';
    import InvoiceForm from './InvoiceForm.svelte';
    import ConfirmDelete from './ConfirmDelete.svelte';
    import Cancel from '$components/Icon/Cancel.svelte';
    import { swipe } from '$actions/Swipe';

    export let invoice: Invoice;
    let isAdditionalMenuShowing = false;
    let isOptionsDisabled = false;
    let isModalShowing = false;
    let isInvoiceFormShowing = false;
    let triggerReset = false;

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
        } else if (invoice.invoiceStatus === 'odeslano' && !isLate(invoice.dueDate)) {
            isOptionsDisabled = true;
            return 'odeslano';
        } else if (invoice.invoiceStatus === 'neuhrazeno' && isLate(invoice.dueDate)) {
            isOptionsDisabled = true;
            return 'neuhrazeno';
        } else if (invoice.invoiceStatus === 'uhrazeno') {
            isOptionsDisabled = true;
            return 'uhrazeno';
        }
    };
</script>

<div class="relative">
    <div
        class="invoice-table invoice-area relative z-row items-center rounded-lg bg-white py-3 shadow-tableRow lg:py-6"
        use:swipe={{ triggerReset }}
        on:outOfView={() => {
            triggerReset = false;
        }}
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
        <div
            class="moreButton relative hidden items-center justify-center text-sm lg:flex lg:text-lg"
            use:clickOutside={() => {
                isAdditionalMenuShowing = false;
            }}
        >
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

    <!-- swipe to reveal -->
    <div class="absolute inset-0 z-rowActions flex h-full w-full items-center justify-around">
        <button
            class="action-button"
            on:click={() => {
                triggerReset = true;
            }}
        >
            <Cancel width={32} height={32} />
            Cancel
        </button>
        {#if !isOptionsDisabled}
            <button class="action-button" on:click={handleEdit}>
                <Edit width={32} height={32} />
                Edit
            </button>
            <button class="action-button" on:click={handleSendInvoice}>
                <Send width={32} height={32} />
                Send
            </button>
        {/if}
        <button class="action-button" on:click={handleDelete}>
            <Trash width={32} height={32} />
            Trash
        </button>
        <a href={`/invoices/${invoice.id}`} class="action-button">
            <View width={32} height={32} />
            View
        </a>
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
    .action-button {
        @apply flex cursor-pointer flex-col items-center justify-center font-bold text-daisyBush;
    }

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
