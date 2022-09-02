<script>
import { fade } from 'svelte/transition';
import { cubicInOut } from 'svelte/easing';
import { resource } from './stores';

let modalDisplayed = false;
let X, Y;

const fading = { duration: 200, easing: cubicInOut}


function toggleStatusModal() {
    modalDisplayed = !modalDisplayed;
    if(modalDisplayed) {
        document.addEventListener('dragover',(e) => {
            e.preventDefault();
        })
    }
}

function getClickXY(event) {
    let elemX = event.target.getBoundingClientRect().left;
    let elemY = event.target.getBoundingClientRect().top;
    X = event.pageX - elemX;
    Y = event.pageY - elemY;
}

function dragendHandler(event) {
    let mouseEndX = event.clientX;
    let mouseEndY = event.clientY;
    let newPositionLeft = mouseEndX - X;
    let newPositionTop = mouseEndY - Y;
    event.target.style.left = newPositionLeft +'px';
    event.target.style.top = newPositionTop + 'px';
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
            on:mousedown="{getClickXY}">
    <h5>StatusModal</h5>
    {resource}
    </div>
{/if}


<style>

</style>