import { Metadata } from 'next'
import Landing from "../pages/landing"
import JSONLD from "../components/JSONLD"
import { generateSEO, generateWebPageSchema, SITE_CONFIG } from "../lib/seo"

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
    'formation continue'
  ]
})

export default function Page() {
  const pageSchema = generateWebPageSchema({
    title: "Win2Win - Formation Professionnelle & Ausbildung en Allemagne",
    description: "Win2Win vous accompagne dans votre apprentissage de l'allemand et de l'italien pour réussir votre Ausbildung en Allemagne.",
    url: "/",
    breadcrumbs: [
      { name: "Accueil", url: "/" }
    ]
  })

  return (
    <>
      <JSONLD data={pageSchema} />
      <Landing />
    </>
  )
}
