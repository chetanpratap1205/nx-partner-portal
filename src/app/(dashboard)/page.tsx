import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BriefcaseMedical, TrendingUp, BarChart3 } from "lucide-react";
import { MultiProductShowcase } from "@/components/multi-product-showcase";
import { getPartnerProfile } from "./actions";
import { DashboardCharts } from "@/components/dashboard-charts";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/animations";

// Dummy Activity icon since it's not imported at the top
function Activity(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const partner = await getPartnerProfile();

  if (!partner) return null;

  // Fetch leads and calculate stats
  const { data: leadsSafe } = await supabase
    .from('doctor_leads')
    .select('*')
    .eq('assigned_to', partner.id);
  
  const leads = leadsSafe || [];
  const totalLeads = leads.length;
  const activeConversions = leads.filter(l => l.status === 'converted').length;

  // Fetch commissions
  const { data: payoutsSafe } = await supabase
    .from('commission_payouts')
    .select('*')
    .eq('partner_id', partner.id);
    
  const payouts = payoutsSafe || [];
  const totalEarnedPaise = payouts
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + (p.commission_paise || 0), 0);

  const formatRupees = (paise: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(paise / 100);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Section */}
      <FadeIn className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome back, {partner.name || 'Partner'}!
          </h1>
          <p className="text-slate-500 mt-1">
            Here's what's happening in your territory ({partner.region || 'Unassigned'}) today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-200 shadow-sm rounded-lg px-4 py-2 flex flex-col">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Referral Code</span>
            <span className="font-mono font-bold text-blue-600">{partner.referral_code || 'PENDING'}</span>
          </div>
        </div>
      </FadeIn>

      {/* Stats Overview */}
      <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StaggerItem>
          <Card className="shadow-sm border-slate-200 hover:border-slate-300 transition-colors h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-semibold text-slate-600">Total Leads</CardTitle>
              <BriefcaseMedical className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{totalLeads}</div>
              <p className="text-xs text-slate-500 font-medium flex items-center mt-1">
                Active in pipeline
              </p>
            </CardContent>
          </Card>
        </StaggerItem>
        
        <StaggerItem>
          <Card className="shadow-sm border-slate-200 hover:border-slate-300 transition-colors h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-semibold text-slate-600">Active Conversions</CardTitle>
              <Activity className="w-4 h-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{activeConversions}</div>
              <p className="text-xs text-emerald-600 font-medium flex items-center mt-1">
                Target: {partner.target_monthly || 10}
              </p>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem className="sm:col-span-2">
          <Card className="shadow-sm border-slate-200 hover:border-slate-300 transition-colors h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-semibold text-slate-600">Commissions Earned</CardTitle>
              <div className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold">Total Paid</div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{formatRupees(totalEarnedPaise)}</div>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Based on {partner.commission_first_sale_pct || 30}% first sale commission
              </p>
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerGroup>

      {/* Analytics Chart */}
      <FadeIn delay={0.3}>
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" /> Lead Pipeline Status
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {leads.length > 0 ? (
              <DashboardCharts leads={leads} />
            ) : (
              <div className="h-[300px] flex items-center justify-center flex-col text-slate-400">
                <BarChart3 className="w-12 h-12 mb-4 opacity-50" />
                <p>Add some leads to see your pipeline visualization!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </FadeIn>

      {/* Multi-Product Showcase (The Wow Factor) */}
      <FadeIn delay={0.4} className="space-y-4 pt-4">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          NatureXpress Products
        </h2>
        <p className="text-slate-500 text-sm mb-6">Manage your active products or unlock new ones by reaching your targets.</p>
        
        <MultiProductShowcase />
      </FadeIn>
    </div>
  );
}
