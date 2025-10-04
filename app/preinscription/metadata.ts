import { Metadata } from 'next'
import { generateSEO, SITE_CONFIG } from '../../lib/seo'

export const metadata: Metadata = generateSEO({
  title: "Pré-inscription Formation - Win2Win",
  description: "Rejoignez nos formations de qualité et développez vos compétences avec Win2Win. Remplissez ce formulaire pour commencer votre parcours d'apprentissage en allemand et italien.",
  canonical: `${SITE_CONFIG.domain}/preinscription`,
  keywords: [
    'pré-inscription formation',
    'inscription win2win',
    'formation allemand',
    'formation italien',
    'ausbildung inscription',
    'formulaire inscription',
    'rejoindre formation'
  ]
})