<script lang="ts">
	import type { Session, SupabaseClient } from "@supabase/supabase-js";

    export let session: Session | null
    export let supabase: SupabaseClient
</script>

<h1>NAVBAR</h1>
{#if session}
<div>Hello {session.user.email}</div>
<button on:click={async() => {await supabase.auth.signOut()}}>Logout</button>
{:else}
<a href="/login">Login</a>
{/if}