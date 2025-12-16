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
    Users,
    ShieldAlert,
    Zap,
    Bot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIChatSidebar } from "@/components/ai-chat-sidebar";

// Palette
const darkPalette = {
    bg: "#0D0D14",
    card: "#1A1A25",
    elevated: "#252532",
    text: "#E2E2F0",
    muted: "#A0A0B8",
    faded: "#6B6B7F",
    success: "#00F5A8",
    warning: "#FFA500",
    danger: "#FF4D8D",
    info: "#4A55E0",
    border: "rgba(74,85,224,0.2)",
};

const lightPalette = {
    bg: "#F5F7FA",
    card: "#FFFFFF",
    elevated: "#F0F2F5",
    text: "#1A1A2E",
    muted: "#5C5C7A",
    faded: "#9999AA",
    success: "#00C48C",
    warning: "#FF9500",
    danger: "#FF3B6B",
    info: "#4A55E0",
    border: "rgba(74,85,224,0.15)",
};

const navItems = [
    { id: "overview", label: "Overview", href: "/analysis", icon: BarChart3 },
    { id: "fundamental", label: "Fundamental", href: "/analysis/fundamental", icon: TrendingUp },
    { id: "technical", label: "Technical", href: "/analysis/technical", icon: Brain },
    { id: "sentiment", label: "Sentiment", href: "/analysis/sentiment", icon: MessageSquare },
    { id: "quant", label: "Quant", href: "/analysis/quant", icon: Binary },
    { id: "macro", label: "Macro", href: "/analysis/macro", icon: Globe },
    { id: "ai", label: "AI", href: "/analysis/ai", icon: Bot },
    { id: "peers", label: "Peers", href: "/analysis/peers", icon: Users },
    { id: "risks", label: "Risks", href: "/analysis/risks", icon: ShieldAlert },
    { id: "strengths", label: "Strengths", href: "/analysis/strengths", icon: Zap },
];

// Explainer Context
interface ExplainerContent {
    title: string;
    description: string;
    details: string[];
    interpretation?: string;
    learnMore?: string;
}

interface ExplainerContextType {
    isOpen: boolean;
    content: ExplainerContent | null;
    openExplainer: (content: ExplainerContent) => void;
    closeExplainer: () => void;
}

const ExplainerContext = createContext<ExplainerContextType>({
    isOpen: false,
    content: null,
    openExplainer: () => { },
    closeExplainer: () => { },
});

export const useExplainer = () => useContext(ExplainerContext);

// Theme Context
interface ThemeContextType {
    theme: "light" | "dark";
    palette: typeof darkPalette;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "dark",
    palette: darkPalette,
    toggleTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

// Analysis Layout Provider
export function AnalysisLayoutProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [isExplainerOpen, setIsExplainerOpen] = useState(false);
    const [explainerContent, setExplainerContent] = useState<ExplainerContent | null>(null);
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    const palette = theme === "dark" ? darkPalette : lightPalette;

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const openExplainer = (content: ExplainerContent) => {
        setExplainerContent(content);
        setIsExplainerOpen(true);
    };

    const closeExplainer = () => {
        setIsExplainerOpen(false);
    };

