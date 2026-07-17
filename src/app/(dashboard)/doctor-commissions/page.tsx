import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeIndianRupee, Download, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function DoctorCommissionsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-xl text-white shadow-sm">
              <BadgeIndianRupee className="w-6 h-6" />
            </div>
            Doctor Diary Commissions
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Track your earnings, pending payouts, and performance history.</p>
        </div>
        <Button variant="outline" className="border-slate-200 text-slate-700 font-semibold h-11">
          <Download className="w-4 h-4 mr-2" /> Download Report
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <Card className="border-slate-200 shadow-sm bg-blue-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-blue-800">Total Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 flex items-center">
              ₹45,200
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600">Pending Payout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">₹12,400</div>
            <p className="text-xs text-slate-500 mt-1">Expected: 1st of Next Month</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
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
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-lg font-bold text-slate-800">Recent Transactions</CardTitle>
          <CardDescription>Your latest referral payouts and bonuses.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-12 text-center text-slate-500 flex flex-col items-center">
            <div className="bg-slate-100 p-4 rounded-full mb-4">
              <Calendar className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-1">No transaction history yet</h3>
            <p className="text-sm max-w-md mx-auto">Once your first referred clinic upgrades to a paid plan, your commission will appear here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
