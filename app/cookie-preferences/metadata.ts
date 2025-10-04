import { Metadata } from 'next'
import { generateSEO, SITE_CONFIG } from '../../lib/seo'

export const metadata: Metadata = generateSEO({
  title: "Préférences de Cookies - Win2Win",
  description: "Gérez vos préférences de cookies et personnalisez votre expérience sur Win2Win. Contrôlez les cookies analytiques, marketing et de performance.",
  canonical: `${SITE_CONFIG.domain}/cookie-preferences`,
  keywords: [
    'préférences cookies',
    'gestion cookies',
    'confidentialité',
    'cookies win2win',
    'paramètres cookies'
  ],
  robots: 'noindex, follow'
})