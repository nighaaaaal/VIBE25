"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageIcon, Video, FileText, Upload, X } from "lucide-react"

interface MediaUploadProps {
  onClose: () => void
  onMediaSelect: (media: { type: string; url: string; file: File }) => void
}

export default function MediaUpload({ onClose, onMediaSelect }: MediaUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [mediaType, setMediaType] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)

      if (file.type.startsWith("image/")) {
        setMediaType("image")
      } else if (file.type.startsWith("video/")) {
        setMediaType("video")
      } else {
        setMediaType("file")
      }
    }
  }

  const handleUpload = () => {
    if (selectedFile && mediaType && previewUrl) {
      onMediaSelect({ type: mediaType, url: previewUrl, file: selectedFile })
      onClose()
    }
  }

  const clearSelection = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setMediaType(null)
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-gray-100 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-100">Upload Media</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {!selectedFile ? (
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-700 rounded-lg text-gray-400">
              <Upload className="w-8 h-8 mb-3" />
              <Label htmlFor="file-upload" className="cursor-pointer text-blue-400 hover:underline">
                Click to upload
              </Label>
              <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
              <p className="text-sm mt-1">or drag and drop</p>
              <p className="text-xs mt-1">(Image, Video, or Document)</p>
            </div>
          ) : (
            <div className="relative p-4 border border-gray-700 rounded-lg bg-gray-800">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-gray-400 hover:text-red-400"
                onClick={clearSelection}
              >
                <X className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-3">
                {mediaType === "image" && <ImageIcon className="w-6 h-6 text-green-400" />}
                {mediaType === "video" && <Video className="w-6 h-6 text-blue-400" />}
                {mediaType === "file" && <FileText className="w-6 h-6 text-purple-400" />}
                <div className="flex-1">
                  <p className="font-medium text-gray-100 truncate">{selectedFile.name}</p>
                  <p className="text-sm text-gray-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              {previewUrl && mediaType === "image" && (
                <img
                  src={previewUrl || "/placeholder.svg"}
                  alt="Preview"
                  className="mt-4 max-h-48 w-full object-contain rounded-md"
                />
              )}
              {previewUrl && mediaType === "video" && (
                <video src={previewUrl} controls className="mt-4 max-h-48 w-full object-contain rounded-md" />
              )}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-700 text-gray-100 hover:bg-gray-800 bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile}
            className="bg-green-500 hover:bg-green-600 text-black"
          >
            Add Media
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
