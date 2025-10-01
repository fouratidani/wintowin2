"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { carouselApi, type CarouselItem } from '@/lib/api'
import { trackEvent } from '@/lib/cookie-consent'

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fallback data in case API fails
  const fallbackItems: CarouselItem[] = [
    {
      id: 1,
      title: 'WINTOWIN',
      description: 'Chez Win to Win, nous transformons le potentiel en succès. Grâce à notre expertise technique et notre approche sur-mesure, nous accompagnons chacun de nos partenaires vers l\'excellence.',
      image: '/images/img.jpg',
      buttonText: 'Découvrir Nos Services',
      buttonLink: '/services',
      isActive: true,
      order: 1,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: 'WINTOWIN',
      description: 'Transformons ensemble votre potentiel en succès avec nos formations spécialisées et notre accompagnement personnalisé.',
      image: '/images/pq.jpg',
      buttonText: 'Voir Nos Formations',
      buttonLink: '/formations',
      isActive: true,
      order: 2,
      createdAt: new Date().toISOString()
    }
  ]

  // Fetch carousel data from API
  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        setLoading(true)
        const data = await carouselApi.getAll()
        const activeItems = data.filter((item: CarouselItem) => item.isActive)
          .sort((a: CarouselItem, b: CarouselItem) => a.order - b.order)
        
        if (activeItems.length > 0) {
          setCarouselItems(activeItems)
        } else {
          // Use fallback if no active items
          setCarouselItems(fallbackItems)
        }
        setError(null)
      } catch (err) {
        console.error('Failed to fetch carousel data:', err)
        setError('Failed to load carousel data')
        // Use fallback data on error
        setCarouselItems(fallbackItems)
      } finally {
        setLoading(false)
      }
    }

    fetchCarouselData()
  }, [])

  // Auto-change image every 5 seconds
  useEffect(() => {
    if (carouselItems.length === 0) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % carouselItems.length
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [carouselItems.length])

  const handlePrevious = () => {
    const newIndex = currentImageIndex === 0 ? carouselItems.length - 1 : currentImageIndex - 1
    setCurrentImageIndex(newIndex)
    
    // Track carousel navigation
    trackEvent({
      eventType: 'click',
      eventCategory: 'Hero',
      eventAction: 'Carousel Navigation',
      eventLabel: 'Previous',
      pageUrl: window.location.href,
      referrer: document.referrer || '',
      additionalData: { 
        from_slide: currentImageIndex + 1,
        to_slide: newIndex + 1,
        total_slides: carouselItems.length
      }
    })
  }

  const handleNext = () => {
    const newIndex = (currentImageIndex + 1) % carouselItems.length
    setCurrentImageIndex(newIndex)
    
    // Track carousel navigation
    trackEvent({
      eventType: 'click',
      eventCategory: 'Hero',
      eventAction: 'Carousel Navigation',
      eventLabel: 'Next',
      pageUrl: window.location.href,
      referrer: document.referrer || '',
      additionalData: { 
        from_slide: currentImageIndex + 1,
        to_slide: newIndex + 1,
        total_slides: carouselItems.length
      }
    })
  }

  // Show loading state
  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00a0e8] mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </section>
    )
  }

  // Get current carousel item
  const currentItem = carouselItems[currentImageIndex]

  return (
    <section id="accueil" className="relative min-h-screen flex items-end justify-start overflow-hidden">
      {/* Background Images with Overlay */}
      {carouselItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: item.image 
              ? `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${item.image}')`
              : `linear-gradient(135deg, #00a0e8 0%, #0080c7 100%)`,
          }}
        />
      ))}

      <div className="relative z-10 p-8 md:p-16 lg:p-24 mb-16">
        <div className="max-w-2xl">
          {/* Dynamic Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-none font-kontora">
            {currentItem?.title === 'WINTOWIN' ? (
              <>
                <span className="text-white">WIN</span>
                <span className="text-[#00a0e8]">TO</span>
                <span className="text-white">WIN</span>
              </>
            ) : (
              <span className="text-white">{currentItem?.title}</span>
            )}
          </h1>

          {/* Dynamic Description */}
          <p className="text-white text-lg md:text-xl lg:text-2xl font-normal mb-8 max-w-3xl leading-relaxed font-poppins">
            {currentItem?.description}
          </p>

          {/* Dynamic CTA Button */}
          <Link 
            href="/services"
            onClick={() => trackEvent({
              eventType: 'click',
              eventCategory: 'Hero',
              eventAction: 'CTA Click',
              eventLabel: 'Découvrir nos services',
              pageUrl: window.location.href,
              referrer: document.referrer || '',
              additionalData: { carousel_item: currentItem?.title }
            })}
            className="bg-[#00a0e8] text-white font-bold text-lg md:text-xl px-8 py-4 rounded-lg hover:bg-[#0088cc] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-poppins inline-block"
          >
            Découvrir nos services
          </Link>
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
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentImageIndex(index)
              trackEvent({
                eventType: 'click',
                eventCategory: 'Hero',
                eventAction: 'Carousel Indicator',
                eventLabel: `Slide ${index + 1}`,
                pageUrl: window.location.href,
                referrer: document.referrer || '',
                additionalData: { 
                  from_slide: currentImageIndex + 1,
                  to_slide: index + 1,
                  total_slides: carouselItems.length
                }
              })
            }}
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
            width: `${((currentImageIndex + 1) / carouselItems.length) * 100}%` 
          }}
        />
      </div>
    </section>
  )
}
