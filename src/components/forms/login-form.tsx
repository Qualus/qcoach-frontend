"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void
  loading?: boolean
  error?: string
}

export const LoginForm = ({ onSubmit, loading = false, error }: LoginFormProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "Email richiesta"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email non valida"
    }

    if (!password) {
      newErrors.password = "Password richiesta"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit?.(email, password)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-primary-200 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary-900">Accedi</h1>
          <p className="text-primary-600 mt-2">Benvenuto su QCoach</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  "w-full pl-10 pr-4 py-3 border rounded-lg transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500",
                  errors.email ? "border-red-300 bg-red-50" : "border-primary-300 bg-white",
                )}
                placeholder="inserisci@email.com"
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-primary-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={cn(
                  "w-full pl-10 pr-12 py-3 border rounded-lg transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500",
                  errors.password ? "border-red-300 bg-red-50" : "border-primary-300 bg-white",
                )}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400 hover:text-primary-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between">
            <button type="button" className="text-sm text-accent-600 hover:text-accent-700 font-medium">
              Password dimenticata?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full py-3 px-4 rounded-lg font-medium transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2",
              loading
                ? "bg-primary-300 text-primary-500 cursor-not-allowed"
                : "bg-accent-600 text-white hover:bg-accent-700",
            )}
          >
            {loading ? "Accesso in corso..." : "Accedi"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-primary-600">
            Non hai un account?{" "}
            <button className="text-accent-600 hover:text-accent-700 font-medium">Registrati</button>
          </p>
        </div>
      </div>
    </div>
  )
}
