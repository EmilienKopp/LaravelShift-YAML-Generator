<script>
import { resource } from './lib/stores';
import Receiver from './lib/Receiver.svelte'
import ModelProp from './lib/ModelProp.svelte';
import IndexAction from './lib/IndexAction.svelte';
import StoreAction from './lib/StoreAction.svelte';
import CurrentStatus from './lib/CurrentStatus.svelte';

export let ModelName = '';

function updateResourceName () {
  $resource.name = ModelName;
}

</script>

<main>
  <div class="header">
    <CurrentStatus/>
    <h1>ShiftGen - Resource: {ModelName}</h1>
  </div>
  
  <div class="content">
    <div class="receivers-wrapper card">
      <input type="text" class="form-control" id="resource-name-input" placeholder="モデル名を入力" 
      bind:value="{ModelName}"
      on:input="{updateResourceName}"/>
      <div class="receivers">
        <Receiver />
      </div>
    </div>
    <div class="draggables">
      <ModelProp/>
      <IndexAction/>
      <StoreAction/>
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
  }

  .read-the-docs {
    color: #888;
  }
</style>
