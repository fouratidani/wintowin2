import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Image from "next/image"
export default function About() {
  return (
    <>
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
                Chez Win to Win, nous transformons le potentiel en succès. Grâce à notre expertise technique et notre
                approche sur-mesure, nous accompagnons chacun de nos partenaires vers l'excellence.
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
              Accompagner chaque acteur – qu'il s'agisse d'entreprises, de centres de formation, d'étudiants ou
              d'institutions – vers l'excellence, en proposant des solutions innovantes et adaptées qui favorisent la
              performance, l'employabilité et un développement durable.
            </p>
          </div>

          {/* Notre Vision */}
          <div className="bg-white rounded-3xl border border-gray-200 p-8">
            <h3 className="text-orange-400 text-lg font-medium mb-6">Notre Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              Devenir un acteur de référence en matière de formation, de conseil et d'innovation, en créant des ponts
              entre les talents, les organisations et les institutions. Nous aspirons à construire un écosystème où
              l'excellence, l'innovation et la coopération internationale ouvrent la voie à un avenir plus compétitif,
              inclusif et durable.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-12">
          <h3 className="text-orange-400 text-lg font-medium mb-6">Contact</h3>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Contactez-nous</h2>

          <div className="space-y-4 mb-8">
            <p className="text-gray-700">
              <span className="font-medium">Email :</span> contact@winstowin.com
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Téléphone :</span> +216 50 366 499 / +216 26 172 216
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Adresse :</span> 97 Avenue de la liberté, Tunis
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
            <span className="text-gray-600 font-medium">MAPS LOCATION</span>
          </div>
        </div>
      </section>

    </main>
    <Footer />
    </>
  )
}