import { useState } from "react"
import { Eye, EyeOff, Loader } from "lucide-react"
import { useAuthStore } from "../../store/useAuthStore"

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { signup, signingUp } = useAuthStore()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    if (!formData.agreeToTerms) {
      alert('Please agree to terms')
      return
    }

    signup(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
          className="w-full px-4 py-3 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          className="w-full px-4 py-3 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="w-full px-4 py-3 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
        <input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
          required
          className="w-full px-4 py-3 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
        />
      </div>

      {/* Agree to Terms */}
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleChange}
          className="w-4 h-4 rounded border-border mt-1"
        />
        <span className="text-xs text-foreground leading-relaxed">
          I agree to Kumar Kosmetics' Terms of Service and Privacy Policy
        </span>
      </label>

      {/* Submit */}
      <button
        type="submit"
        disabled={signingUp}
        className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-6 flex justify-center items-center"
      >
        {signingUp ? (
          <>
            <Loader className="mr-2 h-5 w-5 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create Account"
        )}
      </button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-muted-foreground">or continue with</span>
        </div>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          Google
        </button>
        <button
          type="button"
          className="py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          Apple
        </button>
      </div>
    </form>
  )
}
