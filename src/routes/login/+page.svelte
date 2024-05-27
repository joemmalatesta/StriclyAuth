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


    console.log(supabase,session)
</script>

<div>
    <form action="">
        <button>Login with google</button>
    </form>
</div>