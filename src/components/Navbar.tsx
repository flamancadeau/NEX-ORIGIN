import * as React from "react"
import {
    Search,
    ShoppingCart,
    Menu,
    Phone,
    Truck,
    X
} from "lucide-react"
import { Link, useNavigate, useLocation } from "react-router-dom"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CATEGORIES } from "@/data/mockData"
import { useCart } from "@/context/CartContext"

export function Navbar() {
    const [search, setSearch] = React.useState("");
    const [scrolled, setScrolled] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { getCount } = useCart();
    const cartCount = getCount();

    React.useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/products?search=${encodeURIComponent(search.trim())}`);
        }
    };

    return (
        <header className="flex flex-col w-full z-50">
            {/* Top Bar — yellow */}
            <div className="bg-primary text-primary-foreground py-2 px-6 md:px-12 flex items-center justify-between text-[10px] md:text-xs font-bold uppercase tracking-wider">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <Phone className="size-3" /> <span>+250 788 123 456</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 border-l border-primary-foreground/20 pl-4">
                        <Truck className="size-3" /> <span>Free delivery in Kigali on orders over 100,000 FRW</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="hidden md:inline">🇷🇼 Rwanda</span>
                </div>
            </div>

            {/* Main Header — sticky, turns dark on scroll */}
            <div className={cn(
                "sticky top-0 z-40 py-3 px-6 md:px-12 flex items-center justify-between gap-6 transition-all duration-300 border-b",
                scrolled
                    ? "bg-foreground text-background border-foreground shadow-lg"
                    : "bg-background text-foreground border-border/40"
            )}>
                {/* Mobile Menu */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="size-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] p-0">
                        <div className="bg-primary p-6 text-primary-foreground">
                            <div className="flex items-center gap-2 mb-8">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background text-primary font-black">
                                    N
                                </div>
                                <span className="font-black tracking-tighter text-xl">NEX ORIGIN</span>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-widest opacity-70">Shop Categories</h3>
                                <nav className="flex flex-col gap-4">
                                    <Link to="/products" className="text-lg font-bold hover:translate-x-1 transition-transform">
                                        All Products
                                    </Link>
                                    {CATEGORIES.map(cat => (
                                        <Link key={cat.id} to={`/products?category=${cat.slug}`} className="text-lg font-bold hover:translate-x-1 transition-transform">
                                            {cat.name}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 shrink-0">
                    <div className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-lg font-black text-base",
                        scrolled ? "bg-primary text-primary-foreground" : "bg-primary text-primary-foreground"
                    )}>
                        ⚡
                    </div>
                    <span className="font-black tracking-tight text-xl hidden sm:block">NEX ORIGIN</span>
                </Link>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex-1 max-w-lg relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                        placeholder="Search phones, laptops, accessories..."
                        className={cn(
                            "pl-10 h-10 border rounded-lg transition-all",
                            scrolled
                                ? "bg-background/10 border-background/20 text-background placeholder:text-background/50 focus:bg-background/20"
                                : "bg-muted/50 border-transparent focus:bg-background"
                        )}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                        <button type="button" onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                            <X className="size-4" />
                        </button>
                    )}
                </form>

                {/* Cart */}
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="relative rounded-full">
                        <ShoppingCart className="size-5" />
                        <Badge className={cn(
                            "absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] font-bold border-0 rounded-full",
                            cartCount > 0
                                ? "bg-badge-new text-white"
                                : "bg-primary text-primary-foreground"
                        )}>
                            {cartCount}
                        </Badge>
                    </Button>
                </div>
            </div>

            {/* Categories Nav */}
            <nav className={cn(
                "px-6 md:px-12 hidden md:flex items-center gap-8 overflow-x-auto no-scrollbar py-3 border-b transition-all duration-300",
                scrolled
                    ? "bg-foreground/95 text-background border-foreground/80"
                    : "bg-background border-border/40"
            )}>
                <Link
                    to="/products"
                    className={cn(
                        "text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors pb-1 border-b-2 border-transparent",
                        scrolled ? "hover:text-primary" : "hover:text-primary",
                        location.pathname === "/products" && !location.search && "text-primary border-primary"
                    )}
                >
                    All Products
                </Link>
                {CATEGORIES.map(category => (
                    <Link
                        key={category.id}
                        to={`/products?category=${category.slug}`}
                        className={cn(
                            "text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors pb-1 border-b-2 border-transparent",
                            scrolled ? "hover:text-primary" : "hover:text-primary",
                            location.search.includes(category.slug) && "text-primary border-primary"
                        )}
                    >
                        {category.name}
                    </Link>
                ))}
            </nav>
        </header>
    );
}
