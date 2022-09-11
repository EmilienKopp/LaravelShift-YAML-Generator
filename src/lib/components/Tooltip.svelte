<script>
    export let label = 'Tooltip';
</script>

<div class="relative flex flex-col items-center group">
    <slot></slot>
    <div class="absolute -top-9 flex flex-col items-center hidden mb-6 group-hover:flex">
        <span class="relative z-50 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
            {label}
        </span>
        <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
    </div>
</div>