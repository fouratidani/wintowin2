export default function FAQ() {
  const faqs = [
    {
      question: "Quels types de services propose Win to Win ?",
      answer:
        "Nous offrons des services variés adaptés à plusieurs catégories d'acteurs : entreprises, centres de formation, ministères et institutions, ainsi qu'aux étudiants et jeunes diplômés. Nos services couvrent la formation, le conseil stratégique, la transformation numérique, l'accompagnement à l'international et le placement professionnel.",
    },
    {
      question: "Est-ce que vous accompagnez les étudiants pour les stages et les études à l'étranger ?",
      answer:
        "Absolument. Nous aidons les étudiants et jeunes diplômés à trouver des stages PFE, à préparer leurs rapports, et nous proposons également un accompagnement complet pour les études ou les opportunités professionnelles à l'international, comme le programme Ausbildung en Allemagne.",
    },
    {
      question: "Comment puis-je bénéficier de vos services ?",
      answer:
        "Il vous suffit de nous contacter par téléphone, email ou via notre site web. Notre équipe prendra en charge votre demande, analysera vos besoins et vous proposera une solution personnalisée et adaptée à vos objectifs.",
    },
    {
      question: "Les formations proposées sont-elles certifiées?",
      answer:
        "Oui. Nos formations sont conçues selon des standards internationaux et, dans plusieurs cas, elles peuvent être accompagnées de certifications reconnues, d'accréditations ou de solutions ISO selon les besoins de nos partenaires.",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-semibold text-[#11023f] mb-6">Questions Fréquentes</h2>
          <p className="text-[#11023f] text-lg md:text-xl max-w-4xl mx-auto">
            Trouvez rapidement les réponses aux interrogations les plus courantes.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="group relative bg-gradient-to-br from-blue-200 via-sky-100 to-blue-50 rounded-2xl p-8 shadow-lg cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] overflow-hidden">
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-orange-200 to-yellow-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-[#11023f] text-2xl md:text-3xl font-semibold mb-4 transition-all duration-500">{faq.question}</h3>
                <p className="text-[#11023f] text-lg md:text-xl leading-relaxed transition-all duration-500">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
