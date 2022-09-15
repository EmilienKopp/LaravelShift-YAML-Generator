<script>
import { onMount } from 'svelte';
import { supabase } from '../../API/SupabaseClients';
import { ENV } from '../env';
import Generator from '../components/Generator.svelte';
import HowTo from '../components/HowTo.svelte';
import Header from '../blocks/Header.svelte';
import { SESSION, USER } from '../users';

export let session;

let loading = false;
let email = '';
let username = null;
let avatarUrl = null;
let website = null;


onMount( () => {
    //getProfile();
})

const getProfile = async () => {
  try {
    loading = true;
    const { user } = session;
    const { data, error, status } = await supabase
      .from('profiles')
      .select('username, website, avatar_url')
      .eq('id', user.id)
      .single();
    if (error && status !== 406) throw error;

    if (data) {
        username = data.username;
        website = data.website;
        avatarUrl = data.avatar_url;
    }
  } catch (error) {
    if (error instanceof Error) alert(error.message);
  } finally {
    loading = false;
  }

  $USER = {
    email: session.user.email,
    username,
    avatarUrl,
    website
  };
};

$ : console.log($USER);

</script>

<main class="flex flex-1 flex-col overflow-x-hidden h-full" style="height:100vh;">
    <Generator {session}>
        <Header slot="header"/>
        {#if $ENV.PROD && $ENV.DEMO}
        <HowTo slot="HowTo"/>
        {/if}
    </Generator>
</main>