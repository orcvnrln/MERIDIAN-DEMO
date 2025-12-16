"use client";

import { motion } from "framer-motion";
import {
    DollarSign,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    Shield,
    Activity,
} from "lucide-react";
import {
    mockPortfolioSummary,
    mockRiskMetrics,
    formatCurrency,
    formatPercent,
    getRiskStatusColor,
    getRegimeColor,
} from "@/lib/mock-data/risk-metrics";

export function TopSummaryPanel() {
    const summary = mockPortfolioSummary;
    const metrics = mockRiskMetrics;

    const cards = [
        {
            icon: DollarSign,
            label: "Total Equity",
            value: formatCurrency(summary.totalEquity),
            change: formatPercent(summary.dailyPLPercent, 2),
            changeValue: formatCurrency(summary.dailyPL),
            isPositive: summary.dailyPL >= 0,
        },
        {
            icon: Shield,
            label: "Cash Buffer",
            value: `${summary.cashBuffer.toFixed(1)}%`,
            progress: summary.cashBuffer,
            subtitle: "Defensive positioning",
        },
        {
            icon: summary.dailyPL >= 0 ? TrendingUp : TrendingDown,
            label: "Daily P&L",
            value: formatCurrency(summary.dailyPL),
            change: formatPercent(summary.dailyPLPercent, 2),
            isPositive: summary.dailyPL >= 0,
            highlight: true,
        },
        {
            icon: Activity,
            label: "Weekly P&L",
            value: formatCurrency(summary.weeklyPL),
            change: formatPercent(summary.weeklyPLPercent, 2),
            isPositive: summary.weeklyPL >= 0,
        },
        {
            icon: TrendingDown,
            label: "Max Drawdown",
            value: `${metrics.maxDrawdown.toFixed(1)}%`,
            subtitle: "30-day rolling",
            isNegative: true,
        },
        {
            icon: AlertTriangle,
            label: "CVaR 95%",
            value: `${metrics.cvar95 / 1000}k`,
            subtitle: `${((metrics.cvar95 / summary.totalEquity) * 100).toFixed(1)}% of equity`,
            warning: true,
        },
        {
            label: "Risk Status",
            value: summary.riskStatus.toUpperCase(),
            badge: true,
            badgeColor: getRiskStatusColor(summary.riskStatus),
        },
        {
            label: "Market Regime",
            value: summary.marketRegime === 'risk_on' ? 'RISK-ON' : 'RISK-OFF',
            badge: true,
            badgeColor: getRegimeColor(summary.marketRegime),
        },
    ];

    return (
        <div className="grid grid-cols-4 gap-4">
            {cards.map((card, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-[#12121a] border border-gray-800/50 rounded-xl p-5 hover:border-gray-700/50 transition-colors"
                >
                    {/* Icon and Label */}
                    <div className="flex items-center justify-between mb-3">
                        {card.icon && (
                            <card.icon
                                className={`w-5 h-5 ${card.isPositive
                                        ? "text-emerald-400"
                                        : card.isNegative
                                            ? "text-red-400"
                                            : card.warning
                                                ? "text-amber-400"
                                                : "text-gray-400"
                                    }`}
                            />
                        )}
                        {card.change && (
                            <span
                                className={`text-sm font-medium ${card.isPositive ? "text-emerald-400" : "text-red-400"
                                    }`}
                            >
                                {card.change}
                            </span>
                        )}
                    </div>

                    {/* Label */}
                    <div className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-medium">
                        {card.label}
                    </div>

                    {/* Value */}
                    {card.badge ? (
                        <div
                            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold border ${card.badgeColor}`}
                        >
                            <span className="w-2 h-2 rounded-full bg-current mr-2 animate-pulse" />
                            {card.value}
                        </div>
                    ) : (
                        <div
                            className={`text-2xl font-bold ${card.highlight
                                    ? card.isPositive
                                        ? "text-emerald-400"
                                        : "text-red-400"
                                    : card.isNegative
                                        ? "text-red-400"
                                        : "text-white"
                                }`}
                        >
                            {card.value}
                            {card.changeValue && (
                                <span className="text-sm font-normal text-gray-400 ml-2">
                                    {card.isPositive ? "+" : ""}
                                    {card.changeValue}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Subtitle or Progress */}
                    {card.subtitle && (
                        <div className="text-xs text-gray-500 mt-1">{card.subtitle}</div>
                    )}
                    {card.progress !== undefined && (
                        <div className="mt-2">
                            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-emerald-500 rounded-full transition-all"
                                    style={{ width: `${card.progress}%` }}
                                />
                            </div>
                        </div>
                    )}
                </motion.div>
            ))}
        </div>
    );
}
