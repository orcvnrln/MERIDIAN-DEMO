"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    DollarSign,
    TrendingUp,
    TrendingDown,
    Activity,
    Shield,
    Zap,
    Target,
    Percent,
    BarChart3,
    Scale,
    PieChart,
    Brain,
    Globe,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";
import { mockPortfolioMetrics, formatCurrency, formatPercent } from "@/lib/mock-data/portfolio";

interface MetricCard {
    label: string;
    value: string;
    change?: string;
    status: 'green' | 'red' | 'yellow' | 'blue' | 'purple';
    icon: React.ReactNode;
    tooltip?: string;
}

const metrics = mockPortfolioMetrics;

// Primary metrics (large cards)
const primaryMetrics: MetricCard[] = [
    {
        label: "Total Portfolio Value",
        value: formatCurrency(metrics.totalValue),
        change: `+${metrics.todaysPLPercent.toFixed(2)}%`,
        status: "green",
        icon: <DollarSign className="w-5 h-5" />,
    },
    {
        label: "Daily P&L",
        value: formatCurrency(metrics.todaysPL),
        change: `+${metrics.todaysPLPercent.toFixed(2)}%`,
        status: metrics.todaysPL >= 0 ? "green" : "red",
        icon: metrics.todaysPL >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />,
    },
    {
        label: "YTD Return",
        value: `+${metrics.ytdReturn.toFixed(1)}%`,
        change: `vs S&P: +${metrics.spComparison}%`,
        status: "green",
        icon: <BarChart3 className="w-5 h-5" />,
    },
    {
        label: "Annualized Return",
        value: `${metrics.annualizedReturn.toFixed(1)}%`,
        status: "blue",
        icon: <Target className="w-5 h-5" />,
    },
];

// Risk metrics (medium cards)
const riskMetrics: MetricCard[] = [
    {
        label: "Max Drawdown",
        value: `-${metrics.maxDrawdown.toFixed(1)}%`,
        status: metrics.maxDrawdown > 20 ? "red" : metrics.maxDrawdown > 10 ? "yellow" : "green",
        icon: <TrendingDown className="w-4 h-4" />,
    },
    {
        label: "Volatility",
        value: `${metrics.volatility.toFixed(1)}%`,
        status: metrics.volatility > 25 ? "yellow" : "green",
        icon: <Activity className="w-4 h-4" />,
    },
    {
        label: "VaR 95%",
        value: formatCurrency(metrics.var95),
        status: "yellow",
        icon: <Shield className="w-4 h-4" />,
    },
    {
        label: "VaR 99%",
        value: formatCurrency(metrics.var99),
        status: "red",
        icon: <Shield className="w-4 h-4" />,
    },
];

// Ratio metrics
const ratioMetrics: MetricCard[] = [
    {
        label: "Sharpe",
        value: metrics.sharpeRatio.toFixed(2),
        status: metrics.sharpeRatio > 1.5 ? "green" : metrics.sharpeRatio > 1 ? "yellow" : "red",
        icon: <Scale className="w-4 h-4" />,
    },
    {
        label: "Sortino",
        value: metrics.sortinoRatio.toFixed(2),
        status: metrics.sortinoRatio > 2 ? "green" : metrics.sortinoRatio > 1 ? "yellow" : "red",
        icon: <Scale className="w-4 h-4" />,
    },
    {
        label: "Calmar",
        value: metrics.calmarRatio.toFixed(2),
        status: metrics.calmarRatio > 2 ? "green" : metrics.calmarRatio > 1 ? "yellow" : "red",
        icon: <Target className="w-4 h-4" />,
    },
    {
        label: "Beta",
        value: metrics.beta.toFixed(2),
        status: metrics.beta > 1.3 ? "yellow" : "green",
        icon: <Activity className="w-4 h-4" />,
    },
    {
        label: "Alpha",
        value: `+${metrics.alpha.toFixed(1)}%`,
        status: metrics.alpha > 0 ? "green" : "red",
        icon: <Zap className="w-4 h-4" />,
    },
];

