<script lang="ts">
    import Button from '$components/Button.svelte';
    import Modal from '$components/Modal.svelte';
    import { sumLineItems } from '$lib/utils/moneyHelpers';
    import type { Client, Invoice } from '$global';
    import { createEventDispatcher } from 'svelte';
    import { deleteClient } from '$stores/ClientStore';

    export let client: Client;
    export let isModalShowing = false;
    const dispatch = createEventDispatcher();

    const handleDelete = async () => {
        await deleteClient(client);
        dispatch('close');
    };
</script>

<Modal isVisible={isModalShowing} on:close>
    <div class="flex h-full min-h-[175px] flex-col items-center justify-between gap-6">
        <div class="text-center text-xl font-bold text-daisyBush">
            Chcete opravdu smazat <span class="text-scarlet">{client.name}</span> a všechny jeho faktury?
        </div>
        <div class="flex gap-4">
            <Button
                isAnimated={false}
                label="Zavřít"
                onClick={() => {
                    dispatch('close');
                }}
                style="secondary"
            />
            <Button
                isAnimated={false}
                label="Ano, vymazat"
                onClick={handleDelete}
                style="desctructive"
            />
        </div>
    </div>
</Modal>
