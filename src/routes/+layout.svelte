<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
    import Navbar from '../components/Navbar.svelte';
    export let data;

let {supabase, session } = data;
$: supabase = data.supabase
$: session = data.session

//if session not null, we have a user logged in...


// Whenever the auth state changes
supabase.auth.onAuthStateChange(async(event, session) => {
    console.log(`Auth state changed ${event}`)
    if (event === "SIGNED_IN"){
        invalidateAll()
    }
    if (event === "SIGNED_OUT"){
        goto("/login")
        invalidateAll()
    }
})
</script>


<Navbar {session} {supabase} />
<slot />