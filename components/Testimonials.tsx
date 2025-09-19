"use client"

import { useState, useEffect } from 'react'

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const testimonials = [
    {
      id: 1,
      quote: "Grâce à Win to Win, j'ai pu développer mes compétences en développement web et décrocher le poste de mes rêves. L'accompagnement personnalisé et la qualité des formations sont exceptionnels.",
      name: "Sarah Martinez",
      occupation: "Développeuse Full-Stack",
      image: "/images/person.jpg"
    },
    {
      id: 2,
      quote: "La formation en marketing digital m'a permis de transformer complètement ma carrière. Les formateurs sont des experts dans leur domaine et savent transmettre leur passion.",
      name: "Ahmed Benali",
      occupation: "Consultant Marketing Digital",
      image: "/images/person.jpg"
    },
    {
      id: 3,
      quote: "Win to Win propose des formations de qualité exceptionnelle. J'ai acquis des compétences concrètes qui m'ont permis de lancer ma propre startup tech avec succès.",
      name: "Marie Dubois",
      occupation: "CEO & Fondatrice",
      image: "/images/person.jpg"
    },
    {
      id: 4,
      quote: "L'approche pédagogique de Win to Win est remarquable. Ils m'ont aidé à me reconvertir dans la cybersécurité avec un suivi personnalisé tout au long du parcours.",
      name: "Karim El Mansouri",
      occupation: "Expert en Cybersécurité",
      image: "/images/person.jpg"
    }
  ]

  // Auto-rotate testimonials every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
        setIsTransitioning(false)
      }, 300) // Half of transition duration
    }, 6000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const handlePrevious = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentTestimonial((prev) => 
        prev === 0 ? testimonials.length - 1 : prev - 1
      )
      setIsTransitioning(false)
    }, 300)
  }

  const handleNext = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      setIsTransitioning(false)
    }, 300)
  }

  const currentData = testimonials[currentTestimonial]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-semibold text-[#11023f] mb-6 font-kontora">Témoignages</h2>
          <p className="text-[#11023f] text-lg md:text-xl max-w-4xl mx-auto font-poppins">
            Découvrez ce que disent nos partenaires et participants de leur expérience avec nous.
          </p>
        </div>

        {/* Testimonial */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-start">
            <div className={`w-80 h-80 rounded-2xl overflow-hidden transition-all duration-600 ${
              isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}>
              <img 
                src={currentData.image} 
                alt={`Photo de ${currentData.name}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Testimonial Content */}
          <div className={`transition-all duration-600 ${
            isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}>
            <blockquote className="text-[#11023f] text-3xl md:text-4xl font-normal mb-8 leading-relaxed font-poppins">
              "{currentData.quote}"
            </blockquote>
            <div className="mb-8">
              <h4 className="text-[#11023f] text-2xl font-medium mb-2 font-kontora">{currentData.name}</h4>
              <p className="text-[#11023f] text-lg font-light font-poppins">{currentData.occupation}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center space-x-4 mt-12">
          <button 
            onClick={handlePrevious}
            className="bg-gray-200 rounded-full p-3 hover:bg-gray-300 transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={handleNext}
            className="bg-gray-200 rounded-full p-3 hover:bg-gray-300 transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true)
                setTimeout(() => {
                  setCurrentTestimonial(index)
                  setIsTransitioning(false)
                }, 300)
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentTestimonial === index
                  ? 'bg-[#00a0e8] scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 max-w-md mx-auto">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#00a0e8] transition-all duration-300"
              style={{ 
                width: `${((currentTestimonial + 1) / testimonials.length) * 100}%` 
              }}
            />
          </div>
          <div className="text-center mt-2">
            <span className="text-sm text-gray-600 font-poppins">
              {currentTestimonial + 1} sur {testimonials.length} témoignages
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
