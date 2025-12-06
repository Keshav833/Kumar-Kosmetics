"use client"

import { Store } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../../store/useAuthStore"

export default function AdminHeader() {
  const { authUser } = useAuthStore()

  return (
    <header className="bg-background border-b border-border sticky top-0 z-20">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-foreground">Admin Dashboard</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 mr-2">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-foreground">{authUser?.name || "Admin"}</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </div>

          <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
            <Store className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>
      </div>
    </header>
  )
}
