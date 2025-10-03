'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { trackEvent } from '@/lib/cookie-consent'

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  // Check if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('admin_token')
      if (!token) return

      // Verify token is still valid
      try {
        const response = await fetch('/api/admin/dashboard/overview', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          // Token is valid, redirect to dashboard
          router.push('/admin/dashboard')
        } else {
          // Token is invalid, clear storage
          localStorage.removeItem('admin_token')
          localStorage.removeItem('admin_user')
        }
      } catch (error) {
        console.error('Auth check error:', error)
        // Clear storage on error
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_user')
      }
    }

    checkAuth()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    trackEvent({
      eventType: 'form_submit',
      eventCategory: 'Admin',
      eventAction: 'Login Attempt',
      eventLabel: 'Admin Login Form',
      pageUrl: window.location.href,
      referrer: document.referrer || ''
    })

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem('admin_token', data.token)
        localStorage.setItem('admin_user', JSON.stringify(data.user))
        
        trackEvent({
          eventType: 'conversion',
          eventCategory: 'Admin',
          eventAction: 'Login Success',
          eventLabel: 'Admin Login Form',
          pageUrl: window.location.href,
          referrer: document.referrer || ''
        })
        
        router.push('/admin/dashboard')
      } else {
        setError(data.message || 'Erreur de connexion')
        
        trackEvent({
          eventType: 'error',
          eventCategory: 'Admin',
          eventAction: 'Login Failed',
          eventLabel: 'Admin Login Form',
          pageUrl: window.location.href,
          referrer: document.referrer || '',
          additionalData: { error: data.message }
        })
      }
    } catch (error) {
      setError('Erreur de connexion au serveur')
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#11023f] to-[#00a0e8] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-full p-4 inline-block mb-4">
            <Image
              src="/images/logo.png"
              alt="Win2Win"
              width={60}
              height={60}
              className="rounded-full"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Administration Win2Win
          </h1>
          <p className="text-white/80">
            Connectez-vous pour accéder au tableau de bord
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="text-red-400">❌</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-[#00a0e8] focus:border-[#00a0e8]"
                placeholder="admin@wintowin.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-[#00a0e8] focus:border-[#00a0e8]"
                placeholder="Votre mot de passe"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00a0e8] hover:bg-[#0080c7] disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00a0e8]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Connexion...
                </div>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Problème de connexion ?{' '}
              <a 
                href="mailto:admin@wintowin.com" 
                className="text-[#00a0e8] hover:text-[#0080c7]"
              >
                Contactez le support
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="text-white/80 hover:text-white text-sm transition-colors"
          >
            ← Retour au site principal
          </a>
        </div>
      </div>
    </div>
  )
}