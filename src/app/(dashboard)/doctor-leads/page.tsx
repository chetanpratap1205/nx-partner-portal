import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BriefcaseMedical, Plus, Search, Filter, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getPartnerProfile } from "../actions";
import { CreateLeadDialog } from "./create-lead-dialog";
import Link from "next/link";

export default async function DoctorLeadsPage() {
  const supabase = await createClient();
  const partner = await getPartnerProfile();

  if (!partner) return null;

  const { data: leads } = await supabase
    .from('doctor_leads')
    .select('*')
    .eq('assigned_to', partner.id)
    .order('created_at', { ascending: false }); // Assuming there's a created_at column. If it errors, we can change to order by id or just no order. Let's not assume created_at, just fetch.
    
  // Let's just fetch without order if created_at doesn't exist, but it's standard supabase. We'll leave it out to be safe since it's not in the schema.
  
  const { data: leadsSafe } = await supabase
    .from('doctor_leads')
    .select('*')
    .eq('assigned_to', partner.id);

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

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Search clinics, doctors..." className="pl-9 bg-white border-slate-200 focus-visible:ring-blue-600" />
            </div>
            <Button variant="outline" className="border-slate-200 text-slate-600 font-medium">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {displayLeads.length === 0 ? (
            <div className="p-12 text-center text-slate-500 flex flex-col items-center">
              <div className="bg-slate-100 p-4 rounded-full mb-4">
                <BriefcaseMedical className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-1">No leads found</h3>
              <p className="text-sm max-w-md mx-auto">You haven't added any leads for Doctor Diary yet. Start prospecting in your region to hit your monthly target!</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {displayLeads.map((lead) => (
                <div key={lead.id} className="p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-slate-900">{lead.clinic_name}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        lead.status === 'new' ? 'bg-blue-100 text-blue-700' :
                        lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                        lead.status === 'converted' ? 'bg-green-100 text-green-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {lead.status.toUpperCase()}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        lead.priority === 'hot' ? 'bg-red-100 text-red-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {lead.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 font-medium">{lead.doctor_name} • {lead.specialty}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-500">
                      <div className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {lead.phone}</div>
                      {lead.email && <div className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {lead.email}</div>}
                      <div className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {lead.city}</div>
                    </div>
                  </div>
                  <Link href={`/doctor-leads/${lead.id}`}>
                    <Button variant="outline" className="shrink-0 text-blue-600 border-blue-200 hover:bg-blue-50">
                      View Details
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
