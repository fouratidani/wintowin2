'use client'

import { useEffect, useRef, useState } from 'react'

interface GoogleMapProps {
  address: string
  lat?: number
  lng?: number
  zoom?: number
  height?: string
  className?: string
  apiKey?: string
}

declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export default function GoogleMap({ 
  address, 
  lat = 36.8065, // Tunis coordinates for 97 Avenue de la Liberté  
  lng = 10.1815, 
  zoom = 15, 
  height = '400px',
  className = '',
  apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!apiKey) {
      setError('Google Maps API key not configured')
      setIsLoading(false)
      return
    }

    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      initializeMap()
      return
    }

    // Load Google Maps script
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`
    script.async = true
    script.defer = true
    
    window.initMap = initializeMap
    
    script.onerror = () => {
      setError('Failed to load Google Maps')
      setIsLoading(false)
    }
    
    document.head.appendChild(script)

    return () => {
      if (script.parentNode) {
        document.head.removeChild(script)
      }
    }
  }, [lat, lng, zoom, apiKey])

  const initializeMap = () => {
    if (!mapRef.current || !window.google) {
      setError('Map container not ready')
      setIsLoading(false)
      return
    }

    try {
      // Initialize map with professional styling
      const mapOptions = {
        center: { lat, lng },
        zoom,
        styles: [
          {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [{ "visibility": "off" }]
          },
          {
            "featureType": "poi",
            "stylers": [{ "visibility": "off" }]
          },
          {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [{ "visibility": "off" }]
          },
          {
            "featureType": "transit",
            "stylers": [{ "visibility": "off" }]
          }
        ],
        mapTypeControl: false,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        gestureHandling: 'cooperative'
      }

      const map = new window.google.maps.Map(mapRef.current, mapOptions)
      mapInstanceRef.current = map

      // Add custom marker for Win2Win location
      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map,
        title: 'Win2Win - Formation Professionnelle',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="20" fill="#00a0e8" stroke="white" stroke-width="4"/>
              <circle cx="24" cy="24" r="12" fill="white"/>
              <text x="24" y="28" text-anchor="middle" fill="#00a0e8" font-family="Arial" font-size="14" font-weight="bold">W</text>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(48, 48),
          anchor: new window.google.maps.Point(24, 48)
        },
        animation: window.google.maps.Animation.DROP
      })

      // Create rich info window content
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 16px; font-family: 'Poppins', sans-serif; max-width: 300px;">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
              <img src="/images/logo.png" alt="Win2Win" style="width: 32px; height: 32px; margin-right: 8px; border-radius: 4px;">
              <div>
                <h3 style="margin: 0; color: #00a0e8; font-size: 18px; font-weight: 600;">Win2Win</h3>
                <p style="margin: 0; color: #6b7280; font-size: 13px;">Formation Professionnelle</p>
              </div>
            </div>
            
            <div style="margin-bottom: 12px;">
              <p style="margin: 0 0 4px 0; color: #374151; font-size: 14px; display: flex; align-items: center;">
                <span style="margin-right: 6px;">📍</span>
                ${address}
              </p>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px;">
              <a href="tel:+21650366499" style="color: #00a0e8; text-decoration: none; font-size: 13px; display: flex; align-items: center;">
                <span style="margin-right: 6px;">📞</span>
                +216 50 366 499
              </a>
              <a href="tel:+21626172216" style="color: #00a0e8; text-decoration: none; font-size: 13px; display: flex; align-items: center;">
                <span style="margin-right: 6px;">📞</span>
                +216 26 172 216
              </a>
              <a href="mailto:contact@winstowin.com" style="color: #00a0e8; text-decoration: none; font-size: 13px; display: flex; align-items: center;">
                <span style="margin-right: 6px;">✉️</span>
                contact@winstowin.com
              </a>
            </div>
            
            <div style="display: flex; gap: 8px; margin-top: 12px;">
              <a href="${window.location.origin}" target="_blank" style="background: #00a0e8; color: white; padding: 6px 12px; border-radius: 6px; text-decoration: none; font-size: 12px; font-weight: 500;">
                Voir le site
              </a>
              <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}" target="_blank" style="background: #f3f4f6; color: #374151; padding: 6px 12px; border-radius: 6px; text-decoration: none; font-size: 12px; font-weight: 500;">
                Itinéraire
              </a>
            </div>
          </div>
        `,
        maxWidth: 320
      })

      // Open info window on marker click
      marker.addListener('click', () => {
        infoWindow.open(map, marker)
      })

      // Auto-open info window briefly
      setTimeout(() => {
        infoWindow.open(map, marker)
        // Auto-close after 5 seconds
        setTimeout(() => {
          infoWindow.close()
        }, 5000)
      }, 1000)

      setIsLoading(false)
    } catch (err) {
      setError('Failed to initialize map')
      setIsLoading(false)
    }
  }

  if (error || !apiKey) {
    return (
      <div className={`w-full rounded-2xl overflow-hidden bg-gray-100 ${className}`} style={{ height }}>
        <div className="h-full flex flex-col items-center justify-center p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Carte non disponible</h3>
          <p className="text-sm text-gray-600 mb-4">{address}</p>
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#00a0e8] text-white px-4 py-2 rounded-lg hover:bg-[#0080c7] transition-colors text-sm font-medium"
          >
            Voir sur Google Maps
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full rounded-2xl overflow-hidden shadow-lg ${className}`}>
      <div 
        ref={mapRef} 
        style={{ height, width: '100%' }}
        className="bg-gray-100"
      >
        {isLoading && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-600">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00a0e8] mx-auto mb-2"></div>
              <p className="text-sm">Chargement de la carte...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}