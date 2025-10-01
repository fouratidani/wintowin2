import Link from 'next/link'

export default function Programs() {
  const programs = [
    {
      title: "Ausbildung (Programme allemand de formation professionnelle)",
      gradient: "from-blue-400 to-blue-200",
      image: "/images/p1.jpg",
      description: "Programme professionnel allemand d'excellence"
    },
    {
      title: "Placement des Infirmiers",
      gradient: "from-purple-400 to-purple-200",
      image: "/images/p2.jpg",
      description: "Opportunités internationales pour infirmiers"
    },
    {
      title: "Accompagnement pour les études à l'étranger",
      gradient: "from-blue-400 to-blue-200",
      image: "/images/p3.jpg",
      description: "Votre passerelle vers l'éducation internationale"
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-semibold text-[#11023f] mb-8">
            Programmes Internationaux et Placement
          </h2>
        </div>

        {/* Programs */}
        <div className="space-y-6">
          {programs.map((program, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden shadow-lg border-2 border-[#00a0e8] h-64 cursor-pointer transition-all duration-500 hover:shadow-2xl"
            >
              {/* Background Image */}
              <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0">
                <img 
                  src={program.image} 
                  alt={program.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Gradient Background (appears on hover) */}
              <div className={`absolute inset-0 bg-gradient-to-r ${program.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}></div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12">
                {/* Title (always visible) */}
                <div>
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-4 transition-all duration-300">
                    {program.title}
                  </h3>
                  {/* Description (appears on hover) */}
                  <p className="text-white text-lg opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                    {program.description}
                  </p>
                </div>

                {/* Voir Plus Button (appears on hover) */}
                <div className="opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  <Link 
                    href="/services/etudiants"
                    className="bg-white text-[#00a0e8] font-semibold text-lg px-6 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 inline-block"
                  >
                    Voir Plus
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
