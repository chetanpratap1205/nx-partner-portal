'use client';

import { motion } from 'framer-motion';
import { Trophy, Zap, Star, Crown } from 'lucide-react';

const TIERS = [
  { name: 'Starter', min: 0, max: 5, color: 'from-slate-400 to-slate-500', icon: Zap, pct: 20, bg: 'bg-slate-100', text: 'text-slate-700' },
  { name: 'Silver', min: 5, max: 15, color: 'from-blue-400 to-blue-600', icon: Star, pct: 25, bg: 'bg-blue-100', text: 'text-blue-700' },
  { name: 'Gold', min: 15, max: 30, color: 'from-yellow-400 to-amber-500', icon: Trophy, pct: 30, bg: 'bg-yellow-100', text: 'text-yellow-700' },
  { name: 'Platinum', min: 30, max: 999, color: 'from-purple-500 to-indigo-600', icon: Crown, pct: 35, bg: 'bg-purple-100', text: 'text-purple-700' },
];

export function TierProgressBar({ conversions }: { conversions: number }) {
  const currentTier = TIERS.findLast((t) => conversions >= t.min) ?? TIERS[0];
  const nextTier = TIERS[TIERS.indexOf(currentTier) + 1];

  const progress = nextTier
    ? Math.min(((conversions - currentTier.min) / (nextTier.min - currentTier.min)) * 100, 100)
    : 100;

  const Icon = currentTier.icon;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${currentTier.bg}`}>
            <Icon className={`w-4 h-4 ${currentTier.text}`} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Current Tier</p>
            <p className={`font-extrabold text-base ${currentTier.text}`}>{currentTier.name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">Commission Rate</p>
          <p className="font-extrabold text-lg text-slate-900">{currentTier.pct}%</p>
        </div>
      </div>

      <div className="relative w-full bg-slate-100 rounded-full h-3 overflow-hidden">
        <motion.div
          className={`absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r ${currentTier.color}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
        />
      </div>

      <div className="flex justify-between items-center mt-2">
        <p className="text-xs text-slate-500">
          <span className="font-bold text-slate-700">{conversions}</span> conversions
        </p>
        {nextTier ? (
          <p className="text-xs font-semibold text-emerald-600">
            🚀 {nextTier.min - conversions} more to <span className="font-extrabold">{nextTier.name}</span> ({nextTier.pct}%)
          </p>
        ) : (
          <p className="text-xs font-bold text-purple-700">👑 Max Tier Achieved!</p>
        )}
      </div>

      {/* Tier roadmap */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
        {TIERS.map((tier, i) => {
          const TIcon = tier.icon;
          const isActive = tier.name === currentTier.name;
          const isUnlocked = conversions >= tier.min;
          return (
            <div key={tier.name} className="flex flex-col items-center gap-1 flex-1">
              <div className={`p-1.5 rounded-full transition-all ${isActive ? tier.bg + ' ring-2 ring-offset-1 ring-current ' + tier.text : isUnlocked ? tier.bg + ' ' + tier.text : 'bg-slate-100 text-slate-300'}`}>
                <TIcon className="w-3.5 h-3.5" />
              </div>
              <p className={`text-[10px] font-bold ${isActive ? tier.text : isUnlocked ? 'text-slate-600' : 'text-slate-300'}`}>{tier.name}</p>
              {i < TIERS.length - 1 && (
                <div className="absolute" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
