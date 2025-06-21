import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { getAuthTokens, clearAuthTokens } from '@/lib/auth/tokens'

export function useAuth() {
  const { user, tokens, setAuth, clearAuth } = useAuthStore()
  const router = useRouter()

  // Ripristina auth state da localStorage al mount
  useEffect(() => {
    const savedTokens = getAuthTokens()
    if (savedTokens?.jwtToken) {
      setAuth(savedTokens)
    }
  }, [setAuth])

  const logout = () => {
    clearAuthTokens()
    clearAuth()
    router.push('/login')
  }

  return {
    user,
    tokens,
    isAuthenticated: !!(tokens?.jwtToken || user),
    isCoach: user?.role === 'COACH', // Usa i ruoli del tuo backend
    isClient: user?.role === 'CLIENT',
    logout,
  }
}
