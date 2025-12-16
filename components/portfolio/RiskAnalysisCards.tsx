"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    TrendingDown,
    AlertTriangle,
    Target,
    Activity,
    PieChart,
    HelpCircle,
    Sparkles,
    Shield,
    Percent,
    BarChart3,
} from "lucide-react";

type StatusColor = "critical" | "warning" | "caution" | "good";

interface RiskMetric {
    id: string;
    title: string;
    value: string;
    status: StatusColor;
    icon: React.ElementType;
    details: {
        what: string;
        why: string;
        portfolio: string;
    };
}

const statusConfig = {
    critical: { color: "#ef4444", bgColor: "bg-red-500/10", borderColor: "border-red-500/30" },
    warning: { color: "#f59e0b", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/30" },
    caution: { color: "#eab308", bgColor: "bg-yellow-500/10", borderColor: "border-yellow-500/30" },
    good: { color: "#10b981", bgColor: "bg-emerald-500/10", borderColor: "border-emerald-500/30" }
};

const riskMetrics: RiskMetric[] = [
    {
        id: "var",
        title: "VaR 95%",
        value: "$18.2K",
        status: "warning",
        icon: AlertTriangle,
        details: {
            what: "Value at Risk – Maximum expected daily loss (95% confidence)",
            why: "Essential for liquidity planning and risk budgeting",
            portfolio: "VaR = 12% of portfolio. Conservative norm: 3-5%"
        }
    },
    {
        id: "mdd",
        title: "Max DD",
        value: "32.1%",
        status: "critical",
        icon: TrendingDown,
        details: {
            what: "Maximum Drawdown – Peak to trough loss",
            why: "MDD > 30% creates serious concern. Need 47% gain to recover",
            portfolio: "Last 18mo MDD: 32.1% — 2x worse than S&P 500 (17%)"
        }
    },
    {
        id: "beta",
        title: "Beta",
        value: "1.2",
        status: "caution",
        icon: Activity,
        details: {
            what: "Portfolio sensitivity to market movements",
            why: "Beta > 1 means higher volatility than market",
            portfolio: "1.2 beta = 20% more volatile than S&P 500"
        }
    },
    {
        id: "sharpe",
        title: "Sharpe",
        value: "1.82",
        status: "good",
        icon: Target,
        details: {
            what: "Risk-adjusted return – Return per unit of risk",
            why: "1.5+ excellent, 1.0+ good, <1.0 poor",
            portfolio: "1.82 — 92% above S&P 500 average (0.95)"
        }
    },
    {
        id: "volatility",
        title: "Volatility",
        value: "24.5%",
        status: "warning",
        icon: BarChart3,
        details: {
            what: "Annual volatility (standard deviation)",
            why: "Higher volatility = wider price swings",
            portfolio: "24.5% vs S&P 500 at 18%. 36% more volatile"
        }
    },
    {
        id: "sortino",
        title: "Sortino",
        value: "2.1",
        status: "good",
        icon: TrendingDown,
        details: {
            what: "Downside risk-adjusted return",
            why: "Like Sharpe but only penalizes downside volatility",
            portfolio: "2.1 = excellent downside protection"
        }
    },
    {
        id: "diversification",
        title: "Diversity",
        value: "Medium",
        status: "caution",
        icon: PieChart,
        details: {
            what: "Portfolio concentration across assets",
            why: "Good diversification protects from market drops",
            portfolio: "Tech: 71.7% — too high. AAPL-MSFT correlation: 0.85"
        }
    },
    {
        id: "calmar",
        title: "Calmar",
        value: "0.45",
        status: "caution",
        icon: Percent,
        details: {
            what: "Return divided by Max Drawdown",
            why: "Higher is better. Measures return vs worst loss",
            portfolio: "0.45 = moderate. Target > 0.5 for good performance"
        }
    },
    {
        id: "omega",
        title: "Omega",
        value: "1.35",
        status: "good",
        icon: Target,
        details: {
            what: "Probability-weighted gains vs losses",
            why: "Omega > 1.0 means gains outweigh losses",
            portfolio: "1.35 = strong risk/reward profile"
        }
    },
    {
        id: "what-if",
        title: "Stress Test",
        value: "-8.5%",
        status: "warning",
        icon: HelpCircle,
        details: {
            what: "Impact of macro events on portfolio",
            why: "Proactive risk management – 'what if?' scenarios",
            portfolio: "Fed +50bp → Portfolio: -6% to -9%. TSLA most affected"
        }
    }
];

export function RiskAnalysisCards() {
    const [expandedCard, setExpandedCard] = useState<string | null>(null);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    return (
        <div className="w-full">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                    <Shield className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-white">Risk Metrics</h2>
                    <p className="text-xs text-gray-400">Portfolio Analytics</p>
                </div>
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="ml-auto"
                >
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                </motion.div>
            </div>

            {/* 2×5 Grid Layout - Exact sizing: 110×90px per card, 10px gaps */}
            <div className="grid grid-cols-5 gap-[10px]">
                {riskMetrics.map((metric, index) => {
                    const config = statusConfig[metric.status];

                    return (
                        <motion.div
                            key={metric.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onMouseEnter={() => setHoveredCard(metric.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                            onClick={() => setExpandedCard(expandedCard === metric.id ? null : metric.id)}
                            className={`relative overflow-hidden rounded-xl border ${config.borderColor} ${config.bgColor} backdrop-blur-sm cursor-pointer transition-all`}
                            style={{ width: '110px', height: '90px' }}
                        >
                            {/* Glow effect on hover */}
                            <AnimatePresence>
                                {hoveredCard === metric.id && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0"
                                        style={{ boxShadow: `0 0 20px ${config.color}40` }}
                                    />
                                )}
                            </AnimatePresence>

                            <div className="relative p-2.5 h-full flex flex-col">
                                {/* Icon - Color indicator */}
                                <div className="flex items-center justify-between mb-1.5">
                                    <div className={`p-1 rounded ${config.bgColor}`}>
                                        <metric.icon className="w-3 h-3" style={{ color: config.color }} />
                                    </div>
                                </div>

                                {/* Title */}
                                <div className="text-[9px] font-medium text-gray-400 mb-0.5 uppercase tracking-wider">
                                    {metric.title}
                                </div>

                                {/* Value */}
                                <div className="text-base font-bold text-white mb-auto">
                                    {metric.value}
                                </div>

                                {/* Status dot */}
                                <div className="flex items-center justify-end">
                                    <div
                                        className="w-1.5 h-1.5 rounded-full"
                                        style={{ backgroundColor: config.color }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Expanded Details Panel */}
            <AnimatePresence>
                {expandedCard && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="overflow-hidden"
                    >
                        {riskMetrics.filter(m => m.id === expandedCard).map(metric => {
                            const config = statusConfig[metric.status];

                            return (
                                <motion.div
                                    key={metric.id}
                                    initial={{ y: -20 }}
                                    animate={{ y: 0 }}
                                    className="bg-[#1e1b4b]/80 backdrop-blur-xl rounded-xl border border-cyan-500/30 p-5"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`p-2 rounded-lg ${config.bgColor}`}>
                                            <metric.icon className="w-5 h-5" style={{ color: config.color }} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">{metric.title}</h3>
                                            <p className="text-xs text-gray-400">AI Risk Analysis</p>
                                        </div>
                                        <div className="ml-auto text-2xl font-bold" style={{ color: config.color }}>
                                            {metric.value}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* What */}
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="bg-[#2d2a5d]/50 rounded-lg p-3"
                                        >
                                            <div className="text-xs font-semibold text-cyan-400 mb-2">– What?</div>
                                            <p className="text-sm text-gray-300">{metric.details.what}</p>
                                        </motion.div>

                                        {/* Why */}
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="bg-[#2d2a5d]/50 rounded-lg p-3"
                                        >
                                            <div className="text-xs font-semibold text-purple-400 mb-2">– Why Important?</div>
                                            <p className="text-sm text-gray-300">{metric.details.why}</p>
                                        </motion.div>

                                        {/* Your Portfolio */}
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="bg-[#2d2a5d]/50 rounded-lg p-3"
                                        >
                                            <div className="text-xs font-semibold text-emerald-400 mb-2">– Your Portfolio</div>
                                            <p className="text-sm text-gray-300">{metric.details.portfolio}</p>
                                        </motion.div>
                                    </div>

                                    <p className="text-[10px] text-gray-500 mt-4 text-center">
                                        This analysis is for informational purposes only and not investment advice.
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
