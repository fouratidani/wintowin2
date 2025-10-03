// Simple newsletter subscription endpoint
// This creates a minimal pre-inscription record with newsletter=true

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    // Validate email
    if (!email) {
      return Response.json(
        { success: false, message: 'Email requis' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, message: 'Format d\'email invalide' },
        { status: 400 }
      )
    }

    // Forward to the real backend's preinscription endpoint with minimal data
    const backendUrl = 'https://winstowin.com/api/preinscription'
    
    const newsletterData = {
      prenom: 'Newsletter',
      nom: 'Subscriber',
      email: email,
      telephone: 'N/A',
      entreprise: 'N/A',
      poste: 'N/A',
      secteur: 'N/A',
      formationType: 'newsletter',
      domaine: 'newsletter',
      niveau: 'N/A',
      objectifs: 'Newsletter subscription',
      source: 'footer',
      newsletter: true
    }

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newsletterData)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Newsletter subscription failed')
    }

    return Response.json({ 
      success: true, 
      message: 'Inscription à la newsletter réussie'
    })
    
  } catch (error) {
    console.error('Newsletter API error:', error)
    return Response.json(
      { success: false, message: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}