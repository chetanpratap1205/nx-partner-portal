import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeIndianRupee, Download, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPartnerProfile } from "../actions";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/animations";

import { AnimatedMRR, PayoutCountdown, TierProgressBar } from "./dopamine-widgets";
import { Zap } from "lucide-react";

export default async function DoctorCommissionsPage() {
  const supabase = await createClient();
  const partner = await getPartnerProfile();

  if (!partner) return null;

  // Fetch commission payouts
  const { data: payoutsSafe } = await supabase
    .from('commission_payouts')
    .select('*')
    .eq('partner_id', partner.id);

  // Fetch converted leads for MRR calc
  const { data: convertedLeads } = await supabase
    .from('doctor_leads')
    .select('id')
    .eq('assigned_to', partner.id)
    .eq('status', 'converted');

  const activeClinics = convertedLeads?.length || 0;
  const currentMRR = activeClinics * 2500; // avg subscription
  const currentTier = activeClinics < 6 ? 'Bronze' : activeClinics < 21 ? 'Silver' : activeClinics < 50 ? 'Gold' : 'Platinum';
  const nextTierClinics = activeClinics < 6 ? 6 : activeClinics < 21 ? 21 : activeClinics < 50 ? 50 : null;
  const tierProgress = nextTierClinics ? (activeClinics / nextTierClinics) * 100 : 100;

  const payouts = payoutsSafe || [];

  // Calculate totals
  const totalEarnedPaise = payouts
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + (p.commission_paise || 0), 0);

  const pendingPayoutPaise = payouts
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + (p.commission_paise || 0), 0);

  const formatRupees = (paise: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(paise / 100);
  };

  return (
    <div className="space-y-6 pb-12">
      <FadeIn>
        <div className="bg-[#050505] rounded-3xl p-8 relative overflow-hidden text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-wider mb-6">
                <Zap className="w-3 h-3 text-emerald-400" />
                Live MRR Tracker
              </div>
              
              <div className="text-slate-400 font-medium mb-1">Your Monthly Recurring Revenue</div>
              <div className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">
                <AnimatedMRR value={currentMRR} />
              </div>
              
              <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Current Tier</div>
                    <div className="text-xl font-bold text-emerald-400">{currentTier} Partner</div>
                  </div>
                  {nextTierClinics && (
                    <div className="text-right">
                      <div className="text-sm font-bold text-white">{activeClinics} / {nextTierClinics} Clinics</div>
                      <div className="text-xs text-slate-400">until next tier</div>
                    </div>
                  )}
                </div>
                {nextTierClinics && (
                  <TierProgressBar progress={tierProgress} />
                )}
              </div>
            </div>
            
            <div className="w-full md:w-80 shrink-0 flex flex-col justify-between">
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-sm text-amber-200/90 leading-relaxed">
                <strong className="block mb-1 text-amber-400">Direct Bank Payouts</strong>
                Payouts are processed directly via bank transfer by your NX Partner Manager outside of this portal. Status updates below may have a slight delay.
              </div>
              <PayoutCountdown />
            </div>
          </div>
        </div>
      </FadeIn>

      <StaggerGroup className="grid gap-6 sm:grid-cols-3">
        <StaggerItem>
          <Card className="border-slate-200 shadow-sm bg-blue-50/50 hover:shadow-md transition-shadow h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-blue-800">Total Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900 flex items-center">
                {formatRupees(totalEarnedPaise)}
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
        
        <StaggerItem>
          <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-slate-600">Pending Payout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{formatRupees(pendingPayoutPaise)}</div>
              <p className="text-xs text-slate-500 mt-1">Expected: 1st of Next Month</p>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-slate-600">Next Target Bonus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-slate-900">₹5,000</div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '80%' }}></div>
              </div>
              <p className="text-xs text-slate-500 mt-2">2 conversions remaining to unlock bonus</p>
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerGroup>

      <FadeIn delay={0.2}>
        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="text-lg font-bold text-slate-800">Recent Transactions</CardTitle>
            <CardDescription>Your latest referral payouts and bonuses.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {payouts.length === 0 ? (
              <div className="p-12 text-center text-slate-500 flex flex-col items-center">
                <div className="bg-slate-100 p-4 rounded-full mb-4">
                  <Calendar className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-700 mb-1">No transaction history yet</h3>
                <p className="text-sm max-w-md mx-auto">Once your first referred clinic upgrades to a paid plan, your commission will appear here.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {payouts.map((payout) => (
                  <div key={payout.id} className="p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${
                        payout.status === 'paid' ? 'bg-emerald-100 text-emerald-600' : 
                        payout.status === 'pending' ? 'bg-amber-100 text-amber-600' : 
                        'bg-slate-100 text-slate-600'
                      }`}>
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">
                          {payout.type === 'first_sale' ? 'First Sale Commission' : 'Renewal Commission'}
                        </h4>
                        <p className="text-sm text-slate-500">
                          Lead ID: {payout.lead_id}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">{formatRupees(payout.commission_paise || 0)}</div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium inline-block mt-1 ${
                        payout.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                        payout.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {payout.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
