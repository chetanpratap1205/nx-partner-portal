"use client";

import { useState } from "react";
import { inviteInternalEmployee } from "@/app/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Mail, Shield, ShieldCheck, Loader2 } from "lucide-react";
import { AppRole } from "@/app/actions/role-actions";

export function InviteEmployeeForm() {
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await inviteInternalEmployee(formData);
      if (result.success) {
        setSuccess(result.message);
        (e.target as HTMLFormElement).reset();
      }
    } catch (err: any) {
      setError(err.message || "Failed to invite employee");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 mt-0.5 shrink-0" />
          <div>
            <p className="font-bold">Invitation Sent Securely</p>
            <p className="text-sm mt-1">{success}</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-semibold">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
        <input 
          type="text" 
          name="name"
          required
          className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="e.g. Aditi Sharma" 
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">Work Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
          <input 
            type="email" 
            name="email"
            required
            className="w-full border border-slate-200 rounded-lg p-2.5 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="aditi@naturexpress.in" 
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">Security Role</label>
        <select 
          name="role"
          required
          className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-700"
        >
          <option value="" disabled selected>Select an internal department role...</option>
          <option value="internal_finance">Finance Manager (Payouts & MRR)</option>
          <option value="internal_sales">Partner Success Manager (CRM Oversight)</option>
          <option value="superadmin">Co-Founder / Superadmin (God Mode)</option>
        </select>
        <p className="text-xs text-slate-500 font-medium mt-2 flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-emerald-500" /> This locks their access securely to their department.
        </p>
      </div>

      <div className="pt-4">
        <Button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-11"
        >
          {isPending ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Provisioning Secure Account...</>
          ) : (
            "Send Secure Invitation"
          )}
        </Button>
      </div>
    </form>
  );
}
