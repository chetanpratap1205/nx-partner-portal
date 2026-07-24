"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Star, Gift, ChevronRight, Lock } from "lucide-react";

const MOCK_LEADERS = [
  { rank: 2, name: "Rahul Sharma", region: "Mumbai", points: 12500, clinics: 42, tier: "Gold" },
  { rank: 1, name: "NX Partner (You)", region: "Maharashtra", points: 15400, clinics: 52, tier: "Platinum" },
  { rank: 3, name: "Vikram Desai", region: "Pune", points: 11200, clinics: 38, tier: "Gold" },
  { rank: 4, name: "Anjali Gupta", region: "Nagpur", points: 8900, clinics: 29, tier: "Silver" },
  { rank: 5, name: "Priya Singh", region: "Nashik", points: 7400, clinics: 21, tier: "Silver" },
];

export function LeaderboardPodium() {
  const top3 = [MOCK_LEADERS[0], MOCK_LEADERS[1], MOCK_LEADERS[2]]; // 2nd, 1st, 3rd for podium layout

  return (
    <div className="bg-slate-900 rounded-3xl p-8 pt-12 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl font-black text-white mb-2">Maharashtra Top Partners</h2>
        <p className="text-slate-400 font-medium">Race to the top to unlock exclusive VIP rewards.</p>
      </div>

      <div className="flex items-end justify-center gap-2 sm:gap-6 relative z-10 h-64 mt-8">
        {top3.map((leader, index) => {
          const isFirst = leader.rank === 1;
          const isSecond = leader.rank === 2;
          
          return (
            <motion.div 
              key={leader.rank}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, type: "spring" }}
              className="flex flex-col items-center w-28 sm:w-40 relative"
            >
              {isFirst && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="absolute -top-12 text-amber-400"
                >
                  <Trophy className="w-10 h-10 fill-amber-400" />
                </motion.div>
              )}
              
              <div className="text-center mb-4">
                <div className="text-white font-bold truncate w-full px-2">{leader.name}</div>
                <div className={`text-xs font-bold mt-1 ${isFirst ? 'text-amber-400' : isSecond ? 'text-slate-300' : 'text-amber-700'}`}>
                  {leader.points.toLocaleString()} pts
                </div>
              </div>

              <div 
                className={`w-full rounded-t-xl border-t border-x relative flex justify-center pt-4 ${
                  isFirst 
                    ? 'h-48 bg-gradient-to-t from-amber-600/20 to-amber-400/20 border-amber-500/50' 
                    : isSecond 
                      ? 'h-36 bg-gradient-to-t from-slate-600/20 to-slate-400/20 border-slate-500/50' 
                      : 'h-28 bg-gradient-to-t from-amber-900/40 to-amber-700/40 border-amber-800/50'
                }`}
              >
                <div className={`text-4xl font-black ${
                  isFirst ? 'text-amber-400' : isSecond ? 'text-slate-300' : 'text-amber-700'
                }`}>
                  {leader.rank}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function LeaderboardList() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-700 flex justify-between text-sm uppercase tracking-wider">
        <div className="w-16 text-center">Rank</div>
        <div className="flex-1">Partner</div>
        <div className="w-24 text-right hidden sm:block">Clinics</div>
        <div className="w-32 text-right">Points</div>
      </div>
      <div className="divide-y divide-slate-100">
        {MOCK_LEADERS.map((leader) => (
          <div key={leader.rank} className={`p-4 flex items-center justify-between transition-colors ${leader.name.includes('(You)') ? 'bg-blue-50/50 hover:bg-blue-50' : 'hover:bg-slate-50'}`}>
            <div className="w-16 text-center font-black text-slate-400">
              #{leader.rank}
            </div>
            <div className="flex-1">
              <div className="font-bold text-slate-900">{leader.name}</div>
              <div className="text-xs font-medium text-slate-500 flex items-center gap-2 mt-0.5">
                <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold ${
                  leader.tier === 'Platinum' ? 'bg-slate-900 text-slate-100' :
                  leader.tier === 'Gold' ? 'bg-amber-100 text-amber-700' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {leader.tier}
                </span>
                {leader.region}
              </div>
            </div>
            <div className="w-24 text-right font-semibold text-slate-700 hidden sm:block">
              {leader.clinics}
            </div>
            <div className="w-32 text-right font-black text-indigo-600">
              {leader.points.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const REWARDS = [
  { id: 1, title: "NX Branded Hoodie", points: 5000, icon: Gift, color: "blue", locked: false },
  { id: 2, title: "₹10,000 FB Ads Credit", points: 15000, icon: Star, color: "emerald", locked: true },
  { id: 3, title: "Apple iPad (10th Gen)", points: 50000, icon: Trophy, color: "purple", locked: true },
];

export function RewardsStore() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {REWARDS.map((reward) => (
        <div key={reward.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          {reward.locked && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center flex-col gap-2">
              <div className="bg-slate-900 p-3 rounded-full text-white shadow-lg">
                <Lock className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-900 text-sm">Need {reward.points.toLocaleString()} pts</span>
            </div>
          )}
          
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
            reward.color === 'blue' ? 'bg-blue-100 text-blue-600' :
            reward.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
            'bg-purple-100 text-purple-600'
          }`}>
            <reward.icon className="w-6 h-6" />
          </div>
          
          <h3 className="font-bold text-slate-900">{reward.title}</h3>
          <div className="text-sm font-semibold text-indigo-600 mt-1 mb-4">{reward.points.toLocaleString()} NX Points</div>
          
          <button className={`w-full py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
            !reward.locked ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-slate-100 text-slate-400'
          }`}>
            {!reward.locked ? 'Redeem Now' : 'Locked'}
            {!reward.locked && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      ))}
    </div>
  );
}
