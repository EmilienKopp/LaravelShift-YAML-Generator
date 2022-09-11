<script>
import { dump } from 'js-yaml';
import { onMount } from 'svelte';
import { supabase } from '../../API/SupabaseClients';
import { resource, columns, YAML, modelData } from '../stores';
import { makeUUID, formatModifierString } from '../tools/toolbox';
import ColumnInfo from '../components/ColumnInfo.svelte';
import IndexAction from '../components/IndexAction.svelte';
import StoreAction from '../components/StoreAction.svelte';
import RelationshipTool from '../components/RelationshipTool.svelte';
import RelationshipTable from '../components/RelationshipTable.svelte';

export let session;

let ModelName = '';
let relationships;



onMount( () => {
    $modelData ={ [ModelName]: {} };
    $YAML = dump($modelData);
});

function addColumn(){
    let newUUID = makeUUID();
    let newColumn = {
    UUID: newUUID,
    name: null,
    type: null,
    size: null,
    precision: null,
    scale: null,
    modifiers: [],
    saved: new Date(),
    disabled: false,
    }
    columns.set([...$columns, newColumn]);
}


$: $YAML = dump($modelData);
$: $modelData = { [ModelName]: {
    ...$columns.reduce( (acc, column) => {
    if(column.disabled) return acc;
    let modifiersString = formatModifierString(column.modifiers);
    
    modifiersString += column.extraModifiers ? ' '+formatModifierString(column.extraModifiers) : '';
    let typeSize = column.type + (column.size ? `:${column.size}` : '');
    let precisionScale = '';
    if(column.precision && column.scale) {
        precisionScale += `(${column.precision},${column.scale})`;
    } else if(column.precision) {
        precisionScale += `(${column.precision})`;
    }

    return {...acc, [column.name] : `${typeSize}${precisionScale} ${modifiersString}`.trim()};
    }, {}),
    relationships,
}};

$ : relationships = $resource.serializeRelationships();
$ : ModelName = $resource.name ? $resource.name : '';
</script>


<!-- /** HEADER **/-->
<slot name="header" ></slot>

    <!-- /** MAIN (INNER) **/-->
<main class="flex-1 overflow-y-auto"  style="max-height: 100vh;">

    <!-- /** APP CONTENT (GRID) **/-->
    <div id="content" class="flex flex-row gap-4 top-16 left-0 py-8 pl-52 w-full">
        
        <!-- /** WRAPPER FOR MODEL ATTRIBUTES **/-->
        <div id="model-wrapper" class="border-2 border-darkish rounded-lg h-5/6 max-w-fit p-2">
        <div class="grid grid-cols-2">
            <h6>Model:</h6>
            <div class="place-self-end">
            <RelationshipTool/>
            </div>
            <RelationshipTable/>
        </div>
        <div id="attributes" class="h-full w-96">
            <div id="list" class="px-1">
            {#each $columns as column}
            <ColumnInfo {...column} bind:name={column.name} bind:type={column.type} bind:size={column.size}
                        bind:precision={column.precision} bind:scale={column.scale} bind:modifiers={column.modifiers}
                        bind:saved={column.saved} bind:disabled={column.disabled} bind:extraModifiers={column.extraModifiers}/>
            {/each}
            </div>
            <div on:click={addColumn} 
            class=" h-8 mx-1 mt-2 border-2 rounded-md border-darkish text-center hover:bg-darkish hover:shadow-sm hover:shadow-darkish">
            <i class="bi bi-plus-square-dotted text-xl">
            </div>
        </div>
        </div>

        <!-- /** WRAPPER FOR CONTROLLER ACTIONS **/-->
        <div id="controller-wrapper" class="hidden border-2 border-darkish p-2 rounded-md self-start">
        <h6>Controllers:</h6>
        <div id="controllers" class="flex flex-row gap-4">
            <IndexAction/>
            <StoreAction/>
        </div>
        </div>

        <slot name="HowTo"></slot>
    </div>
    
</main>

        