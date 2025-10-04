import { Metadata } from 'next'
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import JSONLD from "../../components/JSONLD"
import { generateSEO, generateWebPageSchema, SITE_CONFIG } from "../../lib/seo"

export const metadata: Metadata = generateSEO({
  title: "Politique de Confidentialité - Win2Win",
  description: "Découvrez notre politique de confidentialité et comment nous protégeons vos données personnelles conformément au RGPD. Transparence et respect de votre vie privée.",
  canonical: `${SITE_CONFIG.domain}/privacy-policy`,
  keywords: [
    'politique confidentialité',
    'protection données',
    'RGPD',
    'vie privée',
    'cookies',
    'données personnelles',
    'confidentialité win2win'
  ],
  robots: 'index, follow'
})

export default function PrivacyPolicy() {
  const pageSchema = generateWebPageSchema({
    title: "Politique de Confidentialité - Win2Win",
    description: "Notre politique de confidentialité et comment nous protégeons vos données personnelles conformément au RGPD.",
    url: "/privacy-policy",
    breadcrumbs: [
      { name: "Accueil", url: "/" },
      { name: "Politique de Confidentialité", url: "/privacy-policy" }
    ]
  })

  return (
    <>
      <JSONLD data={pageSchema} />
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#00a0e8] to-[#0080c7]">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Politique de Confidentialité
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Nous respectons votre vie privée et nous nous engageons à protéger vos données personnelles. 
              Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
            </p>
            <div className="mt-6 text-sm text-white/80">
              Dernière mise à jour : 25 septembre 2025 • Version 1.0
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8 prose prose-lg max-w-none">
              
              {/* Table of Contents */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Table des matières</h2>
                <ul className="space-y-2 text-[#00a0e8]">
                  <li><a href="#collecte-donnees" className="hover:underline">1. Collecte des données</a></li>
                  <li><a href="#utilisation-donnees" className="hover:underline">2. Utilisation des données</a></li>
                  <li><a href="#cookies" className="hover:underline">3. Cookies et technologies similaires</a></li>
                  <li><a href="#partage-donnees" className="hover:underline">4. Partage des données</a></li>
                  <li><a href="#protection-donnees" className="hover:underline">5. Protection des données</a></li>
                  <li><a href="#droits-utilisateurs" className="hover:underline">6. Vos droits</a></li>
                  <li><a href="#contact" className="hover:underline">7. Contact</a></li>
                </ul>
              </div>

              {/* Section 1 */}
              <section id="collecte-donnees" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Collecte des données</h2>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-4">1.1 Données que nous collectons</h3>
                <p className="mb-4">
                  Nous collectons les types de données suivants :
                </p>
                <ul className="mb-6">
                  <li><strong>Données d'identification :</strong> nom, prénom, adresse email, téléphone</li>
                  <li><strong>Données professionnelles :</strong> entreprise, poste, secteur d'activité</li>
                  <li><strong>Données de navigation :</strong> pages visitées, temps passé, actions effectuées</li>
                  <li><strong>Données techniques :</strong> adresse IP (anonymisée), navigateur, système d'exploitation</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-4">1.2 Comment nous collectons vos données</h3>
                <ul className="mb-6">
                  <li><strong>Directement :</strong> via les formulaires de contact, pré-inscription, newsletter</li>
                  <li><strong>Automatiquement :</strong> lors de votre navigation sur le site (avec votre consentement)</li>
                  <li><strong>Partenaires :</strong> données publiques d'entreprises et réseaux professionnels</li>
                </ul>
              </section>

              {/* Section 2 */}
              <section id="utilisation-donnees" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Utilisation des données</h2>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-4">2.1 Finalités du traitement</h3>
                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">🎯 Services Win2Win</h4>
                  <ul>
                    <li>Traitement des demandes de renseignements</li>
                    <li>Gestion des pré-inscriptions aux formations</li>
                    <li>Envoi de la newsletter (avec consentement)</li>
                    <li>Amélioration de nos services</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">📊 Analyses et statistiques</h4>
                  <ul>
                    <li>Mesure d'audience et performance du site</li>
                    <li>Analyse des parcours utilisateurs</li>
                    <li>Optimisation de l'expérience utilisateur</li>
                    <li>Reporting et tableaux de bord internes</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-4">2.2 Base légale</h3>
                <p className="mb-4">
                  Nos traitements reposent sur :
                </p>
                <ul className="mb-6">
                  <li><strong>Consentement :</strong> newsletter, cookies analytiques et marketing</li>
                  <li><strong>Intérêt légitime :</strong> amélioration des services, mesures de sécurité</li>
                  <li><strong>Exécution contractuelle :</strong> gestion des formations et services</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section id="cookies" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Cookies et technologies similaires</h2>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-4">3.1 Types de cookies utilisés</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">🔧 Cookies essentiels</h4>
                    <p className="text-sm text-gray-600 mb-2">Nécessaires au fonctionnement du site</p>
                    <div className="text-xs text-gray-500">
                      • Session utilisateur<br/>
                      • Préférences de langue<br/>
                      • Sécurité et authentification
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">📊 Cookies analytiques</h4>
                    <p className="text-sm text-gray-600 mb-2">Mesure d'audience et statistiques</p>
                    <div className="text-xs text-gray-500">
                      • Google Analytics<br/>
                      • Pages visitées<br/>
                      • Parcours utilisateur
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">🎯 Cookies marketing</h4>
                    <p className="text-sm text-gray-600 mb-2">Publicité personnalisée</p>
                    <div className="text-xs text-gray-500">
                      • Facebook Pixel<br/>
                      • Google Ads<br/>
                      • Retargeting
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">⚙️ Cookies de préférences</h4>
                    <p className="text-sm text-gray-600 mb-2">Personnalisation de l'expérience</p>
                    <div className="text-xs text-gray-500">
                      • Thème sombre/clair<br/>
                      • Taille de police<br/>
                      • Région/langue
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-4">3.2 Gestion des cookies</h3>
                <p className="mb-4">
                  Vous pouvez à tout moment modifier vos préférences cookies via :
                </p>
                <ul className="mb-6">
                  <li>Le bandeau de consentement lors de votre première visite</li>
                  <li>Le lien "Gérer les cookies" en bas de chaque page</li>
                  <li>Les paramètres de votre navigateur</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="partage-donnees" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Partage des données</h2>
                
                <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">🔒 Principe général</h3>
                  <p>
                    <strong>Nous ne vendons jamais vos données personnelles.</strong> Vos informations ne sont partagées 
                    qu'avec des partenaires de confiance et uniquement dans les cas suivants :
                  </p>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-4">4.1 Partage autorisé</h3>
                <ul className="mb-6">
                  <li><strong>Prestataires techniques :</strong> hébergement, emailing, analytics (sous contrat de confidentialité)</li>
                  <li><strong>Partenaires formation :</strong> organismes certificateurs, formateurs externes (avec consentement)</li>
                  <li><strong>Obligations légales :</strong> autorités compétentes en cas de demande judiciaire</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-4">4.2 Transferts internationaux</h3>
                <p className="mb-6">
                  Certains de nos prestataires sont situés en dehors de l'UE (Google, Meta). 
                  Ces transferts sont encadrés par les clauses contractuelles types de la Commission européenne 
                  ou des décisions d'adéquation.
                </p>
              </section>

              {/* Section 5 */}
              <section id="protection-donnees" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Protection des données</h2>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-4">5.1 Mesures de sécurité</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">🔐 Techniques</h4>
                    <ul className="text-sm">
                      <li>Chiffrement SSL/TLS</li>
                      <li>Anonymisation des IP</li>
                      <li>Sauvegardes sécurisées</li>
                      <li>Accès restreints</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">👥 Organisationnelles</h4>
                    <ul className="text-sm">
                      <li>Formation équipes</li>
                      <li>Politique de confidentialité</li>
                      <li>Audits réguliers</li>
                      <li>Gestion des incidents</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-4">5.2 Conservation des données</h3>
                <ul className="mb-6">
                  <li><strong>Données prospects :</strong> 3 ans à partir du dernier contact</li>
                  <li><strong>Données participants :</strong> 5 ans pour les obligations comptables</li>
                  <li><strong>Cookies analytiques :</strong> 25 mois maximum</li>
                  <li><strong>Newsletter :</strong> jusqu'au désabonnement</li>
                </ul>
              </section>

              {/* Section 6 */}
              <section id="droits-utilisateurs" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Vos droits</h2>
                
                <div className="bg-[#00a0e8]/10 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">⚖️ Droits RGPD</h3>
                  <p>
                    Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">🔍 Droit d'accès</h4>
                    <p className="text-sm text-gray-600">
                      Obtenir une copie de toutes les données que nous détenons sur vous
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">✏️ Droit de rectification</h4>
                    <p className="text-sm text-gray-600">
                      Corriger ou mettre à jour vos informations personnelles
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">🗑️ Droit à l'effacement</h4>
                    <p className="text-sm text-gray-600">
                      Demander la suppression de vos données personnelles
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">⏸️ Droit de limitation</h4>
                    <p className="text-sm text-gray-600">
                      Restreindre le traitement de vos données dans certains cas
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">📦 Droit à la portabilité</h4>
                    <p className="text-sm text-gray-600">
                      Récupérer vos données dans un format structuré
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">🚫 Droit d'opposition</h4>
                    <p className="text-sm text-gray-600">
                      Vous opposer au traitement de vos données pour des raisons légitimes
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">📋 Comment exercer vos droits</h4>
                  <p className="mb-3">
                    Pour exercer l'un de ces droits, contactez-nous par email à <strong>privacy@wintowin.fr</strong> 
                    en précisant :
                  </p>
                  <ul>
                    <li>Votre identité et vos coordonnées</li>
                    <li>Le droit que vous souhaitez exercer</li>
                    <li>La raison de votre demande (si nécessaire)</li>
                  </ul>
                  <p className="mt-3 text-sm text-gray-600">
                    Nous vous répondrons dans un délai maximum d'un mois.
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section id="contact" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Contact</h2>
                
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-4">📧 Délégué à la protection des données</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p><strong>Email :</strong> privacy@wintowin.fr</p>
                      <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
                      <p><strong>Courrier :</strong></p>
                      <address className="not-italic">
                        Win2Win - DPO<br/>
                        123 Avenue des Formations<br/>
                        75001 Paris, France
                      </address>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">🛡️ Réclamation</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la CNIL :
                      </p>
                      <p className="text-sm">
                        <strong>CNIL</strong><br/>
                        3 Place de Fontenoy<br/>
                        75007 Paris<br/>
                        <a href="https://www.cnil.fr" className="text-[#00a0e8] hover:underline">www.cnil.fr</a>
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}