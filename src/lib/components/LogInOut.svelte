<script>
import MenuButton from "./MenuButton.svelte";
import { createEventDispatcher } from "svelte";

const dispatch = createEventDispatcher();

const signOut = () => {
    dispatch('signOut');
    console.log('Emitted SignOut event');
}

</script>



<MenuButton>
    <i class="bi bi-box-arrow-in-right"></i>
</MenuButton>

<MenuButton color="red" on:click={ signOut }>
    <i class="bi bi-box-arrow-left"></i>
</MenuButton>
