"use client"

import type React from "react"

import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardCardProps {
  title: string
  value: string | number
  change?: number
  icon?: React.ReactNode
  loading?: boolean
  variant?: "default" | "accent"
}

export const DashboardCard = ({
  title,
  value,
  change,
  icon,
  loading = false,
  variant = "default",
}: DashboardCardProps) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-primary-200 p-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-4 bg-primary-200 rounded w-24"></div>
            <div className="h-8 bg-primary-200 rounded w-16"></div>
          </div>
          <div className="w-12 h-12 bg-primary-200 rounded-lg"></div>
        </div>
      </div>
    )
  }

  const isPositiveChange = change !== undefined && change > 0
  const isNegativeChange = change !== undefined && change < 0

  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-sm border p-6 transition-all duration-200",
        "hover:shadow-md hover:-translate-y-0.5",
        variant === "accent" ? "border-accent-200 bg-accent-50" : "border-primary-200",
      )}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className={cn("text-sm font-medium", variant === "accent" ? "text-accent-700" : "text-primary-600")}>
            {title}
          </p>
          <p className={cn("text-2xl font-bold", variant === "accent" ? "text-accent-900" : "text-primary-900")}>
            {value}
          </p>
          {change !== undefined && (
            <div className="flex items-center gap-1">
              {isPositiveChange && <TrendingUp className="w-4 h-4 text-green-500" />}
              {isNegativeChange && <TrendingDown className="w-4 h-4 text-red-500" />}
              <span
                className={cn(
                  "text-sm font-medium",
                  isPositiveChange && "text-green-600",
                  isNegativeChange && "text-red-600",
                  change === 0 && "text-primary-500",
                )}
              >
                {change > 0 ? "+" : ""}
                {change}%
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              "p-3 rounded-lg",
              variant === "accent" ? "bg-accent-100 text-accent-600" : "bg-primary-100 text-primary-600",
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
