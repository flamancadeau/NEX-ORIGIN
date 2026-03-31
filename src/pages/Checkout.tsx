import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/data/storeService";
import { formatPrice } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Minus, Plus, ShoppingBag, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function Checkout() {
    const { items, removeFromCart, updateQuantity, getTotal, checkout, getCount } = useCart();
    const [customerName, setCustomerName] = React.useState("");
    const [customerPhone, setCustomerPhone] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [orderId, setOrderId] = React.useState<string | null>(null);
    const navigate = useNavigate();

    const cartProducts = items.map((item) => {
        const product = getProductById(item.productId);
        const price = product
            ? (product.discountPercentage
                ? Math.round(product.price - (product.price * product.discountPercentage / 100))
                : product.price)
            : 0;
        return { ...item, product, price };
    }).filter((item) => item.product);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const id = checkout(customerName, customerPhone, address);
        if (id) setOrderId(id);
    };

    // Success state
    if (orderId) {
        return (
            <div className="flex flex-col min-h-screen bg-background">
                <Navbar />
                <main className="flex-1 flex items-center justify-center p-6">
                    <div className="text-center space-y-6 max-w-md">
                        <div className="h-20 w-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
                            <CheckCircle className="size-10 text-emerald-500" />
                        </div>
                        <h1 className="text-3xl font-black tracking-tight" style={{ fontFamily: 'var(--font-brand-origin)' }}>
                            Order Placed!
                        </h1>
                        <p className="text-muted-foreground brand-tagline">
                            Your order <span className="font-bold text-foreground">#{orderId.slice(-6)}</span> has been placed successfully. We'll contact you shortly to confirm delivery.
                        </p>
                        <div className="flex gap-3 justify-center pt-4">
                            <Button onClick={() => navigate("/")} className="bg-[#f2d975] text-[#1a1a1b] hover:bg-[#caa149] font-bold brand-tagline rounded-xl">
                                Continue Shopping
                            </Button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    // Empty cart
    if (items.length === 0) {
        return (
            <div className="flex flex-col min-h-screen bg-background">
                <Navbar />
                <main className="flex-1 flex items-center justify-center p-6">
                    <div className="text-center space-y-4">
                        <ShoppingBag className="size-16 text-muted-foreground/20 mx-auto" />
                        <h2 className="text-2xl font-black tracking-tight">Your cart is empty</h2>
                        <p className="text-muted-foreground brand-tagline">Add some products to get started!</p>
                        <Link to="/products" className="inline-block mt-4 text-[#caa149] font-bold brand-tagline hover:underline">
                            Browse Products →
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            <main className="flex-1 pb-20">
                <div className="px-6 md:px-12 py-8 max-w-5xl mx-auto">
                    <Link to="/products" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 brand-tagline">
                        <ArrowLeft className="size-4" /> Continue Shopping
                    </Link>

                    <h1 className="text-3xl font-black tracking-tight mb-8" style={{ fontFamily: 'var(--font-brand-origin)' }}>
                        Checkout ({getCount()} items)
                    </h1>

                    <div className="grid lg:grid-cols-5 gap-10">
                        {/* Cart Items */}
                        <div className="lg:col-span-3 space-y-4">
                            {cartProducts.map(({ productId, quantity, product, price }) => (
                                <div key={productId} className="flex gap-4 p-4 rounded-xl border border-border/50 bg-card">
                                    <div className="h-20 w-20 rounded-lg overflow-hidden bg-muted shrink-0">
                                        <img src={product!.image} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-sm truncate">{product!.name}</h3>
                                        <p className="text-xs text-muted-foreground mt-0.5">{product!.brand}</p>
                                        <div className="flex items-center gap-3 mt-3">
                                            <div className="flex items-center border border-border rounded-lg">
                                                <button onClick={() => updateQuantity(productId, quantity - 1)} className="h-7 w-7 flex items-center justify-center hover:bg-muted">
                                                    <Minus className="size-3" />
                                                </button>
                                                <span className="w-8 text-center text-sm font-bold">{quantity}</span>
                                                <button onClick={() => updateQuantity(productId, quantity + 1)} className="h-7 w-7 flex items-center justify-center hover:bg-muted">
                                                    <Plus className="size-3" />
                                                </button>
                                            </div>
                                            <button onClick={() => removeFromCart(productId)} className="text-muted-foreground hover:text-red-500">
                                                <Trash2 className="size-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <span className="font-bold text-sm">{formatPrice(price * quantity)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary + Form */}
                        <div className="lg:col-span-2">
                            <div className="sticky top-24 rounded-2xl border border-border/50 bg-card p-6 space-y-6">
                                <h3 className="font-bold text-lg">Order Summary</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="font-bold">{formatPrice(getTotal())}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Delivery</span>
                                        <span className="text-emerald-500 font-bold">Free</span>
                                    </div>
                                    <div className="border-t pt-2 flex justify-between text-base">
                                        <span className="font-bold">Total</span>
                                        <span className="font-black">{formatPrice(getTotal())}</span>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-3 pt-2 border-t">
                                    <h4 className="text-xs font-bold uppercase text-muted-foreground brand-tagline">Delivery Details</h4>
                                    <Input
                                        placeholder="Full Name *"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        required
                                        className="brand-tagline rounded-xl"
                                    />
                                    <Input
                                        placeholder="Phone Number *"
                                        value={customerPhone}
                                        onChange={(e) => setCustomerPhone(e.target.value)}
                                        required
                                        className="brand-tagline rounded-xl"
                                    />
                                    <Input
                                        placeholder="Delivery Address (Kigali) *"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                        className="brand-tagline rounded-xl"
                                    />
                                    <Button
                                        type="submit"
                                        className="w-full h-12 rounded-xl bg-[#f2d975] text-[#1a1a1b] hover:bg-[#caa149] font-bold brand-tagline text-base"
                                    >
                                        Place Order
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
