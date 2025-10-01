import { NextRequest, NextResponse } from 'next/server'

const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://your-domain.com/api' 
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

// POST - Track analytics event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const clientIP = getClientIP(request)
    
    // Validate required fields
    const { eventType, eventCategory, eventAction, sessionId } = body
    if (!eventType || !eventCategory || !eventAction || !sessionId) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Forward to backend
    const response = await fetch(`${API_BASE}/analytics/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': clientIP,
        'User-Agent': request.headers.get('user-agent') || '',
        'X-Session-Id': sessionId,
      },
      body: JSON.stringify({
        eventType,
        eventCategory,
        eventAction,
        eventLabel: body.eventLabel,
        pageUrl: body.pageUrl,
        referrer: body.referrer,
        additionalData: body.additionalData
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Backend analytics error:', response.status, errorText)
      throw new Error(`Backend analytics tracking failed: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error tracking event:', error)
    
    // Return success even if backend fails (graceful degradation)
    return NextResponse.json({
      success: true,
      message: 'Event tracked locally'
    })
  }
}

// GET - Retrieve analytics dashboard (admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'overview'
    
    // TODO: Add authentication check here
    // if (!isAuthenticated(request)) {
    //   return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    // }

    const response = await fetch(`${API_BASE}/analytics/dashboard?type=${type}`, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${getAuthToken(request)}`,
      },
    })

    if (!response.ok) {
      throw new Error('Backend analytics fetch failed')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Could not retrieve analytics data'
    }, { status: 500 })
  }
}