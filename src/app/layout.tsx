import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "@/styles/globals.css"
import { cn } from "@/lib/utils/cn"
import { GlobalUI } from "@/components/ui/GlobalUI"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "VELURE | Boutique en ligne moderne",
  description: "Découvrez notre collection exclusive de chaussures, chemises et accessoires.",
  keywords: ["e-commerce", "mode", "chaussures", "chemises", "accessoires", "luxe"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-bg font-sans antialiased",
          geistSans.variable,
          geistMono.variable
        )}
      >
        {children}
        <GlobalUI />
      </body>
    </html>
  )
}
