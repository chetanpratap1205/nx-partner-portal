import { createClient } from "@/utils/supabase/server";
import { getPartnerProfile } from "../actions";
import { Users2, UserPlus, TrendingUp, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/animations";

export default async function AgencyPage() {
  const supabase = await createClient();
  const partner = await getPartnerProfile();

  if (!partner) return null;

  // Mock data for the agency team (in a real app, we'd query `growth_partners` where `master_agent_id = partner.id`)
  const team = [
    { id: 1, name: "Rajat Verma", role: "Field Agent", activeClinics: 12, mrr: 30000, lastActive: "2 hours ago" },
    { id: 2, name: "Sneha Patil", role: "Field Agent", activeClinics: 8, mrr: 20000, lastActive: "1 day ago" },
    { id: 3, name: "Karan Singh", role: "Field Agent", activeClinics: 3, mrr: 7500, lastActive: "5 mins ago" },
  ];

  const totalTeamClinics = team.reduce((sum, agent) => sum + agent.activeClinics, 0);
  const totalTeamMRR = team.reduce((sum, agent) => sum + agent.mrr, 0);
  const overrideCommission = totalTeamMRR * 0.05; // 5% override on team's MRR

  return (
    <div className="space-y-8 pb-12">
      <FadeIn className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <div className="bg-purple-600 p-2 rounded-xl text-white shadow-sm">
              <Users2 className="w-6 h-6" />
            </div>
            Agency Command Center
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your downline sub-agents and track your override commissions.</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold h-11">
          <UserPlus className="w-4 h-4 mr-2" /> Invite Sub-Agent
        </Button>
      </FadeIn>

      <StaggerGroup className="grid gap-6 sm:grid-cols-3">
        <StaggerItem>
          <Card className="border-slate-200 shadow-sm bg-purple-50/50 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-purple-800">Team Active Clinics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900 flex items-center">
                {totalTeamClinics}
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
        
        <StaggerItem>
          <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-slate-600">Total Team MRR</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">₹{totalTeamMRR.toLocaleString()}</div>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="border-slate-200 shadow-sm bg-emerald-50/50 hover:shadow-md transition-shadow border-emerald-100">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold text-emerald-800">Your 5% Override</CardTitle>
              <div className="bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded text-xs font-bold">Passive</div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-700">₹{overrideCommission.toLocaleString()}/mo</div>
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerGroup>

      <FadeIn delay={0.3}>
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="text-lg font-bold text-slate-800">Your Field Agents</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {team.map((agent) => (
                <div key={agent.id} className="p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                      {agent.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{agent.name}</h4>
                      <p className="text-sm text-slate-500">
                        Active {agent.lastActive}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-6">
                    <div>
                      <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Clinics</div>
                      <div className="font-bold text-slate-900">{agent.activeClinics}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">MRR</div>
                      <div className="font-bold text-slate-900">₹{agent.mrr.toLocaleString()}</div>
                    </div>
                    <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                      View Pipeline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
