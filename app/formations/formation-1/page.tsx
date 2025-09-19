import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Link from "next/link"
export default function Formation1() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero Section with Blue Background */}
        <section className="bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Course Title Hero */}
            <div className="bg-blue-100 rounded-3xl p-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Formation 1</h1>
            </div>
          </div>
        </section>

        {/* Course Details Section */}
        <section className="px-4 py-16 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Course Details - Left Column */}
            <div className="lg:col-span-2 bg-white rounded-3xl border-2 border-cyan-200 p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Titre: Lorem ipsum</h2>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Details:</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
                    Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae
                    mattis tellus.mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus consectetur,
                    ultrices mauris. Maecenas vitae mattis tellus
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
                    src="/professional-instructor-portrait.jpg"
                    alt="Instructor"
                    className="w-15 h-15 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Nom Prenom</h4>
                    <p className="text-sm text-gray-600 mb-2">Occupation</p>
                    <p className="text-sm text-gray-700">
                      <strong>Details:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
                      Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur,
                      ultrices mauris. Maecenas vitae mattis tellus.
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
                      src="/placeholder-gcg1m.png"
                      alt="Reviewer"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-gray-900 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
                      +20
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Register Button */}
          <div className="mb-16">
            <button className="bg-cyan-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-cyan-600 transition-colors">
              <Link href="/preinscription">Inscrivez vous</Link>
            </button>
          </div>

          {/* Related Courses Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12 underline">Formations Liées</h2>

            {/* Related Courses Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[2, 3, 4].map((num) => (
                <div key={num} className="bg-blue-100 rounded-3xl p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Formation {num}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Maecenas vitae mattis tellus. Nullam quis imperdiet augue.
                  </p>
                </div>
              ))}
            </div>

            {/* See More Button */}
            <div className="text-center">
              <button className="border-2 border-cyan-500 text-cyan-500 px-8 py-3 rounded-full font-medium hover:bg-cyan-50 transition-colors">
                <Link href="/formations">Voir Plus</Link>
              </button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}