<script>
    import { supabase } from '../../API/SupabaseClients';

    export let session;
    let username;
    let website;
    let avatarUrl;
    let loading = false;

    const updateProfile = async () => {
    try {
      loading = true
      const { user } = session

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      
      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      loading = false
    }
  }
</script>


<div class="flex flex-row">
    <form on:submit|preventDefault={updateProfile} class="form-widget">
        <div>Email: {session.user.email}</div>
        <div>
          <label for="username">Name</label>
          <input id="username" type="text" bind:value={username} />
        </div>
        <div>
          <label for="website">Website</label>
          <input id="website" type="text" bind:value={website} />
        </div>
        <div>
          <button type="submit" class="button primary block" disabled={loading}>
            {loading ? 'Saving ...' : 'Update profile'}
          </button>
        </div>
        <button type="button" class="button block" on:click={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </form>
</div>