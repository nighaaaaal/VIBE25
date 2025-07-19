"use client"

// Kerala College Email Domains Mapping - Only .ac.in domains
export const KERALA_COLLEGES = {
  // Government Engineering Colleges
  "cet.ac.in": {
    name: "College of Engineering Trivandrum",
    university: "University of Kerala",
    location: "Thiruvananthapuram",
    type: "Government Engineering College",
  },
  "ceconline.ac.in": {
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
  "gecbh.ac.in": {
    name: "Government Engineering College Barton Hill",
    university: "University of Kerala",
    location: "Thiruvananthapuram",
    type: "Government Engineering College",
  },
  "geci.ac.in": {
    name: "Government Engineering College Idukki",
    university: "APJ Abdul Kalam Technological University",
    location: "Idukki",
    type: "Government Engineering College",
  },
  "gecw.ac.in": {
    name: "Government Engineering College Wayanad",
    university: "University of Calicut",
    location: "Wayanad",
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
  "iiser.ac.in": {
    name: "Indian Institute of Science Education and Research",
    university: "Indian Institute of Science Education and Research",
    location: "Thiruvananthapuram",
    type: "Indian Institute of Science Education and Research",
  },

  // State Universities
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
  "ktu.ac.in": {
    name: "APJ Abdul Kalam Technological University",
    university: "APJ Abdul Kalam Technological University",
    location: "Thiruvananthapuram",
    type: "Technological University",
  },

  // Private Colleges with .ac.in domains
  "rajagiri.ac.in": {
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
  "tkmce.ac.in": {
    name: "TKM College of Engineering",
    university: "APJ Abdul Kalam Technological University",
    location: "Kollam",
    type: "Private Engineering College",
  },
  "sjcet.ac.in": {
    name: "St. Joseph's College of Engineering and Technology",
    university: "APJ Abdul Kalam Technological University",
    location: "Palai",
    type: "Private Engineering College",
  },
  "saintgits.ac.in": {
    name: "Saintgits College of Engineering",
    university: "APJ Abdul Kalam Technological University",
    location: "Kottayam",
    type: "Private Engineering College",
  },
  "lbsitw.ac.in": {
    name: "LBS Institute of Technology for Women",
    university: "APJ Abdul Kalam Technological University",
    location: "Thiruvananthapuram",
    type: "Private Engineering College",
  },
  "rit.ac.in": {
    name: "Rajiv Gandhi Institute of Technology",
    university: "APJ Abdul Kalam Technological University",
    location: "Kottayam",
    type: "Private Engineering College",
  },
}

// Helper function to get college from email
export const getCollegeFromEmail = (email: string) => {
  const domain = email.split("@")[1]?.toLowerCase()
  return KERALA_COLLEGES[domain as keyof typeof KERALA_COLLEGES] || null
}

// Helper function to validate if email has .ac.in domain
export const isValidCollegeEmail = (email: string): boolean => {
  const domain = email.split("@")[1]?.toLowerCase()
  return domain?.endsWith(".ac.in") || false
}

// Cookie management functions
export const setCookie = (name: string, value: string, days = 7) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null

  const nameEQ = name + "="
  const ca = document.cookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === " ") c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
}

// User management functions
export const saveUser = (userData: any) => {
  const userString = JSON.stringify(userData)
  setCookie("learnio_user", userString, 30) // 30 days
  localStorage.setItem("learnio_user", userString)
}

export const getUser = () => {
  if (typeof window === "undefined") return null

  // Try localStorage first, then cookie
  let userString = localStorage.getItem("learnio_user")
  if (!userString) {
    userString = getCookie("learnio_user")
  }

  if (userString) {
    try {
      return JSON.parse(userString)
    } catch (error) {
      console.error("Error parsing user data:", error)
      return null
    }
  }
  return null
}

export const clearUser = () => {
  deleteCookie("learnio_user")
  localStorage.removeItem("learnio_user")
}

// Generate a simple user ID
export const generateUserId = () => {
  return "user_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now()
}

// Simulate email verification
export const sendVerificationCode = async (email: string): Promise<string> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Generate a simple verification code
  const code = Math.floor(100000 + Math.random() * 900000).toString()

  // Store the code in localStorage for persistence across page reloads
  localStorage.setItem(`verification_code_${email}`, code)
  localStorage.setItem(`verification_timestamp_${email}`, Date.now().toString())

  // Also log it clearly in console
  console.log(`🔐 VERIFICATION CODE FOR ${email}: ${code}`)
  console.log(`📧 Copy this code: ${code}`)

  return code
}

// Update the verifyCode function to check localStorage
export const verifyCode = (email: string, inputCode: string): boolean => {
  const storedCode = localStorage.getItem(`verification_code_${email}`)
  const timestamp = localStorage.getItem(`verification_timestamp_${email}`)

  // Check if code exists and is not expired (10 minutes)
  if (!storedCode || !timestamp) {
    return false
  }

  const codeAge = Date.now() - Number.parseInt(timestamp)
  const tenMinutes = 10 * 60 * 1000

  if (codeAge > tenMinutes) {
    // Code expired, clean up
    localStorage.removeItem(`verification_code_${email}`)
    localStorage.removeItem(`verification_timestamp_${email}`)
    return false
  }

  const isValid = storedCode === inputCode.trim()

  if (isValid) {
    // Clean up after successful verification
    localStorage.removeItem(`verification_code_${email}`)
    localStorage.removeItem(`verification_timestamp_${email}`)
  }

  return isValid
}
