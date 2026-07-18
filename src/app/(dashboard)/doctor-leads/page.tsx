import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BriefcaseMedical, Plus, Search, Filter, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getPartnerProfile } from "../actions";
import { CreateLeadDialog } from "./create-lead-dialog";
import { LeadList } from "@/components/lead-list";

export default async function DoctorLeadsPage() {
  const supabase = await createClient();
  const partner = await getPartnerProfile();

  if (!partner) return null;

  const { data: leadsSafe } = await supabase
    .from('doctor_leads')
    .select('*')
    .eq('assigned_to', partner.id)
    .order('id', { ascending: false });

  const displayLeads = leadsSafe || [];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-sm">
              <BriefcaseMedical className="w-6 h-6" />
            </div>
            Doctor Diary Leads
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your clinic signups and track conversions in your territory.</p>
        </div>
        <CreateLeadDialog />
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <LeadList initialLeads={displayLeads} />
      </Card>
    </div>
  );
}
