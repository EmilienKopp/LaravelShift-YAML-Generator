<script>
    import { resource } from "../stores";
</script>

<div id="relationships-display" class="text-sm grid grid-cols-2 col-span-2 gap-2">
    {#each $resource.relationships as relationship }
      {#if relationship.value}
      <div class="mx-2">
        <span>{relationship.name}</span>:  
        <div contenteditable="true" class="border-2 border-darkish p-1" bind:textContent={relationship.value}></div>
      </div>
      {/if}
    {/each}
  </div>