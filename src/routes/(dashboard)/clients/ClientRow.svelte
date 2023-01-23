<script lang="ts">
    import { clickOutside } from '$actions/ClickOutside';
    import AdditionalOptions from '$components/AdditionalOptions.svelte';
    import ThreeDots from '$components/Icon/ThreeDots.svelte';
    import View from '$components/Icon/View.svelte';
    import Edit from '$components/Icon/Edit.svelte';
    import Trash from '$components/Icon/Trash.svelte';
    import Cancel from '$components/Icon/Cancel.svelte';
    import Activate from '$components/Icon/Activate.svelte';
    import Archive from '$components/Icon/Archive.svelte';
    import Tag from '$components/Tag.svelte';
    import type { Client } from '$global';
    import { ClientStatus } from '../../../enums';
    import { sumInvoices } from '$lib/utils/moneyHelpers';
    import ClientForm from './ClientForm.svelte';
    import SlidePanel from '$components/SlidePanel.svelte';
    import { swipe } from '$actions/Swipe';

    export let client: Client;
    let triggerReset = false;

    let isAdditionalMenuShowing = false;

    let isClientFormShowing = false;

    const closePanel = () => {
        isClientFormShowing = false;
    };

    const recievedInvoices = () => {
        // find invoices that have been paid
        if (client?.invoice) {
            const paidInvoices = client.invoice.filter(
                (invoice) => invoice.invoiceStatus === 'uhrazeno'
            );

            // get the sum all of them
            return sumInvoices(paidInvoices);
        }
        return 0;
    };

    const balanceInvoices = () => {
        if (client?.invoice) {
            // find invoices that have NOT been paid
            const paidInvoices = client.invoice.filter(
                (invoice) => invoice.invoiceStatus !== 'uhrazeno'
            );

            // get the sum all of them
            return sumInvoices(paidInvoices);
        }
        return 0;
    };

    const handleEdit = () => {
        isClientFormShowing = true;
        isAdditionalMenuShowing = false;
    };

    const handleArchiveClient = () => {
        client.clientStatus = ClientStatus.archived;
        isAdditionalMenuShowing = false;
    };

    const handleDeleteClient = () => console.log('deleting');

    const handleActivateClient = () => {
        client.clientStatus = ClientStatus.active;
        isAdditionalMenuShowing = false;
    };
</script>

<div class="relative">
    <div
        class="client-table client-row relative z-row rounded-lg bg-white py-3 shadow-tableRow lg:py-6"
        use:swipe={{ triggerReset }}
        on:outOfView={() => {
            triggerReset = false;
        }}
    >
        <div class="status"><Tag className="ml-auto" label={client.clientStatus} /></div>
        <div class="client-name truncate whitespace-nowrap text-base font-bold lg:text-xl">
            {client.name}
        </div>
        <div class="recieved text-right font-mono text-sm font-bold lg:text-lg">
            {recievedInvoices()} Kč
        </div>
        <div class="balance text-right font-mono text-sm font-bold text-scarlet lg:text-lg">
            {balanceInvoices()} Kč
        </div>
        <div class="view relative hidden items-center justify-center lg:flex">
            <a href={`/clients/${client.id}`} class="text-pastelPurple hover:text-daisyBush">
                <View />
            </a>
        </div>
        <div
            class="three-dots relative hidden items-center justify-center lg:flex"
            use:clickOutside={() => {
                isAdditionalMenuShowing = false;
            }}
        >
            <button
                class="text-pastelPurple hover:text-daisyBush"
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
                            disabled: false
                        },
                        {
                            label: 'Aktivovat',
                            icon: Activate,
                            onClick: handleActivateClient,
                            disabled: client.clientStatus === ClientStatus.active
                        },
                        {
                            label: 'Archivovat',
                            icon: Archive,
                            onClick: handleArchiveClient,
                            disabled: client.clientStatus === 'archiv'
                        },
                        {
                            label: 'Smazat',
                            icon: Trash,
                            onClick: handleDeleteClient,
                            disabled: false
                        }
                    ]}
                />
            {/if}
        </div>
    </div>
    <!-- swipe to reveal -->
    <div class="swipe-revealed-actions">
        <button
            class="action-button"
            on:click={() => {
                triggerReset = true;
            }}
        >
            <Cancel width={32} height={32} />
            Cancel
        </button>
        <button class="action-button" on:click={handleEdit}>
            <Edit width={32} height={32} />
            Edit
        </button>
        {#if client.clientStatus === ClientStatus.active}
            <button class="action-button" on:click={handleArchiveClient}>
                <Archive width={32} height={32} />
                Archive
            </button>
        {/if}
        {#if client.clientStatus === ClientStatus.archived}
            <button class="action-button" on:click={handleActivateClient}>
                <Activate width={32} height={32} />
                Activate
            </button>
        {/if}
        <button class="action-button" on:click={handleDeleteClient}>
            <Trash width={32} height={32} />
            Trash
        </button>
        <a href={`/clients/${client.id}`} class="action-button">
            <View width={32} height={32} />
            View
        </a>
    </div>
</div>

{#if isClientFormShowing}
    <SlidePanel on:closePanel={closePanel}>
        <ClientForm {closePanel} formStatus="edit" {client} />
    </SlidePanel>
{/if}

<style lang="postcss">
    .client-row {
        grid-template-areas: 'clientName status' 'recieved balance';

        @media (min-width: 1024px) {
            grid-template-areas: 'status clientName recieved balance view threeDots';
        }
    }

    .client-name {
        grid-area: clientName;
    }

    .status {
        grid-area: status;
    }

    .recieved {
        grid-area: recieved;
        @apply text-left lg:text-right;

        &:before {
            @apply block text-xs font-bold lg:hidden;
            content: 'Recieved';
        }
    }

    .balance {
        grid-area: balance;

        &:before {
            @apply block text-xs font-bold lg:hidden;
            content: 'Balance';
        }
    }
</style>
