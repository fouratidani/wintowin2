'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { trackEvent } from '@/lib/cookie-consent'

interface AdminLayoutProps {
  children: React.ReactNode
}

interface User {
  id: number
  email: string
  role: string
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  
  // Auto-detect current tab from pathname
  const getCurrentTab = () => {
    if (!pathname) return 'dashboard'
    if (pathname.includes('/admin/content')) return 'content'
    if (pathname.includes('/admin/analytics')) return 'analytics'
    if (pathname.includes('/admin/preinscriptions')) return 'preinscriptions'
    if (pathname.includes('/admin/newsletter')) return 'newsletter'
    if (pathname.includes('/admin/privacy')) return 'privacy'
    if (pathname.includes('/admin/system')) return 'system'
    return 'dashboard'
  }
  
  const activeTab = getCurrentTab()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }

    // Verify token and get user info
    // This would normally make an API call to verify the token
    try {
      const userData = JSON.parse(localStorage.getItem('admin_user') || '{}')
      setUser(userData)
    } catch (error) {
      console.error('Error loading user data:', error)
      router.push('/admin/login')
      return
    }

    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    
    trackEvent({
      eventType: 'admin_action',
      eventCategory: 'Authentication',
      eventAction: 'Logout',
      eventLabel: 'Admin Logout',
      pageUrl: window.location.href,
      referrer: document.referrer || ''
    })
    
    router.push('/admin/login')
  }

  const navigation = [
    {
      name: 'Tableau de Bord',
      href: '/admin/dashboard',
      key: 'dashboard',
      icon: '📊'
    },
    {
      name: 'Contenu',
      href: '/admin/content',
      key: 'content',
      icon: '📝'
    },
    {
      name: 'Analytiques',
      href: '/admin/analytics',
      key: 'analytics',
      icon: '📈'
    },
    {
      name: 'Pré-inscriptions',
      href: '/admin/preinscriptions',
      key: 'preinscriptions',
      icon: '👥'
    },
    {
      name: 'Newsletter',
      href: '/admin/newsletter',
      key: 'newsletter',
      icon: '📧'
    },
    {
      name: 'Confidentialité',
      href: '/admin/privacy',
      key: 'privacy',
      icon: '🔒'
    },
    {
      name: 'Système',
      href: '/admin/system',
      key: 'system',
      icon: '⚙️'
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00a0e8]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-[#11023f] text-white transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <h1 className="text-xl font-bold">Win2Win Admin</h1>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isSidebarOpen ? '←' : '→'}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => trackEvent({
                  eventType: 'admin_navigation',
                  eventCategory: 'Admin',
                  eventAction: 'Menu Click',
                  eventLabel: item.name,
                  pageUrl: window.location.href,
                  referrer: document.referrer || ''
                })}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  activeTab === item.key
                    ? 'bg-[#00a0e8] text-white'
                    : 'hover:bg-white/10 text-gray-300'
                }`}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                {isSidebarOpen && (
                  <span className="font-medium">{item.name}</span>
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-white/10">
          {isSidebarOpen ? (
            <div className="space-y-3">
              <div className="text-sm">
                <div className="text-gray-300">Connecté en tant que:</div>
                <div className="font-medium">{user?.email}</div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full p-2 rounded-lg hover:bg-red-600 transition-colors"
              title="Déconnexion"
            >
              🚪
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {navigation.find(nav => nav.key === activeTab)?.name || 'Admin'}
              </h2>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <Link
                  href="/"
                  target="_blank"
                  className="bg-[#00a0e8] hover:bg-[#0080c7] text-white px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  Voir le site →
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}