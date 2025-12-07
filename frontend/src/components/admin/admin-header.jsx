"use client"

import { Store } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../../store/useAuthStore"

export default function AdminHeader() {
  const { authUser } = useAuthStore()

  return (
    <header className="bg-background border-b border-border sticky top-0 z-20">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Header content cleared as requested */}
      </div>
    </header>
  )
}
