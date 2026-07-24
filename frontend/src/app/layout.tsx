import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { ScrollControls } from "@/components/layout/ScrollControls";
import { AuthProvider } from "@/context/AuthContext";
import { AdminLoginModal } from "@/components/admin/AdminLoginModal";
import { AdminBannerBar } from "@/components/admin/AdminBannerBar";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
      className={`${manrope.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-carbon-950 selection:bg-earth-500 selection:text-bone-50">
        <div className="fixed inset-0 digital-grid pointer-events-none z-0" />
        <div className="fixed top-[-18%] left-[-8%] w-[64%] h-[64%] organic-radial-glow pointer-events-none z-0" />
        <div className="fixed bottom-[-12%] right-[-8%] w-[56%] h-[56%] clay-radial-glow pointer-events-none z-0" />

        <AuthProvider>
          <div className="relative z-10 flex flex-col min-h-screen">
            <AdminBannerBar />
            {children}
            <AdminLoginModal />
            <ScrollControls />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
