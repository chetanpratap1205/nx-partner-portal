"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export function AnimatedMRR({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; // 1.5 seconds
    const increment = value / (duration / 16); // 60fps
    
    if (value === 0) {
      setDisplayValue(0);
      return;
    }

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="tabular-nums">
      {new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(displayValue)}
    </span>
  );
}

export function PayoutCountdown() {
  const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, mins: number, secs: number } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // Next payout is 1st of next month
      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const difference = nextMonth.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return <div className="h-10 animate-pulse bg-slate-100 rounded-lg w-full mt-4" />;

  return (
    <div className="mt-6 pt-4 border-t border-slate-100/10">
      <div className="flex items-center gap-2 text-sm font-semibold text-amber-500/80 uppercase tracking-wider mb-3">
        <Clock className="w-4 h-4" /> Next Payout Countdown
      </div>
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm border border-white/5">
          <div className="text-xl font-black text-white tabular-nums">{String(timeLeft.days).padStart(2, '0')}</div>
          <div className="text-[10px] text-white/50 uppercase font-bold mt-1">Days</div>
        </div>
        <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm border border-white/5">
          <div className="text-xl font-black text-white tabular-nums">{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className="text-[10px] text-white/50 uppercase font-bold mt-1">Hours</div>
        </div>
        <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm border border-white/5">
          <div className="text-xl font-black text-white tabular-nums">{String(timeLeft.mins).padStart(2, '0')}</div>
          <div className="text-[10px] text-white/50 uppercase font-bold mt-1">Mins</div>
        </div>
        <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm border border-white/5">
          <div className="text-xl font-black text-white tabular-nums">{String(timeLeft.secs).padStart(2, '0')}</div>
          <div className="text-[10px] text-white/50 uppercase font-bold mt-1">Secs</div>
        </div>
      </div>
    </div>
  );
}

export function TierProgressBar({ progress }: { progress: number }) {
  return (
    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
      />
    </div>
  );
}
