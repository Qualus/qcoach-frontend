"use client"

import { Mail, Phone, MapPin, MoreVertical } from "lucide-react"
import { UserAvatar } from "./user-avatar"
import { cn } from "@/lib/utils"

interface User {
  id: string
  name: string
  email: string
  phone?: string
  location?: string
  avatar?: string
  isOnline?: boolean
  role?: string
  joinDate?: string
}

interface UserCardProps {
  user: User
  variant?: "compact" | "detailed"
  showStatus?: boolean
  onClick?: () => void
  onMenuClick?: () => void
  className?: string
}

export const UserCard = ({
  user,
  variant = "detailed",
  showStatus = true,
  onClick,
  onMenuClick,
  className,
}: UserCardProps) => {
  if (variant === "compact") {
    return (
      <div
        className={cn(
          "bg-white rounded-lg border border-primary-200 p-4 transition-all duration-200",
          "hover:shadow-md hover:-translate-y-0.5",
          onClick && "cursor-pointer",
          className,
        )}
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          <UserAvatar user={user} size="md" showStatus={showStatus} />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-primary-900 truncate">{user.name}</h3>
            <p className="text-sm text-primary-500 truncate">{user.email}</p>
          </div>
          {onMenuClick && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onMenuClick()
              }}
              className="p-1 rounded-lg hover:bg-primary-100 transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-primary-400" />
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-primary-200 p-6 transition-all duration-200",
        "hover:shadow-md hover:-translate-y-0.5",
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <UserAvatar user={user} size="lg" showStatus={showStatus} />
          <div>
            <h3 className="text-lg font-semibold text-primary-900">{user.name}</h3>
            {user.role && <p className="text-sm text-accent-600 font-medium">{user.role}</p>}
          </div>
        </div>
        {onMenuClick && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMenuClick()
            }}
            className="p-2 rounded-lg hover:bg-primary-100 transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-primary-400" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-primary-600">
          <Mail className="w-4 h-4" />
          <span>{user.email}</span>
        </div>

        {user.phone && (
          <div className="flex items-center gap-2 text-sm text-primary-600">
            <Phone className="w-4 h-4" />
            <span>{user.phone}</span>
          </div>
        )}

        {user.location && (
          <div className="flex items-center gap-2 text-sm text-primary-600">
            <MapPin className="w-4 h-4" />
            <span>{user.location}</span>
          </div>
        )}
      </div>

      {user.joinDate && (
        <div className="mt-4 pt-4 border-t border-primary-100">
          <p className="text-xs text-primary-500">Cliente dal {new Date(user.joinDate).toLocaleDateString("it-IT")}</p>
        </div>
      )}
    </div>
  )
}
