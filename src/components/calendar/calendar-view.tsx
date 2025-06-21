"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  type: "session" | "meeting" | "break"
  client?: string
  color?: string
}

interface CalendarViewProps {
  events?: CalendarEvent[]
  onEventClick?: (event: CalendarEvent) => void
  onDateClick?: (date: Date) => void
  onEventCreate?: (date: Date, hour: number) => void
}

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Sessione con Marco Rossi",
    start: new Date(2024, 2, 15, 9, 0),
    end: new Date(2024, 2, 15, 10, 0),
    type: "session",
    client: "Marco Rossi",
    color: "bg-blue-500",
  },
  {
    id: "2",
    title: "Coaching Laura Bianchi",
    start: new Date(2024, 2, 15, 14, 0),
    end: new Date(2024, 2, 15, 15, 30),
    type: "session",
    client: "Laura Bianchi",
    color: "bg-green-500",
  },
  {
    id: "3",
    title: "Team Meeting",
    start: new Date(2024, 2, 16, 11, 0),
    end: new Date(2024, 2, 16, 12, 0),
    type: "meeting",
    color: "bg-purple-500",
  },
]

export const CalendarView = ({ events = mockEvents, onEventClick, onDateClick, onEventCreate }: CalendarViewProps) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")

  const today = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const monthNames = [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre",
  ]

  const dayNames = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start)
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })
  }

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate)

    return (
      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {dayNames.map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-primary-600 bg-primary-50">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((day, index) => {
          if (!day) {
            return <div key={index} className="h-24 bg-primary-25"></div>
          }

          const dayEvents = getEventsForDate(day)
          const isCurrentDay = isToday(day)

          return (
            <div
              key={day.toISOString()}
              onClick={() => onDateClick?.(day)}
              className={cn(
                "h-24 p-1 border border-primary-200 cursor-pointer hover:bg-primary-50 transition-colors",
                isCurrentDay && "bg-accent-50 border-accent-300",
              )}
            >
              <div className={cn("text-sm font-medium mb-1", isCurrentDay ? "text-accent-700" : "text-primary-900")}>
                {day.getDate()}
              </div>

              <div className="space-y-1">
                {dayEvents.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      onEventClick?.(event)
                    }}
                    className={cn(
                      "text-xs p-1 rounded text-white truncate cursor-pointer",
                      event.color || "bg-accent-500",
                    )}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && <div className="text-xs text-primary-500">+{dayEvents.length - 2} altri</div>}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i)
    const dayEvents = getEventsForDate(currentDate)

    return (
      <div className="space-y-1">
        {hours.map((hour) => {
          const hourEvents = dayEvents.filter((event) => event.start.getHours() === hour)

          return (
            <div key={hour} className="flex border-b border-primary-100">
              <div className="w-16 p-2 text-sm text-primary-600 bg-primary-50">
                {hour.toString().padStart(2, "0")}:00
              </div>
              <div
                className="flex-1 p-2 min-h-[60px] hover:bg-primary-50 cursor-pointer transition-colors"
                onClick={() => onEventCreate?.(currentDate, hour)}
              >
                {hourEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      onEventClick?.(event)
                    }}
                    className={cn("p-2 rounded mb-1 text-white cursor-pointer", event.color || "bg-accent-500")}
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-xs opacity-90">
                      {formatTime(event.start)} - {formatTime(event.end)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-primary-200">
      {/* Header */}
      <div className="p-4 border-b border-primary-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-primary-900">
              {view === "day"
                ? currentDate.toLocaleDateString("it-IT", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : `${monthNames[currentMonth]} ${currentYear}`}
            </h2>
            <div className="flex items-center gap-1">
              <button
                onClick={() => navigateMonth("prev")}
                className="p-2 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigateMonth("next")}
                className="p-2 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Toggle */}
            <div className="flex bg-primary-100 rounded-lg p-1">
              {(["month", "day"] as const).map((viewType) => (
                <button
                  key={viewType}
                  onClick={() => setView(viewType)}
                  className={cn(
                    "px-3 py-1 rounded text-sm font-medium transition-colors",
                    view === viewType
                      ? "bg-white text-primary-900 shadow-sm"
                      : "text-primary-600 hover:text-primary-900",
                  )}
                >
                  {viewType === "month" ? "Mese" : "Giorno"}
                </button>
              ))}
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors">
              <Plus className="w-4 h-4" />
              Nuovo Evento
            </button>
          </div>
        </div>

        {/* Today Button */}
        <button
          onClick={() => setCurrentDate(new Date())}
          className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
        >
          Oggi
        </button>
      </div>

      {/* Calendar Content */}
      <div className="p-4">{view === "month" ? renderMonthView() : renderDayView()}</div>

      {/* Legend */}
      <div className="p-4 border-t border-primary-200 bg-primary-50">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-primary-600">Sessioni</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-primary-600">Coaching</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span className="text-primary-600">Meeting</span>
          </div>
        </div>
      </div>
    </div>
  )
}
