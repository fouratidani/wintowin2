import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import About from "../components/About"
import Services from "../components/Services"
import Formations from "../components/Formations"
import Programs from "../components/Programs"
import Testimonials from "../components/Testimonials"
import News from "../components/News"
import FAQ from "../components/FAQ"
import WhyChooseUs from "../components/WhyChooseUs"
import Footer from "../components/Footer"

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Formations />
      <Programs />
      <Testimonials />
      <News />
      <FAQ />
      <WhyChooseUs />
      <Footer />
    </div>
  )
}
