import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Activity, MapPinOff } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#050505] text-slate-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-2">
          <MapPinOff className="h-10 w-10 text-cyan-400" />
        </div>
        
        <h1 className="text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500">
          404
        </h1>
        <h2 className="text-2xl font-bold tracking-tight">Page Not Found</h2>
        
        <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
          The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
        </p>

        <div className="pt-6">
          <Link href="/">
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold h-12 px-8 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <Activity className="mr-2 h-4 w-4" /> Return to Command Center
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
