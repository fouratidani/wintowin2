"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { trackEvent } from '@/lib/cookie-consent'

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
    isExternal: false, // Navigate to separate page
    hasDropdown: true,
    dropdownItems: [
      { name: "Toutes les Formations", href: "/formations" },
      { name: "Développement Web", href: "/formations/1" },
      { name: "Data Science", href: "/formations/2" },
      { name: "Cybersécurité", href: "/formations/3" },
      { name: "Design UX/UI", href: "/formations/4" },
      { name: "Marketing Digital", href: "/formations/5" }
    ]
  },
  { 
    name: "Services", 
    href: "/services", 
    isExternal: false, // Navigate to separate page
    hasDropdown: true,
    dropdownItems: [
      { name: "Tous nos Services", href: "/services" },
      { name: "Pour Les Entreprises", href: "/services/entreprises" },
      { name: "Pour Les Centres de Formation", href: "/services/centres-formation" },
      { name: "Pour Les Étudiants", href: "/services/etudiants" },
      { name: "Ministères et Institutions", href: "/services/institutions" }
    ]
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

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
              <div key={route.name} className="relative group">
                {route.hasDropdown ? (
                  <div 
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(route.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className="text-[#11023f] font-poppins font-semibold text-base hover:text-[#00a0e8] transition-colors flex items-center"
                      onClick={() => trackEvent({
                        eventType: 'click',
                        eventCategory: 'Navigation',
                        eventAction: 'Dropdown Toggle',
                        eventLabel: route.name,
                        pageUrl: window.location.href,
                        referrer: document.referrer || '',
                        additionalData: { menu_type: 'desktop', dropdown: true }
                      })}
                    >
                      {route.name}
                      <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {activeDropdown === route.name && (
                      <div 
                        className="absolute top-full left-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                        onMouseEnter={() => setActiveDropdown(route.name)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <div className="py-2">
                          {route.dropdownItems?.map((item, index) => (
                            <Link
                              key={index}
                              href={item.href}
                              onClick={() => {
                                setActiveDropdown(null)
                                trackEvent({
                                  eventType: 'click',
                                  eventCategory: 'Navigation',
                                  eventAction: 'Dropdown Item Click',
                                  eventLabel: item.name,
                                  pageUrl: window.location.href,
                                  referrer: document.referrer || '',
                                  additionalData: { menu_type: 'desktop', parent_menu: route.name }
                                })
                              }}
                              className="block px-4 py-2 text-[#11023f] font-poppins hover:bg-gray-50 hover:text-[#00a0e8] transition-colors"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : route.isExternal ? (
                  <a
                    href={route.href}
                    onClick={() => trackEvent({
                      eventType: 'click',
                      eventCategory: 'Navigation',
                      eventAction: 'Menu Click',
                      eventLabel: route.name,
                      pageUrl: window.location.href,
                      referrer: document.referrer || '',
                      additionalData: { menu_type: 'desktop', link_type: 'external' }
                    })}
                    className="text-[#11023f] font-poppins font-semibold text-base hover:text-[#00a0e8] transition-colors"
                  >
                    {route.name}
                  </a>
                ) : (
                  <Link
                    href={route.href}
                    onClick={() => trackEvent({
                      eventType: 'click',
                      eventCategory: 'Navigation',
                      eventAction: 'Menu Click',
                      eventLabel: route.name,
                      pageUrl: window.location.href,
                      referrer: document.referrer || '',
                      additionalData: { menu_type: 'desktop', link_type: 'internal' }
                    })}
                    className="text-[#11023f] font-poppins font-semibold text-base hover:text-[#00a0e8] transition-colors"
                  >
                    {route.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link 
              href="/preinscription"
              onClick={() => trackEvent({
                eventType: 'click',
                eventCategory: 'Navigation',
                eventAction: 'CTA Click',
                eventLabel: 'Pré-Inscription',
                pageUrl: window.location.href,
                referrer: document.referrer || '',
                additionalData: { menu_type: 'desktop', button_type: 'primary' }
              })}
            >
              <button className="bg-white border-2 border-[#00a0e8] text-[#00a0e8] font-poppins font-bold px-6 py-2.5 rounded-full hover:bg-[#00a0e8] hover:text-white transition-all duration-300">
                Pré-Inscription
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen)
                setActiveDropdown(null) // Close any open dropdowns
                trackEvent({
                  eventType: 'click',
                  eventCategory: 'Navigation',
                  eventAction: 'Mobile Menu Toggle',
                  eventLabel: isMenuOpen ? 'Close' : 'Open',
                  pageUrl: window.location.href,
                  referrer: document.referrer || '',
                  additionalData: { menu_type: 'mobile' }
                })
              }}
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
                <div key={route.name}>
                  {route.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === route.name ? null : route.name)}
                        className="w-full flex items-center justify-between px-3 py-2 text-[#11023f] font-poppins font-semibold hover:text-[#00a0e8]"
                      >
                        {route.name}
                        <svg 
                          className={`h-4 w-4 transition-transform ${activeDropdown === route.name ? 'rotate-180' : ''}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      {activeDropdown === route.name && (
                        <div className="pl-6 space-y-1">
                          {route.dropdownItems?.map((item, index) => (
                            <Link
                              key={index}
                              href={item.href}
                              onClick={() => {
                                setIsMenuOpen(false)
                                setActiveDropdown(null)
                                trackEvent({
                                  eventType: 'click',
                                  eventCategory: 'Navigation',
                                  eventAction: 'Dropdown Item Click',
                                  eventLabel: item.name,
                                  pageUrl: window.location.href,
                                  referrer: document.referrer || '',
                                  additionalData: { menu_type: 'mobile', parent_menu: route.name }
                                })
                              }}
                              className="block px-3 py-2 text-gray-600 font-poppins hover:text-[#00a0e8]"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : route.isExternal ? (
                    <a
                      href={route.href}
                      onClick={() => {
                        setIsMenuOpen(false)
                        trackEvent({
                          eventType: 'click',
                          eventCategory: 'Navigation',
                          eventAction: 'Menu Click',
                          eventLabel: route.name,
                          pageUrl: window.location.href,
                          referrer: document.referrer || '',
                          additionalData: { menu_type: 'mobile', link_type: 'external' }
                        })
                      }}
                      className="block px-3 py-2 text-[#11023f] font-poppins font-semibold hover:text-[#00a0e8]"
                    >
                      {route.name}
                    </a>
                  ) : (
                    <Link
                      href={route.href}
                      onClick={() => {
                        setIsMenuOpen(false)
                        trackEvent({
                          eventType: 'click',
                          eventCategory: 'Navigation',
                          eventAction: 'Menu Click',
                          eventLabel: route.name,
                          pageUrl: window.location.href,
                          referrer: document.referrer || '',
                          additionalData: { menu_type: 'mobile', link_type: 'internal' }
                        })
                      }}
                      className="block px-3 py-2 text-[#11023f] font-poppins font-semibold hover:text-[#00a0e8]"
                    >
                      {route.name}
                    </Link>
                  )}
                </div>
              ))}
              <Link 
                href="/preinscription"
                onClick={() => {
                  setIsMenuOpen(false)
                  trackEvent({
                    eventType: 'click',
                    eventCategory: 'Navigation',
                    eventAction: 'CTA Click',
                    eventLabel: 'Pré-Inscription',
                    pageUrl: window.location.href,
                    referrer: document.referrer || '',
                    additionalData: { menu_type: 'mobile', button_type: 'primary' }
                  })
                }}
              >
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
