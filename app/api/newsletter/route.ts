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

    // Get query parameters for pagination
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '50'

    // Forward to backend newsletter subscribers API
    const response = await fetch(`${API_BASE}/newsletter/subscribers?page=${page}&limit=${limit}`, {
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
        subscribers: data.data.subscribers.map((sub: any) => ({
          id: sub.id,
          email: sub.email,
          is_active: sub.is_active,
          created_at: sub.created_at,
          last_activity: sub.updated_at
        })),
        stats: {
          total_subscribers: data.data.pagination.total,
          active_subscribers: data.data.pagination.active,
          unsubscribed: data.data.pagination.total - data.data.pagination.active,
          growth_rate: 0 // You can calculate this based on historical data
        },
        campaigns: [] // Newsletter campaigns would come from a different endpoint
      }
    }

    return NextResponse.json(transformedData)

  } catch (error) {
    console.error('Newsletter API error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur serveur lors de la récupération des données newsletter' 
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    // Validate email
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email requis' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Format d\'email invalide' },
        { status: 400 }
      )
    }

    // Forward to backend newsletter subscribe API
    const response = await fetch(`${API_BASE}/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })

  } catch (error) {
    console.error('Newsletter subscribe API error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur serveur lors de l\'inscription à la newsletter' 
      },
      { status: 500 }
    )
  }
}
