'use client'

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"
import Link from "next/link"
import { newsApi } from "../../../lib/api"

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

export default function ArticlePage() {
  const params = useParams()
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([])

  useEffect(() => {
    const fetchArticle = async () => {
      if (!params?.id) {
        setError('ID d\'article manquant')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        
        // Extract ID from params (remove 'article-' prefix if present)
        let articleId = params.id as string
        if (articleId.startsWith('article-')) {
          articleId = articleId.replace('article-', '')
        }

        // First try to get all articles and find the specific one
        const allArticles = await newsApi.getAll()
        
        if (allArticles && allArticles.length > 0) {
          const foundArticle = allArticles.find((a: NewsArticle) => a.id.toString() === articleId)
          
          if (foundArticle) {
            setArticle(foundArticle)
            
            // Get related articles (same category, different article)
            const related = allArticles
              .filter((a: NewsArticle) => a.category === foundArticle.category && a.id !== foundArticle.id)
              .slice(0, 3)
            setRelatedArticles(related)
          } else {
            setError('Article non trouvé')
          }
        } else {
          // Fallback article if backend is not available
          const fallbackArticle: NewsArticle = {
            id: parseInt(articleId),
            title: "Article en cours de chargement",
            content: `<h2>Contenu de l'article</h2><p>Le contenu de cet article sera bientôt disponible. Notre équipe travaille activement pour vous proposer du contenu de qualité.</p><p>En attendant, n'hésitez pas à découvrir nos autres actualités ou à consulter nos formations.</p>`,
            excerpt: "Cet article sera bientôt disponible avec du contenu détaillé.",
            category: "Actualités",
            isPublished: true,
            publishDate: new Date().toISOString(),
            readTime: "2 min",
            createdAt: new Date().toISOString()
          }
          setArticle(fallbackArticle)
        }
      } catch (err) {
        console.error('Error fetching article:', err)
        setError('Erreur lors du chargement de l\'article')
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [params?.id])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const textContent = content.replace(/<[^>]*>/g, '') // Strip HTML tags
    const wordCount = textContent.split(' ').length
    const readTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readTime} min`
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50">
          <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-8 w-1/3"></div>
                <div className="h-64 bg-gray-200 rounded mb-8"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (error || !article) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50">
          <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-red-50 border border-red-200 rounded-lg p-8">
                <h1 className="text-2xl font-bold text-red-800 mb-4">Article non trouvé</h1>
                <p className="text-red-600 mb-6">{error || "L'article que vous cherchez n'existe pas ou a été supprimé."}</p>
                <div className="space-x-4">
                  <Link 
                    href="/news"
                    className="bg-[#00a0e8] text-white px-6 py-2 rounded-full hover:bg-[#0080c7] transition-colors"
                  >
                    Retour aux actualités
                  </Link>
                  <Link 
                    href="/"
                    className="bg-gray-600 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    Accueil
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="pt-32 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <nav className="flex items-center space-x-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-[#00a0e8]">Accueil</Link>
              <span>/</span>
              <Link href="/news" className="hover:text-[#00a0e8]">Actualités</Link>
              <span>/</span>
              <span className="text-gray-700">{article.title}</span>
            </nav>
          </div>
        </div>

        {/* Article Content */}
        <article className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-[#00a0e8] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {article.category}
                </span>
                <span className="text-gray-500 text-sm">
                  📖 {article.readTime}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {article.title}
              </h1>
              
              <div className="flex items-center gap-6 text-gray-600 text-sm">
                <div className="flex items-center gap-2">
                  <span>👤</span>
                  <span>Win to Win</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📅</span>
                  <span>{formatDate(article.publishDate)}</span>
                </div>
              </div>
            </header>

            {/* Article Image */}
            {article.image && (
              <div className="mb-8">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
              <div 
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>

            {/* Share Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Partager cet article</h3>
              <div className="flex items-center gap-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Facebook
                </button>
                <button className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors">
                  Twitter
                </button>
                <button className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors">
                  LinkedIn
                </button>
              </div>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Articles liés</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedArticles.map((relatedArticle) => (
                    <Link
                      key={relatedArticle.id}
                      href={`/news/${relatedArticle.id}`}
                      className="block group"
                    >
                      <article className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-32 bg-gradient-to-br from-[#00a0e8] to-[#0080c7]">
                          {relatedArticle.image ? (
                            <img 
                              src={relatedArticle.image} 
                              alt={relatedArticle.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#00a0e8] to-[#0080c7]"></div>
                          )}
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#00a0e8] transition-colors">
                            {relatedArticle.title}
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {relatedArticle.excerpt}
                          </p>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-12 text-center">
              <Link 
                href="/news"
                className="bg-[#00a0e8] text-white px-8 py-3 rounded-full font-medium hover:bg-[#0080c7] transition-colors inline-flex items-center gap-2"
              >
                ← Retour aux actualités
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}