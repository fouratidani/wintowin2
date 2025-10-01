'use client'

import { useState, useEffect } from 'react'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface ChartData {
  visitor_trends?: Array<{
    date: string
    visitors: number
    pageviews: number
  }>
  event_analytics?: Array<{
    event_category: string
    event_action: string
    count: number
  }>
  traffic_sources?: Array<{
    source: string
    sessions: number
    percentage: number
  }>
}

interface AnalyticsChartsProps {
  data: ChartData
  period: string
}

export default function AnalyticsCharts({ data, period }: AnalyticsChartsProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg border p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Prepare visitor trends data
  const visitorTrendsData = {
    labels: data.visitor_trends?.map(item => {
      const date = new Date(item.date)
      return date.toLocaleDateString('fr-FR', { 
        day: '2-digit', 
        month: '2-digit' 
      })
    }) || [],
    datasets: [
      {
        label: 'Visiteurs',
        data: data.visitor_trends?.map(item => item.visitors) || [],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Pages vues',
        data: data.visitor_trends?.map(item => item.pageviews) || [],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  // Prepare events data
  const eventsData = {
    labels: data.event_analytics?.map(item => `${item.event_category} - ${item.event_action}`) || [],
    datasets: [{
      label: 'Événements',
      data: data.event_analytics?.map(item => item.count) || [],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 92, 246, 0.8)'
      ],
      borderColor: [
        'rgba(59, 130, 246, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(245, 158, 11, 1)',
        'rgba(239, 68, 68, 1)',
        'rgba(139, 92, 246, 1)'
      ],
      borderWidth: 1
    }]
  }

  // Prepare traffic sources data
  const trafficSourcesData = {
    labels: data.traffic_sources?.map(item => item.source) || [],
    datasets: [{
      data: data.traffic_sources?.map(item => item.sessions) || [],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ],
      borderColor: [
        'rgba(59, 130, 246, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(245, 158, 11, 1)',
        'rgba(239, 68, 68, 1)'
      ],
      borderWidth: 2
    }]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Visitor Trends Chart */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Tendances des visiteurs ({period})
        </h3>
        <div className="h-64">
          <Line data={visitorTrendsData} options={chartOptions} />
        </div>
      </div>

      {/* Events Analytics Chart */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Événements populaires
        </h3>
        <div className="h-64">
          <Bar data={eventsData} options={chartOptions} />
        </div>
      </div>

      {/* Traffic Sources Chart */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Sources de trafic
        </h3>
        <div className="h-64">
          <Doughnut data={trafficSourcesData} options={doughnutOptions} />
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Entonnoir de conversion
        </h3>
        <div className="space-y-3">
          {[
            { step: 'Visiteurs', value: '10,000', percent: 100 },
            { step: 'Intérêt services', value: '3,500', percent: 35 },
            { step: 'Vue formations', value: '1,200', percent: 12 },
            { step: 'Pré-inscription', value: '450', percent: 4.5 },
            { step: 'Conversion', value: '234', percent: 2.3 }
          ].map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-24 text-sm font-medium text-gray-600">
                {item.step}
              </div>
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.percent}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-20 text-right">
                <div className="text-sm font-semibold text-gray-900">{item.value}</div>
                <div className="text-xs text-gray-500">{item.percent}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}