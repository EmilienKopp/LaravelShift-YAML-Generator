<script>
import MenuButton from "./MenuButton.svelte";
import Modal from "./Modal.svelte";
import PropCheckbox from "./PropCheckbox.svelte";
import {toggableProperties} from "../stores";

let showing;
let properties = $toggableProperties;

function handleClick () {
    showing = !showing;
}
</script>

<MenuButton
        on:click={ handleClick }>
        <i class="bi bi-question-circle"></i>
</MenuButton>
<Modal  {showing}
        title="Help" 
        on:toggle={ () => {showing = ! showing }}>
{#each properties as prop}
    <p>
        <PropCheckbox
            disabled={true}
            label={prop.label}
            checked={properties.find(p => p.label == prop.label).checked} 
            icon={prop.icon}/>
        : {prop.label}
    </p>
{/each}
</Modal>

<style>

</style>