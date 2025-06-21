import { LoginTest } from '@/components/LoginTest'

export default function Home() {
  return (
    <main className="min-h-screen bg-primary-50">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-12 text-primary-900">QCoach Development</h1>
        <LoginTest />
      </div>
    </main>
  )
}
