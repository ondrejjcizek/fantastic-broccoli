<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Arrow from './Icon/Arrow.svelte';
    import Overlay from './Overlay.svelte';
    import Portal from './Portal.svelte';
    import { fly } from 'svelte/transition';
    import { clickOutside } from '$actions/ClickOutside';

    const dispatch = createEventDispatcher();

    const keyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            dispatch('close');
        }
    };
</script>

<svelte:window on:keydown={keyDown} />

<Portal>
    <Overlay />
    <div
        class="fixed right-0 top-0 z-slidePanel h-screen w-full overflow-y-scroll bg-white px-5 pt-16 shadow-slidePanel lg:w-3/4 lg:py-20 lg:px-32"
        transition:fly={{ x: 1000, duration: 500 }}
        use:clickOutside={() => {
            dispatch('closePanel');
        }}
    >
        <button
            on:click={() => dispatch('closePanel')}
            class="absolute top-5 left-7 text-pastelPurple hover:text-daisyBush"
        >
            <Arrow />
        </button>
        <slot><!-- optional fallback --></slot>
    </div>
</Portal>
