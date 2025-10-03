/**
 * API Configuration
 * Centralized configuration for API endpoints
 * Following DRY principle - single source of truth for API settings
 */
export const API_CONFIG = {
  baseUrl: 'http://localhost:8000',
  apiPrefix: '/api/v1',
  endpoints: {
    users: '/users',
    tasks: '/tasks',
  },
} as const;

/**
 * Helper function to build full API URL
 */
export function getApiUrl(endpoint: string): string {
  return `${API_CONFIG.baseUrl}${API_CONFIG.apiPrefix}${endpoint}`;
}

