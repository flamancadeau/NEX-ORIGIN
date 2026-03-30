import { Link } from "react-router-dom"
import { Phone, Mail, MapPin } from "lucide-react"

/**
 * Footer with NEX ORIGIN brand typography:
 * - Dark background (#000000)
 * - Brand gold accents (#caa149 on dark bg)
 * - Split logo with Bebas Neue / Orbitron fonts
 * - 4 columns: Brand, Categories, Quick Links, Contact
 */
export function Footer() {
    return (
        <footer className="bg-[#000000] text-[#ffffff]">
            <div className="px-6 md:px-12 py-14 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Brand */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#caa149] text-[#000000] font-black text-sm">
                            ⚡
                        </div>
                        <span className="brand-logo text-[#caa149]">
                            <span className="brand-nex text-lg">NEX</span>
                            <span className="brand-origin text-sm">ORIGIN</span>
                        </span>
                    </div>
                    <p className="text-sm text-[#ffffff]/60 leading-relaxed brand-tagline">
                        Your trusted electronics store in Kigali, Rwanda. Quality gadgets at the best prices.
                    </p>
                </div>

                {/* Categories */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#caa149] brand-tagline">Categories</h3>
                    <nav className="flex flex-col gap-2.5">
                        <Link to="/products?category=phones" className="text-sm text-[#ffffff]/60 hover:text-[#f2d975] transition-colors brand-tagline">Phones</Link>
                        <Link to="/products?category=laptops" className="text-sm text-[#ffffff]/60 hover:text-[#f2d975] transition-colors brand-tagline">Laptops</Link>
                        <Link to="/products?category=accessories" className="text-sm text-[#ffffff]/60 hover:text-[#f2d975] transition-colors brand-tagline">Accessories</Link>
                        <Link to="/products?category=watches" className="text-sm text-[#ffffff]/60 hover:text-[#f2d975] transition-colors brand-tagline">Watches</Link>
                    </nav>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#caa149] brand-tagline">Quick Links</h3>
                    <nav className="flex flex-col gap-2.5">
                        <Link to="/products" className="text-sm text-[#ffffff]/60 hover:text-[#f2d975] transition-colors brand-tagline">All Products</Link>
                        <Link to="/products?filter=deals" className="text-sm text-[#ffffff]/60 hover:text-[#f2d975] transition-colors brand-tagline">Promotions</Link>
                        <Link to="/" className="text-sm text-[#ffffff]/60 hover:text-[#f2d975] transition-colors brand-tagline">About Us</Link>
                        <Link to="/" className="text-sm text-[#ffffff]/60 hover:text-[#f2d975] transition-colors brand-tagline">Contact</Link>
                    </nav>
                </div>

                {/* Contact */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#caa149] brand-tagline">Contact</h3>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2.5 text-sm text-[#ffffff]/60">
                            <Phone className="size-4 text-[#f2d975] shrink-0" />
                            <span className="brand-tagline">+250 788 123 456</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm text-[#ffffff]/60">
                            <Mail className="size-4 text-[#f2d975] shrink-0" />
                            <span className="brand-tagline">info@nexorigin.rw</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm text-[#ffffff]/60">
                            <MapPin className="size-4 text-[#f2d975] shrink-0" />
                            <span className="brand-tagline">Kigali, Rwanda</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-[#ffffff]/10 px-6 md:px-12 py-5">
                <p className="text-center text-xs text-[#ffffff]/40 brand-tagline">
                    © 2026 <span className="brand-nex">NEX</span> <span className="brand-origin">ORIGIN</span>. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
