<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function emit() {
        dispatch('click', {});
    }

</script>

<button on:click={emit} class="menu-icon">
    <slot></slot>
</button>