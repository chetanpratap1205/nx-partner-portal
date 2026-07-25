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

  // 1. HARDCODED GOD-MODE (Founder / Admin list / Superadmin role)
  const adminIds = (process.env.ADMIN_USER_IDS || '').split(',').map(id => id.trim());
  if (
    user.email === 'chetanpratap1205@gmail.com' ||
    adminIds.includes(user.id) ||
    user.user_metadata?.role === 'superadmin'
  ) {
    return 'superadmin';
  }

  // 2. CHECK FOR INTERNAL EMPLOYEE ROLE FROM METADATA
  if (user.user_metadata?.role && ['internal_finance', 'internal_sales'].includes(user.user_metadata.role)) {
    return user.user_metadata.role as AppRole;
  }

  // 3. DEFAULT: EVERYONE ELSE IS A PARTNER
  return 'partner';
}
