"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Upload, ImageIcon, Video, FileText } from "lucide-react"

interface MediaUploadProps {
  onMediaSelect: (media: { type: string; file: File; preview: string }) => void
  onClose: () => void
}

export default function MediaUpload({ onMediaSelect, onClose }: MediaUploadProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const preview = e.target?.result as string
      let type = "file"

      if (file.type.startsWith("image/")) type = "image"
      else if (file.type.startsWith("video/")) type = "video"

      onMediaSelect({ type, file, preview })
      onClose()
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="floating-card w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-green-400">Upload Media</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? "border-green-400 bg-green-400/10" : "border-gray-600 hover:border-gray-500"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-300 mb-2">Drag and drop files here</p>
          <p className="text-sm text-gray-500 mb-4">or click to browse</p>

          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/*,video/*,.pdf,.doc,.docx"
            onChange={handleFileInput}
          />

          <div className="grid grid-cols-3 gap-2 mb-4">
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex flex-col items-center p-3 rounded-lg border border-gray-600 hover:border-green-400 hover:bg-green-400/10 transition-colors">
                <ImageIcon className="w-6 h-6 text-green-400 mb-1" />
                <span className="text-xs text-gray-300">Photo</span>
              </div>
            </label>

            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex flex-col items-center p-3 rounded-lg border border-gray-600 hover:border-green-400 hover:bg-green-400/10 transition-colors">
                <Video className="w-6 h-6 text-green-400 mb-1" />
                <span className="text-xs text-gray-300">Video</span>
              </div>
            </label>

            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex flex-col items-center p-3 rounded-lg border border-gray-600 hover:border-green-400 hover:bg-green-400/10 transition-colors">
                <FileText className="w-6 h-6 text-green-400 mb-1" />
                <span className="text-xs text-gray-300">Document</span>
              </div>
            </label>
          </div>

          <Button
            onClick={() => document.getElementById("file-upload")?.click()}
            className="bg-green-500 hover:bg-green-600 text-black"
          >
            Choose Files
          </Button>
        </div>
      </Card>
    </div>
  )
}
