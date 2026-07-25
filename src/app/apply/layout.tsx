import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply to be a Partner",
  description: "Join the NatureXpress partner network and unlock lifetime recurring commissions.",
  openGraph: {
    title: "Apply to be an NX Partner",
    description: "Join the NatureXpress partner network and unlock lifetime recurring commissions.",
    url: "https://partner.naturexpress.in/apply",
    siteName: "NatureXpress Partners",
  }
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
