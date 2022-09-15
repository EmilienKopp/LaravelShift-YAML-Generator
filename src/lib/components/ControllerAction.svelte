<script>
import { makeUUID } from '../tools/toolbox.js';
import { CONFIG, resource, STATEMENTS, COMMON_ACTIONS } from '../stores';
import StatementInput from './StatementInput.svelte';
    import Checkbox from './Checkbox.svelte';

export let action = {};
export let statements = [];

const UUID = makeUUID(6,[['-','X']]);

let resourceName;
let active = true;

$: resourceName = ($resource.name || '').toLowerCase()

</script>

<div >
    <p>{action.name}</p>
    <Checkbox bind:checked={active}/>
    <div class="{active || 'grayscale'}">
        {#each action.commonStatements as commonStatement}
            <StatementInput statement={commonStatement} disabled={!active}/>
        {/each}
    </div>
</div>
