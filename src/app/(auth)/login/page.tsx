import { LoginForm } from '@/components/forms/login-form'

export default function Home() {
  return (
    <main className="min-h-screen bg-primary-50">
      <div className="container mx-auto py-12">
        <LoginForm />
      </div>
    </main>
  )
}
