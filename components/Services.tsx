import Link from "next/link"
export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-semibold text-[#11023f] mb-8">Nos Services</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-[#11023f] text-xl md:text-2xl leading-relaxed mb-8">
              Nous offrons une large gamme de services adaptés à différentes catégories d'entités, notamment{" "}
              <strong>les entreprises</strong>, les <strong>centres de formation</strong> et bien d'
              <strong>autres</strong>. Chaque catégorie bénéficie de solutions spécifiques et diversifiées, conçues pour
              répondre à ses <strong>besoins</strong> particuliers. Découvrez l'ensemble de nos services et explorez les
              opportunités qui s'offrent à vous.
            </p>
            <Link href="/services" passHref>
              <button className="bg-[#00a0e8] text-white font-medium text-lg px-8 py-4 rounded-full hover:bg-[#0088cc] transition-all duration-300">
                Voir Plus
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
