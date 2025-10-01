'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView } from '@/lib/cookie-consent'

export default function PageViewTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view on route change
    if (typeof window !== 'undefined' && pathname) {
      trackPageView(pathname)
    }
  }, [pathname])

  // This component renders nothing
  return null
}