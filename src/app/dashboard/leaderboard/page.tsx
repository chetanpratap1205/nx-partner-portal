import { createClient } from "@/utils/supabase/server";
import { getPartnerProfile } from "../actions";
import { Trophy, Coins } from "lucide-react";
import { LeaderboardPodium, LeaderboardList, RewardsStore } from "./components";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/animations";

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const partner = await getPartnerProfile();

  if (!partner) return null;

  return (
    <div className="space-y-8 pb-12">
      <FadeIn className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <div className="bg-amber-500 p-2 rounded-xl text-white shadow-sm">
              <Trophy className="w-6 h-6" />
            </div>
            NX Partner Leaderboard
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Compete with top partners in your region and unlock exclusive rewards.</p>
        </div>
        
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex items-center gap-4 shrink-0">
          <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-0.5">Your Balance</div>
            <div className="text-2xl font-black text-indigo-900">15,400 <span className="text-sm font-bold text-indigo-600">pts</span></div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <LeaderboardPodium />
      </FadeIn>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            Regional Rankings
          </h2>
          <FadeIn delay={0.2}>
            <LeaderboardList />
          </FadeIn>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            NX Rewards Store
          </h2>
          <p className="text-sm text-slate-500 font-medium">Redeem your NX points for exclusive merchandise and growth tools.</p>
          <FadeIn delay={0.3}>
            <div className="grid gap-4 sm:grid-cols-1">
              <RewardsStore />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
