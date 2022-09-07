<script>
import { prevent_default } from 'svelte/internal';
import { DRAGGABLE_CONFIG, resource} from './stores';
import {nanoid} from 'nanoid';

const ACTION_NAME = 'index';
const propertyClass = $DRAGGABLE_CONFIG.controllerActions.propertyClass;
const statements = $DRAGGABLE_CONFIG.controllerActions.statements;
const UUID = nanoid(6).replace('-','X');

function dragstartHandler(event) {
    event.currentTarget.classList.add('dragging');
}

function dragendHandler(event) {
    event.currentTarget.classList.add('dragged');
}

let query;
let render;
let selected;
let queryTypes = [
    'all',
    'withTrashed',
    'trashedOnly'
]
</script>

<div class="drop-shadow-sm rounded-sm {propertyClass} {ACTION_NAME}" draggable="true" on:dragstart="{dragstartHandler}" on:dragend="{dragendHandler}" on:drop="{()=>prevent_default()}">
    <p class="action-title">{ACTION_NAME}()</p>
    <label for="{ACTION_NAME}-query-select-{UUID}">query:</label>
    <select id="{ACTION_NAME}-query-select-{UUID}" class="form-select form-select-sm {ACTION_NAME}-query-select" bind:value={selected} on:change={(e)=> {selected = e.currentTarget.value} }>
        {#each queryTypes as queryType}
            <option value={queryType} >{queryType}</option>
        {/each}
    </select>
    {#each statements[ACTION_NAME] as property}
        <label for="{ACTION_NAME}-{property}-input-{UUID}">{property}:</label>
        <input type="text" id="{ACTION_NAME}-{property}-input-{UUID}" class="form-control form-control-sm">
    {/each}
</div>


<style>

</style>