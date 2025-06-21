"use client"

import { Bell, Search, Menu } from "lucide-react"
import { UserAvatar } from "../user/user-avatar"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  isOnline?: boolean
}

interface HeaderProps {
  user?: User
  showNotifications?: boolean
  onMenuClick?: () => void
  notificationCount?: number
}

export const TopHeader = ({ user, showNotifications = true, onMenuClick, notificationCount = 0 }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-primary-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-primary-100 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden md:flex items-center gap-2 bg-primary-50 rounded-lg px-3 py-2 min-w-[300px]">
            <Search className="w-4 h-4 text-primary-400" />
            <input
              type="text"
              placeholder="Cerca clienti, sessioni..."
              className="bg-transparent border-none outline-none text-sm flex-1 placeholder:text-primary-400"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {showNotifications && (
            <button className="relative p-2 rounded-lg hover:bg-primary-100 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500">
              <Bell className="w-5 h-5 text-primary-600" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </button>
          )}

          {user && (
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-primary-900">{user.name}</p>
                <p className="text-xs text-primary-500">{user.email}</p>
              </div>
              <UserAvatar user={user} size="md" showStatus />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
