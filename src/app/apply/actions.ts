"use server";

import { createClient } from "@/utils/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export async function submitApplication(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;
  const phone = formData.get("phone") as string;
  const city = formData.get("city") as string;
  
  if (!email || !password || !fullName || !phone || !city) {
    return redirect("/apply?error=All fields are required");
  }

  const supabase = await createClient();

  // 1. Create the user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    return redirect(`/apply?error=${authError.message}`);
  }

  const userId = authData.user?.id;

  if (userId) {
    // Generate a simple referral code
    const baseCode = fullName.split(' ')[0].toUpperCase().replace(/[^A-Z0-9]/g, '');
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const referralCode = `NX-${baseCode}-${randomNum}`;

    // Create an Admin client to bypass RLS for inserting the profile.
    // When Email Confirmations are enabled, the user doesn't have an active session yet,
    // so RLS would block this insert.
    const adminSupabase = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 2. Insert into growth_partners table.
    const { error: dbError } = await adminSupabase
      .from('growth_partners')
      .insert({
        auth_user_id: userId,
        name: fullName,
        phone,
        city,
        referral_code: referralCode,
        is_active: true,
        target_monthly: 10,
        commission_first_sale_pct: 20
      });

    if (dbError) {
      console.error("Error inserting partner:", dbError);
      return redirect(`/apply?error=Could not create partner profile. Please try again.`);
    }
  }

  // Redirect straight to dashboard
  redirect("/dashboard");
}
