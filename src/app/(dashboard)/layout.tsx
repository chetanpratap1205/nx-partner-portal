import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { MobileTopbar } from "@/components/mobile-topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <div className="hidden lg:block shrink-0">
        <DashboardSidebar />
      </div>
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="lg:hidden shrink-0">
          <MobileTopbar />
        </div>
        
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
