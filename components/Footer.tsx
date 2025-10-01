"use client"

import { useState } from 'react'
import Image from "next/image"
import { newsletterApi } from '@/lib/api'
import { trackEvent } from '@/lib/cookie-consent'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Track newsletter subscription attempt
    trackEvent({
      eventType: 'form_submit',
      eventCategory: 'Newsletter',
      eventAction: 'Subscription Attempt',
      eventLabel: 'Footer Newsletter',
      pageUrl: window.location.href,
      referrer: document.referrer,
      additionalData: { 
        email_domain: email.split('@')[1] || 'unknown',
        form_location: 'footer'
      }
    })

    try {
      await newsletterApi.subscribe(email)
      setSubmitStatus('success')
      setEmail('')
      
      // Track successful subscription
      trackEvent({
        eventType: 'conversion',
        eventCategory: 'Newsletter',
        eventAction: 'Subscription Success',
        eventLabel: 'Footer Newsletter',
        pageUrl: window.location.href,
        referrer: document.referrer,
        additionalData: { 
          email_domain: email.split('@')[1] || 'unknown',
          form_location: 'footer'
        }
      })
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setSubmitStatus('error')
      
      // Track failed subscription
      trackEvent({
        eventType: 'error',
        eventCategory: 'Newsletter',
        eventAction: 'Subscription Error',
        eventLabel: 'Footer Newsletter',
        pageUrl: window.location.href,
        referrer: document.referrer,
        additionalData: { 
          error_type: 'api_error',
          form_location: 'footer'
        }
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <footer className="bg-[#11023f] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <p className="text-lg md:text-xl leading-relaxed font-poppins">
                Inscrivez-vous à notre newsletter pour ne rien manquer de nos nouveautés et opportunités.
              </p>
              {submitStatus === 'success' && (
                <p className="text-green-400 text-sm mt-2">✓ Inscription réussie ! Merci de votre confiance.</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 text-sm mt-2">✗ Erreur lors de l'inscription. Veuillez réessayer.</p>
              )}
            </div>
            <div className="flex-1 max-w-lg">
              <form onSubmit={handleNewsletterSubmit} className="flex bg-[#87ceeb] rounded-full p-1">
                <input
                  type="email"
                  placeholder="example@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 rounded-l-full bg-transparent text-[#11023f] placeholder-[#11023f]/70 focus:outline-none font-poppins disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  className="bg-[#11023f] text-white font-poppins font-bold px-8 py-3 rounded-full hover:bg-[#0f0238] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Envoi...' : 'Envoyer'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo and Brand */}
          <div>
            <Image src="/images/logo.png" alt="Win to Win Logo" width={150} height={150} className="h-40 w-auto mb-4" />
          </div>

          {/* Navigation Links */}
          <div>
            <div className="space-y-3">
              <a
                href="#accueil"
                className="block text-lg font-semibold hover:text-[#00a0e8] transition-colors font-poppins"
              >
                Accueil
              </a>
              <a
                href="#formations"
                className="block text-lg font-semibold hover:text-[#00a0e8] transition-colors font-poppins"
              >
                Formation Courtes
              </a>
              <a
                href="#services"
                className="block text-lg font-semibold hover:text-[#00a0e8] transition-colors font-poppins"
              >
                Services
              </a>
              <a
                href="#apropos"
                className="block text-lg font-semibold hover:text-[#00a0e8] transition-colors font-poppins"
              >
                À Propos
              </a>
              <a
                href="#actualites"
                className="block text-lg font-semibold hover:text-[#00a0e8] transition-colors font-poppins"
              >
                Actualités
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-2xl font-semibold mb-6 font-kontora">Contact</h4>
            <div className="space-y-3 text-lg font-poppins">
              <p>
                <strong>Adresse :</strong> 97 Avenue de la Liberté, Tunis
              </p>
              <p>
                <strong>Téléphone :</strong> +216 50 366 499 / +216 26 172 216
              </p>
              <p>
                <strong>Email :</strong> contact@winstowin.com
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-4">
            <a 
              href="/privacy-policy" 
              className="text-white/70 hover:text-white transition-colors text-sm"
            >
              Politique de Confidentialité
            </a>
            <span className="hidden md:inline text-white/30">•</span>
            <a 
              href="/cookie-preferences" 
              className="text-white/70 hover:text-white transition-colors text-sm"
            >
              Préférences de Cookies
            </a>
            <span className="hidden md:inline text-white/30">•</span>
            <a 
              href="mailto:contact@winstowin.com" 
              className="text-white/70 hover:text-white transition-colors text-sm"
            >
              Nous Contacter
            </a>
          </div>
          <p className="text-lg font-poppins">2025 © All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}
