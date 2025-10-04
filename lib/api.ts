// API utilities for frontend-backend communication

const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://winstowin.com/api' 
  : 'https://winstowin.com/api';

// Generic API request function
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    // Handle backend response format that has { success, data, message }
    if (data.success === false) {
      throw new Error(data.message || 'API request failed');
    }
    
    // Return the data property if it exists, otherwise return the full response
    return data.data || data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Carousel API functions - Frontend only reads data
export const formationsApi = {
  getAll: async () => {
    return apiRequest('/api/formations')
  }
}

export const carouselApi = {
  getAll: () => apiRequest('/carousel/active'), // Use active endpoint for public view
  getById: (id: string) => apiRequest(`/carousel/${id}`),
};

// News API functions - Frontend only reads data
export const newsApi = {
  getAll: () => apiRequest('/news'),
  getById: (id: string) => apiRequest(`/news/${id}`),
};

// Pre-inscription API functions - Frontend only submits forms
export const preinscriptionApi = {
  submit: (data: any) => apiRequest('/preinscription', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// Newsletter API functions - Frontend only subscribes
export const newsletterApi = {
  subscribe: (email: string) => apiRequest('/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  }),
};

// Types for better TypeScript support
export interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image?: string | null;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
  order: number;
  createdAt: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  isPublished: boolean;
  publishDate: string;
  readTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface PreinscriptionData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  entreprise: string; // Required by backend
  poste: string; // Required by backend
  secteur: string; // Required by backend
  formationType: string;
  domaine: string;
  niveau: string; // Required by backend
  objectifs?: string;
  source: string; // Required by backend
  newsletter: boolean;
}