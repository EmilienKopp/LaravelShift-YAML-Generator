<script>
import { claim_svg_element } from "svelte/internal";

    import { resource } from "../stores.js";

    let ModelName;
    let guest = true;

    $ : $resource.name = ModelName;
</script>



<!-- /** HEADER **/-->
<div id="header" class="flex h-12 max-h-12 items-center gap-5 py-2 px-5 border-b border-darkish">
    <div class="-ml-2 flex items-center text-sm">
        BlueprintFactory
    </div>
    <input bind:value="{ModelName}" on:change={ () => { console.log($resource)} }  name="ModelName" class="animate-pulse p-2 w-60 h-9 bg-black border-darkish border-2 text-slate-400" placeholder="Type your model name here"/>
</div>