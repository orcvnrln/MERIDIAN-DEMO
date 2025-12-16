"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    BarChart3,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    Briefcase,
    ShoppingCart,
    Newspaper,
    Bot,
    Wallet,
    PieChart,
    Target,
    AlertTriangle,
    ChevronRight,
    Clock,
    Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layout/AppLayout";

// Quick link cards data
const quickLinks = [
    {
        title: "Portfolio",
        description: "View holdings & performance",
        icon: Briefcase,
        href: "/portfolio",
        color: "from-emerald-500/20 to-emerald-500/5",
        borderColor: "border-emerald-500/30",
        iconColor: "text-emerald-400"
    },
    {
        title: "Trade",
        description: "Execute trades",
        icon: TrendingUp,
        href: "/",
        color: "from-cyan-500/20 to-cyan-500/5",
        borderColor: "border-cyan-500/30",
        iconColor: "text-cyan-400"
    },
    {
        title: "Markets",
        description: "Market overview & watchlist",
        icon: BarChart3,
        href: "/markets",
        color: "from-purple-500/20 to-purple-500/5",
        borderColor: "border-purple-500/30",
        iconColor: "text-purple-400"
    },
    {
        title: "Orders",
        description: "Open & filled orders",
        icon: ShoppingCart,
        href: "/orders",
        color: "from-amber-500/20 to-amber-500/5",
        borderColor: "border-amber-500/30",
        iconColor: "text-amber-400"
    },
    {
        title: "Wallet",
        description: "Funds & transfers",
        icon: Wallet,
        href: "/wallet",
        color: "from-pink-500/20 to-pink-500/5",
        borderColor: "border-pink-500/30",
        iconColor: "text-pink-400"
    },
    {
        title: "News",
        description: "Market news & analysis",
        icon: Newspaper,
        href: "/news",
        color: "from-blue-500/20 to-blue-500/5",
        borderColor: "border-blue-500/30",
        iconColor: "text-blue-400"
    },
    {
        title: "AI Assistant",
        description: "AI-powered insights",
        icon: Bot,
        href: "/ai",
        color: "from-violet-500/20 to-violet-500/5",
        borderColor: "border-violet-500/30",
        iconColor: "text-violet-400"
    },
];

// Mock market data
const marketOverview = [
    { symbol: "BTC/USD", name: "Bitcoin", price: 42150.80, change: 2.34, volume: "24.5B" },
    { symbol: "ETH/USD", name: "Ethereum", price: 2245.60, change: 3.12, volume: "12.8B" },
    { symbol: "AAPL", name: "Apple Inc", price: 182.34, change: 1.45, volume: "65.2M" },
    { symbol: "NVDA", name: "NVIDIA", price: 498.20, change: -0.82, volume: "48.1M" },
    { symbol: "MSFT", name: "Microsoft", price: 378.45, change: 0.95, volume: "28.3M" },
];

// Mock alerts
const recentAlerts = [
    { type: "warning", message: "TSLA down 5% - Stop loss approaching", time: "2m ago" },
    { type: "info", message: "BTC crossed $42,000 resistance", time: "15m ago" },
    { type: "success", message: "AAPL order filled at $182.34", time: "1h ago" },
];

// Mock recent activity
const recentActivity = [
    { action: "Buy", symbol: "AAPL", amount: 50, price: 182.34, time: "1h ago" },
    { action: "Sell", symbol: "TSLA", amount: 25, price: 238.65, time: "3h ago" },
    { action: "Buy", symbol: "BTC", amount: 0.5, price: 41200, time: "1d ago" },
];

