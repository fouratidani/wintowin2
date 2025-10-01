// Pre-inscription API proxy to backend
// Forwards requests to the real backend server

export async function POST(request: Request) {
  try {
    const formData = await request.json()
    
    // Forward to the real backend
    const backendUrl = 'http://localhost:5000/api/preinscription'
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })

    const data = await response.json()

    if (!response.ok) {
      return Response.json(
        { success: false, message: data.message || 'Form submission failed' },
        { status: response.status }
      )
    }

    return Response.json(data)
    
  } catch (error) {
    console.error('Preinscription API proxy error:', error)
    return Response.json(
      { success: false, message: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}