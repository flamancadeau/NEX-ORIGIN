import * as React from "react"

export interface CartItem {
    productId: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (productId: string) => void;
    removeFromCart: (productId: string) => void;
    getCount: () => number;
}

const CartContext = React.createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = React.useState<CartItem[]>([]);

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

    const getCount = () => items.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, getCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = React.useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}
