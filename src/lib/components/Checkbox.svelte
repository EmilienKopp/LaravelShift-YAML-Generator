<script>
    export let checked = false;
    export let label = '';
    export let name = '';
    export let reversed = false
</script>

<div class="flex flex-row">
{#if reversed && label}
<label for="resource-controller">
    Resource
</label>
{/if}

<input bind:checked={checked} 
        type="checkbox" 
        class="grid place-content-center text-darkish font-bold text-3xl mx-2 appearance-none w-6 h-6 {checked ? 'bg-green-400 after:content-[\'_✓\']' : 'bg-white'}" 
        {name} />

{#if !reversed && label}
<label for="{name}">
    Resource
</label>
{/if}
</div>