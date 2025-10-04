'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'

interface NewsletterData {
  subscribers: Array<{
    id: number
    email: string
    is_active: boolean
    created_at: string
    last_activity?: string
  }>
  stats: {
    total_subscribers: number
    active_subscribers: number
    unsubscribed: number
    growth_rate: number
  }
  campaigns: Array<{
    id: number
    subject: string
    sent_at: string
    recipients: number
    open_rate: number
    click_rate: number
    status: string
  }>
}

export default function NewsletterPage() {
  const router = useRouter()
  const [data, setData] = useState<NewsletterData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('subscribers')

  useEffect(() => {
    fetchNewsletterData()
  }, [])

  const fetchNewsletterData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('admin_token')
      
      if (!token) {
        router.push('/admin/login')
        return
      }

      const response = await fetch('/api/newsletter/subscribers', {
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
      console.error('Error fetching newsletter data:', error)
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
              onClick={() => fetchNewsletterData()}
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
          <h1 className="text-2xl font-bold text-gray-900">Gestion Newsletter</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gérez les abonnés à la newsletter et les campagnes d'email
          </p>
        </div>

        {data && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg border p-6">
                <div className="text-2xl font-bold text-blue-600">{data.stats.total_subscribers}</div>
                <div className="text-sm text-gray-500">Total abonnés</div>
              </div>
              <div className="bg-white rounded-lg border p-6">
                <div className="text-2xl font-bold text-green-600">{data.stats.active_subscribers}</div>
                <div className="text-sm text-gray-500">Actifs</div>
              </div>
              <div className="bg-white rounded-lg border p-6">
                <div className="text-2xl font-bold text-red-600">{data.stats.unsubscribed}</div>
                <div className="text-sm text-gray-500">Désabonnés</div>
              </div>
              <div className="bg-white rounded-lg border p-6">
                <div className="text-2xl font-bold text-purple-600">{data.stats.growth_rate}%</div>
                <div className="text-sm text-gray-500">Croissance</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'subscribers', name: 'Abonnés', count: data.stats.total_subscribers },
                  { id: 'campaigns', name: 'Campagnes', count: data.campaigns?.length || 0 }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
                  >
                    {tab.name}
                    <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                      activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Subscribers Tab */}
            {activeTab === 'subscribers' && (
              <div className="bg-white rounded-lg border">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Liste des abonnés</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Exporter CSV
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inscrit le</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dernière activité</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.subscribers?.map((subscriber) => (
                        <tr key={subscriber.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {subscriber.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              subscriber.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {subscriber.is_active ? 'Actif' : 'Désabonné'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(subscriber.created_at).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {subscriber.last_activity ? 
                              new Date(subscriber.last_activity).toLocaleDateString('fr-FR') : 
                              'Jamais'
                            }
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                Voir
                              </button>
                              {subscriber.is_active && (
                                <button className="text-red-600 hover:text-red-900">
                                  Désabonner
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      )) || (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                            Aucun abonné trouvé
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Campaigns Tab */}
            {activeTab === 'campaigns' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Campagnes d'email</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Nouvelle campagne
                  </button>
                </div>

                <div className="grid gap-6">
                  {data.campaigns?.map((campaign) => (
                    <div key={campaign.id} className="bg-white rounded-lg border p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-medium text-gray-900">{campaign.subject}</h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              campaign.status === 'sent' ? 'bg-green-100 text-green-800' :
                              campaign.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {campaign.status === 'sent' ? 'Envoyée' :
                               campaign.status === 'draft' ? 'Brouillon' : 'En cours'}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                            <div>
                              <span className="font-medium">Destinataires:</span> {campaign.recipients}
                            </div>
                            <div>
                              <span className="font-medium">Taux d'ouverture:</span> {campaign.open_rate}%
                            </div>
                            <div>
                              <span className="font-medium">Taux de clic:</span> {campaign.click_rate}%
                            </div>
                            <div>
                              <span className="font-medium">Envoyé:</span> {new Date(campaign.sent_at).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            Voir
                          </button>
                          <button className="text-green-600 hover:text-green-800">
                            Dupliquer
                          </button>
                          {campaign.status === 'draft' && (
                            <button className="text-red-600 hover:text-red-800">
                              Supprimer
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )) || (
                    <div className="text-center py-12 text-gray-500">
                      Aucune campagne trouvée
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  )
}