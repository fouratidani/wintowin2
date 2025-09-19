import Image from 'next/image'
import Link from 'next/link'
export default function About() {
  return (
    <section id="apropos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-5xl md:text-6xl font-semibold text-[#11023f] mb-8 font-kontora">À Propos</h2>
            <p className="text-[#11023f] text-xl md:text-2xl leading-relaxed mb-8 font-poppins">
              Chez Win to Win, nous transformons le potentiel en succès. Grâce à notre expertise technique et notre
              approche sur-mesure, nous accompagnons chacun de nos partenaires vers l'excellence.
            </p>
            <Link href="/about" passHref>
              <button className="bg-[#00a0e8] text-white font-medium text-lg px-8 py-4 rounded-full hover:bg-[#0088cc] transition-all duration-300 font-poppins">
                Voir Plus
              </button>
            </Link>
          </div>

          {/* Right Content - Logo/Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="flex items-center">
                <Image src="/images/logo.png" alt="Win to Win Logo" width={500} height={500} className="h-50 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
