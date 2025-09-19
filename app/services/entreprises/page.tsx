import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
export default function Entreprises() {
  return (
    <main className="min-h-screen bg-white">
        <Navbar/>
      {/* Hero Section with Blue Background */}
      <section className="bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-16">
        <div className="max-w-7xl mx-auto mt-12">
          {/* Hero Image with Overlay Text */}
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="/images/s1.jpg"
              alt="Modern office building"
              className="w-full h-80 md:h-96 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white text-center">Pour Entreprises</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Services Content Section */}
      <section className="px-4 py-16 max-w-7xl mx-auto">
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Formation et Développement des Compétences */}
          <div className="bg-white rounded-3xl border-2 border-cyan-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Formation et Développement des Compétences</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Ingénierie de Formation</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Formation de Formateurs</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Évaluation des Besoins en Formation</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Bilan de Compétences</span>
              </li>
            </ul>
          </div>

          {/* Conseil Stratégique et Organisationnel */}
          <div className="bg-white rounded-3xl border-2 border-cyan-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Conseil Stratégique et Organisationnel</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Conseil en Ressources Humaines (RH)</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Gestion de Projet 4</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Audit et Optimisation des Processus</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Gestion du Changement</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Transformation et Innovation - Full Width */}
        <div className="bg-white rounded-3xl border-2 border-cyan-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Transformation et Innovation</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            <li className="flex items-start">
              <span className="text-cyan-500 mr-3 mt-1">•</span>
              <span className="text-gray-700">Conseil en Stratégie d'Entreprise</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 mr-3 mt-1">•</span>
              <span className="text-gray-700">Conseil en Transformation Numérique</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 mr-3 mt-1">•</span>
              <span className="text-gray-700">Stratégies de Marketing et de Communication</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 mr-3 mt-1">•</span>
              <span className="text-gray-700">Conseil en Développement Durable</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 mr-3 mt-1">•</span>
              <span className="text-gray-700">Coaching en Leadership</span>
            </li>
          </ul>
        </div>
      </section>

    <Footer/>
    </main>
  )
}