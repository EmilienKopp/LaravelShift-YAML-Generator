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

const ACTION_NAME = $DRAGGABLE_CONFIG.controllerActions.actionName.store;
const propertyClass = $DRAGGABLE_CONFIG.controllerActions.propertyClass;
const freeInputProperties = $DRAGGABLE_CONFIG.controllerActions.freeInputProperties;
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

<div class="draggable {propertyClass}" draggable="true" on:dragstart="{dragstartHandler}" on:dragend="{dragendHandler}" on:drop="{()=>prevent_default()}">
    <p class="action-title">{ACTION_NAME}()</p>
    <input type="hidden" value="{ACTION_NAME}" />
    <label for="{ACTION_NAME}-query-select-{UUID}">query:</label>
    {#each freeInputProperties[ACTION_NAME] as property}
        <label for="{ACTION_NAME}-{property}-input-{UUID}">{property}:</label>
        <input type="text" id="{ACTION_NAME}-{property}-input-{UUID}" class="form-control form-control-sm">
    {/each}
</div>


<style>

</style>