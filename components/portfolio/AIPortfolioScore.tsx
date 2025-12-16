"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles, TrendingUp, TrendingDown, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { mockPortfolioMetrics } from "@/lib/mock-data/portfolio";

const metrics = mockPortfolioMetrics;

const getScoreColor = (score: number) => {
    if (score >= 80) return { gradient: "from-emerald-500 to-green-400", text: "text-emerald-400", bg: "bg-emerald-500" };
    if (score >= 60) return { gradient: "from-cyan-500 to-blue-400", text: "text-cyan-400", bg: "bg-cyan-500" };
    if (score >= 40) return { gradient: "from-yellow-500 to-amber-400", text: "text-yellow-400", bg: "bg-yellow-500" };
    return { gradient: "from-red-500 to-rose-400", text: "text-red-400", bg: "bg-red-500" };
};

const getScoreLabel = (score: number) => {
    if (score >= 80) return "Əla";
    if (score >= 60) return "Yaxşı";
    if (score >= 40) return "Orta";
    return "Zəif";
};

const scoreBreakdown = [
    { label: "Fundamental Güc", score: 82, icon: TrendingUp },
    { label: "Risk Profili", score: 68, icon: AlertTriangle },
    { label: "Diversifikasiya", score: 72, icon: CheckCircle },
    { label: "Momentum", score: 85, icon: Sparkles },
];

export function AIPortfolioScore() {
    const score = metrics.fundamentalAIScore;
    const colors = getScoreColor(score);
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#12121a] border border-gray-800/50 rounded-xl p-5"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                    <Brain className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">AI Portföy Skoru</h3>
                    <p className="text-xs text-gray-400">Fundamental analiz əsasında</p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                {/* Circular Score Gauge */}
                <div className="relative">
                    <svg width="120" height="120" className="transform -rotate-90">
                        {/* Background circle */}
                        <circle
                            cx="60"
                            cy="60"
                            r="45"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="10"
                        />
                        {/* Score circle */}
                        <motion.circle
                            cx="60"
                            cy="60"
                            r="45"
                            fill="none"
                            stroke="url(#scoreGradient)"
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                        <defs>
                            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#8b5cf6" />
                                <stop offset="100%" stopColor="#d946ef" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-3xl font-bold text-white"
                        >
                            {score}
                        </motion.span>
                        <span className={`text-xs font-medium ${colors.text}`}>{getScoreLabel(score)}</span>
                    </div>
                </div>

                {/* Score Breakdown */}
                <div className="flex-1 space-y-2">
                    {scoreBreakdown.map((item, idx) => {
                        const itemColors = getScoreColor(item.score);
                        return (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + idx * 0.1 }}
                                className="flex items-center gap-2"
                            >
                                <item.icon className={`w-3 h-3 ${itemColors.text}`} />
                                <span className="text-xs text-gray-400 flex-1">{item.label}</span>
                                <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.score}%` }}
                                        transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                                        className={`h-full bg-gradient-to-r ${itemColors.gradient} rounded-full`}
                                    />
                                </div>
                                <span className={`text-xs font-medium ${itemColors.text} w-8 text-right`}>{item.score}</span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* AI Summary */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-4 p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/20 rounded-lg"
            >
                <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-300">
                        Portfeliniz <span className={`font-semibold ${colors.text}`}>{getScoreLabel(score).toLowerCase()}</span> səviyyədədir.
                        Diversifikasiya artırılmalı və risk balansı yaxşılaşdırılmalıdır.
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
}
