<script lang="ts">
    export let data;

    let {supabase, session } = data;
    $: supabase = data.supabase
    $: session = data.session
</script>

<h1>Hello {session?.user.email}</h1>

<form action="/">
<input type="text" name="name" placeholder="your name">
<button></button>
</form>