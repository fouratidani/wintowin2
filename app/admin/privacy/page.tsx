'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'

interface PrivacyData {
  consent_stats: {
    total_sessions: number
    analytics_accepted: number
    marketing_accepted: number
    essential_only: number
    consent_rate: number
  }
  recent_consents: Array<{
    id: number
    session_id: string
    analytics: boolean
    marketing: boolean
    preferences: boolean
    ip_address: string
    user_agent: string
    created_at: string
  }>
  data_retention: {
    consent_records: string
    analytics_data: string
    personal_data: string
    next_cleanup: string
  }
  compliance_status: {
    gdpr_compliant: boolean
    cookie_banner_active: boolean
    data_processing_logged: boolean
    user_rights_available: boolean
  }
}

export default function PrivacyPage() {
  const router = useRouter()
  const [data, setData] = useState<PrivacyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetchPrivacyData()
  }, [])

  const fetchPrivacyData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('admin_token')
      
      if (!token) {
        router.push('/admin/login')
        return
      }

      const response = await fetch('/api/privacy', {
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
      console.error('Error fetching privacy data:', error)
      setError('Erreur de connexion au serveur')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg border p-6">
                  <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg border p-6 h-96"></div>
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
              onClick={() => fetchPrivacyData()}
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
          <h1 className="text-2xl font-bold text-gray-900">Confidentialité & Conformité</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestion des données personnelles et conformité RGPD
          </p>
        </div>

        {data && (
          <>
            {/* Compliance Status */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className={`p-4 rounded-lg border-l-4 ${
                data.compliance_status.gdpr_compliant ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'
              }`}>
                <div className="flex items-center">
                  <span className={`text-2xl mr-2 ${
                    data.compliance_status.gdpr_compliant ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {data.compliance_status.gdpr_compliant ? '✅' : '❌'}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-gray-900">RGPD</div>
                    <div className={`text-xs ${
                      data.compliance_status.gdpr_compliant ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {data.compliance_status.gdpr_compliant ? 'Conforme' : 'Non conforme'}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg border-l-4 ${
                data.compliance_status.cookie_banner_active ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'
              }`}>
                <div className="flex items-center">
                  <span className={`text-2xl mr-2 ${
                    data.compliance_status.cookie_banner_active ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {data.compliance_status.cookie_banner_active ? '✅' : '❌'}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Bannière Cookies</div>
                    <div className={`text-xs ${
                      data.compliance_status.cookie_banner_active ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {data.compliance_status.cookie_banner_active ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg border-l-4 ${
                data.compliance_status.data_processing_logged ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'
              }`}>
                <div className="flex items-center">
                  <span className={`text-2xl mr-2 ${
                    data.compliance_status.data_processing_logged ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {data.compliance_status.data_processing_logged ? '✅' : '❌'}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Traçabilité</div>
                    <div className={`text-xs ${
                      data.compliance_status.data_processing_logged ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {data.compliance_status.data_processing_logged ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg border-l-4 ${
                data.compliance_status.user_rights_available ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'
              }`}>
                <div className="flex items-center">
                  <span className={`text-2xl mr-2 ${
                    data.compliance_status.user_rights_available ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {data.compliance_status.user_rights_available ? '✅' : '❌'}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Droits Utilisateurs</div>
                    <div className={`text-xs ${
                      data.compliance_status.user_rights_available ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {data.compliance_status.user_rights_available ? 'Disponibles' : 'Indisponibles'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
              <div className="bg-white rounded-lg border p-6">
                <div className="text-2xl font-bold text-blue-600">{data.consent_stats.total_sessions}</div>
                <div className="text-sm text-gray-500">Sessions totales</div>
              </div>
              <div className="bg-white rounded-lg border p-6">
                <div className="text-2xl font-bold text-green-600">{data.consent_stats.analytics_accepted}</div>
                <div className="text-sm text-gray-500">Analytics acceptés</div>
              </div>
              <div className="bg-white rounded-lg border p-6">
                <div className="text-2xl font-bold text-purple-600">{data.consent_stats.marketing_accepted}</div>
                <div className="text-sm text-gray-500">Marketing accepté</div>
              </div>
              <div className="bg-white rounded-lg border p-6">
                <div className="text-2xl font-bold text-orange-600">{data.consent_stats.essential_only}</div>
                <div className="text-sm text-gray-500">Essentiels seulement</div>
              </div>
              <div className="bg-white rounded-lg border p-6">
                <div className="text-2xl font-bold text-indigo-600">{data.consent_stats.consent_rate}%</div>
                <div className="text-sm text-gray-500">Taux d'acceptation</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'overview', name: 'Vue d\'ensemble' },
                  { id: 'consents', name: 'Consentements récents' },
                  { id: 'retention', name: 'Rétention des données' },
                  { id: 'settings', name: 'Paramètres' }
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

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Répartition des consentements</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Analytics acceptés</span>
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(data.consent_stats.analytics_accepted / data.consent_stats.total_sessions) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {((data.consent_stats.analytics_accepted / data.consent_stats.total_sessions) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Marketing accepté</span>
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${(data.consent_stats.marketing_accepted / data.consent_stats.total_sessions) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {((data.consent_stats.marketing_accepted / data.consent_stats.total_sessions) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Essentiels seulement</span>
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-orange-600 h-2 rounded-full" 
                            style={{ width: `${(data.consent_stats.essential_only / data.consent_stats.total_sessions) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {((data.consent_stats.essential_only / data.consent_stats.total_sessions) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Politique de rétention</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-gray-600">Consentements</span>
                      <span className="text-sm font-medium">{data.data_retention.consent_records}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-gray-600">Données analytics</span>
                      <span className="text-sm font-medium">{data.data_retention.analytics_data}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-gray-600">Données personnelles</span>
                      <span className="text-sm font-medium">{data.data_retention.personal_data}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-600">Prochain nettoyage</span>
                      <span className="text-sm font-medium text-blue-600">
                        {new Date(data.data_retention.next_cleanup).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Consents Tab */}
            {activeTab === 'consents' && (
              <div className="bg-white rounded-lg border">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Consentements récents</h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Session</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Analytics</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Marketing</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Préférences</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.recent_consents?.map((consent) => (
                        <tr key={consent.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {consent.session_id.substring(0, 8)}...
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              consent.analytics ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {consent.analytics ? 'Accepté' : 'Refusé'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              consent.marketing ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {consent.marketing ? 'Accepté' : 'Refusé'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              consent.preferences ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {consent.preferences ? 'Accepté' : 'Refusé'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {consent.ip_address}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(consent.created_at).toLocaleDateString('fr-FR')}
                          </td>
                        </tr>
                      )) || (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                            Aucun consentement récent trouvé
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Other tabs content would go here */}
            {activeTab === 'retention' && (
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Configuration de la rétention des données</h2>
                <p className="text-gray-600">Paramètres de conservation et de suppression automatique des données.</p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Paramètres de confidentialité</h2>
                <p className="text-gray-600">Configuration de la bannière de cookies et des politiques de confidentialité.</p>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  )
}