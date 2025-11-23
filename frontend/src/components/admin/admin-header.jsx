"use client"

import { Bell, Settings, LogOut, Store } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../../store/useAuthStore"

export default function AdminHeader() {
  const { authUser, logout } = useAuthStore()

  return (
    <header className="bg-white border-b border-border">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-foreground">Admin Dashboard</h1>
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
            <Store className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 mr-2">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-foreground">{authUser?.name || "Admin"}</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </div>

          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-foreground" />
          </button>
          <button onClick={logout} className="p-2 hover:bg-muted rounded-lg transition-colors text-red-500 hover:text-red-600">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
