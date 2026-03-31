import { Link } from "react-router-dom";
import { getProducts, getOrders} from "@/data/storeService";
import { Package, ShoppingBag, DollarSign, Clock, ArrowUpRight } from "lucide-react";

const formatPrice2 = (price: number): string =>
    new Intl.NumberFormat("en-RW").format(price) + " FRW";

export function DashboardOverview() {
    const products = getProducts();
    const orders = getOrders();

    const totalRevenue = orders
        .filter((o) => o.status !== "cancelled")
        .reduce((sum, o) => sum + o.total, 0);
    const pendingOrders = orders.filter((o) => o.status === "pending").length;
    const recentOrders = orders.slice(0, 5);

    const stats = [
        {
            label: "Total Products",
            value: products.length,
            icon: Package,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
        },
        {
            label: "Total Orders",
            value: orders.length,
            icon: ShoppingBag,
            color: "text-[#f2d975]",
            bg: "bg-[#f2d975]/10",
        },
        {
            label: "Revenue",
            value: formatPrice2(totalRevenue),
            icon: DollarSign,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
        },
        {
            label: "Pending Orders",
            value: pendingOrders,
            icon: Clock,
            color: "text-orange-400",
            bg: "bg-orange-500/10",
        },
    ];

    return (
        <div className="space-y-8 max-w-6xl">
            <div>
                <h1 className="text-2xl font-black text-[#ffffff] tracking-tight" style={{ fontFamily: 'var(--font-brand-origin)' }}>
                    Dashboard
                </h1>
                <p className="text-sm text-[#ffffff]/40 brand-tagline mt-1">
                    Welcome back! Here's your store at a glance.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.label}
                            className="p-5 rounded-2xl border border-[#ffffff]/5 bg-[#ffffff]/[0.02] hover:bg-[#ffffff]/[0.04] transition-colors"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`h-10 w-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                                    <Icon className={`size-5 ${stat.color}`} />
                                </div>
                            </div>
                            <div className="text-2xl font-black text-[#ffffff]">{stat.value}</div>
                            <div className="text-xs text-[#ffffff]/40 brand-tagline mt-1">{stat.label}</div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Orders */}
            <div className="rounded-2xl border border-[#ffffff]/5 bg-[#ffffff]/[0.02] overflow-hidden">
                <div className="px-6 py-4 flex items-center justify-between border-b border-[#ffffff]/5">
                    <h3 className="text-sm font-bold text-[#ffffff]/80 brand-tagline">Recent Orders</h3>
                    <Link
                        to="/dashboard/orders"
                        className="text-xs text-[#f2d975] hover:underline brand-tagline flex items-center gap-1"
                    >
                        View All <ArrowUpRight className="size-3" />
                    </Link>
                </div>
                {recentOrders.length === 0 ? (
                    <div className="p-10 text-center text-[#ffffff]/30 text-sm brand-tagline">
                        No orders yet. Orders will appear here when customers check out.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-xs text-[#ffffff]/30 border-b border-[#ffffff]/5 brand-tagline">
                                    <th className="text-left px-6 py-3 font-medium">Order ID</th>
                                    <th className="text-left px-6 py-3 font-medium">Customer</th>
                                    <th className="text-left px-6 py-3 font-medium">Items</th>
                                    <th className="text-left px-6 py-3 font-medium">Total</th>
                                    <th className="text-left px-6 py-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="border-b border-[#ffffff]/5 last:border-0">
                                        <td className="px-6 py-4 text-xs text-[#ffffff]/60 font-mono">#{order.id.slice(-6)}</td>
                                        <td className="px-6 py-4 text-sm text-[#ffffff]/80 brand-tagline">{order.customerName}</td>
                                        <td className="px-6 py-4 text-xs text-[#ffffff]/50 brand-tagline">{order.items.length} items</td>
                                        <td className="px-6 py-4 text-sm font-bold text-[#ffffff]/80">{formatPrice2(order.total)}</td>
                                        <td className="px-6 py-4">
                                            <OrderStatusBadge status={order.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export function OrderStatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
        confirmed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        shipped: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
    };

    return (
        <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status] || styles.pending}`}>
            {status}
        </span>
    );
}
