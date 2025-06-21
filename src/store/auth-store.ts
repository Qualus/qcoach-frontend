import { create } from 'zustand'
import type { JwtResponseDTO } from '@/lib/api/generated'

interface AuthStore {
  user: { role?: string } | null
  tokens: JwtResponseDTO | null
  setAuth: (tokens: JwtResponseDTO) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  tokens: null,
  setAuth: (tokens) => set({ 
    tokens,
    user: { role: tokens.role }
  }),
  clearAuth: () => set({ user: null, tokens: null }),
}))
