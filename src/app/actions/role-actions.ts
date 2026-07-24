"use server";

import { createClient } from "@/utils/supabase/server";

export type AppRole = 'superadmin' | 'partner' | 'internal_finance' | 'internal_sales';

/**
 * Gets the definitive role for the current authenticated user.
 * This is the secure, server-side source of truth.
 */
export async function getUserRole(): Promise<AppRole> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return 'partner'; // Default fallback if not logged in
  }

  // 1. HARDCODED GOD-MODE (Founder)
  if (user.email === 'chetanpratap1205@gmail.com') {
    return 'superadmin';
  }

  // 2. CHECK FOR INTERNAL EMPLOYEE (In production, read from user_roles table or user_metadata)
  // Example: if (user.user_metadata?.role) return user.user_metadata.role;

  // 3. DEFAULT: EVERYONE ELSE IS A PARTNER
  return 'partner';
}
