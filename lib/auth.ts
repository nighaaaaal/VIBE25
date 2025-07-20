import { v4 as uuidv4 } from "uuid"

// Mock user data structure
interface User {
  id: string
  email: string
  college: College | null
  verified: boolean
  createdAt: string
  displayName: string
  profileColor?: string
  graduationYear?: string
  branch?: string
  bio?: string
  location?: string
}

interface College {
  name: string
  university: string
  location: string
  type: string
}

interface Post {
  id: number
  author: string
  email: string
  graduationYear: string
  university: string
  branch: string
  content: string
  media: { type: string; url: string; file: { name: string } } | null
  tags: string[]
  timeAgo: string
  likes: number
  comments: number
}

// Mock database (localStorage for client-side persistence)
const USER_STORAGE_KEY = "learnio_user"
const POSTS_STORAGE_KEY = "learnio_posts"

// Kerala College Email Domains Mapping (expanded for more realism)
export const KERALA_COLLEGES = {
  // Government Engineering Colleges
  "cet.ac.in": {
    name: "College of Engineering Trivandrum",
    university: "University of Kerala",
    location: "Thiruvananthapuram",
    type: "Government Engineering College",
  },
  "ceconline.edu": {
    name: "College of Engineering Chengannur",
    university: "University of Kerala",
    location: "Chengannur",
    type: "Government Engineering College",
  },
  "geck.ac.in": {
    name: "Government Engineering College Kozhikode",
    university: "University of Calicut",
    location: "Kozhikode",
    type: "Government Engineering College",
  },
  "gectcr.ac.in": {
    name: "Government Engineering College Thrissur",
    university: "University of Calicut",
    location: "Thrissur",
    type: "Government Engineering College",
  },
  "rit.ac.in": {
    name: "Rajiv Gandhi Institute of Technology, Kottayam",
    university: "APJ Abdul Kalam Technological University",
    location: "Kottayam",
    type: "Government Engineering College",
  },
  "gecskp.ac.in": {
    name: "Government Engineering College Sreekrishnapuram",
    university: "APJ Abdul Kalam Technological University",
    location: "Palakkad",
    type: "Government Engineering College",
  },

  // NITs and IITs
  "nitc.ac.in": {
    name: "National Institute of Technology Calicut",
    university: "National Institute of Technology Calicut",
    location: "Kozhikode",
    type: "National Institute of Technology",
  },
  "iimk.ac.in": {
    name: "Indian Institute of Management Kozhikode",
    university: "Indian Institute of Management Kozhikode",
    location: "Kozhikode",
    type: "Indian Institute of Management",
  },

  // Universities
  "cusat.ac.in": {
    name: "Cochin University of Science and Technology",
    university: "Cochin University of Science and Technology",
    location: "Kochi",
    type: "State University",
  },
  "mgu.ac.in": {
    name: "Mahatma Gandhi University",
    university: "Mahatma Gandhi University",
    location: "Kottayam",
    type: "State University",
  },
  "uok.ac.in": {
    name: "University of Kerala",
    university: "University of Kerala",
    location: "Thiruvananthapuram",
    type: "State University",
  },
  "kannuruniv.ac.in": {
    name: "Kannur University",
    university: "Kannur University",
    location: "Kannur",
    type: "State University",
  },
  "calicut.ac.in": {
    name: "University of Calicut",
    university: "University of Calicut",
    location: "Malappuram",
    type: "State University",
  },

  // Private Colleges
  "rajagiri.edu": {
    name: "Rajagiri School of Engineering & Technology",
    university: "APJ Abdul Kalam Technological University",
    location: "Kochi",
    type: "Private Engineering College",
  },
  "fisat.ac.in": {
    name: "Federal Institute of Science and Technology",
    university: "APJ Abdul Kalam Technological University",
    location: "Ernakulam",
    type: "Private Engineering College",
  },
  "mbcet.ac.in": {
    name: "Mar Baselios College of Engineering and Technology",
    university: "APJ Abdul Kalam Technological University",
    location: "Thiruvananthapuram",
    type: "Private Engineering College",
  },
  "muthoottech.com": {
    name: "Muthoot Institute of Technology & Science",
    university: "APJ Abdul Kalam Technological University",
    location: "Ernakulam",
    type: "Private Engineering College",
  },
  "amaljyothi.ac.in": {
    name: "Amal Jyothi College of Engineering",
    university: "APJ Abdul Kalam Technological University",
    location: "Kottayam",
    type: "Private Engineering College",
  },
  "sahrdaya.ac.in": {
    name: "Sahrdaya College of Engineering and Technology",
    university: "APJ Abdul Kalam Technological University",
    location: "Thrissur",
    type: "Private Engineering College",
  },
  // Add Gmail for testing purposes (to be removed in production)
  "gmail.com": {
    name: "Test College",
    university: "Test University",
    location: "Test Location",
    type: "Test Institution",
  },
}

