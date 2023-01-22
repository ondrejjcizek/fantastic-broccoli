<script lang="ts">
    import Alert from '$components/Alert.svelte';
    let email: string,
        password: string,
        alertMessage = 'Byli jste úspěšně odhlášeni!';
</script>

<h1 class="mb-4 text-[2.5rem] font-black text-goldenFizz">Přihlášení</h1>

<form>
    <Alert message={alertMessage} />
    <div class="field">
        <label for="email" class="text-goldenFizz">E-mail</label>
        <input type="email" name="email" placeholder="Váš E-mail" bind:value={email} />
    </div>

    <div class="field">
        <div class="flex justify-between">
            <label for="password" class="text-goldenFizz">Heslo</label>
            <a href="/forgot-passsword" class="text-sm text-white underline hover:no-underline"
                >Zapomenuté heslo?</a
            >
        </div>
        <input type="password" placeholder="Vaše heslo" bind:value={password} />
    </div>

    <div class="field">
        <button
            type="submit"
            class="mt-6 min-h-[3.5rem] w-full rounded-lg bg-robinEggBlue py-3 px-4 text-xl font-bold text-daisyBush transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
        >
            Pojďme na to!
        </button>
        <p class="mt-4 text-center text-sm text-white">
            <a href="/signup" class="underline hover:no-underline">Ještě nemáte účet?</a>
        </p>
    </div>
</form>
