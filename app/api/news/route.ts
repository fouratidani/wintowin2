// News API proxy to backend
// Forwards requests to the real backend server

export async function GET() {
  try {
    const backendUrl = 'http://localhost:5000/api/news?published=true&limit=10'
    
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
    console.error('News API proxy error:', error)
    
    // Return fallback data if backend is not available
    const fallbackData = {
      success: true,
      data: [
        {
          id: '1',
          title: 'Nouvelle Formation en Intelligence Artificielle',
          excerpt: 'Découvrez notre nouveau programme de formation en IA, conçu pour les professionnels souhaitant maîtriser les technologies de demain.',
          content: 'Découvrez notre nouveau programme de formation en IA, conçu pour les professionnels souhaitant maîtriser les technologies de demain. Cette formation complète couvre tous les aspects de l\'intelligence artificielle moderne.',
          category: 'Formation',
          image: '/images/img.jpg',
          isPublished: true,
          publishDate: new Date().toISOString(), // Today - will show "Nouveau"
          readTime: '3 min',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Partenariat Stratégique avec Tech Solutions',
          excerpt: 'Nous sommes fiers d\'annoncer notre nouveau partenariat qui enrichira notre offre de formations techniques.',
          content: 'Nous sommes fiers d\'annoncer notre nouveau partenariat stratégique avec Tech Solutions, une collaboration qui enrichira considérablement notre offre de formations techniques.',
          category: 'Partenariat',
          image: '/images/pq.jpg',
          isPublished: true,
          publishDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago - will show "Nouveau"
          readTime: '2 min',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Succès de nos Diplômés en Cybersécurité',
          excerpt: 'Découvrez les témoignages inspirants de nos anciens étudiants qui excellent maintenant dans le domaine de la cybersécurité.',
          content: 'Nos diplômés continuent de nous rendre fiers avec leurs réussites exceptionnelles dans le domaine de la cybersécurité. Voici quelques témoignages inspirants.',
          category: 'Témoignage',
          image: '/images/s2.jpg',
          isPublished: true,
          publishDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago - will show "Nouveau"
          readTime: '4 min',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '4',
          title: 'Amélioration de nos Installations de Formation',
          excerpt: 'Nous avons récemment modernisé nos espaces de formation pour offrir une meilleure expérience d\'apprentissage.',
          content: 'Win2Win a investi dans la modernisation de ses installations pour créer un environnement d\'apprentissage optimal et stimulant pour tous nos étudiants.',
          category: 'Infrastructure',
          image: '/images/s3.jpg',
          isPublished: true,
          publishDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago - no badge
          readTime: '3 min',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
    }
    
    return Response.json(fallbackData)
  }
}
