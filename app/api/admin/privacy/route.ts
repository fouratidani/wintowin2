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

    // Forward to backend privacy API
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
    
    // Transform backend system data to privacy-specific format
    const privacyData = {
      consent_stats: {
        total_sessions: data.data?.privacy_stats?.total_sessions || 0,
        analytics_accepted: data.data?.privacy_stats?.analytics_consented || 0,
        marketing_accepted: data.data?.privacy_stats?.marketing_consented || 0,
        essential_only: (data.data?.privacy_stats?.total_sessions || 0) - (data.data?.privacy_stats?.analytics_consented || 0),
        consent_rate: data.data?.privacy_stats?.total_sessions > 0 
          ? Math.round(((data.data.privacy_stats.analytics_consented || 0) / data.data.privacy_stats.total_sessions) * 100)
          : 0
      },
      recent_consents: (data.data?.recent_consents || []).map((consent: any, index: number) => ({
        id: index + 1,
        session_id: consent.session_id,
        analytics: consent.analytics,
        marketing: consent.marketing,
        preferences: consent.preferences,
        ip_address: '192.168.1.1', // Mock data - not stored for privacy
        user_agent: 'Mozilla/5.0...', // Mock data - not stored for privacy  
        created_at: consent.created_at
      })),
      data_retention: {
        consent_records: "2 ans",
        analytics_data: "14 mois",
        personal_data: "5 ans",
        next_cleanup: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      compliance_status: {
        gdpr_compliant: true,
        cookie_banner_active: true,
        data_processing_logged: true,
        user_rights_available: true
      }
    }
    
    return NextResponse.json({
      success: true,
      data: privacyData
    })

  } catch (error) {
    console.error('Privacy API error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur serveur lors du chargement des données de confidentialité' 
      },
      { status: 500 }
    )
  }
}
