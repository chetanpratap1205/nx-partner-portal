"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export type AppRole = 'superadmin' | 'partner' | 'internal_finance' | 'internal_sales';

export async function setRoleCookie(role: AppRole) {
  const cookieStore = await cookies();
  cookieStore.set('nx_role', role, { maxAge: 60 * 60 * 24 * 7, path: '/' });
  revalidatePath('/dashboard');
}

export async function getRoleCookie(): Promise<AppRole> {
  const cookieStore = await cookies();
  const role = cookieStore.get('nx_role')?.value as AppRole;
  return role || 'partner'; // Default to partner
}
