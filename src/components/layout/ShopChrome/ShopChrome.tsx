"use client";

import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Footer } from "@/components/layout/Footer/Footer";

interface ShopChromeProps {
  readonly children : React.ReactNode,
}

export function ShopChrome({children}: ShopChromeProps) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
}
