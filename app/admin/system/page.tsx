'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'

interface SystemData {
  privacy_analytics: {
    total_consent_records: number
    accepted_all: number
    accepted_essential_only: number
    custom_preferences: number
    consent_rate: number
    recent_consents: Array<{
      user_id: string
      consent_type: string
      ip_address: string
      user_agent: string
      created_at: string
    }>
  }
  system_health: {
    database_status: string
    backend_api_status: string
    response_time: string
    uptime: string
    last_backup: string
    server_load: string
    memory_usage: string
    disk_usage: string
  }
  error_logs: Array<{
    level: string
    message: string
    timestamp: string
    source: string
  }>
  performance_metrics: {
    avg_page_load_time: string
    avg_api_response_time: string
    error_rate: string
    cache_hit_rate: string
    cdn_performance: string
  }
  security_events: Array<{
    event_type: string
    status: string
    ip_address: string
    user_agent: string
    timestamp: string
  }>
  data_retention: {
    analytics_data_retention: string
    consent_records_retention: string
    error_logs_retention: string
    backup_retention: string
    next_cleanup: string
  }
}

export default function SystemPage() {
  const router = useRouter()
  const [data, setData] = useState<SystemData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('health')

  useEffect(() => {
    fetchSystemData()
  }, [])

  const fetchSystemData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('admin_token')
      
      if (!token) {
        router.push('/admin/login')
        return
      }

      const response = await fetch('/api/admin/dashboard/system', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('admin_token')
          router.push('/admin/login')
          return
        }
        throw new Error('Erreur lors du chargement des données')
      }

      const result = await response.json()
      if (result.success) {
        setData(result.data)
        setError('')
      } else {
        setError(result.message || 'Erreur inconnue')
      }
    } catch (error) {
      console.error('Error fetching system data:', error)
      setError('Erreur de connexion au serveur')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'connected':
      case 'operational':
      case 'success':
        return 'text-green-600 bg-green-100'
      case 'warning':
        return 'text-yellow-600 bg-yellow-100'
      case 'error':
      case 'failed':
      case 'blocked':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getLogLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'info':
        return 'text-blue-600 bg-blue-100'
      case 'warning':
        return 'text-yellow-600 bg-yellow-100'
      case 'error':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="flex space-x-1 border-b">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 bg-gray-200 rounded-t w-32"></div>
              ))}
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg border p-6 h-32"></div>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 text-lg font-medium mb-2">
              Erreur de chargement
            </div>
            <p className="text-red-700 mb-4">{error}</p>
            <button 
              onClick={() => fetchSystemData()}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Système et sécurité</h1>
          <p className="mt-1 text-sm text-gray-500">
            Surveillance du système, conformité RGPD et journaux d'activité
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'health', name: 'État du système' },
              { id: 'privacy', name: 'Confidentialité RGPD' },
              { id: 'security', name: 'Sécurité' },
              { id: 'logs', name: 'Journaux' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {data && (
          <div className="space-y-6">
            {/* System Health Tab */}
            {activeTab === 'health' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg border p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Base de données</p>
                        <p className={`text-sm px-2 py-1 rounded-full ${getStatusColor(data.system_health.database_status)}`}>
                          {data.system_health.database_status}
                        </p>
                      </div>
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4V7c0-2.21-1.79-4-4-4H8c-2.21 0-4 1.79-4 4z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">API Backend</p>
                        <p className={`text-sm px-2 py-1 rounded-full ${getStatusColor(data.system_health.backend_api_status)}`}>
                          {data.system_health.backend_api_status}
                        </p>
                      </div>
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12l5 5L20 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Temps de réponse</p>
                        <p className="text-lg font-semibold text-gray-900">{data.system_health.response_time}</p>
                      </div>
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Uptime</p>
                        <p className="text-lg font-semibold text-gray-900">{data.system_health.uptime}</p>
                      </div>
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Métriques de performance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Temps de chargement moyen</p>
                      <p className="text-2xl font-bold text-gray-900">{data.performance_metrics.avg_page_load_time}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Taux d'erreur</p>
                      <p className="text-2xl font-bold text-gray-900">{data.performance_metrics.error_rate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Cache hit rate</p>
                      <p className="text-2xl font-bold text-gray-900">{data.performance_metrics.cache_hit_rate}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy GDPR Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg border p-6">
                    <div className="text-2xl font-bold text-gray-900">
                      {data.privacy_analytics.total_consent_records.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Enregistrements de consentement</div>
                  </div>
                  <div className="bg-white rounded-lg border p-6">
                    <div className="text-2xl font-bold text-green-600">
                      {data.privacy_analytics.accepted_all.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Tous cookies acceptés</div>
                  </div>
                  <div className="bg-white rounded-lg border p-6">
                    <div className="text-2xl font-bold text-yellow-600">
                      {data.privacy_analytics.accepted_essential_only.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Essentiels uniquement</div>
                  </div>
                  <div className="bg-white rounded-lg border p-6">
                    <div className="text-2xl font-bold text-blue-600">
                      {data.privacy_analytics.consent_rate}%
                    </div>
                    <div className="text-sm text-gray-500">Taux de consentement</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Consentements récents</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilisateur</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {data.privacy_analytics.recent_consents.map((consent, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {consent.user_id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                consent.consent_type === 'all' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {consent.consent_type === 'all' ? 'Tous' : 'Essentiels'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {consent.ip_address}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(consent.created_at).toLocaleDateString('fr-FR')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg border">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Événements de sécurité récents</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {data.security_events.map((event, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {event.event_type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                                {event.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {event.ip_address}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(event.timestamp).toLocaleDateString('fr-FR')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Logs Tab */}
            {activeTab === 'logs' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg border">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Journaux d'erreurs récents</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {data.error_logs.map((log, index) => (
                      <div key={index} className="p-6">
                        <div className="flex items-start space-x-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLogLevelColor(log.level)}`}>
                            {log.level.toUpperCase()}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900">{log.message}</p>
                            <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500">
                              <span>{log.source}</span>
                              <span>•</span>
                              <span>{new Date(log.timestamp).toLocaleString('fr-FR')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg border p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Politique de rétention des données</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Analytics</p>
                      <p className="text-sm text-gray-900">{data.data_retention.analytics_data_retention}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Consentements</p>
                      <p className="text-sm text-gray-900">{data.data_retention.consent_records_retention}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Journaux</p>
                      <p className="text-sm text-gray-900">{data.data_retention.error_logs_retention}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Prochaine purge</p>
                      <p className="text-sm text-gray-900">
                        {new Date(data.data_retention.next_cleanup).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}