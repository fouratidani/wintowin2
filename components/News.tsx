import Link from "next/link"
export default function News() {
  const newsItems = [
    { 
      title: "Nouvelle formation en développement web",
      content: "Découvrez notre nouvelle formation complète en développement web full-stack, conçue pour vous préparer aux métiers de demain.",
      hoverGradient: "from-yellow-300 via-orange-200 to-yellow-100",
      link: "/news/formation-dev-web"
    },
    { 
      title: "Partenariat avec des entreprises allemandes",
      content: "Win to Win annonce de nouveaux partenariats stratégiques avec des entreprises leaders en Allemagne pour le programme Ausbildung.",
      hoverGradient: "from-yellow-300 via-orange-200 to-yellow-100",
      link: "/news/partenariat-allemagne"
    },
    { 
      title: "Succès de nos diplômés en cybersécurité",
      content: "Plus de 95% de nos diplômés en cybersécurité ont trouvé un emploi dans les 3 mois suivant leur certification.",
      hoverGradient: "from-yellow-300 via-orange-200 to-yellow-100",
      link: "/news/succes-cybersecurite"
    },
    { 
      title: "Ouverture d'un nouveau centre à Casablanca",
      content: "Win to Win étend ses activités avec l'ouverture d'un nouveau centre de formation moderne à Casablanca.",
      hoverGradient: "from-yellow-300 via-orange-200 to-yellow-100",
      link: "/news/nouveau-centre-casablanca"
    },
  ]

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
            <button className="bg-[#00a0e8] text-white font-semibold text-lg px-8 py-4 rounded-full hover:bg-[#0088cc] transition-all duration-300">
              <Link href="/news" passHref>
                  Voir Plus
              </Link>
            </button>
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
