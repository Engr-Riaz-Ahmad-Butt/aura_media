import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { PageTransition } from "@/components/layout/PageTransition";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: '--font-body',
  weight: ['300', '400', '500', '600']
});

const display = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: "Aura Media | Premium Event Visuals",
  description: "Luxury wedding and event photography and videography studio capturing timeless moments with cinematic excellence.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${display.variable}`}>
        <LenisProvider>
          <SceneCanvas />
          <ScrollProgress />
          <CustomCursor />
          <LoadingScreen />
          <Navbar />
          <PageTransition>
            <main className="relative min-h-screen overflow-x-hidden">
              {children}
            </main>
          </PageTransition>
        </LenisProvider>
      </body>
    </html>
  );
}
