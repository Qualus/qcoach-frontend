export const config = {
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '/backend/api',
    backendDirectUrl: process.env.NEXT_PUBLIC_BACKEND_DIRECT_URL || 'http://localhost:8080',
    debugEnabled: process.env.NEXT_PUBLIC_DEBUG_API === 'true',
  },
  
  tenant: {
    domain: process.env.NEXT_PUBLIC_DOMAIN || 'localhost',
    prodDomain: process.env.NEXT_PUBLIC_PROD_DOMAIN || 'qcoach.it',
    defaultTenant: process.env.NEXT_PUBLIC_DEFAULT_TENANT || 'tenant1',
  },
  
  getCurrentTenant: () => {
    if (typeof window === 'undefined') return config.tenant.defaultTenant;
    
    const hostname = window.location.hostname;
    if (hostname.includes('localhost')) {
      return config.tenant.defaultTenant;
    }
    
    return hostname.split('.')[0];
  }
};
