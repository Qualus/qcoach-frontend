"use client"

import type React from "react"

import { useState } from "react"
import { User, Mail, Phone, MapPin, Briefcase, Save, Camera } from "lucide-react"
import { UserAvatar } from "../user/user-avatar"
import { cn } from "@/lib/utils"

interface ProfileData {
  name: string
  email: string
  phone: string
  location: string
  bio: string
  specialization: string
  experience: string
  avatar?: string
}

interface ProfileFormProps {
  initialData?: ProfileData
  onSubmit?: (data: ProfileData) => void
  loading?: boolean
}

const defaultData: ProfileData = {
  name: "Dr. Maria Rossi",
  email: "maria.rossi@coachpro.com",
  phone: "+39 333 123 4567",
  location: "Milano, IT",
  bio: "Coach esperta in sviluppo personale e professionale con oltre 10 anni di esperienza.",
  specialization: "Executive Coaching",
  experience: "10+ anni",
}

export const ProfileForm = ({ initialData = defaultData, onSubmit, loading = false }: ProfileFormProps) => {
  const [formData, setFormData] = useState<ProfileData>(initialData)
  const [errors, setErrors] = useState<Partial<ProfileData>>({})

  const validateForm = () => {
    const newErrors: Partial<ProfileData> = {}

    if (!formData.name.trim()) newErrors.name = "Nome richiesto"
    if (!formData.email.trim()) {
      newErrors.email = "Email richiesta"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email non valida"
    }
    if (!formData.phone.trim()) newErrors.phone = "Telefono richiesto"
    if (!formData.location.trim()) newErrors.location = "Località richiesta"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit?.(formData)
    }
  }

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-primary-200 p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <UserAvatar
            user={{ id: "1", name: formData.name, email: formData.email, avatar: formData.avatar }}
            size="xl"
          />
          <button className="absolute bottom-0 right-0 bg-accent-600 text-white p-2 rounded-full hover:bg-accent-700 transition-colors">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-primary-900">Profilo Personale</h2>
          <p className="text-primary-600">Aggiorna le tue informazioni</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Nome */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-primary-700 mb-2">
              Nome Completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-400" />
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={cn(
                  "w-full pl-10 pr-4 py-3 border rounded-lg transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500",
                  errors.name ? "border-red-300 bg-red-50" : "border-primary-300 bg-white",
                )}
                placeholder="Il tuo nome completo"
              />
            </div>
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-400" />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={cn(
                  "w-full pl-10 pr-4 py-3 border rounded-lg transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500",
                  errors.email ? "border-red-300 bg-red-50" : "border-primary-300 bg-white",
                )}
                placeholder="tua@email.com"
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Telefono */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-primary-700 mb-2">
              Telefono
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-400" />
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={cn(
                  "w-full pl-10 pr-4 py-3 border rounded-lg transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500",
                  errors.phone ? "border-red-300 bg-red-50" : "border-primary-300 bg-white",
                )}
                placeholder="+39 333 123 4567"
              />
            </div>
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>

          {/* Località */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-primary-700 mb-2">
              Località
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-400" />
              <input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className={cn(
                  "w-full pl-10 pr-4 py-3 border rounded-lg transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500",
                  errors.location ? "border-red-300 bg-red-50" : "border-primary-300 bg-white",
                )}
                placeholder="Milano, IT"
              />
            </div>
            {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
          </div>

          {/* Specializzazione */}
          <div>
            <label htmlFor="specialization" className="block text-sm font-medium text-primary-700 mb-2">
              Specializzazione
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-400" />
              <select
                id="specialization"
                value={formData.specialization}
                onChange={(e) => handleInputChange("specialization", e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-primary-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white"
              >
                <option value="Executive Coaching">Executive Coaching</option>
                <option value="Life Coaching">Life Coaching</option>
                <option value="Career Coaching">Career Coaching</option>
                <option value="Business Coaching">Business Coaching</option>
                <option value="Health Coaching">Health Coaching</option>
              </select>
            </div>
          </div>

          {/* Esperienza */}
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-primary-700 mb-2">
              Esperienza
            </label>
            <select
              id="experience"
              value={formData.experience}
              onChange={(e) => handleInputChange("experience", e.target.value)}
              className="w-full px-4 py-3 border border-primary-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white"
            >
              <option value="1-2 anni">1-2 anni</option>
              <option value="3-5 anni">3-5 anni</option>
              <option value="5-10 anni">5-10 anni</option>
              <option value="10+ anni">10+ anni</option>
            </select>
          </div>
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-primary-700 mb-2">
            Biografia
          </label>
          <textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-primary-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white resize-none"
            placeholder="Descrivi la tua esperienza e il tuo approccio al coaching..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2",
              loading
                ? "bg-primary-300 text-primary-500 cursor-not-allowed"
                : "bg-accent-600 text-white hover:bg-accent-700",
            )}
          >
            <Save className="w-4 h-4" />
            {loading ? "Salvataggio..." : "Salva Modifiche"}
          </button>
        </div>
      </form>
    </div>
  )
}
