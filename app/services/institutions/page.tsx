import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
export default function Institutions() {
  return (
    <main className="min-h-screen bg-white">
        <Navbar/>
      {/* Hero Section with Blue Background */}
      <section className="bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-16">
        <div className="max-w-7xl mx-auto mt-12">
          {/* Hero Image with Overlay Text */}
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="/images/s4.jpg"
              alt="Government building"
              className="w-full h-80 md:h-96 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white text-center">Ministères & Institutions</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Services Content Section */}
      <section className="px-4 py-16 max-w-7xl mx-auto">
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Conseil en Politiques Publiques */}
          <div className="bg-white rounded-3xl border-2 border-cyan-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Conseil en Politiques Publiques</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Élaboration de Stratégies</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Réforme des Systèmes</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Évaluation d'Impact</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Benchmark International</span>
              </li>
            </ul>
          </div>

          {/* Transformation & Modernisation */}
          <div className="bg-white rounded-3xl border-2 border-cyan-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Transformation & Modernisation</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Digitalisation des Services</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Optimisation des Processus</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Gestion du Changement</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Formation des Fonctionnaires</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Certification & Développement - Full Width */}
        <div className="bg-white rounded-3xl border-2 border-cyan-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Certification & Développement</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            <li className="flex items-start">
              <span className="text-cyan-500 mr-3 mt-1">•</span>
              <span className="text-gray-700">Certifications ISO</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 mr-3 mt-1">•</span>
              <span className="text-gray-700">Audit de Performance</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 mr-3 mt-1">•</span>
              <span className="text-gray-700">Coopération Internationale</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 mr-3 mt-1">•</span>
              <span className="text-gray-700">Développement des Compétences</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 mr-3 mt-1">•</span>
              <span className="text-gray-700">Innovation Publique</span>
            </li>
          </ul>
        </div>
      </section>

    <Footer/>
    </main>
  )
}