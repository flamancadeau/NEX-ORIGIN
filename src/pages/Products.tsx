import { useSearchParams, Link } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { ProductCard } from "@/components/ProductCard"
import { getProducts, CATEGORIES } from "@/data/storeService"
import { cn } from "@/lib/utils"
import { ChevronRight, LayoutGrid } from "lucide-react"

/**
 * Product Listing Page — matches reference design.
 * - Breadcrumb: Home / All Products
 * - Title + count
 * - Category filter pills (All highlighted in yellow when active)
 * - 4-column product grid
 */
export function Products() {
    const [searchParams] = useSearchParams();
    const categorySlug = searchParams.get("category");
    const searchBarQuery = searchParams.get("search");
    const filterType = searchParams.get("filter");

    const products = getProducts();
    const filteredProducts = products.filter(product => {
        if (categorySlug && product.categorySlug !== categorySlug) return false;
        if (searchBarQuery) {
            const q = searchBarQuery.toLowerCase();
            if (
                !product.name.toLowerCase().includes(q) &&
                !product.description.toLowerCase().includes(q) &&
                !product.brand.toLowerCase().includes(q) &&
                !product.categoryName.toLowerCase().includes(q)
            ) return false;
        }
        if (filterType === "new" && !product.isNew) return false;
        if (filterType === "deals" && !product.discountPercentage) return false;
        return true;
    });

    const activeCategory = CATEGORIES.find(c => c.slug === categorySlug);
    const isAllActive = !categorySlug && !filterType;

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />

            <main className="flex-1 pb-20">
                {/* Breadcrumb */}
                <div className="px-6 md:px-12 py-3 flex items-center gap-2 text-xs font-medium text-muted-foreground border-b border-border/40">
                    <Link to="/" className="hover:text-foreground">Home</Link>
                    <ChevronRight className="size-3" />
                    <span className="text-foreground">{activeCategory ? activeCategory.name : "All Products"}</span>
                </div>

                <div className="px-6 md:px-12 py-8 space-y-8">
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-black tracking-tight">
                            {activeCategory ? activeCategory.name : searchBarQuery ? `Results for "${searchBarQuery}"` : "All Products"}
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">{filteredProducts.length} products found</p>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap items-center gap-2">
                        <FilterPill active={isAllActive} label="All" link="/products" />
                        {CATEGORIES.map(cat => (
                            <FilterPill
                                key={cat.id}
                                active={categorySlug === cat.slug}
                                label={cat.name}
                                link={`/products?category=${cat.slug}`}
                            />
                        ))}
                    </div>

                    {/* Product Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                                <LayoutGrid className="size-8 text-muted-foreground/40" />
                            </div>
                            <h2 className="text-xl font-bold">No products found</h2>
                            <p className="text-muted-foreground max-w-xs text-sm">No products match your current filters.</p>
                            <Link to="/products" className="text-primary font-bold text-sm hover:underline pt-4">Clear all filters</Link>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}

function FilterPill({ active, label, link }: { active: boolean, label: string, link: string }) {
    return (
        <Link
            to={link}
            className={cn(
                "px-4 py-2 rounded-full text-xs font-bold border transition-all",
                active
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-background border-border hover:border-foreground text-foreground"
            )}
        >
            {label}
        </Link>
    )
}
