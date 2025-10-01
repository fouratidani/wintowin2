"use client"

import { useState, useEffect } from 'react'
import Link from "next/link"
import { newsApi, type NewsArticle } from '@/lib/api'

export default function News() {
  const [newsItems, setNewsItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fallback data
  const fallbackItems = [
    { 
      id: '1',
      title: "Nouvelle formation en développement web",
      content: "Découvrez notre nouvelle formation complète en développement web full-stack, conçue pour vous préparer aux métiers de demain.",
      hoverGradient: "from-yellow-300 via-orange-200 to-yellow-100",
      link: "/news/article-1"
    },
    { 
      id: '2',
      title: "Partenariat avec des entreprises allemandes",
      content: "Win to Win annonce de nouveaux partenariats stratégiques avec des entreprises leaders en Allemagne pour le programme Ausbildung.",
      hoverGradient: "from-yellow-300 via-orange-200 to-yellow-100",
      link: "/news/article-1"
    },
    { 
      id: '3',
      title: "Succès de nos diplômés en cybersécurité",
      content: "Plus de 95% de nos diplômés en cybersécurité ont trouvé un emploi dans les 3 mois suivant leur certification.",
      hoverGradient: "from-yellow-300 via-orange-200 to-yellow-100",
      link: "/news/article-1"
    },
    { 
      id: '4',
      title: "Ouverture d'un nouveau centre à Casablanca",
      content: "Win to Win étend ses activités avec l'ouverture d'un nouveau centre de formation moderne à Casablanca.",
      hoverGradient: "from-yellow-300 via-orange-200 to-yellow-100",
      link: "/news/article-1"
    },
  ]

  // Fetch news data from API
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        setLoading(true)
        const data = await newsApi.getAll()
        const publishedItems = data.filter((item: NewsArticle) => item.isPublished)
          .sort((a: NewsArticle, b: NewsArticle) => 
            new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
          )
          .slice(0, 4) // Show latest 4 articles
          .map((item: NewsArticle) => ({
            ...item,
            content: item.excerpt || item.content,
            hoverGradient: "from-yellow-300 via-orange-200 to-yellow-100",
            link: `/news/${item.id}`
          }))
        
        if (publishedItems.length > 0) {
          setNewsItems(publishedItems)
        } else {
          // Use fallback if no published items
          setNewsItems(fallbackItems)
        }
        setError(null)
      } catch (err) {
        console.error('Failed to fetch news data:', err)
        setError('Failed to load news data')
        // Use fallback data on error
        setNewsItems(fallbackItems)
      } finally {
        setLoading(false)
      }
    }

    fetchNewsData()
  }, [])

  if (loading) {
    return (
      <section id="actualites" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-8"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="actualites" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Content */}
          <div>
            <h2 className="text-5xl md:text-6xl font-semibold text-[#11023f] mb-8">Actualités</h2>
            <p className="text-[#11023f] text-lg md:text-xl mb-8 leading-relaxed">
              Restez informés des dernières nouvelles, projets et initiatives.
            </p>
            <Link 
              href="/news"
              className="bg-[#00a0e8] text-white font-semibold text-lg px-8 py-4 rounded-full hover:bg-[#0088cc] transition-all duration-300 inline-block"
            >
              Voir Plus
            </Link>
          </div>

          {/* Right Content - News Cards */}
          <div className="space-y-4">
            {newsItems.map((item, index) => (
              <Link key={index} href={item.link} className="block">
                <div className="group relative bg-gradient-to-br from-blue-200 via-sky-100 to-blue-50 rounded-2xl p-6 shadow-lg cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] overflow-hidden">
                  {/* Hover Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-[#11023f] group-hover:text-[#11023f] text-xl font-bold mb-3 transition-all duration-500">
                      {item.title}
                    </h3>
                    <p className="text-[#11023f] group-hover:text-[#11023f] text-lg leading-relaxed transition-all duration-500">
                      {item.content}
                    </p>
                    
                    {/* Read More Indicator */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="text-[#11023f] font-semibold text-sm bg-white bg-opacity-50 px-3 py-1 rounded-full">
                        Lire la suite →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
