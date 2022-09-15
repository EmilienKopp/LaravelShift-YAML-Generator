<script>
    import { STATEMENTS, QUERY_TYPES} from '../stores';
    import Checkbox from './Checkbox.svelte';

    export let statement;
    export let disabled;

    let statementParams = $STATEMENTS.find(s => s.name == statement).params;
    let optionTypes = $STATEMENTS.find(s => s.name == statement).options;

    let value;
    let options;
    
</script>


<div class="flex flex-row gap-2">
    <span>{statement}</span>
    {#each statementParams as inputField}
        {#if statement == 'query'}
            <select bind:value={value} class="rounded-md text-darkish my-1 h-8" {disabled}>
            {#each $QUERY_TYPES as queryType }
                <option value={queryType}>{queryType}</option>
            {/each}
            </select>
        {:else}
            <input placeholder={inputField} type="text" bind:value={value} {disabled}/>
        {/if}
    {/each}
</div>