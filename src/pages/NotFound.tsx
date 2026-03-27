import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ArrowLeft, WifiOff } from "lucide-react"

export function NotFound() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/20">
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
                <div className="h-24 w-24 rounded-3xl bg-primary/10 flex items-center justify-center animate-bounce">
                    <WifiOff className="size-12 text-primary" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Signal Lost</h1>
                    <p className="text-muted-foreground font-bold tracking-tight uppercase text-xs">The frequency you're looking for doesn't exist.</p>
                </div>
                <Button asChild className="h-14 px-10 rounded-full font-black uppercase tracking-widest bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
                    <Link to="/">
                        <ArrowLeft className="mr-2 size-5" /> Return to Origin
                    </Link>
                </Button>
            </main>
            <Footer />
        </div>
    )
}
