"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Building2, User, Phone, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { submitApplication } from "./actions";

export default function ApplyPage(props: { searchParams?: { error?: string } }) {
  const error = props.searchParams?.error;
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-50 flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <Link href="/" className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-emerald-500 flex items-center justify-center text-black">NX</div>
          Partners
        </Link>
        <Link href="/login" className="text-sm text-slate-400 font-medium hover:text-white transition-colors">
          Already a partner? Login
        </Link>
      </nav>

      <main className="flex-1 flex items-center justify-center relative z-10 p-6">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Join NX Partners</h1>
              <p className="text-slate-400">Get your referral code instantly and start earning lifetime recurring commissions.</p>
            </div>

            <form action={submitApplication} onSubmit={() => setLoading(true)} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-400 bg-red-950/50 border border-red-900/50 rounded-lg">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-slate-300">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                  <Input id="fullName" name="fullName" required className="pl-10 bg-white/5 border-white/10 text-white h-12 focus-visible:ring-emerald-500" placeholder="John Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-300">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                  <Input id="phone" name="phone" type="tel" required className="pl-10 bg-white/5 border-white/10 text-white h-12 focus-visible:ring-emerald-500" placeholder="+91 98765 43210" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-slate-300">City</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                  <Input id="city" name="city" required className="pl-10 bg-white/5 border-white/10 text-white h-12 focus-visible:ring-emerald-500" placeholder="e.g. Mumbai" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Email (For Login)</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                  <Input id="email" name="email" type="email" required className="pl-10 bg-white/5 border-white/10 text-white h-12 focus-visible:ring-emerald-500" placeholder="partner@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                  <Input id="password" name="password" type="password" required className="pl-10 bg-white/5 border-white/10 text-white h-12 focus-visible:ring-emerald-500" placeholder="••••••••" />
                </div>
              </div>

              <Button disabled={loading} type="submit" className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-base mt-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                {loading ? "Creating Account..." : "Create Partner Account"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
