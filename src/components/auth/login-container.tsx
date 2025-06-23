"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { LoginForm } from '@/components/forms/login-form'
import { useLogin } from '@/lib/api/generated'
import { setAuthTokens } from '@/lib/auth/tokens'
import { useAuthStore } from '@/store/auth-store'

interface LoginContainerProps {
  redirectTo?: string
  onSuccess?: () => void
  onError?: (error: string) => void
}

export const LoginContainer = ({ redirectTo, onSuccess, onError }: LoginContainerProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultRedirectTo = searchParams.get('redirect') || '/dashboard'
  const finalRedirectTo = redirectTo || defaultRedirectTo
  const { setAuth } = useAuthStore()

  const loginMutation = useLogin({
    mutation: {
      onSuccess: (data) => {
        console.log('Login success:', data)

        // Store tokens in localStorage
        setAuthTokens(data)

        // Update auth store
        setAuth(data)

        // Call custom success handler if provided
        if (onSuccess) {
          onSuccess()
        } else {
          // Default behavior: redirect
          router.push(finalRedirectTo)
        }
      },
      onError: (error) => {
        console.error('Login failed:', error)

        // Parse error message from API response
        let errorMessage = 'Login failed. Please try again.'

        if (error && typeof error === 'object' && 'response' in error) {
          const response = (error as { response?: { status?: number; data?: { message?: string } } }).response
          if (response?.status === 401) {
            errorMessage = 'Invalid email or password.'
          } else if (response?.status === 403) {
            errorMessage = 'Account access denied. Please contact support.'
          } else if (response?.data?.message) {
            errorMessage = response.data.message
          }
        }

        // Call custom error handler if provided
        if (onError) {
          onError(errorMessage)
        }
      },
    },
  })

  const handleLogin = (email: string, password: string) => {
    loginMutation.mutate({
      data: {
        email,
        password,
      },
    })
  }

  return (
    <LoginForm
      onSubmit={handleLogin}
      loading={loginMutation.isPending}
      error={loginMutation.isError ? 'Login failed. Please check your credentials.' : undefined}
    />
  )
}
