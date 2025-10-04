import { Metadata } from 'next'
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Image from "next/image"
import JSONLD from "../../components/JSONLD"
import LocationMap from "../../components/LocationMap"
import { generateSEO, generateWebPageSchema, SITE_CONFIG } from "../../lib/seo"

export const metadata: Metadata = generateSEO({
  title: "À Propos - Win2Win Formation Professionnelle",
  description: "Découvrez Win2Win, votre partenaire de confiance pour maîtriser l'allemand et l'italien, avec un accompagnement sur mesure pour réussir votre Ausbildung en Allemagne.",
  canonical: `${SITE_CONFIG.domain}/about`,
  keywords: [
    'à propos win2win',
    'formation allemand',
    'ausbildung allemagne',
    'entreprise formation',
    'accompagnement professionnel',
    'apprentissage langue',
    'coaching carrière'
  ]
})
export default function About() {
  const pageSchema = generateWebPageSchema({
    title: "À Propos - Win2Win Formation Professionnelle",
    description: "Découvrez Win2Win, votre partenaire de confiance pour maîtriser l'allemand et l'italien.",
    url: "/about",
    breadcrumbs: [
      { name: "Accueil", url: "/" },
      { name: "À Propos", url: "/about" }
    ]
  })

  return (
    <>
      <JSONLD data={pageSchema} />
      <Navbar />
      <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="px-4 pt-32 pb-16 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">À Propos</h1>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-orange-400 text-lg font-medium mb-8">À Propos</h2>

              {/* Logo Section */}
              <div className="text-center mb-8">
                <Image src="/images/logo.png" alt="Win to Win Logo" width={130} height={75} className="h-70 w-auto" />
              </div>

              <p className="text-gray-700 leading-relaxed">
                Bienvenue sur WIN TO WIN ! Votre partenaire de confiance pour maîtriser l’allemand et l’italien, avec un accompagnement sur mesure pour réussir votre Ausbildung en Allemagne.
              </p>
            </div>

            {/* Right Content - Image and Stats */}
            <div>
              <div className="mb-8">
                <Image
                  src="/images/pq.jpg"
                  alt="Business meeting"
                  height={500} width={500}
                  className="w-full h-64 object-cover rounded-2xl"
                />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">+4</div>
                  <div className="text-sm text-gray-600">ANNÉES</div>
                </div>
                <div className="bg-gray-100 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">1000+</div>
                  <div className="text-sm text-gray-600">CLIENTS</div>
                </div>
                <div className="bg-gray-100 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">30+</div>
                  <div className="text-sm text-gray-600">ÉTUDIANTS</div>
                </div>
                <div className="bg-gray-100 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">30+</div>
                  <div className="text-sm text-gray-600">ÉTUDIANTS</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission and Vision Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Notre Mission */}
          <div className="bg-white rounded-3xl border border-gray-200 p-8">
            <h3 className="text-orange-400 text-lg font-medium mb-6">Notre Mission</h3>
            <p className="text-gray-700 leading-relaxed">
             Chez WIN TO WIN, notre objectif est d'offrir aux apprenants tous les outils nécessaires pour atteindre leurs objectifs linguistiques et professionnels. Nous croyons que la langue est une porte ouverte vers de nouvelles opportunités — et nous sommes là pour t’aider à l’ouvrir.
            </p>
          </div>

          {/* Notre Vision */}
          <div className="bg-white rounded-3xl border border-gray-200 p-8">
            <h3 className="text-orange-400 text-lg font-medium mb-6">Nos Offres</h3>
            <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-orange-400 mr-3 mt-1">•</span>
                  <span className="text-gray-700">Cours d'allemand et d'italien, du niveau A1 au B2</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-3 mt-1">•</span>
                  <span className="text-gray-700">Préparation aux examens OSD & ECL</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-3 mt-1">•</span>
                  <span className="text-gray-700">Suivi personnalisé avec une formatrice examinatrice certifiée</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-3 mt-1">•</span>
                  <span className="text-gray-700">Services sur mesure et conseils pour réussir ton Ausbildung (formation professionnelle) en Allemagne</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-3 mt-1">•</span>
                  <span className="text-gray-700">Offres spéciales pour les groupes et les inscriptions précoces</span>
                </li>
              </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-12">
          <div className="text-center mb-10">
            <h3 className="text-orange-400 text-lg font-medium mb-4">Contact</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contactez-nous</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Notre équipe est là pour vous accompagner dans votre parcours de formation. N'hésitez pas à nous contacter !
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {/* Email */}
            <a 
              href="mailto:contact@winstowin.com"
              className="group bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-xl mb-4 mx-auto transition-colors">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Email</h3>
              <p className="text-blue-600 group-hover:text-blue-700 font-medium text-center break-all">
                contact@winstowin.com
              </p>
              <p className="text-gray-500 text-sm text-center mt-2">
                Cliquez pour envoyer un email
              </p>
            </a>

            {/* Phone 1 */}
            <a 
              href="tel:+21650366499"
              className="group bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100 hover:border-green-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 group-hover:bg-green-200 rounded-xl mb-4 mx-auto transition-colors">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Téléphone 1</h3>
              <p className="text-green-600 group-hover:text-green-700 font-medium text-center">
                +216 50 366 499
              </p>
              <p className="text-gray-500 text-sm text-center mt-2">
                Cliquez pour appeler
              </p>
            </a>

            {/* Phone 2 */}
            <a 
              href="tel:+21626172216"
              className="group bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 group-hover:bg-purple-200 rounded-xl mb-4 mx-auto transition-colors">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Téléphone 2</h3>
              <p className="text-purple-600 group-hover:text-purple-700 font-medium text-center">
                +216 26 172 216
              </p>
              <p className="text-gray-500 text-sm text-center mt-2">
                Cliquez pour appeler
              </p>
            </a>
          </div>

          {/* Address with Icon */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-100 mb-8">
            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl flex-shrink-0">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Notre Adresse</h3>
                <p className="text-gray-700 text-lg">
                  97 Avenue de la liberté, Tunis
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Tunisie
                </p>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8">
            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-xl flex-shrink-0">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Horaires d'ouverture</h3>
                <div className="space-y-1">
                  <p className="text-gray-700">
                    <span className="font-medium">Lundi - Vendredi :</span> 8h00 - 17h30
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Samedi :</span> 8h00 - 12h00
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Dimanche :</span> Fermé
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <LocationMap 
            address="97 Avenue de la liberté, Tunis, Tunisie"
            lat={36.8065}
            lng={10.1815}
          />
        </div>
      </section>

    </main>
    <Footer />
    </>
  )
}