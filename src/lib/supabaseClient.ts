import { auth } from '@clerk/nextjs/server'
import { createClient, SupabaseClient  } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Cliente público (anónimo).
 * Úsalo en funciones cacheadas (unstable_cache).
 */
export function createAnonSupabaseClient(): SupabaseClient {
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

/**
 * Cliente autenticado.
 * Llama a auth() **fuera** de cualquier unstable_cache (p.ej. en handlers o en createChallenge).
 */
export async function createServerSupabaseClient(): Promise<SupabaseClient> {
    const { getToken } = await auth();
    const token = await getToken();

    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        global: {
            headers: { Authorization: `Bearer ${token}` }
        }
    });
}