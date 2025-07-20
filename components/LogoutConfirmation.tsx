"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertTriangle, LogOut, X } from "lucide-react"

interface LogoutConfirmationProps {
  onConfirm: () => void
  onCancel: () => void
}

export default function LogoutConfirmation({ onConfirm, onCancel }: LogoutConfirmationProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="floating-card w-full max-w-md p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>

          <h3 className="text-xl font-semibold text-white mb-2">Sign Out</h3>
          <p className="text-gray-400 mb-6">
            Are you sure you want to sign out? You'll need to verify your email again to log back in.
          </p>

          <div className="flex space-x-3">
            <Button
              onClick={onCancel}
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={onConfirm} className="flex-1 bg-red-500 hover:bg-red-600 text-white">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
