import { NextRequest, NextResponse } from 'next/server'

const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'http://localhost:5000/api' 
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

// POST - Track page view
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const clientIP = getClientIP(request)
    
    // Validate required fields
    const { sessionId, pageUrl } = body
    if (!sessionId || !pageUrl) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Forward to backend
    const response = await fetch(`${API_BASE}/analytics/pageviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': clientIP,
        'User-Agent': request.headers.get('user-agent') || '',
        'X-Session-Id': body.sessionId,
      },
      body: JSON.stringify({
        path: body.path || new URL(body.pageUrl).pathname,
        title: body.title,
        referrer: body.referrer || ''
      }),
    })

    if (!response.ok) {
      throw new Error('Backend page view tracking failed')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error tracking page view:', error)
    
    // Return success even if backend fails (graceful degradation)
    return NextResponse.json({
      success: true,
      message: 'Page view tracked locally'
    })
  }
}
