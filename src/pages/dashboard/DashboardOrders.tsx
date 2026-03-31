import * as React from "react";
import { getOrders, updateOrderStatus, deleteAllOrders } from "@/data/storeService";
import type { Order, OrderStatus } from "@/data/storeService";
import { OrderStatusBadge } from "./DashboardOverview";
import { ShoppingBag, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ORDER_STATUSES: OrderStatus[] = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-RW").format(price) + " FRW";

export function DashboardOrders() {
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [expandedId, setExpandedId] = React.useState<string | null>(null);

    const reload = () => setOrders(getOrders());
    React.useEffect(() => { reload(); }, []);

    const handleStatusChange = (orderId: string, status: OrderStatus) => {
        updateOrderStatus(orderId, status);
        reload();
    };

    const toggleExpand = (id: string) => {
        setExpandedId((prev) => (prev === id ? null : id));
    };

    return (
        <div className="space-y-6 max-w-6xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-[#ffffff] tracking-tight" style={{ fontFamily: 'var(--font-brand-origin)' }}>
                        Orders
                    </h1>
                    <p className="text-sm text-[#ffffff]/40 brand-tagline mt-1">
                        {orders.length} orders total
                    </p>
                </div>
                {orders.length > 0 && (
                    <Button
                        onClick={() => {
                            if (confirm("Delete ALL orders history?")) {
                                deleteAllOrders();
                                reload();
                            }
                        }}
                        variant="destructive"
                        className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border-red-500/20 font-bold brand-tagline rounded-xl"
                    >
                        Clear All Orders
                    </Button>
                )}
            </div>

            <div className="rounded-2xl border border-[#ffffff]/5 bg-[#ffffff]/[0.02] overflow-hidden">
                {orders.length === 0 ? (
                    <div className="p-16 text-center">
                        <ShoppingBag className="size-10 text-[#ffffff]/10 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-[#ffffff]/30 brand-tagline">No orders yet</h3>
                        <p className="text-sm text-[#ffffff]/20 brand-tagline mt-1">
                            Orders will appear when customers place them from the store.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-xs text-[#ffffff]/30 border-b border-[#ffffff]/5 brand-tagline">
                                    <th className="text-left px-6 py-3 font-medium w-8"></th>
                                    <th className="text-left px-6 py-3 font-medium">Order ID</th>
                                    <th className="text-left px-6 py-3 font-medium">Customer</th>
                                    <th className="text-left px-6 py-3 font-medium">Phone</th>
                                    <th className="text-left px-6 py-3 font-medium">Items</th>
                                    <th className="text-left px-6 py-3 font-medium">Total</th>
                                    <th className="text-left px-6 py-3 font-medium">Date</th>
                                    <th className="text-left px-6 py-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <React.Fragment key={order.id}>
                                        <tr
                                            className="border-b border-[#ffffff]/5 hover:bg-[#ffffff]/[0.02] transition-colors cursor-pointer"
                                            onClick={() => toggleExpand(order.id)}
                                        >
                                            <td className="px-6 py-4 text-[#ffffff]/30">
                                                {expandedId === order.id ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                                            </td>
                                            <td className="px-6 py-4 text-xs text-[#ffffff]/60 font-mono">#{order.id.slice(-6)}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-[#ffffff]/80 brand-tagline">{order.customerName}</td>
                                            <td className="px-6 py-4 text-sm text-[#ffffff]/50 brand-tagline">{order.customerPhone}</td>
                                            <td className="px-6 py-4 text-xs text-[#ffffff]/50 brand-tagline">{order.items.length} items</td>
                                            <td className="px-6 py-4 text-sm font-bold text-[#ffffff]/80">{formatPrice(order.total)}</td>
                                            <td className="px-6 py-4 text-xs text-[#ffffff]/40 brand-tagline">
                                                {new Date(order.createdAt).toLocaleDateString("en-RW", {
                                                    day: "numeric", month: "short", year: "numeric"
                                                })}
                                            </td>
                                            <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                                                    className="px-2 py-1 text-xs rounded-lg bg-[#ffffff]/5 border border-[#ffffff]/10 text-[#ffffff]/70 focus:outline-none focus:border-[#f2d975]/50 brand-tagline"
                                                >
                                                    {ORDER_STATUSES.map((s) => (
                                                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        {/* Expanded row */}
                                        {expandedId === order.id && (
                                            <tr className="border-b border-[#ffffff]/5 bg-[#ffffff]/[0.01]">
                                                <td colSpan={8} className="px-6 py-4">
                                                    <div className="grid sm:grid-cols-2 gap-6">
                                                        <div>
                                                            <h4 className="text-xs font-bold text-[#ffffff]/40 mb-3 uppercase brand-tagline">Order Items</h4>
                                                            <div className="space-y-2">
                                                                {order.items.map((item, idx) => (
                                                                    <div key={idx} className="flex items-center gap-3">
                                                                        <div className="h-8 w-8 rounded-md overflow-hidden bg-[#ffffff]/5 shrink-0">
                                                                            {item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-sm text-[#ffffff]/70 brand-tagline truncate">{item.name}</p>
                                                                            <p className="text-xs text-[#ffffff]/30 brand-tagline">
                                                                                {item.quantity} × {formatPrice(item.price)}
                                                                            </p>
                                                                        </div>
                                                                        <span className="text-sm font-bold text-[#ffffff]/60">
                                                                            {formatPrice(item.price * item.quantity)}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-xs font-bold text-[#ffffff]/40 mb-3 uppercase brand-tagline">Delivery Details</h4>
                                                            <div className="space-y-2 text-sm text-[#ffffff]/60 brand-tagline">
                                                                <p><span className="text-[#ffffff]/30">Name:</span> {order.customerName}</p>
                                                                <p><span className="text-[#ffffff]/30">Phone:</span> {order.customerPhone}</p>
                                                                <p><span className="text-[#ffffff]/30">Address:</span> {order.address}</p>
                                                                <p><span className="text-[#ffffff]/30">Status:</span> <OrderStatusBadge status={order.status} /></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
