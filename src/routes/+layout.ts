
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON } from "$env/static/public";
import { createBrowserClient, isBrowser, parse } from "@supabase/ssr";
import type { LayoutLoad } from "./$types";

// Only handling auth on client. This should be fine.
export const ssr = false;


//load runs before layout sets up
export const load: LayoutLoad = async({fetch, data, depends}: any) => {
    depends('supabase:auth')

    // Create the client and get the session if it exists

    const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON, {
        global: {
            fetch
        },
        cookies: {
            get(key) {
                console.log('creating session')
                // If we're on the server, return the session directly/safely
                if (!isBrowser) {
                    return JSON.stringify(data.session)
                }
                // otherwise, get the cookie we have stored.
                
                const cookie = parse(`cookie ${document.cookie}`)
                console.log(`cookie ${cookie[key]}`)
                return cookie[key]
            }
        }
    });


    // pull the session from the supabase we initialized at load
    const {
        data: {session}
    } = await supabase.auth.getSession()

    // Returns to our layout.svelte
    console.log(`Layout.ts returning user: ${supabase.auth.getUser()} and session: ${session?.user}`)
    return { supabase, session }
}