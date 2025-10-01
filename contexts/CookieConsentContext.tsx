'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { 
  CookieConsent, 
  ConsentSettings, 
  getConsentPreferences, 
  saveConsentPreferences, 
  clearConsent,
  DEFAULT_CONSENT_SETTINGS,
  trackPageView
} from '../lib/cookie-consent'

interface CookieConsentContextType {
  consent: CookieConsent | null
  hasConsent: boolean
  showBanner: boolean
  acceptAll: () => void
  rejectAll: () => void
  updateConsent: (settings: ConsentSettings) => void
  clearAllConsent: () => void
  closeBanner: () => void
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined)

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext)
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider')
  }
  return context
}

interface CookieConsentProviderProps {
  children: ReactNode
}

export const CookieConsentProvider: React.FC<CookieConsentProviderProps> = ({ children }) => {
  const [consent, setConsent] = useState<CookieConsent | null>(null)
  const [showBanner, setShowBanner] = useState(false)
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    // Check for existing consent on mount
    const existingConsent = getConsentPreferences()
    
    if (existingConsent) {
      setConsent(existingConsent)
      setHasConsent(true)
      setShowBanner(false)
      
      // Track page view if analytics consent given
      if (existingConsent.analytics) {
        trackPageView(window.location.pathname)
      }
    } else {
      setShowBanner(true)
      setHasConsent(false)
    }
  }, [])

  const acceptAll = () => {
    const settings: ConsentSettings = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true
    }
    
    const newConsent = saveConsentPreferences(settings)
    setConsent(newConsent)
    setHasConsent(true)
    setShowBanner(false)
    
    // Track page view now that analytics is enabled
    trackPageView(window.location.pathname)
  }

  const rejectAll = () => {
    const settings: ConsentSettings = {
      essential: true, // Always required
      analytics: false,
      marketing: false,
      preferences: false
    }
    
    const newConsent = saveConsentPreferences(settings)
    setConsent(newConsent)
    setHasConsent(true)
    setShowBanner(false)
  }

  const updateConsent = (settings: ConsentSettings) => {
    const newConsent = saveConsentPreferences(settings)
    setConsent(newConsent)
    setHasConsent(true)
    setShowBanner(false)
    
    // Track page view if analytics consent given
    if (settings.analytics) {
      trackPageView(window.location.pathname)
    }
  }

  const clearAllConsent = () => {
    clearConsent()
    setConsent(null)
    setHasConsent(false)
    setShowBanner(true)
  }

  const closeBanner = () => {
    setShowBanner(false)
  }

  const value: CookieConsentContextType = {
    consent,
    hasConsent,
    showBanner,
    acceptAll,
    rejectAll,
    updateConsent,
    clearAllConsent,
    closeBanner
  }

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  )
}