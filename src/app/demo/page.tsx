"use client"

import { useState } from "react"
import { DesktopSidebar } from "@/components/layout/desktop-sidebar"
import { TopHeader } from "@/components/layout/top-header"
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav"
import { DashboardCard } from "@/components/dashboard/dashboard-card"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { MetricsOverview } from "@/components/dashboard/metrics-overview"
import { LoginForm } from "@/components/forms/login-form"
import { SearchInput } from "@/components/forms/search-input"
import { ProfileForm } from "@/components/forms/profile-form"
import { FileUpload } from "@/components/forms/file-upload"
import { UserAvatar } from "@/components/user/user-avatar"
import { UserCard } from "@/components/user/user-card"
import { ClientList } from "@/components/user/client-list"
import { ImageCarousel } from "@/components/media/image-carousel"
import { CalendarView } from "@/components/calendar/calendar-view"
import { Users, Calendar, TrendingUp, Clock, ImageIcon, User, Layout } from "lucide-react"

const mockUser = {
  id: "1",
  name: "Dr. Maria Rossi",
  email: "maria.rossi@coachpro.com",
  avatar: "/placeholder.svg?height=40&width=40",
  isOnline: true,
}

const mockImages = [
  { id: "1", src: "/placeholder.svg?height=300&width=400", alt: "Coaching Session 1" },
  { id: "2", src: "/placeholder.svg?height=300&width=400", alt: "Coaching Session 2" },
  { id: "3", src: "/placeholder.svg?height=300&width=400", alt: "Coaching Session 3" },
  { id: "4", src: "/placeholder.svg?height=300&width=400", alt: "Coaching Session 4" },
]

export default function DemoPage() {
  const [activeSection, setActiveSection] = useState("layout")

  const sections = [
    { id: "layout", label: "Layout & Navigation", icon: Layout },
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "forms", label: "Forms", icon: User },
    { id: "media", label: "Media", icon: ImageIcon },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "users", label: "User Components", icon: Users },
  ]

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Demo Navigation */}
      <div className="bg-white border-b border-primary-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-primary-900">CoachPro Component Library</h1>
            <div className="text-sm text-primary-600">Demo Showcase</div>
          </div>

          <nav className="flex gap-2 overflow-x-auto">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    activeSection === section.id
                      ? "bg-accent-600 text-white"
                      : "bg-primary-100 text-primary-700 hover:bg-primary-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Layout & Navigation Section */}
        {activeSection === "layout" && (
          <div className="space-y-12">
            <div>
              <h2 className="text-xl font-semibold text-primary-900 mb-6">Layout Components</h2>

              {/* Desktop Sidebar Demo */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-primary-800 mb-4">Desktop Sidebar</h3>
                <div className="bg-white rounded-lg border border-primary-200 p-6 overflow-hidden">
                  <div className="relative h-96 bg-primary-50 rounded-lg overflow-hidden">
                    <DesktopSidebar />
                    <div className="ml-64 p-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-primary-600">Main content area for coaches</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Header Demo */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-primary-800 mb-4">Top Header</h3>
                <div className="bg-white rounded-lg border border-primary-200 overflow-hidden">
                  <TopHeader user={mockUser} notificationCount={5} />
                </div>
              </div>

              {/* Mobile Bottom Nav Demo */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-primary-800 mb-4">Mobile Bottom Navigation</h3>
                <div className="bg-white rounded-lg border border-primary-200 p-6">
                  <div className="max-w-sm mx-auto relative">
                    <div className="bg-primary-50 rounded-lg h-64 p-4">
                      <p className="text-primary-600 text-center">Mobile app content</p>
                    </div>
                    <MobileBottomNav />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Section */}
        {activeSection === "dashboard" && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-primary-900">Dashboard Components</h2>

            <div className="grid gap-6">
              <div>
                <h3 className="text-lg font-medium text-primary-800 mb-4">Dashboard Cards</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <DashboardCard title="Clienti Totali" value={24} change={12} icon={<Users className="w-6 h-6" />} />
                  <DashboardCard
                    title="Sessioni Settimana"
                    value={18}
                    change={8}
                    icon={<Calendar className="w-6 h-6" />}
                  />
                  <DashboardCard
                    title="Fatturato"
                    value="€3,240"
                    change={15}
                    icon={<TrendingUp className="w-6 h-6" />}
                    variant="accent"
                  />
                  <DashboardCard title="Durata Media" value="45min" icon={<Clock className="w-6 h-6" />} />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-primary-800 mb-4">Metrics Overview</h3>
                <MetricsOverview />
              </div>

              <div>
                <h3 className="text-lg font-medium text-primary-800 mb-4">Quick Actions</h3>
                <QuickActions />
              </div>
            </div>
          </div>
        )}

        {/* Forms Section */}
        {activeSection === "forms" && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-primary-900">Form Components</h2>

            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium text-primary-800 mb-4">Login Form</h3>
                <LoginForm />
              </div>

              <div>
                <h3 className="text-lg font-medium text-primary-800 mb-4">Profile Form</h3>
                <ProfileForm />
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium text-primary-800 mb-4">Search Input</h3>
                <SearchInput
                  placeholder="Cerca clienti, sessioni..."
                  suggestions={["Marco Rossi", "Laura Bianchi", "Giuseppe Verdi", "Anna Neri"]}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium text-primary-800 mb-4">File Upload</h3>
                <FileUpload />
              </div>
            </div>
          </div>
        )}

        {/* Media Section */}
        {activeSection === "media" && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-primary-900">Media Components</h2>

            <div>
              <h3 className="text-lg font-medium text-primary-800 mb-4">Image Carousel</h3>
              <div className="max-w-2xl">
                <ImageCarousel images={mockImages} />
              </div>
            </div>
          </div>
        )}

        {/* Calendar Section */}
        {activeSection === "calendar" && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-primary-900">Calendar Components</h2>

            <div>
              <h3 className="text-lg font-medium text-primary-800 mb-4">Calendar View</h3>
              <CalendarView />
            </div>
          </div>
        )}

        {/* Users Section */}
        {activeSection === "users" && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-primary-900">User Components</h2>

            <div className="grid gap-8">
              <div>
                <h3 className="text-lg font-medium text-primary-800 mb-4">User Avatars</h3>
                <div className="flex items-center gap-4">
                  <UserAvatar user={mockUser} size="sm" showStatus />
                  <UserAvatar user={mockUser} size="md" showStatus />
                  <UserAvatar user={mockUser} size="lg" showStatus />
                  <UserAvatar user={mockUser} size="xl" showStatus />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-primary-800 mb-4">User Cards</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <UserCard user={mockUser} variant="compact" />
                  <UserCard user={{ ...mockUser, role: "Executive Coach", joinDate: "2024-01-15" }} />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-primary-800 mb-4">Client List</h3>
                <ClientList variant="compact" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
