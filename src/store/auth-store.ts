import { create } from 'zustand'
import type { JwtResponseDTO } from '@/lib/api/generated'

interface AuthStore {
  tokens: JwtResponseDTO | null
  role: string | null
  setAuth: (tokens: JwtResponseDTO) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  tokens: null,
  role: null,
  setAuth: (tokens) => set({
    tokens,
    role: tokens.role || null
  }),
  clearAuth: () => set({
    tokens: null,
    role: null
  }),
}))
