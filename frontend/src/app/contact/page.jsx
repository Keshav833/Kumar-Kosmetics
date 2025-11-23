"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Mail, Phone, Instagram, Linkedin, Twitter, Facebook } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (formData.phone && !/^\d{10,}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Please select a subject"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for reaching out. We will get back to you soon.",
      })

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 slide-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We'd love to hear from you. Send us a message and we'll get back soon.
          </p>
        </div>

        {/* Form and Sidebar */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-card rounded-lg p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 transition-all ${
                    errors.name ? "border-destructive focus:ring-destructive" : "border-input focus:ring-primary"
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-destructive text-sm mt-2">{errors.name}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 transition-all ${
                    errors.email ? "border-destructive focus:ring-destructive" : "border-input focus:ring-primary"
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-destructive text-sm mt-2">{errors.email}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">Subject *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 transition-all ${
                    errors.subject ? "border-destructive focus:ring-destructive" : "border-input focus:ring-primary"
                  }`}
                >
                  <option value="">Select a subject</option>
                  <option value="product-inquiry">Product Inquiry</option>
                  <option value="feedback">Feedback</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="support">Support</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && <p className="text-destructive text-sm mt-2">{errors.subject}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.message ? "border-destructive focus:ring-destructive" : "border-input focus:ring-primary"
                  }`}
                  placeholder="Your message here..."
                />
                {errors.message && <p className="text-destructive text-sm mt-2">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Info Sidebar */}
          <div>
            <div className="bg-card rounded-lg p-8 border border-border sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Mail className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Get In Touch</h3>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="font-medium text-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    +91 800-BEAUTY-1
                  </p>
                  <p className="text-muted-foreground text-sm ml-6">Mon-Fri, 9AM-6PM IST</p>
                </div>
                <div>
                  <p className="font-medium text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    info@kumarkosmetics.com
                  </p>
                  <p className="text-muted-foreground text-sm ml-6">24-hour response</p>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h4 className="font-semibold text-foreground mb-3">Follow Us</h4>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
