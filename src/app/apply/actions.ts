"use server";

import { createClient } from "@/utils/supabase/server";
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

    // 2. Insert into growth_partners table.
    // Set is_active to true to allow immediate login (frictionless onboarding).
    const { error: dbError } = await supabase
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

  // Redirect straight to dashboard for instant gratification
  redirect("/dashboard");
}
