"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function login(data: z.infer<typeof loginSchema>) {
  const result = loginSchema.safeParse(data);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { email, password } = result.data;
  const supabase = await createClient();

  const { error, data: authData } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }
  
  // Verify if the user is a partner or admin
  if (authData.user) {
    // If the user is an admin from ENV, allow them
    const adminIds = process.env.ADMIN_USER_IDS?.split(',') || [];
    const isAdmin = adminIds.includes(authData.user.id);

    if (!isAdmin) {
      const { data: partnerData } = await supabase
        .from('growth_partners')
        .select('id, is_active')
        .eq('auth_user_id', authData.user.id)
        .single();
        
      if (!partnerData || !partnerData.is_active) {
        await supabase.auth.signOut();
        return { error: "Access denied. You do not have an active partner account." };
      }
    }
  }

  redirect("/dashboard");
}
