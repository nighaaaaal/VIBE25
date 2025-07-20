"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, MapPin, Calendar, Users, BookOpen, Award, ExternalLink } from "lucide-react"
import { getProfileColor, getInitials } from "@/lib/auth"

interface ProfilePanelProps {
  user: any
  onClose: () => void
}

export default function ProfilePanel({ user, onClose }: ProfilePanelProps) {
  const profileColor = getProfileColor(user.name || user.email)
  const initials = getInitials(user.name || user.email.split("@")[0])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="floating-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600/20 to-green-500/20 p-6 rounded-t-xl">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>

            <div className="flex items-start space-x-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-black"
                style={{ backgroundColor: profileColor }}
              >
                {initials}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-1">{user.name || user.email.split("@")[0]}</h2>
                <p className="text-gray-300 mb-2">{user.bio || "Student"}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{user.graduationYear}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{user.projects || 0}</div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{user.connections || 0}</div>
                <div className="text-sm text-gray-400">Connections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{user.semester || "N/A"}</div>
                <div className="text-sm text-gray-400">Semester</div>
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Education
              </h3>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-medium text-white">{user.university}</h4>
                <p className="text-gray-300">{user.branch}</p>
                <p className="text-sm text-gray-400">{user.graduationYear}</p>
              </div>
            </div>

            {/* Skills */}
            {user.skills && (
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-gray-800 text-gray-300">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Interests */}
            {user.interests && (
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest: string, index: number) => (
                    <Badge key={index} variant="outline" className="border-green-400 text-green-400">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Contact */}
            <div className="flex space-x-3">
              <Button className="flex-1 bg-green-500 hover:bg-green-600 text-black">
                <Users className="w-4 h-4 mr-2" />
                Connect
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
