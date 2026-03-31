import * as React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    LogOut,
    Menu,
    X,
    ChevronRight,
    BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Products", href: "/dashboard/products", icon: Package },
    { label: "Orders", href: "/dashboard/orders", icon: ShoppingBag },
    { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
];

export function DashboardLayout() {
    const { logout, userEmail } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen bg-[#0a0a0b]">
            {/* Sidebar — desktop */}
            <aside className="hidden lg:flex flex-col w-64 bg-[#0f0f10] border-r border-[#ffffff]/5">
                {/* Logo */}
                <div className="p-6 border-b border-[#ffffff]/5">
                    <Link to="/dashboard" className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-lg bg-[#f2d975] flex items-center justify-center">
                            <span className="text-lg">⚡</span>
                        </div>
                        <div className="brand-logo">
                            <span className="brand-nex text-lg text-[#f2d975]">NEX</span>
                            <span className="brand-origin text-sm text-[#caa149]">ORIGIN</span>
                        </div>
                    </Link>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-4 space-y-1">
                    {NAV_ITEMS.map((item) => {
                        const isActive = location.pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all brand-tagline",
                                    isActive
                                        ? "bg-[#f2d975]/10 text-[#f2d975]"
                                        : "text-[#ffffff]/50 hover:text-[#ffffff]/80 hover:bg-[#ffffff]/5"
                                )}
                            >
                                <Icon className="size-4" />
                                {item.label}
                                {isActive && <ChevronRight className="size-3 ml-auto" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* User */}
                <div className="p-4 border-t border-[#ffffff]/5">
                    <div className="flex items-center gap-3 mb-3 px-2">
                        <div className="h-8 w-8 rounded-full bg-[#f2d975]/20 flex items-center justify-center text-[#f2d975] font-bold text-xs">
                            A
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-[#ffffff]/70 brand-tagline truncate">Admin</p>
                            <p className="text-[10px] text-[#ffffff]/30 brand-tagline truncate">{userEmail}</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLogout}
                        className="w-full justify-start gap-2 text-[#ffffff]/40 hover:text-red-400 hover:bg-red-500/10 brand-tagline"
                    >
                        <LogOut className="size-4" /> Sign Out
                    </Button>
                </div>
            </aside>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
                    <aside className="relative w-72 h-full bg-[#0f0f10] flex flex-col">
                        <div className="p-4 flex items-center justify-between border-b border-[#ffffff]/5">
                            <div className="brand-logo">
                                <span className="brand-nex text-lg text-[#f2d975]">NEX</span>
                                <span className="brand-origin text-sm text-[#caa149]">ORIGIN</span>
                            </div>
                            <button onClick={() => setSidebarOpen(false)} className="text-[#ffffff]/50">
                                <X className="size-5" />
                            </button>
                        </div>
                        <nav className="flex-1 p-4 space-y-1">
                            {NAV_ITEMS.map((item) => {
                                const isActive = location.pathname === item.href;
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all brand-tagline",
                                            isActive
                                                ? "bg-[#f2d975]/10 text-[#f2d975]"
                                                : "text-[#ffffff]/50 hover:text-[#ffffff]/80 hover:bg-[#ffffff]/5"
                                        )}
                                    >
                                        <Icon className="size-4" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                        <div className="p-4 border-t border-[#ffffff]/5">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleLogout}
                                className="w-full justify-start gap-2 text-[#ffffff]/40 hover:text-red-400 brand-tagline"
                            >
                                <LogOut className="size-4" /> Sign Out
                            </Button>
                        </div>
                    </aside>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar */}
                <header className="h-16 px-6 flex items-center justify-between border-b border-[#ffffff]/5 bg-[#0a0a0b] shrink-0">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-[#ffffff]/50 hover:text-[#ffffff]"
                    >
                        <Menu className="size-5" />
                    </button>
                    <div className="hidden lg:block">
                        <h2 className="text-sm font-bold text-[#ffffff]/70 brand-tagline">
                            {NAV_ITEMS.find(i => i.href === location.pathname)?.label || "Dashboard"}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            to="/"
                            className="text-xs text-[#ffffff]/30 hover:text-[#f2d975] transition-colors brand-tagline"
                        >
                            View Store →
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
