"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { X } from "lucide-react"

interface MacosSettingsPanelProps {
  onClose: () => void
}

export default function MacosSettingsPanel({ onClose }: MacosSettingsPanelProps) {
  const [darkMode, setDarkMode] = useState(true) // Assuming dark mode is default
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [fontSize, setFontSize] = useState([16])
  const [amoledTheme, setAmoledTheme] = useState(false)

  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked)
    document.documentElement.classList.toggle("dark", checked)
    // If switching to light mode, ensure amoled is off
    if (!checked) {
      setAmoledTheme(false)
      document.documentElement.classList.remove("amoled")
    }
  }

  const handleAmoledThemeToggle = (checked: boolean) => {
    setAmoledTheme(checked)
    document.documentElement.classList.toggle("amoled", checked)
    // Ensure dark mode is enabled if AMOLED is turned on
    if (checked && !darkMode) {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value)
    document.documentElement.style.fontSize = `${value[0] / 16}em` // Adjust base font size
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-gray-900 text-gray-100 border-gray-700">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-gray-100">Settings</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-gray-100">
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>
        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger
              value="appearance"
              className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-green-400"
            >
              Appearance
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-green-400"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="privacy"
              className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-green-400"
            >
              Privacy
            </TabsTrigger>
          </TabsList>
          <TabsContent value="appearance" className="py-4 space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="text-gray-200">
                Dark Mode
              </Label>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={handleDarkModeToggle}
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="amoled-theme" className="text-gray-200">
                AMOLED Dark Theme
              </Label>
              <Switch
                id="amoled-theme"
                checked={amoledTheme}
                onCheckedChange={handleAmoledThemeToggle}
                disabled={!darkMode} // AMOLED only makes sense in dark mode
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="font-size" className="text-gray-200">
                Font Size
              </Label>
              <Slider
                id="font-size"
                min={12}
                max={20}
                step={1}
                value={fontSize}
                onValueChange={handleFontSizeChange}
                className="w-full [&>span:first-child]:h-2 [&>span:first-child]:bg-gray-700 [&>span:first-child>span]:bg-green-500 [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:bg-green-500 [&_[role=slider]]:border-green-500"
              />
              <p className="text-sm text-gray-400">Current font size: {fontSize[0]}px</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="theme-color" className="text-gray-200">
                Accent Color
              </Label>
              <div className="flex space-x-2">
                <div
                  className="w-8 h-8 rounded-full bg-green-500 cursor-pointer border-2 border-transparent hover:border-green-400"
                  title="Green"
                ></div>
                <div
                  className="w-8 h-8 rounded-full bg-blue-500 cursor-pointer border-2 border-transparent hover:border-blue-400"
                  title="Blue"
                ></div>
                <div
                  className="w-8 h-8 rounded-full bg-purple-500 cursor-pointer border-2 border-transparent hover:border-purple-400"
                  title="Purple"
                ></div>
                <div
                  className="w-8 h-8 rounded-full bg-red-500 cursor-pointer border-2 border-transparent hover:border-red-400"
                  title="Red"
                ></div>
              </div>
              <p className="text-sm text-gray-400">Choose your preferred accent color for the UI.</p>
            </div>
          </TabsContent>
          <TabsContent value="notifications" className="py-4 space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-notifications" className="text-gray-200">
                Enable Notifications
              </Label>
              <Switch
                id="enable-notifications"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-600"
              />
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-200">Notification Types</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="likes-comments"
                    defaultChecked
                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-600"
                  />
                  <Label htmlFor="likes-comments">Likes and Comments</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="new-posts"
                    defaultChecked
                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-600"
                  />
                  <Label htmlFor="new-posts">New Posts from Followed Users</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="event-reminders"
                    defaultChecked
                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-600"
                  />
                  <Label htmlFor="event-reminders">Event Reminders</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="group-updates"
                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-600"
                  />
                  <Label htmlFor="group-updates">Study Group Updates</Label>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="privacy" className="py-4 space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="profile-visibility" className="text-gray-200">
                Profile Visibility
              </Label>
              <Switch
                id="profile-visibility"
                defaultChecked
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-600"
              />
            </div>
            <p className="text-sm text-gray-400">Control who can view your profile and contact information.</p>

            <div className="flex items-center justify-between">
              <Label htmlFor="data-sharing" className="text-gray-200">
                Share Anonymous Data
              </Label>
              <Switch
                id="data-sharing"
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-600"
              />
            </div>
            <p className="text-sm text-gray-400">Help us improve Learn.io by sharing anonymous usage data.</p>

            <Button variant="destructive" className="w-full bg-red-600 hover:bg-red-700 text-white">
              Delete Account
            </Button>
            <p className="text-xs text-gray-500 text-center">This action is irreversible.</p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
