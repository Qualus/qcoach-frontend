"use client"

import { useState } from "react"
import {
  Home,
  Users,
  Calendar,
  MessageSquare,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isCollapsed?: boolean
  onToggle?: () => void
  activeItem?: string
  onItemClick?: (item: string) => void
}

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "clients", label: "Clienti", icon: Users },
  { id: "calendar", label: "Calendario", icon: Calendar },
  { id: "messages", label: "Messaggi", icon: MessageSquare },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Impostazioni", icon: Settings },
]

export const DesktopSidebar = ({
  isCollapsed = false,
  onToggle,
  activeItem = "dashboard",
  onItemClick,
}: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(isCollapsed)

  const handleToggle = () => {
    setCollapsed(!collapsed)
    onToggle?.()
  }

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full bg-primary-950 text-white transition-all duration-300 z-50",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-primary-800">
        {!collapsed && <h1 className="text-xl font-bold">CoachPro</h1>}
        <button onClick={handleToggle} className="p-1 rounded-lg hover:bg-primary-800 transition-colors">
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id

            return (
              <li key={item.id}>
                <button
                  onClick={() => onItemClick?.(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    "hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-accent-500",
                    isActive && "bg-accent-600 text-white",
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span className="font-medium">{item.label}</span>}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-primary-800">
        <button
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
            "hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-accent-500",
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium">Esci</span>}
        </button>
      </div>
    </div>
  )
}
