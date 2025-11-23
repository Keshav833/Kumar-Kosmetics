import { Link } from "react-router-dom"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import LoginForm from "@/components/auth/login-form"

export default function Login() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl p-8 border border-border">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-foreground mb-2">
              Welcome <span className="font-semibold">Back</span>
            </h1>
            <p className="text-muted-foreground">Sign in to your Kumar Kosmetics account</p>
          </div>

          <LoginForm />

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Don't have an account?</p>
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Create one now
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot your password?
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
