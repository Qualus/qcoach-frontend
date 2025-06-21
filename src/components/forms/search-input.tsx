"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchInputProps {
  placeholder?: string
  suggestions?: string[]
  onSearch?: (query: string) => void
  onSuggestionClick?: (suggestion: string) => void
  className?: string
  size?: "sm" | "md" | "lg"
}

export const SearchInput = ({
  placeholder = "Cerca...",
  suggestions = [],
  onSearch,
  onSuggestionClick,
  className,
  size = "md",
}: SearchInputProps) => {
  const [query, setQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-5 py-4 text-lg",
  }

  useEffect(() => {
    if (query && suggestions.length > 0) {
      const filtered = suggestions.filter((suggestion) => suggestion.toLowerCase().includes(query.toLowerCase()))
      setFilteredSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }, [query, suggestions])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch?.(value)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setShowSuggestions(false)
    onSuggestionClick?.(suggestion)
    onSearch?.(suggestion)
  }

  const clearSearch = () => {
    setQuery("")
    setShowSuggestions(false)
    onSearch?.("")
    inputRef.current?.focus()
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <Search
          className={cn(
            "absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400",
            size === "sm" && "w-4 h-4",
            size === "md" && "w-5 h-5",
            size === "lg" && "w-6 h-6",
          )}
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={cn(
            "w-full pl-10 pr-10 border border-primary-300 rounded-lg transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500",
            "bg-white placeholder:text-primary-400",
            sizeClasses[size],
          )}
        />
        {query && (
          <button
            onClick={clearSearch}
            className={cn(
              "absolute right-3 top-1/2 transform -translate-y-1/2",
              "text-primary-400 hover:text-primary-600 transition-colors",
            )}
          >
            <X className={cn(size === "sm" && "w-4 h-4", size === "md" && "w-5 h-5", size === "lg" && "w-6 h-6")} />
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-primary-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left px-4 py-3 hover:bg-primary-50 transition-colors border-b border-primary-100 last:border-b-0"
            >
              <span className="text-primary-900">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
