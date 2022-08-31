<script>
import DraggableText from './lib/DraggableText.svelte';
import Receiver from './lib/Receiver.svelte'
import ModelProp from './lib/ModelProp.svelte';
</script>

<main>
  <div class="header">
    <h1>Laravel Blueprint Generator</h1>
  </div>
  
  <div class="content">
    <div class="receivers-wrapper card">
      <div class="receivers">
        <Receiver />
      </div>
    </div>
    <div class="draggables">
      <ModelProp/>
    </div>

  </div>
  <div class="footer">
    <p>
      Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank">SvelteKit</a>, the official Svelte app framework powered by Vite!
    </p>

    <p class="read-the-docs">
      Click on the Vite and Svelte logos to learn more
    </p>
  </div>

</main>

<style>
  .receivers-wrapper {
    overflow:auto;
    width: fit-content;

  }

  .read-the-docs {
    color: #888;
  }
</style>
