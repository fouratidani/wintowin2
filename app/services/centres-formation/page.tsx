import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
export default function CentresFormation() {
  return (
    <main className="min-h-screen bg-white">
        <Navbar/>
      {/* Hero Section with Blue Background */}
      <section className="bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-16">
        <div className="max-w-7xl mx-auto mt-12">
          {/* Hero Image with Overlay Text */}
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="/images/s2.jpg"
              alt="Training center"
              className="w-full h-80 md:h-96 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white text-center">Pour Centres de Formation</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Services Content Section */}
      <section className="px-4 py-16 max-w-7xl mx-auto">
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Développement de Programmes */}
          <div className="bg-white rounded-3xl border-2 border-cyan-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Développement de Programmes</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Conception de Curricula</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Ingénierie Pédagogique</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Analyse des Besoins du Marché</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Validation des Compétences</span>
              </li>
            </ul>
          </div>

          {/* Certification & Accréditation */}
          <div className="bg-white rounded-3xl border-2 border-cyan-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Certification & Accréditation</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Certifications Internationales</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Accréditation ISO</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Audit Qualité</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span className="text-gray-700">Mise en Conformité</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Formation et Digitalisation - Full Width */}
        <div className="bg-white rounded-3xl border-2 border-cyan-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Formation et Digitalisation</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            <li className="flex items-start">
              <span className="text-cyan-500 mr-3 mt-1">•</span>
              <span className="text-gray-700">Formation des Formateurs</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 mr-3 mt-1">•</span>
              <span className="text-gray-700">Plateformes E-learning</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 mr-3 mt-1">•</span>
              <span className="text-gray-700">Outils Pédagogiques Numériques</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 mr-3 mt-1">•</span>
              <span className="text-gray-700">Gestion Administrative</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 mr-3 mt-1">•</span>
              <span className="text-gray-700">Suivi des Apprenants</span>
            </li>
          </ul>
        </div>
      </section>

    <Footer/>
    </main>
  )
}