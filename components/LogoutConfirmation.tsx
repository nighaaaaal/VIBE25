"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

interface LogoutConfirmationProps {
  onConfirm: () => void
  onCancel: () => void
}

export default function LogoutConfirmation({ onConfirm, onCancel }: LogoutConfirmationProps) {
  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-gray-100 border-gray-700">
        <DialogHeader className="text-center">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogOut className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-gray-100 text-2xl">Confirm Logout</DialogTitle>
        </DialogHeader>
        <div className="text-center text-gray-300 py-4">
          <p>Are you sure you want to log out?</p>
          <p>You will need to verify your college email again to log back in.</p>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-center gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="w-full sm:w-auto border-gray-700 text-gray-100 hover:bg-gray-800 bg-transparent"
          >
            Cancel
          </Button>
          <Button onClick={onConfirm} className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white">
            Log Out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
