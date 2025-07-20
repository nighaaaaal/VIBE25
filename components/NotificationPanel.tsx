"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Bell, MessageCircle, Heart, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NotificationPanelProps {
  onClose: () => void
}

interface Notification {
  id: number
  type: "like" | "comment" | "follow" | "event"
  message: string
  time: string
  read: boolean
}

export default function NotificationPanel({ onClose }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    // Simulate fetching notifications
    const fetchNotifications = () => {
      const mockNotifications: Notification[] = [
        {
          id: 1,
          type: "like",
          message: "Anu S. Kumar liked your post.",
          time: "5m ago",
          read: false,
        },
        {
          id: 2,
          type: "comment",
          message: "Rahul P. Nair commented on your post: 'Great work!'",
          time: "15m ago",
          read: false,
        },
        {
          id: 3,
          type: "follow",
          message: "Priya V. Menon started following you.",
          time: "30m ago",
          read: false,
        },
        {
          id: 4,
          type: "event",
          message: "New event: 'TechFest 2024' is happening next month!",
          time: "1h ago",
          read: false,
        },
        {
          id: 5,
          type: "like",
          message: "Siddharth R. Pillai liked your comment.",
          time: "2h ago",
          read: true,
        },
        {
          id: 6,
          type: "comment",
          message: "Meera K. Das replied to your comment.",
          time: "3h ago",
          read: true,
        },
      ]
      setNotifications(mockNotifications)
    }

    fetchNotifications()

    // Simulate new notifications every 10 seconds
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: notifications.length + 1,
        type: Math.random() > 0.5 ? "like" : "comment",
        message: `New activity from a random user ${notifications.length + 1}.`,
        time: "Just now",
        read: false,
      }
      setNotifications((prev) => [newNotification, ...prev])
    }, 10000)

    return () => clearInterval(interval)
  }, [notifications.length])

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "like":
        return <Heart className="w-5 h-5 text-red-400" />
      case "comment":
        return <MessageCircle className="w-5 h-5 text-blue-400" />
      case "follow":
        return <Users className="w-5 h-5 text-green-400" />
      case "event":
        return <Bell className="w-5 h-5 text-purple-400" />
      default:
        return <Bell className="w-5 h-5 text-gray-400" />
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-gray-100 border-gray-700">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-gray-100 flex items-center">
            <Bell className="w-5 h-5 mr-2" /> Notifications
          </DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-gray-100">
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto pr-4 -mr-4">
          {notifications.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No new notifications.</div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg transition-colors ${
                    notif.read ? "bg-gray-800 text-gray-400" : "bg-gray-800/70 hover:bg-gray-700/70 text-gray-100"
                  }`}
                  onClick={() => markAsRead(notif.id)}
                >
                  <div className="pt-1">{getIcon(notif.type)}</div>
                  <div className="flex-1">
                    <p className={`${notif.read ? "text-gray-400" : "text-gray-100"} text-sm`}>{notif.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                  </div>
                  {!notif.read && <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
