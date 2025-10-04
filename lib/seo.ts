import { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  jsonLd?: object
  robots?: string
  alternates?: {
    canonical?: string
    languages?: Record<string, string>
  }
}

const defaultSEO: SEOConfig = {
  title: 'Win2Win - Formation Professionnelle & Ausbildung en Allemagne',
  description: 'Win2Win vous accompagne dans votre apprentissage de l\'allemand et de l\'italien pour réussir votre Ausbildung en Allemagne. Formations professionnelles adaptées à vos besoins.',
  keywords: [
    'formation allemand',
    'ausbildung allemagne',
    'formation professionnelle',
    'apprentissage langue',
    'win2win',
    'formation italien',
    'coaching carrière',
    'emploi allemagne',
    'certification linguistique',
    'formation continue'
  ],
  ogImage: '/images/logo.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  robots: 'index, follow'
}

export const SITE_CONFIG = {
  name: 'Win2Win',
  domain: 'https://winstowin.com',
  description: 'Formation professionnelle et accompagnement pour réussir votre Ausbildung en Allemagne',
  author: 'Win2Win',
  email: 'contact@winstowin.com',
  phone: '+216 50 366 499',
  address: {
    street: '97 Avenue de la liberté',
    city: 'Tunis',
    country: 'Tunisie',
    postalCode: '1002',
    coordinates: {
      lat: 36.8065,
      lng: 10.1815
    }
  },
  social: {
    facebook: 'https://facebook.com/wintowin',
    linkedin: 'https://linkedin.com/company/wintowin',
    twitter: 'https://twitter.com/wintowin'
  }
}

export function generateSEO(config: Partial<SEOConfig> = {}): Metadata {
  const seo = { ...defaultSEO, ...config }
  
  const metadata: Metadata = {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords?.join(', '),
    robots: seo.robots,
    
    // Open Graph
    openGraph: {
      type: seo.ogType as any,
      title: seo.title,
      description: seo.description,
      url: seo.canonical || SITE_CONFIG.domain,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: seo.ogImage || '/images/logo.png',
          width: 1200,
          height: 630,
          alt: seo.title,
        }
      ],
      locale: 'fr_FR',
    },
    
    // Twitter
    twitter: {
      card: seo.twitterCard as any,
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage || '/images/logo.png'],
      creator: '@wintowin',
      site: '@wintowin',
    },
    
    // Alternates
    alternates: {
      canonical: seo.canonical || SITE_CONFIG.domain,
      ...seo.alternates
    },
    
    // Additional metadata
    authors: [{ name: SITE_CONFIG.author }],
    creator: SITE_CONFIG.author,
    publisher: SITE_CONFIG.author,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    
    // Verification (add your verification codes here)
    verification: {
      google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },
    
    // App-specific
    category: 'Education',
    classification: 'Education, Training, Professional Development',
    
    // Icons
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180' }
      ],
      other: [
        { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#00a0e8' }
      ]
    },
    
    // Manifest
    manifest: '/site.webmanifest',
  }
  
  return metadata
}

// JSON-LD structured data generators
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.domain,
    logo: `${SITE_CONFIG.domain}/images/logo.png`,
    description: SITE_CONFIG.description,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressCountry: SITE_CONFIG.address.country,
      postalCode: SITE_CONFIG.address.postalCode
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.address.coordinates.lat,
      longitude: SITE_CONFIG.address.coordinates.lng
    },
    sameAs: Object.values(SITE_CONFIG.social),
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Formation Allemand Professionnel',
        description: 'Certification en langue allemande pour professionnels'
      }
    ],
    openingHours: 'Mo-Fr 08:00-17:30, Sa 08:00-12:00',
    priceRange: '$$'
  }
}

export function generateCourseSchema(course: {
  name: string
  description: string
  duration: string
  level: string
  category: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.domain
    },
    teaches: course.category,
    educationalLevel: course.level,
    timeRequired: course.duration,
    url: course.url,
    courseMode: ['online', 'blended'],
    inLanguage: 'fr',
    availableLanguage: ['fr', 'de', 'it']
  }
}

export function generateArticleSchema(article: {
  title: string
  description: string
  publishDate: string
  author: string
  url: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Organization',
      name: article.author || SITE_CONFIG.name
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.domain}/images/logo.png`
      }
    },
    datePublished: article.publishDate,
    dateModified: article.publishDate,
    url: article.url,
    image: article.image ? `${SITE_CONFIG.domain}${article.image}` : `${SITE_CONFIG.domain}/images/logo.png`,
    mainEntityOfPage: article.url,
    inLanguage: 'fr'
  }
}

export function generateWebPageSchema(page: {
  title: string
  description: string
  url: string
  breadcrumbs?: Array<{ name: string; url: string }>
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: page.url,
    inLanguage: 'fr',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.domain
    }
  }
  
  if (page.breadcrumbs && page.breadcrumbs.length > 0) {
    schema.breadcrumb = {
      '@type': 'BreadcrumbList',
      itemListElement: page.breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${SITE_CONFIG.domain}${crumb.url}`
      }))
    }
  }
  
  return schema
}