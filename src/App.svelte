<script>
import { resource, menuRightmost, modelProxies, YAML, modelData } from './lib/stores';
import Receiver from './lib/Receiver.svelte'
import ModelProp from './lib/ModelProp.svelte';
import IndexAction from './lib/IndexAction.svelte';
import StoreAction from './lib/StoreAction.svelte';
import YamlTool from './lib/YamlTool.svelte';
import HelpTool from './lib/HelpTool.svelte';
import { dump } from 'js-yaml';
import { onMount } from 'svelte';

export let ModelName = '';

onMount( () => {
  modelData.set({ [ModelName]: {} });
  YAML.set(dump($modelData));
}) 

function updateResource () {
  console.log('modelData at updateResource() call: ', $modelData);
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

function addToList(e) {
  console.warn('event received by addToList: ', e);
  console.log('modelData:',$modelData);
  console.log(columnName, columnType, columnSize, columnModifiers);
  let clone = new ModelProp({
    props: {
      UUID: columnUUID,
      name: columnName,
      type: columnType,
      size: columnSize,
      modifiers: columnModifiers,
      received: true,
    },
    target: document.querySelector('#receiver'),
    intro: true,
  });
  clone.$on('remove', () => {
    console.warn('remove event received by cloned ModelProp');
    clone.$destroy();
  });
  clone.$on('destroyed', () => {
    console.warn('data destroyed');
    updateResource();
  });
  modelProxies.set([...$modelProxies, clone]);
  console.log(clone.UUID,'added to', $modelProxies);
  let modifiersString = columnModifiers.map(c => c.label).join(' ');
  console.log('modifiersString: ', modifiersString);

  // $modelData[ModelName].push({
  //   [columnName] : `${columnType}:${columnSize} ${modifiersString}`
  // });
  let typeSize = columnType + (columnSize ? `:${columnSize}` : '');
  $modelData[ModelName] = {...$modelData[ModelName], [columnName] : `${typeSize} ${modifiersString}`};
  YAML.set(dump($modelData));
  console.log('yaml:',$YAML);
}

let columnUUID, columnName, columnType, columnSize, columnModifiers;

</script>

<main class="flex min-h-full">
  <div class="header absolute top-0 left-0 w-screen bg-cyan-300 rounded-b-lg p-1 flex flex-row shadow-sm z-40">
      <div id="buttons-div" class="flex flex-row"
      on:mouseenter="{saveMenuWidth}">
        <YamlTool/>
        <HelpTool/>
      </div>
    <h1 class="font-mono text-blue-700 ml-40" >ShiftGen - Resource: {$resource.name}</h1>
  </div>
  
  <div id="content" class="absolute top-16 left-0 h-5/6 p-4 flex justify-between w-5/6">
    <div id="receivers-wrapper" class="border-2 min-h-full">
      <input type="text" class="form-control" id="resource-name-input" placeholder="モデル名を入力" 
      bind:value="{ModelName}"
      on:input="{updateResource}"/>
      <div id="receivers" class="h-full w-96">
        <Receiver />
      </div>
    </div>
    <div id="draggables" class="flex flex-col w-full ml-16">
      <ModelProp  on:add={addToList}
                  bind:name={columnName} bind:type={columnType} bind:size={columnSize} bind:modifiers={columnModifiers} />
      <IndexAction/>
      <StoreAction/>
    </div>

  </div>


</main>

<style>

</style>
