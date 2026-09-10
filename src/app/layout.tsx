import type { Metadata } from "next"
import "@/styles/globals.css"
import { cn } from "@/lib/utils/cn"
import { GlobalUI } from "@/components/ui/GlobalUI"

export const metadata: Metadata = {
  title: "Velure | Boutique en ligne de luxe",
  icons: "/favicon.ico",
  description: "Boutique de luxe au design architectural et discret.",
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
          "min-h-screen bg-slate-950 font-sans text-slate-100 antialiased selection:bg-slate-800 selection:text-slate-100 flex flex-col"
        )}
      >
        <GlobalUI />
        {children}
      </body>
    </html>
  )
}
