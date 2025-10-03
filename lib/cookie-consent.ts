// Cookie consent utilities and types
import Cookies from 'js-cookie'
import { v4 as uuidv4 } from 'uuid'

export interface CookieConsent {
  sessionId: string
  essential: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
  timestamp: string
  version: string
}

export interface ConsentSettings {
  essential: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

export interface AnalyticsEvent {
  eventType: string
  eventCategory: string
  eventAction: string
  eventLabel?: string
  pageUrl: string
  referrer: string
  additionalData?: Record<string, any>
}

const CONSENT_COOKIE_NAME = 'win2win_cookie_consent'
const SESSION_COOKIE_NAME = 'win2win_session_id'
const CONSENT_VERSION = '1.0'
const COOKIE_EXPIRY_DAYS = 365

// Generate or get session ID
export const getSessionId = (): string => {
  let sessionId = Cookies.get(SESSION_COOKIE_NAME)
  
  if (!sessionId) {
    sessionId = uuidv4()
    Cookies.set(SESSION_COOKIE_NAME, sessionId, {
      expires: COOKIE_EXPIRY_DAYS,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })
  }
  
  return sessionId
}

// Save consent preferences
export const saveConsentPreferences = (settings: ConsentSettings): CookieConsent => {
  const sessionId = getSessionId()
  const consent: CookieConsent = {
    sessionId,
    essential: true, // Always true - required for site functionality
    analytics: settings.analytics,
    marketing: settings.marketing,
    preferences: settings.preferences,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION
  }

  // Save to cookie
  Cookies.set(CONSENT_COOKIE_NAME, JSON.stringify(consent), {
    expires: COOKIE_EXPIRY_DAYS,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  })

  // Send to backend
  sendConsentToBackend(consent)

  return consent
}

// Get current consent preferences
export const getConsentPreferences = (): CookieConsent | null => {
  try {
    const consentString = Cookies.get(CONSENT_COOKIE_NAME)
    if (!consentString) return null
    
    const consent = JSON.parse(consentString) as CookieConsent
    
    // Check if consent is still valid (version match)
    if (consent.version !== CONSENT_VERSION) {
      // Version mismatch, need new consent
      clearConsent()
      return null
    }
    
    return consent
  } catch (error) {
    console.error('Error parsing consent preferences:', error)
    clearConsent()
    return null
  }
}

// Check if user has consented to specific category
export const hasConsentFor = (category: keyof ConsentSettings): boolean => {
  const consent = getConsentPreferences()
  if (!consent) return false
  
  return consent[category] === true
}

// Clear all consent data
export const clearConsent = (): void => {
  Cookies.remove(CONSENT_COOKIE_NAME)
  Cookies.remove(SESSION_COOKIE_NAME)
}

// Send consent to backend
const sendConsentToBackend = async (consent: CookieConsent): Promise<void> => {
  try {
    const response = await fetch('/api/privacy/consent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: consent.sessionId,
        essential: consent.essential,
        analytics: consent.analytics,
        marketing: consent.marketing,
        preferences: consent.preferences,
        version: consent.version
      }),
    })

    if (!response.ok) {
      console.error('Failed to save consent to backend')
    }
  } catch (error) {
    console.error('Error sending consent to backend:', error)
  }
}

// Analytics tracking (only if consent given)
export const trackEvent = async (event: AnalyticsEvent): Promise<void> => {
  if (!hasConsentFor('analytics')) {
    return // User hasn't consented to analytics
  }

  try {
    const sessionId = getSessionId()
    
    const response = await fetch('/api/analytics/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        ...event,
        timestamp: new Date().toISOString()
      }),
    })

    if (!response.ok) {
      console.error('Failed to track event')
    }
  } catch (error) {
    console.error('Error tracking event:', error)
  }
}

// Track page views
export const trackPageView = (path: string): void => {
  trackEvent({
    eventType: 'page_view',
    eventCategory: 'Navigation',
    eventAction: 'Page View',
    eventLabel: path,
    pageUrl: window.location.href,
    referrer: document.referrer || ''
  })
}

// Track form submissions
export const trackFormSubmission = (formName: string, success: boolean): void => {
  trackEvent({
    eventType: 'form_submit',
    eventCategory: 'Forms',
    eventAction: success ? 'Submit Success' : 'Submit Error',
    eventLabel: formName,
    pageUrl: window.location.href,
    referrer: document.referrer || '',
    additionalData: { success }
  })
}

// Track button clicks
export const trackButtonClick = (buttonName: string, location: string): void => {
  trackEvent({
    eventType: 'button_click',
    eventCategory: 'Interactions',
    eventAction: 'Button Click',
    eventLabel: buttonName,
    pageUrl: window.location.href,
    referrer: document.referrer || '',
    additionalData: { location }
  })
}

// Default consent settings
export const DEFAULT_CONSENT_SETTINGS: ConsentSettings = {
  essential: true,
  analytics: false,
  marketing: false,
  preferences: false
}