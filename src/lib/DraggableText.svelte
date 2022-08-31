<script>
    let count = 0
    const increment = () => {
      count += 1
    }
  
    function dragstartHandler(event) {
      console.log('dragStart');
      event.currentTarget.style.border = 'dashed';
      event.dataTransfer.setData("text", event.target.innerText);
      event.effectAllowed = "copyMove";
    }
  
    function dragendHandler(event) {
      console.log('dragEnd');
      event.currentTarget.style.border = 'none';
    }

  
  </script>
  
  <button class="draggable" draggable="true" on:dragstart="{dragstartHandler}" on:dragend="{dragendHandler}">
    DRAG ME
  </button>
  
  
  <style>

  
  </style>