interface AuthTokens {
  jwtToken?: string;
  refreshToken?: string;
}

const TOKEN_STORAGE_KEY = 'qcoach_auth_tokens';

export const getAuthTokens = (): AuthTokens | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(TOKEN_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const setAuthTokens = (tokens: AuthTokens): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
};

export const clearAuthTokens = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

export const isTokenValid = (tokens: AuthTokens | null): boolean => {
  return !!(tokens?.jwtToken);
};
