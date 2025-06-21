"use client"

import { Users, Calendar, TrendingUp, Clock } from "lucide-react"
import { DashboardCard } from "./dashboard-card"

interface MetricsData {
  totalClients: number
  sessionsThisWeek: number
  revenue: number
  avgSessionDuration: number
  clientsChange?: number
  sessionsChange?: number
  revenueChange?: number
}

interface MetricsOverviewProps {
  data?: MetricsData
  loading?: boolean
}

const defaultData: MetricsData = {
  totalClients: 24,
  sessionsThisWeek: 18,
  revenue: 3240,
  avgSessionDuration: 45,
  clientsChange: 12,
  sessionsChange: 8,
  revenueChange: 15,
}

export const MetricsOverview = ({ data = defaultData, loading = false }: MetricsOverviewProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-primary-900">Panoramica</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Clienti Totali"
          value={data.totalClients}
          change={data.clientsChange}
          icon={<Users className="w-6 h-6" />}
          loading={loading}
        />

        <DashboardCard
          title="Sessioni Settimana"
          value={data.sessionsThisWeek}
          change={data.sessionsChange}
          icon={<Calendar className="w-6 h-6" />}
          loading={loading}
        />

        <DashboardCard
          title="Fatturato"
          value={`€${data.revenue.toLocaleString()}`}
          change={data.revenueChange}
          icon={<TrendingUp className="w-6 h-6" />}
          loading={loading}
          variant="accent"
        />

        <DashboardCard
          title="Durata Media"
          value={`${data.avgSessionDuration}min`}
          icon={<Clock className="w-6 h-6" />}
          loading={loading}
        />
      </div>
    </div>
  )
}
