<script>
import { fly } from 'svelte/transition';
import { getRelativeXY, adjustPosition } from '../tools/dragging';
import { menuRightmost } from './stores';
import { createEventDispatcher } from 'svelte';
import { quartInOut } from 'svelte/easing';

export let showing;
export let title;

const dispatch = createEventDispatcher();
const OFFSET = 20;
const flyOptions = { duration: 600, y: -1000 , easing: quartInOut}

let coord;

console.log(window.screenX)

function toggleModal(event) {
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
        style="{"left:" + ($menuRightmost + OFFSET) + "px"}"
        class="absolute top-4 p-4 cursor-pointer z-50 rounded-lg bg-lime-100"
        draggable="{showing}"
        transition:fly={ flyOptions }  
        on:dragend="{dragendHandler}"
        on:mousedown="{mouseDownHandler}">
        <button class="modal-btn-left"><i class="bi bi-arrows-move"></i></button>
        <button on:click={toggleModal}
        class="modal-btn-right">
            <i class="bi bi-x"></i>
        </button>
        <h5>{title}</h5>

        <slot></slot>

    </div>
{/if}
