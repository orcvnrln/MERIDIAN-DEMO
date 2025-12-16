"use client";

import { DollarSign, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

interface MetricCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    change?: string;
    changeColor?: string;
    borderColor?: string;
    badge?: string;
    badgeColor?: string;
}

function MetricCard({ icon, label, value, change, changeColor, borderColor, badge, badgeColor }: MetricCardProps) {
    return (
        <div className={`bg-[#12121a] border ${borderColor || 'border-gray-800/50'} rounded-xl p-5 transition-all duration-200 hover:scale-[1.02]`}>
            <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-white/5">
                    {icon}
                </div>
                {change && (
                    <span className={`text-sm font-medium ${changeColor}`}>
                        {change}
                    </span>
                )}
                {badge && (
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${badgeColor}`}>
                        {badge}
                    </span>
                )}
            </div>
            <div className="text-xs text-gray-400 mb-1">{label}</div>
            <div className="text-2xl font-bold text-white">{value}</div>
        </div>
    );
}

export function PortfolioMetricsRow() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Total Equity */}
            <MetricCard
                icon={<DollarSign className="w-5 h-5 text-emerald-400" />}
                label="Total Equity"
                value="$487,250"
                change="+0.70%"
                changeColor="text-emerald-400"
                borderColor="border-emerald-500/30"
            />

            {/* Daily P&L */}
            <MetricCard
                icon={<TrendingUp className="w-5 h-5 text-emerald-400" />}
                label="Daily P&L"
                value="+$3,421"
                change="+0.70%"
                changeColor="text-emerald-400"
            />

            {/* Max Drawdown */}
            <MetricCard
                icon={<TrendingDown className="w-5 h-5 text-red-400" />}
                label="Max Drawdown"
                value="-8.2%"
                change=""
                borderColor="border-red-500/30"
            />

            {/* Market Regime */}
            <MetricCard
                icon={<AlertTriangle className="w-5 h-5 text-yellow-400" />}
                label="Market Regime"
                value="RISK-OFF"
                badge="RISK-OFF"
                badgeColor="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
            />
        </div>
    );
}