// AI & Additional metrics
const aiMetrics: MetricCard[] = [
    {
        label: "AI Score",
        value: `${metrics.fundamentalAIScore}/100`,
        status: metrics.fundamentalAIScore > 70 ? "green" : metrics.fundamentalAIScore > 50 ? "yellow" : "red",
        icon: <Brain className="w-4 h-4" />,
    },
    {
        label: "GRI",
        value: `${metrics.geopoliticalRiskIndex}/100`,
        status: metrics.geopoliticalRiskIndex < 40 ? "green" : metrics.geopoliticalRiskIndex < 60 ? "yellow" : "red",
        icon: <Globe className="w-4 h-4" />,
    },
    {
        label: "Diversification",
        value: `${metrics.diversificationIndex}%`,
        status: metrics.diversificationIndex > 70 ? "green" : metrics.diversificationIndex > 50 ? "yellow" : "red",
        icon: <PieChart className="w-4 h-4" />,
    },
    {
        label: "Win Rate",
        value: `${metrics.winRate}%`,
        status: metrics.winRate > 60 ? "green" : metrics.winRate > 50 ? "yellow" : "red",
        icon: <Target className="w-4 h-4" />,
    },
];

const statusColors = {
    green: {
        border: "border-emerald-500/40",
        bg: "from-emerald-500/10 to-emerald-500/5",
        icon: "bg-emerald-500/20 text-emerald-400",
        text: "text-emerald-400",
    },
    red: {
        border: "border-red-500/40",
        bg: "from-red-500/10 to-red-500/5",
        icon: "bg-red-500/20 text-red-400",
        text: "text-red-400",
    },
    yellow: {
        border: "border-yellow-500/40",
        bg: "from-yellow-500/10 to-yellow-500/5",
        icon: "bg-yellow-500/20 text-yellow-400",
        text: "text-yellow-400",
    },
    blue: {
        border: "border-cyan-500/40",
        bg: "from-cyan-500/10 to-cyan-500/5",
        icon: "bg-cyan-500/20 text-cyan-400",
        text: "text-cyan-400",
    },
    purple: {
        border: "border-purple-500/40",
        bg: "from-purple-500/10 to-purple-500/5",
        icon: "bg-purple-500/20 text-purple-400",
        text: "text-purple-400",
    },
};

