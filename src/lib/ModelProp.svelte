<script>
import { prevent_default } from 'svelte/internal';
import {transferObject, DRAGGABLE_CONFIG} from './stores';
import {nanoid} from 'nanoid';

    function dragstartHandler(event) {
      event.currentTarget.classList.add('dragging');
      let clone = event.target.cloneNode(true);
      clone.querySelector('select').value = selected;
      $transferObject = clone;
      event.currentTarget.id = idBase + '-' + nanoid(6).replace('-','X');
    }
  
    function dragendHandler(event) {
      event.currentTarget.classList.add('dragged');
      
    }

    function handleEdit() {
    
    }

    const idBase = $DRAGGABLE_CONFIG.models.idFormat;
    const propertyClass = $DRAGGABLE_CONFIG.models.propertyClass
    const nameInput = $DRAGGABLE_CONFIG.models.inputNames.name;
    const sizeInput = $DRAGGABLE_CONFIG.models.inputNames.size;
    const dataTypeInput = $DRAGGABLE_CONFIG.models.inputNames.dataType;
    const UUID = nanoid(6).replace('-','X');
    const dataTypes = [
        'int',
        'string',
        'text'
    ];
    const toggableProperties = [
        'nullable',
        'unique',
        'required',
        'password',
        'url',
    ]

    let propName;
    let size;
    let selected;

    console.log(UUID);
  </script>
  
  <div id="{idBase + '-' + UUID}" class="draggable {propertyClass}" draggable="true" on:dragstart="{dragstartHandler}" on:dragend="{dragendHandler}" on:drop="{()=>prevent_default()}">
    <input id="{nameInput+"-"+UUID}" type="text" class="{idBase}-textinput field-name-input" size="16" placeholder="fieldName" bind:value={propName} />
    <select id="{dataTypeInput+"-"+UUID}" class="form-select form-select-sm model-select" bind:value={selected} on:change={(e)=> {selected = e.currentTarget.value} }>
        {#each dataTypes as dataType}
            <option value={dataType} >{dataType}</option>
        {/each}
    </select>
    {#each toggableProperties as prop}
    <div class="form-check form-switch switch-wrapper" id={"check-group-" + prop + '-' + UUID}>
        <input class="form-check-input" type="checkbox" role="switch" id="{prop + "-switch-" + UUID }" name="{prop}"/>
        <label class="form-check-label" for="{prop + "-switch-" + UUID }">{prop}</label>
    </div>
    {/each}
    <input id="{sizeInput+"-"+UUID}" type="text" class="{idBase}-textinput field-size-input" placeholder="size" bind:value={size} />
  </div>
  
  
  <style>

        .model-prop {
            max-width:500px;
        }
        .dragging {
            border: dashed 0.2rem;
            border-radius: 2%;
        }

        .dragged {
            border: none;
        }

        .model-select {
            grid-column: 4;
        }

        .field-name-input {
            grid-column: 1 / span 2;
            grid-row: 1 / 1;
        }

        .field-size-input {
            grid-column: 3;
            grid-row: 1;
        }

        .model-prop {
            padding: 0.5rem;
            display: grid;
            grid-template-columns: repeat(4, 90px);
            grid-template-rows: 1fr 1fr 1fr;
        }

        .model-prop select {
            margin-right: 0.5rem;
        }

        .form-check-label {
            text-align: left;
        }


  </style>