import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Link from "next/link"

// Formation data - in a real app, this would come from a database or API
const formations = [
  {
    id: "1",
    title: "Formation en Développement Web",
    description: "Une formation complète pour apprendre le développement web moderne avec React, Node.js et les technologies actuelles du marché."
  },
  {
    id: "2", 
    title: "Formation en Data Science",
    description: "Apprenez l'analyse de données, le machine learning et l'intelligence artificielle avec Python et les outils modernes."
  },
  {
    id: "3",
    title: "Formation en Cybersécurité", 
    description: "Formation complète sur la sécurité informatique, incluant la protection des réseaux et la gestion des incidents."
  },
  {
    id: "4",
    title: "Formation en Design UX/UI",
    description: "Maîtrisez les principes du design d'expérience utilisateur pour créer des applications modernes et intuitives."
  },
  {
    id: "5",
    title: "Formation en Marketing Digital",
    description: "Découvrez les stratégies de marketing digital, SEO, réseaux sociaux et publicité en ligne."
  },
  {
    id: "6",
    title: "Formation en Gestion de Projet",
    description: "Apprenez les méthodologies Agile et Scrum pour gérer efficacement vos projets informatiques."
  },
  {
    id: "7", 
    title: "Formation en Cloud Computing",
    description: "Maîtrisez AWS, Azure et Google Cloud pour déployer et gérer des applications dans le cloud."
  },
  {
    id: "8",
    title: "Formation en Intelligence Artificielle",
    description: "Découvrez les concepts fondamentaux de l'IA et du machine learning avec des cas pratiques."
  },
  {
    id: "9",
    title: "Formation en DevOps",
    description: "Automatisez vos déploiements et optimisez vos workflows avec Docker, Kubernetes et CI/CD."
  },
  {
    id: "10",
    title: "Formation en Blockchain",
    description: "Comprenez la technologie blockchain et développez des applications décentralisées."
  },
  {
    id: "11",
    title: "Formation en Mobile Development",
    description: "Créez des applications mobiles natives avec React Native et Flutter pour iOS et Android."
  },
  {
    id: "12",
    title: "Formation en E-commerce",
    description: "Lancez votre boutique en ligne avec Shopify, WooCommerce et les meilleures pratiques du e-commerce."
  },
  {
    id: "13",
    title: "Formation en SEO/SEM",
    description: "Optimisez votre visibilité en ligne avec les techniques de référencement naturel et payant."
  },
  {
    id: "14", 
    title: "Formation en Photographie Digital",
    description: "Maîtrisez les techniques de photographie numérique et le post-traitement avec Photoshop."
  },
  {
    id: "15",
    title: "Formation en Comptabilité Digital", 
    description: "Digitalisez votre comptabilité avec les outils modernes et l'automatisation des processus."
  },
  {
    id: "16",
    title: "Formation en Communication Digital",
    description: "Développez votre stratégie de communication digitale et maîtrisez les réseaux sociaux."
  },
  {
    id: "17",
    title: "Formation en Analyse de Données",
    description: "Analysez et visualisez vos données avec Excel avancé, Power BI et Tableau."
  },
  {
    id: "18",
    title: "Formation en Entrepreneuriat",
    description: "Lancez votre startup avec les bonnes méthodologies et les outils de validation d'idées."
  },
  {
    id: "19",
    title: "Formation en Leadership Digital",
    description: "Développez vos compétences de leadership à l'ère du numérique et de la transformation digitale."
  },
  {
    id: "20",
    title: "Formation en Automation",
    description: "Automatisez vos tâches répétitives avec Python, Zapier et les outils d'automation moderne."
  }
];

export default function Formations() {
  return (
    <>
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