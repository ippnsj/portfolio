import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getCurrentLanguage } from "@/lib/language";
import { getTranslations } from "@/lib/translations";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sojung Lee — Portfolio",
  description:
    "Software engineer who solves user pain points end-to-end — beyond shipping features, also invested in app stability and team efficiency.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language = await getCurrentLanguage();
  const translations = getTranslations(language);

  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body>
        <Header language={language} translations={translations} />
        {children}
        <div className="mx-auto max-w-3xl px-6">
          <Footer translations={translations} />
        </div>
      </body>
    </html>
  );
}
