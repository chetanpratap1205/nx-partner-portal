import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "NatureXpress Partners",
  description: "Your field partner command center — manage leads, track commissions, and grow with NatureXpress.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NX Partners",
  },
};

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
        {children}
      </body>
    </html>
  );
}
