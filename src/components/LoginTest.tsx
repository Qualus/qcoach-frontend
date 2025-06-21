'use client'

import { useLogin } from '@/lib/api/generated'
import { setAuthTokens } from '@/lib/auth/tokens'
import { useAuthStore } from '@/store/auth-store'
import { useRouter, useSearchParams } from 'next/navigation'

export const LoginTest = () => {
  const { setAuth } = useAuthStore()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/dashboard'
  
  const loginMutation = useLogin({
    mutation: {
      onSuccess: (data) => {
        console.log('Login success:', data)
        setAuthTokens(data)
        setAuth(data)
        
        // Redirect dopo login
        router.push(redirectTo)
      },
      onError: (error) => {
        console.error('Login failed:', error)
      },
    },
  })

  const handleLogin = () => {
    loginMutation.mutate({
      data: {
        email: 'secondoCoach@email.it',
        password: 'test123',
      },
    })
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Login</h2>
      
      <button 
        onClick={handleLogin} 
        disabled={loginMutation.isPending}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium px-4 py-3 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
      >
        {loginMutation.isPending ? 'Loading...' : 'Login'}
      </button>

      {loginMutation.isError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          <p className="font-medium">Errore durante il login</p>
        </div>
      )}
    </div>
  )
}
