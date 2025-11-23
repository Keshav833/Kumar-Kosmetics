"use client"

import { Search } from "lucide-react"
import { useState } from "react"

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="relative">
        <input
          type="text"
          placeholder="Search products, ingredients, or concerns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-6 py-4 bg-white border border-border rounded-full text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
          <Search className="w-5 h-5" />
        </button>
      </div>
    </section>
  )
}
