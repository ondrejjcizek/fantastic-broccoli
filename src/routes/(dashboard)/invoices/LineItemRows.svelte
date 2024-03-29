<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Button from '$components/Button.svelte';
    import CircledAmount from '$components/CircledAmount.svelte';
    import type { LineItem } from '$global';
    import LineItemRow from './LineItemRow.svelte';
    import { addThousandsSeparator, sumLineItems } from '$lib/utils/moneyHelpers';

    let subtotal: string = '0.00';
    export let discount: number = 0;
    let discountedAmount: string = '0.00';
    let total: string = '0.00';
    export let isEditable = true;

    export let lineItems: LineItem[] | undefined = undefined;
    let dispatch = createEventDispatcher();

    $: if (sumLineItems(lineItems) > 0) {
        subtotal = String(sumLineItems(lineItems));
    }
    $: if (subtotal && discount) {
        discountedAmount = String(sumLineItems(lineItems) * (discount / 100));
    }

    $: total = addThousandsSeparator(Number(subtotal) - Number(discountedAmount));
</script>

<div class="invoice-line-item border-b-2 border-daisyBush pb-2">
    <div class="table-header">Položka</div>
    <div class="table-header text-right">Cena</div>
    <div class="table-header text-center">Množství</div>
    <div class="table-header text-right">Celkem</div>
</div>

{#if lineItems}
    {#each lineItems as lineItem, index}
        <LineItemRow
            {lineItem}
            on:removeLineItem
            canDelete={index > 0}
            on:updateLineItem
            isRequired={index === 0}
            {isEditable}
        />
    {/each}
{/if}

<div class="invoice-line-item">
    <div class="col-span-1 sm:col-span-2">
        {#if isEditable}
            <Button
                label="Přidat položku"
                style="textOnly"
                isAnimated={false}
                onClick={() => {
                    dispatch('addLineItem');
                }}
            />
        {/if}
    </div>
    <div class="py-5 text-right font-bold text-monsoon print:col-span-3">Celkem</div>
    <div class="whitespace-nowrap py-5 text-right font-mono">
        {addThousandsSeparator(Number(subtotal))} Kč
    </div>
</div>

<div class="invoice-line-item">
    <div class="col-span-1 py-5 text-right font-bold text-monsoon print:col-span-3 sm:col-span-2">
        Sleva
    </div>
    <div class="relative">
        <input
            class="line-item h-10 w-full border-b-2 border-dashed border-stone-300 pr-4 text-right focus:border-solid focus:border-lavenderIndigo focus:outline-none print:pr-0"
            type="number"
            name="discount"
            min="0"
            max="100"
            disabled={!isEditable}
            bind:value={discount}
            on:change={() => {
                dispatch('updateDiscount', { discount });
            }}
        />
        <span class="absolute right-0 top-2 font-mono">%</span>
    </div>
    <div class="whitespace-nowrap py-5 text-right font-mono">
        {addThousandsSeparator(Number(discountedAmount))} Kč
    </div>
</div>

<div class="invoice-line-item">
    <div class="col-span-3 print:col-span-6 sm:col-span-6">
        <CircledAmount label="Celkem:" amount={`${total} Kč`} />
    </div>
</div>

<style lang="postcss">
    .table-header {
        @apply hidden text-sm font-bold text-daisyBush print:block sm:block;
    }
</style>
