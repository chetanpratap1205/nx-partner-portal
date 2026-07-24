import { createClient } from "@/utils/supabase/server";
import { getPartnerProfile } from "../actions";
import { BotMessageSquare } from "lucide-react";
import { ObjectionHandler } from "./objection-handler";
import { FadeIn } from "@/components/animations";

export default async function PlaybookPage() {
  const supabase = await createClient();
  const partner = await getPartnerProfile();

  if (!partner) return null;

  return (
    <div className="space-y-6 pb-12">
      <FadeIn className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-sm">
              <BotMessageSquare className="w-6 h-6" />
            </div>
            AI Sales Playbook
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Instantly counter any doctor objection using our proven scripts.</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <ObjectionHandler />
      </FadeIn>
    </div>
  );
}
