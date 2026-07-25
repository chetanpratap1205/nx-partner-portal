import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "NatureXpress Partners | Field Command Center",
    template: "%s | NX Partners",
  },
  description: "Your field partner command center — manage leads, track commissions, and grow with NatureXpress. Join the elite network of health and agri-tech distributors.",
  manifest: "/manifest.json",
  keywords: ["NatureXpress", "Partner Program", "B2B SaaS", "Commissions", "Lead Management"],
  authors: [{ name: "NatureXpress" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://partner.naturexpress.in",
    title: "NatureXpress Partners | Grow your business",
    description: "Join the elite network of NatureXpress partners. Manage leads, track commissions, and unlock new revenue streams.",
    siteName: "NatureXpress Partners",
  },
  twitter: {
    card: "summary_large_image",
    title: "NatureXpress Partners | Grow your business",
    description: "Manage leads, track commissions, and unlock new revenue streams with NatureXpress.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NX Partners",
  },
};

import { Toaster } from "@/components/ui/sonner";
import { PostHogProvider } from "@/components/posthog-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white flex min-h-screen flex-col`}
      >
        <PostHogProvider>
          {children}
        </PostHogProvider>
        <Toaster position="top-center" richColors />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
