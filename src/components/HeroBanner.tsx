import * as React from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { PROMO_BANNERS } from "@/data/mockData"
import { Link } from "react-router-dom"

/**
 * Premium Hero Banner Carousel.
 * Features:
 * - Auto-rotation (5s interval)
 * - Dot and arrow navigation
 * - Responsive text overlays with animations
 * - Parallax-ready background images
 */
export function HeroBanner() {
    const [current, setCurrent] = React.useState(0);
    const banners = PROMO_BANNERS.filter(b => b.isActive);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [banners.length]);

    const next = () => setCurrent((prev) => (prev + 1) % banners.length);
    const prev = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

    return (
        <section className="relative h-[300px] md:h-[500px] w-full overflow-hidden rounded-3xl group">
            {banners.map((banner, index) => (
                <div
                    key={banner.id}
                    className={cn(
                        "absolute inset-0 transition-all duration-1000 ease-in-out flex items-center justify-center",
                        index === current ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                    )}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <img
                        src={banner.image}
                        alt={banner.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Content */}
                    <div className="relative z-20 container px-8 md:px-20 flex flex-col items-center text-center space-y-4 max-w-3xl">
                        <h2 className={cn(
                            "text-3xl md:text-6xl font-black text-white tracking-tighter transition-all duration-700 delay-100",
                            index === current ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        )} style={{ fontFamily: 'var(--font-brand-origin)' }}>
                            {banner.title}
                        </h2>
                        <p className={cn(
                            "text-sm md:text-xl text-white/80 font-medium transition-all duration-700 delay-200 brand-tagline",
                            index === current ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        )}>
                            {banner.subtitle}
                        </p>
                        <div className={cn(
                            "pt-4 transition-all duration-700 delay-300",
                            index === current ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        )}>
                            <Button asChild size="lg" className="rounded-full px-8 h-12 font-bold bg-[#f2d975] text-[#1a1a1b] hover:bg-[#caa149] hover:scale-105 transition-transform brand-tagline">
                                <Link to={banner.link || "/products"}>
                                    Shop Now <ArrowRight className="ml-2 size-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
                <ChevronLeft className="size-6" />
            </button>
            <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
                <ChevronRight className="size-6" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {banners.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={cn(
                            "h-2 transition-all duration-300 rounded-full",
                            i === current ? "w-8 bg-primary" : "w-2 bg-white/40 hover:bg-white/60"
                        )}
                    />
                ))}
            </div>
        </section>
    );
}
