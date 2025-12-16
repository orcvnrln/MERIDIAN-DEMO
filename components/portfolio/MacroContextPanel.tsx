"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Landmark, Percent, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { mockPortfolioMetrics } from "@/lib/mock-data/portfolio";

const metrics = mockPortfolioMetrics;

export function MacroContextPanel() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#12121a] border border-gray-800/50 rounded-xl p-5"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20">
                    <Landmark className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">Makro Kontekst</h3>
                    <p className="text-xs text-gray-400">Faiz və inflyasiya təsiri</p>
                </div>
            </div>

            {/* Macro Indicators */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Fed Rate */}
                <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/30 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400 uppercase tracking-wider">Fed Faiz Dərəcəsi</span>
                        <div className="flex items-center gap-1 text-red-400">
                            <ArrowUpRight className="w-3 h-3" />
                            <span className="text-xs">Yüksək</span>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-white">{metrics.fedRate}</span>
                        <span className="text-lg text-gray-400">%</span>
                    </div>
                    <div className="mt-2 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(metrics.fedRate / 7) * 100}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full"
                        />
                    </div>
                </div>

                {/* Inflation */}
                <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/30 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400 uppercase tracking-wider">İnflyasiya</span>
                        <div className="flex items-center gap-1 text-orange-400">
                            <ArrowDownRight className="w-3 h-3" />
                            <span className="text-xs">Düşür</span>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-white">{metrics.inflation}</span>
                        <span className="text-lg text-gray-400">%</span>
                    </div>
                    <div className="mt-2 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(metrics.inflation / 10) * 100}%` }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                        />
                    </div>
                </div>
            </div>

            {/* AI Impact Analysis */}
            <div className="space-y-3">
                <div className="bg-gradient-to-br from-red-500/5 to-transparent border border-red-500/20 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-sm text-gray-300">{metrics.fedRateImpact}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-amber-500/5 to-transparent border border-amber-500/20 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                        <Percent className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-sm text-gray-300">{metrics.inflationImpact}</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
