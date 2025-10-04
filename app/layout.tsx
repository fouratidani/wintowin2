import type React from "react"
import type { Metadata, Viewport } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { CookieConsentProvider } from "../contexts/CookieConsentContext"
import CookieConsentBanner from "../components/CookieConsentBanner"
import PageViewTracker from "../components/PageViewTracker"
import JSONLD from "../components/JSONLD"
import { generateSEO, generateOrganizationSchema, SITE_CONFIG } from "../lib/seo"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = generateSEO({
  title: "Win2Win - Formation Professionnelle & Ausbildung en Allemagne",
  description: "Win2Win vous accompagne dans votre apprentissage de l'allemand et de l'italien pour réussir votre Ausbildung en Allemagne. Formations professionnelles adaptées à vos besoins.",
  canonical: SITE_CONFIG.domain,
  keywords: [
    'formation allemand',
    'ausbildung allemagne', 
    'formation professionnelle',
    'apprentissage langue',
    'win2win',
    'formation italien',
    'coaching carrière',
    'emploi allemagne',
    'certification linguistique',
    'formation continue',
    'centre formation',
    'cours langue',
    'formation sur mesure'
  ]
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#00a0e8',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = generateOrganizationSchema()
  
  return (
    <html lang="fr" className={`${poppins.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kontora:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <JSONLD data={organizationSchema} />
      </head>
      <body className="font-poppins">
        <CookieConsentProvider>
          <PageViewTracker />
          {children}
          <CookieConsentBanner />
        </CookieConsentProvider>
      </body>
    </html>
  )
}
