"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    TrendingDown,
    AlertTriangle,
    Target,
    Activity,
    PieChart,
    HelpCircle,
    Shield,
    TrendingUp,
    BarChart3,
} from "lucide-react";

interface MetricData {
    id: string;
    title: string;
    value: string;
    change?: string;
    isPositive?: boolean;
    icon: React.ElementType;
    color: string;
    progress?: number;
}

const metrics: MetricData[] = [
    { id: "mdd", title: "Max Drawdown", value: "32.1%", change: "-5.2%", isPositive: false, icon: TrendingDown, color: "text-red-400", progress: 32 },
    { id: "var", title: "VaR 95%", value: "-$7,450", icon: AlertTriangle, color: "text-amber-400", progress: 65 },
    { id: "sharpe", title: "Sharpe", value: "1.82", change: "+0.12", isPositive: true, icon: Target, color: "text-emerald-400", progress: 82 },
    { id: "sortino", title: "Sortino", value: "0.78", change: "-0.05", isPositive: false, icon: Activity, color: "text-purple-400", progress: 45 },
    { id: "beta", title: "Beta", value: "1.45", icon: BarChart3, color: "text-cyan-400", progress: 72 },
    { id: "alpha", title: "Alpha", value: "8.2%", change: "+1.1%", isPositive: true, icon: TrendingUp, color: "text-emerald-400", progress: 58 },
];

const scenarios = [
    { type: "best", label: "Ən yaxşı", return: "+32.5%", prob: 15, color: "bg-emerald-500" },
    { type: "base", label: "Baza", return: "+8.2%", prob: 60, color: "bg-cyan-500" },
    { type: "worst", label: "Ən pis", return: "-18.7%", prob: 25, color: "bg-red-500" },
];

export function CompactRiskPanel() {
    const [activeMetric, setActiveMetric] = useState<string | null>(null);

    return (
        <div className="bg-[#1e1b4b]/80 backdrop-blur-xl rounded-xl border border-cyan-500/20 p-4 h-full overflow-y-auto">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-cyan-500/20">
                <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="p-1.5 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20"
                >
                    <Shield className="w-4 h-4 text-cyan-400" />
                </motion.div>
                <div>
                    <h3 className="text-sm font-semibold text-white">Risk Analizi</h3>
                    <p className="text-[10px] text-gray-400">Real-time MFE</p>
                </div>
            </div>

            {/* Risk Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
                {metrics.map((metric, index) => (
                    <motion.div
                        key={metric.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        onMouseEnter={() => setActiveMetric(metric.id)}
                        onMouseLeave={() => setActiveMetric(null)}
                        className={`relative p-2.5 rounded-lg bg-[#2d2a5d]/50 border transition-all cursor-pointer ${activeMetric === metric.id ? "border-cyan-500/50" : "border-transparent"
                            }`}
                    >
                        <div className="flex items-center justify-between mb-1">
                            <metric.icon className={`w-3.5 h-3.5 ${metric.color}`} />
                            {metric.change && (
                                <span className={`text-[9px] ${metric.isPositive ? "text-emerald-400" : "text-red-400"}`}>
                                    {metric.change}
                                </span>
                            )}
                        </div>
                        <div className={`text-base font-bold ${metric.color}`}>{metric.value}</div>
                        <div className="text-[10px] text-gray-400">{metric.title}</div>

                        {/* Mini progress bar */}
                        {metric.progress && (
                            <div className="mt-1.5 h-1 bg-[#1e1b4b] rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${metric.progress}%` }}
                                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                                    className={`h-full rounded-full ${metric.color.includes("emerald") ? "bg-emerald-500" :
                                            metric.color.includes("red") ? "bg-red-500" :
                                                metric.color.includes("amber") ? "bg-amber-500" :
                                                    metric.color.includes("purple") ? "bg-purple-500" :
                                                        "bg-cyan-500"
                                        }`}
                                />
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Monte Carlo Section */}
            <div className="mb-4">
                <div className="flex items-center gap-1.5 mb-2">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-xs text-gray-300">Monte Carlo (10K sim)</span>
                </div>

                {/* Distribution Chart */}
                <div className="bg-[#2d2a5d]/30 rounded-lg p-3">
                    <div className="flex items-end justify-between gap-0.5 h-16 mb-2">
                        {[5, 12, 25, 40, 60, 80, 100, 90, 70, 45, 30, 18, 10, 5, 2].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: 0.5 + i * 0.03, duration: 0.4, ease: "easeOut" }}
                                className={`flex-1 rounded-t ${i < 4 ? "bg-red-500/70" : i > 10 ? "bg-emerald-500/70" : "bg-cyan-500/70"
                                    }`}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between text-[9px] text-gray-500">
                        <span>-25%</span>
                        <span>0%</span>
                        <span>+35%</span>
                    </div>
                </div>
            </div>

            {/* Scenarios */}
            <div className="mb-4">
                <div className="text-xs text-gray-300 mb-2">12 aylıq ssenarilər</div>
                <div className="space-y-1.5">
                    {scenarios.map((s, i) => (
                        <motion.div
                            key={s.type}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + i * 0.1 }}
                            className="flex items-center gap-2"
                        >
                            <div className={`w-2 h-2 rounded-full ${s.color}`} />
                            <span className="text-[10px] text-gray-400 w-12">{s.label}</span>
                            <div className="flex-1 h-1.5 bg-[#2d2a5d] rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${s.prob}%` }}
                                    transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                                    className={`h-full rounded-full ${s.color}`}
                                />
                            </div>
                            <span className={`text-xs font-semibold w-14 text-right ${s.type === "best" ? "text-emerald-400" : s.type === "worst" ? "text-red-400" : "text-cyan-400"
                                }`}>
                                {s.return}
                            </span>
                            <span className="text-[9px] text-gray-500 w-8">{s.prob}%</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Expected Value */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-3 border border-cyan-500/20"
            >
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-[10px] text-gray-400">Gözlənilən Dəyər</div>
                        <div className="text-lg font-bold text-cyan-400">$42,794</div>
                        <div className="text-[10px] text-emerald-400">+8.2% ortalama</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] text-gray-400">95% VaR</div>
                        <div className="text-sm font-semibold text-red-400">$32,156</div>
                    </div>
                </div>
            </motion.div>

            {/* Correlation Mini Matrix */}
            <div className="mt-4">
                <div className="flex items-center gap-1.5 mb-2">
                    <PieChart className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-xs text-gray-300">Korrelyasiya</span>
                </div>
                <div className="grid grid-cols-4 gap-1 text-[8px]">
                    <div></div>
                    {["NVDA", "TSLA", "MSFT"].map(s => (
                        <div key={s} className="text-center text-gray-400">{s}</div>
                    ))}
                    {[
                        ["NVDA", 1.00, 0.72, 0.78],
                        ["TSLA", 0.72, 1.00, 0.52],
                        ["MSFT", 0.78, 0.52, 1.00],
                    ].map((row, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 + i * 0.1 }}
                            className="contents"
                        >
                            <div className="text-gray-400">{row[0]}</div>
                            {[1, 2, 3].map(j => (
                                <div
                                    key={j}
                                    className={`text-center py-1 rounded ${row[j] === 1.00 ? "bg-cyan-500/30 text-cyan-400" :
                                            (row[j] as number) > 0.7 ? "bg-amber-500/20 text-amber-400" :
                                                "bg-emerald-500/20 text-emerald-400"
                                        }`}
                                >
                                    {(row[j] as number).toFixed(2)}
                                </div>
                            ))}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
