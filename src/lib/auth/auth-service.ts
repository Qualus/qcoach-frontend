import { getAuthTokens, setAuthTokens, clearAuthTokens } from './tokens'
import type { JwtResponseDTO } from '../api/generated'

export class AuthService {
  
  async refreshUserToken(): Promise<JwtResponseDTO | null> {
    const tokens = getAuthTokens()
    
    if (!tokens?.refreshToken) {
      return null
    }

    try {
      // Dynamic import to avoid circular dependency at module load time
      const { refreshToken } = await import('../api/generated')
      
      const refreshResponse = await refreshToken({
        jwtToken: tokens.jwtToken,
        refreshToken: tokens.refreshToken
      })

      if (refreshResponse.jwtToken) {
        setAuthTokens(refreshResponse)
        return refreshResponse
      }
      
      return null
    } catch (error) {
      // Clear tokens on refresh failure
      clearAuthTokens()
      return null
    }
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const now = Date.now() / 1000
      return payload.exp < now
    } catch {
      return true
    }
  }

  shouldRefresh(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const now = Date.now() / 1000
      // Refresh if less than 5 minutes remaining
      return payload.exp - now < 300
    } catch {
      return false
    }
  }
}

export const authService = new AuthService()
