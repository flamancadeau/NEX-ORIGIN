import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import {
    Rocket,
    ChevronRight,
    Terminal,
    AlertCircle,
    CheckCircle2,
    Info
} from "lucide-react"

/**
 * Design System preview component.
 * Showcases all implemented components in a clean, professional grid.
 */
export function DesignSystem() {
    return (
        <div className="space-y-12">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-black tracking-tighter">Design Language</h2>
                <p className="text-muted-foreground">The atomic foundation of the NEX ORIGIN experience.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Buttons Section */}
                <section className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">Buttons</h3>
                    <div className="flex flex-wrap gap-3">
                        <Button>Default</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button size="lg">Large Action <Rocket className="ml-2 size-4" /></Button>
                    </div>
                </section>

                {/* Inputs Section */}
                <section className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">Form Elements</h3>
                    <div className="space-y-4 max-w-xs">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" placeholder="senior@engineer.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="disabled">Disabled State</Label>
                            <Input id="disabled" disabled placeholder="Read-only data" />
                        </div>
                    </div>
                </section>

                {/* Badges Section */}
                <section className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">Badges & Indicators</h3>
                    <div className="flex flex-wrap gap-2">
                        <Badge>Active</Badge>
                        <Badge variant="secondary">Pending</Badge>
                        <Badge variant="outline">Stable</Badge>
                        <Badge variant="destructive">Error</Badge>
                    </div>
                </section>
            </div>

            {/* Complex Cards Showcase */}
            <section className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">Information Cards</h3>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">Core Engine</CardTitle>
                            <Terminal className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">99.9%</div>
                            <p className="text-[10px] text-muted-foreground mt-1 flex items-center">
                                <CheckCircle2 className="size-3 text-green-500 mr-1" /> Uptime guaranteed
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-primary/5 border-primary/20">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <Info className="size-4 text-primary" /> System Update
                            </CardTitle>
                            <CardDescription>Version 2.0 is now live.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button size="sm" className="w-full h-8">View Release Notes <ChevronRight className="ml-1 size-3" /></Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">Critical Errors</CardTitle>
                            <AlertCircle className="size-4 text-destructive" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                            <p className="text-[10px] text-muted-foreground mt-1">All systems healthy.</p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    )
}
