import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ArrowRight, ShieldCheck } from "lucide-react";
import { login } from "./actions";

export default async function LoginPage(props: { searchParams: Promise<{ error?: string }> }) {
  const searchParams = await props.searchParams;
  const error = searchParams.error;

  return (
    <div className="min-h-screen grid lg:grid-cols-2 relative bg-slate-50">
      {/* Left side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-blue-600 text-white relative overflow-hidden">
        {/* Abstract background graphics */}
        <div className="absolute top-0 right-0 p-32 opacity-10 blur-3xl transform translate-x-1/2 -translate-y-1/2 rounded-full bg-white w-96 h-96 pointer-events-none" />
        <div className="absolute bottom-0 left-0 p-32 opacity-10 blur-3xl transform -translate-x-1/2 translate-y-1/2 rounded-full bg-cyan-300 w-96 h-96 pointer-events-none" />

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
            Partner Command Center
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed font-medium">
            Manage your leads, track your multi-product commissions, and build your SaaS empire across Doctor Diary, Kisan, and EUDR Compliance.
          </p>
          <div className="flex items-center gap-3 text-sm font-medium bg-blue-700/50 backdrop-blur-sm p-4 rounded-xl border border-blue-500/30 w-fit">
            <ShieldCheck className="h-5 w-5 text-blue-300" />
            Enterprise-grade secure portal
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center lg:text-left lg:hidden mb-8">
            <div className="flex justify-center items-center gap-2 mb-4">
               <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
                  <Activity className="h-6 w-6" />
               </div>
               <span className="font-bold text-xl tracking-tight text-slate-900">NatureXpress</span>
            </div>
          </div>
          
          <Card className="border-slate-200/60 shadow-xl shadow-slate-200/40 bg-white/80 backdrop-blur-xl">
            <CardHeader className="space-y-3 pb-6">
              <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                Welcome back
              </CardTitle>
              <CardDescription className="text-slate-500 font-medium">
                Sign in to your partner account to continue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={login} className="space-y-5">
                {error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2">
                    <span className="font-medium">Error:</span> {error}
                  </div>
                )}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700 font-semibold">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="partner@naturexpress.in"
                      required
                      className="bg-white border-slate-200 focus-visible:ring-blue-600 h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-slate-700 font-semibold">Password</Label>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      placeholder="••••••••"
                      className="bg-white border-slate-200 focus-visible:ring-blue-600 h-11"
                    />
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200 h-11 text-base font-semibold transition-all group" type="submit">
                  Sign in
                  <ArrowRight className="ml-2 h-4 w-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
