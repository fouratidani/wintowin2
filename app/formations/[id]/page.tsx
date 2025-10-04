import { Metadata } from 'next'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Link from "next/link"
import { notFound } from "next/navigation"
import JSONLD from "../../../components/JSONLD"
import { generateSEO, generateCourseSchema, generateWebPageSchema, SITE_CONFIG } from "../../../lib/seo"

// Sample formation data - in a real app, this would come from a database or API
const formations = {
  "1": {
    id: "1",
    title: "Langues Étrangères",
    description: "Allemand jusqu'au niveau B2, préparation Ausbildung, études et travail en Allemagne. Anglais et Italien disponibles.",
    instructor: {
      name: "Professeur Müller",
      occupation: "Professeur d'Allemand Certifié",
      details: "Expert en enseignement de l'allemand avec plus de 10 ans d'expérience. Spécialisé dans la préparation Ausbildung et certification B2."
    },
    reviews: 42
  },
  "2": {
    id: "2",
    title: "Cybersécurité",
    description: "Formation complète sur la sécurité informatique, protection des systèmes et réseaux contre les menaces.",
    instructor: {
      name: "Mohamed Triki",
      occupation: "Expert en Cybersécurité",
      details: "Consultant en cybersécurité avec plus de 8 ans d'expérience dans la protection des infrastructures critiques et la gestion des incidents."
    },
    reviews: 38
  },
  "3": {
    id: "3",
    title: "Power BI",
    description: "Analyse des données & reporting interactif. Maîtrisez la visualisation de données professionnelle.",
    instructor: {
      name: "Sarah Mansouri",
      occupation: "Experte en Business Intelligence",
      details: "Spécialiste Power BI et analyse de données avec 6 ans d'expérience dans l'optimisation des processus décisionnels."
    },
    reviews: 29
  },
  "4": {
    id: "4",
    title: "IA & Développement",
    description: "Programmation, automatisation, intelligence artificielle. Développez des solutions innovantes et intelligentes.",
    instructor: {
      name: "Ahmed Benali",
      occupation: "Développeur IA Senior",
      details: "Expert en intelligence artificielle et développement avec plus de 7 ans d'expérience en machine learning et automatisation."
    },
    reviews: 35
  },
  "5": {
    id: "5",
    title: "Développement Web",
    description: "HTML, CSS, JavaScript, PHP, C++... Maîtrisez les technologies web modernes pour créer des applications robustes.",
    instructor: {
      name: "Karim Bouazizi",
      occupation: "Développeur Full Stack",
      details: "Développeur expérimenté avec 9 ans d'expérience en technologies web modernes et architectures d'applications."
    },
    reviews: 44
  },
  "6": {
    id: "6",
    title: "Création de Sites Web",
    description: "WordPress, e-commerce, plateformes dynamiques. Créez des sites web professionnels et fonctionnels.",
    instructor: {
      name: "Leila Gharbi",
      occupation: "Spécialiste WordPress & E-commerce",
      details: "Experte en création de sites web avec 5 ans d'expérience en WordPress, WooCommerce et plateformes e-commerce."
    },
    reviews: 31
  },
  "7": {
    id: "7",
    title: "Web Design & Graphisme",
    description: "UI/UX, identité visuelle. Concevez des interfaces esthétiques et une identité de marque forte.",
    instructor: {
      name: "Amine Sellami",
      occupation: "Designer UX/UI Senior",
      details: "Designer créatif avec 6 ans d'expérience en conception d'interfaces utilisateur et identité visuelle de marque."
    },
    reviews: 27
  },
  "8": {
    id: "8",
    title: "Montage Vidéo",
    description: "Création de contenus professionnels et créatifs. Maîtrisez les outils de montage vidéo moderne.",
    instructor: {
      name: "Youssef Khedri",
      occupation: "Monteur Vidéo Professionnel",
      details: "Spécialiste en montage vidéo avec 4 ans d'expérience en production de contenu créatif et publicitaire."
    },
    reviews: 23
  }
}

interface PageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const formation = formations[params.id as keyof typeof formations]
  
  if (!formation) {
    return generateSEO({
      title: "Formation non trouvée - Win2Win",
      description: "La formation demandée n'existe pas.",
    })
  }

  return generateSEO({
    title: `${formation.title} - Win2Win Formation`,
    description: formation.description,
    canonical: `${SITE_CONFIG.domain}/formations/${params.id}`,
    keywords: [
      formation.title.toLowerCase(),
      'formation professionnelle',
      'win2win',
      'certification',
      'apprentissage',
      'cours en ligne'
    ]
  })
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

  // Generate structured data
  const courseSchema = generateCourseSchema({
    name: formation.title,
    description: formation.description,
    duration: "6 mois", // You could add this to the formations data
    level: "Tous niveaux",
    category: "Formation Professionnelle",
    url: `/formations/${params.id}`
  })

  const pageSchema = generateWebPageSchema({
    title: `${formation.title} - Win2Win Formation`,
    description: formation.description,
    url: `/formations/${params.id}`,
    breadcrumbs: [
      { name: "Accueil", url: "/" },
      { name: "Formations", url: "/formations" },
      { name: formation.title, url: `/formations/${params.id}` }
    ]
  })

  return (
    <>
      <JSONLD data={courseSchema} />
      <JSONLD data={pageSchema} />
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