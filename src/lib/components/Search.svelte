<script lang="ts">
    import Search from '$components/Icon/Search.svelte';
    import { createEventDispatcher } from 'svelte';

    let searchTerms: string = '';

    const dispatch = createEventDispatcher();

    const handleSubmit = () => {
        dispatch('search', { searchTerms });
    };
</script>

<form on:submit|preventDefault={handleSubmit} class="relative flex w-full items-baseline">
    <div class="mr-2 mt-auto text-pastelPurple">
        <Search />
    </div>
    <input
        type="search"
        name="search"
        placeholder="Hledej ve fakturách"
        bind:value={searchTerms}
        on:search={() => {
            dispatch('clear', { searchTerms });
        }}
        class="search w-full border-b-2 border-dashed border-b-pastelPurple bg-transparent pr-[90px] font-sansSerif text-base text-black outline-none focus:border-solid focus:border-b-lavenderIndigo md:w-[14rem] md:pr-0 lg:w-72 lg:text-xl"
    />
    <button
        class="pointer-events-none absolute left-8 transform font-sansSerif text-lg font-black text-pastelPurple transition-all duration-300 lg:text-xl"
        >Vyhledat</button
    >
</form>

<style lang="postcss">
    ::placeholder {
        color: transparent;
    }

    input:not(:placeholder-shown) + button,
    input:focus + button {
        @apply pointer-events-auto left-[calc(100%-72px)] translate-x-[calc(100%-75px)] text-right text-lavenderIndigo md:left-8 md:right-auto md:translate-x-[14rem] lg:translate-x-72;
    }

    input + button:hover,
    input:focus + button:hover {
        @apply text-daisyBush;
    }
</style>
