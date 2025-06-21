'use client'

import { useLogin } from '@/lib/api/generated'
import { setAuthTokens } from '@/lib/auth/tokens'
import { useAuthStore } from '@/store/auth-store'

export const LoginTest = () => {
  const { user, setAuth } = useAuthStore()
  
  const loginMutation = useLogin({
    mutation: {
      onSuccess: (data) => {
        console.log('Login success:', data)
        setAuthTokens(data)
        setAuth(data)
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
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Authentication Test</h2>
      
      <div className="space-y-4">
        <button 
          onClick={handleLogin} 
          disabled={loginMutation.isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium px-4 py-3 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
        >
          {loginMutation.isPending ? 'Loading...' : 'Test Login'}
        </button>

        {loginMutation.isError && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            <p className="font-medium">Error occurred during login</p>
          </div>
        )}
        
        {loginMutation.isSuccess && (
          <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            <p className="font-medium">Login successful!</p>
          </div>
        )}

        {user && (
          <div className="p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg">
            <p className="font-medium">Logged in as: <span className="font-bold">{user.role}</span></p>
          </div>
        )}
      </div>

      <div className="mt-8 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
        <p className="font-medium mb-1">Testing login with:</p>
        <p>Email: secondoCoach@email.it</p>
        <p>Password: test123</p>
      </div>
    </div>
  )
}
