<script>
import { resource, menuRightmost, modelProxies, YAML, modelData } from './lib/stores';
import ModelProp from './lib/components/ModelProp.svelte';
import IndexAction from './lib/components/IndexAction.svelte';
import YamlTool from './lib/components/YamlTool.svelte';
import StoreAction from './lib/components/StoreAction.svelte';
import { dump } from 'js-yaml';
import { onMount } from 'svelte';
import { afterUpdate } from 'svelte';

export let ModelName = '';

let columnUUID, columnName, columnType, columnSize, columnModifiers;
let saved = false;
let first;
let currentIndex = 0;

onMount( () => {
  modelData.set({ [ModelName]: {} });
  YAML.set(dump($modelData));
  $modelProxies.push(first)

})

afterUpdate( () => {
  updateResource();
})

function updateResource () {
  let oldName = $resource.name;
  let oldProps = $modelData[oldName];
  $resource.name = ModelName;
  modelData.set({
    [ModelName] : {...oldProps}
  });
  YAML.set(dump($modelData));
}

function saveMenuWidth (event) {
  $menuRightmost = event.currentTarget.getBoundingClientRect().right;
}


// clone the modelProp component and add it to the receiver below
function appendNew() {
  
  let clone = new ModelProp({
    props: {
      UUID: columnUUID,
      name: null,
      type: null,
      size: null,
      modifiers: [],
    },
    target: document.querySelector('#list'),
    intro: true,
  });

  /** add the clone to an array for backup **/
  modelProxies.set([...$modelProxies, clone]);
  console.log(clone.UUID,'added to', $modelProxies);
  $modelProxies[currentIndex].saved = true;
  $modelProxies.forEach( component => {
    component.$on('remove', () => {
      console.warn('remove event received by cloned ModelProp');
      $modelProxies[$modelProxies.length-2].$destroy();
    });
    component.$on('destroyed', () => {
      console.warn('data destroyed');
      updateResource();
    });
  })
  currentIndex++;

  updateResource();

  let modifiersString = columnModifiers.map(c => c.label).join(' ');
  console.log('modifiersString: ', modifiersString);
  let typeSize = columnType + (columnSize ? `:${columnSize}` : '');
  $modelData[ModelName] = {...$modelData[ModelName], [columnName] : `${typeSize} ${modifiersString}`};
  YAML.set(dump($modelData));
  console.log('yaml:',$YAML);
}

function remove() {

}

</script>

<!-- /** Wrapper Div **/-->
<div class="flex h-full flex-col" >
  <div class="flex h-full">

    <!-- /** SIDEBAR **/-->
    <div  id="sidebar" class="flex flex-col w-18 justify-between overflow-y-hidden p-2 max-w-fit border-r border-darkish" 
          style="height:100vh;"
          on:mouseenter="{saveMenuWidth}">
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
          bind:value="{ModelName}"
          on:input="{updateResource}"/>
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
                <ModelProp on:remove(remove)
                bind:this={first} bind:name={columnName} bind:type={columnType} 
                bind:size={columnSize} bind:modifiers={columnModifiers} {saved}/>
              </div>
              <div on:click={appendNew} 
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
