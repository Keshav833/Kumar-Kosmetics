import { Link } from "react-router-dom"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-semibold mb-4">Kumar Kosmetics</h3>
            <p className="text-sm opacity-90">Premium skincare that understands you.</p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link to="/products">All Products</Link>
              </li>
              <li>
                <Link to="/products?type=skincare">Skincare</Link>
              </li>
              <li>
                <Link to="/products?type=cosmetics">Cosmetics</Link>
              </li>
              <li>
                <Link to="/products?new=true">New Arrivals</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link to="/returns">Returns</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social and Copyright */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm opacity-75">&copy; 2025 Kumar Kosmetics. All rights reserved.</p>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:opacity-75 transition-opacity">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:opacity-75 transition-opacity">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:opacity-75 transition-opacity">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
