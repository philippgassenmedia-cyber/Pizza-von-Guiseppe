import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pizza Napoletano — La Pizza Autentica",
  description:
    "Authentische neapolitanische Pizza aus dem Holzofen. Privatfeiern & Stadtfeste in der Region Bergstraße.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
