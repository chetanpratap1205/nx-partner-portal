"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Activity, ArrowRight, Building2, User, Phone, Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { submitApplication } from "./actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const applySchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  city: z.string().min(2, "City is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type ApplyValues = z.infer<typeof applySchema>;

export default function ApplyPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplyValues>({
    resolver: zodResolver(applySchema),
  });

  const onSubmit = async (data: ApplyValues) => {
    setLoading(true);
    try {
      const result = await submitApplication(data);
      if (result?.error) {
        toast.error(result.error);
      }
    } catch (e) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 relative bg-slate-50">
      {/* Left side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-emerald-600 text-white relative overflow-hidden">
        {/* Abstract background graphics */}
        <div className="absolute top-0 right-0 p-32 opacity-20 blur-3xl transform translate-x-1/3 -translate-y-1/3 rounded-full bg-emerald-300 w-96 h-96 pointer-events-none" />
        <div className="absolute bottom-0 left-0 p-32 opacity-20 blur-3xl transform -translate-x-1/3 translate-y-1/3 rounded-full bg-cyan-300 w-96 h-96 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm border border-white/10">
              <Activity className="h-8 w-8 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight">NatureXpress</span>
          </div>
        </div>

        <div className="relative z-10 max-w-md space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Become a Partner
          </h1>
          <p className="text-emerald-50 text-lg leading-relaxed font-medium">
            Join the NatureXpress partner network. Get your referral code instantly and start earning lifetime recurring commissions.
          </p>
          <div className="flex items-center gap-3 text-sm font-medium bg-emerald-700/50 backdrop-blur-sm p-4 rounded-xl border border-emerald-500/30 w-fit">
            <ShieldCheck className="h-5 w-5 text-emerald-200" />
            Enterprise-grade secure portal
          </div>
        </div>
      </div>

      {/* Right side - Apply Form */}
      <div className="flex items-center justify-center p-6 lg:p-12 relative z-10 w-full overflow-y-auto max-h-screen no-scrollbar">
        <div className="w-full max-w-md">
          <div className="text-center lg:text-left lg:hidden mb-8">
            <div className="flex justify-center items-center gap-2 mb-4">
               <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600">
                  <Activity className="h-6 w-6" />
               </div>
               <span className="font-bold text-xl tracking-tight text-slate-900">NatureXpress</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl shadow-slate-200/40 rounded-2xl p-8"
          >
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">Join NX Partners</h1>
              <p className="text-slate-500 text-sm">Fill in your details below to instantly generate your referral code.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-slate-700 font-semibold">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                  <Input 
                    id="fullName" 
                    {...register("fullName")}
                    className={`pl-10 h-12 bg-slate-50 transition-shadow ${errors.fullName ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-200 focus-visible:ring-emerald-500'}`} 
                    placeholder="John Doe" 
                  />
                </div>
                {errors.fullName && <p className="text-sm text-red-500 font-medium">{errors.fullName.message}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-700 font-semibold">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                    <Input 
                      id="phone" 
                      type="tel" 
                      {...register("phone")}
                      className={`pl-10 h-12 bg-slate-50 transition-shadow ${errors.phone ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-200 focus-visible:ring-emerald-500'}`} 
                      placeholder="+91..." 
                    />
                  </div>
                  {errors.phone && <p className="text-sm text-red-500 font-medium">{errors.phone.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-slate-700 font-semibold">City</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                    <Input 
                      id="city" 
                      {...register("city")}
                      className={`pl-10 h-12 bg-slate-50 transition-shadow ${errors.city ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-200 focus-visible:ring-emerald-500'}`} 
                      placeholder="Mumbai" 
                    />
                  </div>
                  {errors.city && <p className="text-sm text-red-500 font-medium">{errors.city.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-semibold">Email (For Login)</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                  <Input 
                    id="email" 
                    type="email" 
                    {...register("email")}
                    className={`pl-10 h-12 bg-slate-50 transition-shadow ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-200 focus-visible:ring-emerald-500'}`} 
                    placeholder="partner@example.com" 
                  />
                </div>
                {errors.email && <p className="text-sm text-red-500 font-medium">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-semibold">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    {...register("password")}
                    className={`pl-10 pr-10 h-12 bg-slate-50 transition-shadow ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-200 focus-visible:ring-emerald-500'}`} 
                    placeholder="••••••••" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-500 font-medium">{errors.password.message}</p>}
              </div>

              <Button disabled={loading} type="submit" className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base mt-4 shadow-[0_0_20px_rgba(5,150,105,0.2)] transition-all group">
                {loading ? "Creating Account..." : "Create Partner Account"} 
                {!loading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/login" className="text-sm text-slate-500 font-medium hover:text-emerald-600 transition-colors">
                Already a partner? Sign in instead
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
