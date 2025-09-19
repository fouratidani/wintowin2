import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Link from "next/link"

export default function Services() {
  const services = [
    {
      title: "Pour Les Entreprises",
      image: "/images/s1.jpg",
      alt: "Pour Les Entreprises",
      link: "/services/entreprises"
    },
    {
      title: "Pour Les centres de\nformation",
      image: "/images/s2.jpg",
      alt: "Training center",
      link: "/services/centres-formation"
    },
    {
      title: "Pour Les élèves, étudiants\net jeunes diplômés",
      image: "/images/s3.jpg",
      alt: "Students and young graduates",
      link: "/services/etudiants"
    },
    {
      title: "Ministères et institutions",
      image: "/images/s4.jpg",
      alt: "Government building",
      link: "/services/institutions"
    }
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="px-4 py-16 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="font-kontora text-4xl md:text-5xl font-semibold text-gray-900 mb-8">Services</h1>
        </div>

        {/* Services Cards */}
        <div className="space-y-6 mb-16">
          {services.map((service, index) => (
            <Link key={index} href={service.link} className="block">
              <div className="group relative rounded-3xl overflow-hidden h-64 md:h-80 cursor-pointer hover:shadow-lg transition-all duration-500">
                {/* Background Image */}
                <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0">
                  <img src={service.image} alt={service.alt} className="w-full h-full object-cover" />
                </div>
                
                {/* Blue Gradient (appears on hover) */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-between p-8 md:p-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white transition-all duration-500 whitespace-pre-line">
                    {service.title}
                  </h2>
                  
                  {/* Forward Button (appears on hover) */}
                  <div className="bg-cyan-400 rounded-full p-3 ml-4 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
    <Footer />
    </>
  )
}