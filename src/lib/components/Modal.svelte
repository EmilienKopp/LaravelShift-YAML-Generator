<script>
import { fly,fade } from 'svelte/transition';
import { getRelativeXY, adjustPosition } from '../tools/dragging';
import { createEventDispatcher } from 'svelte';
import { quartInOut } from 'svelte/easing';

export let showing;
export let title;

const dispatch = createEventDispatcher();
const flyOptions = { duration: 600, x: -400 , easing: quartInOut}

let coord;

function toggleModal() {
    showing = !showing;
    dispatch('toggle', {show: showing});
    if(showing) {
        document.addEventListener('dragover',(e) => {
            e.preventDefault();
        })
    }
}

function mouseDownHandler(event) {
    coord = getRelativeXY(event);
}

function dragendHandler(event) {
    adjustPosition(event,coord);
}
</script>


{#if showing}
    <div id='modal-{title}'
        class="absolute top-15 left-20 p-4 cursor-pointer z-50 rounded-lg bg-darkish text-white"
        draggable="{showing}"
        transition:fly={ flyOptions }  
        on:dragend="{dragendHandler}"
        on:mousedown="{mouseDownHandler}">

        <button transition:fade={{duration:300}}
        class="modal-btn-left text-black">
            <i class="bi bi-arrows-move"></i>
        </button>

        <button on:click={toggleModal}
        class="modal-btn-right text-black">
            <i class="bi bi-x"></i>
        </button>
        <h2 class="font-bold text-green-400 text-xl text-center">{title}</h2>

        <slot></slot>

    </div>
{/if}
