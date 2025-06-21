"use client"

import React from "react"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"

interface Image {
  id: string
  src: string
  alt: string
  caption?: string
}

interface ImageCarouselProps {
  images: Image[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showThumbnails?: boolean
  className?: string
}

export const ImageCarousel = ({
  images,
  autoPlay = false,
  autoPlayInterval = 5000,
  showThumbnails = true,
  className,
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying)
  }

  // Auto-play functionality
  React.useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      goToNext()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isPlaying, autoPlayInterval, currentIndex])

  if (images.length === 0) {
    return (
      <div className="bg-primary-100 rounded-lg p-8 text-center">
        <p className="text-primary-600">Nessuna immagine disponibile</p>
      </div>
    )
  }

  return (
    <div className={cn("bg-white rounded-lg shadow-sm border border-primary-200 overflow-hidden", className)}>
      {/* Main Image Display */}
      <div className="relative aspect-video bg-primary-100">
        <img
          src={images[currentIndex].src || "/placeholder.svg"}
          alt={images[currentIndex].alt}
          className="w-full h-full object-cover"
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Auto-play Control */}
        {images.length > 1 && (
          <button
            onClick={toggleAutoPlay}
            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Image Caption */}
      {images[currentIndex].caption && (
        <div className="p-4 bg-primary-50">
          <p className="text-primary-700 text-sm">{images[currentIndex].caption}</p>
        </div>
      )}

      {/* Thumbnails */}
      {showThumbnails && images.length > 1 && (
        <div className="p-4 border-t border-primary-200">
          <div className="flex gap-2 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => goToSlide(index)}
                className={cn(
                  "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors",
                  index === currentIndex ? "border-accent-500" : "border-primary-200 hover:border-primary-300",
                )}
              >
                <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dots Indicator (alternative to thumbnails) */}
      {!showThumbnails && images.length > 1 && (
        <div className="p-4 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                index === currentIndex ? "bg-accent-600" : "bg-primary-300 hover:bg-primary-400",
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
