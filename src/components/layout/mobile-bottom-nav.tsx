"use client"

import { Home, Users, Calendar, MessageSquare, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "clients", label: "Clienti", icon: Users },
  { id: "calendar", label: "Calendario", icon: Calendar },
  { id: "messages", label: "Chat", icon: MessageSquare },
  { id: "profile", label: "Profilo", icon: User },
]

export const MobileBottomNav = ({ activeTab = "home", onTabChange }: BottomNavProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-primary-200 z-50">
      <nav className="flex">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => onTabChange?.(item.id)}
              className={cn(
                "flex-1 flex flex-col items-center py-2 px-1 transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-accent-500",
                isActive ? "text-accent-600" : "text-primary-500 hover:text-primary-700",
              )}
            >
              <Icon className={cn("w-6 h-6 mb-1", isActive && "text-accent-600")} />
              <span className={cn("text-xs font-medium", isActive && "text-accent-600")}>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
