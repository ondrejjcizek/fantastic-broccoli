<script lang="ts">
    import Button from '$components/Button.svelte';
    import Modal from '$components/Modal.svelte';
    import { deleteInvoice } from '$lib/stores/InvoiceStore';
    import { sumLineItems } from '$lib/utils/moneyHelpers';
    import type { Invoice } from 'src/global';
    import { createEventDispatcher } from 'svelte';

    export let invoice: Invoice;
    export let isModalShowing = false;
    const dispatch = createEventDispatcher();
</script>

<Modal isVisible={isModalShowing} on:close>
    <div class="flex h-full min-h-[175px] flex-col items-center justify-between gap-6">
        <div class="text-center text-xl font-bold text-daisyBush">
            Chcete opravdu smazat fakturu od klienta <span class="text-scarlet"
                >{invoice.client.name}</span
            >
            s částkou
            <span class="text-scarlet">${sumLineItems(invoice.lineItems)}</span>?
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
                onClick={() => {
                    deleteInvoice(invoice);
                    dispatch('close');
                }}
                style="desctructive"
            />
        </div>
    </div>
</Modal>