function MetricCardComponent({ card, index, size = "normal" }: { card: MetricCard; index: number; size?: "large" | "normal" | "small" }) {
    const [showTooltip, setShowTooltip] = useState(false);
    const colors = statusColors[card.status];
    const sizeClasses = {
        large: "p-5",
        normal: "p-4",
        small: "p-3",
    };
    const valueClasses = {
        large: "text-2xl",
        normal: "text-lg",
        small: "text-base",
    };

    const tooltipContent: Record<string, string> = {
        "Total Portfolio Value": "Current market value of all your holdings including cash",
        "Daily P&L": "Profit/Loss for today compared to yesterday's close",
        "YTD Return": "Year-to-date return percentage. Outperforming S&P 500",
        "Annualized Return": "Average yearly return if current performance continues",
        "Max Drawdown": "Largest peak-to-trough decline in portfolio value",
        "Volatility": "Standard deviation of returns - measures price swings",
        "VaR 95%": "95% confidence: won't lose more than this in a day",
        "VaR 99%": "99% confidence: won't lose more than this in a day",
        "Sharpe": "Risk-adjusted return. >1.5 is excellent, >2 is exceptional",
        "Sortino": "Like Sharpe but only considers downside volatility",
        "Calmar": "Return divided by max drawdown. Higher is better",
        "Beta": "Volatility vs market. 1.0 = same as market, >1 = more volatile",
        "Alpha": "Excess return vs market benchmark after adjusting for risk",
        "AI Score": "AI-powered fundamental analysis score (0-100)",
        "GRI": "Geopolitical Risk Index - lower is better",
        "Diversification": "Portfolio diversification score - higher is better",
        "Win Rate": "Percentage of winning trades vs total trades",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            whileHover={{
                scale: 1.03,
                boxShadow: `0 0 30px ${card.status === 'green' ? 'rgba(16, 185, 129, 0.3)' :
                    card.status === 'red' ? 'rgba(239, 68, 68, 0.3)' :
                        card.status === 'yellow' ? 'rgba(234, 179, 8, 0.3)' :
                            card.status === 'blue' ? 'rgba(6, 182, 212, 0.3)' :
                                'rgba(168, 85, 247, 0.3)'
                    }`
            }}
            onHoverStart={() => setShowTooltip(true)}
            onHoverEnd={() => setShowTooltip(false)}
            className={`bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-xl ${sizeClasses[size]} relative overflow-hidden transition-all cursor-pointer group`}
        >
            {/* Glow effect on hover */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle at 50% 0%, ${card.status === 'green' ? 'rgba(16, 185, 129, 0.15)' :
                        card.status === 'red' ? 'rgba(239, 68, 68, 0.15)' :
                            card.status === 'yellow' ? 'rgba(234, 179, 8, 0.15)' :
                                card.status === 'blue' ? 'rgba(6, 182, 212, 0.15)' :
                                    'rgba(168, 85, 247, 0.15)'
                        }, transparent 70%)`
                }}
            />

            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            <div className="relative">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400 uppercase tracking-wider">{card.label}</span>
                    <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`w-7 h-7 rounded-lg ${colors.icon} flex items-center justify-center`}
                    >
                        {card.icon}
                    </motion.div>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className={`${valueClasses[size]} font-bold text-white`}>{card.value}</span>
                    {card.change && (
                        <span className={`text-xs font-medium ${colors.text} flex items-center gap-0.5`}>
                            {card.change.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            {card.change}
                        </span>
                    )}
                </div>
            </div>

            {/* Tooltip */}
            <AnimatePresence>
                {showTooltip && tooltipContent[card.label] && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full z-50 pointer-events-none"
                    >
                        <div className="bg-[#1a1a24] border border-gray-700 rounded-lg px-3 py-2 shadow-2xl max-w-xs">
                            <p className="text-xs text-gray-300 text-center">{tooltipContent[card.label]}</p>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-[#1a1a24] border-r border-b border-gray-700" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function ComprehensiveMetricsGrid() {
    return (
        <div className="space-y-4 mb-6">
            {/* Primary Metrics - Large Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {primaryMetrics.map((card, idx) => (
                    <MetricCardComponent key={card.label} card={card} index={idx} size="large" />
                ))}
            </div>

            {/* Risk + Ratios + AI - Three column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Risk Metrics */}
                <div className="bg-[#12121a] border border-gray-800/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Shield className="w-4 h-4 text-red-400" />
                        <span className="text-sm font-semibold text-white">Risk Metrics</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {riskMetrics.map((card, idx) => (
                            <MetricCardComponent key={card.label} card={card} index={idx} size="small" />
                        ))}
                    </div>
                </div>

                {/* Ratio Metrics */}
                <div className="bg-[#12121a] border border-gray-800/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Scale className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-semibold text-white">Performance Ratios</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {ratioMetrics.slice(0, 4).map((card, idx) => (
                            <MetricCardComponent key={card.label} card={card} index={idx} size="small" />
                        ))}
                    </div>
                    <div className="mt-2">
                        <MetricCardComponent card={ratioMetrics[4]} index={4} size="small" />
                    </div>
                </div>

                {/* AI & Diversification Metrics */}
                <div className="bg-[#12121a] border border-gray-800/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Brain className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-semibold text-white">AI & Diversification</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {aiMetrics.map((card, idx) => (
                            <MetricCardComponent key={card.label} card={card} index={idx} size="small" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
