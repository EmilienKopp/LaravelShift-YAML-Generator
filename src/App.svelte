<script>
import { resource, menuRightmost, columns, YAML, modelData } from './lib/stores';
import ColumnInfo from './lib/components/ColumnInfo.svelte';
import IndexAction from './lib/components/IndexAction.svelte';
import YamlTool from './lib/components/YamlTool.svelte';
import StoreAction from './lib/components/StoreAction.svelte';
import { dump } from 'js-yaml';
import { onMount } from 'svelte';
import { makeUUID, formatModifierString } from './lib/tools/toolbox';

export let ModelName = '';

onMount( () => {
  $modelData ={ [ModelName]: {} };
  $YAML = dump($modelData);
})


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
    // let extraModifiersString = column.extraModifiers.map(m => {
    //   m.label
    // }).join(' ');
    
    console.log(column.modifiers);
    let typeSize = column.type + (column.size ? `:${column.size}` : '');
    let precisionScale = '';
    if(column.precision && column.scale) {
      precisionScale += `(${column.precision},${column.scale})`;
    } else if(column.precision) {
      precisionScale += `(${column.precision})`;
    }
    return {...acc, [column.name] : `${typeSize} ${precisionScale} ${modifiersString}`};
  }, {})
}};

$ : $resource.name = ModelName;

</script>

<!-- /** Wrapper Div **/-->
<div class="flex h-full flex-col" >
  <div class="flex h-full">

    <!-- /** SIDEBAR **/-->
    <div  id="sidebar" class="flex flex-col w-18 justify-between overflow-y-hidden p-2 max-w-fit border-r border-darkish" 
          style="height:100vh;">
      <YamlTool/>
    </div>

    <!-- /** MAIN (OUTER) **/-->
    <main class="flex flex-1 flex-col overflow-x-hidden h-full" style="height:100vh;">
  
      <!-- /** HEADER **/-->
      <div id="header" class="flex h-12 max-h-12 items-center gap-5 py-2 px-5 border-b border-darkish">
        <div class="-ml-2 flex items-center text-sm">
          BlueprintFactory
        </div>
        <input type="text" class="mx-4 p-2 rounded-sm text-darkish" id="resource-name-input" placeholder="モデル名を入力" 
          bind:value="{ModelName}"/>
      </div>

      <!-- /** MAIN (INNER) **/-->
      <main class="flex-1 overflow-y-auto"  style="max-height: 100vh;">

        <!-- /** APP CONTENT (GRID) **/-->
        <div id="content" class="flex flex-row gap-4 top-16 left-0 py-4 pl-52 w-full">
          
          <!-- /** WRAPPER FOR MODEL ATTRIBUTES **/-->
          <div id="model-wrapper" class="border-2 border-darkish rounded-lg h-5/6 max-w-fit p-2">
            <h6>Model:</h6>
            <div id="attributes" class="h-full w-96">
              <div id="list" class="px-1">
                {#each $columns as column}
                <ColumnInfo {...column} bind:name={column.name} bind:type={column.type} bind:size={column.size}
                            bind:precision={column.precision} bind:scale={column.scale} bind:modifiers={column.modifiers}
                            bind:saved={column.saved} bind:disabled={column.disabled} bind:extraModifiers={columns.extraModifiers}/>
                {/each}
              </div>
              <div on:click={addColumn} 
              class=" h-8 mx-1 mt-2 border-2 rounded-md border-darkish text-center hover:bg-darkish hover:shadow-sm hover:shadow-darkish">
                <i class="bi bi-plus-square-dotted text-xl">
              </div>
            </div>
          </div>

          <!-- /** WRAPPER FOR CONTROLLER ACTIONS **/-->
          <div id="controller-wrapper" class="border-2 border-darkish p-2 rounded-md self-start">
            <h6>Controllers:</h6>
            <div id="controllers" class="flex flex-row gap-4">
              <IndexAction/>
              <StoreAction/>
            </div>
          </div>
  
        </div>
      </main>
    </main>
  </div>
</div>
