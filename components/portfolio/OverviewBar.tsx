"use client";

import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, Lightbulb, Brain, Target, Activity, DollarSign, TrendingDown } from "lucide-react";

type StatusColor = "critical" | "warning" | "caution" | "good";

interface MetricCardProps {
    title: string;
    value: string;
    subtitle: string;
    status: StatusColor;
    icon: React.ElementType;
}

const statusConfig = {
    critical: { color: "#ef4444", bgColor: "bg-red-500/10", borderColor: "border-red-500/30", emoji: "🔴" },
    warning: { color: "#f59e0b", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/30", emoji: "🟠" },
    caution: { color: "#eab308", bgColor: "bg-yellow-500/10", borderColor: "border-yellow-500/30", emoji: "🟡" },
    good: { color: "#10b981", bgColor: "bg-emerald-500/10", borderColor: "border-emerald-500/30", emoji: "🟢" }
};

function MetricRibbonCard({ title, value, subtitle, status, icon: Icon }: MetricCardProps) {
    const config = statusConfig[status];

    return (
        <motion.div
            whileHover={{
                y: -4,
                boxShadow: `0 8px 24px -4px ${config.color}40`
            }}
            className={`flex-shrink-0 w-[140px] h-[100px] p-3 rounded-xl bg-[#1A1A28]/60 border ${config.borderColor} backdrop-blur-sm cursor-pointer transition-all`}
        >
            <div className="flex items-start justify-between mb-2">
                <div className={`p-1.5 rounded-lg ${config.bgColor}`}>
                    <Icon className="w-3.5 h-3.5" style={{ color: config.color }} />
                </div>
                <span className="text-lg">{config.emoji}</span>
            </div>
            <div className="text-[10px] text-gray-400 mb-0.5 uppercase tracking-wide">{title}</div>
            <div className="text-xl font-bold text-white mb-0.5">{value}</div>
            <div className="text-[9px] text-gray-500 truncate">{subtitle}</div>
        </motion.div>
    );
}

export function OverviewBar() {
    return (
        <div className="mt-20 mb-6">
            {/* Horizontal Scrollable Metrics Ribbon */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
            >
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide hover:scrollbar-default scroll-smooth">
                    <MetricRibbonCard
                        title="💰 Total Value"
                        value="$1.23M"
                        subtitle="+24.5% YTD"
                        status="good"
                        icon={DollarSign}
                    />
                    <MetricRibbonCard
                        title="📈 Today's P&L"
                        value="+$15.2K"
                        subtitle="+1.3% vs SPY +0.8%"
                        status="good"
                        icon={TrendingUp}
                    />
                    <MetricRibbonCard
                        title="⚠️ Value at Risk"
                        value="$18.2K"
                        subtitle="95% Confidence"
                        status="warning"
                        icon={AlertTriangle}
                    />
                    <MetricRibbonCard
                        title="📉 Max Drawdown"
                        value="32.1%"
                        subtitle="vs SPY: 17%"
                        status="critical"
                        icon={TrendingDown}
                    />
                    <MetricRibbonCard
                        title="🎯 Sharpe Ratio"
                        value="1.82"
                        subtitle="Top 15% ✅"
                        status="good"
                        icon={Target}
                    />
                    <MetricRibbonCard
                        title="📊 Beta"
                        value="1.2"
                        subtitle="vs S&P 500"
                        status="caution"
                        icon={Activity}
                    />
                    <MetricRibbonCard
                        title="🔮 AI Confidence"
                        value="92%"
                        subtitle="Model Active"
                        status="good"
                        icon={Brain}
                    />
                </div>
            </motion.div>

            {/* Portfolio Health Score */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-[#1A1A28]/80 to-[#0B0B12]/80 border border-cyan-500/20 backdrop-blur-xl"
            >
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <svg className="w-20 h-20 transform -rotate-90">
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="32"
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth="8"
                                    fill="none"
                                />
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="32"
                                    stroke="url(#healthGradient)"
                                    strokeWidth="8"
                                    fill="none"
                                    strokeDasharray={`${(68 / 100) * 201} 201`}
                                    strokeLinecap="round"
                                />
                                <defs>
                                    <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#22c55e" />
                                        <stop offset="50%" stopColor="#f59e0b" />
                                        <stop offset="100%" stopColor="#ef4444" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-bold text-white">68</span>
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400 mb-1">PORTFOLIO HEALTH</div>
                            <div className="text-2xl font-bold text-white mb-1">68/100</div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-amber-400">🟠 Medium Risk</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex items-center gap-6 flex-wrap">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
                            <AlertTriangle className="w-5 h-5 text-red-400" />
                            <div>
                                <div className="text-xs text-gray-400">Critical Alerts</div>
                                <div className="text-xl font-bold text-red-400">2</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                            <Lightbulb className="w-5 h-5 text-cyan-400" />
                            <div>
                                <div className="text-xs text-gray-400">Actions Pending</div>
                                <div className="text-xl font-bold text-cyan-400">3</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <Brain className="w-5 h-5 text-purple-400" />
                            <div>
                                <div className="text-xs text-gray-400">AI Status</div>
                                <div className="text-sm font-bold text-purple-400 flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                    ACTIVE
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
