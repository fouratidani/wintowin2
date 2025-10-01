import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Link from "next/link"
import { notFound } from "next/navigation"

// Sample formation data - in a real app, this would come from a database or API
const formations = {
  "1": {
    id: "1",
    title: "Formation en Développement Web",
    description: "Une formation complète pour apprendre le développement web moderne avec React, Node.js et les technologies actuelles du marché.",
    instructor: {
      name: "Ahmed Benali",
      occupation: "Développeur Full Stack Senior",
      details: "Expert en développement web avec plus de 8 ans d'expérience. Spécialisé dans React, Node.js et les architectures cloud modernes."
    },
    reviews: 25
  },
  "2": {
    id: "2",
    title: "Formation en Data Science",
    description: "Apprenez l'analyse de données, le machine learning et l'intelligence artificielle avec Python et les outils modernes de data science.",
    instructor: {
      name: "Sarah Mansouri",
      occupation: "Data Scientist",
      details: "Experte en data science et machine learning avec une expérience de 6 ans dans l'industrie technologique et la recherche."
    },
    reviews: 18
  },
  "3": {
    id: "3",
    title: "Formation en Cybersécurité",
    description: "Formation complète sur la sécurité informatique, incluant la protection des réseaux, la cryptographie et la gestion des incidents de sécurité.",
    instructor: {
      name: "Mohamed Triki",
      occupation: "Expert en Cybersécurité",
      details: "Consultant en cybersécurité avec plus de 10 ans d'expérience dans la protection des infrastructures critiques."
    },
    reviews: 32
  },
  "4": {
    id: "4",
    title: "Formation en Design UX/UI",
    description: "Maîtrisez les principes du design d'expérience utilisateur et d'interface utilisateur pour créer des applications modernes et intuitives.",
    instructor: {
      name: "Leila Gharbi",
      occupation: "UX/UI Designer Senior",
      details: "Designer expérimentée avec plus de 7 ans dans la conception d'interfaces utilisateur pour des applications web et mobile."
    },
    reviews: 22
  },
  "5": {
    id: "5",
    title: "Formation en Marketing Digital",
    description: "Découvrez les stratégies de marketing digital, SEO, réseaux sociaux et publicité en ligne pour développer votre présence numérique.",
    instructor: {
      name: "Karim Bouazizi",
      occupation: "Expert en Marketing Digital",
      details: "Spécialiste en marketing digital avec 9 ans d'expérience en stratégies de croissance et acquisition client."
    },
    reviews: 28
  }
}

interface PageProps {
  params: {
    id: string
  }
}

export default function FormationDetails({ params }: PageProps) {
  const formation = formations[params.id as keyof typeof formations]
  
  if (!formation) {
    notFound()
  }

  // Get related formations (excluding current one)
  const relatedFormations = Object.values(formations)
    .filter(f => f.id !== params.id)
    .slice(0, 3)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero Section with Blue Background */}
        <section className="bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Course Title Hero */}
            <div className="bg-blue-100 rounded-3xl p-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{formation.title}</h1>
            </div>
          </div>
        </section>

        {/* Course Details Section */}
        <section className="px-4 py-16 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Course Details - Left Column */}
            <div className="lg:col-span-2 bg-white rounded-3xl border-2 border-cyan-200 p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Titre: {formation.title}</h2>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Details:</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {formation.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Instructor and Reviews - Right Column */}
            <div className="space-y-6">
              {/* Instructor Section */}
              <div className="bg-white rounded-3xl border-2 border-cyan-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Instructeur</h3>
                <div className="flex items-start gap-4">
                  <img
                    src="/images/person.jpg"
                    alt="Instructor"
                    className="w-15 h-15 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{formation.instructor.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{formation.instructor.occupation}</p>
                    <p className="text-sm text-gray-700">
                      <strong>Details:</strong> {formation.instructor.details}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="bg-white rounded-3xl border-2 border-cyan-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Retour</h3>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src="/images/person.jpg"
                      alt="Reviewer"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-gray-900 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
                      +{formation.reviews}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Register Button */}
          <div className="mb-16">
            <Link 
              href="/preinscription"
              className="bg-cyan-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-cyan-600 transition-colors inline-block"
            >
              Inscrivez vous
            </Link>
          </div>

          {/* Related Courses Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12 underline">Formations Liées</h2>

            {/* Related Courses Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {relatedFormations.map((relatedFormation) => (
                <Link
                  key={relatedFormation.id}
                  href={`/formations/${relatedFormation.id}`}
                  className="bg-blue-100 rounded-3xl p-8 text-center hover:bg-blue-200 transition-colors block"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{relatedFormation.title}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {relatedFormation.description.substring(0, 100)}...
                  </p>
                </Link>
              ))}
            </div>

            {/* See More Button */}
            <div className="text-center">
              <Link
                href="/formations"
                className="border-2 border-cyan-500 text-cyan-500 px-8 py-3 rounded-full font-medium hover:bg-cyan-50 transition-colors inline-block"
              >
                Voir Plus
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

// Generate static params for the formations (optional - for static generation)
export async function generateStaticParams() {
  return Object.keys(formations).map((id) => ({
    id: id,
  }))
}