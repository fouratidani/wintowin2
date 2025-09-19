import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Link from "next/link"
export default function Formations() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
      {/* Main Content Section */}
      <section className="px-4 py-16 max-w-7xl mx-auto">
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
          {Array.from({ length: 20 }, (_, index) => (
            <Link
              key={index}
              href={`/formations/formation-${index + 1}`}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300 block"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Formation {index + 1}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Reconnaissance des compétences en télécommunications et solutions informatiques locales.
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