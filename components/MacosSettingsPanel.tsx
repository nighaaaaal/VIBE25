"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  Moon,
  Sun,
  Bell,
  Wifi,
  Volume2,
  Download,
  Loader2,
  Shield,
  Palette,
  Globe,
  Monitor,
  Database,
  Key,
  Zap,
  Settings2,
} from "lucide-react"
import JSZip from "jszip"
import { projectFiles } from "@/lib/projectFiles"

interface MacosSettingsPanelProps {
  onClose?: () => void
}

export default function MacosSettingsPanel({ onClose }: MacosSettingsPanelProps) {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [wifiEnabled, setWifiEnabled] = useState(true)
  const [soundVolume, setSoundVolume] = useState([75])
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  // Additional settings
  const [autoSave, setAutoSave] = useState(true)
  const [dataSync, setDataSync] = useState(false)
  const [locationServices, setLocationServices] = useState(true)
  const [biometricAuth, setBiometricAuth] = useState(false)
  const [screenBrightness, setScreenBrightness] = useState([80])
  const [autoUpdates, setAutoUpdates] = useState(true)

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  const downloadSourceCode = async () => {
    setIsDownloading(true)

    try {
      const zip = new JSZip()

      // Add all project files to the zip
      Object.entries(projectFiles).forEach(([filePath, content]) => {
        zip.file(filePath, content)
      })

      // Generate the zip file
      const zipBlob = await zip.generateAsync({ type: "blob" })

      // Create download link
      const url = URL.createObjectURL(zipBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = "learn-io-dashboard-source.zip"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      console.log("✅ Source code downloaded successfully!")
    } catch (error) {
      console.error("❌ Error creating zip file:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <Button
          onClick={handleMinimize}
          className="bg-gray-800/80 backdrop-blur-md text-white hover:bg-gray-700/80 rounded-lg px-4 py-2 neon-glow"
        >
          <Settings2 className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>
    )
  }

  const tabs = [
    { id: "general", label: "General", icon: Settings2 },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "system", label: "System", icon: Monitor },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card
        className={`
          floating-card transition-all duration-300 ease-out
          ${isMaximized ? "w-full h-full" : "w-[800px] h-[600px]"}
        `}
      >
        {/* Window Controls */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleClose}
              className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
              aria-label="Close"
            />
            <button
              onClick={handleMinimize}
              className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors"
              aria-label="Minimize"
            />
            <button
              onClick={handleMaximize}
              className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
              aria-label="Maximize"
            />
          </div>
          <h2 className="text-lg font-semibold text-green-400">System Preferences</h2>
          <div className="w-12" />
        </div>

        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-48 border-r border-gray-800/50 p-4">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-green-500/20 text-green-400"
                      : "text-gray-400 hover:text-gray-300 hover:bg-gray-800/50"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === "general" && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-green-400 mb-4">General Settings</h3>

                {/* Notifications */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">Notifications</p>
                      <p className="text-xs text-gray-500">{notificationsEnabled ? "Enabled" : "Disabled"}</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>

                {/* Auto Save */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Database className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">Auto Save</p>
                      <p className="text-xs text-gray-500">Automatically save your work</p>
                    </div>
                  </div>
                  <Switch
                    checked={autoSave}
                    onCheckedChange={setAutoSave}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>

                {/* Data Sync */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">Data Sync</p>
                      <p className="text-xs text-gray-500">Sync data across devices</p>
                    </div>
                  </div>
                  <Switch
                    checked={dataSync}
                    onCheckedChange={setDataSync}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-green-400 mb-4">Appearance</h3>

                {/* Dark Mode */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {isDarkMode ? (
                      <Moon className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Sun className="w-5 h-5 text-gray-400" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-300">Theme</p>
                      <p className="text-xs text-gray-500">{isDarkMode ? "Dark Mode" : "Light Mode"}</p>
                    </div>
                  </div>
                  <Switch
                    checked={isDarkMode}
                    onCheckedChange={setIsDarkMode}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>

                {/* Screen Brightness */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Monitor className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-300">Screen Brightness</p>
                      <p className="text-xs text-gray-500">Brightness: {screenBrightness[0]}%</p>
                    </div>
                  </div>
                  <div className="pl-8">
                    <Slider
                      value={screenBrightness}
                      onValueChange={setScreenBrightness}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-green-400 mb-4">Privacy & Security</h3>

                {/* Location Services */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">Location Services</p>
                      <p className="text-xs text-gray-500">Allow location access</p>
                    </div>
                  </div>
                  <Switch
                    checked={locationServices}
                    onCheckedChange={setLocationServices}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>

                {/* Biometric Auth */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Key className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">Biometric Authentication</p>
                      <p className="text-xs text-gray-500">Use fingerprint or face ID</p>
                    </div>
                  </div>
                  <Switch
                    checked={biometricAuth}
                    onCheckedChange={setBiometricAuth}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>
              </div>
            )}

            {activeTab === "system" && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-green-400 mb-4">System</h3>

                {/* Wi-Fi */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Wifi className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">Wi-Fi</p>
                      <p className="text-xs text-gray-500">{wifiEnabled ? "Connected" : "Disconnected"}</p>
                    </div>
                  </div>
                  <Switch
                    checked={wifiEnabled}
                    onCheckedChange={setWifiEnabled}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>

                {/* Sound Volume */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Volume2 className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-300">Sound</p>
                      <p className="text-xs text-gray-500">Volume: {soundVolume[0]}%</p>
                    </div>
                  </div>
                  <div className="pl-8">
                    <Slider value={soundVolume} onValueChange={setSoundVolume} max={100} step={1} className="w-full" />
                  </div>
                </div>

                {/* Auto Updates */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">Auto Updates</p>
                      <p className="text-xs text-gray-500">Automatically install updates</p>
                    </div>
                  </div>
                  <Switch
                    checked={autoUpdates}
                    onCheckedChange={setAutoUpdates}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>

                {/* Download Source Code */}
                <div className="pt-4 border-t border-gray-800/50">
                  <Button
                    onClick={downloadSourceCode}
                    disabled={isDownloading}
                    className="w-full bg-green-500 hover:bg-green-600 text-black transition-colors neon-glow"
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating ZIP...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download Source Code
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Downloads the complete project source as a ZIP file
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
