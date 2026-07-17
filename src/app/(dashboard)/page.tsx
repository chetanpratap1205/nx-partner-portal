import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BriefcaseMedical, Wheat, Leaf, Lock, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { MultiProductShowcase } from "@/components/multi-product-showcase";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch partner info
  const { data: partner } = await supabase
    .from('growth_partners')
    .select('*')
    .eq('auth_user_id', user.id)
    .single();

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome back, {partner?.name || 'Partner'}!
          </h1>
          <p className="text-slate-500 mt-1">
            Here's what's happening in your territory ({partner?.region || 'Unassigned'}) today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-200 shadow-sm rounded-lg px-4 py-2 flex flex-col">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Referral Code</span>
            <span className="font-mono font-bold text-blue-600">{partner?.referral_code || 'PENDING'}</span>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-slate-600">Total Leads</CardTitle>
            <BriefcaseMedical className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">24</div>
            <p className="text-xs text-emerald-600 font-medium flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" /> +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-slate-600">Active Conversions</CardTitle>
            <Activity className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">8</div>
            <p className="text-xs text-emerald-600 font-medium flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" /> Target: {partner?.target_monthly || 10}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-slate-200 sm:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-slate-600">Commissions Earned</CardTitle>
            <div className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">This Month</div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">₹45,200</div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Based on {partner?.commission_first_sale_pct || 30}% first sale commission
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Multi-Product Showcase (The Wow Factor) */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          NatureXpress Products
        </h2>
        <p className="text-slate-500 text-sm mb-6">Manage your active products or unlock new ones by reaching your targets.</p>
        
        <MultiProductShowcase />
      </div>
    </div>
  );
}

// Dummy Activity icon since it's not imported at the top
function Activity(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>;
}
