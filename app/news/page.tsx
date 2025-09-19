import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Link from "next/link"

export default function News() {
  const newsArticles = [
    {
      id: 1,
      title: "Nouvelle Formation en Intelligence Artificielle",
      date: "15 Septembre 2025",
      category: "Formation",
      excerpt: "Découvrez notre nouveau programme de formation en IA, conçu pour les professionnels souhaitant maîtriser les technologies de demain.",
      readTime: "3 min"
    },
    {
      id: 2,
      title: "Partenariat Stratégique avec Tech Solutions",
      date: "10 Septembre 2025",
      category: "Partenariat",
      excerpt: "Nous sommes fiers d'annoncer notre nouveau partenariat qui enrichira notre offre de formations techniques.",
      readTime: "2 min"
    },
    {
      id: 3,
      title: "Certification Huawei : Nouveaux Modules Disponibles",
      date: "8 Septembre 2025",
      category: "Certification",
      excerpt: "Élargissez vos compétences avec nos nouveaux modules de certification Huawei en télécommunications et solutions cloud.",
      readTime: "4 min"
    },
    {
      id: 4,
      title: "Succès de nos Diplômés : Témoignages",
      date: "5 Septembre 2025",
      category: "Témoignages",
      excerpt: "Découvrez les parcours inspirants de nos anciens participants et leurs réussites professionnelles.",
      readTime: "5 min"
    },
    {
      id: 5,
      title: "Formation Hybride : L'Avenir de l'Apprentissage",
      date: "1 Septembre 2025",
      category: "Innovation",
      excerpt: "Comment notre approche hybride révolutionne l'expérience d'apprentissage en combinant présentiel et digital.",
      readTime: "6 min"
    },
    {
      id: 6,
      title: "Ouverture du Nouveau Campus à Casablanca",
      date: "28 Août 2025",
      category: "Infrastructure",
      excerpt: "Un nouveau campus ultramoderne pour mieux vous accueillir et enrichir votre expérience de formation.",
      readTime: "3 min"
    }
  ]

  const categories = ["Toutes", "Formation", "Partenariat", "Certification", "Témoignages", "Innovation", "Infrastructure"]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Actualités & <span className="text-[#00a0e8]">Nouveautés</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            Restez informé des dernières actualités, innovations et opportunités de Win to Win. 
            Découvrez nos nouveautés et suivez l'évolution de nos programmes.
          </p>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="px-4 pb-12 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                index === 0 
                  ? 'bg-[#00a0e8] text-white' 
                  : 'bg-white text-gray-700 hover:bg-[#00a0e8] hover:text-white border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* News Grid */}
      <section className="px-4 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article) => (
            <Link
              key={article.id}
              href={`/news/article-${article.id}`}
              className="block"
            >
              <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {/* Article Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-[#00a0e8] to-[#0080c7] relative">
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-[#00a0e8] px-3 py-1 rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 text-white/90 text-sm">
                    📖 {article.readTime}
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <span>📅 {article.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <span className="text-[#00a0e8] font-medium hover:text-[#0080c7] transition-colors inline-flex items-center gap-1">
                    Lire la suite →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-white border-2 border-[#00a0e8] text-[#00a0e8] px-8 py-3 rounded-full font-medium hover:bg-[#00a0e8] hover:text-white transition-all duration-300">
            Charger Plus d'Articles
          </button>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="bg-gradient-to-r from-[#00a0e8] to-[#0080c7] px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ne Manquez Aucune Actualité
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Inscrivez-vous à notre newsletter pour recevoir les dernières nouvelles et opportunités directement dans votre boîte mail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-full border-0 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors whitespace-nowrap">
              S'abonner
            </button>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  )
}