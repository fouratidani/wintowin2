'use client'

import React, { useState } from 'react'
import { useCookieConsent } from '../contexts/CookieConsentContext'
import { ConsentSettings } from '../lib/cookie-consent'

const CookieConsentBanner: React.FC = () => {
  const { showBanner, acceptAll, rejectAll, updateConsent } = useCookieConsent()
  const [showDetails, setShowDetails] = useState(false)
  const [customSettings, setCustomSettings] = useState<ConsentSettings>({
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false
  })

  if (!showBanner) return null

  const handleCustomSettingChange = (key: keyof ConsentSettings, value: boolean) => {
    if (key === 'essential') return // Essential cookies can't be disabled
    
    setCustomSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSaveCustomSettings = () => {
    updateConsent(customSettings)
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50 pointer-events-none" />
      
      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl">
        <div className="max-w-7xl mx-auto p-6">
          {!showDetails ? (
            // Simple Banner View
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-[#00a0e8] rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">🍪</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Respect de votre vie privée
                  </h3>
                </div>
                <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                  Nous utilisons des cookies pour améliorer votre expérience sur notre site, 
                  analyser le trafic et personnaliser le contenu. En continuant à naviguer, 
                  vous acceptez notre utilisation des cookies.
                </p>
                <div className="mt-3">
                  <button
                    onClick={() => setShowDetails(true)}
                    className="text-[#00a0e8] hover:text-[#0080c7] text-sm font-medium underline"
                  >
                    Gérer mes préférences
                  </button>
                  {' · '}
                  <a
                    href="/privacy-policy"
                    className="text-[#00a0e8] hover:text-[#0080c7] text-sm font-medium underline"
                  >
                    Politique de confidentialité
                  </a>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 lg:ml-6">
                <button
                  onClick={rejectAll}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors min-w-[120px]"
                >
                  Tout refuser
                </button>
                <button
                  onClick={acceptAll}
                  className="px-6 py-3 bg-[#00a0e8] hover:bg-[#0080c7] text-white font-medium rounded-lg transition-colors min-w-[120px]"
                >
                  Tout accepter
                </button>
              </div>
            </div>
          ) : (
            // Detailed Settings View
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Paramètres des cookies
                </h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Essential Cookies */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Cookies essentiels</h4>
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      Toujours actifs
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Nécessaires au fonctionnement du site. Ils permettent la navigation de base et l'accès aux zones sécurisées.
                  </p>
                  <div className="text-xs text-gray-500">
                    Exemples : Session utilisateur, panier d'achat, préférences de langue
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Cookies analytiques</h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={customSettings.analytics}
                        onChange={(e) => handleCustomSettingChange('analytics', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00a0e8]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00a0e8]"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Nous aident à comprendre comment vous utilisez notre site pour l'améliorer.
                  </p>
                  <div className="text-xs text-gray-500">
                    Exemples : Pages visitées, temps passé, parcours utilisateur
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Cookies marketing</h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={customSettings.marketing}
                        onChange={(e) => handleCustomSettingChange('marketing', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00a0e8]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00a0e8]"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Utilisés pour vous proposer des publicités pertinentes sur d'autres sites.
                  </p>
                  <div className="text-xs text-gray-500">
                    Exemples : Facebook Pixel, Google Ads, retargeting
                  </div>
                </div>

                {/* Preferences Cookies */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Cookies de préférences</h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={customSettings.preferences}
                        onChange={(e) => handleCustomSettingChange('preferences', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00a0e8]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00a0e8]"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Mémorisent vos choix pour personnaliser votre expérience.
                  </p>
                  <div className="text-xs text-gray-500">
                    Exemples : Thème sombre/clair, taille de police, région
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  onClick={rejectAll}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                >
                  Tout refuser
                </button>
                <button
                  onClick={handleSaveCustomSettings}
                  className="px-6 py-3 bg-[#00a0e8] hover:bg-[#0080c7] text-white font-medium rounded-lg transition-colors"
                >
                  Enregistrer mes préférences
                </button>
                <button
                  onClick={acceptAll}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Tout accepter
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CookieConsentBanner