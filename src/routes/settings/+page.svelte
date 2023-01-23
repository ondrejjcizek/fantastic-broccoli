<script lang="ts">
    import Button from '$components/Button.svelte';
    import Check from '$components/Icon/Check.svelte';
    import Navbar from '$components/Navbar.svelte';
    import Snackbar from '$components/Snackbar.svelte';
    import { settings, loadSettings } from '$stores/Settings';
    import { states } from '$utils/states';
    import { onMount } from 'svelte';
    import type { Settings } from '$global';

    let mySettings: Settings = {} as Settings;

    onMount(() => {
        loadSettings();
        mySettings = { ...$settings };
    });
</script>

<div class="grid min-h-screen grid-cols-12 bg-whisper md:gap-x-16">
    <Snackbar />
    <Navbar />
    <main
        class="col-span-12 px-4 pt-4 md:col-span-8 md:col-start-4 md:pt-10 lg:col-span-6 lg:col-start-5"
    >
        <h2>Invoice Details</h2>
        <p class="mb-8">This information gets included on each invoice.</p>

        <form class="grid grid-cols-6 gap-x-5">
            <div class="field col-span-6">
                <label for="myName">Name</label>
                <input type="text" name="myName" id="myName" bind:value={mySettings.myName} />
            </div>
            <div class="field col-span-6">
                <label for="strret">Address</label>
                <input type="text" name="street" id="street" bind:value={mySettings.street} />
            </div>
            <div class="field col-span-6 md:col-span-2">
                <label for="city">City</label>
                <input type="text" name="city" id="city" bind:value={mySettings.city} />
            </div>
            <div class="field col-span-6 md:col-span-2">
                <label for="state">State</label>
                <select name="state" id="state" bind:value={mySettings.state}>
                    {#each states as state}
                        <option value={state.value}>{state.name}</option>
                    {/each}
                </select>
            </div>
            <div class="field col-span-6 md:col-span-2">
                <label for="zip">PSČ</label>
                <input type="text" name="zip" id="zip" bind:value={mySettings.zip} />
            </div>
            <div class="field col-span-6 flex justify-end">
                <Button label="Uložit" iconLeft={Check} onClick={() => {}} />
            </div>
        </form>

        <div class="col-span-6">
            <h2>Update Account Information</h2>
            <p class="mb-8">This information is used to access your account.</p>
        </div>

        <form class="grid grid-cols-6 gap-x-5">
            <div class="field col-span-6 md:col-span-3">
                <label for="email">E-mail</label>
                <input type="email" name="email" />
            </div>

            <div class="field col-span-6 md:col-span-3">
                <label for="currentPassword">Aktuální heslo</label>
                <input type="password" name="currentPassword" id="currentPassword" />
            </div>

            <div class="field col-span-6 md:col-span-3">
                <label for="newPassword">Nové heslo</label>
                <input type="password" name="newPassword" id="newPassword" />
            </div>

            <div class="field col-span-6 md:col-span-3">
                <label for="confirmPassword">Potvrďte nové heslo</label>
                <input type="password" name="confirmPassword" id="confirmPassword" />
            </div>

            <div class="field col-span-6 flex justify-end">
                <Button label="Uložit" iconRight={Check} onClick={() => {}} />
            </div>
        </form>
    </main>
</div>

<style lang="postcss">
    h2 {
        @apply mb-1 text-3xl font-black text-daisyBush;
    }
</style>
