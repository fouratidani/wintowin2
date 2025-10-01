'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { trackEvent } from '@/lib/cookie-consent'

interface DashboardData {
  overview: {
    active_carousel_items: number
    published_news: number
    monthly_preinscriptions: number
    newsletter_subscribers: number
    total_consent_records: number
    weekly_visitors: number
  }
  recent_preinscriptions: Array<{
    nom: string
    prenom: string
    email: string
    telephone: string
    niveau_etude: string
    domaine_formation: string
    created_at: string
  }>
  analytics_summary: Array<{
    event_category: string
    event_action: string
    count: number
  }>
  top_pages: Array<{
    path: string
    views: number
    unique_views: number
  }>
  visitor_trend: Array<{
    date: string
    visitors: number
    pageviews: number
  }>
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    trackEvent({
      eventType: 'page_view',
      eventCategory: 'Admin',
      eventAction: 'Dashboard View',
      eventLabel: 'Admin Dashboard',
      pageUrl: window.location.href,
      referrer: document.referrer || ''
    })

    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/admin/dashboard/overview', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const result = await response.json()
      
      if (result.success) {
        setData(result.data)
      } else {
        setError(result.message || 'Erreur lors du chargement des données')
      }
    } catch (error) {
      console.error('Dashboard fetch error:', error)
      setError('Erreur de connexion au serveur')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#00a0e8]"></div>
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-red-400 text-2xl">⚠️</span>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-red-800">Erreur</h3>
              <p className="text-red-700">{error}</p>
              <button 
                onClick={fetchDashboardData}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Réessayer
              </button>
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-lg">👁️</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Visiteurs cette semaine</p>
                <p className="text-2xl font-bold text-gray-900">{data?.overview.weekly_visitors || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-lg">📝</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pré-inscriptions ce mois</p>
                <p className="text-2xl font-bold text-gray-900">{data?.overview.monthly_preinscriptions || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 text-lg">📧</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Abonnés newsletter</p>
                <p className="text-2xl font-bold text-gray-900">{data?.overview.newsletter_subscribers || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 text-lg">🎠</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Carrousels actifs</p>
                <p className="text-2xl font-bold text-gray-900">{data?.overview.active_carousel_items || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 text-lg">📰</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Articles publiés</p>
                <p className="text-2xl font-bold text-gray-900">{data?.overview.published_news || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <span className="text-indigo-600 text-lg">🍪</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Consentements cookies</p>
                <p className="text-2xl font-bold text-gray-900">{data?.overview.total_consent_records || 0}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Preinscriptions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Pré-inscriptions récentes</h3>
            </div>
            <div className="p-6">
              {data?.recent_preinscriptions && data.recent_preinscriptions.length > 0 ? (
                <div className="space-y-4">
                  {data.recent_preinscriptions.slice(0, 5).map((inscription, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-900">{inscription.prenom} {inscription.nom}</p>
                        <p className="text-sm text-gray-500">{inscription.email}</p>
                        <p className="text-xs text-gray-400">{inscription.domaine_formation}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {new Date(inscription.created_at).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Aucune pré-inscription récente</p>
              )}
            </div>
          </div>

          {/* Top Pages */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Pages populaires (7 derniers jours)</h3>
            </div>
            <div className="p-6">
              {data?.top_pages && data.top_pages.length > 0 ? (
                <div className="space-y-4">
                  {data.top_pages.slice(0, 5).map((page, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{page.path}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{page.views} vues</p>
                        <p className="text-xs text-gray-500">{page.unique_views} uniques</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Aucune donnée de page disponible</p>
              )}
            </div>
          </div>
        </div>

        {/* Analytics Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Résumé analytique (7 derniers jours)</h3>
          </div>
          <div className="p-6">
            {data?.analytics_summary && data.analytics_summary.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.analytics_summary.slice(0, 6).map((event, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{event.event_category}</p>
                        <p className="text-sm text-gray-600">{event.event_action}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-[#00a0e8]">{event.count}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">Aucune donnée analytique disponible</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}