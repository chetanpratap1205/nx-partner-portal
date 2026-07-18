import { createClient } from "@/utils/supabase/server";
import { getPartnerProfile } from "../../actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Phone, Mail, MapPin, Building2, UserCircle2, Clock, CalendarHeart, FileText } from "lucide-react";
import Link from "next/link";
import { ActivityForm } from "./activity-form";

// Define Page props correctly for Next.js 16 app router
export default async function LeadDetailsPage(
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const leadId = params.id;
  const supabase = await createClient();
  const partner = await getPartnerProfile();

  if (!partner) return null;

  // Fetch the lead
  const { data: lead } = await supabase
    .from('doctor_leads')
    .select('*')
    .eq('id', leadId)
    .eq('assigned_to', partner.id)
    .single();

  if (!lead) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-slate-800">Lead not found</h2>
        <p className="text-slate-500 mt-2">The lead may have been deleted or you don't have access.</p>
        <Link href="/doctor-leads" className="text-blue-600 hover:underline mt-4 inline-block">
          &larr; Back to Leads
        </Link>
      </div>
    );
  }

  // Fetch activities
  const { data: rawActivities, error } = await supabase
    .from('lead_activities')
    .select('*')
    .eq('lead_id', leadId)
    .order('id', { ascending: false }); // Using id as fallback for ordering if created_at doesn't exist, though typically created_at is better. Let's just use id since we don't know if created_at is there.
    
  const activities = rawActivities || [];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <Link href="/doctor-leads" className="p-2 rounded-full hover:bg-slate-200 transition-colors bg-slate-100">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{lead.clinic_name}</h1>
          <p className="text-slate-500 font-medium flex items-center gap-2 mt-1">
            <UserCircle2 className="w-4 h-4" /> {lead.doctor_name} • {lead.specialty}
          </p>
        </div>
        <div className="ml-auto flex gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${
            lead.status === 'new' ? 'bg-blue-100 text-blue-700' :
            lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
            lead.status === 'demo_scheduled' ? 'bg-purple-100 text-purple-700' :
            lead.status === 'converted' ? 'bg-emerald-100 text-emerald-700' :
            'bg-slate-100 text-slate-700'
          }`}>
            {lead.status}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${
            lead.priority === 'hot' ? 'bg-red-100 text-red-700' :
            lead.priority === 'warm' ? 'bg-orange-100 text-orange-700' :
            'bg-slate-100 text-slate-600'
          }`}>
            {lead.priority}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" /> Clinic Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Phone Number</p>
                  <p className="font-semibold text-slate-900 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" /> {lead.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Email Address</p>
                  <p className="font-semibold text-slate-900 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" /> {lead.email || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">City</p>
                  <p className="font-semibold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" /> {lead.city}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Lead Source</p>
                  <p className="font-semibold text-slate-900 capitalize flex items-center gap-2">
                    <CalendarHeart className="w-4 h-4 text-slate-400" /> {lead.source.replace('_', ' ')}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-slate-500 font-medium mb-1">Full Address</p>
                  <p className="font-semibold text-slate-900 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    {lead.address || 'No address provided'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" /> Activity Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {activities.length === 0 ? (
                <p className="text-slate-500 text-center py-4">No activities logged yet.</p>
              ) : (
                <div className="relative border-l-2 border-slate-100 ml-3 space-y-8 pb-4">
                  {activities.map((activity, index) => (
                    <div key={activity.id} className="relative pl-6">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-indigo-500" />
                      </div>
                      <div className="bg-white border border-slate-100 rounded-lg p-4 shadow-sm hover:border-slate-200 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-slate-800 capitalize flex items-center gap-2">
                            <FileText className="w-4 h-4 text-slate-400" />
                            {activity.type.replace('_', ' ')}
                          </span>
                          {activity.new_status && (
                            <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded">
                              &rarr; {activity.new_status}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 text-sm whitespace-pre-wrap">{activity.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <ActivityForm leadId={leadId} currentStatus={lead.status} />
        </div>
      </div>
    </div>
  );
}
