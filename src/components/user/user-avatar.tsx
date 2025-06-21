"use client"

import { cn } from "@/lib/utils"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  isOnline?: boolean
}

interface UserAvatarProps {
  user: User
  size?: "sm" | "md" | "lg" | "xl"
  showStatus?: boolean
  className?: string
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
}

const statusSizeClasses = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-3 h-3",
  xl: "w-4 h-4",
}

export const UserAvatar = ({ user, size = "md", showStatus = false, className }: UserAvatarProps) => {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className={cn("relative inline-block", className)}>
      {user.avatar ? (
        <img
          src={user.avatar || "/placeholder.svg"}
          alt={user.name}
          className={cn("rounded-full object-cover border-2 border-white shadow-sm", sizeClasses[size])}
        />
      ) : (
        <div
          className={cn(
            "rounded-full bg-accent-600 text-white font-medium flex items-center justify-center",
            "border-2 border-white shadow-sm",
            sizeClasses[size],
          )}
        >
          {initials}
        </div>
      )}

      {showStatus && (
        <div
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-white",
            statusSizeClasses[size],
            user.isOnline ? "bg-green-500" : "bg-primary-400",
          )}
        />
      )}
    </div>
  )
}
