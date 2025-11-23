"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import ForgotPasswordForm from "@/components/auth/forgot-password-form"
import Link from "next/link"

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl p-8 border border-border">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-foreground mb-2">
              Reset Your <span className="font-semibold">Password</span>
            </h1>
            <p className="text-muted-foreground">Enter your email and we'll send you a reset link</p>
          </div>

          <ForgotPasswordForm />

          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm text-primary hover:underline">
              Back to login
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
