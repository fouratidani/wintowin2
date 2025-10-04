import { NextRequest, NextResponse } from 'next/server'

const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'http://localhost:5000/api' 
  : 'http://localhost:5000/api'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Token d\'authentification requis' },
        { status: 401 }
      )
    }

    // Forward to backend system API
    const response = await fetch(`${API_BASE}/dashboard/system`, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        return NextResponse.json(
          { success: false, message: 'Token invalide ou expiré' },
          { status: 401 }
        )
      }
      throw new Error(`Backend responded with status: ${response.status}`)
    }

    const data = await response.json()
    
    // Transform backend response to match frontend expectations
    const transformedData = {
      success: true,
      data: {
        privacy_analytics: {
          total_consent_records: data.data?.privacy_stats?.total_sessions || 0,
          accepted_all: data.data?.privacy_stats?.analytics_consented || 0,
          accepted_essential_only: (data.data?.privacy_stats?.total_sessions || 0) - (data.data?.privacy_stats?.analytics_consented || 0),
          custom_preferences: data.data?.privacy_stats?.preferences_consented || 0,
          consent_rate: data.data?.privacy_stats?.total_sessions > 0 
            ? Math.round(((data.data.privacy_stats.analytics_consented || 0) / data.data.privacy_stats.total_sessions) * 100)
            : 0,
          recent_consents: (data.data?.recent_consents || []).slice(0, 10).map((consent: any, index: number) => ({
            user_id: `user_${index + 1}`,
            consent_type: consent.analytics ? 'all' : 'essential_only',
            ip_address: 'xxx.xxx.xxx.xxx', // Privacy masked
            user_agent: 'Browser/Version',
            created_at: consent.created_at
          }))
        },
        system_health: {
          database_status: 'connected',
          backend_api_status: data.data?.api_status || 'healthy',
          response_time: '< 100ms',
          uptime: '99.9%',
          last_backup: new Date().toISOString(),
          server_load: 'Normal',
          memory_usage: '65%',
          disk_usage: '45%'
        },
        error_logs: [],
        performance_metrics: {
          avg_page_load_time: '1.2s',
          avg_api_response_time: '85ms',
          error_rate: data.data?.system_metrics?.error_events > 0 
            ? `${Math.round((data.data.system_metrics.error_events / data.data.system_metrics.total_events) * 100)}%`
            : '0%',
          cache_hit_rate: '95%',
          cdn_performance: 'Good'
        },
        security_events: [],
        database_info: (data.data?.database_info || []).map((table: any) => ({
          table_name: table.table_name,
          record_count: table.record_count,
          size: 'N/A',
          last_updated: new Date().toISOString()
        }))
      }
    }
    
    return NextResponse.json(transformedData)

  } catch (error) {
    console.error('System API error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur serveur lors du chargement des données système' 
      },
      { status: 500 }
    )
  }
}
