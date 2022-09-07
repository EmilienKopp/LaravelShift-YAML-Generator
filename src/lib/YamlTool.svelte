<script>
import MenuButton from "./MenuButton.svelte";
import Modal from "./Modal.svelte";
import { resource, YAML} from "./stores";
import { objectDownload } from "../tools/js-download.js";

let showing;

const downloadYaml = () => {
  objectDownload($YAML, $resource.name,"yaml");
};


</script>

<MenuButton on:click={ () => {showing = !showing; console.log($resource);}}>
        <i class="bi bi-braces"></i>
</MenuButton>
<Modal  {showing}
        title="YAML" 
        on:toggle={ () => {showing = ! showing}}>

    <pre class="bg-slate-800 text-white text-left p-3"><!--
    --><code><!--
    -->{$YAML}<!--
    --></code><!--
    --></pre>

        <MenuButton on:click={downloadYaml}><i class="bi bi-cloud-arrow-down"></i></MenuButton>
      
    
</Modal>

<style>

</style>