import type React from "react"
import type { Metadata, Viewport } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import { Inter, Source_Serif_4, Inter as V0_Font_Inter, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _inter = V0_Font_Inter({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif" })

export const metadata: Metadata = {
  title: "CrewHalo - People Ops Platform",
  description: "Modern HR platform for managing your team with style",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#0F172A",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${sourceSerif.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
