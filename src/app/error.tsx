"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Activity, AlertTriangle, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service like Sentry or PostHog here
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#050505] text-slate-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl text-center shadow-2xl"
      >
        <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>
        
        <h1 className="text-2xl font-bold tracking-tight mb-2">Something went wrong!</h1>
        <p className="text-slate-400 mb-8 text-sm leading-relaxed">
          We encountered an unexpected error on our end. Our engineering team has been notified.
        </p>

        <div className="space-y-4">
          <Button 
            onClick={() => reset()} 
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold h-12"
          >
            <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
          </Button>
          
          <Link href="/">
            <Button variant="outline" className="w-full h-12 border-white/10 bg-transparent hover:bg-white/5 text-white">
              <Activity className="mr-2 h-4 w-4" /> Return to Homepage
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
