"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Target, Activity, AlertTriangle, BarChart3 } from "lucide-react";

interface RiskSidebarProps {
    isVisible: boolean;
}

const scenarios = [
    { type: "best", return: "+32.5%", prob: "15%", color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { type: "base", return: "+8.2%", prob: "60%", color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { type: "worst", return: "-18.7%", prob: "25%", color: "text-red-400", bg: "bg-red-500/10" }
];

const metrics = [
    { label: "VaR 95%", value: "-$7,450" },
    { label: "Volatility", value: "24.3%" },
    { label: "Sharpe", value: "1.82" },
    { label: "Beta", value: "1.12" }
];

export function RiskSidebar({ isVisible }: RiskSidebarProps) {
    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20, width: 0 }}
            animate={{ opacity: 1, x: 0, width: 280 }}
            exit={{ opacity: 0, x: 20, width: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#1e1b4b]/95 backdrop-blur-xl border-l border-cyan-500/20 h-full overflow-y-auto"
        >
            <div className="p-4 space-y-4">
                {/* Header */}
                <div className="flex items-center gap-2 pb-2 border-b border-cyan-500/20">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-medium text-white">Risk Analizi</span>
                </div>

                {/* Current Value */}
                <div className="bg-[#2d2a5d]/50 rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">Portfel Dəyəri</div>
                    <div className="text-lg font-bold text-white">$39,551.76</div>
                </div>

                {/* Scenarios */}
                <div>
                    <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                        <BarChart3 className="w-3 h-3" /> Ssenarilar (12 ay)
                    </div>
                    <div className="space-y-2">
                        {scenarios.map((s, i) => (
                            <motion.div
                                key={s.type}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`${s.bg} rounded-lg p-2 flex items-center justify-between`}
                            >
                                <div className="flex items-center gap-2">
                                    {s.type === 'best' ? <TrendingUp className="w-3 h-3 text-emerald-400" /> :
                                        s.type === 'worst' ? <TrendingDown className="w-3 h-3 text-red-400" /> :
                                            <Target className="w-3 h-3 text-cyan-400" />}
                                    <span className={`text-sm font-semibold ${s.color}`}>{s.return}</span>
                                </div>
                                <span className="text-xs text-gray-400">P: {s.prob}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Risk Metrics */}
                <div>
                    <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Risk Metriklər
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {metrics.map((m, i) => (
                            <motion.div
                                key={m.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + i * 0.05 }}
                                className="bg-[#2d2a5d]/50 rounded-lg p-2 text-center"
                            >
                                <div className="text-[10px] text-gray-400">{m.label}</div>
                                <div className={`text-sm font-semibold ${m.value.startsWith('-') ? 'text-red-400' : 'text-cyan-400'}`}>
                                    {m.value}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Monte Carlo Mini */}
                <div>
                    <div className="text-xs text-gray-400 mb-2">Monte Carlo</div>
                    <div className="bg-[#2d2a5d]/50 rounded-lg p-3">
                        <div className="flex justify-between text-xs mb-2">
                            <span className="text-gray-400">500 simulyasiya</span>
                            <span className="text-cyan-400">12 ay</span>
                        </div>
                        {/* Mini chart bars */}
                        <div className="flex items-end gap-0.5 h-12">
                            {[15, 25, 45, 70, 90, 100, 85, 60, 40, 20, 10].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: 0.5 + i * 0.05 }}
                                    className={`flex-1 rounded-t ${i < 3 ? 'bg-red-500/60' :
                                            i > 7 ? 'bg-emerald-500/60' :
                                                'bg-cyan-500/60'
                                        }`}
                                />
                            ))}
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                            <span>-20%</span>
                            <span>0%</span>
                            <span>+30%</span>
                        </div>
                    </div>
                </div>

                {/* Expected Outcomes */}
                <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-3 border border-cyan-500/20">
                    <div className="text-xs text-gray-400 mb-2">Gözlənilən Nəticə</div>
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-lg font-bold text-cyan-400">$42,794</div>
                            <div className="text-xs text-gray-400">+8.2% ortalama</div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-semibold text-red-400">$32,156</div>
                            <div className="text-[10px] text-gray-500">95% VaR</div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
