import { PRODUCTS, CATEGORIES, BRANDS } from "./mockData";
import type { Product, Category } from "./mockData";

/* ─── Order Types ─── */
export interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export interface Order {
    id: string;
    items: OrderItem[];
    total: number;
    customerName: string;
    customerPhone: string;
    address: string;
    status: OrderStatus;
    createdAt: string;
}

/* ─── Storage Keys ─── */
const PRODUCTS_KEY = "nex_origin_products";
const ORDERS_KEY = "nex_origin_orders";
const SEEDED_KEY = "nex_origin_seeded";

/* ─── Helpers ─── */
function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

/* ─── Seed: copy mock data into localStorage on first ever load ─── */
function seedIfNeeded() {
    if (localStorage.getItem(SEEDED_KEY)) return;
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(PRODUCTS));
    localStorage.setItem(ORDERS_KEY, JSON.stringify([]));
    localStorage.setItem(SEEDED_KEY, "true");
}

/* ─── Product CRUD ─── */
export function getProducts(): Product[] {
    seedIfNeeded();
    const raw = localStorage.getItem(PRODUCTS_KEY);
    return raw ? JSON.parse(raw) : [];
}

export function getProductById(id: string): Product | undefined {
    return getProducts().find((p) => p.id === id);
}

export function addProduct(product: Omit<Product, "id">): Product {
    const products = getProducts();
    const newProduct: Product = { ...product, id: generateId() };
    products.push(newProduct);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
    const products = getProducts();
    const idx = products.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    products[idx] = { ...products[idx], ...updates, id };
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    return products[idx];
}

export function deleteProduct(id: string): boolean {
    const products = getProducts();
    const filtered = products.filter((p) => p.id !== id);
    if (filtered.length === products.length) return false;
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
    return true;
}

/* ─── Order CRUD ─── */
export function getOrders(): Order[] {
    seedIfNeeded();
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
}

export function getOrderById(id: string): Order | undefined {
    return getOrders().find((o) => o.id === id);
}

export function addOrder(order: Omit<Order, "id" | "createdAt">): Order {
    const orders = getOrders();
    const newOrder: Order = {
        ...order,
        id: generateId(),
        createdAt: new Date().toISOString(),
    };
    orders.unshift(newOrder);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    return newOrder;
}

export function updateOrderStatus(id: string, status: OrderStatus): Order | null {
    const orders = getOrders();
    const idx = orders.findIndex((o) => o.id === id);
    if (idx === -1) return null;
    orders[idx].status = status;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    return orders[idx];
}

/* ─── Global Management ─── */
export function deleteAllProducts() {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify([]));
    localStorage.removeItem(SEEDED_KEY); // Allow re-seed on next load or via reset
}

export function deleteAllOrders() {
    localStorage.setItem(ORDERS_KEY, JSON.stringify([]));
}

export function resetToSeed() {
    localStorage.removeItem(SEEDED_KEY);
    localStorage.removeItem(PRODUCTS_KEY);
    localStorage.removeItem(ORDERS_KEY);
    seedIfNeeded();
}

/**
 * REPORTING HELPERS
 */

export function getInventoryReport() {
    const products = getProducts();
    const totalItems = products.length;
    const totalStock = products.reduce((sum, p) => sum + (p.stockQuantity || 0), 0);
    const totalValue = products.reduce((sum, p) => sum + (p.price * (p.stockQuantity || 0)), 0);
    const lowStock = products.filter(p => (p.stockQuantity || 0) < 5);

    const categoryDistribution = products.reduce((acc, p) => {
        acc[p.categoryName] = (acc[p.categoryName] || 0) + (p.stockQuantity || 0);
        return acc;
    }, {} as Record<string, number>);

    return { totalItems, totalStock, totalValue, lowStock, categoryDistribution };
}

export function getSalesHistory() {
    const orders = getOrders().filter(o => o.status !== 'cancelled');

    // Group sales by Day
    const dailySales = orders.reduce((acc, o) => {
        const date = new Date(o.createdAt).toLocaleDateString("en-RW", {
            weekday: 'short', month: 'short', day: 'numeric'
        });
        acc[date] = (acc[date] || 0) + o.total;
        return acc;
    }, {} as Record<string, number>);

    return { daily: dailySales, totalOrders: orders.length };
}

/* ─── Re-export helpers for convenience ─── */
export { CATEGORIES, BRANDS };
export type { Product, Category };
