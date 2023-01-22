<script lang="ts">
    import AdditionalOptions from '$components/AdditionalOptions.svelte';
    import ThreeDots from '$components/Icon/ThreeDots.svelte';
    import View from '$components/Icon/View.svelte';
    import Edit from '$components/Icon/Edit.svelte';
    import Trash from '$components/Icon/Trash.svelte';
    import Activate from '$components/Icon/Activate.svelte';
    import Archive from '$components/Icon/Archive.svelte';
    import Tag from '$components/Tag.svelte';
    import type { Client } from '../../../global';
    import { ClientStatus } from '../../../enums';
    import { sumInvoices } from '$lib/utils/moneyHelpers';

    export let client: Client;

    let isAdditionalMenuShowing = false;

    const recievedInvoices = () => {
        // find invoices that have been paid
        if (client?.invoices) {
            const paidInvoices = client.invoices.filter(
                (invoice) => invoice.invoiceStatus === 'uhrazeno'
            );

            // get the sum all of them
            return sumInvoices(paidInvoices);
        }
        return 0;
    };

    const balanceInvoices = () => {
        if (client?.invoices) {
            // find invoices that have NOT been paid
            const paidInvoices = client.invoices.filter(
                (invoice) => invoice.invoiceStatus !== 'uhrazeno'
            );

            // get the sum all of them
            return sumInvoices(paidInvoices);
        }
        return 0;
    };
</script>

<div class="client-table client-row rounded-lg bg-white py-3 shadow-tableRow lg:py-6">
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
        <a href="#" class="text-pastelPurple hover:text-daisyBush">
            <View />
        </a>
    </div>
    <div class="three-dots relative hidden items-center justify-center lg:flex">
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
                        onClick: () => console.log('editing'),
                        disabled: false
                    },
                    {
                        label: 'Aktivovat',
                        icon: Activate,
                        onClick: () => {
                            client.clientStatus = ClientStatus.active;
                            isAdditionalMenuShowing = false;
                        },
                        disabled: client.clientStatus === 'aktivní'
                    },
                    {
                        label: 'Archivovat',
                        icon: Archive,
                        onClick: () => {
                            client.clientStatus = ClientStatus.archived;
                            isAdditionalMenuShowing = false;
                        },
                        disabled: client.clientStatus === 'archiv'
                    },
                    {
                        label: 'Smazat',
                        icon: Trash,
                        onClick: () => console.log('deleting'),
                        disabled: false
                    }
                ]}
            />
        {/if}
    </div>
</div>

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
