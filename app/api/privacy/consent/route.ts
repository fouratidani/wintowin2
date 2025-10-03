import { NextRequest, NextResponse } from 'next/server'

const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://winstowin.com/api' 
  : 'http://localhost:5000/api'

// Helper function to get client IP
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  return 'unknown'
}

// POST - Save consent preferences
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const clientIP = getClientIP(request)
    
    // Forward to backend
    const response = await fetch(`${API_BASE}/privacy/consent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': clientIP,
        'User-Agent': request.headers.get('user-agent') || '',
      },
      body: JSON.stringify({
        ...body,
        userIp: clientIP,
        userAgent: request.headers.get('user-agent'),
        timestamp: new Date().toISOString()
      }),
    })

    if (!response.ok) {
      throw new Error('Backend consent save failed')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error saving consent:', error)
    
    // Return success even if backend fails (graceful degradation)
    return NextResponse.json({
      success: true,
      message: 'Consent preferences saved locally'
    })
  }
}

// GET - Retrieve consent preferences
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')
    
    if (!sessionId) {
      return NextResponse.json(
        { success: false, message: 'Session ID required' },
        { status: 400 }
      )
    }

    const response = await fetch(`${API_BASE}/privacy/consent/${sessionId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Backend consent fetch failed')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching consent:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Could not retrieve consent preferences'
    }, { status: 500 })
  }
}

// PUT - Update consent preferences  
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, ...consentData } = body
    const clientIP = getClientIP(request)
    
    if (!sessionId) {
      return NextResponse.json(
        { success: false, message: 'Session ID required' },
        { status: 400 }
      )
    }

    const response = await fetch(`${API_BASE}/privacy/consent/${sessionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': clientIP,
        'User-Agent': request.headers.get('user-agent') || '',
      },
      body: JSON.stringify({
        ...consentData,
        userIp: clientIP,
        userAgent: request.headers.get('user-agent'),
        updatedAt: new Date().toISOString()
      }),
    })

    if (!response.ok) {
      throw new Error('Backend consent update failed')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating consent:', error)
    
    return NextResponse.json({
      success: true,
      message: 'Consent preferences updated locally'
    })
  }
}

// DELETE - Withdraw consent (GDPR right to be forgotten)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')
    
    if (!sessionId) {
      return NextResponse.json(
        { success: false, message: 'Session ID required' },
        { status: 400 }
      )
    }

    const response = await fetch(`${API_BASE}/privacy/consent/${sessionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Backend consent deletion failed')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error deleting consent:', error)
    
    return NextResponse.json({
      success: true,
      message: 'Consent withdrawn locally'
    })
  }
}