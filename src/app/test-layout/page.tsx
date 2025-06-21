import { DesktopSidebar } from '@/components/layout/desktop-sidebar'
import { TopHeader } from '@/components/layout/top-header'

export default function TestLayout() {
  const mockUser = {
    name: "Coach Marco",
    avatar: "https://via.placeholder.com/40",
    role: "coach"
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DesktopSidebar />
      <div className="flex-1 ml-64">
        <TopHeader user={mockUser} showNotifications />
        <main className="p-8">
          <h1 className="text-3xl font-bold mb-4">🎉 Layout Test Success!</h1>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Desktop Layout (Coach)</h2>
            <ul className="space-y-2 text-gray-600">
              <li>✅ DesktopSidebar: Sidebar per coach</li>
              <li>✅ TopHeader: Header con user profile</li>
              <li>✅ Main content area</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  )
}
