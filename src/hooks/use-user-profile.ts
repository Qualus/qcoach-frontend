import { useAuth } from './use-auth'
import { useGetLoggedUserProfile, type UserProfileDTO } from '@/lib/api/generated'

// Re-export the backend type for convenience
export type UserProfile = UserProfileDTO

export type UserStatus =
  | 'loading'
  | 'pending_email_verification'
  | 'pending_onboarding'
  | 'active'
  | 'suspended'
  | 'error'

export function useUserProfile() {
  const { isAuthenticated, tokens } = useAuth()

  const {
    data: profile,
    isLoading,
    error,
    refetch
  } = useGetLoggedUserProfile({
    query: {
      enabled: isAuthenticated && !!tokens?.jwtToken,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: (failureCount, error) => {
        // Don't retry on auth errors
        if (error && typeof error === 'object' && 'response' in error) {
          const response = (error as { response?: { status?: number } }).response
          if (response?.status === 401 || response?.status === 403) {
            return false
          }
        }
        return failureCount < 2
      }
    }
  })

  // Determine user status based on profile data from backend
  const getUserStatus = (): UserStatus => {
    if (isLoading) return 'loading'
    if (error) return 'error'
    if (!profile) return 'error'

    // Map backend status to our internal status
    // Adjust these mappings based on your actual backend status values
    const backendStatus = profile.status?.toUpperCase()

    switch (backendStatus) {
      case 'PENDING_EMAIL_VERIFICATION':
      case 'PENDING_EMAIL':
        return 'pending_email_verification'
      case 'PENDING_ONBOARDING':
      case 'ONBOARDING':
        return 'pending_onboarding'
      case 'SUSPENDED':
      case 'BANNED':
        return 'suspended'
      case 'ACTIVE':
        return 'active'
      default:
        // If status is unknown, consider it as needing onboarding
        return 'pending_onboarding'
    }
  }

  const userStatus = getUserStatus()

  return {
    profile,
    userStatus,
    isLoading,
    error,
    refetch,
    // Convenience getters adapted to backend response
    isEmailVerified: userStatus !== 'pending_email_verification',
    isOnboardingCompleted: userStatus !== 'pending_onboarding',
    isActive: userStatus === 'active',
    needsEmailVerification: userStatus === 'pending_email_verification',
    needsOnboarding: userStatus === 'pending_onboarding',
    fullName: profile ? `${profile.firstname || ''} ${profile.lastname || ''}`.trim() : '',
    // Additional convenience getters based on backend fields
    displayName: profile?.firstname || profile?.email || 'User',
    avatarUrl: profile?.profileImageUrl,
    planType: profile?.planType,
  }
}
