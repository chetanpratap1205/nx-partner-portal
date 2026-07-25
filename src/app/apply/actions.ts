"use server";

import { createClient } from "@/utils/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { randomBytes } from "crypto";
import { z } from "zod";

const applySchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  city: z.string().min(2, "City is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function submitApplication(data: z.infer<typeof applySchema>) {
  const result = applySchema.safeParse(data);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { fullName, phone, city, email, password } = result.data;
  const supabase = await createClient();

  // 1. Create the user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    return { error: authError.message };
  }

  const userId = authData.user?.id;

  if (userId) {
    // Generate a robust referral code
    let baseCode = fullName.split(' ')[0].toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (!baseCode) baseCode = 'PRT';
    const randomString = randomBytes(4).toString('hex').toUpperCase();
    const referralCode = `NX-${baseCode}-${randomString}`;

    const adminSupabase = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 2. Insert into growth_partners table.
    const { error: dbError } = await adminSupabase
      .from('growth_partners')
      .insert({
        auth_user_id: userId,
        email: email,
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
      if (dbError.code === '23505') {
        return { error: "An account with this email already exists." };
      }
      return { error: "Could not create partner profile. Please try again." };
    }
    
    // 3. Send automated welcome email via Brevo
    // We execute this asynchronously so we don't block the redirect
    import('@/lib/email').then(({ sendWelcomeEmail }) => {
      sendWelcomeEmail(email, fullName, referralCode);
    }).catch(err => console.error("Failed to load email module:", err));
  }

  redirect("/dashboard");
}
