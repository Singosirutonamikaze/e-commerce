"use client";

import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Footer } from "@/components/layout/Footer/Footer";
import { ShopBackground } from "@/components/shop/ShopBackground/ShopBackground";

interface ShopChromeProps {
  readonly children: React.ReactNode;
}

export function ShopChrome({ children }: ShopChromeProps) {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <ShopBackground />
      <Navbar />
      <div className="relative z-10 flex-1">{children}</div>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
