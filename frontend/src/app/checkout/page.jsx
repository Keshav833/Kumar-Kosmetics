"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CheckoutForm from "@/components/checkout/checkout-form"
import OrderReview from "@/components/cart/order-review"
import { useState } from "react"

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [orderData, setOrderData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  })

  const cartItems = [
    {
      id: 1,
      name: "Hydrating Essence Serum",
      price: 2499,
      quantity: 2,
      image: "/hydrating-essence-serum-cosmetics.jpg",
    },
    {
      id: 2,
      name: "Gentle Cleansing Balm",
      price: 1899,
      quantity: 1,
      image: "/cleansing-balm-skincare-product.jpg",
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = Math.round(subtotal * 0.18)
  const shipping = 100
  const total = subtotal + tax + shipping

  const handleFormSubmit = (data) => {
    setOrderData(data)
    setStep(2)
  }

  const handlePayment = () => {
    // Simulate payment
    setStep(3)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* Progress */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-light text-foreground">
              <span className="font-semibold">Checkout</span>
            </h1>
            <span className="text-sm text-muted-foreground">Step {step} of 3</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
          </div>
        </div>

        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CheckoutForm onSubmit={handleFormSubmit} />
            </div>
            <aside className="lg:col-span-1">
              <OrderReview items={cartItems} subtotal={subtotal} tax={tax} shipping={shipping} total={total} />
            </aside>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PaymentForm onSubmit={handlePayment} onBack={() => setStep(1)} />
            </div>
            <aside className="lg:col-span-1">
              <OrderReview items={cartItems} subtotal={subtotal} tax={tax} shipping={shipping} total={total} />
            </aside>
          </div>
        )}

        {step === 3 && <OrderSuccess orderData={orderData} total={total} />}
      </section>

      <Footer />
    </main>
  )
}

function PaymentForm({ onSubmit, onBack }) {
  const [loading, setLoading] = useState(false)

  const handleRazorpayPayment = async () => {
    setLoading(true)
    // Simulate Razorpay integration
    await new Promise((resolve) => setTimeout(resolve, 1500))
    onSubmit()
  }

  return (
    <div className="bg-white rounded-2xl p-8 border border-border">
      <h2 className="text-2xl font-semibold text-foreground mb-6">Payment Method</h2>

      <div className="space-y-4 mb-8">
        <label className="flex items-center gap-3 p-4 border-2 border-primary bg-primary/5 rounded-lg cursor-pointer">
          <input type="radio" name="payment" defaultChecked className="w-4 h-4" />
          <span className="font-medium text-foreground">Credit/Debit Card</span>
        </label>
        <label className="flex items-center gap-3 p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
          <input type="radio" name="payment" className="w-4 h-4" />
          <span className="font-medium text-foreground">UPI</span>
        </label>
        <label className="flex items-center gap-3 p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
          <input type="radio" name="payment" className="w-4 h-4" />
          <span className="font-medium text-foreground">Net Banking</span>
        </label>
      </div>

      <div className="space-y-4">
        <button
          onClick={handleRazorpayPayment}
          disabled={loading}
          className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Processing..." : "Pay with Razorpay"}
        </button>
        <button
          onClick={onBack}
          className="w-full bg-muted text-foreground py-3 rounded-lg font-semibold hover:bg-border transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  )
}

function OrderSuccess({ orderData, total }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl p-8 border border-border text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">✓</span>
          </div>
          <h2 className="text-3xl font-semibold text-foreground mb-2">Order Confirmed!</h2>
          <p className="text-muted-foreground">Thank you for your purchase</p>
        </div>

        <div className="bg-muted rounded-lg p-6 mb-8 text-left space-y-2">
          <div className="flex justify-between">
            <span className="text-foreground font-medium">Order ID:</span>
            <span className="text-foreground">#KK-2024-001789</span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground font-medium">Email:</span>
            <span className="text-foreground">{orderData.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground font-medium">Total Amount:</span>
            <span className="text-lg font-semibold text-primary">₹{total}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-8">
          You'll receive a confirmation email shortly with order details and tracking information.
        </p>

        <div className="flex gap-3">
          <a
            href="/"
            className="flex-1 bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity text-center"
          >
            Back to Home
          </a>
          <a
            href="/products"
            className="flex-1 bg-muted text-foreground py-3 rounded-lg font-medium hover:bg-border transition-colors text-center"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  )
}
