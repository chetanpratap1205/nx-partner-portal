import { getPartnerProfile } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Link as LinkIcon, Download, MessageSquare, Mail, QrCode, FileText } from "lucide-react";
import { CopyLink } from "./copy-link";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/animations";
import Image from "next/image";

export default async function SalesToolkitPage() {
  const partner = await getPartnerProfile();
  if (!partner) return null;

  const referralLink = `https://doctor.naturexpress.in/?ref=${partner.referral_code}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(referralLink)}&color=050505`;

  return (
    <div className="space-y-8 pb-12">
      <FadeIn>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-sm">
              <Zap className="w-6 h-6" />
            </div>
            Sales Enablement Toolkit
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Your command center for closing clinics. Grab your links, QR codes, and scripts below.</p>
        </div>
      </FadeIn>

      <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Referral Link & QR Code */}
        <StaggerItem className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-blue-600" /> Your Tracking Link
              </CardTitle>
              <CardDescription>Share this link to ensure you get credited for the conversion.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-3 font-mono text-sm text-slate-700 flex items-center overflow-hidden">
                  <span className="truncate">{referralLink}</span>
                </div>
                <CopyLink text={referralLink} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <QrCode className="w-5 h-5 text-emerald-600" /> Clinic Desk QR Code
              </CardTitle>
              <CardDescription>Download and print this QR code. Leave it on the clinic's reception desk.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-8">
              <div className="w-40 h-40 bg-white border border-slate-200 rounded-xl p-2 shadow-sm flex-shrink-0">
                <Image 
                  src={qrCodeUrl} 
                  alt="Referral QR Code" 
                  width={200} 
                  height={200}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-4 text-center sm:text-left">
                <p className="text-sm text-slate-600">
                  When a doctor scans this code, they will be instantly routed to the Doctor Diary landing page with your <strong>{partner.referral_code}</strong> tracking code automatically applied.
                </p>
                <a 
                  href={qrCodeUrl} 
                  download="NX_Partner_QRCode.png" 
                  target="_blank"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-emerald-600 text-primary-foreground hover:bg-emerald-600/90 h-10 px-4 py-2"
                >
                  <Download className="w-4 h-4 mr-2" /> Download High-Res QR
                </a>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

        {/* Marketing Assets */}
        <StaggerItem className="space-y-6">
          <Card className="border-slate-200 shadow-sm h-full">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-lg font-bold text-slate-800">Pitch Decks & Assets</CardTitle>
              <CardDescription>Official materials to help you close.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                <a href="#" className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 text-red-600 p-2 rounded-lg">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">Doctor Diary One-Pager</div>
                      <div className="text-xs text-slate-500">PDF • 1.2 MB</div>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </a>
                <a href="#" className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 text-amber-600 p-2 rounded-lg">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">"Why NX?" Pitch Deck</div>
                      <div className="text-xs text-slate-500">PPTX • 4.5 MB</div>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </a>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerGroup>

      {/* Scripts */}
      <FadeIn delay={0.4}>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 mt-4 mb-6">Proven Outreach Scripts</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-green-600" /> WhatsApp Cold Open
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm text-slate-700 whitespace-pre-wrap font-medium">
                {`Hi Dr. [Name],\n\nI noticed your clinic is highly rated in [City]. We're helping top clinics automate their patient follow-ups and reduce no-shows by 40% with Doctor Diary.\n\nDo you have 5 mins this week to see how it works?\n\nHere's a quick link if you'd like to check it out yourself: \n${referralLink}`}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" /> Email Follow-up
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm text-slate-700 whitespace-pre-wrap font-medium">
                {`Subject: Quick idea for [Clinic Name]\n\nHi Dr. [Name],\n\nFollowing up on our brief chat. Top clinics using Doctor Diary are seeing a massive increase in patient retention.\n\nTake a look at the platform here: ${referralLink}\n\nLet me know when you're free for a quick demo.\n\nBest,\n[Your Name]`}
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeIn>
    </div>
  );
}
