<script lang="ts">
    import Button from '$components/Button.svelte';
    import Trash from '$components/Icon/Trash.svelte';
    import Check from '$components/Icon/Check.svelte';
    import { states } from '$utils/states';
    import type { Client } from '../../../global';
    import { addClient, updateClient } from '$stores/ClientStore';
    import { snackbar } from '$stores/SnackbarStore';

    export let client: Client = {} as Client;

    export let formStatus: 'create' | 'edit' = 'create';

    const handleSubmit = () => {
        if (formStatus === 'create') {
            addClient(client);
            snackbar.send({
                message: 'Nový klient byl úspěšně vytvořen',
                type: 'success'
            });
        } else {
            updateClient(client);
            snackbar.send({
                message: 'Klient byl úspěšně upraven',
                type: 'success'
            });
        }
        closePanel();
    };

    export let closePanel: () => void = () => {};
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">
    {#if formStatus === 'create'}
        Přidat <!-- content here -->
    {:else}
        Editace
    {/if}
    klienta
</h2>

<form class="grid grid-cols-6 gap-x-5" on:submit|preventDefault={handleSubmit}>
    <div class="field col-span-6">
        <label for="name">Klient</label>
        <input type="text" name="name" required bind:value={client.name} />
    </div>

    <div class="field col-span-6">
        <label for="email">E-mail klienta</label>
        <input type="email" name="email" required bind:value={client.email} />
    </div>

    <div class="field col-span-6">
        <label for="street">Ulice</label>
        <input type="text" name="street" bind:value={client.street} />
    </div>

    <div class="field col-span-2">
        <label for="city">Město</label>
        <input type="text" name="city" bind:value={client.city} />
    </div>

    <div class="field col-span-2">
        <label for="state">Kraj</label>
        <select name="state" id="state" bind:value={client.state}>
            <option />
            {#each states as state}
                <option value={state.value}>{state.name}</option>
            {/each}
        </select>
    </div>

    <div class="field col-span-2">
        <label for="zip">PSČ</label>
        <input type="text" name="zip" minlength="5" bind:value={client.zip} />
    </div>

    <div class="field col-span-3">
        <Button
            label="Smazat"
            onClick={() => {}}
            isAnimated={false}
            style="textOnlyDesctructive"
            iconLeft={Trash}
        />
    </div>

    <div class="field col-span-3 flex justify-end gap-x-5">
        <Button label="Zavřít" style="secondary" onClick={closePanel} isAnimated={false} />
        <button
            class="button flex translate-y-0 items-center justify-center gap-x-2 bg-lavenderIndigo text-white shadow-colored transition-all hover:-translate-y-2 hover:shadow-coloredHovered"
            type="submit"
        >
            <Check />
            Uložit
        </button>
    </div>
</form>
