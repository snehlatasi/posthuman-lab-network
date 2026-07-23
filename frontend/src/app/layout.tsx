import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ScrollControls } from "@/components/layout/ScrollControls";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Posthuman Lab Network | A Living Laboratory for Collective Futures",
  description: "An interactive digital ecosystem linking international philosophers, researchers, creative practitioners, and artists. Dedicated to posthumanism, ecological futures, technology ethics, and interdisciplinary collaboration.",
  keywords: [
    "Posthumanism",
    "Technology Ethics",
    "Ecological Futures",
    "Digital Art",
    "Alternative Education",
    "Academic Monolith"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-carbon-950 text-bone-100 selection:bg-moss-500 selection:text-bone-50">
        {/* Structural Background Canvas Grids & Glows */}
        <div className="fixed inset-0 digital-grid pointer-events-none z-0" />
        <div className="fixed top-[-20%] left-[-10%] w-[70%] h-[70%] organic-radial-glow pointer-events-none z-0" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] clay-radial-glow pointer-events-none z-0" />
        
        {/* Main layout container */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
          <ScrollControls />
        </div>
      </body>
    </html>
  );
}
