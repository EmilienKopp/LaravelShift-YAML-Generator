<script>
import { transferObject } from './stores';


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
    let inputs = $transferObject.querySelectorAll('.model-prop-textinput')
    inputs.forEach( (elem) => {
      elem.type = 'text';
      elem.classList.add(['stored-input'])
    });
    // @ts-ignore
    if($transferObject.querySelector('.draggable-title')) $transferObject.querySelector('.draggable-title').remove();
    // @ts-ignore
    $transferObject.classList.add(['flex-row','stored-model-prop']);
    // @ts-ignore
    event.target.appendChild($transferObject);
    inputs[0].focus();
  }

</script>


<div class="card p-0 receiver"  on:dragover|preventDefault="{dragoverHandler}" 
                            on:drop|preventDefault="{dropHandler}"
                            on:dragenter|stopPropagation="{dragenterHandler}"
                            on:dragleave|stopPropagation="{dragleaveHandler}">
  Drag into me

</div>


<style>
  .stored-model-prop {
    /* display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-template-areas: 
      "header header header header"
      "switches switches switches switches"
      "text text" */
  }

  

  .stored-input-group {

  }

  .stored-checkbox {
    
  }

  .receiver {
    border: 1px solid black;
    border-radius: 2%;
    min-height: 100%;
  }

</style>