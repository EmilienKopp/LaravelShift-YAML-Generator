<script>
    import { createEventDispatcher } from "svelte";
    import Tooltip from "./Tooltip.svelte";

    export let UUID = null;
    export let label;
    export let checked;
    export let icon;
    export let disabled = false;

    let checkedClass = 'bg-green-300';
    let checkedHoverClass = 'hover:bg-blue-300';
    let uncheckedClass = 'bg-blue-300';
    let uncheckedHoverClass = 'hover:bg-green-300';
    let baseStyle = 'toggle w-6 h-6 rounded-3xl justify-center transition-all duration-400 ease-linear';

    const dispatch = createEventDispatcher();
    
    function checkAndDispatch(){
        if(disabled) return;
        checked = !checked;
        dispatch('togglecheck', {UUID, label, checked});
    }

    function mouseLeaveHandler(event) {
        event.currentTarget.classList.remove( checked ? checkedHoverClass : uncheckedHoverClass );
    }
</script>

    <Tooltip label="{label}">
        <button id={label+'-'+UUID} 
        class="{baseStyle} {checked ? checkedClass : uncheckedClass }"
        on:click|preventDefault={ checkAndDispatch }
        on:mouseleave={ mouseLeaveHandler } {disabled}>
            <i class="bi bi-{icon}"></i>
        </button>
    </Tooltip>