import * as React from "react"
import {
    Home,
    LayoutDashboard,
    Settings,
    User,
    LogOut,
    Bell,
    Search
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    SidebarInset,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

/**
 * Main Layout component for the NEX ORIGIN dashboard.
 * Incorporates the Sidebar, Navbar, and main content area.
 */
export function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-background">
                <Sidebar className="border-r border-border/50">
                    <SidebarHeader className="p-4">
                        <div className="flex items-center gap-2 px-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black">
                                N
                            </div>
                            <span className="font-black tracking-tighter text-xl">NEX ORIGIN</span>
                        </div>
                    </SidebarHeader>

                    <SidebarContent className="px-2">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton isActive tooltip="Home">
                                    <Home className="size-4" />
                                    <span>Overview</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton tooltip="Dashboard">
                                    <LayoutDashboard className="size-4" />
                                    <span>Analytics</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton tooltip="Projects">
                                    <div className="flex h-4 w-4 items-center justify-center rounded border border-current text-[10px] font-bold">
                                        P
                                    </div>
                                    <span>Projects</span>
                                    <Badge variant="secondary" className="ml-auto px-1.5 h-5 text-[10px]">12</Badge>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>

                        <Separator className="my-4 opacity-50" />

                        <div className="px-4 mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                            System
                        </div>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton tooltip="Settings">
                                    <Settings className="size-4" />
                                    <span>Settings</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton tooltip="Profile">
                                    <User className="size-4" />
                                    <span>Account</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>

                    <SidebarFooter className="p-4 border-t border-border/50">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                    <LogOut className="size-4" />
                                    <span>Sign out</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>

                <SidebarInset className="flex flex-col">
                    <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-border/50 backdrop-blur-sm sticky top-0 z-20">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger className="-ml-2 md:hidden" />
                            <div className="hidden md:flex items-center gap-2 relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search anything..."
                                    className="pl-9 w-[300px] h-9 bg-muted/50 border-transparent focus:bg-background transition-all"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="size-4" />
                                <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-primary" />
                            </Button>
                            <Separator orientation="vertical" className="h-4 mx-2" />
                            <div className="flex items-center gap-3 pl-2">
                                <div className="flex flex-col items-end hidden sm:flex">
                                    <span className="text-xs font-semibold">Senior Engineer</span>
                                    <span className="text-[10px] text-muted-foreground">Premium Account</span>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center font-bold text-xs">
                                    SE
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 p-6 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {children}
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}
