"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export function CopyLink({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button 
      onClick={handleCopy}
      variant="outline" 
      className="shrink-0 h-11 px-4 border-slate-200 text-slate-700 bg-white hover:bg-slate-50 transition-colors"
    >
      {copied ? <Check className="w-4 h-4 text-emerald-600 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
      {copied ? "Copied!" : "Copy Link"}
    </Button>
  );
}
