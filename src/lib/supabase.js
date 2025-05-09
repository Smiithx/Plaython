import {useSession} from "@clerk/nextjs";
import {createClient} from '@supabase/supabase-js';
const { session } = useSession()
const {NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY} = process.env;

export const supabase = createClient(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
        // Session accessed from Clerk SDK, either as Clerk.session (vanilla
        // JavaScript) or useSession (React)
        accessToken: async () => session?.getToken() ?? null,
    }
);
