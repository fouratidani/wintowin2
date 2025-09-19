"use client"

import { useState } from 'react'

export default function Formations() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const formations = [
    {
      title: "Formation en Développement Web",
      description:
        "Apprenez les technologies modernes du web : HTML5, CSS3, JavaScript, React. Formation pratique avec projets réels.",
      color: "border-[#ffae00]",
      size: "large",
    },
    {
      title: "Formation Marketing Digital",
      description:
        "Maîtrisez les stratégies du marketing numérique, SEO, réseaux sociaux et publicité en ligne.",
      color: "border-[#00a0e8]",
      size: "small",
    },
    {
      title: "Formation Design UX/UI",
      description:
        "Créez des interfaces utilisateur intuitives et esthétiques avec les outils de design modernes.",
      color: "border-[#00a0e8]",
      size: "small",
    },
    {
      title: "Formation Data Science",
      description:
        "Analysez et visualisez les données avec Python, R et des outils d'analyse avancés.",
      color: "border-[#ffae00]",
      size: "large",
    },
    {
      title: "Formation Cybersécurité",
      description:
        "Protégez les systèmes et réseaux contre les menaces avec les dernières techniques de sécurité.",
      color: "border-[#00a0e8]",
      size: "small",
    },
    {
      title: "Formation IA & Machine Learning",
      description:
        "Développez des solutions intelligentes avec l'intelligence artificielle et l'apprentissage automatique.",
      color: "border-[#00a0e8]",
      size: "small",
    },
  ]

  const cardsPerPage = 3
  const maxIndex = Math.max(0, formations.length - cardsPerPage)

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1))
  }

  const visibleFormations = formations.slice(currentIndex, currentIndex + cardsPerPage)

  return (
    <section id="formations" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-semibold text-[#11023f] mb-6 font-kontora">Nos Formations</h2>
          <p className="text-black text-lg md:text-xl max-w-4xl mx-auto font-poppins">
            Nous offrons des formations courtes et ciblées dans plusieurs domaines, adaptées aux besoins du marché
            actuel et conçues pour renforcer rapidement vos compétences pratiques.
          </p>
        </div>

        {/* Formations Container with Navigation */}
        <div className="relative">
          <div className="flex items-center justify-center gap-8">
            {/* Left Navigation Button */}
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`flex-shrink-0 rounded-full p-4 transition-all duration-300 ${
                currentIndex === 0
                  ? 'bg-gray-300 cursor-not-allowed opacity-50'
                  : 'bg-[#00a0e8] hover:bg-[#0085c3] cursor-pointer'
              }`}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Formation Cards Container */}
            <div className="flex-1 max-w-5xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleFormations.map((formation, index) => (
                  <div
                    key={currentIndex + index}
                    className={`bg-white rounded-2xl shadow-lg border-2 ${formation.color} p-6 transition-all duration-500 transform hover:scale-105 hover:shadow-xl`}
                  >
                    <h3 className="text-xl font-bold text-black mb-4 font-kontora">{formation.title}</h3>
                    <p className="text-black text-sm mb-6 leading-relaxed font-poppins">{formation.description}</p>
                    <button
                      className={`text-sm font-bold font-poppins transition-all duration-300 ${
                        formation.color === "border-[#ffae00]" 
                          ? "text-[#ffae00] hover:text-[#e69a00]" 
                          : "text-[#00a0e8] hover:text-[#0085c3]"
                      } hover:underline`}
                    >
                      Voir Plus →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Navigation Button */}
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`flex-shrink-0 rounded-full p-4 transition-all duration-300 ${
                currentIndex >= maxIndex
                  ? 'bg-gray-300 cursor-not-allowed opacity-50'
                  : 'bg-[#00a0e8] hover:bg-[#0085c3] cursor-pointer'
              }`}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'bg-[#00a0e8] scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600 font-poppins">
              {currentIndex + 1} - {Math.min(currentIndex + cardsPerPage, formations.length)} sur {formations.length} formations
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
