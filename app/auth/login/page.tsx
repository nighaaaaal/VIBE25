"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { GraduationCap, Mail, Shield, CheckCircle, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  getCollegeFromEmail,
  saveUser,
  sendVerificationCode,
  verifyCode,
  generateUserId,
  isValidCollegeEmail,
} from "@/lib/auth"

type VerificationStep = "email" | "verification" | "complete"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [currentStep, setCurrentStep] = useState<VerificationStep>("email")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [detectedCollege, setDetectedCollege] = useState<any>(null)
  const [verificationCode, setVerificationCode] = useState("")
  const [sentCode, setSentCode] = useState("")
  const router = useRouter()

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address")
      }

      // Check if email has .ac.in domain
      if (!isValidCollegeEmail(email)) {
        throw new Error("Please use your official college email address ending with .ac.in")
      }

      // Check if email belongs to a Kerala college
      const college = getCollegeFromEmail(email)
      if (!college) {
        throw new Error(
          "Your college is not yet supported. We currently support major Kerala colleges with .ac.in domains.",
        )
      }

      setDetectedCollege(college)

      // Send verification code
      const code = await sendVerificationCode(email)
      setSentCode(code)

      // Show success message
      console.log(`✅ Verification code sent to ${email}`)
      console.log(`🔢 Your verification code is: ${code}`)

      setCurrentStep("verification")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (!verificationCode || verificationCode.length !== 6) {
        throw new Error("Please enter a valid 6-digit verification code")
      }

      // Verify the code
      const isValid = verifyCode(email, verificationCode)

      if (!isValid) {
        throw new Error("Invalid or expired verification code. Please check the code or request a new one.")
      }

      // Create user data
      const userData = {
        id: generateUserId(),
        email,
        college: detectedCollege,
        verified: true,
        createdAt: new Date().toISOString(),
        displayName: email.split("@")[0], // Use email prefix as display name
      }

      // Save user data
      saveUser(userData)

      console.log("✅ User verified and logged in successfully!")

      setCurrentStep("complete")

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (err: any) {
      console.error("❌ Verification error:", err.message)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const resendCode = async () => {
    try {
      setLoading(true)
      setError("")
      const code = await sendVerificationCode(email)
      setSentCode(code)
      setVerificationCode("") // Clear the input
      console.log("📧 New verification code sent!")
    } catch (err: any) {
      setError("Failed to resend code. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (currentStep === "complete") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Learn.io!</h2>
            <p className="text-gray-600 mb-4">Your account has been verified successfully.</p>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm font-medium text-blue-900">{detectedCollege?.name}</p>
              <p className="text-sm text-blue-700">{detectedCollege?.university}</p>
              <p className="text-xs text-blue-600">{detectedCollege?.location}</p>
            </div>
            <p className="text-sm text-gray-500">Redirecting to your community hub...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentStep === "verification") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl">Check Your Email</CardTitle>
            <CardDescription>
              We've sent a verification code to <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {detectedCollege && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center mb-2">
                  <Shield className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-medium text-green-900">College Verified</span>
                </div>
                <p className="text-sm font-medium text-green-800">{detectedCollege.name}</p>
                <p className="text-sm text-green-700">{detectedCollege.university}</p>
                <p className="text-xs text-green-600">
                  {detectedCollege.location} • {detectedCollege.type}
                </p>
              </div>
            )}

            <form onSubmit={handleVerification} className="space-y-4">
              <div>
                <Label htmlFor="verification">Verification Code</Label>
                <Input
                  id="verification"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  maxLength={6}
                  className="text-center text-lg tracking-widest font-mono"
                  required
                />
                <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800">
                    📧 Check your browser console for the verification code
                  </p>
                  <p className="text-xs text-yellow-700 mt-1">
                    Your code: <span className="font-mono font-bold text-lg">{sentCode}</span>
                  </p>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Verifying..." : "Verify & Continue"}
              </Button>
            </form>

            <div className="text-center mt-4">
              <Button variant="link" onClick={resendCode} disabled={loading} className="text-sm">
                Didn't receive the code? Resend
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl">Welcome to Learn.io</CardTitle>
          <CardDescription>Connect with your college community using your official .ac.in email</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">College Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.name@college.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Use your official college email address ending with <strong>.ac.in</strong>
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying College..." : "Continue"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Supported Colleges</h4>
            <p className="text-xs text-blue-700 mb-2">
              We support Kerala colleges with official .ac.in domains including:
            </p>
            <div className="text-xs text-blue-600 space-y-1">
              <div>• NIT Calicut (nitc.ac.in)</div>
              <div>• CUSAT (cusat.ac.in)</div>
              <div>• CET Trivandrum (cet.ac.in)</div>
              <div>• IIM Kozhikode (iimk.ac.in)</div>
              <div>• And many more Kerala colleges...</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
