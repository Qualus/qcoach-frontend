"use client"

import type React from "react"

import { Plus, Calendar, Users, MessageSquare, Video, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface Action {
  id: string
  label: string
  icon: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary"
}

interface QuickActionsProps {
  actions?: Action[]
  layout?: "grid" | "list"
  className?: string
}

const defaultActions: Action[] = [
  {
    id: "new-session",
    label: "Nuova Sessione",
    icon: <Plus className="w-5 h-5" />,
    variant: "primary",
  },
  {
    id: "schedule",
    label: "Pianifica",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    id: "add-client",
    label: "Aggiungi Cliente",
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: "send-message",
    label: "Invia Messaggio",
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    id: "video-call",
    label: "Video Call",
    icon: <Video className="w-5 h-5" />,
  },
  {
    id: "create-plan",
    label: "Crea Piano",
    icon: <FileText className="w-5 h-5" />,
  },
]

export const QuickActions = ({ actions = defaultActions, layout = "grid", className }: QuickActionsProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold text-primary-900">Azioni Rapide</h3>

      <div className={cn(layout === "grid" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3" : "space-y-2")}>
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className={cn(
              "flex items-center gap-3 p-4 rounded-lg transition-all duration-200",
              "hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent-500",
              layout === "grid" && "flex-col text-center",
              action.variant === "primary"
                ? "bg-accent-600 text-white hover:bg-accent-700"
                : "bg-white border border-primary-200 text-primary-700 hover:bg-primary-50",
            )}
          >
            <div className={cn("flex-shrink-0", layout === "grid" && "mb-2")}>{action.icon}</div>
            <span className="font-medium text-sm">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
