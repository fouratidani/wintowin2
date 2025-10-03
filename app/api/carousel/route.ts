// Carousel API proxy to backend
// Forwards requests to the real backend server

export async function GET() {
  try {
    const backendUrl = 'https://winstowin.com/api/carousel/active'
    
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`Backend request failed: ${response.status}`)
    }

    const data = await response.json()
    return Response.json(data)
    
  } catch (error) {
    console.error('Carousel API proxy error:', error)
    
    // Return fallback data if backend is not available
    const fallbackData = {
      success: true,
      data: [
        {
          id: '1',
          title: 'WINTOWIN',
          description: 'Chez Win to Win, nous transformons le potentiel en succès. Grâce à notre expertise technique et notre approche sur-mesure, nous accompagnons chacun de nos partenaires vers l\'excellence.',
          image: '/images/img.jpg',
          buttonText: 'Découvrir Nos Services',
          buttonLink: '/services',
          isActive: true,
          order: 1,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'FORMATIONS SPÉCIALISÉES',
          description: 'Transformons ensemble votre potentiel en succès avec nos formations spécialisées et notre accompagnement personnalisé.',
          image: '/images/pq.jpg',
          buttonText: 'Voir Nos Formations',
          buttonLink: '/formations',
          isActive: true,
          order: 2,
          createdAt: new Date().toISOString()
        }
      ]
    }
    
    return Response.json(fallbackData)
  }
}