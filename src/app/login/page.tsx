"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ArrowRight, ShieldCheck, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { login } from "./actions";
import { toast } from "sonner";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginValues) => {
    setLoading(true);
    try {
      const result = await login(data);
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
    <Card className="border-slate-200/60 shadow-xl shadow-slate-200/40 bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden">
      <CardHeader className="space-y-3 pb-6 bg-slate-50/50">
        <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
          Welcome back
        </CardTitle>
        <CardDescription className="text-slate-500 font-medium">
          Sign in to your partner account to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-semibold">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="partner@naturexpress.in"
                  {...register("email")}
                  className={`pl-10 bg-slate-50 focus-visible:ring-blue-600 h-12 transition-shadow ${errors.email ? 'border-red-500' : 'border-slate-200'}`}
                />
              </div>
              {errors.email && <p className="text-sm text-red-500 font-medium">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-700 font-semibold">Password</Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className={`pl-10 pr-10 bg-slate-50 focus-visible:ring-blue-600 h-12 transition-shadow ${errors.password ? 'border-red-500' : 'border-slate-200'}`}
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
          </div>
          <Button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_20px_rgba(37,99,235,0.2)] h-12 text-base font-bold transition-all group mt-2" type="submit">
            {loading ? "Signing in..." : "Sign in"}
            {!loading && <ArrowRight className="ml-2 h-4 w-4 opacity-70 group-hover:translate-x-1 transition-transform" />}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/apply" className="text-sm text-slate-500 font-medium hover:text-blue-600 transition-colors">
            Don't have an account? Apply to be a partner
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 relative bg-slate-50">
      {/* Left side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-blue-600 text-white relative overflow-hidden">
        {/* Abstract background graphics */}
        <div className="absolute top-0 right-0 p-32 opacity-10 blur-3xl transform translate-x-1/2 -translate-y-1/2 rounded-full bg-white w-96 h-96 pointer-events-none" />
        <div className="absolute bottom-0 left-0 p-32 opacity-20 blur-3xl transform -translate-x-1/2 translate-y-1/2 rounded-full bg-cyan-300 w-96 h-96 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm border border-white/10 shadow-lg">
              <Activity className="h-8 w-8 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight">NatureXpress</span>
          </div>
        </div>

        <div className="relative z-10 max-w-md space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold tracking-tight"
          >
            Partner Command Center
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-blue-100 text-lg leading-relaxed font-medium"
          >
            Manage your leads, track your multi-product commissions, and build your SaaS empire across Doctor Diary, Kisan, and EUDR Compliance.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 text-sm font-medium bg-blue-700/50 backdrop-blur-sm p-4 rounded-xl border border-blue-500/30 w-fit"
          >
            <ShieldCheck className="h-5 w-5 text-blue-300" />
            Enterprise-grade secure portal
          </motion.div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center lg:text-left lg:hidden mb-8">
            <div className="flex justify-center items-center gap-2 mb-4">
               <div className="bg-blue-100 p-2 rounded-xl text-blue-600 shadow-sm">
                  <Activity className="h-6 w-6" />
               </div>
               <span className="font-bold text-xl tracking-tight text-slate-900">NatureXpress</span>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoginForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
