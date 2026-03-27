import { CATEGORIES } from "@/data/mockData"
import { Link } from "react-router-dom"

/**
 * Category Grid matching reference design:
 * - Rounded card containers with subtle border
 * - Actual product images displayed inside circles
 * - Category name below
 */
export function CategoryGrid() {
    return (
        <section>
            <div className="grid grid-cols-4 lg:grid-cols-8 gap-4">
                {CATEGORIES.map((category) => (
                    <Link
                        key={category.id}
                        to={`/products?category=${category.slug}`}
                        className="flex flex-col items-center gap-3 group p-4 rounded-xl border border-border/50 bg-card hover:border-primary hover:shadow-md transition-all"
                    >
                        <div className="h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden bg-muted border border-border/30">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                        <span className="text-[11px] md:text-xs font-semibold text-center group-hover:text-primary transition-colors">
                            {category.name}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
