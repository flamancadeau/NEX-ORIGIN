import * as React from "react"
import { getProductById, addOrder } from "@/data/storeService";
import type { OrderItem } from "@/data/storeService";

export interface CartItem {
    productId: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (productId: string) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    getCount: () => number;
    getTotal: () => number;
    checkout: (customerName: string, customerPhone: string, address: string) => string | null;
    clearCart: () => void;
}

const CartContext = React.createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = React.useState<CartItem[]>(() => {
        const saved = localStorage.getItem("nex_origin_cart");
        return saved ? JSON.parse(saved) : [];
    });

    React.useEffect(() => {
        localStorage.setItem("nex_origin_cart", JSON.stringify(items));
    }, [items]);

    const addToCart = (productId: string) => {
        setItems(prev => {
            const existing = prev.find(i => i.productId === productId);
            if (existing) {
                return prev.map(i =>
                    i.productId === productId
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...prev, { productId, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setItems(prev => prev.filter(i => i.productId !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setItems(prev =>
            prev.map(i =>
                i.productId === productId ? { ...i, quantity } : i
            )
        );
    };

    const getCount = () => items.reduce((sum, i) => sum + i.quantity, 0);

    const getTotal = () => {
        return items.reduce((sum, item) => {
            const product = getProductById(item.productId);
            if (!product) return sum;
            const price = product.discountPercentage
                ? Math.round(product.price - (product.price * product.discountPercentage / 100))
                : product.price;
            return sum + price * item.quantity;
        }, 0);
    };

    const checkout = (customerName: string, customerPhone: string, address: string): string | null => {
        if (items.length === 0) return null;

        const orderItems: OrderItem[] = items.map(item => {
            const product = getProductById(item.productId);
            const price = product
                ? (product.discountPercentage
                    ? Math.round(product.price - (product.price * product.discountPercentage / 100))
                    : product.price)
                : 0;
            return {
                productId: item.productId,
                name: product?.name || "Unknown",
                price,
                quantity: item.quantity,
                image: product?.image || "",
            };
        });

        const total = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

        const order = addOrder({
            items: orderItems,
            total,
            customerName,
            customerPhone,
            address,
            status: "pending",
        });

        setItems([]);
        return order.id;
    };

    const clearCart = () => setItems([]);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, getCount, getTotal, checkout, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = React.useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}
