<script>
import { supabase } from './API/SupabaseClients';
import { onMount } from 'svelte';
import { ENV } from './lib/env';
import Dashboard from "./lib/pages/Dashboard.svelte";
import Auth from "./lib/auth/Auth.svelte";
import LogInOut from "./lib/components/LogInOut.svelte";
import Sidebar from "./lib/blocks/Sidebar.svelte";
import YamlTool from "./lib/components/YamlTool.svelte";
import HelpTool from "./lib/components/HelpTool.svelte";
import { USER, SESSION } from './lib/users';

let session;

onMount( () =>{
  supabase.auth.getSession().then( ({data}) => {
    session = data.session;
  });

  supabase.auth.onAuthStateChange( (_event, _session) => {
    session = _session;
  });

});

const logOut = async () => {
  console.log('Received SignOut event');
  const { error } = await supabase.auth.signOut();
  console.log(error);
}


console.log('ENV', { ...$ENV });
console.log(session);
</script>


<div class="flex h-full flex-col" >
    <div class="flex h-full">
    

      <Sidebar>
          <YamlTool slot="YamlTool"/>
          <HelpTool slot="HelpTool"/>
          <!-- <LogInOut slot="LogInOut" on:signOut={logOut}/> -->
      </Sidebar>

      
          <!-- <Auth/> -->

          <Dashboard {session}/>

    </div>
</div>