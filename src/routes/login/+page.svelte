<script lang="ts">
	import { goto } from '$app/navigation';

    // Import from layout.
    export let data;

    let {supabase, session } = data;
    $: supabase = data.supabase
    $: session = data.session

    $: if (session){
        goto("/")
    }

    async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    });
    if (error) console.error('Error logging in with Google:', error.message);
  }
    console.log(supabase,session?.user.email)

    async function signInWithGithub() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github'
    });
    if (error) console.error('Error logging in with Google:', error.message);
  }
</script>

<div>
        <button on:click={signInWithGoogle}>Login with google</button>
        <button on:click={signInWithGithub}>Login with github</button>

</div>