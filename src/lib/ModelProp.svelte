<svelte:options accessors={true}/>
<script>
import { DRAGGABLE_CONFIG, toggableProperties, attributePropertiesStore, modelProxies, modelData, resource} from './stores';
import {nanoid} from 'nanoid';
import PropCheckbox from './PropCheckbox.svelte';
import { createEventDispatcher } from 'svelte';
import { fly } from 'svelte/transition';
import { onDestroy } from 'svelte';
    
    export let UUID = nanoid(6).replace('-','X');
    export let name = null;
    export let type = null;
    export let modifiers = [];
    export let size = null;
    export let received = false;
    
    const dispatch = createEventDispatcher();

    let selectElement;

    onDestroy(
        () => {
            console.log('destroyed: ', UUID);
            modelProxies.update( proxies => proxies.filter( proxy => proxy.UUID !== UUID));
            delete $modelData[$resource.name][name];
            console.log($modelData);
            if($modelProxies.length <= 1) {
                modelProxies.update( proxies => []);
                console.log('all proxies destroyed');
            }
            console.log('modelFields: ', $modelProxies);
            dispatch('destroyed', {UUID});
        }
    );



    function add () {
        // Check if the type is null and prevent the event dispatch if it is
        if(type === null) {
            alert('Please select a type');
            selectElement.focus();
            return;
        }
        dispatch('add', {name: name, type: type, size: size, modifiers: modifiers});
        console.warn('dispatched add event');
    }

    function addBelow () {
        dispatch('addBelow', {name: name, type: type, size: size, modifiers: modifiers});
        console.warn('dispatched add event');
    }

    function remove() {
        dispatch('remove', {UUID: UUID});
        console.warn('dispatched remove event');
    }
  
    function handleEdit() {
        // TODO: handle update of the resource properties after dragging in the Receiver
    }

    function toggleOptionHandler (event) {
        let constraintExists = ($attributePropertiesStore.find(c => c.label === event.detail.label) !== undefined);
        if(event.detail.checked && !constraintExists) {
                attributePropertiesStore.set([...$attributePropertiesStore, {...event.detail}]);
                modifiers.push({label: event.detail.label,checked: event.detail.checked});
        } else {
                attributePropertiesStore.set($attributePropertiesStore.filter(c => c.label !== event.detail.label));
                modifiers = modifiers.filter(c => c.label !== event.detail.label);
        }
        console.log('attributePropertiesStore', $attributePropertiesStore);
        console.log('modifiers', modifiers);
    }

    const idBase = $DRAGGABLE_CONFIG.models.idFormat;
    const propertyClass = $DRAGGABLE_CONFIG.models.propertyClass
    const nameInput = $DRAGGABLE_CONFIG.models.inputNames.name;
    const sizeInput = $DRAGGABLE_CONFIG.models.inputNames.size;
    const dataTypeInput = $DRAGGABLE_CONFIG.models.inputNames.dataType;
    const dataTypes = [
        'int',
        'string',
        'text'
    ];

    const properties = $toggableProperties; 

    let dragging;
    console.log(properties);
  </script>
  
  <div id="{UUID}"
    class="{dragging ? 'dragging' : ''} {propertyClass} p-2 bg-orange-100 shadow-orange-100 w-full shadow-md grid grid-cols-6 grid-rows-2 gap-2" 
    draggable="true"
    transition:fly={ {duration: 500, x: 500} }>

    {#if !received}
    <button on:click={add}
            class="row-span-2 col-span-1 bg-orange-200 text-orange-800 font-bold text-3xl rounded-lg shadow-sm" >
        <i class="bi bi-box-arrow-in-left"></i>
    </button>
    {:else}
    <button on:click={remove}
            class="row-span-2 col-span-1 bg-orange-200 text-orange-800 font-bold text-3xl rounded-lg shadow-sm" >
        <i class="bi bi-trash-fill"></i>
    </button>
    {/if}
    
    <input id="{nameInput+"-"+UUID}" type="text" 
        class="{idBase}-textinput field-name-input col-span-2" size="16" placeholder="fieldName" bind:value={name} />
    <select id="{dataTypeInput+"-"+UUID}" class="form-select form-select-sm model-select col-span-2 border-1" 
            bind:value={type}
            bind:this={selectElement}>

        {#each dataTypes as dataType}
            <option value={dataType} >{dataType}</option>
        {/each}

    </select>

    <input id="{sizeInput+"-"+UUID}" type="text" class="{idBase}-textinput field-size-input" placeholder="size" bind:value={size} />

    {#each properties as prop}
    <div class="flex flex-col justify-center" id={"check-group-" + prop.label + '-' + UUID} >

        <PropCheckbox {UUID}
            on:togglecheck={ toggleOptionHandler }
            label={prop.label}
            checked={ (modifiers.find(c => c.label === prop.label) !== undefined) }
            icon={prop.icon}/>
        <!-- <input class="form-check-input" type="checkbox" role="switch" id="{prop + "-switch-" + UUID }" name="{prop}"/>
        <label class="form-check-label text-xs" for="{prop + "-switch-" + UUID }">{prop}</label> -->
    </div>
    {/each}

</div>



  
  <style>

  </style>