"use client"

import { useState } from "react"
import { Search, Filter, Plus } from "lucide-react"
import { UserCard } from "./user-card"
import { SearchInput } from "../forms/search-input"

interface Client {
  id: string
  name: string
  email: string
  phone?: string
  location?: string
  avatar?: string
  isOnline?: boolean
  role?: string
  joinDate?: string
  lastSession?: string
  totalSessions?: number
}

interface ClientListProps {
  clients?: Client[]
  loading?: boolean
  onClientClick?: (client: Client) => void
  onAddClient?: () => void
  variant?: "compact" | "detailed"
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "Marco Rossi",
    email: "marco.rossi@email.com",
    phone: "+39 333 123 4567",
    location: "Milano, IT",
    isOnline: true,
    role: "Executive Coach",
    joinDate: "2024-01-15",
    lastSession: "2024-03-10",
    totalSessions: 12,
  },
  {
    id: "2",
    name: "Laura Bianchi",
    email: "laura.bianchi@email.com",
    phone: "+39 347 987 6543",
    location: "Roma, IT",
    isOnline: false,
    role: "Life Coach",
    joinDate: "2024-02-20",
    lastSession: "2024-03-08",
    totalSessions: 8,
  },
  {
    id: "3",
    name: "Giuseppe Verdi",
    email: "giuseppe.verdi@email.com",
    location: "Napoli, IT",
    isOnline: true,
    role: "Career Coach",
    joinDate: "2024-01-30",
    lastSession: "2024-03-12",
    totalSessions: 15,
  },
]

export const ClientList = ({
  clients = mockClients,
  loading = false,
  onClientClick,
  onAddClient,
  variant = "detailed",
}: ClientListProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredClients, setFilteredClients] = useState(clients)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (!query) {
      setFilteredClients(clients)
    } else {
      const filtered = clients.filter(
        (client) =>
          client.name.toLowerCase().includes(query.toLowerCase()) ||
          client.email.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredClients(filtered)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-primary-900">Clienti</h2>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-primary-200 p-6 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-200 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-primary-200 rounded w-32"></div>
                  <div className="h-3 bg-primary-200 rounded w-48"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-primary-900">Clienti ({filteredClients.length})</h2>

        <div className="flex items-center gap-3">
          <SearchInput placeholder="Cerca clienti..." onSearch={handleSearch} size="sm" className="w-full sm:w-64" />
          <button className="p-2 rounded-lg border border-primary-300 hover:bg-primary-50 transition-colors">
            <Filter className="w-5 h-5 text-primary-600" />
          </button>
          {onAddClient && (
            <button
              onClick={onAddClient}
              className="flex items-center gap-2 px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Aggiungi</span>
            </button>
          )}
        </div>
      </div>

      {/* Client List */}
      {filteredClients.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-primary-400" />
          </div>
          <h3 className="text-lg font-medium text-primary-900 mb-2">
            {searchQuery ? "Nessun cliente trovato" : "Nessun cliente"}
          </h3>
          <p className="text-primary-600 mb-6">
            {searchQuery ? "Prova a modificare i termini di ricerca" : "Inizia aggiungendo il tuo primo cliente"}
          </p>
          {!searchQuery && onAddClient && (
            <button
              onClick={onAddClient}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Aggiungi Cliente
            </button>
          )}
        </div>
      ) : (
        <div className={variant === "compact" ? "space-y-3" : "grid gap-6 md:grid-cols-2 lg:grid-cols-3"}>
          {filteredClients.map((client) => (
            <UserCard key={client.id} user={client} variant={variant} onClick={() => onClientClick?.(client)} />
          ))}
        </div>
      )}
    </div>
  )
}