export default function DashboardPage() {
    return (
        <AppLayout>
            <div className="max-w-[1800px] mx-auto px-6 py-6">
                {/* Welcome Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-white mb-2">Xoş gəldiniz! 👋</h1>
                    <p className="text-gray-400">Portfel və bazar icmalınız burada.</p>
                </motion.div>

                {/* Top Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30 rounded-xl p-5"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-400">Portfolio Value</span>
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-emerald-400" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-white">$487,250</div>
                        <div className="flex items-center gap-1 mt-1 text-sm text-emerald-400">
                            <ArrowUpRight className="w-4 h-4" />
                            +0.70% today
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/30 rounded-xl p-5"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-400">Today&apos;s P&L</span>
                            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-cyan-400" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-white">+$3,421</div>
                        <div className="flex items-center gap-1 mt-1 text-sm text-cyan-400">
                            <Zap className="w-4 h-4" />
                            Best day this week
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/30 rounded-xl p-5"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-400">Open Positions</span>
                            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                <PieChart className="w-5 h-5 text-purple-400" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-white">12</div>
                        <div className="flex items-center gap-1 mt-1 text-sm text-purple-400">
                            <Target className="w-4 h-4" />
                            8 profitable
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/30 rounded-xl p-5"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-400">Buying Power</span>
                            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                                <Wallet className="w-5 h-5 text-amber-400" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-white">$52,840</div>
                        <div className="flex items-center gap-1 mt-1 text-sm text-amber-400">
                            <Activity className="w-4 h-4" />
                            Available
                        </div>
                    </motion.div>
                </div>

                {/* Quick Links Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="mb-8"
                >
                    <h2 className="text-lg font-semibold text-white mb-4">Tez Keçid</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {quickLinks.map((link, idx) => (
                            <Link key={link.title} href={link.href}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 + idx * 0.05 }}
                                    whileHover={{ scale: 1.03 }}
                                    className={`bg-gradient-to-br ${link.color} border ${link.borderColor} rounded-xl p-4 cursor-pointer transition-all hover:shadow-lg`}
                                >
                                    <div className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-3`}>
                                        <link.icon className={`w-5 h-5 ${link.iconColor}`} />
                                    </div>
                                    <h3 className="font-semibold text-white text-sm">{link.title}</h3>
                                    <p className="text-xs text-gray-400 mt-1">{link.description}</p>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* Two Column Layout: Market Overview + Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Market Overview */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-[#12121a] border border-gray-800/50 rounded-xl"
                    >
                        <div className="p-5 border-b border-gray-800/50 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-white">Bazar İcmalı</h2>
                            <Link href="/markets">
                                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                    Hamısı <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            </Link>
                        </div>
                        <div className="divide-y divide-gray-800/50">
                            {marketOverview.map((item) => (
                                <div key={item.symbol} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                                    <div>
                                        <div className="font-semibold text-white">{item.symbol}</div>
                                        <div className="text-xs text-gray-400">{item.name}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-semibold text-white">${item.price.toLocaleString()}</div>
                                        <div className={`text-xs flex items-center justify-end gap-1 ${item.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                            {item.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                            {item.change >= 0 ? '+' : ''}{item.change}%
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Recent Activity */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.45 }}
                        className="bg-[#12121a] border border-gray-800/50 rounded-xl"
                    >
                        <div className="p-5 border-b border-gray-800/50 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-white">Son Əməliyyatlar</h2>
                            <Link href="/orders">
                                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                    Hamısı <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            </Link>
                        </div>
                        <div className="divide-y divide-gray-800/50">
                            {recentActivity.map((item, idx) => (
                                <div key={idx} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.action === 'Buy' ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                                            {item.action === 'Buy' ?
                                                <TrendingUp className="w-5 h-5 text-emerald-400" /> :
                                                <TrendingDown className="w-5 h-5 text-red-400" />
                                            }
                                        </div>
                                        <div>
                                            <div className="font-semibold text-white">{item.action} {item.symbol}</div>
                                            <div className="text-xs text-gray-400">{item.amount} @ ${item.price.toLocaleString()}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-400">
                                        <Clock className="w-3 h-3" />
                                        {item.time}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Alerts Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-[#12121a] border border-gray-800/50 rounded-xl"
                >
                    <div className="p-5 border-b border-gray-800/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-400" />
                            <h2 className="text-lg font-semibold text-white">Xəbərdarlıqlar</h2>
                        </div>
                        <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full">
                            {recentAlerts.length} yeni
                        </span>
                    </div>
                    <div className="divide-y divide-gray-800/50">
                        {recentAlerts.map((alert, idx) => (
                            <div key={idx} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${alert.type === 'warning' ? 'bg-amber-400' :
                                        alert.type === 'info' ? 'bg-cyan-400' : 'bg-emerald-400'
                                        }`} />
                                    <span className="text-gray-300">{alert.message}</span>
                                </div>
                                <span className="text-xs text-gray-500">{alert.time}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </AppLayout>
    );
}
