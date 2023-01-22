<h1 class="auth-heading">Sign Up</h1>
<form>
    <div class="field">
        <label for="fullName" class="text-goldenFizz">Celé jméno</label>
        <input type="text" name="fullName" id="fullName" required />
    </div>
    <div class="field">
        <label for="email" class="text-goldenFizz">E-mail</label>
        <input type="email" name="email" id="email" required />
    </div>

    <div class="field">
        <label for="password" class="text-goldenFizz">Heslo</label>
        <input type="password" name="password" id="password" required />
    </div>

    <div class="field">
        <label for="confirmPassword" class="text-goldenFizz">Zopakujte heslo</label>
        <input type="password" name="confirmPassword" id="confirmPassword" required />
    </div>
    <button type="submit" class="auth-button">Registrovat</button>
    <p class="mt-4 text-center text-sm text-white">
        <a href="/login" class="underline hover:no-underline">Máte již vytvořený účet?</a>
    </p>
</form>
