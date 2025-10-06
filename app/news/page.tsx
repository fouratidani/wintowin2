'use client'

import { useState, useEffect } from "react"
import { Metadata } from 'next'
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Link from "next/link"
import { newsApi } from "../../lib/api"
import JSONLD from "../../components/JSONLD"
import { generateWebPageSchema } from "../../lib/seo"

interface NewsArticle {
  id: number
  title: string
  content: string
  excerpt: string
  category: string
  image?: string
  isPublished: boolean
  publishDate: string
  readTime: string
  createdAt: string
  updatedAt?: string
}

export default function News() {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([])
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("Toutes")
  const [displayCount, setDisplayCount] = useState(6)
  const [categories, setCategories] = useState<string[]>(["Toutes"])

  const pageSchema = generateWebPageSchema({
    title: "Actualités et News - Win2Win Formation",
    description: "Découvrez les dernières actualités de Win2Win, conseils pour votre formation en allemand.",
    url: "/news",
    breadcrumbs: [
      { name: "Accueil", url: "/" },
      { name: "Actualités", url: "/news" }
    ]
  })

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const data = await newsApi.getAll()
        
        if (data && data.length > 0) {
          setNewsArticles(data)
          setFilteredArticles(data)
          
          // Extract unique categories from articles
          const articleCategories = data.map((article: any) => article.category).filter((cat: any) => Boolean(cat)) as string[]
          const uniqueCategories: string[] = ["Toutes", ...new Set(articleCategories)]
          setCategories(uniqueCategories)
        } else {
          // Fallback data if backend is not available
          const fallbackArticles: NewsArticle[] = [
            {
              id: 1,
              title: "Nouvelle Formation en Intelligence Artificielle",
              content: "Découvrez notre nouveau programme de formation en IA...",
              excerpt: "Découvrez notre nouveau programme de formation en IA, conçu pour les professionnels souhaitant maîtriser les technologies de demain.",
              category: "Formation",
              isPublished: true,
              publishDate: "2025-09-15T00:00:00.000Z",
              readTime: "3 min",
              createdAt: "2025-09-15T00:00:00.000Z"
            },
            {
              id: 2,
              title: "Partenariat Stratégique avec Tech Solutions",
              content: "Nous sommes fiers d'annoncer notre nouveau partenariat...",
              excerpt: "Nous sommes fiers d'annoncer notre nouveau partenariat qui enrichira notre offre de formations techniques.",
              category: "Partenariat",
              isPublished: true,
              publishDate: "2025-09-10T00:00:00.000Z",
              readTime: "2 min",
              createdAt: "2025-09-10T00:00:00.000Z"
            },
            {
              id: 3,
              title: "Certification Huawei : Nouveaux Modules Disponibles",
              content: "Élargissez vos compétences avec nos nouveaux modules...",
              excerpt: "Élargissez vos compétences avec nos nouveaux modules de certification Huawei en télécommunications et solutions cloud.",
              category: "Certification",
              isPublished: true,
              publishDate: "2025-09-08T00:00:00.000Z",
              readTime: "4 min",
              createdAt: "2025-09-08T00:00:00.000Z"
            }
          ]
          setNewsArticles(fallbackArticles)
          setFilteredArticles(fallbackArticles)
        }
      } catch (err) {
        setError('Erreur lors du chargement des actualités')
        console.error('Error fetching news:', err)
        
        // Fallback data on error
        const fallbackArticles: NewsArticle[] = [
          {
            id: 1,
            title: "Nouvelle Formation en Intelligence Artificielle",
            content: "Découvrez notre nouveau programme de formation en IA...",
            excerpt: "Découvrez notre nouveau programme de formation en IA, conçu pour les professionnels souhaitant maîtriser les technologies de demain.",
            category: "Formation",
            isPublished: true,
            publishDate: new Date().toISOString(), // Current date to show "Nouveau" badge
            readTime: "3 min",
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            title: "Nouveaux Partenariats avec des Entreprises Allemandes",
            content: "Win2Win renforce ses liens avec l'Allemagne...",
            excerpt: "Découvrez nos nouveaux partenariats qui ouvrent de nouvelles opportunités pour nos étudiants en Allemagne.",
            category: "Partenariat",
            isPublished: true,
            publishDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
            readTime: "5 min",
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 3,
            title: "Réussites de nos Étudiants en Cybersécurité",
            content: "Nos diplômés excellent dans le domaine de la cybersécurité...",
            excerpt: "Témoignages inspirants de nos anciens étudiants qui ont réussi leur carrière en cybersécurité.",
            category: "Témoignage",
            isPublished: true,
            publishDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago (no badge)
            readTime: "4 min",
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
          }
        ]
        setNewsArticles(fallbackArticles)
        setFilteredArticles(fallbackArticles)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  useEffect(() => {
    if (selectedCategory === "Toutes") {
      setFilteredArticles(newsArticles)
    } else {
      setFilteredArticles(newsArticles.filter(article => article.category === selectedCategory))
    }
    setDisplayCount(6) // Reset display count when category changes
  }, [selectedCategory, newsArticles])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long', 
      year: 'numeric'
    })
  }

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(' ').length
    const readTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readTime} min`
  }

  const isNewArticle = (publishDate: string) => {
    const articleDate = new Date(publishDate)
    const currentDate = new Date()
    const diffInTime = currentDate.getTime() - articleDate.getTime()
    const diffInDays = diffInTime / (1000 * 3600 * 24)
    return diffInDays <= 3
  }

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 6)
  }

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
  }

  return (
    <>
      <JSONLD data={pageSchema} />
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
              onClick={() => handleCategoryFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                category === selectedCategory 
                  ? 'bg-[#00a0e8] text-white' 
                  : 'bg-white text-gray-700 hover:bg-[#00a0e8] hover:text-white border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="px-4 pb-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-3 w-1/3"></div>
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Error State */}
      {error && !loading && (
        <section className="px-4 pb-20 max-w-7xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </section>
      )}

      {/* News Grid */}
      {!loading && !error && (
        <section className="px-4 pb-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.slice(0, displayCount).map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.id}`}
                className="block"
              >
                <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  {/* Article Image */}
                  <div className="h-48 bg-gradient-to-br from-[#00a0e8] to-[#0080c7] relative overflow-hidden">
                    {article.image ? (
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#00a0e8] to-[#0080c7]"></div>
                    )}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-white/90 text-[#00a0e8] px-3 py-1 rounded-full text-sm font-medium">
                        {article.category}
                      </span>
                      {isNewArticle(article.publishDate) && (
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                          Nouveau
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-4 right-4 text-white/90 text-sm">
                      📖 {article.readTime}
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <span>📅 {formatDate(article.publishDate)}</span>
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
          {filteredArticles.length > displayCount && (
            <div className="text-center mt-12">
              <button 
                onClick={handleLoadMore}
                className="bg-white border-2 border-[#00a0e8] text-[#00a0e8] px-8 py-3 rounded-full font-medium hover:bg-[#00a0e8] hover:text-white transition-all duration-300"
              >
                Voir Plus d'Articles
              </button>
            </div>
          )}

          {/* No Articles Message */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucun article trouvé dans cette catégorie.</p>
            </div>
          )}
        </section>
      )}

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