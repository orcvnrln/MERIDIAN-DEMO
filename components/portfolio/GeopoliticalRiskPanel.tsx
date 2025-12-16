"use client";

import { motion } from "framer-motion";
import { Globe, TrendingUp, TrendingDown, Minus, AlertTriangle, MapPin, Shield } from "lucide-react";
import { mockPortfolioMetrics, mockGeopoliticalFactors } from "@/lib/mock-data/portfolio";

const metrics = mockPortfolioMetrics;

const getGRIColor = (score: number) => {
    if (score >= 70) return { gradient: "from-red-500 to-rose-400", text: "text-red-400", label: "Yüksək Risk" };
    if (score >= 50) return { gradient: "from-amber-500 to-orange-400", text: "text-amber-400", label: "Orta Risk" };
    if (score >= 30) return { gradient: "from-yellow-500 to-lime-400", text: "text-yellow-400", label: "Aşağı Risk" };
    return { gradient: "from-emerald-500 to-green-400", text: "text-emerald-400", label: "Minimal Risk" };
};

const getTrendIcon = (trend: string) => {
    switch (trend) {
        case "up": return <TrendingUp className="w-3 h-3 text-red-400" />;
        case "down": return <TrendingDown className="w-3 h-3 text-emerald-400" />;
        default: return <Minus className="w-3 h-3 text-gray-400" />;
    }
};

export function GeopoliticalRiskPanel() {
    const gri = metrics.geopoliticalRiskIndex;
    const griInfo = getGRIColor(gri);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-[#12121a] border border-gray-800/50 rounded-xl p-5"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-rose-500/20 to-red-500/20">
                    <Globe className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">Geopolitik Risk İndeksi</h3>
                    <p className="text-xs text-gray-400">Regional risk qiymətləndirmə</p>
                </div>
            </div>

            {/* Main GRI Score */}
            <div className="flex items-center gap-4 mb-4">
                <div className="relative w-24 h-24">
                    {/* Outer ring */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="8"
                        />
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="url(#griGradient)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={251.2}
                            initial={{ strokeDashoffset: 251.2 }}
                            animate={{ strokeDashoffset: 251.2 - (gri / 100) * 251.2 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                        <defs>
                            <linearGradient id="griGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#f43f5e" />
                                <stop offset="100%" stopColor="#fb7185" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-2xl font-bold text-white"
                        >
                            {gri}
                        </motion.span>
                        <span className="text-[10px] text-gray-400">/ 100</span>
                    </div>
                </div>

                <div className="flex-1">
                    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full ${griInfo.text} bg-white/5 text-xs font-medium mb-2`}>
                        <Shield className="w-3 h-3" />
                        {griInfo.label}
                    </div>
                    <p className="text-sm text-gray-400">
                        Qlobal geopolitik gərginlik portfelinizə <span className="text-white font-medium">-2.1%</span> potensial təsir göstərə bilər.
                    </p>
                </div>
            </div>

            {/* Regional Breakdown */}
            <div className="space-y-2">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Regional Risk</div>
                {mockGeopoliticalFactors.map((factor, idx) => {
                    const factorColor = getGRIColor(factor.risk);
                    return (
                        <motion.div
                            key={factor.region}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            className="flex items-center gap-3 py-1.5"
                        >
                            <MapPin className="w-3 h-3 text-gray-500" />
                            <span className="text-sm text-gray-300 flex-1">{factor.region}</span>
                            <div className="w-20 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${factor.risk}%` }}
                                    transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                                    className={`h-full bg-gradient-to-r ${factorColor.gradient} rounded-full`}
                                />
                            </div>
                            <span className={`text-xs font-medium ${factorColor.text} w-8 text-right`}>{factor.risk}</span>
                            {getTrendIcon(factor.trend)}
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
