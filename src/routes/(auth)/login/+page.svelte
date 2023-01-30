<script lang="ts">
    import Alert from '$components/Alert.svelte';
    import Loader from '$components/Loader.svelte';
    import supabase from '$utils/supabase';
    import { goto } from '$app/navigation';

    let email: string,
        password: string,
        message = 'Byli jste úspěšně odhlášeni!',
        isLoading = false;

    const handleSubmit = async () => {
        isLoading = true;
        message = '';
        let { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            message = error.message;
            console.log(error);
        } else {
            goto('/invoices');
        }
        isLoading = false;
    };
</script>

<h1 class="auth-heading">Přihlášení</h1>

<form on:submit|preventDefault={handleSubmit}>
    <Alert {message} />
    <fieldset disabled={isLoading}>
        <div class="field">
            <label for="email" class="text-goldenFizz">E-mail</label>
            <input type="email" name="email" placeholder="Váš E-mail" bind:value={email} />
        </div>
        <div class="field">
            <div class="flex justify-between">
                <label for="password" class="text-goldenFizz">Heslo</label>
                <a href="/forgot-password" class="text-sm text-white underline hover:no-underline"
                    >Zapomenuté heslo?</a
                >
            </div>
            <input type="password" placeholder="Vaše heslo" bind:value={password} />
        </div>
        <div class="field">
            <button type="submit" class="auth-button flex items-center justify-center gap-x-2">
                {#if isLoading}
                    <Loader /> Načítám
                {:else}
                    Pojďme na to!
                {/if}
            </button>
            <p class="mt-4 text-center text-sm text-white">
                <a href="/signup" class="underline hover:no-underline">Ještě nemáte účet?</a>
            </p>
        </div>
    </fieldset>
</form>
