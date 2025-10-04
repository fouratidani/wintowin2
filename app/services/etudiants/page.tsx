import { Metadata } from 'next'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import JSONLD from "../../../components/JSONLD"
import { generateSEO, generateWebPageSchema, SITE_CONFIG } from "../../../lib/seo"

export const metadata: Metadata = generateSEO({
  title: "Services pour Étudiants - Win2Win Formation",
  description: "Formation en allemand et italien pour étudiants et jeunes diplômés. Préparez votre Ausbildung en Allemagne avec nos programmes adaptés.",
  canonical: `${SITE_CONFIG.domain}/services/etudiants`,
  keywords: [
    'formation étudiants',
    'ausbildung étudiants',
    'formation jeunes diplômés',
    'allemand étudiants',
    'préparation ausbildung'
  ]
})

export default function Etudiants() {
  const pageSchema = generateWebPageSchema({
    title: "Services pour Étudiants - Win2Win Formation",
    description: "Formation en allemand et italien pour étudiants et jeunes diplômés.",
    url: "/services/etudiants",
    breadcrumbs: [
      { name: "Accueil", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Étudiants", url: "/services/etudiants" }
    ]
  })

  return (
    <>
      <JSONLD data={pageSchema} />
      <main className="min-h-screen bg-white">
        <Navbar/>
      {/* Hero Section with Blue Background */}
      <section className="bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-16">
        <div className="max-w-7xl mx-auto mt-12">
          {/* Hero Image with Overlay Text */}
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="/images/s3.jpg"
              alt="Students and young graduates"
              className="w-full h-80 md:h-96 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white text-center">Pour Étudiants</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Services Content Section */}
      <section className="px-4 py-16 max-w-7xl mx-auto">
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Formations Spécialisées */}
          <div className="bg-white rounded-3xl border-2 border-cyan-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Formations Spécialisées</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Développement Web Full-Stack</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Cybersécurité</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Marketing Digital</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Intelligence Artificielle</span>
              </li>
            </ul>
          </div>

          {/* Stages & Insertion Professionnelle */}
          <div className="bg-white rounded-3xl border-2 border-cyan-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Stages & Insertion Professionnelle</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Placement en Stages PFE</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Coaching Carrière</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Préparation aux Entretiens</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Réseautage Professionnel</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Programmes Internationaux - Full Width */}
        <div className="bg-white rounded-3xl border-2 border-cyan-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Programmes Internationaux</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            <li className="flex items-start">
              <span className="text-cyan-500 mr-3 mt-1">•</span>
              <span className="text-gray-700">Programme Ausbildung (Allemagne)</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 mr-3 mt-1">•</span>
              <span className="text-gray-700">Études à l'Étranger</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 mr-3 mt-1">•</span>
              <span className="text-gray-700">Placement International Infirmiers</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 mr-3 mt-1">•</span>
              <span className="text-gray-700">Accompagnement Visa & Immigration</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 mr-3 mt-1">•</span>
              <span className="text-gray-700">Partenariats Universitaires</span>
            </li>
          </ul>
        </div>
      </section>

      <Footer/>
      </main>
    </>
  )
}