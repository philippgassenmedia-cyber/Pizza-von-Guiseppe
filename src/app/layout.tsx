import type { Metadata } from "next";
import { Anton, Archivo, Caveat } from "next/font/google";
import "./globals.css";

/* Display — heavy condensed grotesque for the big statements */
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

/* UI + body — neutral grotesque, wide weight range */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

/* Accent — handwritten, used sparingly like a chef's signature */
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pizza Napoletano — Holzofen Pizza Truck an der Bergstraße",
  description:
    "Giuseppes Holzofen-Truck auf den Straßen- und Foodfesten der Bergstraße. Jede Pizza 8 €, in sieben Minuten frisch gebacken. Ganzjährig privat buchbar zum Flatpreis.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${anton.variable} ${archivo.variable} ${caveat.variable}`}
    >
      <body className="bg-cream text-ink font-sans antialiased">{children}</body>
    </html>
  );
}
