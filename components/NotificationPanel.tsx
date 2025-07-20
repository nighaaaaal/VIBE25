"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Bell, Heart, MessageCircle, UserPlus, AtSign, Calendar, Trophy } from "lucide-react"
import { fakeNotifications } from "@/lib/data"
import { getNotifications, saveNotifications, markNotificationAsRead } from "@/lib/auth"

interface NotificationPanelProps {
  onClose: () => void
}

export default function NotificationPanel({ onClose }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState(fakeNotifications)

  useEffect(() => {
    // Initialize with fake notifications if none exist
    const existingNotifications = getNotifications()
    if (existingNotifications.length === 0) {
      saveNotifications(fakeNotifications)
    } else {
      setNotifications(existingNotifications)
    }
  }, [])

  const handleMarkAsRead = (notificationId: number) => {
    markNotificationAsRead(notificationId)
    setNotifications((prev) => prev.map((notif) => (notif.id === notificationId ? { ...notif, read: true } : notif)))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="w-4 h-4 text-red-400" />
      case "comment":
        return <MessageCircle className="w-4 h-4 text-blue-400" />
      case "follow":
        return <UserPlus className="w-4 h-4 text-green-400" />
      case "mention":
        return <AtSign className="w-4 h-4 text-purple-400" />
      case "event":
        return <Calendar className="w-4 h-4 text-yellow-400" />
      case "achievement":
        return <Trophy className="w-4 h-4 text-orange-400" />
      default:
        return <Bell className="w-4 h-4 text-gray-400" />
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 bg-black/20 backdrop-blur-sm">
      <Card className="floating-card w-full max-w-sm h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-green-400">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{unreadCount}</span>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="overflow-y-auto h-full">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors cursor-pointer ${
                !notification.read ? "bg-gray-800/20" : ""
              }`}
              onClick={() => handleMarkAsRead(notification.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="profile-avatar w-8 h-8 text-xs" style={{ backgroundColor: notification.color }}>
                  {notification.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    {getIcon(notification.type)}
                    {!notification.read && <div className="w-2 h-2 bg-green-400 rounded-full"></div>}
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
