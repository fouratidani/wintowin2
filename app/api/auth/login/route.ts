import { NextRequest, NextResponse } from 'next/server'

const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'http://localhost:5000/api' 
  : 'http://localhost:5000/api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { email, password } = body
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email et mot de passe requis' },
        { status: 400 }
      )
    }

    // Forward to backend auth
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (response.ok && data.success) {
      // Pass through the backend response structure
      return NextResponse.json(data)
    } else {
      return NextResponse.json(
        { 
          success: false, 
          message: data.message || 'Échec de la connexion' 
        },
        { status: response.status }
      )
    }

  } catch (error) {
    console.error('Admin login API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur serveur lors de la connexion' 
      },
      { status: 500 }
    )
  }
}
