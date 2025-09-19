import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function Article1() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero Section with Blue Background */}
        <section className="bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Article Title Hero with Navigation */}
            <div className="bg-blue-100 rounded-3xl p-12 text-center relative">
              <button className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-cyan-500 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Actualités 1</h1>
              <button className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-cyan-500 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Article Content Section */}
        <section className="px-4 py-16 max-w-4xl mx-auto">
          <div className="mb-16">
            <p className="text-gray-700 leading-relaxed text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
              Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
              tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur
              pellentesque nibh nibh, at maximus ante fermentum sit amet.
            </p>
          </div>

          {/* Related Articles Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12 underline">Articles liés</h2>

            {/* Related Articles Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[2, 3, 4].map((num) => (
                <div key={num} className="bg-blue-100 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Actualités {num}</h3>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">
                      Maecenas vitae mattis tellus. Nullam quis imperdiet augue.
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non
                      suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* See More Button */}
            <div className="text-center">
              <button className="border-2 border-cyan-500 text-cyan-500 px-8 py-3 rounded-full font-medium hover:bg-cyan-50 transition-colors">
                Voir Plus
              </button>
            </div>
          </div>
        </section>


      </main>
      <Footer />
    </>
  )
}