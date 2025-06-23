import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { getAuthTokens, clearAuthTokens } from '@/lib/auth/tokens'

export function useAuth() {
  const { tokens, role, setAuth, clearAuth } = useAuthStore()
  const router = useRouter()

  // Restore auth state from localStorage on mount
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
    tokens,
    role,
    isAuthenticated: !!tokens?.jwtToken,
    isCoach: role === 'COACH',
    isCustomer: role === 'CUSTOMER',
    logout,
  }
}
