import { useState, useEffect } from "react"
import axiosInstance from "../lib/axios"
import toast from "react-hot-toast"
import AdminHeader from "@/components/admin/admin-header"
import AdminSidebar from "@/components/admin/admin-sidebar"
import DashboardOverview from "../components/admin/dashboard-overview"
import ProductsManager from "@/components/admin/products-manager"
import OrdersSection from "@/components/admin/orders-section"
import CategoriesSection from "@/components/product/categories-section"
import CustomersSection from "@/components/admin/customers-section"
import AdminContactMessages from "@/components/admin/AdminContactMessages"

export default function Admin() {
  const [currentSection, setCurrentSection] = useState("overview")
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products");
        setProducts(res.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get("/orders/admin");
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders");
      }
    };
    if (currentSection === "orders" || currentSection === "overview") {
        fetchOrders();
    }
  }, [currentSection]);

  const [customers, setCustomers] = useState([])

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axiosInstance.get("/auth/users");
        setCustomers(res.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
        toast.error("Failed to fetch customers");
      }
    };
    if (currentSection === "customers" || currentSection === "overview") {
        fetchCustomers();
    }
  }, [currentSection]);

  return (
    <div className="flex h-screen bg-slate-900">
      <AdminSidebar currentSection={currentSection} setCurrentSection={setCurrentSection} />

      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 rounded-l-2xl shadow-2xl my-2 mr-2">
        
        <main className="flex-1 overflow-y-auto">
          {currentSection === "overview" && <DashboardOverview products={products} orders={orders} customers={customers} />}
          {currentSection === "products" && <ProductsManager products={products} setProducts={setProducts} />}
          {currentSection === "orders" && <OrdersSection orders={orders} setOrders={setOrders} />}
          {currentSection === "categories" && <CategoriesSection />}
          {currentSection === "customers" && <CustomersSection customers={customers} />}
          {currentSection === "messages" && <AdminContactMessages />}
        </main>
      </div>
    </div>
  )
}
