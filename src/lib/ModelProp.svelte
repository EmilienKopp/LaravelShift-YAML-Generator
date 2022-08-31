<script>
import { prevent_default } from 'svelte/internal';

import {transferObject} from './stores';

    function dragstartHandler(event) {
      event.currentTarget.classList.add('dragging');
      let clone = event.target.cloneNode(true);
      clone.querySelector('select').value = selected;
      $transferObject = clone;
    }
  
    function dragendHandler(event) {
      event.currentTarget.classList.add('dragged');
      
    }

    function handleButtonCheck(event) {

        event.target.style = 'background: blue';
    }

    function selectAll(event) {
        event.target.innerText.setSelectionRange(0,event.target.value.length);
    }

    let value;
    let size;
    let selected;
    let inputVisible = false;
    let dataTypes = [
        'int',
        'string',
        'text'
    ];
    let toggableProperties = [
        'nullable',
        'unique',
        'required',
        'password',
        'url',
    ]
  </script>
  
  <div class="draggable model-prop" draggable="true" on:dragstart="{dragstartHandler}" on:dragend="{dragendHandler}" on:drop="{()=>prevent_default()}">
    <p class='draggable-title'>Model</p>

    <select class="form-select form-select-sm model-select" bind:value={selected} on:change={(e)=> {selected = e.currentTarget.value} }>
        {#each dataTypes as dataType}
            <option value={dataType} >{dataType}</option>
        {/each}
    </select>
    {#each toggableProperties as prop}
    <div class="form-check form-switch" id={"check-group-" + prop}>
        <input class="form-check-input" type="checkbox" role="switch" id="{prop + "-switch" }"/>
        <label class="form-check-label" for="{prop + "-switch" }">{prop}</label>
    </div>
    {/each}
    <input type="hidden" class="model-prop-textinput field-name" placeholder="fieldName" bind:value on:click="{selectAll}" />
    <input type="hidden" class="model-prop-textinput" placeholder="size" bind:value={size} on:click="{selectAll}" />
  </div>
  
  
  <style>
        .model-prop-minibutton {
            border-radius: 50%;
            border: dashed 1px #ddd;
            width:35px;
            height:35px;
            padding: 0;
        }

        .dragging {
            border: dashed 0.2rem;
            border-radius: 2%;
        }

        .dragged {
            border: none;
        }

        .draggable-title {
            grid-column: 1 / span 2;
        }

        .model-select {
            grid-column: 3 / span 2;
        }

        .field-name {
            grid-column: 1 / span 2;
            grid-row: 1 / 1;
        }

        .model-prop {
            padding: 0.5rem;
            box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
            font-size: x-small;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            font-size: x-small;
        }

        .model-prop select {
            margin-right: 0.5rem;
        }


  </style>