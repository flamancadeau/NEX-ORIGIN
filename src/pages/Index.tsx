import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { HeroBanner } from "@/components/HeroBanner"
import { CategoryGrid } from "@/components/CategoryGrid"
import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { PRODUCTS } from "@/data/mockData"
import { ArrowRight, Truck, ShieldCheck, Headphones, RotateCcw } from "lucide-react"
import { Link } from "react-router-dom"

export function Index() {
    const newArrivals = PRODUCTS.filter(p => p.isNew).slice(0, 4);
    const hotDeals = PRODUCTS.filter(p => p.discountPercentage).slice(0, 4);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <div className="px-6 md:px-12 pt-6">
                    <HeroBanner />
                </div>

                {/* Features Strip — matching reference with yellow icon circles */}
                <div className="px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-4 py-8 bg-secondary/40 border-y border-border/40 mt-8">
                    <FeatureItem icon={<Truck className="size-5" />} title="Free Delivery" desc="On orders over 100,000 FRW in Kigali" />
                    <FeatureItem icon={<ShieldCheck className="size-5" />} title="Genuine Products" desc="100% authentic electronics" />
                    <FeatureItem icon={<Headphones className="size-5" />} title="24/7 Support" desc="WhatsApp & phone support" />
                    <FeatureItem icon={<RotateCcw className="size-5" />} title="Easy Returns" desc="7-day return policy" />
                </div>

                {/* Shop By Category */}
                <div className="px-6 md:px-12 py-10 space-y-6">
                    <div className="flex items-end justify-between">
                        <h2 className="text-2xl font-black tracking-tight">Shop by Category</h2>
                        <Button asChild variant="ghost" className="font-bold gap-1 text-sm text-primary hover:text-primary/80">
                            <Link to="/products">View All <ArrowRight className="size-4" /></Link>
                        </Button>
                    </div>
                    <CategoryGrid />
                </div>

                {/* New Arrivals */}
                <div className="px-6 md:px-12 py-10 space-y-6">
                    <div className="flex items-end justify-between">
                        <h2 className="text-2xl font-black tracking-tight">New Arrivals</h2>
                        <Button asChild variant="ghost" className="font-bold gap-1 text-sm hover:text-primary">
                            <Link to="/products?filter=new">View All <ArrowRight className="size-4" /></Link>
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                        {newArrivals.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>

                {/* Hot Deals */}
                <div className="px-6 md:px-12 py-10 space-y-6">
                    <div className="flex items-end justify-between">
                        <h2 className="text-2xl font-black tracking-tight">🔥 Hot Deals</h2>
                        <Button asChild variant="ghost" className="font-bold gap-1 text-sm hover:text-primary">
                            <Link to="/products?filter=deals">View All <ArrowRight className="size-4" /></Link>
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                        {hotDeals.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>

                {/* WhatsApp CTA — matching reference exactly */}
                <div className="px-6 md:px-12 py-10">
                    <div className="bg-primary rounded-2xl p-10 md:p-14 flex flex-col items-center text-center space-y-4">
                        <h2 className="text-2xl md:text-3xl font-black text-primary-foreground">
                            Order via WhatsApp — It's Easy!
                        </h2>
                        <p className="text-primary-foreground/70 font-medium text-sm max-w-lg">
                            Browse products, tap the WhatsApp button, and place your order instantly.
                        </p>
                        <Button size="lg" className="rounded-full px-8 h-12 font-bold bg-background text-foreground hover:bg-background/90">
                            Chat with Us on WhatsApp
                        </Button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center text-primary shrink-0">
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="font-bold text-sm">{title}</span>
                <span className="text-[11px] text-muted-foreground">{desc}</span>
            </div>
        </div>
    )
}
