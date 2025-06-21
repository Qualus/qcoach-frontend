"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, File, ImageIcon, Video, FileText, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url?: string
  progress?: number
  status: "uploading" | "completed" | "error"
}

interface FileUploadProps {
  accept?: string
  maxSize?: number // in MB
  maxFiles?: number
  onUpload?: (files: File[]) => void
  className?: string
}

export const FileUpload = ({
  accept = "image/*,video/*,.pdf,.doc,.docx",
  maxSize = 10,
  maxFiles = 5,
  onUpload,
  className,
}: FileUploadProps) => {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="w-8 h-8 text-blue-500" />
    if (type.startsWith("video/")) return <Video className="w-8 h-8 text-purple-500" />
    if (type.includes("pdf")) return <FileText className="w-8 h-8 text-red-500" />
    return <File className="w-8 h-8 text-primary-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const validateFile = (file: File) => {
    if (file.size > maxSize * 1024 * 1024) {
      return `File troppo grande. Massimo ${maxSize}MB`
    }
    return null
  }

  const handleFiles = (fileList: FileList) => {
    const newFiles: UploadedFile[] = []
    const validFiles: File[] = []

    Array.from(fileList).forEach((file) => {
      if (files.length + newFiles.length >= maxFiles) return

      const error = validateFile(file)
      if (error) {
        // Handle error (could show toast notification)
        return
      }

      const uploadedFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        progress: 0,
        status: "uploading",
      }

      newFiles.push(uploadedFile)
      validFiles.push(file)
    })

    setFiles((prev) => [...prev, ...newFiles])

    // Simulate upload progress
    newFiles.forEach((file, index) => {
      simulateUpload(file.id)
    })

    if (validFiles.length > 0) {
      onUpload?.(validFiles)
    }
  }

  const simulateUpload = (fileId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setFiles((prev) =>
          prev.map((file) => (file.id === fileId ? { ...file, progress: 100, status: "completed" } : file)),
        )
      } else {
        setFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, progress } : file)))
      }
    }, 200)
  }

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const droppedFiles = e.dataTransfer.files
    if (droppedFiles.length > 0) {
      handleFiles(droppedFiles)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles && selectedFiles.length > 0) {
      handleFiles(selectedFiles)
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragOver
            ? "border-accent-500 bg-accent-50"
            : "border-primary-300 hover:border-accent-400 hover:bg-primary-50",
        )}
      >
        <Upload className="w-12 h-12 text-primary-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-primary-900 mb-2">Carica i tuoi file</h3>
        <p className="text-primary-600 mb-4">Trascina i file qui o clicca per selezionare</p>
        <p className="text-sm text-primary-500">
          Massimo {maxFiles} file, {maxSize}MB ciascuno
        </p>

        <input ref={fileInputRef} type="file" accept={accept} multiple onChange={handleFileSelect} className="hidden" />
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-primary-900">File caricati ({files.length})</h4>
          {files.map((file) => (
            <div key={file.id} className="bg-white border border-primary-200 rounded-lg p-4 flex items-center gap-4">
              {getFileIcon(file.type)}

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-primary-900 truncate">{file.name}</p>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-primary-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-primary-500 mb-2">{formatFileSize(file.size)}</p>

                {file.status === "uploading" && (
                  <div className="w-full bg-primary-200 rounded-full h-2">
                    <div
                      className="bg-accent-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>
                )}

                {file.status === "completed" && (
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">Caricato</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
