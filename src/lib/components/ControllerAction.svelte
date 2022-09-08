<script>
    import { makeUUID } from '../tools/toolbox.js';
    import { CONFIG } from '../stores';
    
    export let action = null;
    export let statements = $CONFIG.controllerActions.statements[action];

    
    const UUID = makeUUID(6,[['-','X']]);
    const queryTypes = ['all','withTrashed','TrashedOnly'];

    let selected;

    </script>
    
    <div class="drop-shadow-sm rounded-sm {action}" >
        <p class="action-title">{action}()</p>
        <label for="{action}-query-select-{UUID}">query:</label>
        <select id="{action}-query-select-{UUID}" class="form-select form-select-sm {action}-query-select" bind:value={selected} on:change={(e)=> {selected = e.currentTarget.value} }>
            {#each queryTypes as queryType}
                <option value={queryType} >{queryType}</option>
            {/each}
        </select>
        {#each statements[action] as property}
            <label for="{action}-{property}-input-{UUID}">{property}:</label>
            <input type="text" id="{action}-{property}-input-{UUID}" class="form-control form-control-sm">
        {/each}
    </div>
    
    
    <style>
    
    </style>