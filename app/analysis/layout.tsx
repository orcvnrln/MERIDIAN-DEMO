"use client";

import { useState, createContext, useContext, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    BarChart3,
    TrendingUp,
    Brain,
    MessageSquare,
    Globe,
    Binary,
    X,
    Sparkles,
    ChevronRight,
    Info,
    Lightbulb,
    BookOpen,
    Sun,
    Moon,
    Zap,
    Users,
    AlertTriangle,
    Target,
    Columns,
    Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cadencePalette } from "@/lib/cadence-palette";

// Re-export for backwards compatibility
export { cadencePalette };

const navItems = [
    { id: "overview", label: "Overview", href: "/analysis", icon: BarChart3 },
    { id: "fundamental", label: "Fundamental", href: "/analysis/fundamental", icon: TrendingUp },
    { id: "technical", label: "Technical", href: "/analysis/technical", icon: Brain },
    { id: "sentiment", label: "Sentiment", href: "/analysis/sentiment", icon: MessageSquare },
    { id: "quant", label: "Quant", href: "/analysis/quant", icon: Binary },
    { id: "institutional", label: "Institutional", href: "/analysis/institutional", icon: Users },
    { id: "ai", label: "AI Insights", href: "/analysis/ai", icon: Zap },
];

// Layout Context
interface LayoutContextType {
    viewMode: "single" | "split";
    setViewMode: (mode: "single" | "split") => void;
    leftPanel: string;
    rightPanel: string;
    setLeftPanel: (panel: string) => void;
    setRightPanel: (panel: string) => void;
}

const LayoutContext = createContext<LayoutContextType>({
    viewMode: "single",
    setViewMode: () => { },
    leftPanel: "fundamental",
    rightPanel: "technical",
    setLeftPanel: () => { },
    setRightPanel: () => { },
});

export const useLayoutContext = () => useContext(LayoutContext);

// Default export required by Next.js App Router
export default function AnalysisLayout({ children }: { children: ReactNode }) {
    return <AnalysisLayoutProvider>{children}</AnalysisLayoutProvider>;
}

// Analysis Layout Provider
export function AnalysisLayoutProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [viewMode, setViewMode] = useState<"single" | "split">("single");
    const [leftPanel, setLeftPanel] = useState("fundamental");
    const [rightPanel, setRightPanel] = useState("technical");

    return (
        <LayoutContext.Provider
            value={{
                viewMode,
                setViewMode,
                leftPanel,
                rightPanel,
                setLeftPanel,
                setRightPanel,
            }}
        >
            <div className="min-h-screen flex flex-col" style={{ backgroundColor: cadencePalette.bg }}>
                {/* Full-Width Sticky Navbar */}
                <nav
                    className="sticky top-0 z-50 border-b backdrop-blur-xl"
                    style={{
                        backgroundColor: `${cadencePalette.bg}cc`,
                        borderColor: cadencePalette.border,
                    }}
                >
                    <div className="px-6 lg:px-8">
                        {/* Top Row */}
                        <div className="flex items-center justify-between h-14">
                            {/* Logo */}
                            <Link href="/" className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{
                                        background: `linear-gradient(135deg, ${cadencePalette.primary}, ${cadencePalette.secondary})`,
                                    }}
                                >
                                    <Sparkles size={20} color="#fff" />
                                </div>
                                <div>
                                    <p className="font-bold text-base" style={{ color: cadencePalette.text }}>
                                        TraderPro
                                    </p>
                                </div>
                            </Link>

                            {/* Symbol Quick Info */}
                            <div
                                className="flex items-center gap-4 px-4 py-2 rounded-xl"
                                style={{
                                    backgroundColor: `${cadencePalette.card}99`,
                                    backdropFilter: "blur(12px)",
                                    border: `1px solid ${cadencePalette.border}`,
                                }}
                            >
                                <div>
                                    <p className="text-xs" style={{ color: cadencePalette.muted }}>AAPL</p>
                                    <p className="text-sm font-semibold" style={{ color: cadencePalette.text }}>Apple Inc.</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold" style={{ color: cadencePalette.success }}>$198.50</p>
                                    <p className="text-xs" style={{ color: cadencePalette.success }}>+2.84 (+1.45%)</p>
                                </div>
                            </div>

                            {/* View Mode Toggle */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setViewMode("single")}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                                    style={{
                                        backgroundColor: viewMode === "single" ? `${cadencePalette.primary}22` : "transparent",
                                        color: viewMode === "single" ? cadencePalette.primary : cadencePalette.muted,
                                        border: `1px solid ${viewMode === "single" ? cadencePalette.primary + "44" : cadencePalette.border}`,
                                    }}
                                >
                                    <Maximize2 size={16} />
                                    Single View
                                </button>
                                <button
                                    onClick={() => setViewMode("split")}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                                    style={{
                                        backgroundColor: viewMode === "split" ? `${cadencePalette.primary}22` : "transparent",
                                        color: viewMode === "split" ? cadencePalette.primary : cadencePalette.muted,
                                        border: `1px solid ${viewMode === "split" ? cadencePalette.primary + "44" : cadencePalette.border}`,
                                    }}
                                >
                                    <Columns size={16} />
                                    Split View
                                </button>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="flex items-center gap-1 py-2 overflow-x-auto">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
                                        style={{
                                            color: isActive ? cadencePalette.text : cadencePalette.muted,
                                            backgroundColor: isActive ? `${cadencePalette.primary}15` : "transparent",
                                        }}
                                    >
                                        <item.icon size={16} />
                                        {item.label}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                                                style={{ backgroundColor: cadencePalette.primary }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </LayoutContext.Provider>
    );
}
