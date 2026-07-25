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

  const adminSupabase = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const isSuperAdminEmail = email.trim().toLowerCase() === 'chetanpratap1205@gmail.com';
  const role = isSuperAdminEmail ? 'superadmin' : 'partner';

  // 1. Create the user in Supabase Auth via Admin API (auto-confirms email and sets metadata)
  const { data: adminUserData, error: authError } = await adminSupabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      name: fullName,
      role: role
    }
  });

  if (authError) {
    console.error("Auth creation error:", authError);
    if (authError.message?.toLowerCase().includes("already exists") || authError.status === 422) {
      return { error: "An account with this email already exists. Please sign in instead." };
    }
    return { error: authError.message || "Failed to create authentication account." };
  }

  const userId = adminUserData.user?.id;

  if (!userId) {
    return { error: "User creation failed. Could not retrieve User ID." };
  }

  // 2. Generate referral code
  let baseCode = fullName.split(' ')[0].toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (!baseCode) baseCode = 'PRT';
  const randomString = randomBytes(4).toString('hex').toUpperCase();
  const referralCode = `NX-${baseCode}-${randomString}`;

  // 3. Insert into growth_partners table (ONLY if they are a partner)
  if (role === 'partner') {
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
      console.error("Error inserting partner profile into DB:", dbError);
      
      // Clean up created Auth user to avoid orphan auth accounts
      try {
        await adminSupabase.auth.admin.deleteUser(userId);
      } catch (cleanupErr) {
        console.error("Failed to cleanup auth user after DB error:", cleanupErr);
      }

      if (dbError.code === '23505') {
        return { error: "An account with this email already exists." };
      }
      return { error: `Database Error: ${dbError.message || "Could not create partner profile. Please try again."}` };
    }
  }
  
  // 4. Sign in the newly created user to establish Next.js session cookies
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    console.error("Sign in after registration failed:", signInError);
    // User is created and profile exists, but automatic login failed, direct them to login page
    return { error: "Account created successfully! Please sign in with your credentials on the login page." };
  }

  // 5. Send automated welcome email via Brevo
  import('@/lib/email').then(({ sendWelcomeEmail }) => {
    sendWelcomeEmail(email, fullName, referralCode);
  }).catch(err => console.error("Failed to load email module:", err));

  redirect("/dashboard");
}
