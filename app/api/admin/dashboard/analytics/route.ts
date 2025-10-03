import { NextRequest, NextResponse } from 'next/server'

const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://winstowin.com/api' 
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

    // Get query parameters for analytics filtering
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '7d'
    const category = searchParams.get('category') || ''

    // Forward to backend analytics API
    const queryString = new URLSearchParams({ period, category }).toString()
    const response = await fetch(`${API_BASE}/dashboard/analytics?${queryString}`, {
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
    return NextResponse.json(data)

  } catch (error) {
    console.error('Analytics API error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur serveur lors du chargement des données analytics' 
      },
      { status: 500 }
    )
  }
}