/**
 * API Configuration
 * Centralized configuration for API endpoints
 */

const getApiBase = () => {
  // In production, since we're running on the same server and nginx proxies API calls,
  // we should use localhost to communicate with the backend directly
  if (process.env.NODE_ENV === 'production') {
    return 'http://localhost:5000/api'
  }
  
  // In development, also use localhost
  return 'http://localhost:5000/api'
}

export const API_CONFIG = {
  BASE_URL: getApiBase(),
  TIMEOUT: 30000, // 30 seconds
  RETRIES: 3
} as const

export default API_CONFIG