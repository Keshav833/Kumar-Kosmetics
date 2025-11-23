"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import SignupForm from "@/components/auth/signup-form"
import Link from "next/link"

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl p-8 border border-border">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-foreground mb-2">
              Join Our <span className="font-semibold">Community</span>
            </h1>
            <p className="text-muted-foreground">Create your Kumar Kosmetics account</p>
          </div>

          <SignupForm />

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Already have an account?</p>
            <Link href="/login" className="text-primary font-medium hover:underline">
              Sign in here
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-border text-xs text-muted-foreground text-center">
            <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
