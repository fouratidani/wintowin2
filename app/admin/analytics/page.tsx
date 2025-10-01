'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import AnalyticsCharts from '@/components/admin/AnalyticsCharts'

interface AnalyticsData {
  visitor_trends: Array<{
    date: string
    visitors: number
    pageviews: number
    sessions: number
  }>
  event_analytics: Array<{
    event_category: string
    event_action: string
    count: number
    unique_users: number
  }>
  conversion_funnel: Array<{
    step: string
    users: number
    percentage: number
  }>
  engagement_metrics: {
    avg_session_duration: string
    bounce_rate: string
    pages_per_session: number
    returning_visitors: string
  }
  top_pages: Array<{
    path: string
    title: string
    views: number
    unique_views: number
  }>
  traffic_sources: Array<{
    source: string
    sessions: number
    percentage: number
  }>
}

export default function AnalyticsPage() {
  const router = useRouter()
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [period, setPeriod] = useState('7d')

  useEffect(() => {
    fetchAnalytics()
  }, [period])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('admin_token')
      
      if (!token) {
        router.push('/admin/login')
        return
      }

      const response = await fetch(`/api/admin/dashboard/analytics?period=${period}`, {
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
      console.error('Error fetching analytics:', error)
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
            <div className="flex justify-between items-center">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>
            
            {/* Stats cards skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg border p-6">
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              ))}
            </div>
            
            {/* Charts skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg border p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-64 bg-gray-200 rounded"></div>
                </div>
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
              onClick={() => fetchAnalytics()}
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics détaillées</h1>
            <p className="mt-1 text-sm text-gray-500">
              Analyse approfondie du comportement des visiteurs
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="7d">7 derniers jours</option>
              <option value="30d">30 derniers jours</option>
              <option value="90d">3 derniers mois</option>
            </select>
          </div>
        </div>

        {data && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Durée moyenne session
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {data.engagement_metrics.avg_session_duration}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Taux de rebond
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {data.engagement_metrics.bounce_rate}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Pages par session
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {data.engagement_metrics.pages_per_session}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Visiteurs récurrents
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {data.engagement_metrics.returning_visitors}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <AnalyticsCharts data={data} period={period} />

            {/* Top Pages Table */}
            <div className="mt-8 bg-white rounded-lg border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Pages les plus visitées</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Page
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vues totales
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vues uniques
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Taux de conversion
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.top_pages.map((page, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {page.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {page.path}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {page.views.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {page.unique_views.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {((page.unique_views / page.views) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  )
}