import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Login",
  description: "Sign in to your NatureXpress partner dashboard.",
  openGraph: {
    title: "NatureXpress Partner Login",
    description: "Sign in to your NatureXpress partner dashboard.",
    url: "https://partner.naturexpress.in/login",
    siteName: "NatureXpress Partners",
  }
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
