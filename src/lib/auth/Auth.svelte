<script>
import { supabase } from "../../API/SupabaseClients.js";

const COLS = 6;
let self = {name: arguments[0].__proto__.constructor.name};
let loading = false;
let email = '';

const handleLogin = async () => {
    try {
        loading = true;
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) throw error;
        alert('Check your email for the login link!');
    } catch (error) {
        if (error instanceof Error) {
            alert(error);
        } 
    } finally {
        loading = false;
    }
};

</script>

<div id="{self.name}-wrapper" class="w-full flex flex-col items-center justify-center">
    <div id="{self.name}-form-container" aria-live="polite">
        <div id="form-container" class="lg:my-6 md:my-3">
            <h1 class="font-bold m-2 text-3xl text-green-300 text-center">Blueprint YAML Generator</h1>
            <p>Sign-in via magic link with your email below.</p>
            <form id="{self.name}-login-form" on:submit|preventDefault={handleLogin}>
                <div class="mt-1">
                    <input type="email" name="email" id="email" autocomplete="email" required
                        placeholder="Email address"
                        class="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md"
                        bind:value="{email}">
                </div>
                <div class="mt-2">
                    <button type="submit" aria-live="polite"
                        class="inline-flex justify-center p-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 "
                        disabled="{loading}">
                        {#if loading}
                            <i class="animate-spin bi bi-gear mx-2 text-lg"/> Loading...
                        {:else}
                            Sign in
                        {/if}
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>