import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { ScrollControls } from "@/components/layout/ScrollControls";
import { NavigationProgress } from "@/components/layout/NavigationProgress";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AdminLoginModal } from "@/components/admin/AdminLoginModal";
import { AdminBannerBar } from "@/components/admin/AdminBannerBar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { UniverseLayer } from "@/background/UniverseLayer";

import { MemberProvider } from "@/context/MemberContext";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://posthumanlabnetwork.online";

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
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Posthuman Lab Network | A Living Laboratory for Collective Futures",
  description:
    "An interactive digital ecosystem linking international philosophers, researchers, creative practitioners, and artists. Dedicated to posthumanism, ecological futures, technology ethics, and interdisciplinary collaboration.",
  keywords: [
    "Posthumanism",
    "Technology Ethics",
    "Ecological Futures",
    "Digital Art",
    "Alternative Education",
    "Academic Monolith",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Posthuman Lab Network",
    description:
      "A living laboratory for posthuman thought, ecological futures, technology ethics, and interdisciplinary collaboration.",
    url: siteUrl,
    siteName: "Posthuman Lab Network",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${cormorant.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col text-carbon-950 dark:text-bone-100 selection:bg-earth-500 selection:text-bone-50 relative">
        <ThemeProvider>
          <AuthProvider>
            <MemberProvider>
              <CustomCursor />
              <NavigationProgress />
              <UniverseLayer />
              <div className="fixed inset-0 z-0 pointer-events-none digital-grid opacity-20" />

              <div className="relative z-10 flex flex-col min-h-screen">
                <AdminBannerBar />
                {children}
                <AdminLoginModal />
                <ScrollControls />
              </div>
            </MemberProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
