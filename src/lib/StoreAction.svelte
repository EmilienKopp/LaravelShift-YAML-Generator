<script>
import { prevent_default } from 'svelte/internal';
import {transferObject, DRAGGABLE_CONFIG, resource} from './stores';
import {nanoid} from 'nanoid';

function dragstartHandler(event) {
    event.currentTarget.classList.add('dragging');
    $transferObject = event.currentTarget;
}

function dragendHandler(event) {
    event.currentTarget.classList.add('dragged');
}

const ACTION_NAME = 'store';
const propertyClass = $DRAGGABLE_CONFIG.controllerActions.propertyClass;
const statements = $DRAGGABLE_CONFIG.controllerActions.statements;
const UUID = nanoid(6).replace('-','X');
const queryTypes = [
    'all',
    'withTrashed',
    'trashedOnly'
]

let query;
let render;
let selected;

</script>

<div class="draggable {propertyClass} {ACTION_NAME}" draggable="true" on:dragstart="{dragstartHandler}" on:dragend="{dragendHandler}" on:drop="{()=>prevent_default()}">
    <p class="action-title">{ACTION_NAME}()</p>
    {#each statements[ACTION_NAME] as property}
        <!-- <label for="{ACTION_NAME}-{property}-input-{UUID}">{property}:</label> -->
        <input type="text" id="{ACTION_NAME}-{property}-input-{UUID}" class="form-control form-control-sm" placeholder="{property}">
        <input type="text" id="{ACTION_NAME}-{property}-options-{UUID}" class="form-control form-control-sm" placeholder="{property} options">
    {/each}
</div>


<style>

</style>