import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/animations";
import { Shield, TrendingUp, Users, DollarSign, Building2, Activity, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FounderDashboard() {
  // Mock data for the Founder God-Mode Dashboard
  const globalMetrics = {
    mrr: 1250000, // 12.5 Lakhs
    activeClinics: 542,
    totalPartners: 84,
    newLeadsThisWeek: 156
  };

  const topAgencies = [
    { name: "Maharashtra Elite", head: "Rajat Verma", mrr: 450000, clinics: 180 },
    { name: "Gujarat Health Connect", head: "Priya Patel", mrr: 320000, clinics: 145 },
    { name: "Delhi MedTech", head: "Karan Singh", mrr: 210000, clinics: 90 },
  ];

  const formatRupees = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <FadeIn className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-rose-200">
              <Shield className="w-4 h-4" /> Superadmin Mode Active
            </div>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Founder Command Center
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Global metrics and overarching performance across all partners and internal teams.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Button className="bg-slate-900 text-white font-bold hover:bg-slate-800">
             Download Investor Report
           </Button>
        </div>
      </FadeIn>

      {/* Global KPI Cards */}
      <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StaggerItem>
          <Card className="shadow-sm border-slate-200 bg-white hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Global MRR</CardTitle>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900">{formatRupees(globalMetrics.mrr)}</div>
              <p className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3 h-3" /> +12.4% from last month
              </p>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="shadow-sm border-slate-200 bg-white hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Active Clinics</CardTitle>
              <Building2 className="w-5 h-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900">{globalMetrics.activeClinics}</div>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Across {globalMetrics.totalPartners} partners
              </p>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="shadow-sm border-slate-200 bg-white hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Active Partners</CardTitle>
              <Users className="w-5 h-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900">{globalMetrics.totalPartners}</div>
              <p className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3 h-3" /> 8 new this week
              </p>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="shadow-sm border-slate-200 bg-white hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Pipeline Velocity</CardTitle>
              <Activity className="w-5 h-5 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900">{globalMetrics.newLeadsThisWeek}</div>
              <p className="text-xs text-slate-500 font-medium mt-1">
                New leads added this week
              </p>
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerGroup>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Top Agencies List */}
        <FadeIn delay={0.3} className="lg:col-span-2">
          <Card className="shadow-sm border-slate-200 bg-white h-full">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="text-lg font-bold text-slate-800 flex items-center justify-between">
                Top Performing Master Agencies
                <Button variant="ghost" size="sm" className="text-blue-600 font-semibold hover:bg-blue-50">View All</Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {topAgencies.map((agency, i) => (
                  <div key={i} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 text-white flex items-center justify-center font-black shadow-sm">
                        #{i + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg">{agency.name}</h4>
                        <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
                          <Users className="w-4 h-4" /> Led by {agency.head}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-8">
                      <div className="hidden sm:block">
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Clinics</div>
                        <div className="font-bold text-slate-700">{agency.clinics}</div>
                      </div>
                      <div>
                        <div className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-1">MRR Generated</div>
                        <div className="font-black text-slate-900 text-xl">{formatRupees(agency.mrr)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Internal Team Status */}
        <FadeIn delay={0.4}>
          <Card className="shadow-sm border-slate-200 bg-white h-full">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="text-lg font-bold text-slate-800">Internal Departments</CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-6">
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center"><DollarSign className="w-4 h-4" /></div>
                    <span className="font-bold text-slate-900">Finance Team</span>
                  </div>
                  <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">3 Payouts Pending</span>
                </div>
                <div className="text-sm text-slate-500 pl-10">Last active 2 hrs ago</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center"><Users className="w-4 h-4" /></div>
                    <span className="font-bold text-slate-900">Partner Success</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full">All clear</span>
                </div>
                <div className="text-sm text-slate-500 pl-10">Last active 5 mins ago</div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <Button className="w-full font-bold bg-slate-100 text-slate-700 hover:bg-slate-200">
                  Manage Employees
                </Button>
              </div>

            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
