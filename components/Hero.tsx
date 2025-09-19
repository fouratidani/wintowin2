"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const backgroundImages = [
    '/images/img.jpg',
    '/images/pq.jpg',
    '/images/img.jpg',
    '/images/pq.jpg',
  ]

  // Auto-change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [backgroundImages.length])

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? backgroundImages.length - 1 : prevIndex - 1
    )
  }

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % backgroundImages.length
    )
  }

  return (
    <section id="accueil" className="relative min-h-screen flex items-end justify-start overflow-hidden">
      {/* Background Images with Overlay */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${image}')`,
          }}
        />
      ))}

      <div className="relative z-10 p-8 md:p-16 lg:p-24 mb-16">
        <div className="max-w-2xl">
          {/* Main Heading - Made smaller */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-none font-kontora">
            <span className="text-white">WIN</span>
            <span className="text-[#00a0e8]">TO</span>
            <span className="text-white">WIN</span>
          </h1>

          {/* Description - Made smaller */}
          <p className="text-white text-lg md:text-xl lg:text-2xl font-normal mb-8 max-w-3xl leading-relaxed font-poppins">
            Chez Win to Win, nous transformons le potentiel en succès. Grâce à notre expertise technique et notre
            approche sur-mesure, nous accompagnons chacun de nos partenaires vers l'excellence.
          </p>

          {/* CTA Button - Made smaller */}
          <button className="bg-[#00a0e8] text-white font-bold text-lg md:text-xl px-8 py-4 rounded-lg hover:bg-[#0088cc] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-poppins">
            <Link href="/services">Découvrir Nos Services</Link>
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 right-8 flex space-x-4">
        <button 
          onClick={handlePrevious}
          className="bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-white/30 transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={handleNext}
          className="bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-white/30 transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-[#00a0e8] transition-all duration-300"
          style={{ 
            width: `${((currentImageIndex + 1) / backgroundImages.length) * 100}%` 
          }}
        />
      </div>
    </section>
  )
}
