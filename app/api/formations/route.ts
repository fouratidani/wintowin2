import { NextResponse } from 'next/server'

// Static formations data - this can be moved to backend later
const staticFormations = [
  {
    id: "1",
    title: "Langues Étrangères",
    description: "Allemand jusqu'au niveau B2, préparation Ausbildung, études et travail en Allemagne. Anglais et Italien disponibles.",
    duration: "6-12 mois",
    level: "A1 à B2",
    category: "Langues"
  },
  {
    id: "2", 
    title: "Cybersécurité",
    description: "Formation complète sur la sécurité informatique, protection des systèmes et réseaux contre les menaces.",
    duration: "4-6 mois",
    level: "Intermédiaire",
    category: "Informatique"
  },
  {
    id: "3",
    title: "Power BI", 
    description: "Analyse des données & reporting interactif. Maîtrisez la visualisation de données professionnelle.",
    duration: "2-3 mois",
    level: "Débutant",
    category: "Analyse"
  },
  {
    id: "4",
    title: "IA & Développement",
    description: "Programmation, automatisation, intelligence artificielle. Développez des solutions innovantes et intelligentes.",
    duration: "8-12 mois",
    level: "Intermédiaire",
    category: "Informatique"
  },
  {
    id: "5",
    title: "Développement Web",
    description: "HTML, CSS, JavaScript, PHP, C++... Maîtrisez les technologies web modernes pour créer des applications robustes.",
    duration: "6-8 mois",
    level: "Débutant",
    category: "Informatique"
  },
  {
    id: "6",
    title: "Création de Sites Web",
    description: "WordPress, e-commerce, plateformes dynamiques. Créez des sites web professionnels et fonctionnels.",
    duration: "3-4 mois",
    level: "Débutant",
    category: "Web"
  },
  {
    id: "7",
    title: "Web Design & Graphisme",
    description: "UI/UX, identité visuelle. Concevez des interfaces esthétiques et une identité de marque forte.",
    duration: "4-6 mois",
    level: "Débutant",
    category: "Design"
  },
  {
    id: "8",
    title: "Montage Vidéo",
    description: "Création de contenus professionnels et créatifs. Maîtrisez les outils de montage vidéo moderne.",
    duration: "2-4 mois",
    level: "Débutant",
    category: "Multimédia"
  }
]

export async function GET() {
  try {
    // For now, return static data
    // In the future, this could proxy to the backend formations endpoint
    return NextResponse.json({
      success: true,
      data: staticFormations
    })
  } catch (error) {
    console.error('Error fetching formations:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur lors du chargement des formations' },
      { status: 500 }
    )
  }
}
