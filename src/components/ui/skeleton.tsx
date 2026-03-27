import { cn } from "@/lib/utils"

/**
 * Skeleton component for loading states.
 * Smooth pulse animation for a premium feel.
 */
function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-muted/60", className)}
            {...props}
        />
    )
}

export { Skeleton }
