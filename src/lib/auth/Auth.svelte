<script>
    import { supabase } from "../../API/SupabaseClients.js";

    let loading = false;
    let email = '';

    const handleLogin = async () => {
        try {
            let loading = true;
            const { error } = await supabase.auth.signInWithOtp({ email });
            if (error) throw error;
            alert('Check your email for the login link!');
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert(error.error_description || error.error);
            }
        } finally {
            loading = false;
        }
    };

</script>

<div>



</div>