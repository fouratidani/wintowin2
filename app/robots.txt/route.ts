import { NextResponse } from 'next/server'

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Disallow admin pages
Disallow: /admin/
Disallow: /api/

# Allow important pages
Allow: /
Allow: /about
Allow: /services
Allow: /formations
Allow: /news
Allow: /preinscription
Allow: /privacy-policy

# Crawl-delay
Crawl-delay: 1

# Sitemap location
Sitemap: https://winstowin.com/sitemap.xml`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}