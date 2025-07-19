"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Bell,
  Heart,
  MessageCircle,
  Share2,
  Paperclip,
  ImageIcon,
  GraduationCap,
  MapPin,
  LogOut,
  Settings,
  Send,
  Users,
  Calendar,
  BookOpen,
  TrendingUp,
  Video,
  FileText,
  Plus,
  Eye,
  MoreHorizontal,
} from "lucide-react"
import AuthGuard from "@/components/auth-guard"
import MacosSettingsPanel from "@/components/MacosSettingsPanel"
import NotificationPanel from "@/components/NotificationPanel"
import ProfilePanel from "@/components/ProfilePanel"
import MediaUpload from "@/components/MediaUpload"
import LogoutConfirmation from "@/components/LogoutConfirmation"
import { useRouter } from "next/navigation"
import { getUser, clearUser, getProfileColor, getInitials, addPost, getPosts, savePosts } from "@/lib/auth"
import { keralaMemberData, samplePosts, collegeEvents, studyGroups } from "@/lib/data"

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [postContent, setPostContent] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState<any>(null)
  const [showMediaUpload, setShowMediaUpload] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<any>(null)
  const [posts, setPosts] = useState(samplePosts)
  const [activeTab, setActiveTab] = useState("feed")
  const router = useRouter()

  useEffect(() => {
    const user = getUser()
    if (user) {
      setCurrentUser(user)
    }

    // Load posts from localStorage or use sample data
    const savedPosts = getPosts()
    if (savedPosts.length > 0) {
      setPosts(savedPosts)
    } else {
      savePosts(samplePosts)
    }
  }, [])

  const handleLogout = () => {
    clearUser()
    router.push("/auth/login")
  }

  const handlePost = () => {
    if (!postContent.trim() && !selectedMedia) return

    const newPost = {
      author: currentUser?.displayName || currentUser?.email?.split("@")[0] || "Anonymous",
      email: currentUser?.email || "",
      graduationYear: currentUser?.graduationYear || "Current Student",
      university: currentUser?.college?.name || "Unknown University",
      branch: currentUser?.branch || "General",
      content: postContent,
      media: selectedMedia,
      tags: extractTags(postContent),
    }

    const createdPost = addPost(newPost)
    setPosts((prev) => [createdPost, ...prev])
    setPostContent("")
    setSelectedMedia(null)
  }

  const extractTags = (content: string): string[] => {
    const hashtags = content.match(/#\w+/g) || []
    return hashtags.map((tag) => tag.substring(1))
  }

  const handleMediaSelect = (media: any) => {
    setSelectedMedia(media)
  }

  const handleLike = (postId: number) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)))
    savePosts(posts)
  }

  const filterOptions = ["All", "Alumni", "Seniors", "Juniors"]

  const filteredMembers = keralaMemberData.filter((member) => {
    if (activeFilter === "All") return true
    if (activeFilter === "Alumni")
      return member.graduationYear.includes("2023") || member.graduationYear.includes("2022")
    if (activeFilter === "Seniors")
      return member.graduationYear.includes("2024") || member.graduationYear.includes("2025")
    if (activeFilter === "Juniors")
      return member.graduationYear.includes("2026") || member.graduationYear.includes("2027")
    return true
  })

  const filteredPosts = posts.filter(
    (post) =>
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const tabs = [
    { id: "feed", label: "Feed", icon: TrendingUp },
    { id: "events", label: "Events", icon: Calendar },
    { id: "groups", label: "Study Groups", icon: BookOpen },
  ]

  return (
    <AuthGuard>
      <div className="min-h-screen bg-black text-gray-100">
        {/* Header */}
        <header className="glass-effect border-b border-gray-800 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center neon-glow">
                  <GraduationCap className="w-6 h-6 text-black font-bold" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-green-400">Learn.io</span>
                </div>
              </div>

              {/* Center Search */}
              <div className="hidden md:block flex-1 max-w-md mx-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search posts, people..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-700 focus:border-green-400 text-gray-100 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-gray-800"
                  onClick={() => setShowNotifications(true)}
                >
                  <Bell className="w-5 h-5 text-gray-400" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-gray-800" onClick={() => setShowSettings(true)}>
                  <Settings className="w-5 h-5 text-gray-400" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-800"
                  onClick={() => setShowLogoutConfirm(true)}
                >
                  <LogOut className="w-5 h-5 text-gray-400" />
                </Button>
                <div
                  className="profile-avatar cursor-pointer hover:scale-105 transition-transform"
                  style={{ backgroundColor: getProfileColor(currentUser?.email || "user") }}
                  onClick={() => {
                    setSelectedProfile(currentUser)
                    setShowProfile(true)
                  }}
                >
                  {getInitials(currentUser?.displayName || currentUser?.email || "User")}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* College Info Banner */}
        {currentUser?.college && (
          <div className="bg-gradient-to-r from-blue-600/20 to-green-500/20 border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
              <div className="flex items-center justify-center space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">
                  {currentUser.college.name} • {currentUser.college.location}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-green-400 text-green-400"
                      : "border-transparent text-gray-400 hover:text-gray-300"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {activeTab === "feed" && (
                <>
                  {/* Create Post */}
                  <Card className="floating-card">
                    <CardContent className="p-4">
                      <div className="flex space-x-3">
                        <div
                          className="profile-avatar"
                          style={{ backgroundColor: getProfileColor(currentUser?.email || "user") }}
                        >
                          {getInitials(currentUser?.displayName || currentUser?.email || "User")}
                        </div>
                        <div className="flex-1">
                          <Textarea
                            placeholder={`What's happening, ${currentUser?.displayName || currentUser?.email?.split("@")[0] || "Student"}?`}
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                            className="bg-gray-800/50 border-gray-700 focus:border-green-400 text-gray-100 placeholder-gray-400 resize-none"
                            rows={3}
                          />

                          {selectedMedia && (
                            <div className="mt-3 relative">
                              <div className="bg-gray-800 rounded-lg p-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    {selectedMedia.type === "image" && <ImageIcon className="w-4 h-4 text-green-400" />}
                                    {selectedMedia.type === "video" && <Video className="w-4 h-4 text-green-400" />}
                                    {selectedMedia.type === "file" && <FileText className="w-4 h-4 text-green-400" />}
                                    <span className="text-sm text-gray-300">{selectedMedia.file.name}</span>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedMedia(null)}
                                    className="text-gray-400 hover:text-red-400"
                                  >
                                    ×
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 hover:text-green-400"
                                onClick={() => setShowMediaUpload(true)}
                              >
                                <Plus className="w-4 h-4 mr-1" />
                                Media
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-green-400">
                                <Paperclip className="w-4 h-4 mr-1" />
                                Attach
                              </Button>
                            </div>
                            <Button
                              onClick={handlePost}
                              disabled={!postContent.trim() && !selectedMedia}
                              className="bg-green-500 hover:bg-green-600 text-black disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Send className="w-4 h-4 mr-2" />
                              Post
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Feed Posts */}
                  <div className="space-y-4">
                    {filteredPosts.map((post) => (
                      <Card key={post.id} className="floating-card hover:border-gray-700 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex space-x-3">
                            <div
                              className="profile-avatar cursor-pointer hover:scale-105 transition-transform"
                              style={{ backgroundColor: getProfileColor(post.email || post.author) }}
                              onClick={() => {
                                const member = keralaMemberData.find((m) => m.email === post.email)
                                if (member) {
                                  setSelectedProfile(member)
                                  setShowProfile(true)
                                }
                              }}
                            >
                              {getInitials(post.author)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-semibold text-gray-100">{post.author}</h3>
                                <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-400">
                                  {post.graduationYear}
                                </Badge>
                                {post.branch && (
                                  <Badge variant="outline" className="text-xs border-green-400 text-green-400">
                                    {post.branch}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center text-sm text-gray-500 mb-3">
                                <MapPin className="w-3 h-3 mr-1" />
                                {post.university}
                                <span className="mx-2">•</span>
                                {post.timeAgo}
                              </div>
                              <p className="text-gray-300 leading-relaxed mb-4">{post.content}</p>

                              {post.media && (
                                <div className="mb-4 rounded-lg overflow-hidden bg-gray-800">
                                  {post.media.type === "image" && (
                                    <img
                                      src={post.media.url || "/placeholder.svg"}
                                      alt="Post media"
                                      className="w-full h-64 object-cover"
                                    />
                                  )}
                                  {post.media.type === "video" && (
                                    <video src={post.media.url} controls className="w-full h-64" />
                                  )}
                                </div>
                              )}

                              {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {post.tags.map((tag: string, index: number) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="text-xs border-green-400/50 text-green-400"
                                    >
                                      #{tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}

                              <div className="flex items-center space-x-6 pt-3 border-t border-gray-800">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-400 hover:text-red-400 transition-colors"
                                  onClick={() => handleLike(post.id)}
                                >
                                  <Heart className="w-4 h-4 mr-2" />
                                  {post.likes}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-400 hover:text-blue-400 transition-colors"
                                >
                                  <MessageCircle className="w-4 h-4 mr-2" />
                                  {post.comments}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-400 hover:text-green-400 transition-colors"
                                >
                                  <Share2 className="w-4 h-4 mr-2" />
                                  Share
                                </Button>
                                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300 ml-auto">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}

              {activeTab === "events" && (
                <div className="space-y-4">
                  {collegeEvents.map((event) => (
                    <Card key={event.id} className="floating-card">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-green-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-100 mb-1">{event.title}</h3>
                            <p className="text-green-400 text-sm mb-2">{event.date}</p>
                            <p className="text-gray-400 text-sm mb-2">
                              {event.location} • {event.type}
                            </p>
                            <p className="text-gray-300">{event.description}</p>
                            <div className="flex space-x-3 mt-4">
                              <Button size="sm" className="bg-green-500 hover:bg-green-600 text-black">
                                Register
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-600 text-gray-300 bg-transparent"
                              >
                                Learn More
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === "groups" && (
                <div className="space-y-4">
                  {studyGroups.map((group) => (
                    <Card key={group.id} className="floating-card">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-100 mb-1">{group.name}</h3>
                            <p className="text-blue-400 text-sm mb-2">{group.subject}</p>
                            <p className="text-gray-400 text-sm mb-2">
                              {group.members} members • Next: {group.nextMeeting}
                            </p>
                            <p className="text-gray-300">{group.description}</p>
                            <div className="flex space-x-3 mt-4">
                              <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                                <Users className="w-4 h-4 mr-2" />
                                Join Group
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-600 text-gray-300 bg-transparent"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Member Directory */}
              <Card className="floating-card">
                <CardHeader className="pb-3">
                  <h2 className="text-lg font-semibold text-green-400">Community Members</h2>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {filterOptions.map((filter) => (
                      <Button
                        key={filter}
                        variant={activeFilter === filter ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveFilter(filter)}
                        className={`transition-colors ${
                          activeFilter === filter
                            ? "bg-green-500 hover:bg-green-600 text-black"
                            : "border-gray-600 text-gray-400 hover:text-green-400 hover:border-green-400"
                        }`}
                      >
                        {filter}
                      </Button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="pt-0 max-h-96 overflow-y-auto">
                  <div className="space-y-3">
                    {filteredMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedProfile(member)
                          setShowProfile(true)
                        }}
                      >
                        <div className="profile-avatar" style={{ backgroundColor: getProfileColor(member.email) }}>
                          {getInitials(member.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-100 truncate">{member.name}</h4>
                          <p className="text-sm text-gray-400">{member.graduationYear}</p>
                          <p className="text-xs text-gray-500 truncate">{member.bio}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {member.location}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs border-gray-600 text-gray-400 hover:bg-green-500/20 hover:text-green-400 hover:border-green-400 bg-transparent"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle connect action
                          }}
                        >
                          Connect
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Community Stats */}
              <Card className="floating-card bg-gradient-to-r from-blue-600/20 to-green-500/20">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 text-green-400">Community Stats</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Members</span>
                      <span className="font-semibold text-green-400">2,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Active Today</span>
                      <span className="font-semibold text-green-400">342</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Posts This Week</span>
                      <span className="font-semibold text-green-400">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Study Groups</span>
                      <span className="font-semibold text-green-400">23</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="floating-card">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 text-green-400">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Find Study Partners
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Upcoming Events
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Join Study Group
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Modals */}
        {showSettings && <MacosSettingsPanel onClose={() => setShowSettings(false)} />}
        {showNotifications && <NotificationPanel onClose={() => setShowNotifications(false)} />}
        {showProfile && selectedProfile && (
          <ProfilePanel user={selectedProfile} onClose={() => setShowProfile(false)} />
        )}
        {showMediaUpload && <MediaUpload onMediaSelect={handleMediaSelect} onClose={() => setShowMediaUpload(false)} />}
        {showLogoutConfirm && (
          <LogoutConfirmation onConfirm={handleLogout} onCancel={() => setShowLogoutConfirm(false)} />
        )}
      </div>
    </AuthGuard>
  )
}
