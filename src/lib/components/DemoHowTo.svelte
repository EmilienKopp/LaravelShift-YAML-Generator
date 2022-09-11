<!-- DEMO -->
<script>
    export let ModelName = '';
</script>

<div id="howto" class="border-2 border-darkish p-2 rounded-md self-start">
    <h4 class="text-xl font-bold text-green-400">How to use this app</h4>
    <div id="controllers" class="flex flex-row gap-4 p-3 text-lg">
        <ul class="list-disc p-2">
            <li>Enter a name for a DB table to generate YAML for:</li>
            <input bind:value={ModelName} name="ModelName" class="text-sm p-1 w-52 h-9 bg-black border-darkish border-2 text-slate-400" placeholder="Type your model name here"/>
            <li>Use the <i class="bi bi-plus-square-dotted text-xl"/> button to add a column.</li>
            <li>Set your column's name, type, size, and other modifiers.</li>
            <li>Add relationships between tables with the <i class="rounded-3xl p-1 bg-green-400 bi bi-node-plus-fill"/> button. </li>
            <li>Display your YAML at any time with the <i class="rounded-3xl p-1 bg-green-400 bi bi-braces"/> button.</li>
            <li>Download <i class="rounded-3xl p-1 bg-green-400 bi bi-cloud-arrow-down"/> your YAML file ready to be imported into Laravel Shift Blueprint</li>
            <li>Display extra help about the commands with the <i class="rounded-3xl p-1 bg-green-400 bi bi-question-circle"/> button.  </li>
        </ul>
    </div>
    <div id="howto-footer" class="flex flex-row justify-start items-center">
        <p>Developed with:</p>
            <a href="https://svelte.dev">
                <img width=100 alt="Svelte" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original-wordmark.svg" />
            </a>
            <a href="https://tailwindcss.com/">
                <img width=100 alt="Tailwindcss" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original-wordmark.svg" />
            </a>
    </div>
</div>