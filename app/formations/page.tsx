import { Metadata } from 'next'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Link from "next/link"
import JSONLD from "../../components/JSONLD"
import { generateSEO, generateWebPageSchema, SITE_CONFIG } from "../../lib/seo"

export const metadata: Metadata = generateSEO({
  title: "Formations Professionnelles - Win2Win",
  description: "Découvrez nos formations en langues étrangères, cybersécurité, Power BI, IA & développement, web design et montage vidéo. Formations adaptées à tous les niveaux.",
  canonical: `${SITE_CONFIG.domain}/formations`,
  keywords: [
    'formations professionnelles',
    'formation allemand',
    'formation cybersécurité',
    'formation power bi',
    'formation ia développement',
    'formation web design',
    'formation montage vidéo',
    'cours langues étrangères',
    'certification professionnelle'
  ]
})

// Formation data - in a real app, this would come from a database or API
// Removed duplicate 'formations' declaration

const formations = [
  {
    id: "1",
    title: "Langues Étrangères",
    description: "Allemand jusqu'au niveau B2, préparation Ausbildung, études et travail en Allemagne. Anglais et Italien disponibles."
  },
  {
    id: "2", 
    title: "Cybersécurité",
    description: "Formation complète sur la sécurité informatique, protection des systèmes et réseaux contre les menaces."
  },
  {
    id: "3",
    title: "Power BI", 
    description: "Analyse des données & reporting interactif. Maîtrisez la visualisation de données professionnelle."
  },
  {
    id: "4",
    title: "IA & Développement",
    description: "Programmation, automatisation, intelligence artificielle. Développez des solutions innovantes et intelligentes."
  },
  {
    id: "5",
    title: "Développement Web",
    description: "HTML, CSS, JavaScript, PHP, C++... Maîtrisez les technologies web modernes pour créer des applications robustes."
  },
  {
    id: "6",
    title: "Création de Sites Web",
    description: "WordPress, e-commerce, plateformes dynamiques. Créez des sites web professionnels et fonctionnels."
  },
  {
    id: "7",
    title: "Web Design & Graphisme",
    description: "UI/UX, identité visuelle. Concevez des interfaces esthétiques et une identité de marque forte."
  },
  {
    id: "8",
    title: "Montage Vidéo",
    description: "Création de contenus professionnels et créatifs. Maîtrisez les outils de montage vidéo moderne."
  }
]

export default function Formations() {
  const pageSchema = generateWebPageSchema({
    title: "Formations Professionnelles - Win2Win",
    description: "Découvrez nos formations professionnelles en développement web, data science, cybersécurité et plus encore.",
    url: "/formations",
    breadcrumbs: [
      { name: "Accueil", url: "/" },
      { name: "Formations", url: "/formations" }
    ]
  })

  return (
    <>
      <JSONLD data={pageSchema} />
      <Navbar />
      <main className="min-h-screen bg-gray-50">
      {/* Main Content Section */}
      <section className="px-4 pt-32 pb-16 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Formations Courtes</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Nous offrons des formations courtes et ciblées dans plusieurs domaines, adaptées aux besoins du marché
            actuel et conçues pour renforcer rapidement vos compétences pratiques.
          </p>
        </div>

        {/* Formation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {formations.map((formation) => (
            <Link
              key={formation.id}
              href={`/formations/${formation.id}`}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300 block"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{formation.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {formation.description}
              </p>
              <span className="text-cyan-500 font-medium text-sm hover:text-cyan-600 transition-colors">
                Voir Plus
              </span>
            </Link>
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center">
          <button className="bg-white border-2 border-cyan-500 text-cyan-500 px-8 py-3 rounded-full font-medium hover:bg-cyan-500 hover:text-white transition-all duration-300">
            Voir Plus
          </button>
        </div>
      </section>
    </main>
    <Footer />
    </>
  )
}