    return (
        <ThemeContext.Provider value={{ theme, palette, toggleTheme }}>
            <ExplainerContext.Provider
                value={{
                    isOpen: isExplainerOpen,
                    content: explainerContent,
                    openExplainer,
                    closeExplainer,
                }}
            >
                <div className="min-h-screen flex flex-col" style={{ backgroundColor: palette.bg }}>
                    {/* Top Navigation Bar */}
                    <nav
                        className="sticky top-0 z-50 border-b backdrop-blur-xl"
                        style={{
                            backgroundColor: `${palette.bg}ee`,
                            borderColor: palette.border,
                        }}
                    >
                        <div className="max-w-[1600px] mx-auto px-3 lg:px-4">
                            <div className="flex items-center justify-between h-14">
                                {/* Logo */}
                                <Link href="/" className="flex items-center gap-2">
                                    <div
                                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                                        style={{
                                            background: `linear-gradient(135deg, ${palette.info}, ${palette.success})`,
                                        }}
                                    >
                                        <Sparkles size={18} color="#fff" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm" style={{ color: palette.text }}>
                                            TraderPro
                                        </p>
                                    </div>
                                </Link>

                                {/* Navigation Links */}
                                <div className="flex items-center gap-0.5">
                                    {navItems.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.id}
                                                href={item.href}
                                                className="relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5"
                                                style={{
                                                    color: isActive ? palette.text : palette.muted,
                                                    backgroundColor: isActive ? `${palette.info}22` : "transparent",
                                                }}
                                            >
                                                <item.icon size={14} />
                                                <span className="hidden md:inline">{item.label}</span>
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="activeTab"
                                                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                                                        style={{ backgroundColor: palette.info }}
                                                    />
                                                )}
                                            </Link>
                                        );
                                    })}
                                </div>

                                {/* Right side: Theme toggle + Symbol */}
                                <div className="flex items-center gap-2">
                                    {/* Theme Toggle */}
                                    <button
                                        onClick={toggleTheme}
                                        className="p-2 rounded-lg transition-all"
                                        style={{
                                            backgroundColor: `${palette.info}22`,
                                            color: palette.info,
                                        }}
                                    >
                                        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                                    </button>

                                    {/* Symbol Selector */}
                                    <div
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                                        style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}
                                    >
                                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-xs font-bold">
                                            🍎
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold" style={{ color: palette.text }}>AAPL</p>
                                            <p className="text-[10px]" style={{ color: palette.muted }}>$198.50</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>

                    {/* Main Content Area */}
                    <div className="flex-1 flex">
                        {/* Main Content - with reduced padding */}
                        <main className="flex-1 transition-all duration-300 pr-[480px]">
                            {children}
                        </main>

                        {/* Right Explainer Sidebar */}
                        <AnimatePresence>
                            {isExplainerOpen && explainerContent && (
                                <motion.aside
                                    initial={{ x: 400, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: 400, opacity: 0 }}
                                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                    className="fixed right-[480px] top-14 bottom-0 w-80 border-l overflow-y-auto z-40"
                                    style={{
                                        backgroundColor: palette.card,
                                        borderColor: palette.border,
                                    }}
                                >
                                    {/* Header */}
                                    <div
                                        className="sticky top-0 p-3 border-b flex items-start justify-between"
                                        style={{
                                            backgroundColor: palette.card,
                                            borderColor: palette.border,
                                        }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="p-1.5 rounded-lg"
                                                style={{
                                                    backgroundColor: `${palette.info}22`,
                                                    border: `1px solid ${palette.info}44`,
                                                }}
                                            >
                                                <Lightbulb size={16} style={{ color: palette.info }} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-wide" style={{ color: palette.muted }}>
                                                    AI Explainer
                                                </p>
                                                <h3 className="text-sm font-semibold" style={{ color: palette.text }}>
                                                    {explainerContent.title}
                                                </h3>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={closeExplainer}
                                            style={{ color: palette.muted }}
                                        >
                                            <X size={16} />
                                        </Button>
                                    </div>

                                    {/* Content */}
                                    <div className="p-3 space-y-4">
                                        {/* Description */}
                                        <div>
                                            <h4 className="text-xs font-semibold mb-1.5 flex items-center gap-1.5" style={{ color: palette.text }}>
                                                <Info size={12} />
                                                What is this?
                                            </h4>
                                            <p className="text-xs" style={{ color: palette.muted }}>
                                                {explainerContent.description}
                                            </p>
                                        </div>

                                        {/* Key Points */}
                                        <div>
                                            <h4 className="text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ color: palette.text }}>
                                                <BookOpen size={12} />
                                                Key Details
                                            </h4>
                                            <div className="space-y-1.5">
                                                {explainerContent.details.map((detail, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-start gap-1.5 p-1.5 rounded-lg"
                                                        style={{ backgroundColor: `${palette.bg}80` }}
                                                    >
                                                        <ChevronRight size={12} style={{ color: palette.info, marginTop: 1 }} />
                                                        <span className="text-xs" style={{ color: palette.muted }}>
                                                            {detail}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Interpretation */}
                                        {explainerContent.interpretation && (
                                            <div
                                                className="p-3 rounded-xl"
                                                style={{
                                                    backgroundColor: `${palette.success}11`,
                                                    border: `1px solid ${palette.success}33`,
                                                }}
                                            >
                                                <h4 className="text-xs font-semibold mb-1.5 flex items-center gap-1.5" style={{ color: palette.success }}>
                                                    <Brain size={12} />
                                                    AI Interpretation
                                                </h4>
                                                <p className="text-xs" style={{ color: palette.text }}>
                                                    {explainerContent.interpretation}
                                                </p>
                                            </div>
                                        )}

                                        {/* Learn More */}
                                        {explainerContent.learnMore && (
                                            <div
                                                className="p-3 rounded-xl"
                                                style={{
                                                    backgroundColor: `${palette.info}11`,
                                                    border: `1px solid ${palette.info}33`,
                                                }}
                                            >
                                                <h4 className="text-xs font-semibold mb-1.5" style={{ color: palette.info }}>
                                                    💡 Pro Tip
                                                </h4>
                                                <p className="text-xs" style={{ color: palette.muted }}>
                                                    {explainerContent.learnMore}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </motion.aside>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* AI Chat Sidebar - Always visible on right */}
                    <AIChatSidebar />
                </div>
            </ExplainerContext.Provider>
        </ThemeContext.Provider>
    );
}

// Explainable Metric Component
interface ExplainableProps {
    children: ReactNode;
    title: string;
    description: string;
    details: string[];
    interpretation?: string;
    learnMore?: string;
    className?: string;
}

export function Explainable({
    children,
    title,
    description,
    details,
    interpretation,
    learnMore,
    className = "",
}: ExplainableProps) {
    const { openExplainer } = useExplainer();
    const { palette } = useTheme();

    const handleClick = () => {
        openExplainer({
            title,
            description,
            details,
            interpretation,
            learnMore,
        });
    };

    return (
        <div
            onClick={handleClick}
            className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${className}`}
            style={{ position: "relative" }}
        >
            {children}
            <div
                className="absolute top-2 right-2 p-1 rounded-full opacity-0 hover:opacity-100 transition-opacity"
                style={{ backgroundColor: `${palette.info}22` }}
            >
                <Info size={12} style={{ color: palette.info }} />
            </div>
        </div>
    );
}
