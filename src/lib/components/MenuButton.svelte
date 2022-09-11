<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    export let animated = false;

    function emit() {
        dispatch('click', {});
    }

</script>

<button on:click={emit} class="menu-icon {animated ? 'animate-bounce' : ''}">
    <slot></slot>
</button>