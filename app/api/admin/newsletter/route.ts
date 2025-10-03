import { NextRequest, NextResponse } from 'next/server'

const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'http://localhost:5000/api' 
  : 'https://winstowin.com/api'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Token d\'authentification requis' },
        { status: 401 }
      )
    }

    // Forward to backend content API to get newsletter data
    const response = await fetch(`${API_BASE}/dashboard/content`, {
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
    
    // Also fetch all newsletter subscribers
    const subscribersResponse = await fetch(`${API_BASE}/newsletter/subscribers?limit=100`, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
    })

    let subscribers = []
    if (subscribersResponse.ok) {
      const subscribersData = await subscribersResponse.json()
      subscribers = (subscribersData.data?.subscribers || []).map((sub: any) => ({
        id: sub.id,
        email: sub.email,
        is_active: sub.is_active,
        created_at: sub.created_at,
        last_activity: sub.updated_at || sub.created_at
      }))
    }
    
    // Transform backend data to newsletter-specific format
    const newsletterData = {
      subscribers: subscribers,
      stats: {
        total_subscribers: data.data?.newsletter_data?.total_subscribers || 0,
        active_subscribers: data.data?.newsletter_data?.active_subscribers || 0,
        unsubscribed: data.data?.newsletter_data?.unsubscribed || 0,
        growth_rate: 5.2 // Mock data - implement later
      },
      campaigns: data.data?.newsletter_data?.recent_campaigns || []
    }
    
    return NextResponse.json({
      success: true,
      data: newsletterData
    })

  } catch (error) {
    console.error('Newsletter API error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur serveur lors du chargement des données newsletter' 
      },
      { status: 500 }
    )
  }
}