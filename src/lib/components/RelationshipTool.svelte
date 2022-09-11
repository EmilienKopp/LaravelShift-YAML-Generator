<script>
    import MenuButton from "./MenuButton.svelte";
    import Modal from "./Modal.svelte";
    import { resource } from "../stores";
    import Tooltip from "./Tooltip.svelte";
    
    let showing;

    // $ : $resource.relationships = [
    //     {name:"hasMany", value: hasMany},
    //     {name:"hasOne", value: hasOne},
    //     {name: "belongsTo",value: belongsTo},
    //     {name: "belongsToMany", value: belongsToMany}
    // ];

</script>
    
<div>
    <Tooltip label="Relationships" >
        <MenuButton on:click={ () => {showing = !showing; console.log($resource);}}>
            <i class="bi bi-node-plus-fill"></i>
        </MenuButton>
    </Tooltip>
    
    <Modal  {showing}
            title="Relationships" 
            on:toggle={ () => {showing = ! showing}}>
        <div class="flex flex-col">
           {#each $resource.relationships as relationship }
           <label for="{relationship.name}">{relationship.name}</label>
           <input type="text" bind:value={relationship.value} />
           {/each}
        </div>
    </Modal>
</div>


<style>

</style>