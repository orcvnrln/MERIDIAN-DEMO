"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    TrendingUp,
    LayoutDashboard,
    Briefcase,
    BarChart3,
    Newspaper,
    ShoppingCart,
    Wallet,
    Bot,
    Bell,
    Settings,
    User,
    Search,
    Sun,
    Moon,
    ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";

interface AppLayoutProps {
    children: React.ReactNode;
}

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: TrendingUp, label: "Trade", href: "/" },
    { icon: BarChart3, label: "Markets", href: "/markets" },
    { icon: Briefcase, label: "Portfolio", href: "/portfolio" },
    { icon: ShoppingCart, label: "Orders", href: "/orders" },
    { icon: Wallet, label: "Wallet", href: "/wallet" },
    { icon: Newspaper, label: "News", href: "/news" },
    { icon: Bot, label: "AI", href: "/ai" },
];

export function AppLayout({ children }: AppLayoutProps) {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white">
            {/* Top Navigation */}
            <nav className="h-16 border-b border-gray-800/50 bg-[#0a0a0f]/90 backdrop-blur-sm sticky top-0 z-50">
                <div className="h-full max-w-[1920px] mx-auto px-6 flex items-center justify-between">
                    {/* Left: Logo & Nav */}
                    <div className="flex items-center gap-8">
                        {/* Logo */}
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-xl text-white">MERIDIAN</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-semibold">
                                PRO
                            </span>
                        </Link>

                        {/* Navigation Items */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navItems.map((item) => {
                                const isActive = item.href === "/"
                                    ? pathname === "/"
                                    : pathname?.startsWith(item.href);
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                                            ${isActive
                                                ? "bg-white/10 text-white"
                                                : "text-gray-400 hover:text-white hover:bg-white/5"
                                            }`}
                                    >
                                        <item.icon className="w-4 h-4" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Center: Search */}
                    <div className="hidden md:flex items-center">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <Input
                                placeholder="Search symbols, markets..."
                                className="pl-10 w-72 h-10 bg-white/5 border-gray-800 text-white placeholder:text-gray-500 focus:border-cyan-500/50"
                            />
                        </div>
                    </div>

                    {/* Right: Quick Stats & Profile */}
                    <div className="flex items-center gap-4">
                        {/* Quick Portfolio Stats */}
                        <div className="hidden xl:flex items-center gap-6 pr-4 border-r border-gray-800">
                            <div>
                                <p className="text-xs text-gray-500">Portfolio</p>
                                <div className="flex items-center gap-1">
                                    <span className="font-semibold">$487,250</span>
                                    <span className="text-xs text-emerald-400">+0.70%</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Buying Power</p>
                                <span className="font-semibold">$52,840</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="text-gray-400 hover:text-white hover:bg-white/10"
                            >
                                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </Button>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10 relative">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
                                <Settings className="w-5 h-5" />
                            </Button>
                            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-800">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="min-h-[calc(100vh-64px)]">
                {children}
            </main>
        </div>
    );
}
