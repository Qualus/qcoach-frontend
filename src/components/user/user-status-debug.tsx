"use client"

import { RefreshCw } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useUserProfile } from '@/hooks/use-user-profile'

export const UserStatusDebug = () => {
  const auth = useAuth()
  const userProfile = useUserProfile()

  if (!auth.isAuthenticated) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-medium text-yellow-800">Authentication Status</h3>
        <p className="text-yellow-700">Not authenticated</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Auth Status */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-medium text-blue-800">Authentication Status</h3>
        <div className="text-sm text-blue-700 space-y-1">
          <p>Authenticated: {auth.isAuthenticated ? '✅' : '❌'}</p>
          <p>Role: {auth.role || 'No role'}</p>
          <p>Is Coach: {auth.isCoach ? '✅' : '❌'}</p>
          <p>Is Customer: {auth.isCustomer ? '✅' : '❌'}</p>
        </div>
      </div>

      {/* User Profile Status */}
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-green-800">User Profile Status</h3>
          <button
            onClick={() => userProfile.refetch()}
            disabled={userProfile.isLoading}
            className="flex items-center gap-1 px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${userProfile.isLoading ? 'animate-spin' : ''}`} />
            {userProfile.isLoading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
        <div className="text-sm text-green-700 space-y-1">
          <p>Status: <span className="font-mono">{userProfile.userStatus}</span></p>
          <p>Loading: {userProfile.isLoading ? '⏳' : '✅'}</p>
          <p>Email Verified: {userProfile.isEmailVerified ? '✅' : '❌'}</p>
          <p>Onboarding Completed: {userProfile.isOnboardingCompleted ? '✅' : '❌'}</p>
          <p>Is Active: {userProfile.isActive ? '✅' : '❌'}</p>
          <p>Needs Email Verification: {userProfile.needsEmailVerification ? '⚠️' : '✅'}</p>
          <p>Needs Onboarding: {userProfile.needsOnboarding ? '⚠️' : '✅'}</p>
          <p>Plan Type: {userProfile.planType || 'No plan'}</p>
        </div>
      </div>

      {/* Profile Data */}
      {userProfile.profile ? (
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-medium text-purple-800">Profile Data (Real Backend)</h3>
          <div className="text-sm text-purple-700 space-y-1">
            <p>Email: {userProfile.profile.email}</p>
            <p>First Name: {userProfile.profile.firstname || 'Not set'}</p>
            <p>Last Name: {userProfile.profile.lastname || 'Not set'}</p>
            <p>Full Name: {userProfile.fullName || 'No name'}</p>
            <p>Display Name: {userProfile.displayName}</p>
            <p>Role: {userProfile.profile.role || 'No role'}</p>
            <p>Backend Status: <span className="font-mono">{userProfile.profile.status || 'No status'}</span></p>
            <p>Plan Type: {userProfile.profile.planType || 'No plan'}</p>
            <p>Avatar URL: {userProfile.profile.profileImageUrl || 'No avatar'}</p>
          </div>
        </div>
      ) : null}

      {/* Error */}
      {userProfile.error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="font-medium text-red-800">Error</h3>
          <p className="text-sm text-red-700">
            {userProfile.error instanceof Error ? userProfile.error.message : 'Unknown error'}
          </p>
        </div>
      ) : null}
    </div>
  )
}
