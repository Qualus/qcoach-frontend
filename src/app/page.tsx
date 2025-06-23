import { UserStatusDebug } from '@/components/user/user-status-debug'
import LoginPage from './(auth)/login/page'

export default function Home() {
  return (
    <main className="min-h-screen bg-primary-50">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-12 text-primary-900">QCoach</h1>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary-800">Debug Info</h2>
          <UserStatusDebug />
        </div>
        <LoginPage />
      </div>
    </main>
  )
}
