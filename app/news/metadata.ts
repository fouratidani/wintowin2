import { Metadata } from 'next'
import { generateSEO, SITE_CONFIG } from '../../lib/seo'

export const metadata: Metadata = generateSEO({
  title: "Actualités et News - Win2Win Formation",
  description: "Découvrez les dernières actualités de Win2Win, conseils pour votre formation en allemand, nouvelles sur l'Ausbildung en Allemagne et actualités du secteur.",
  canonical: `${SITE_CONFIG.domain}/news`,
  keywords: [
    'actualités formation',
    'news win2win',
    'actualités allemagne',
    'ausbildung news',
    'conseils formation',
    'actualités professionnelles',
    'blog formation'
  ]
})