<svelte:options accessors={true}/>
<script>
import { CONFIG, attributePropertiesStore, columns, modelData, resource, DATA_TYPES, MODIFIERS, disabledColumns, YAML, } from '../stores';
import {nanoid} from 'nanoid';
import PropCheckbox from './PropCheckbox.svelte';
import { createEventDispatcher } from 'svelte';
import { fly, fade } from 'svelte/transition';
import { onMount, onDestroy } from 'svelte';
import Tooltip from './Tooltip.svelte';
import ModifierInput from './ModifierInput.svelte';
import { makeUUID } from '../tools/toolbox';
import { dump } from 'js-yaml';
    
    export let UUID = null;
    export let name = null;
    export let type = null;
    export let modifiers = [];
    export let size = null;
    export let precision = null;
    export let scale = null;
    export let extraModifiers = [];
    export let saved = null;
    export let disabled = false;
    

    let refs = [];

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


    onMount( () => {
        UUID = nanoid(6).replace('-','X');
    });

    onDestroy(
        () => {
            console.log('destroyed: ', UUID);
            $columns =  $columns.filter( c => c.UUID !== UUID);
            delete $modelData[$resource.name][name];
            console.log($modelData);
            if($columns.length <= 1) {
                columns.update( proxies => []);
                console.log('all proxies destroyed');
            }
            console.log('modelFields: ', $columns);
            dispatch('destroyed', {UUID});
        }
    );

    function updateSelf() {
        console.log(refs);
        refs.forEach( ref => {
            switch (ref.name) {
                case 'precision':
                    precision = ref.value;
                    break;
                case 'scale':
                    scale = ref.value;
                    break;
                case 'size':
                    size = ref.value;
                    break;
                default:
                    break;
            }
        });
        console.log(`precision: ${precision}, scale: ${scale}, size: ${size}`);
    }

    function resetNumericalValues () {
        size = precision, scale = null;
    }

    function remove() {
        console.log('remove()','UUID',UUID,'columns',$columns);
        if(!confirm('削除してしまいます。復元ができませんが、よろしいですか。')) return;
        $columns = $columns.filter( c => c.UUID !== UUID);
    }
  
    function refresh() {
        saved = new Date();
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
    }

    function showMoreProps() {
        let newID = makeUUID();
        let newModifier = {
            modifierID: newID,
            columnUUID: UUID,
            label: null,
            type: null,
            value: null,
            option: null,
        };
        extraModifiers = [...extraModifiers, newModifier];
        modifiers.push(newModifier);
    }

    function toggleDisabled() {
        disabled = !disabled;
        console.log('toggleDisabled() called');
        console.log('columns', $columns);
        if(disabled) {
            let transferElement = $columns.find(element => element.UUID == UUID);
            if (transferElement) {
                $disabledColumns = [...$disabledColumns, transferElement];
            }
            delete $modelData[$resource.name][name];
        } else {
            $disabledColumns = $disabledColumns.filter(element => element.UUID !== UUID);
            saved = new Date();
        }
        $YAML = dump($modelData);
    }


$ : console.log('extraModifiers',extraModifiers);
$ : {
    modifiers.concat(extraModifiers);
}

</script>

<!-- DISABLE BUTTON -->
<div transition:fade={ {delay:500, duration:500} } class="z-50 relative top-3 flex justify-end">
<button class="{disabled ? 'bg-lime-600' : 'bg-yellow-300'}  text-black rounded-3xl h-6 w-6" 
on:click={toggleDisabled}>
    <i class="bi bi-eye{disabled ? '' : '-slash'}-fill"></i>
</button>
</div>

<!-- CHECK MARK -->
{#if !disabled}
<div class="relative top-4 -left-3 -mt-7 font-bold text-xl text-green-600">
    <i class="bi bi-check-circle-fill"></i>
</div>
{/if}

<!-- MAIN COMPONENT BODY -->
<div id="{UUID}"
    class="{propertyClass} mb-3 p-2 { !disabled ? savedClass : unsavedClass} {disabled ? 'grayscale' : ''} bg-slate-900 text-darkish border-darkish border-2 rounded-md w-full grid gap-2" 
    in:fly={ {duration: 500, x: -500} }
    out:fade={ {delay: 500, duration: 550} }  >

    <!-- NAME & TYPE -->
    <input id="{nameInput+"-"+UUID}" type="text" 
        class=" field-name-input col-span-2 rounded-sm p-1" size="16" placeholder="fieldName" bind:value={name} {disabled}/>
    
    
    <select id="{dataTypeInput+"-"+UUID}" class="col-span-2 border-1 text-sm" 
            bind:value={type} on:change={resetNumericalValues}
            bind:this={selectElement} {disabled}>

        {#each $DATA_TYPES as dataType}
            <option value={dataType.type} >{dataType.type}</option>
        {/each}

    </select>

    <!-- SIZE (if relevant) -->
    {#if type  && $DATA_TYPES.find(dt => dt.type == type).parameters !== undefined } 
        {#each $DATA_TYPES.find(dt => dt.type == type).parameters as parameter, index}
            <input type="text" size="4" name="{parameter.name}"
            class=" rounded-sm p-1 text-xs" placeholder="{parameter.name}"
            bind:this={refs[index]} on:change={updateSelf} {disabled}/>
        {/each}
    {/if}

    <!-- COMMON MODIFIERS (nullable, unique, ...) -->
    <div class="col-span-7 col-start-1 grid grid-cols-7">
        {#each commonModifiers as prop}
        <PropCheckbox {UUID}
                on:togglecheck={ toggleOptionHandler }
                label={prop.label}
                checked={ (modifiers.find(c => c.label === prop.label) !== undefined) }
                icon={prop.icon} {disabled}/>
        {/each}
        
        <!-- REFRESH BUTTON -->
        <Tooltip label="更新">
            <button on:click={refresh} {disabled}
                    class="menu-icon h-6 w-6 text-sm m-0 text-darkish"><i class="bi bi-arrow-clockwise" ></i></button>
        </Tooltip>

        <!-- DELETE BUTTON -->
        <Tooltip label="削除">
            <button on:click={remove} {disabled}
                    class="menu-icon h-6 w-6 text-sm hover:bg-red-500 bg-orange-500 m-0 text-darkish"><i class="bi bi-trash"></i></button>
        </Tooltip>
    </div>

    
    <div class="col-span-7 col-start-1 grid grid-cols-7">
        {#if extraModifiers.length > 0 }
        <div id="extra-modifiers" class="col-span-6 grid grid-cols-7">
            {#each extraModifiers as modifier}
                <div class="col-start-1 items-center">
                    <Tooltip label="外す">
                        <button on:click={() => { extraModifiers = extraModifiers.filter( m => m.modifierID !== modifier.modifierID) } }
                                {disabled}
                                class="menu-icon h-6 w-6 text-sm hover:bg-orange-500 bg-yellow-500 m-0 text-darkish">
                                <i class="bi bi-x"></i>
                        </button>
                    </Tooltip>
                </div>
                <ModifierInput  {...modifier} bind:selected={modifier.label} 
                                bind:value={modifier.value} bind:option={modifier.option}/>
            {/each}
        </div>
        {/if}
        <!-- ADD NEW MODIFIER BUTTON -->
        <button on:click={showMoreProps} {disabled} 
            class="menu-icon h-6 w-6 col-start-7 place-self-end"><i class="bi bi-plus text-lg"></i> </button>
    </div>
</div>
