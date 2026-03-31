import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";

export function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isAuthenticated) navigate("/dashboard", { replace: true });
    }, [isAuthenticated, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        setTimeout(() => {
            const success = login(email, password);
            if (success) {
                navigate("/dashboard", { replace: true });
            } else {
                setError("Invalid email or password");
            }
            setLoading(false);
        }, 600);
    };

    return (
        <div className="min-h-screen flex bg-[#000000]">
            {/* Left: Brand Panel */}
            <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 relative overflow-hidden">
                {/* Decorative gold gradient circles */}
                <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-[#f2d975]/10 blur-3xl" />
                <div className="absolute bottom-[-150px] left-[-100px] w-[500px] h-[500px] rounded-full bg-[#caa149]/10 blur-3xl" />

                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                    <div className="h-20 w-20 rounded-2xl bg-[#f2d975] flex items-center justify-center shadow-2xl shadow-[#f2d975]/30">
                        <span className="text-3xl">⚡</span>
                    </div>
                    <div className="brand-logo">
                        <span className="brand-nex text-5xl text-[#f2d975]">NEX</span>
                        <span className="brand-origin text-4xl text-[#caa149]">ORIGIN</span>
                    </div>
                    <p className="brand-tagline text-[#ffffff]/50 text-lg max-w-xs">
                        Admin Dashboard — Manage your products, orders, and grow your business.
                    </p>
                </div>
            </div>

            {/* Right: Login Form */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md space-y-8">
                    {/* Mobile logo */}
                    <div className="lg:hidden flex flex-col items-center space-y-3 mb-4">
                        <div className="h-14 w-14 rounded-xl bg-[#f2d975] flex items-center justify-center">
                            <span className="text-2xl">⚡</span>
                        </div>
                        <div className="brand-logo">
                            <span className="brand-nex text-2xl text-[#f2d975]">NEX</span>
                            <span className="brand-origin text-xl text-[#caa149]">ORIGIN</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-black text-[#ffffff] tracking-tight" style={{ fontFamily: 'var(--font-brand-origin)' }}>
                            Welcome Back
                        </h1>
                        <p className="text-[#ffffff]/50 brand-tagline">
                            Sign in to your admin dashboard
                        </p>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            <AlertCircle className="size-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#ffffff]/40 brand-tagline">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#ffffff]/30" />
                                <Input
                                    type="email"
                                    placeholder="admin@nexorigin.rw"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-12 bg-[#ffffff]/5 border-[#ffffff]/10 text-[#ffffff] placeholder:text-[#ffffff]/25 focus:border-[#f2d975]/50 focus:ring-[#f2d975]/20 rounded-xl brand-tagline"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#ffffff]/40 brand-tagline">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#ffffff]/30" />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-10 h-12 bg-[#ffffff]/5 border-[#ffffff]/10 text-[#ffffff] placeholder:text-[#ffffff]/25 focus:border-[#f2d975]/50 focus:ring-[#f2d975]/20 rounded-xl brand-tagline"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ffffff]/30 hover:text-[#ffffff]/60"
                                >
                                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 rounded-xl font-bold text-base bg-[#f2d975] text-[#1a1a1b] hover:bg-[#caa149] transition-all brand-tagline disabled:opacity-50"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 border-2 border-[#1a1a1b]/30 border-t-[#1a1a1b] rounded-full animate-spin" />
                                    Signing in...
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>

                    <div className="text-center pt-4">
                        <Link to="/" className="text-sm text-[#ffffff]/30 hover:text-[#f2d975] transition-colors brand-tagline">
                            ← Back to Store
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
