<script>
import MenuButton from "./MenuButton.svelte";
import Modal from "./Modal.svelte";
import PropCheckbox from "./PropCheckbox.svelte";
import { MODIFIERS } from "../stores";
import Tooltip from "./Tooltip.svelte";

let showing;
let properties = $MODIFIERS.filter(m => m.common);

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
        <h4 class="text-blue-400">Modifiers</h4>
        <div class="grid grid-cols-2 gap-2 border-2 border-blue-100 rounded-md p-2 w-fit mb-3">
            {#each properties as prop}

                    <PropCheckbox disabled={true} label={prop.label}
                        checked={properties.find(p => p.label == prop.label).checked} 
                        icon={prop.icon}/> <span>: {prop.label}</span>
            {/each}
        </div>

        <h4 class="text-green-300">Tools</h4>
        <div class="grid grid-cols-7 gap-2 border-2 border-green-100 rounded-md p-2 w-fit mb-3">
            <div>
                <Tooltip label="追加">
                    <button disabled class="menu-icon h-6 w-6"><i class="bi bi-plus text-lg"></i></button>
                </Tooltip> 
            </div> <span class="col-span-6">: Modifier を追加</span>
            <div>
                <Tooltip label="更新">
                    <button disabled
                            class="menu-icon h-6 w-6 text-sm m-0 text-darkish"><i class="bi bi-arrow-clockwise" ></i></button>
                </Tooltip>
            </div> <span class="col-span-6">: Columnの情報をYAMLに手動的に反映する</span>
            <div>
                <Tooltip label="削除">
                    <button disabled
                            class="menu-icon h-6 w-6 text-sm hover:bg-red-500 bg-orange-500 m-0 text-darkish"><i class="bi bi-trash"></i></button>
                </Tooltip>
            </div> <span class="col-span-6">: Columnを完全に削除する</span>
            <div>
                <Tooltip label="外す">
                    <button class="bg-yellow-300 text-black rounded-3xl h-6 w-6" disabled>
                        <i class="bi bi-eye-slash-fill"></i>
                    </button>
                </Tooltip>
            </div> <span class="col-span-6">: Columnを一時的にModelから外す</span>
            <div>
                <Tooltip label="戻す">
                    <button class="bg-lime-600 text-black rounded-3xl h-6 w-6" disabled>
                        <i class="bi bi-eye-slash-fill"></i>
                    </button>
                </Tooltip>
            </div> <span class="col-span-6">: Columnを一時的にModelから外す</span>
        </div>
</Modal>

<style>

</style>