import Link from 'next/link'

export default function WhyChooseUs() {
  const reasons = [
    "Une expertise pluridisciplinaire et internationale",
    "Une approche sur-mesure et orientée résultats",
    "Une capacité d'alignement sur les normes et standards internationaux",
  ]

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/images/pq.jpg')`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-white text-5xl md:text-6xl font-semibold mb-8">Pourquoi Nous Choisir</h2>
            <p className="text-white text-lg md:text-xl mb-8 leading-relaxed">
              Parce que votre réussite est au cœur de notre mission.
            </p>
            <Link 
              href="/about"
              className="bg-[#00a0e8] text-white font-semibold text-lg px-8 py-4 rounded-full hover:bg-[#0088cc] transition-all duration-300 inline-block"
            >
              Voir Plus
            </Link>
          </div>

          {/* Right Content - Reasons */}
          <div className="space-y-6">
            {reasons.map((reason, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <p className="text-[#11023f] text-xl md:text-2xl font-semibold">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
