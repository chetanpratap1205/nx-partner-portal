import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BriefcaseMedical, Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function DoctorLeadsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Ideally fetch leads here from doctor_leads table
  // const { data: leads } = await supabase.from('doctor_leads').select('*').eq('partner_id', user.id);

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
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11">
          <Plus className="w-4 h-4 mr-2" /> Add New Lead
        </Button>
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
          <div className="p-12 text-center text-slate-500 flex flex-col items-center">
            <div className="bg-slate-100 p-4 rounded-full mb-4">
              <BriefcaseMedical className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-1">No leads found</h3>
            <p className="text-sm max-w-md mx-auto">You haven't added any leads for Doctor Diary yet. Start prospecting in your region to hit your monthly target!</p>
            <Button variant="outline" className="mt-6 font-semibold border-blue-200 text-blue-600 hover:bg-blue-50">
              <Plus className="w-4 h-4 mr-2" /> Create First Lead
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
