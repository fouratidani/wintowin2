import { NextResponse } from 'next/server'

// Static formations data - this can be moved to backend later
const staticFormations = [
  {
    id: "1",
    title: "Formation en Développement Web",
    description: "Une formation complète pour apprendre le développement web moderne avec React, Node.js et les technologies actuelles du marché.",
    duration: "6 mois",
    level: "Débutant",
    category: "Informatique"
  },
  {
    id: "2", 
    title: "Formation en Data Science",
    description: "Apprenez l'analyse de données, le machine learning et l'intelligence artificielle avec Python et les outils modernes.",
    duration: "8 mois",
    level: "Intermédiaire",
    category: "Data"
  },
  {
    id: "3",
    title: "Formation en Cybersécurité", 
    description: "Formation complète sur la sécurité informatique, incluant la protection des réseaux et la gestion des incidents.",
    duration: "4 mois",
    level: "Avancé",
    category: "Sécurité"
  },
  {
    id: "4",
    title: "Formation en Design UX/UI",
    description: "Maîtrisez les principes du design d'expérience utilisateur pour créer des applications modernes et intuitives.",
    duration: "5 mois",
    level: "Débutant",
    category: "Design"
  },
  {
    id: "5",
    title: "Formation en Marketing Digital",
    description: "Découvrez les stratégies de marketing digital, SEO, réseaux sociaux et publicité en ligne.",
    duration: "3 mois",
    level: "Débutant",
    category: "Marketing"
  },
  {
    id: "6",
    title: "Formation en Gestion de Projet",
    description: "Apprenez les méthodologies Agile et Scrum pour gérer efficacement vos projets informatiques.",
    duration: "4 mois",
    level: "Intermédiaire",
    category: "Management"
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