<svelte:options accessors={true}/>
<script>
import { CONFIG, attributePropertiesStore, modelProxies, modelData, resource, DATA_TYPES, MODIFIERS} from '../stores';
import {nanoid} from 'nanoid';
import PropCheckbox from './PropCheckbox.svelte';
import { createEventDispatcher } from 'svelte';
import { fly } from 'svelte/transition';
import { onDestroy } from 'svelte';
import Tooltip from './Tooltip.svelte';
import ModifierInput from './ModifierInput.svelte';
import { makeUUID } from '../tools/toolbox';
    
    export let UUID = nanoid(6).replace('-','X');
    export let name = null;
    export let type = null;
    export let modifiers = [];
    export let size = null;
    export let precisions = null;
    export let scale = null;
    export let extraModifiers = [];
    export let saved = false;

    const dispatch = createEventDispatcher();
    const idBase = $CONFIG.models.idFormat;
    const propertyClass = $CONFIG.models.propertyClass
    const nameInput = $CONFIG.models.inputNames.name;
    const sizeInput = $CONFIG.models.inputNames.size;
    const dataTypeInput = $CONFIG.models.inputNames.dataType;
    const commonModifiers = $MODIFIERS.filter( m => m.common === true); 


    let savedClass = "border-2 border-green-500 grid-cols-7";
    let unsavedClass = "grid-cols-7";
    let selectElement;
    let disabled = true;

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

    function showMoreProps() {
        let newUUID = UUID+'_'+makeUUID();
        extraModifiers = [...extraModifiers, newUUID];
        console.log(extraModifiers);
    }
  </script>


    {#if saved}
    <div class="relative top-4 -left-3 -mt-7 font-bold text-xl text-green-600">
        <i class="bi bi-check-circle-fill"></i>
    </div>
    {/if}
  <div id="{UUID}"
    class="{propertyClass} mb-3 p-2 { saved ? savedClass : unsavedClass} bg-slate-900 text-darkish border-darkish border-2 rounded-md w-full grid gap-2" 
    draggable="true"
    transition:fly={ {duration: 500, x: -500} }>

    <!-- NAME & TYPE -->
    <input id="{nameInput+"-"+UUID}" type="text" 
        class="{idBase}-textinput field-name-input col-span-2 rounded-sm p-1" size="16" placeholder="fieldName" bind:value={name} />
    
    
    <select id="{dataTypeInput+"-"+UUID}" class="col-span-2 border-1 text-sm" 
            bind:value={type}
            on:change={ () => { disabled = $DATA_TYPES.find(dt => dt.type == type).parameters == undefined }}
            bind:this={selectElement}>

        {#each $DATA_TYPES as dataType}
            <option value={dataType.type} >{dataType.type}</option>
        {/each}

    </select>

    <!-- SIZE (if relevant) -->
    {#if type  && $DATA_TYPES.find(dt => dt.type == type).parameters !== undefined } 
        {#each $DATA_TYPES.find(dt => dt.type == type).parameters as parameter}
            <input id="{sizeInput+"-"+UUID}" type="text" size="4"
            class="{idBase}-textinput rounded-sm p-1 text-xs" placeholder="{parameter.name}"
            {disabled}
            bind:value={size} />
        {/each}
    {/if}

    <!-- COMMON MODIFIERS (nullable, unique, ...) -->
    <div class="col-span-7 col-start-1 grid grid-cols-7">
        {#each commonModifiers as prop}
        <PropCheckbox {UUID}
                on:togglecheck={ toggleOptionHandler }
                label={prop.label}
                checked={ (modifiers.find(c => c.label === prop.label) !== undefined) }
                icon={prop.icon}/>
        {/each}
        <Tooltip label="外す">
            <button on:click={remove}
                    class="menu-icon h-6 w-6 text-sm hover:bg-orange-500 bg-yellow-500 m-0 text-darkish"><i class="bi bi-x"></i></button>
        </Tooltip>
        <!-- DELETE BUTTON -->
        <Tooltip label="削除">
            <button on:click={remove}
                    class="menu-icon h-6 w-6 text-sm hover:bg-red-500 bg-orange-500 m-0 text-darkish"><i class="bi bi-trash"></i></button>
        </Tooltip>
    </div>

    
    <div class="col-span-7 col-start-1 grid grid-cols-7">
        <!-- ADD NEW MODIFIER BUTTON -->
        <Tooltip label="追加" >
            <button on:click={showMoreProps} 
                class="menu-icon h-6 w-6"><i class="bi bi-plus text-lg"></i> </button>
        </Tooltip>

        {#if extraModifiers.length > 0 }
        <div id="extra-modifiers" class="relative">
            {#each extraModifiers as uuid}
                <ModifierInput UUID={uuid} />
            {/each}
        </div>
        {/if}
    </div>
</div>
