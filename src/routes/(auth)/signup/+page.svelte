<script lang="ts">
    import supabase from '$utils/supabase';
    import Alert from '$components/Alert.svelte';
    import Loader from '$components/Loader.svelte';

    let fullName: string,
        email: string,
        password: string,
        confirmPassword: string,
        message: string = '',
        isSignUpFormShowing: boolean = true,
        isLoading: boolean = false;

    const handleSubmit = async () => {
        isLoading = true;
        message = '';

        // make sure that the password and the confirm passwrod match
        if (password !== confirmPassword) {
            message = "Your password and confirm password don't match";
            isLoading = false;
            return;
        }

        let userResults = await supabase.auth.signUp({ email, password });

        if (userResults.error) {
            message = userResults.error.message;
            console.error(userResults.error);
            isLoading = false;
            return;
        }

        // add the full name to the settings table
        if (userResults?.data?.user?.id) {
            const settingsResults = await supabase
                .from('settings')
                .insert([{ myName: fullName, userId: userResults.data.user.id }]);

            if (settingsResults.error) {
                message = settingsResults.error.message;
                console.error(settingsResults.error);
                isLoading = false;
                return;
            }
        }

        isSignUpFormShowing = false;
        isLoading = false;
    };
</script>

{#if isSignUpFormShowing}
    <h1 class="auth-heading">Sign Up</h1>
    <Alert {message} />
    <form on:submit|preventDefault={handleSubmit}>
        <fieldset disabled={isLoading}>
            <div class="field">
                <label for="fullName" class="text-goldenFizz">Celé jméno</label>
                <input type="text" name="fullName" id="fullName" required bind:value={fullName} />
            </div>
            <div class="field">
                <label for="email" class="text-goldenFizz">E-mail</label>
                <input type="email" name="email" id="email" required bind:value={email} />
            </div>
            <div class="field">
                <label for="password" class="text-goldenFizz">Heslo</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    bind:value={password}
                />
            </div>
            <div class="field">
                <label for="confirmPassword" class="text-goldenFizz">Zopakujte heslo</label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    required
                    bind:value={confirmPassword}
                />
            </div>
            <button type="submit" class="auth-button flex items-center justify-center gap-x-2">
                {#if isLoading}
                    <Loader />
                    Načítám
                {:else}
                    Registrovat
                {/if}
            </button>
            <p class="mt-4 text-center text-sm text-white">
                <a href="/login" class="underline hover:no-underline">Máte již vytvořený účet?</a>
            </p>
        </fieldset>
    </form>
{:else}
    <Alert message="Do emailu vám dorazí potvrzovací odkaz" />
    <a href="/login" class="auth-button block text-center">Přihlásit se</a>
{/if}