// Helper function to get college from email
export const getCollegeFromEmail = (email: string) => {
  const domain = email.split("@")[1]?.toLowerCase()
  return KERALA_COLLEGES[domain as keyof typeof KERALA_COLLEGES] || null
}

// Helper function to validate if email is a college email
export const isValidCollegeEmail = (email: string): boolean => {
  const domain = email.split("@")[1]?.toLowerCase()
  // Allow .ac.in domains and the test gmail.com domain
  return domain.endsWith(".ac.in") || domain.endsWith(".edu") || domain === "gmail.com"
}

// Mock function to send verification code
export const sendVerificationCode = async (email: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const code = Math.floor(100000 + Math.random() * 900000).toString() // 6-digit code
      localStorage.setItem(`verification_code_${email}`, code)
      localStorage.setItem(`verification_code_timestamp_${email}`, Date.now().toString())
      resolve(code)
    }, 1000)
  })
}

// Mock function to verify code
export const verifyCode = (email: string, code: string): boolean => {
  const storedCode = localStorage.getItem(`verification_code_${email}`)
  const storedTimestamp = localStorage.getItem(`verification_code_timestamp_${email}`)

  if (!storedCode || !storedTimestamp) {
    return false
  }

  const fiveMinutes = 5 * 60 * 1000 // 5 minutes in milliseconds
  const isExpired = Date.now() - Number.parseInt(storedTimestamp) > fiveMinutes

  if (isExpired) {
    localStorage.removeItem(`verification_code_${email}`)
    localStorage.removeItem(`verification_code_timestamp_${email}`)
    return false
  }

  return storedCode === code
}

// Mock function to generate a unique user ID
export const generateUserId = (): string => {
  return uuidv4()
}

// Mock function to save user data
export const saveUser = (user: User) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}

// Mock function to get current user
export const getUser = (): User | null => {
  if (typeof window === "undefined") {
    return null
  }
  const userJson = localStorage.getItem(USER_STORAGE_KEY)
  return userJson ? JSON.parse(userJson) : null
}

// Mock function to clear user session
export const clearUser = () => {
  localStorage.removeItem(USER_STORAGE_KEY)
  // Also clear any lingering verification codes
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("verification_code_")) {
      localStorage.removeItem(key)
    }
  })
}

// Function to generate a consistent profile color based on email/name
export const getProfileColor = (identifier: string): string => {
  let hash = 0
  for (let i = 0; i < identifier.length; i++) {
    hash = identifier.charCodeAt(i) + ((hash << 5) - hash)
  }
  let color = "#"
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    color += ("00" + value.toString(16)).substr(-2)
  }
  return color
}

// Function to get initials from a name or email
export const getInitials = (nameOrEmail: string): string => {
  if (!nameOrEmail) return "UN"
  const parts = nameOrEmail.split("@")[0].split(".")
  if (parts.length > 1) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return nameOrEmail.substring(0, 2).toUpperCase()
}

// Mock post management
export const getPosts = (): Post[] => {
  if (typeof window === "undefined") {
    return []
  }
  const postsJson = localStorage.getItem(POSTS_STORAGE_KEY)
  return postsJson ? JSON.parse(postsJson) : []
}

export const savePosts = (posts: Post[]) => {
  localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts))
}

export const addPost = (newPostData: Omit<Post, "id" | "timeAgo" | "likes" | "comments">): Post => {
  const existingPosts = getPosts()
  const newPost: Post = {
    id: existingPosts.length > 0 ? Math.max(...existingPosts.map((p) => p.id)) + 1 : 1,
    timeAgo: "Just now",
    likes: 0,
    comments: 0,
    ...newPostData,
  }
  const updatedPosts = [newPost, ...existingPosts]
  savePosts(updatedPosts)
  return newPost
}
