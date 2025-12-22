import { Link } from "react-router-dom"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-foreground text-primary-foreground mt-20">
      {/* Background Image with Dark Fade */}
      <div className="absolute inset-0 z-0">
        <img src="/Footer.png" alt="" className="w-full h-full object-cover " />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="ml-4">
            <img src="/darkKumarKosmetics.png " alt="Kumar Kosmetics" className="h-14 w-auto mb-4 opacity-60 hover:opacity-90 transition-opacity duration-300" />
            <p className="text-sm opacity-60 hover:opacity-90 transition-opacity duration-300">Premium skincare that understands you.</p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="opacity-60 hover:opacity-90 transition-opacity duration-300">All Products</Link>
              </li>
              <li>
                <Link to="/products?type=skincare" className="opacity-60 hover:opacity-90 transition-opacity duration-300">Skincare</Link>
              </li>
              <li>
                <Link to="/skin-analyzer" className="opacity-60 hover:opacity-90 transition-opacity duration-300">Skin Analyzer</Link>
              </li>

            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="opacity-60 hover:opacity-90 transition-opacity duration-300">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="opacity-60 hover:opacity-90 transition-opacity duration-300">Contact</Link>
              </li>

              <li>
                <Link to="/careers" className="opacity-60 hover:opacity-90 transition-opacity duration-300">Careers</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="opacity-60 hover:opacity-90 transition-opacity duration-300">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="opacity-60 hover:opacity-90 transition-opacity duration-300">Terms of Service</Link>
              </li>
              <li>
                <Link to="/returns" className="opacity-60 hover:opacity-90 transition-opacity duration-300">Returns</Link>
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
