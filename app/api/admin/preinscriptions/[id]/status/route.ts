import { NextRequest, NextResponse } from 'next/server'

const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://your-domain.com/api' 
  : 'http://localhost:5000/api'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Token d\'authentification requis' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { status } = body

    if (!status || !['approuve', 'rejete'].includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Statut invalide' },
        { status: 400 }
      )
    }

    // Forward to backend preinscriptions status update API
    const response = await fetch(`${API_BASE}/dashboard/preinscriptions/${params.id}/status`, {
      method: 'PUT',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status })
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
    console.error('Preinscription status update API error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur serveur lors de la mise à jour du statut' 
      },
      { status: 500 }
    )
  }
}