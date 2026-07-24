"use client";

import { useState, useTransition } from "react";
import { setRoleCookie, AppRole } from "@/app/actions/role-actions";
import { Shield, User, Wallet, Users, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function RoleSwitcher({ currentRole }: { currentRole: AppRole }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const ROLES: { id: AppRole; label: string; icon: any; color: string }[] = [
    { id: 'superadmin', label: 'Founder (God Mode)', icon: Shield, color: 'text-rose-500' },
    { id: 'partner', label: 'External Partner', icon: User, color: 'text-blue-500' },
    { id: 'internal_finance', label: 'Internal Finance', icon: Wallet, color: 'text-emerald-500' },
    { id: 'internal_sales', label: 'Internal Sales Mgr', icon: Users, color: 'text-purple-500' },
  ];

  const handleRoleChange = (role: AppRole) => {
    startTransition(() => {
      setRoleCookie(role);
      setIsOpen(false);
    });
  };

  const activeRole = ROLES.find(r => r.id === currentRole) || ROLES[1];
  const ActiveIcon = activeRole.icon;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-full right-0 mb-4 w-64 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-3 border-b border-slate-700/50 bg-slate-800/50">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dev Tool: Switch Role</div>
              </div>
              <div className="p-2 space-y-1">
                {ROLES.map(role => {
                  const Icon = role.icon;
                  const isActive = currentRole === role.id;
                  return (
                    <button
                      key={role.id}
                      onClick={() => handleRoleChange(role.id)}
                      disabled={isPending}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-sm font-medium transition-colors ${
                        isActive ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${role.color}`} />
                        {role.label}
                      </div>
                      {isActive && <Check className="w-4 h-4 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-full shadow-2xl hover:bg-slate-800 transition-all ${
            isPending ? 'opacity-50 cursor-wait' : ''
          }`}
        >
          <ActiveIcon className={`w-5 h-5 ${activeRole.color}`} />
          <span className="font-semibold text-sm hidden sm:inline-block">Viewing as: {activeRole.label}</span>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
}
