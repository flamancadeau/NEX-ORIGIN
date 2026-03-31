import * as React from "react";
import { getInventoryReport, getSalesHistory, getProducts, updateProduct } from "@/data/storeService";
import type { Product } from "@/data/storeService";
import {
    BarChart3,
    TrendingUp,
    Package,
    AlertTriangle,
    Download,
    Calendar,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const formatPrice = (price: number): string =>
    new Intl.NumberFormat("en-RW").format(price) + " FRW";

export function DashboardReports() {
    const inventory = getInventoryReport();
    const sales = getSalesHistory();
    const products = getProducts();

    const [timeframe, setTimeframe] = React.useState<"weekly" | "monthly" | "yearly">("monthly");
    const [restockingProduct, setRestockingProduct] = React.useState<Product | null>(null);
    const [restockAmount, setRestockAmount] = React.useState<string>("10");

    const refreshData = () => {
        // This is a hack to trigger a re-render of the component since data is from localStorage
        window.location.reload();
    };

    const handleRestock = () => {
        if (!restockingProduct) return;
        const amount = parseInt(restockAmount);
        if (isNaN(amount) || amount <= 0) return;

        updateProduct(restockingProduct.id, {
            stockQuantity: (restockingProduct.stockQuantity || 0) + amount
        });

        setRestockingProduct(null);
        setRestockAmount("10");
        refreshData();
    };

    const exportToCSV = () => {
        const headers = ["ID", "Name", "Brand", "Category", "Price", "Stock", "Value"];
        const rows = products.map(p => [
            p.id,
            p.name,
            p.brand,
            p.categoryName,
            p.price,
            p.stockQuantity,
            p.price * p.stockQuantity
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(e => e.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `NexOrigin_Inventory_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-8 max-w-6xl pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-[#ffffff] tracking-tight" style={{ fontFamily: 'var(--font-brand-origin)' }}>
                        Inventory & Sales Reports
                    </h1>
                    <p className="text-sm text-[#ffffff]/40 brand-tagline mt-1">
                        Analyze your store performance and manage stock levels.
                    </p>
                </div>
                <Button
                    onClick={exportToCSV}
                    className="bg-[#f2d975] text-[#1a1a1b] hover:bg-[#caa149] font-bold brand-tagline rounded-xl flex items-center gap-2"
                >
                    <Download className="size-4" /> Export CSV
                </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <ReportStatCard
                    label="Stock Value"
                    value={formatPrice(inventory.totalValue)}
                    icon={TrendingUp}
                    trend="+12%"
                    trendUp={true}
                />
                <ReportStatCard
                    label="Total Items"
                    value={inventory.totalStock}
                    icon={Package}
                />
                <ReportStatCard
                    label="Low Stock Alerts"
                    value={inventory.lowStock.length}
                    icon={AlertTriangle}
                    color={inventory.lowStock.length > 0 ? "text-red-400" : "text-[#ffffff]/40"}
                    bg={inventory.lowStock.length > 0 ? "bg-red-500/10" : "bg-[#ffffff]/5"}
                />
                <ReportStatCard
                    label="Total Orders"
                    value={sales.totalOrders}
                    icon={BarChart3}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sales Chart Simulation */}
                <div className="lg:col-span-2 rounded-2xl border border-[#ffffff]/5 bg-[#ffffff]/[0.02] p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-[#ffffff]/80 brand-tagline flex items-center gap-2">
                            <Calendar className="size-4 text-[#f2d975]" /> Sales Overview
                        </h3>
                        <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
                            {(["weekly", "monthly", "yearly"] as const).map(t => (
                                <button
                                    key={t}
                                    onClick={() => setTimeframe(t)}
                                    className={cn(
                                        "px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all",
                                        timeframe === t ? "bg-[#f2d975] text-[#1a1a1b]" : "text-[#ffffff]/40 hover:text-[#ffffff]/60"
                                    )}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-64 flex items-end gap-2 px-2">
                        {Object.entries(sales.daily).slice(-7).map(([date, val], i) => (
                            <div key={date} className="flex-1 flex flex-col items-center gap-2 group">
                                <div
                                    className="w-full bg-[#f2d975]/20 rounded-t-lg transition-all hover:bg-[#f2d975]/40 relative"
                                    style={{ height: `${(val / (Math.max(...Object.values(sales.daily)) || 1)) * 100}%`, minHeight: '4px' }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black border border-white/10 px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                        {formatPrice(val)}
                                    </div>
                                </div>
                                <span className="text-[10px] text-[#ffffff]/20 brand-tagline rotate-45 origin-left">{date}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* stock distribution */}
                <div className="rounded-2xl border border-[#ffffff]/5 bg-[#ffffff]/[0.02] p-6 space-y-6">
                    <h3 className="text-sm font-bold text-[#ffffff]/80 brand-tagline">Stock Distribution</h3>
                    <div className="space-y-4">
                        {Object.entries(inventory.categoryDistribution).map(([cat, count]) => (
                            <div key={cat} className="space-y-1.5">
                                <div className="flex justify-between text-xs brand-tagline">
                                    <span className="text-[#ffffff]/50">{cat}</span>
                                    <span className="text-[#ffffff]/80 font-bold">{count} units</span>
                                </div>
                                <div className="h-1.5 w-full bg-[#ffffff]/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#f2d975] rounded-full"
                                        style={{ width: `${(count / inventory.totalStock) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Low Stock Table */}
            <div className="rounded-2xl border border-[#ffffff]/5 bg-[#ffffff]/[0.02] overflow-hidden">
                <div className="px-6 py-4 flex items-center justify-between border-b border-[#ffffff]/5">
                    <h3 className="text-sm font-bold text-[#ffffff]/80 brand-tagline flex items-center gap-2">
                        <AlertTriangle className="size-4 text-red-400" /> Low Stock Alerts
                    </h3>
                </div>
                {inventory.lowStock.length === 0 ? (
                    <div className="p-10 text-center text-[#ffffff]/30 text-sm brand-tagline">
                        All products are well stocked.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-xs text-[#ffffff]/30 border-b border-[#ffffff]/5 brand-tagline text-left">
                                    <th className="px-6 py-3 font-medium">Product</th>
                                    <th className="px-6 py-3 font-medium">Category</th>
                                    <th className="px-6 py-3 font-medium text-right">Current Stock</th>
                                    <th className="px-6 py-3 font-medium text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventory.lowStock.map((product) => (
                                    <tr key={product.id} className="border-b border-[#ffffff]/5 last:border-0">
                                        <td className="px-6 py-4 flex items-center gap-3">
                                            <div className="size-8 rounded-lg bg-white/5 overflow-hidden">
                                                <img src={product.image} className="w-full h-full object-cover" alt="" />
                                            </div>
                                            <span className="text-sm text-[#ffffff]/80 brand-tagline">{product.name}</span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-[#ffffff]/40 brand-tagline">{product.categoryName}</td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-sm font-black text-red-400">{product.stockQuantity}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setRestockingProduct(product)}
                                                className="text-[10px] font-bold text-[#f2d975] hover:underline uppercase tracking-wider brand-tagline"
                                            >
                                                Restock
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Restock Modal */}
            {restockingProduct && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setRestockingProduct(null)} />
                    <div className="relative bg-[#0f0f10] border border-[#ffffff]/10 rounded-2xl w-full max-w-sm p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-black text-[#ffffff]" style={{ fontFamily: 'var(--font-brand-origin)' }}>
                                Restock Product
                            </h3>
                            <button onClick={() => setRestockingProduct(null)} className="text-[#ffffff]/40 hover:text-[#ffffff]">
                                <X className="size-5" />
                            </button>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                            <img src={restockingProduct.image} className="size-12 rounded-lg object-cover" alt="" />
                            <div>
                                <div className="text-sm font-bold text-white brand-tagline">{restockingProduct.name}</div>
                                <div className="text-xs text-white/40 brand-tagline">{restockingProduct.brand}</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-[#ffffff]/40 brand-tagline">Current Stock</label>
                                <div className="text-xl font-black text-white">{restockingProduct.stockQuantity} units</div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-[#ffffff]/40 brand-tagline">Add Quantity</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {[5, 10, 20, 50].map(val => (
                                        <button
                                            key={val}
                                            onClick={() => setRestockAmount(val.toString())}
                                            className={cn(
                                                "py-2 rounded-lg text-xs font-bold transition-all",
                                                restockAmount === val.toString() ? "bg-[#f2d975] text-[#1a1a1b]" : "bg-white/5 text-white/40 hover:bg-white/10"
                                            )}
                                        >
                                            +{val}
                                        </button>
                                    ))}
                                </div>
                                <input
                                    type="number"
                                    value={restockAmount}
                                    onChange={(e) => setRestockAmount(e.target.value)}
                                    className="w-full mt-2 bg-[#ffffff]/5 border border-[#ffffff]/10 text-[#ffffff] rounded-xl px-4 py-3 brand-tagline focus:border-[#f2d975] outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button variant="ghost" onClick={() => setRestockingProduct(null)} className="flex-1 text-[#ffffff]/50 brand-tagline rounded-xl border border-white/5">
                                Cancel
                            </Button>
                            <Button
                                onClick={handleRestock}
                                className="flex-1 bg-[#f2d975] text-[#1a1a1b] hover:bg-[#caa149] font-bold brand-tagline rounded-xl"
                            >
                                Update Stock
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

import { Plus, Pencil, Trash2, X } from "lucide-react";

function ReportStatCard({ label, value, icon: Icon, trend, trendUp, color = "text-[#ffffff]/80", bg = "bg-[#ffffff]/5" }: any) {
    return (
        <div className="p-5 rounded-2xl border border-[#ffffff]/5 bg-[#ffffff]/[0.02] space-y-4">
            <div className="flex items-center justify-between">
                <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", bg)}>
                    <Icon className={cn("size-5", color || "text-[#f2d975]")} />
                </div>
                {trend && (
                    <div className={cn(
                        "flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full",
                        trendUp ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                    )}>
                        {trendUp ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                        {trend}
                    </div>
                )}
            </div>
            <div>
                <div className="text-xs text-[#ffffff]/40 brand-tagline">{label}</div>
                <div className={cn("text-xl font-black mt-1", color)}>{value}</div>
            </div>
        </div>
    );
}
