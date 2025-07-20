import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbwDWSex0bRBF1cdC7N_RUtYjvgxAQ0J4",
  authDomain: "viber-77d9e.firebaseapp.com",
  projectId: "viber-77d9e",
  storageBucket: "viber-77d9e.firebasestorage.app",
  messagingSenderId: "734057273401",
  appId: "1:734057273401:web:e5c26806ff38df2af215e8",
  measurementId: "G-F40MEMJKNX",
}

// Initialize Firebase only on client side
let app: FirebaseApp
let auth: Auth
let db: Firestore

if (typeof window !== "undefined") {
  // Client-side initialization
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig)
  } else {
    app = getApps()[0]
  }

  auth = getAuth(app)
  db = getFirestore(app)
}

export { auth, db }

// Kerala College Email Domains Mapping
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
  // Add Gmail for testing purposes
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
