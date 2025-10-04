'use client'

interface LocationMapProps {
  address: string
  lat?: number
  lng?: number
  className?: string
}

export default function LocationMap({ 
  address, 
  lat = 36.8065, // Tunis coordinates for 97 Avenue de la Liberté
  lng = 10.1815, 
  className = ''
}: LocationMapProps) {
  const openInGoogleMaps = () => {
    const query = encodeURIComponent(address)
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank')
  }

  const openInAppleMaps = () => {
    const query = encodeURIComponent(address)
    window.open(`https://maps.apple.com/?q=${query}`, '_blank')
  }

  return (
    <div className={`w-full rounded-2xl overflow-hidden shadow-lg ${className}`}>
      {/* Interactive Map Preview */}
      <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 h-64">
        {/* Map-like background */}
        <div className="absolute inset-0 opacity-20">
          <svg
            className="w-full h-full"
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Simulated streets */}
            <path d="M0 150 L400 150" stroke="#d1d5db" strokeWidth="3"/>
            <path d="M200 0 L200 300" stroke="#d1d5db" strokeWidth="3"/>
            <path d="M0 100 L400 100" stroke="#e5e7eb" strokeWidth="2"/>
            <path d="M0 200 L400 200" stroke="#e5e7eb" strokeWidth="2"/>
            <path d="M100 0 L100 300" stroke="#e5e7eb" strokeWidth="2"/>
            <path d="M300 0 L300 300" stroke="#e5e7eb" strokeWidth="2"/>
            
            {/* Buildings */}
            <rect x="80" y="120" width="40" height="60" fill="#f3f4f6" stroke="#d1d5db"/>
            <rect x="280" y="140" width="35" height="40" fill="#f3f4f6" stroke="#d1d5db"/>
            <rect x="150" y="80" width="30" height="50" fill="#f3f4f6" stroke="#d1d5db"/>
          </svg>
        </div>

        {/* Location marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            {/* Pulse animation */}
            <div className="absolute inset-0 bg-[#00a0e8] rounded-full animate-ping opacity-30"></div>
            
            {/* Main marker */}
            <div className="relative bg-[#00a0e8] text-white p-3 rounded-full shadow-lg">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Info card */}
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-md p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Win2Win</h3>
              <p className="text-sm text-gray-600 mb-2">{address}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="text-[#00a0e8]">📞 +216 50 366 499</span>
                <span className="text-[#00a0e8]">✉️ contact@winstowin.com</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 ml-4">
              <button
                onClick={openInGoogleMaps}
                className="bg-[#00a0e8] text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-[#0080c7] transition-colors"
              >
                Google Maps
              </button>
              <button
                onClick={openInAppleMaps}
                className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md text-xs font-medium hover:bg-gray-200 transition-colors"
              >
                Apple Maps
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional contact info */}
      <div className="bg-white p-4 border-t">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-4">
            <span className="text-gray-600">📍 Tunis, Tunisie</span>
            <span className="text-gray-600">🕒 Lun-Ven 8h-18h</span>
          </div>
          
          <div className="flex gap-2">
            <a
              href="tel:+21650366499"
              className="flex items-center gap-1 text-[#00a0e8] hover:text-[#0080c7] transition-colors"
            >
              <span>📞</span>
              Appeler
            </a>
            <span className="text-gray-300">|</span>
            <a
              href="mailto:contact@winstowin.com"
              className="flex items-center gap-1 text-[#00a0e8] hover:text-[#0080c7] transition-colors"
            >
              <span>✉️</span>
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}