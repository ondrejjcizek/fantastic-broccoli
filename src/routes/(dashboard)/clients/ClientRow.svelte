<script lang="ts">
    import AdditionalOptions from '$components/AdditionalOptions.svelte';
    import ThreeDots from '$components/Icon/ThreeDots.svelte';
    import View from '$components/Icon/View.svelte';
    import Edit from '$components/Icon/Edit.svelte';
    import Trash from '$components/Icon/Trash.svelte';
    import Activate from '$components/Icon/Activate.svelte';
    import Archive from '$components/Icon/Archive.svelte';
    import Tag from '$components/Tag.svelte';
    import type { Client } from 'src/global';

    export let client: Client;

    let isAdditionalMenuShowing = false;
</script>

<div class="client-table rounded-lg bg-white py-3 shadow-tableRow lg:py-6">
    <div><Tag className="ml-auto" label={client.clientStatus} /></div>
    <div class="truncate whitespace-nowrap text-base font-bold lg:text-xl">{client.name}</div>
    <div class="text-right font-mono text-sm font-bold lg:text-lg">$500</div>
    <div class="text-right font-mono text-sm font-bold text-scarlet lg:text-lg">$240</div>
    <div class="realtive hidden items-center justify-center lg:flex">
        <a href="#" class="text-pastelPurple hover:text-daisyBush">
            <View />
        </a>
    </div>
    <div class="relative hidden items-center justify-center lg:flex">
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
                            client.clientStatus = 'aktivní';
                            isAdditionalMenuShowing = false;
                        },
                        disabled: client.clientStatus === 'aktivní'
                    },
                    {
                        label: 'Archivovat',
                        icon: Archive,
                        onClick: () => {
                            client.clientStatus = 'archiv';
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
