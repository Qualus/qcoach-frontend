import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav'
import { TopHeader } from '@/components/layout/top-header'

export default function TestMobile() {
  const mockUser = {
    name: "Cliente Mario",
    role: "client"
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <TopHeader user={mockUser} showMobileMenuToggle />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">📱 Mobile Layout Test</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Mobile Layout (Cliente)</h2>
          <ul className="space-y-2 text-gray-600">
            <li>✅ TopHeader: Header mobile</li>
            <li>✅ MobileBottomNav: Navigation bottom</li>
            <li>✅ Content area with padding for bottom nav</li>
          </ul>
        </div>
      </main>
      <MobileBottomNav />
    </div>
  )
}
