<script lang="ts">
    import { page } from '$app/stores';
    import Close from '$components/Icon/Close.svelte';
    import Hamburger from '$components/Icon/Hamburger.svelte';

    let isNavShowing = false;
</script>

<svelte:head>
    {#if isNavShowing}
        <style lang="postcss">
            body {
                @apply overflow-hidden md:overflow-auto;
            }
        </style>
    {/if}
</svelte:head>

<!-- mobile nav control -->
<button
    class="fixed right-6 top-6 z-navBarToggle md:hidden"
    class:text-goldenFizz={isNavShowing}
    class:text-daisyBush={!isNavShowing}
    on:click={() => {
        isNavShowing = !isNavShowing;
    }}
>
    {#if isNavShowing}
        <Close width={32} height={32} />
    {:else}
        <Hamburger width={32} height={32} />
    {/if}
</button>

<header
    class="fixed z-navBar h-screen w-full -translate-x-full bg-daisyBush text-center transition-transform md:relative md:col-span-3 md:h-full md:translate-x-0"
    class:translate-x-0={isNavShowing}
>
    <div>
        <div class="mx-auto mt-10 mb-10 max-w-[50%] md:mb-24">
            <a href="/invoices">
                <div class="-rotate-[31deg]">
                    <img src="/images/logo.svg" alt="Fantastic Broccoli" class="mx-auto" />
                </div>
            </a>
        </div>
    </div>
    <nav>
        <ul class="Header list-none text-lg font-bold md:text-2xl">
            <li>
                <a href="/invoices" class:active={$page.url.pathname === '/invoices'}>Faktury</a>
            </li>
            <li>
                <a href="/clients" class:active={$page.url.pathname === '/clients'}>Klienti</a>
            </li>
            <li>
                <a href="#">Nastavení</a>
            </li>
            <li>
                <a href="#">Odhlásit</a>
            </li>
        </ul>
    </nav>
</header>

<style lang="postcss">
    nav ul li {
        @apply mb-6;
    }

    nav ul li a {
        @apply font-bold text-white hover:text-goldenFizz;
    }

    nav ul li a.active {
        @apply px-8 text-robinEggBlue transition-[padding];
        background: url('/images/active-nav--left.svg') left top no-repeat,
            url('/images/active-nav--right.svg') right top no-repeat;
    }

    nav ul li a.active:hover {
        @apply px-9;
    }
</style>
