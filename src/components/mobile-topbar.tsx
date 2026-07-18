'use client';

import { useState } from 'react';
import { Menu, X, Activity, LayoutDashboard, BriefcaseMedical, FileText, Users, LogOut, Wheat, Leaf } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { createClient } from '@/utils/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';

export function MobileTopbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const navItems = [
    { name: 'Overview', href: '/', icon: LayoutDashboard },
    { name: 'Doctor Diary Leads', href: '/doctor-leads', icon: BriefcaseMedical },
    { name: 'Commissions', href: '/doctor-commissions', icon: FileText },
    { name: 'Profile', href: '/profile', icon: Users },
  ];

  const lockedItems = [
    { name: 'Kisan Diary', icon: Wheat },
    { name: 'EUDR Compliance', icon: Leaf },
  ];

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white shadow-sm">
            <Activity className="h-5 w-5" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">NX Partners</span>
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-3/4 max-w-sm bg-white shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-600 p-1.5 rounded-lg text-white shadow-sm">
                    <Activity className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-lg tracking-tight text-slate-900">NX Partners</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-500 hover:bg-slate-100 rounded-md transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'group flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all',
                        pathname === item.href
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      )}
                    >
                      <item.icon
                        className={cn(
                          'h-5 w-5 transition-colors',
                          pathname === item.href ? 'text-blue-600' : 'text-slate-400'
                        )}
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div>
                  <div className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Coming Soon
                  </div>
                  <div className="space-y-1">
                    {lockedItems.map((item) => (
                      <div
                        key={item.name}
                        className="group flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-slate-400 opacity-60"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="h-5 w-5" />
                          {item.name}
                        </div>
                        <div className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">
                          LOCKED
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100">
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:text-red-600 group"
                >
                  <LogOut className="h-5 w-5 text-slate-400 group-hover:text-red-500 transition-colors" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
