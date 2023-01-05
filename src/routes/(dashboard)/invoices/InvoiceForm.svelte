<script lang="ts">
    import { addClient, clients, loadClients } from '$lib/stores/ClientStore';
    import { slide } from 'svelte/transition';
    import { v4 as uuidv4 } from 'uuid';
    import Button from '$components/Button.svelte';
    import Trash from '$components/Icon/Trash.svelte';
    import type { Client, Invoice, LineItem } from 'src/global';
    import LineItemRows from './LineItemRows.svelte';
    import { states } from '$utils/states';
    import { onMount } from 'svelte';
    import { today } from '$lib/utils/dateHelpers';
    import { addInvoice, updateInvoice } from '$lib/stores/InvoiceStore';
    import ConfirmDelete from './ConfirmDelete.svelte';
    import { snackbar } from '$lib/stores/SnackbarStore';

    const blankLineItem = {
        id: uuidv4(),
        description: '',
        quantity: 0,
        amount: 0
    };

    let lineItems: LineItem[] = [{ ...blankLineItem }];
    let isNewClient: boolean = false;

    // As a magic array of TS, must be types as whole
    export let invoice: Invoice = {
        client: {} as Client,
        lineItems: [{ ...blankLineItem }] as LineItem[]
    } as Invoice;

    // As a magic array of TS, must be types as whole
    let newClient: Partial<Client> = {};

    export let formState: 'create' | 'edit' = 'create';

    export let closePanel: () => void = () => {};

    let isModalShowing = false;

    const initialDiscount = invoice.discount || 0;

    const AddLineItem = () => {
        invoice.lineItems = [...(invoice.lineItems as []), { ...blankLineItem, id: uuidv4() }];
    };

    const RemoveLineItem = (event: CustomEvent) => {
        invoice.lineItems =
            invoice?.lineItems && invoice.lineItems.filter((item) => item.id !== event.detail);
        console.log('remove line item');
    };

    const UpdateLineItem = () => {
        invoice.lineItems = invoice.lineItems;
    };

    const handleSubmit = () => {
        if (isNewClient) {
            invoice.client = newClient as Client;
            addClient(newClient as Client);
        } else {
            updateInvoice(invoice);
        }

        if (formState === 'create') {
            addInvoice(invoice);
            snackbar.send({ message: 'Vaše faktura byla úspéšně vytvořena', type: 'success' });
        }

        closePanel();
    };

    const UpdateDiscount = (event: CustomEvent) => {
        invoice.discount = event.detail.discount;
    };

    onMount(() => {
        loadClients();
    });
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">
    {#if formState === 'create'}
        Vytvořit fakturu
    {:else}
        Editace faktury
    {/if}
</h2>

<form class="grid grid-cols-6 gap-x-5" on:submit|preventDefault={handleSubmit}>
    <!-- client -->
    <div class="field col-span-6 md:col-span-4">
        {#if !isNewClient}
            <label for="client">Klient</label>
            <div class="flex flex-wrap items-end gap-x-2 sm:flex-nowrap md:gap-x-5">
                <select
                    class="mb-2 sm:mb-0"
                    name="client"
                    id="client"
                    required={!isNewClient}
                    bind:value={invoice.client.id}
                    on:change={() => {
                        const selectedClient = $clients.find(
                            (client) => client.id === invoice.client.id
                        );
                        invoice.client.name =
                            selectedClient?.name !== undefined ? selectedClient.name : '';
                    }}
                >
                    <option />
                    {#each $clients as client}
                        <option value={client.id}>{client.name}</option>
                    {/each}
                </select>
                <div class="text-base font-bold leading-[2.25rem] text-monsoon lg:leading-[3.5rem]">
                    nebo
                </div>
                <Button
                    label="Přidat klienta"
                    onClick={() => {
                        isNewClient = true;
                        invoice.client.name = '';
                        invoice.client.email = '';
                    }}
                    style="outline"
                    isAnimated={false}
                />
            </div>
        {:else}
            <label for="NewClient">Nový klient</label>
            <div class="flex flex-wrap items-end gap-x-2 sm:flex-nowrap md:gap-x-5">
                <input
                    class="mb-2 sm:mb-0"
                    type="text"
                    name="newClient"
                    required={isNewClient}
                    bind:value={newClient.name}
                />
                <div class="text-base font-bold leading-[2.25rem] lg:leading-[3.5rem]">nebo</div>
                <Button
                    label="Existující klient"
                    onClick={() => {
                        isNewClient = false;
                        newClient = {};
                    }}
                    style="outline"
                    isAnimated={false}
                />
            </div>
        {/if}
    </div>

    <!-- invoice id -->
    <div class="field col-span-6 row-start-1 md:col-span-2 md:row-start-auto">
        <label for="invoiceNumber">Číslo faktury</label>
        <input
            class="p-4"
            type="number"
            name="invoiceNumber"
            required
            bind:value={invoice.invoiceNumber}
        />
    </div>

    <!-- new client -->
    {#if isNewClient}
        <div class="field col-span-6 grid gap-x-5" transition:slide={{ duration: 300 }}>
            <div class="field col-span-6">
                <label for="email">E-mail klienta</label>
                <input
                    class="p-4"
                    type="email"
                    name="email"
                    id="email"
                    required={isNewClient}
                    bind:value={newClient.email}
                />
            </div>

            <div class="field col-span-6">
                <label for="street">Ulice</label>
                <input
                    class="p-4"
                    type="text"
                    name="stret"
                    id="street"
                    bind:value={newClient.street}
                />
            </div>

            <div class="field col-span-2">
                <label for="city">Město</label>
                <input class="p-4" type="text" name="city" id="city" bind:value={newClient.city} />
            </div>

            <div class="field col-span-2">
                <label for="state">Kraj</label>
                <select class="p-4" name="name" id="state" bind:value={newClient.state}>
                    {#each states as state}
                        <option value={state.value}>{state.name}</option>
                    {/each}
                </select>
            </div>

            <div class="field col-span-2">
                <label for="zip">PSČ</label>
                <input class="p-4" type="text" name="zip" id="id" bind:value={newClient.zip} />
            </div>
        </div>
    {/if}

    <!-- due date -->
    <div class="field col-span-3 sm:col-span-2">
        <label for="dueDate">Splatnost</label>
        <input
            class="p-4"
            type="date"
            name="dueDate"
            min={today}
            required
            bind:value={invoice.dueDate}
        />
    </div>

    <!-- issue date -->
    <div class="field col-span-3 md:col-span-2 md:col-start-5">
        <label for="issueDate">Vystaveno</label>
        <input
            class="p-4"
            type="date"
            name="issueDate"
            min={today}
            bind:value={invoice.issueDate}
        />
    </div>

    <!-- subject -->
    <div class="field col-span-6">
        <label for="subject">Text před položkami faktury</label>
        <input class="p-4" type="text" name="subject" bind:value={invoice.subject} />
    </div>

    <!-- line items -->
    <div class="field col-span-6">
        <LineItemRows
            discount={invoice.discount}
            lineItems={invoice.lineItems}
            on:addLineItem={AddLineItem}
            on:removeLineItem={RemoveLineItem}
            on:updateLineItem={UpdateLineItem}
            on:updateDiscount={UpdateDiscount}
        />
    </div>

    <div class="field col-span-6">
        <label for="subjectSecond">Text za položkami faktury</label>
        <input
            class="p-4"
            type="text"
            name="subjectSecond"
            placeholder="Dovolujeme si Vás upozornit, že v případně nedodržení data splatnosti uvedeného na faktuře Vám můžeme účtovat zákonný úrok z prodlení."
            bind:value={invoice.subjectSecond}
        />
    </div>

    <!-- notes -->
    <div class="field col-span-6">
        <label for="notes"
            >Poznámka <span class="font-normal"
                >(je určeno pouze pro vás, příjemce faktury ji neuvidí)</span
            ></label
        >
        <textarea class="p-4" name="notes" id="notes" bind:value={invoice.notes} />
    </div>

    <!-- terms -->
    <div class="field col-span-6">
        <label for="terms"
            >Podmínky <span class="font-normal"
                >(je určeno pouze pro vás, příjemce faktury je neuvidí)</span
            ></label
        >
        <textarea class="p-4" name="terms" id="terms" bind:value={invoice.terms} />
        <div class="text-xs text-gray-400">
            Tipy k formátování: <strong>*bold*</strong>, <em>_italics_</em>
        </div>
    </div>

    <!-- buttons -->
    <div class="field col-span-2">
        <!-- only be visible if editing -->
        {#if formState === 'edit'}
            <Button
                style="textOnlyDesctructive"
                label="Smazat"
                isAnimated={false}
                onClick={() => {
                    isModalShowing = true;
                }}
                iconLeft={Trash}
            />
        {/if}
    </div>
    <div class="field col-span-4 flex justify-end gap-x-5">
        <Button
            style="secondary"
            label="Zavřít"
            isAnimated={false}
            onClick={() => {
                closePanel();
            }}
        />
        <button
            class="button translate-y-0 bg-lavenderIndigo text-white shadow-colored transition-all hover:-translate-y-1 hover:shadow-coloredHovered"
            type="submit">Uložit</button
        >
    </div>
</form>

<ConfirmDelete
    {invoice}
    {isModalShowing}
    on:close={() => {
        isModalShowing = false;
        closePanel();
    }}
/>
