'use client'

import { useState } from 'react'
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { useCookieConsent } from "../../contexts/CookieConsentContext"
import { ConsentSettings } from "../../lib/cookie-consent"
import JSONLD from "../../components/JSONLD"
import { generateWebPageSchema } from "../../lib/seo"

export default function CookiePreferences() {
  const { consent, updateConsent, clearAllConsent } = useCookieConsent()
  const [settings, setSettings] = useState<ConsentSettings>({
    essential: true,
    analytics: consent?.analytics || false,
    marketing: consent?.marketing || false,
    preferences: consent?.preferences || false
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSettingChange = (key: keyof ConsentSettings, value: boolean) => {
    if (key === 'essential') return // Essential cookies can't be disabled
    
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSaveSettings = () => {
    updateConsent(settings)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleRejectAll = () => {
    const rejectedSettings: ConsentSettings = {
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false
    }
    setSettings(rejectedSettings)
    updateConsent(rejectedSettings)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleAcceptAll = () => {
    const acceptedSettings: ConsentSettings = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true
    }
    setSettings(acceptedSettings)
    updateConsent(acceptedSettings)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleClearAll = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer toutes vos préférences de cookies ? Cette action ne peut pas être annulée.')) {
      clearAllConsent()
      setSettings({
        essential: true,
        analytics: false,
        marketing: false,
        preferences: false
      })
    }
  }

  const pageSchema = generateWebPageSchema({
    title: "Préférences de Cookies - Win2Win",
    description: "Gérez vos préférences de cookies et personnalisez votre expérience sur Win2Win.",
    url: "/cookie-preferences",
    breadcrumbs: [
      { name: "Accueil", url: "/" },
      { name: "Préférences de Cookies", url: "/cookie-preferences" }
    ]
  })

  return (
    <>
      <JSONLD data={pageSchema} />
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#00a0e8] to-[#0080c7]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🍪</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Préférences de Cookies
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Gérez vos préférences de cookies et contrôlez quelles données nous pouvons collecter. 
              Vos choix sont respectés et sauvegardés automatiquement.
            </p>
          </div>
        </section>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse">
            ✓ Préférences sauvegardées avec succès
          </div>
        )}

        {/* Current Status */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">État actuel de vos cookies</h2>
              {consent ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      ✓
                    </div>
                    <div className="text-sm font-medium text-gray-900">Essentiels</div>
                    <div className="text-xs text-gray-500">Toujours actifs</div>
                  </div>
                  
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                      consent.analytics ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {consent.analytics ? '✓' : '✗'}
                    </div>
                    <div className="text-sm font-medium text-gray-900">Analytiques</div>
                    <div className="text-xs text-gray-500">{consent.analytics ? 'Activés' : 'Désactivés'}</div>
                  </div>
                  
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                      consent.marketing ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {consent.marketing ? '✓' : '✗'}
                    </div>
                    <div className="text-sm font-medium text-gray-900">Marketing</div>
                    <div className="text-xs text-gray-500">{consent.marketing ? 'Activés' : 'Désactivés'}</div>
                  </div>
                  
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                      consent.preferences ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {consent.preferences ? '✓' : '✗'}
                    </div>
                    <div className="text-sm font-medium text-gray-900">Préférences</div>
                    <div className="text-xs text-gray-500">{consent.preferences ? 'Activés' : 'Désactivés'}</div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  Aucune préférence de cookie enregistrée. Configurez vos préférences ci-dessous.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Cookie Settings */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Paramètres détaillés</h2>

              <div className="space-y-6">
                {/* Essential Cookies */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">🔧 Cookies essentiels</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Nécessaires au fonctionnement du site web
                      </p>
                    </div>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Toujours actifs
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Ce que ces cookies font :</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Maintiennent votre session de navigation</li>
                      <li>• Stockent vos préférences de langue</li>
                      <li>• Sécurisent l'accès aux formulaires</li>
                      <li>• Permettent le fonctionnement du panier/favoris</li>
                    </ul>
                    <div className="mt-3 text-xs text-gray-500">
                      <strong>Durée :</strong> Session ou 1 an maximum
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">📊 Cookies analytiques</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Nous aident à comprendre l'utilisation du site
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.analytics}
                        onChange={(e) => handleSettingChange('analytics', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00a0e8]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00a0e8]"></div>
                    </label>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Ce que ces cookies font :</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Comptent les visiteurs et les pages vues</li>
                      <li>• Mesurent le temps passé sur chaque page</li>
                      <li>• Analysent les parcours de navigation</li>
                      <li>• Identifient les contenus populaires</li>
                    </ul>
                    <div className="mt-3 text-xs text-gray-500">
                      <strong>Durée :</strong> 25 mois • <strong>Services :</strong> Google Analytics (anonymisé)
                    </div>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">🎯 Cookies marketing</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Personnalisent les publicités que vous voyez
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.marketing}
                        onChange={(e) => handleSettingChange('marketing', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00a0e8]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00a0e8]"></div>
                    </label>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Ce que ces cookies font :</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Créent un profil publicitaire personnalisé</li>
                      <li>• Permettent le retargeting sur d'autres sites</li>
                      <li>• Mesurent l'efficacité des campagnes</li>
                      <li>• Évitent la répétition excessive des annonces</li>
                    </ul>
                    <div className="mt-3 text-xs text-gray-500">
                      <strong>Durée :</strong> 90 jours • <strong>Services :</strong> Facebook Pixel, Google Ads, LinkedIn
                    </div>
                  </div>
                </div>

                {/* Preferences Cookies */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">⚙️ Cookies de préférences</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Mémorisent vos choix pour une meilleure expérience
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.preferences}
                        onChange={(e) => handleSettingChange('preferences', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00a0e8]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00a0e8]"></div>
                    </label>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Ce que ces cookies font :</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Sauvegardent le thème sombre/clair</li>
                      <li>• Mémorisent la taille de police préférée</li>
                      <li>• Stockent vos préférences régionales</li>
                      <li>• Retiennent vos filtres de recherche</li>
                    </ul>
                    <div className="mt-3 text-xs text-gray-500">
                      <strong>Durée :</strong> 1 an • <strong>Stockage :</strong> Local uniquement
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 pt-8 border-t border-gray-200">
                <button
                  onClick={handleRejectAll}
                  className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                >
                  Tout refuser
                </button>
                <button
                  onClick={handleSaveSettings}
                  className="px-8 py-3 bg-[#00a0e8] hover:bg-[#0080c7] text-white font-medium rounded-lg transition-colors"
                >
                  Enregistrer les préférences
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Tout accepter
                </button>
              </div>

              {/* Advanced Options */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Options avancées</h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                  <button
                    onClick={handleClearAll}
                    className="text-red-600 hover:text-red-700 underline"
                  >
                    Supprimer toutes mes données
                  </button>
                  <span className="hidden sm:inline text-gray-300">•</span>
                  <a href="/privacy-policy" className="text-[#00a0e8] hover:text-[#0080c7] underline">
                    Politique de confidentialité
                  </a>
                  <span className="hidden sm:inline text-gray-300">•</span>
                  <a href="mailto:privacy@wintowin.fr" className="text-[#00a0e8] hover:text-[#0080c7] underline">
                    Contacter le DPO
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}