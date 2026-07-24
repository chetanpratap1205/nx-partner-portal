"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  if (!email || !password) {
    return redirect("/login?error=Email and password are required");
  }

  const supabase = await createClient();

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect(`/login?error=${error.message}`);
  }
  
  // Verify if the user is a partner
  if (data.user) {
    const { data: partnerData } = await supabase
      .from('growth_partners')
      .select('id, is_active')
      .eq('auth_user_id', data.user.id)
      .single();
      
    if (!partnerData || !partnerData.is_active) {
      await supabase.auth.signOut();
      return redirect("/login?error=Access denied. You do not have an active partner account.");
    }
  }

  redirect("/dashboard");
}
