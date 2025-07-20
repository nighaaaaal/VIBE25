"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MapPin, Mail, GraduationCap, Briefcase, X } from "lucide-react"
import { getProfileColor, getInitials } from "@/lib/auth"

interface ProfilePanelProps {
  user: {
    id: string
    name?: string
    email: string
    graduationYear?: string
    branch?: string
    bio?: string
    location?: string
    college?: {
      name: string
      university: string
      location: string
      type: string
    }
    displayName?: string
  }
  onClose: () => void
}

export default function ProfilePanel({ user, onClose }: ProfilePanelProps) {
  const displayName = user.name || user.displayName || user.email.split("@")[0]
  const profileColor = getProfileColor(user.email)
  const initials = getInitials(displayName)

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-gray-100 border-gray-700">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-gray-100 flex items-center">User Profile</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-gray-100">
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>
        <div className="flex flex-col items-center p-6">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold mb-4"
            style={{ backgroundColor: profileColor }}
          >
            {initials}
          </div>
          <h2 className="text-2xl font-bold text-gray-100 mb-1">{displayName}</h2>
          <p className="text-gray-400 text-sm mb-4">{user.email}</p>

          <div className="grid grid-cols-1 gap-3 w-full max-w-xs">
            {user.college && (
              <div className="flex items-center text-gray-300">
                <GraduationCap className="w-5 h-5 mr-2 text-green-400" />
                <span>{user.college.name}</span>
              </div>
            )}
            {user.graduationYear && (
              <div className="flex items-center text-gray-300">
                <Briefcase className="w-5 h-5 mr-2 text-blue-400" />
                <span>Graduation: {user.graduationYear}</span>
              </div>
            )}
            {user.branch && (
              <div className="flex items-center text-gray-300">
                <Mail className="w-5 h-5 mr-2 text-purple-400" />
                <span>Branch: {user.branch}</span>
              </div>
            )}
            {user.location && (
              <div className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-2 text-red-400" />
                <span>{user.location}</span>
              </div>
            )}
          </div>

          {user.bio && (
            <div className="mt-6 p-4 bg-gray-800 rounded-lg w-full">
              <h3 className="font-semibold text-gray-100 mb-2">Bio</h3>
              <p className="text-gray-300 text-sm">{user.bio}</p>
            </div>
          )}

          <div className="mt-6 w-full flex justify-center">
            <Button className="bg-green-500 hover:bg-green-600 text-black">Connect</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
