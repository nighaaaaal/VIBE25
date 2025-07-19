"use client"

import { useEffect, useState } from "react"
import { initializeApp, getApps } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCbwDWSex0bRBF1cdC7N_RUtYjvgxAQ0J4",
  authDomain: "viber-77d9e.firebaseapp.com",
  projectId: "viber-77d9e",
  storageBucket: "viber-77d9e.firebasestorage.app",
  messagingSenderId: "734057273401",
  appId: "1:734057273401:web:e5c26806ff38df2af215e8",
  measurementId: "G-F40MEMJKNX",
}

export function useFirebase() {
  const [firebaseServices, setFirebaseServices] = useState<{
    auth: any
    db: any
    googleProvider: any
  } | null>(null)

  useEffect(() => {
    // Initialize Firebase only on client side
    let app
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig)
    } else {
      app = getApps()[0]
    }

    const auth = getAuth(app)
    const db = getFirestore(app)
    const googleProvider = new GoogleAuthProvider()

    googleProvider.setCustomParameters({
      prompt: "select_account",
    })

    setFirebaseServices({ auth, db, googleProvider })
  }, [])

  return firebaseServices
}
