import * as React from "react"
import { ShoppingCart, MessageCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
    formatPrice,
    calculateFinalPrice,
    generateWhatsAppLink
} from "@/data/mockData"
import type { Product } from "@/data/mockData"
import { Link } from "react-router-dom"
import { useCart } from "@/context/CartContext"

interface ProductCardProps {
    product: Product
    className?: string
}

/**
 * Product Card matching the reference design exactly:
 * - Image with NEW / discount badges
 * - "BRAND · CATEGORY" label
 * - Product name
 * - Price with old price strikethrough
 * - "Add to Cart" button + WhatsApp icon button
 */
export function ProductCard({ product, className }: ProductCardProps) {
    const finalPrice = calculateFinalPrice(product.price, product.discountPercentage);
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product.id);
    };

    const handleWhatsAppOrder = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const message = `Hi! I'm interested in ${product.name} (${formatPrice(finalPrice)}). Is it available?`;
        window.open(generateWhatsAppLink(product.storePhone, message), "_blank");
    };

    return (
        <Link to={`/products/${product.id}`} className="block group">
            <Card className={cn(
                "overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg bg-card",
                className
            )}>
                <CardHeader className="p-0 relative aspect-square overflow-hidden bg-muted">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {product.isNew && (
                            <Badge className="bg-badge-new hover:bg-badge-new text-white border-0 font-bold px-2.5 py-0.5 text-[10px] rounded-sm">
                                NEW
                            </Badge>
                        )}
                        {product.discountPercentage && (
                            <Badge className="bg-badge-promo hover:bg-badge-promo text-white border-0 font-bold px-2.5 py-0.5 text-[10px] rounded-sm">
                                -{product.discountPercentage}%
                            </Badge>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="p-4 space-y-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {product.brand} · {product.categoryName}
                    </span>

                    <h3 className="font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>

                    <div className="flex items-baseline gap-2 pt-1">
                        <span className="text-base font-extrabold">
                            {formatPrice(finalPrice)}
                        </span>
                        {product.oldPrice && (
                            <span className="text-[10px] text-muted-foreground line-through">
                                {formatPrice(product.oldPrice)}
                            </span>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="px-4 pb-4 pt-0 flex gap-2">
                    <Button
                        size="sm"
                        className="flex-1 h-9 text-xs font-bold gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-95"
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart className="size-3.5" /> Add to Cart
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        className="h-9 w-9 p-0 border-border/50 hover:border-whatsapp hover:text-whatsapp transition-all active:scale-95"
                        onClick={handleWhatsAppOrder}
                    >
                        <MessageCircle className="size-4" />
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}
