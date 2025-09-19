"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

// Routes map for centralized navigation
const routes = [
  { 
    name: "Accueil", 
    href: "/", 
    isExternal: true // Scroll to section on homepage
  },
  { 
    name: "Formation Courtes", 
    href: "/formations", 
    isExternal: false // Navigate to separate page
  },
  { 
    name: "Services", 
    href: "/services", 
    isExternal: false // Navigate to separate page
  },
  { 
    name: "À Propos", 
    href: "/about", 
    isExternal: false // Navigate to separate page
  },
  { 
    name: "Actualités", 
    href: "/news", 
    isExternal: false // Navigate to separate page
  },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 bg-white/90 backdrop-blur-md border border-gray-200/30 shadow-lg rounded-lg md:rounded-full md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-4/5 lg:w-3/4 xl:w-2/3">
      <div className="max-w-none mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
          <div className="flex items-center">
            <Image src="/images/logo.png" alt="Win to Win Logo" width={130} height={75} className="h-10 w-auto" />
          </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {routes.map((route) => (
              route.isExternal ? (
                <a
                  key={route.name}
                  href={route.href}
                  className="text-[#11023f] font-poppins font-semibold text-base hover:text-[#00a0e8] transition-colors"
                >
                  {route.name}
                </a>
              ) : (
                <Link
                  key={route.name}
                  href={route.href}
                  className="text-[#11023f] font-poppins font-semibold text-base hover:text-[#00a0e8] transition-colors"
                >
                  {route.name}
                </Link>
              )
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/preinscription">
              <button className="bg-white border-2 border-[#00a0e8] text-[#00a0e8] font-poppins font-bold px-6 py-2.5 rounded-full hover:bg-[#00a0e8] hover:text-white transition-all duration-300">
                Pré-Inscription
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#11023f] hover:text-[#00a0e8] focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2">
              {routes.map((route) => (
                route.isExternal ? (
                  <a
                    key={route.name}
                    href={route.href}
                    className="block px-3 py-2 text-[#11023f] font-poppins font-semibold hover:text-[#00a0e8]"
                  >
                    {route.name}
                  </a>
                ) : (
                  <Link
                    key={route.name}
                    href={route.href}
                    className="block px-3 py-2 text-[#11023f] font-poppins font-semibold hover:text-[#00a0e8]"
                  >
                    {route.name}
                  </Link>
                )
              ))}
              <Link href="/preinscription">
                <button className="w-full mt-4 bg-white border-2 border-[#00a0e8] text-[#00a0e8] font-poppins font-bold px-6 py-3 rounded-full">
                  Pré-Inscription
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
