"use client";

import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown, Activity, Shield, Zap } from "lucide-react";

interface SummaryCard {
    label: string;
    value: string;
    change?: string;
    status: 'green' | 'red' | 'yellow';
    icon: React.ReactNode;
}

const summaryCards: SummaryCard[] = [
    {
        label: "Total Equity",
        value: "$487,250",
        change: "+0.70%",
        status: "green",
        icon: <DollarSign className="w-5 h-5" />,
    },
    {
        label: "Daily P&L",
        value: "$3,421",
        status: "green",
        icon: <TrendingUp className="w-5 h-5" />,
    },
    {
        label: "Max Drawdown",
        value: "-8.2%",
        status: "red",
        icon: <TrendingDown className="w-5 h-5" />,
    },
    {
        label: "CVaR 95%",
        value: "18.72k",
        status: "yellow",
        icon: <Activity className="w-5 h-5" />,
    },
    {
        label: "Risk Status",
        value: "NORMAL",
        status: "green",
        icon: <Shield className="w-5 h-5" />,
    },
    {
        label: "Market Regime",
        value: "RISK-OFF",
        status: "yellow",
        icon: <Zap className="w-5 h-5" />,
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
};

export function TopSummaryCards() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {summaryCards.map((card, idx) => {
                const colors = statusColors[card.status];
                return (
                    <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-xl p-4 relative overflow-hidden`}
                    >
                        {/* Gradient border effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                        <div className="relative">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-gray-400 uppercase tracking-wider">{card.label}</span>
                                <div className={`w-8 h-8 rounded-lg ${colors.icon} flex items-center justify-center`}>
                                    {card.icon}
                                </div>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-xl font-bold text-white">{card.value}</span>
                                {card.change && (
                                    <span className={`text-sm font-medium ${colors.text}`}>{card.change}</span>
                                )}
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
