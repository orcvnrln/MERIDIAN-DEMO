"use client";

import { motion } from "framer-motion";

const riskContributions = [
    { asset: "BTC", contribution: 5.4, color: "#ef4444" },
    { asset: "TSLA", contribution: 4.1, color: "#f97316" },
    { asset: "AAPL", contribution: 3.2, color: "#eab308" },
    { asset: "Gold", contribution: 2.8, color: "#22c55e" },
    { asset: "EUR/USD", contribution: 1.5, color: "#3b82f6" },
    { asset: "MSFT", contribution: 1.2, color: "#8b5cf6" },
];

const maxContribution = Math.max(...riskContributions.map(r => r.contribution));

export function RiskContributionWaterfall() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#12121a] border border-gray-800/50 rounded-xl p-5 mb-6"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Risk Contribution by Asset</h3>
                <span className="text-xs text-gray-400">% of total portfolio risk</span>
            </div>

            <div className="space-y-3">
                {riskContributions.map((item, idx) => {
                    const barWidth = (item.contribution / maxContribution) * 100;
                    return (
                        <div key={item.asset} className="flex items-center gap-3">
                            <span className="w-16 text-sm text-gray-400 font-medium">{item.asset}</span>
                            <div className="flex-1 h-6 bg-gray-800/50 rounded-lg overflow-hidden relative">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${barWidth}%` }}
                                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                                    className="h-full rounded-lg flex items-center justify-end pr-2"
                                    style={{ backgroundColor: item.color }}
                                >
                                    <span className="text-xs font-bold text-white drop-shadow">
                                        +{item.contribution}%
                                    </span>
                                </motion.div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-800/50 flex items-center justify-between">
                <span className="text-sm text-gray-400">Top Risk Contributors:</span>
                <span className="text-sm font-semibold text-red-400">
                    BTC (+5.4%), TSLA (+4.1%)
                </span>
            </div>
        </motion.div>
    );
}
