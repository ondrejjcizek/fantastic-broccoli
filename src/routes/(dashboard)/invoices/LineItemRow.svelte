<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Trash from '$components/Icon/Trash.svelte';
    import type { LineItem } from '$global';
    import { twoDecimals } from '$lib/utils/moneyHelpers';

    export let lineItem: LineItem;
    export let canDelete: boolean = false;
    export let isRequired: boolean = false;
    export let isEditable: boolean = true;

    let unitPrice: string = twoDecimals(lineItem.amount / lineItem.quantity);
    let amount: string = twoDecimals(lineItem.amount);

    $: {
        amount = String(lineItem.quantity * Number(unitPrice));
        lineItem.amount = Number(amount);
    }

    let dispatch = createEventDispatcher();
</script>

<div class="invoice-line-item border-b-2 border-fog py-4 sm:py-2">
    <div class="description">
        <label for="description" class="line-item-label">Položka</label>
        <input
            class="line-item"
            type="text"
            name="description"
            bind:value={lineItem.description}
            required={isRequired}
            disabled={!isEditable}
        />
    </div>

    <div class="unitPrice">
        <label for="unitPrice" class="line-item-label text-right">Jednotka</label>
        <input
            class="line-item text-right"
            type="number"
            name="unitPrice"
            step="0.01"
            min="0"
            bind:value={unitPrice}
            on:blur={() => {
                unitPrice = twoDecimals(Number(unitPrice));
                dispatch('updateLineItem');
                101;
            }}
            required={isRequired}
            disabled={!isEditable}
        />
    </div>

    <div class="qty">
        <label for="quantity" class="line-item-label text-center">Množství</label>
        <input
            class="line-item text-center"
            type="number"
            name="quantity"
            min="0"
            bind:value={lineItem.quantity}
            on:blur={() => {
                dispatch('updateLineItem');
            }}
            required={isRequired}
            disabled={!isEditable}
        />
    </div>

    <div class="amount">
        <label for="amount" class="line-item-label text-right">Celkem</label>
        <input
            class="line-item text-right"
            type="number"
            name="amount"
            step="0.01"
            min="0"
            bind:value={amount}
            disabled
        />
    </div>

    <div class="trash">
        {#if canDelete && isEditable}
            <button
                on:click|preventDefault={() => {
                    dispatch('removeLineItem', lineItem.id);
                }}
                class="center h-10 w-10 text-pastelPurple hover:text-lavenderIndigo"
            >
                <Trash />
            </button>
        {/if}
    </div>
</div>

<style lang="postcss">
    input[type='text'],
    input[type='number'] {
        @apply h-10 w-full border-b-2 border-dashed border-stone-300;
    }

    input[type='text'] {
        @apply font-sansSerif text-xl font-bold;
    }

    input[type='number'] {
        @apply font-mono text-base;
    }

    input[type='text']:focus,
    input[type='number']:focus {
        @apply border-solid border-lavenderIndigo outline-none;
    }

    input[type='number']:disabled,
    input[type='text']:disabled {
        @apply border-b-0 bg-transparent px-0;
    }

    .line-item-label {
        @apply block print:hidden sm:hidden;
    }
</style>
