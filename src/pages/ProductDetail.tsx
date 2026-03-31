import * as React from "react"
import { useParams, Link } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { ProductCard } from "@/components/ProductCard"
import { getProducts } from "@/data/storeService"
import {
    formatPrice,
    calculateFinalPrice,
    generateWhatsAppLink
} from "@/data/mockData"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    ChevronRight,
    MessageCircle,
    ShoppingCart,
    Truck,
    ShieldCheck,
    Star,
    Minus,
    Plus
} from "lucide-react"
import { useCart } from "@/context/CartContext"

export function ProductDetail() {
    const { id } = useParams();
    const products = getProducts();
    const product = products.find(p => p.id === id);
    const [selectedImage, setSelectedImage] = React.useState(product?.image);
    const [quantity, setQuantity] = React.useState(1);
    const { addToCart } = useCart();

    React.useEffect(() => {
        if (product) {
            setSelectedImage(product.image);
            setQuantity(1);
            window.scrollTo(0, 0);
        }
    }, [id, product]);

    if (!product) return <div>Product Not Found</div>;

    const finalPrice = calculateFinalPrice(product.price, product.discountPercentage);
    const totalAmount = finalPrice * quantity;

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product.id);
        }
    };

    const handleWhatsAppOrder = () => {
        const message = `Hi NEX ORIGIN! I'd like to order:\n\n📦 *${product.name}*\n💰 *${formatPrice(finalPrice)}*\n🔢 Quantity: ${quantity}\n💵 Total: *${formatPrice(totalAmount)}*\n\nPlease confirm availability for delivery in Kigali.`;
        window.open(generateWhatsAppLink(product.storePhone, message), "_blank");
    };

    const relatedProducts = products
        .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />

            <main className="flex-1 pb-20">
                {/* Breadcrumb */}
                <div className="bg-muted/30 px-6 md:px-12 py-3 flex items-center gap-2 text-xs font-medium text-muted-foreground border-b border-border/40">
                    <Link to="/" className="hover:text-foreground">Home</Link>
                    <ChevronRight className="size-3" />
                    <Link to="/products" className="hover:text-foreground">Products</Link>
                    <ChevronRight className="size-3" />
                    <span className="text-foreground">{product.name}</span>
                </div>

                <div className="px-6 md:px-12 py-8 max-w-7xl mx-auto">
                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
                        {/* Left: Gallery */}
                        <div className="space-y-4">
                            <div className="aspect-square rounded-2xl overflow-hidden bg-muted border border-border/50 relative">
                                <img
                                    src={selectedImage}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    {product.stockQuantity <= 0 && (
                                        <Badge className="bg-red-500 text-white font-bold px-3 py-1 border-0 rounded-sm shadow-xl">OUT OF STOCK</Badge>
                                    )}
                                    {product.isNew && product.stockQuantity > 0 && (
                                        <Badge className="bg-badge-new text-white font-bold px-3 py-1 border-0 rounded-sm">NEW</Badge>
                                    )}
                                    {product.discountPercentage && product.stockQuantity > 0 && (
                                        <Badge className="bg-badge-promo text-white font-bold px-3 py-1 border-0 rounded-sm">-{product.discountPercentage}% OFF</Badge>
                                    )}
                                </div>
                            </div>
                            {product.galleryImages.length > 1 && (
                                <div className="grid grid-cols-4 gap-3">
                                    {product.galleryImages.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedImage(img)}
                                            className={cn(
                                                "aspect-square rounded-lg overflow-hidden border-2 transition-all",
                                                selectedImage === img ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                                            )}
                                        >
                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right: Info */}
                        <div className="space-y-6">
                            <div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{product.brand}</span>
                                <h1 className="text-3xl md:text-4xl font-black tracking-tight mt-1">{product.name}</h1>
                            </div>

                            {/* Stars */}
                            <div className="flex items-center gap-2">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <span className="text-sm text-muted-foreground">(24 reviews)</span>
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-black">{formatPrice(finalPrice)}</span>
                                {product.oldPrice && (
                                    <span className="text-lg text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>
                                )}
                            </div>

                            <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>

                            {/* Quantity Selector */}
                            <div className="flex items-center gap-4 pt-2">
                                <div className={cn(
                                    "flex items-center border border-border rounded-lg",
                                    product.stockQuantity <= 0 && "opacity-50 pointer-events-none bg-muted/50"
                                )}>
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        disabled={product.stockQuantity <= 0}
                                        className="h-10 w-10 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30"
                                    >
                                        <Minus className="size-4" />
                                    </button>
                                    <span className="w-12 text-center font-bold text-lg">{product.stockQuantity > 0 ? quantity : 0}</span>
                                    <button
                                        onClick={() => setQuantity(q => Math.min(product.stockQuantity, q + 1))}
                                        disabled={product.stockQuantity <= 0}
                                        className="h-10 w-10 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30"
                                    >
                                        <Plus className="size-4" />
                                    </button>
                                </div>
                                <div className="flex flex-col">
                                    <span className={cn(
                                        "text-sm font-bold",
                                        product.stockQuantity > 10 ? "text-emerald-500" : product.stockQuantity > 0 ? "text-yellow-600" : "text-red-500"
                                    )}>
                                        {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : "Out of Stock"}
                                    </span>
                                    {product.stockQuantity > 0 && <span className="text-[10px] text-muted-foreground">Ready for delivery in Kigali</span>}
                                </div>
                            </div>

                            {/* CTAs — matching reference */}
                            <div className="grid grid-cols-5 gap-3 pt-2">
                                <Button
                                    onClick={handleAddToCart}
                                    disabled={product.stockQuantity <= 0}
                                    size="lg"
                                    className={cn(
                                        "col-span-3 h-12 font-bold gap-2 transition-all",
                                        product.stockQuantity > 0
                                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                            : "bg-muted text-muted-foreground cursor-not-allowed"
                                    )}
                                >
                                    {product.stockQuantity > 0 ? (
                                        <>
                                            <ShoppingCart className="size-5" /> Add to Cart
                                        </>
                                    ) : (
                                        "Out of Stock"
                                    )}
                                </Button>
                                <Button
                                    onClick={handleWhatsAppOrder}
                                    size="lg"
                                    variant="outline"
                                    className="col-span-2 h-12 font-bold gap-2 border-whatsapp text-whatsapp hover:bg-whatsapp hover:text-white"
                                >
                                    <MessageCircle className="size-5" /> Order via WhatsApp
                                </Button>
                            </div>

                            {/* Trust markers */}
                            <div className="flex items-center gap-6 pt-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <Truck className="size-4 text-primary" /> Free delivery in Kigali
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <ShieldCheck className="size-4 text-primary" /> Warranty included
                                </div>
                            </div>

                            {/* Specs Table — matching reference 2-column grid */}
                            <div className="space-y-4 pt-6 border-t border-border/40">
                                <h3 className="text-lg font-bold">Specifications</h3>
                                <div className="grid grid-cols-2 gap-px bg-border rounded-lg overflow-hidden">
                                    {product.specs.map((spec, i) => (
                                        <div key={i} className="bg-background px-4 py-3 flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">{spec.key}</span>
                                            <span className="text-sm font-bold text-right">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <section className="space-y-6 pt-16">
                            <h2 className="text-2xl font-black tracking-tight">You may also like</h2>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                                {relatedProducts.map(p => (
                                    <ProductCard key={p.id} product={p} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
