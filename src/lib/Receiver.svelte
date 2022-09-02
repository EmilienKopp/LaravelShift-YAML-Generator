<script>
import { transferObject, DRAGGABLE_CONFIG, resource } from './stores';
import {nanoid} from 'nanoid';

  function dragoverHandler(event) {
    // console.log(event);\
  }

  function dragenterHandler(event) {
    event.target.style = 'background-color: lightblue';
  }

  function dragleaveHandler(event) {
    event.target.style = '';
  }

  function dropHandler(event) {
    console.log('Transfered Object', $transferObject);
    event.target.style = '';
    console.log(event.currentTarget.classList);

    // ignore errors in Editor since the parser doesn't know that the writable{} is an HTML Element object
    // @ts-ignore
    event.target.appendChild($transferObject);
    // @ts-ignore
    $resource.updateFrom($transferObject,$DRAGGABLE_CONFIG);

    console.log('Current State of Resource:', $resource);
  }



</script>


<div class="card p-0 receiver"  on:dragover|preventDefault="{dragoverHandler}" 
                            on:drop|preventDefault="{dropHandler}"
                            on:dragenter|stopPropagation="{dragenterHandler}"
                            on:dragleave|stopPropagation="{dragleaveHandler}">
  Drag into me

</div>


<style>
  .receiver {
    border: 1px solid black;
    border-radius: 2%;
    min-height: 100%;
  }

</style>