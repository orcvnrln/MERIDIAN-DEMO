"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, TrendingDown, ChevronDown, ChevronUp, Zap, Shield, DollarSign } from "lucide-react";
import { mockStressScenarios, mockPortfolioMetrics, formatCurrency } from "@/lib/mock-data/portfolio";

const probabilityColors = {
    low: { bg: "bg-emerald-500/20", text: "text-emerald-400", label: "Aşağı" },
    medium: { bg: "bg-amber-500/20", text: "text-amber-400", label: "Orta" },
    high: { bg: "bg-red-500/20", text: "text-red-400", label: "Yüksək" },
};

export function StressTestResults() {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const portfolioValue = mockPortfolioMetrics.totalValue;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-[#12121a] border border-gray-800/50 rounded-xl p-5"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20">
                    <Zap className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">Stress Test Nəticələri</h3>
                    <p className="text-xs text-gray-400">Kritik ssenarilərin portfelə təsiri</p>
                </div>
            </div>

            <div className="space-y-3">
                {mockStressScenarios.map((scenario, idx) => {
                    const isExpanded = expandedId === scenario.id;
                    const probColors = probabilityColors[scenario.probability];
                    const lossAmount = (portfolioValue * Math.abs(scenario.impact)) / 100;

                    return (
                        <motion.div
                            key={scenario.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + idx * 0.05 }}
                            className="border border-gray-800/50 rounded-lg overflow-hidden"
                        >
                            <button
                                onClick={() => setExpandedId(isExpanded ? null : scenario.id)}
                                className="w-full flex items-center gap-3 p-3 hover:bg-white/5 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                                    <TrendingDown className="w-4 h-4 text-red-400" />
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="text-sm font-medium text-white">{scenario.name}</div>
                                    <div className="text-xs text-gray-400">{scenario.description}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`text-lg font-bold ${scenario.impact < -10 ? 'text-red-400' : 'text-amber-400'}`}>
                                        {scenario.impact}%
                                    </span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${probColors.bg} ${probColors.text}`}>
                                        {probColors.label}
                                    </span>
                                    {isExpanded ? (
                                        <ChevronUp className="w-4 h-4 text-gray-400" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    )}
                                </div>
                            </button>

                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="border-t border-gray-800/50"
                                    >
                                        <div className="p-4 bg-gradient-to-br from-red-500/5 to-transparent">
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="text-center">
                                                    <DollarSign className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                                                    <div className="text-xs text-gray-400">Gözlənilən Zərər</div>
                                                    <div className="text-lg font-bold text-red-400">
                                                        -{formatCurrency(lossAmount)}
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <Shield className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                                                    <div className="text-xs text-gray-400">Bərpa Müddəti</div>
                                                    <div className="text-lg font-bold text-amber-400">
                                                        3-6 ay
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <AlertTriangle className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                                                    <div className="text-xs text-gray-400">Ehtimal</div>
                                                    <div className={`text-lg font-bold ${probColors.text}`}>
                                                        {scenario.probability === "low" ? "5-10%" : scenario.probability === "medium" ? "15-25%" : "30%+"}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-3 pt-3 border-t border-gray-800/50">
                                                <p className="text-sm text-gray-400">
                                                    <span className="text-white font-medium">AI Təklifi:</span>{" "}
                                                    Bu ssenari baş verərsə, hedging strategiyaları və stop-loss sifarişləri aktivləşdirin.
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>

            {/* Summary */}
            <div className="mt-4 p-3 bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-lg">
                <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span className="text-sm text-gray-300">
                        Ən pis halda portfel <span className="text-red-400 font-bold">-16.5%</span> düşə bilər. Hedging tövsiyə olunur.
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
