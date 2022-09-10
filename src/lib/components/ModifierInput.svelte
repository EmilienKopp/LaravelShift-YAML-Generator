<script>
import { createEventDispatcher } from "svelte";
import { MODIFIERS} from '../stores';
import { fade } from 'svelte/transition';
import { cubicIn } from 'svelte/easing';



export let modifierID;
export let selected;
export let value;
export let option;

let selectedMod;

const dispatch = createEventDispatcher();
const modifiers = $MODIFIERS.filter(m => !m.common);

function chaining () {
    // console.log('chaining()');
    // if (!selected.chain) return;
    // dispatch('chaining', {UUID});
    // console.log(div);
    // let clone = div.cloneNode(true);
    // clone.id = makeUUID();
    // let chainOptions = selected.chain;
    // let selectInput = clone.querySelector('select');
    // let inputElement = clone.querySelector('input');
    // while (selectInput.firstChild) {
    //     selectInput.removeChild(selectInput.firstChild);
    // }
    // chainOptions.forEach(option => {
    //     let optionElement = document.createElement('option');
    //     optionElement.value = option;
    //     optionElement.innerText = option;
    //     selectInput.appendChild(optionElement);
    // });
    // selectInput.parentNode.appendChild(inputElement);
    // document.querySelector('#'+UUID).parentNode.appendChild(clone);
}
$ : {
    selectedMod = modifiers.find(m => m.label === selected);
}

</script>

<div id="{modifierID}" transition:fade={ {duration:300, easing: cubicIn} } class="relative mb-1 h-8">

    <div class="flex flex-row">
        <select bind:value={selected} on:change={chaining} class="rounded-md mr-3 h-8">
            {#each modifiers as modifier}
                <option value={modifier.label}>{modifier.label}</option>
            {/each}
        </select>
        {#if selected != null && selectedMod.input == "text"}
            <input bind:value={value} type="text" size=12 class="border border-gray-300 rounded-md p-2 h-8 text-xs" placeholder="{selectedMod.placeholder}"/>
        {:else if selected && selectedMod.input == "select"}
            <select class="border border-gray-300 rounded-md h-8" bind:value={option}>
                {#each selectedMod.options as opt}
                    <option value={opt}>{opt}</option>
                {/each}
            </select>
        {/if}
    </div>

</div>


<style>

</style>