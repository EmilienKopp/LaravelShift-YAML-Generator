<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    export let animated = false;
    export let color = '';
    export let hoverColor = '';

    let menuIconClass = 'menu-icon' + ( color ? '-' + color : '' );

    function emit() {
        dispatch('click', {});
    }

</script>

<button on:click={emit} class="{menuIconClass} {animated ? 'animate-bounce' : ''}">
    <slot></slot>
</button>