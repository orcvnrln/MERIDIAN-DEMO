"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, User, Settings, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Portfolio {
    id: string;
    name: string;
    value: number;
    change: number;
    changePercent: number;
}

const portfolios: Portfolio[] = [
    { id: "1", name: "Tech Growth", value: 1234567, change: 302500, changePercent: 24.5 },
    { id: "2", name: "Dividend Income", value: 856000, change: 42000, changePercent: 5.15 },
    { id: "3", name: "Crypto Venture", value: 425000, change: -52000, changePercent: -10.9 },
];

export function PortfolioHeader() {
    const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio>(portfolios[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const formatCurrency = (value: number) => {
        if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(2)}M`;
        }
        return `$${(value / 1000).toFixed(1)}K`;
    };

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#050509]/80 border-b border-cyan-500/20"
        >
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">TP</span>
                    </div>
                    <span className="text-white font-semibold text-lg">TradePro</span>
                </div>

                {/* Portfolio Selector */}
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#1A1A28]/60 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors"
                        >
                            <div className="text-left">
                                <div className="text-xs text-gray-400">Portfolio</div>
                                <div className="text-sm font-semibold text-white">{selectedPortfolio.name}</div>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                        </motion.button>

                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute top-full mt-2 left-0 w-64 rounded-xl bg-[#1A1A28] border border-cyan-500/20 shadow-2xl overflow-hidden"
                                >
                                    {portfolios.map((portfolio) => (
                                        <motion.button
                                            key={portfolio.id}
                                            whileHover={{ backgroundColor: "#20202E" }}
                                            onClick={() => {
                                                setSelectedPortfolio(portfolio);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={`w-full px-4 py-3 text-left transition-colors ${selectedPortfolio.id === portfolio.id ? "bg-cyan-500/10" : ""
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-sm font-medium text-white">{portfolio.name}</div>
                                                    <div className="text-xs text-gray-400">{formatCurrency(portfolio.value)}</div>
                                                </div>
                                                <div className={`text-sm font-semibold ${portfolio.changePercent >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                                                    {portfolio.changePercent >= 0 ? "+" : ""}{portfolio.changePercent}%
                                                </div>
                                            </div>
                                        </motion.button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Portfolio Value */}
                    <div className="hidden md:flex items-center gap-4 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                        <div className="text-right">
                            <div className="text-xs text-gray-400">Total Value</div>
                            <div className="text-xl font-bold text-white">{formatCurrency(selectedPortfolio.value)}</div>
                        </div>
                        <div className="h-8 w-px bg-cyan-500/20" />
                        <div className="flex items-center gap-1">
                            {selectedPortfolio.changePercent >= 0 ? (
                                <TrendingUp className="w-4 h-4 text-emerald-400" />
                            ) : (
                                <TrendingDown className="w-4 h-4 text-red-400" />
                            )}
                            <div className={`text-sm font-semibold ${selectedPortfolio.changePercent >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                                {selectedPortfolio.changePercent >= 0 ? "+" : ""}{selectedPortfolio.changePercent}%
                            </div>
                        </div>
                    </div>

                    {/* User Section */}
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:block text-right">
                            <div className="text-sm font-medium text-white">John Doe</div>
                            <div className="text-xs text-gray-400">Premium</div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400"
                        >
                            <User className="w-5 h-5 text-white" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                            className="w-10 h-10 rounded-lg hover:bg-[#1A1A28]"
                        >
                            <Settings className={`w-5 h-5 text-gray-400 transition-transform ${isSettingsOpen ? "rotate-90" : ""}`} />
                        </Button>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
