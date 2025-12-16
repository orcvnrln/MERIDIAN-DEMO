"use client";

import { motion } from "framer-motion";
import { TrendingUp, AlertCircle, Lightbulb } from "lucide-react";

export function PerformanceSummaryBanner() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-cyan-900/30 via-blue-900/30 to-cyan-900/30 border border-cyan-500/30 rounded-xl p-5 mb-6"
        >
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                </div>

                <div className="flex-1 space-y-3">
                    <h3 className="text-lg font-semibold text-white">Performance Summary</h3>

                    <div className="text-sm text-gray-300 leading-relaxed space-y-2">
                        <p>
                            📈 <strong className="text-emerald-400">2-year total return: +59.10%</strong> with a maximum drawdown of
                            <strong className="text-red-400"> -8.2%</strong>.
                        </p>
                        <p>
                            ⚠️ Current risk level is <strong className="text-emerald-400">NORMAL</strong>, but
                            <strong className="text-yellow-400"> BTC contributes 29%</strong> of portfolio risk.
                        </p>
                        <p>
                            💡 AI-suggested hedge would reduce CVaR from <strong className="text-red-400">18.7k</strong> →
                            <strong className="text-emerald-400"> 12.1k</strong>.
                        </p>
                        <p>
                            📊 Last 30 days: most assets positive; <strong className="text-cyan-400">Gold</strong> and
                            <strong className="text-cyan-400"> AAPL</strong> lead.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
