"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, LayoutDashboard, LogOut, Users, FileText, BriefcaseMedical, Wheat, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";

export function DashboardSidebar() {
  const pathname = usePathname();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const navItems = [
    { name: "Overview", href: "/", icon: LayoutDashboard },
    { name: "Doctor Diary Leads", href: "/doctor-leads", icon: BriefcaseMedical },
    { name: "Commissions", href: "/doctor-commissions", icon: FileText },
  ];

  const lockedItems = [
    { name: "Kisan Diary", icon: Wheat },
    { name: "EUDR Compliance", icon: Leaf },
  ];

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-slate-200 shadow-sm">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-sm shadow-blue-200">
            <Activity className="h-5 w-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">NX Partners</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-4 space-y-8">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                pathname === item.href
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-colors",
                  pathname === item.href ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
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
                className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 opacity-60 cursor-not-allowed"
                title="Unlock by hitting targets in Doctor Diary"
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
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:text-red-600 group"
        >
          <LogOut className="h-5 w-5 text-slate-400 group-hover:text-red-500 transition-colors" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
