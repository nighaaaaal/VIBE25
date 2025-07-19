"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
} from "lucide-react"
import AuthGuard from "@/components/auth-guard"
import { useRouter } from "next/navigation"
import { getUser, clearUser } from "@/lib/auth"

// Sample data for Kerala colleges
const keralaMemberData = [
  {
    id: 1,
    name: "Arjun Nair",
    avatar: "/placeholder.svg?height=40&width=40",
    graduationYear: "Class of 2024",
    bio: "Computer Science | Cochin University",
    university: "Cochin University of Science and Technology",
    location: "Kochi",
  },
  {
    id: 2,
    name: "Meera Krishnan",
    avatar: "/placeholder.svg?height=40&width=40",
    graduationYear: "Class of 2025",
    bio: "Electronics Engineering | NIT Calicut",
    university: "National Institute of Technology Calicut",
    location: "Kozhikode",
  },
  {
    id: 3,
    name: "Vishnu Pillai",
    avatar: "/placeholder.svg?height=40&width=40",
    graduationYear: "Class of 2026",
    bio: "Mechanical Engineering | CET",
    university: "College of Engineering Trivandrum",
    location: "Thiruvananthapuram",
  },
  {
    id: 4,
    name: "Anjali Menon",
    avatar: "/placeholder.svg?height=40&width=40",
    graduationYear: "Class of 2023",
    bio: "MBA | IIM Kozhikode",
    university: "Indian Institute of Management Kozhikode",
    location: "Kozhikode",
  },
  {
    id: 5,
    name: "Karthik Raj",
    avatar: "/placeholder.svg?height=40&width=40",
    graduationYear: "Class of 2025",
    bio: "Information Technology | MG University",
    university: "Mahatma Gandhi University",
    location: "Kottayam",
  },
  {
    id: 6,
    name: "Priya Varma",
    avatar: "/placeholder.svg?height=40&width=40",
    graduationYear: "Class of 2024",
    bio: "Biotechnology | University of Kerala",
    university: "University of Kerala",
    location: "Thiruvananthapuram",
  },
]

const samplePosts = [
  {
    id: 1,
    author: "Arjun Nair",
    avatar: "/placeholder.svg?height=40&width=40",
    graduationYear: "Class of 2024",
    university: "Cochin University of Science and Technology",
    content:
      "Just landed my first internship at a tech startup in Bangalore! The key was building projects consistently and networking with alumni. Happy to share my experience with juniors who are preparing for placements.",
    likes: 24,
    comments: 8,
    timeAgo: "2 hours ago",
  },
  {
    id: 2,
    author: "Meera Krishnan",
    avatar: "/placeholder.svg?height=40&width=40",
    graduationYear: "Class of 2025",
    university: "National Institute of Technology Calicut",
    content:
      "Organizing a coding bootcamp for first-year students next weekend! We'll cover Python basics, data structures, and web development fundamentals. DM me if you're interested in joining. Limited seats available! 💻",
    likes: 31,
    comments: 12,
    timeAgo: "4 hours ago",
  },
  {
    id: 3,
    author: "Vishnu Pillai",
    avatar: "/placeholder.svg?height=40&width=40",
    graduationYear: "Class of 2026",
    university: "College of Engineering Trivandrum",
    content:
      "Reminder: The IEEE student chapter meeting is tomorrow at 4 PM in the main auditorium. We'll be discussing upcoming technical events and the annual tech fest. All members are requested to attend!",
    likes: 18,
    comments: 5,
    timeAgo: "6 hours ago",
  },
]

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [postContent, setPostContent] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentUser, setCurrentUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const user = getUser()
    if (user) {
      setCurrentUser(user)
    }
  }, [])

  const handleLogout = () => {
    clearUser()
    router.push("/auth/login")
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

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Learn.io</span>
              </div>

              {/* Center Title */}
              <div className="hidden md:block">
                <h1 className="text-lg font-semibold text-gray-900">
                  {currentUser?.college?.name || "Kerala Engineering Colleges"} - Community Hub
                </h1>
              </div>

              {/* Right Section */}
              <div className="flex items-center space-x-4">
                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64 bg-gray-50 border-gray-200 focus:bg-white"
                  />
                </div>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </Button>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="w-5 h-5 text-gray-600" />
                </Button>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>{currentUser?.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* User College Info Banner */}
        {currentUser?.college && (
          <div className="bg-blue-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
              <div className="flex items-center justify-center space-x-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>
                  {currentUser.college.name} • {currentUser.college.location} • {currentUser.college.type}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Community Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Create Post */}
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>{currentUser?.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder={`What's on your mind, ${currentUser?.displayName || currentUser?.email?.split("@")[0] || "Student"}?`}
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        className="border-gray-200 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={3}
                      />
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                            <Paperclip className="w-4 h-4 mr-1" />
                            Attach
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                            <ImageIcon className="w-4 h-4 mr-1" />
                            Photo
                          </Button>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Post</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Feed Posts */}
              <div className="space-y-4">
                {samplePosts.map((post) => (
                  <Card
                    key={post.id}
                    className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={post.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {post.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{post.author}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {post.graduationYear}
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <MapPin className="w-3 h-3 mr-1" />
                            {post.university}
                            <span className="mx-2">•</span>
                            {post.timeAgo}
                          </div>
                          <p className="text-gray-800 leading-relaxed mb-4">{post.content}</p>
                          <div className="flex items-center space-x-6 pt-3 border-t border-gray-100">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-600 hover:text-red-600 transition-colors"
                            >
                              <Heart className="w-4 h-4 mr-2" />
                              {post.likes}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-600 hover:text-blue-600 transition-colors"
                            >
                              <MessageCircle className="w-4 h-4 mr-2" />
                              {post.comments}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-600 hover:text-green-600 transition-colors"
                            >
                              <Share2 className="w-4 h-4 mr-2" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Column - Member Directory */}
            <div className="space-y-6">
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-3">
                  <h2 className="text-lg font-semibold text-gray-900">Members</h2>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {filterOptions.map((filter) => (
                      <Button
                        key={filter}
                        variant={activeFilter === filter ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveFilter(filter)}
                        className={`transition-colors ${
                          activeFilter === filter
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "text-gray-600 hover:text-blue-600 hover:border-blue-600"
                        }`}
                      >
                        {filter}
                      </Button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {filteredMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">{member.name}</h4>
                          <p className="text-sm text-gray-500">{member.graduationYear}</p>
                          <p className="text-xs text-gray-400 truncate">{member.bio}</p>
                          <div className="flex items-center text-xs text-gray-400 mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {member.location}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 bg-transparent"
                        >
                          View Profile
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Community Stats */}
              <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Community Stats</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-blue-100">Total Members</span>
                      <span className="font-semibold">2,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-100">Active Today</span>
                      <span className="font-semibold">342</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-100">Posts This Week</span>
                      <span className="font-semibold">156</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
