<script>
import { fade } from 'svelte/transition';
import { cubicInOut } from 'svelte/easing';
import { resource } from './stores';
import { getRelativeXY, adjustPosition } from '../tools/dragging';

let modalDisplayed = false;
let coord;

const fading = { duration: 200, easing: cubicInOut}


function toggleStatusModal() {
    modalDisplayed = !modalDisplayed;
    if(modalDisplayed) {
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

<button class="status-modal-toggle-btn btn btn-success"
        on:click="{toggleStatusModal}">
    現状確認
</button>

{#if modalDisplayed}
    <div    class="status-modal"
            transition:fade={ fading } draggable="{modalDisplayed}" 
            on:dragend="{dragendHandler}"
            on:mousedown="{mouseDownHandler}">
    <h5>StatusModal</h5>
    <!-- /* TESTING */ -->
    <p>{$resource.name}</p>
    {#each $resource.model.attributes as attribute}
        <p>Attribute: {JSON.stringify(attribute)}</p>
    {/each}
    {#each $resource.controllerActions as action}
        <p>Action: {JSON.stringify(action)}</p>
    {/each}
    </div>
{/if}


<style>

</style>