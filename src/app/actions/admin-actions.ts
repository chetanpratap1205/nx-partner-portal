"use server";

import { createClient } from "@/utils/supabase/server";
import { getRoleCookie, AppRole } from "./role-actions";

export async function inviteInternalEmployee(formData: FormData) {
  const currentRole = await getRoleCookie();
  
  // SECURITY BOUNDARY: ONLY SUPERADMIN CAN INVITE EMPLOYEES
  if (currentRole !== 'superadmin') {
    throw new Error("Unauthorized. Only the Superadmin can invite internal employees.");
  }

  const email = formData.get('email') as string;
  const role = formData.get('role') as AppRole;
  const name = formData.get('name') as string;

  if (!email || !role || !name) {
    throw new Error("Missing required fields");
  }

  const supabase = await createClient();
  
  /**
   * ENTERPRISE ARCHITECTURE NOTE:
   * In a production environment, we would use the Supabase Admin API here:
   * 
   * const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
   *   data: { role: role, name: name }
   * });
   * 
   * This bypasses the public /signup page entirely. The user receives an email with a 
   * secure link to set their password. When they log in, their metadata.role is permanently
   * set to the role you chose (e.g. 'internal_finance').
   */

  console.log(`[SECURE ADMIN ACTION] Inviting ${name} (${email}) as ${role}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return { success: true, message: `Successfully sent invitation to ${email}` };
}
