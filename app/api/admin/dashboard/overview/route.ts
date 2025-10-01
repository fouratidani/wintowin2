import { NextRequest, NextResponse } from 'next/server'

const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://your-domain.com/api' 
  : 'http://localhost:5000/api'

export async function GET(request: NextRequest) {
  try {
    // Get the authorization token from the request
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Token d\'authentification requis' },
        { status: 401 }
      )
    }

    // Forward to backend dashboard API
    const response = await fetch(`${API_BASE}/dashboard/overview`, {
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
    console.error('Dashboard API error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur serveur lors du chargement des données du tableau de bord' 
      },
      { status: 500 }
    )
  }
}