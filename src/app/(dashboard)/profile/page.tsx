import { createClient } from "@/utils/supabase/server";
import { getPartnerProfile } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Target, Share2, Info } from "lucide-react";
import { ProfileForm } from "./profile-form";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/animations";

export default async function ProfilePage() {
  const supabase = await createClient();
  const partner = await getPartnerProfile();

  if (!partner) return null;

  return (
    <div className="space-y-6 pb-12">
      <FadeIn>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
          <div className="bg-slate-800 p-2 rounded-xl text-white shadow-sm">
            <User className="w-6 h-6" />
          </div>
          Partner Profile
        </h1>
        <p className="text-slate-500 mt-2 font-medium">Manage your personal information and view your business targets.</p>
      </FadeIn>

      <StaggerGroup className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StaggerItem className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="text-lg font-bold text-slate-800">Personal Information</CardTitle>
              <CardDescription>Update your contact details and region.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ProfileForm partner={partner} />
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem className="space-y-6">
          <Card className="border-slate-200 shadow-sm bg-blue-50/50 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3 border-b border-blue-100">
              <CardTitle className="text-md font-bold text-blue-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" /> Business Targets
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div>
                <p className="text-sm text-slate-500 font-medium">Monthly Target</p>
                <p className="text-2xl font-bold text-slate-900">{partner.target_monthly} Conversions</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">First Sale Commission</span>
                  <span className="font-bold text-emerald-600">{partner.commission_first_sale_pct}%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Renewal Commission</span>
                  <span className="font-bold text-blue-600">{partner.commission_renewal_pct}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="text-md font-bold text-slate-800 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-slate-500" /> Referral Code
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="bg-slate-100 p-4 rounded-lg flex items-center justify-between border border-slate-200">
                <code className="text-lg font-mono font-bold text-slate-800 tracking-wider">
                  {partner.referral_code}
                </code>
              </div>
              <p className="text-xs text-slate-500 flex items-start gap-1.5 mt-3">
                <Info className="w-4 h-4 shrink-0" />
                Share this code with clinics. They enter it during signup for you to earn commission.
              </p>
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerGroup>
    </div>
  );
}
