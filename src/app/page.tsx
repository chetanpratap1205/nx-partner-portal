"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Activity, BarChart3, TrendingUp, Zap, Lock } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const [clinics, setClinics] = useState(10);
  const [tier, setTier] = useState("Silver");
  const [commissionRate, setCommissionRate] = useState(20);
  
  // Calculate MRR (assuming average clinic subscription is ₹2,500/mo)
  const avgSubscription = 2500;
  const mrr = clinics * avgSubscription;
  const monthlyCommission = (mrr * commissionRate) / 100;
  const yearlyCommission = monthlyCommission * 12;

  useEffect(() => {
    if (clinics < 10) {
      setTier("Silver");
      setCommissionRate(20);
    } else if (clinics < 30) {
      setTier("Gold");
      setCommissionRate(25);
    } else {
      setTier("Platinum");
      setCommissionRate(30);
    }
  }, [clinics]);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-50 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 overflow-hidden relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500 p-2 rounded-lg">
            <Activity className="h-6 w-6 text-black" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">NX Partners</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">
            Member Login
          </Link>
          <Link href="/apply">
            <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md rounded-full px-6 transition-all">
              Apply Now
            </Button>
          </Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Invite-Only Program
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500">
              The Elite Partner Engine for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Healthcare Wealth.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
              We aren't looking for standard affiliates. We are recruiting top-tier closers to distribute Doctor Diary—the fastest growing SaaS for clinics.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/apply">
                <Button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 h-14 px-8 text-lg font-bold rounded-full transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] group">
                  Apply for Partnership
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Scarcity Indicator */}
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500 font-medium">
              <Lock className="w-4 h-4 text-amber-500" />
              <span>Strictly limited to <strong className="text-white">5 partners</strong> per city. (3 spots remaining in your region).</span>
            </div>
          </motion.div>
        </section>

        {/* Dynamic ROI Calculator (Wow Factor) */}
        <section className="mt-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-16 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 pointer-events-none" />
            
            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Predictable, Lifetime <br />
                  <span className="text-emerald-400">Recurring Revenue.</span>
                </h2>
                <p className="text-slate-400 text-lg mb-10">
                  Slide the calculator to see your exact potential earnings. Unlike traditional platforms, we pay you a lifetime percentage for as long as the clinic stays with us.
                </p>

                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-3">
                      <span className="text-slate-300">Clinics Onboarded</span>
                      <span className="text-emerald-400 text-lg">{clinics} Clinics</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      value={clinics}
                      onChange={(e) => setClinics(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                  </div>

                  <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex-1">
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Current Tier</div>
                      <div className={`font-bold text-lg ${tier === 'Platinum' ? 'text-purple-400' : tier === 'Gold' ? 'text-amber-400' : 'text-slate-300'}`}>
                        {tier}
                      </div>
                    </div>
                    <div className="w-px bg-white/10" />
                    <div className="flex-1">
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Commission</div>
                      <div className="font-bold text-lg text-emerald-400">{commissionRate}% / mo</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Earnings Output */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl blur opacity-20 animate-pulse" />
                <div className="relative bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center gap-2 mb-8">
                    <BarChart3 className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Your Projected Earnings</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="pb-6 border-b border-white/10">
                      <div className="text-slate-500 font-medium text-sm mb-2">Monthly Recurring Revenue</div>
                      <div className="text-5xl font-black tracking-tighter text-white">
                        ₹{monthlyCommission.toLocaleString()}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-slate-500 font-medium text-sm mb-2 flex items-center justify-between">
                        Yearly Projection 
                        <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">LIFETIME</span>
                      </div>
                      <div className="text-4xl font-bold tracking-tight text-slate-300">
                        ₹{yearlyCommission.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features / Gamification Preview */}
        <section className="mt-40">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">We Make Selling Unfairly Easy.</h2>
            <p className="text-slate-400 text-lg">You open the door. Our software does the rest.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="w-6 h-6 text-yellow-400" />,
                title: "Real-time CRM",
                desc: "Track every lead in a stunning Kanban board. Know exactly when they view your pitch."
              },
              {
                icon: <Activity className="w-6 h-6 text-emerald-400" />,
                title: "Dopamine Payouts",
                desc: "Get an instant push notification and \"Ka-ching\" the moment a clinic pays. Fast weekly payouts."
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-blue-400" />,
                title: "Elite Enablement",
                desc: "Custom QR codes, auto-generated pitch decks, and AI-powered objection handling scripts."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
              >
                <div className="bg-black/50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-white/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
