<script>
import { ENV } from './lib/env';
import Dashboard from "./lib/pages/Dashboard.svelte";
import Auth from "./lib/auth/Auth.svelte";
import Login from "./lib/auth/Login.svelte";
import Sidebar from "./lib/blocks/Sidebar.svelte";
import Header from "./lib/blocks/Header.svelte";
import YamlTool from "./lib/components/YamlTool.svelte";
import HelpTool from "./lib/components/HelpTool.svelte";
import HowTo from "./lib/components/HowTo.svelte";


let user = {};

console.log('ENV', { ...$ENV });
</script>


<div class="flex h-full flex-col" >
    <div class="flex h-full">
    
    <Sidebar>
        <YamlTool slot="YamlTool"/>
        <HelpTool slot="HelpTool"/>
    </Sidebar>

    <Dashboard>
      <Header slot="header"/>
      {#if $ENV.PROD && $ENV.DEMO}
      <HowTo slot="HowTo"/>
      {/if}
    </Dashboard>

    </div>
</div>