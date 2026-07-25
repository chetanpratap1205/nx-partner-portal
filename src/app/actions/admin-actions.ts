"use server";

import { createClient } from "@/utils/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { getUserRole, AppRole } from "./role-actions";

export async function inviteInternalEmployee(formData: FormData) {
  const currentRole = await getUserRole();
  
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

  const adminSupabase = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await adminSupabase.auth.admin.inviteUserByEmail(email, {
    data: { role, name },
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login`
  });

  if (error) {
    console.error("Error inviting employee:", error);
    // If inviteUserByEmail fails (e.g. SMTP not configured in Supabase), fallback to creating user directly
    const { data: createData, error: createError } = await adminSupabase.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: { role, name }
    });

    if (createError) {
      return { success: false, message: createError.message || "Failed to invite employee." };
    }

    return { success: true, message: `Account created for ${name} (${email}) as ${role}. They can sign in using password reset or login.` };
  }

  console.log(`[SECURE ADMIN ACTION] Successfully invited ${name} (${email}) as ${role}`);
  return { success: true, message: `Successfully sent invitation to ${email}` };
}
