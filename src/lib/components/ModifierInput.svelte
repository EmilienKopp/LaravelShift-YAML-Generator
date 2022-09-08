<script>
import { createEventDispatcher } from "svelte";
import Tooltip from "./Tooltip.svelte";
import { MODIFIERS} from '../stores';
import { claim_svg_element } from "svelte/internal";
import { fade } from 'svelte/transition';
import { cubicIn } from 'svelte/easing';
import { makeUUID } from "../tools/toolbox";


export let UUID;

let selected = {};
let div;

const dispatch = createEventDispatcher();
const modifiers = $MODIFIERS.filter(m => !m.common);

function chaining () {
    console.log('chaining()');
    if (!selected.chain) return;
    dispatch('chaining', {UUID});
    console.log(div);
    let clone = div.cloneNode(true);
    clone.id = makeUUID();
    let chainOptions = selected.chain;
    let selectInput = clone.querySelector('select');
    let inputElement = clone.querySelector('input');
    chainOptions.forEach(option => {
        let optionElement = document.createElement('option');
        optionElement.value = option;
        option.innerText = option;
    });
    document.querySelector('#'+UUID).parentNode.appendChild(clone);
}

</script>

<div id="{UUID}" bind:this={div} transition:fade={ {duration:300, easing: cubicIn} } class="relative mb-1 h-8">

    <div class="flex flex-row">
        <select bind:value={selected} on:change={chaining} class="rounded-md mr-3 h-8">
            {#each modifiers as modifier}
                <option value={modifier}>{modifier.label}</option>
            {/each}
        </select>
        {#if selected && selected.input && selected.input == "text"}
            <input type="text" class="border border-gray-300 rounded-md p-2 h-8 text-xs" placeholder="{selected.placeholder}"/>
        {:else if selected.input == "select"}
            <select class="border border-gray-300 rounded-md h-8">
                {#each selected.options as option}
                    <option value={option}>{option}</option>
                {/each}
            </select>
        {/if}
    </div>
</div>


<style>

</style>