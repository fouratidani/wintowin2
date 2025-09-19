import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
export default function PreInscription() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Main Content Section */}
      <section className="px-4 py-16 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Pré-Inscription</h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Rejoignez nos formations de qualité et développez vos compétences avec Win to Win. Remplissez ce formulaire
            pour commencer votre parcours d'apprentissage.
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12">
          <form className="space-y-8">
            {/* Personal Information Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-cyan-400 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  1
                </span>
                Informations Personnelles
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                    placeholder="votre.email@exemple.com"
                  />
                </div>
                <div>
                  <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                    placeholder="+216 XX XXX XXX"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-cyan-400 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  2
                </span>
                Informations Professionnelles
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="entreprise" className="block text-sm font-medium text-gray-700 mb-2">
                    Entreprise/Organisation
                  </label>
                  <input
                    type="text"
                    id="entreprise"
                    name="entreprise"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                    placeholder="Nom de votre entreprise"
                  />
                </div>
                <div>
                  <label htmlFor="poste" className="block text-sm font-medium text-gray-700 mb-2">
                    Poste Actuel
                  </label>
                  <input
                    type="text"
                    id="poste"
                    name="poste"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                    placeholder="Votre fonction"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="secteur" className="block text-sm font-medium text-gray-700 mb-2">
                    Secteur d'Activité
                  </label>
                  <select
                    id="secteur"
                    name="secteur"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  >
                    <option value="">Sélectionnez votre secteur</option>
                    <option value="informatique">Informatique et Technologies</option>
                    <option value="telecommunications">Télécommunications</option>
                    <option value="finance">Finance et Banque</option>
                    <option value="education">Éducation et Formation</option>
                    <option value="sante">Santé</option>
                    <option value="industrie">Industrie</option>
                    <option value="commerce">Commerce et Distribution</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Training Interest Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-cyan-400 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  3
                </span>
                Intérêt de Formation
              </h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="formation-type" className="block text-sm font-medium text-gray-700 mb-2">
                    Type de Formation Souhaité *
                  </label>
                  <select
                    id="formation-type"
                    name="formation-type"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  >
                    <option value="">Choisissez une formation</option>
                    <option value="courte">Formation Courte (1-5 jours)</option>
                    <option value="certifiante">Formation Certifiante</option>
                    <option value="sur-mesure">Formation Sur-Mesure</option>
                    <option value="consulting">Consulting et Audit</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="domaine" className="block text-sm font-medium text-gray-700 mb-2">
                    Domaine d'Intérêt *
                  </label>
                  <select
                    id="domaine"
                    name="domaine"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  >
                    <option value="">Sélectionnez un domaine</option>
                    <option value="telecommunications">Télécommunications</option>
                    <option value="informatique">Solutions Informatiques</option>
                    <option value="management">Management et Leadership</option>
                    <option value="digital">Transformation Digitale</option>
                    <option value="qualite">Qualité et Certification</option>
                    <option value="innovation">Innovation et R&D</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="niveau" className="block text-sm font-medium text-gray-700 mb-2">
                    Niveau d'Expérience
                  </label>
                  <select
                    id="niveau"
                    name="niveau"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  >
                    <option value="">Sélectionnez votre niveau</option>
                    <option value="debutant">Débutant</option>
                    <option value="intermediaire">Intermédiaire</option>
                    <option value="avance">Avancé</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="objectifs" className="block text-sm font-medium text-gray-700 mb-2">
                    Objectifs et Attentes
                  </label>
                  <textarea
                    id="objectifs"
                    name="objectifs"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent resize-none"
                    placeholder="Décrivez vos objectifs et ce que vous souhaitez accomplir avec cette formation..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-cyan-400 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  4
                </span>
                Informations Complémentaires
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Comment avez-vous entendu parler de nous ?
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      "Site Web",
                      "Réseaux Sociaux",
                      "Recommandation",
                      "Événement/Salon",
                      "Partenaire",
                      "Publicité",
                      "Moteur de Recherche",
                      "Autre",
                    ].map((source) => (
                      <label key={source} className="flex items-center">
                        <input
                          type="radio"
                          name="source"
                          value={source.toLowerCase().replace(/[^a-z]/g, "")}
                          className="w-4 h-4 text-cyan-400 border-gray-300 focus:ring-cyan-400"
                        />
                        <span className="ml-2 text-sm text-gray-700">{source}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    className="w-4 h-4 text-cyan-400 border-gray-300 rounded focus:ring-cyan-400 mt-1"
                  />
                  <label htmlFor="newsletter" className="ml-3 text-sm text-gray-700">
                    Je souhaite recevoir la newsletter et les informations sur les nouvelles formations
                  </label>
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="conditions"
                    name="conditions"
                    required
                    className="w-4 h-4 text-cyan-400 border-gray-300 rounded focus:ring-cyan-400 mt-1"
                  />
                  <label htmlFor="conditions" className="ml-3 text-sm text-gray-700">
                    J'accepte les{" "}
                    <a href="#" className="text-cyan-600 hover:underline">
                      conditions générales
                    </a>{" "}
                    et la
                    <a href="#" className="text-cyan-600 hover:underline ml-1">
                      politique de confidentialité
                    </a>{" "}
                    *
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-6">
              <button
                type="submit"
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-12 py-4 rounded-full font-bold text-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Envoyer ma Pré-Inscription
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Nous vous contacterons dans les 24h pour confirmer votre inscription
              </p>
            </div>
          </form>
        </div>
      </section>
<Footer/>
    </main>
  )
}
