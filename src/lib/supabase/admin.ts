import { createClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client for admin operations (e.g. inviting users).
 * NEVER expose this client to the browser — server-side only.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
