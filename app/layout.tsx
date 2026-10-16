import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import I18nProvider from "@/components/i18n-provider.components";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AZSOFT — Raqamli biznes yechimlari",
  description: "Biznesingiz uchun zamonaviy veb-saytlar va IT yechimlar.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uz"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
