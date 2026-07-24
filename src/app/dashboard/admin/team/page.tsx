import { Shield, ShieldAlert, Users } from "lucide-react";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/animations";
import { InviteEmployeeForm } from "./invite-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRoleCookie } from "@/app/actions/role-actions";
import { redirect } from "next/navigation";

export default async function InternalTeamPage() {
  const currentRole = await getRoleCookie();
  
  if (currentRole !== 'superadmin') {
    redirect('/dashboard');
  }

  // Mock list of internal employees
  const employees = [
    { id: 1, name: "Chetan Pratap", email: "founder@naturexpress.in", role: "Superadmin", department: "Executive" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <FadeIn className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-3">
            <div className="bg-slate-900 p-2 rounded-xl text-white shadow-sm">
              <Shield className="w-6 h-6" />
            </div>
            Internal Team & Security
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Strictly manage internal access. Invite employees to specific departments bypassing the public signup.
          </p>
        </div>
      </FadeIn>

      <div className="grid lg:grid-cols-3 gap-8">
        <FadeIn delay={0.2} className="lg:col-span-1">
          <Card className="shadow-sm border-slate-200 h-full border-t-4 border-t-slate-900">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-lg font-bold text-slate-800">Invite Internal Employee</CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <InviteEmployeeForm />
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.3} className="lg:col-span-2">
          <Card className="shadow-sm border-slate-200 h-full">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-lg font-bold text-slate-800 flex items-center justify-between">
                Active Internal Roster
                <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">Secure Roster</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {employees.map((emp) => (
                  <div key={emp.id} className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold">
                        {emp.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{emp.name}</h4>
                        <p className="text-sm text-slate-500 font-medium">{emp.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded">
                        <ShieldAlert className="w-3 h-3" /> {emp.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
