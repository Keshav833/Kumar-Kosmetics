import { useState } from "react"
import { useAuthStore } from "@/store/useAuthStore"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { User, Package, MapPin, CreditCard, LogOut } from "lucide-react"

export default function Profile() {
  const { authUser, logout } = useAuthStore()
  const [activeTab, setActiveTab] = useState("orders")

  const tabs = [
    { id: "orders", label: "My Orders", icon: Package },
    { id: "addresses", label: "Saved Addresses", icon: MapPin },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "account", label: "Account Details", icon: User },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 border border-border sticky top-24">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-lg">
                  {authUser?.name?.charAt(0) || "U"}
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">{authUser?.name || "User"}</h2>
                  <p className="text-sm text-muted-foreground">{authUser?.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors mt-4"
                >
                  <LogOut className="w-5 h-5" />
                  Log Out
                </button>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl p-8 border border-border min-h-[500px]">
              <h1 className="text-2xl font-semibold text-foreground mb-6">
                {tabs.find((t) => t.id === activeTab)?.label}
              </h1>

              {activeTab === "orders" && (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No orders yet</h3>
                  <p className="text-muted-foreground">Start shopping to see your orders here.</p>
                </div>
              )}

              {activeTab === "addresses" && (
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No saved addresses</h3>
                  <p className="text-muted-foreground">Add an address for faster checkout.</p>
                </div>
              )}

              {activeTab === "payment" && (
                <div className="text-center py-12">
                  <CreditCard className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No payment methods</h3>
                  <p className="text-muted-foreground">Save your payment details for secure checkout.</p>
                </div>
              )}

              {activeTab === "account" && (
                <div className="max-w-md">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue={authUser?.name}
                        className="w-full px-4 py-3 border border-border rounded-lg text-foreground bg-muted/50"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                      <input
                        type="email"
                        defaultValue={authUser?.email}
                        className="w-full px-4 py-3 border border-border rounded-lg text-foreground bg-muted/50"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
