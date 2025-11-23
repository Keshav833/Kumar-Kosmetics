"use client"

import { Bell, Settings, LogOut } from "lucide-react"

export default function AdminHeader() {
  return (
    <header className="bg-white border-b border-border">
      <div className="flex items-center justify-between px-8 py-4">
        <h1 className="text-lg font-semibold text-foreground">Admin Dashboard</h1>

        <div className="flex items-center gap-6">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <LogOut className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </header>
  )
}
