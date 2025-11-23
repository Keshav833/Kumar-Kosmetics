"use client"

import AdminHeader from "@/components/admin/admin-header"
import AdminSidebar from "@/components/admin/admin-sidebar"
import DashboardOverview from "@/components/admin/dashboard-overview"
import { useState } from "react"
import ProductsManager from "@/components/admin/products-manager"
import OrdersSection from "@/components/admin/orders-section"
import CategoriesSection from "@/components/product/categories-section"
import CustomersSection from "@/components/admin/customers-section"

export default function AdminPage() {
  const [currentSection, setCurrentSection] = useState("overview")
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([
    { id: "#KK-001", customer: "Priya Sharma", date: "2024-11-15", total: 5398, status: "Delivered" },
    { id: "#KK-002", customer: "Aisha Patel", date: "2024-11-14", total: 3299, status: "Processing" },
    { id: "#KK-003", customer: "Neha Gupta", date: "2024-11-13", total: 7597, status: "Shipped" },
    { id: "#KK-004", customer: "Raj Kumar", date: "2024-11-12", total: 2499, status: "Pending" },
  ])

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar currentSection={currentSection} setCurrentSection={setCurrentSection} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />

        <main className="flex-1 overflow-y-auto">
          {currentSection === "overview" && <DashboardOverview products={products} />}
          {currentSection === "products" && <ProductsManager products={products} setProducts={setProducts} />}
          {currentSection === "orders" && <OrdersSection orders={orders} setOrders={setOrders} />}
          {currentSection === "categories" && <CategoriesSection />}
          {currentSection === "customers" && <CustomersSection />}
        </main>
      </div>
    </div>
  )
}
