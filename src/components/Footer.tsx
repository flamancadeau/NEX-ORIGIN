import { Link } from "react-router-dom"
import { Phone, Mail, MapPin } from "lucide-react"

/**
 * Footer matching reference design:
 * - Dark background (slate/charcoal)
 * - 4 columns: Brand, Categories, Quick Links, Contact
 * - Simple copyright bar at bottom
 */
export function Footer() {
    return (
        <footer className="bg-[#1a1d23] text-white">
            <div className="px-6 md:px-12 py-14 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Brand */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-black text-sm">
                            ⚡
                        </div>
                        <span className="font-bold text-lg">NEX ORIGIN</span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Your trusted electronics store in Kigali, Rwanda. Quality gadgets at the best prices.
                    </p>
                </div>

                {/* Categories */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-300">Categories</h3>
                    <nav className="flex flex-col gap-2.5">
                        <Link to="/products?category=phones" className="text-sm text-gray-400 hover:text-white transition-colors">Phones</Link>
                        <Link to="/products?category=laptops" className="text-sm text-gray-400 hover:text-white transition-colors">Laptops</Link>
                        <Link to="/products?category=accessories" className="text-sm text-gray-400 hover:text-white transition-colors">Accessories</Link>
                        <Link to="/products?category=watches" className="text-sm text-gray-400 hover:text-white transition-colors">Watches</Link>
                    </nav>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-300">Quick Links</h3>
                    <nav className="flex flex-col gap-2.5">
                        <Link to="/products" className="text-sm text-gray-400 hover:text-white transition-colors">All Products</Link>
                        <Link to="/products?filter=deals" className="text-sm text-gray-400 hover:text-white transition-colors">Promotions</Link>
                        <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">About Us</Link>
                        <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</Link>
                    </nav>
                </div>

                {/* Contact */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-300">Contact</h3>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2.5 text-sm text-gray-400">
                            <Phone className="size-4 text-primary shrink-0" />
                            <span>+250 788 123 456</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm text-gray-400">
                            <Mail className="size-4 text-primary shrink-0" />
                            <span>info@nexorigin.rw</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm text-gray-400">
                            <MapPin className="size-4 text-primary shrink-0" />
                            <span>Kigali, Rwanda</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700/50 px-6 md:px-12 py-5">
                <p className="text-center text-xs text-gray-500">
                    © 2026 NEX ORIGIN. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
