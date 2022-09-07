<script>
    import { createEventDispatcher } from "svelte";


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
{#if !disabled}
   
	<div class="relative flex flex-col items-center group">
        <button id={label+'-'+UUID} 
        class="{baseStyle} {checked ? checkedClass : uncheckedClass }"
        on:click|preventDefault={ checkAndDispatch }
        on:mouseleave={ mouseLeaveHandler }>
            <i class="bi bi-{icon}"></i>
        </button>
		<div class="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
			<span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
                {label}
            </span>
			<div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
		</div>
	</div>

{:else}
<div>
    <button id={label+'-'+UUID} 
                    title="{label}"
                    class="{baseStyle} {checked ? checkedClass : uncheckedClass }">
                    <i class="bi bi-{icon}"></i>
    </button>
</div>
{/if}