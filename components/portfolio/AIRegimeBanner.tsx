"use client";

import { motion } from "framer-motion";
import { Brain, TrendingDown, Shield, Zap } from "lucide-react";

interface AIRegimeBannerProps {
    regime?: string;
    confidence?: number;
    multiplier?: number;
    strategy?: string;
}

export function AIRegimeBanner({
    regime = "Risk-Off",
    confidence = 87,
    multiplier = 1.2,
    strategy = "Defensive Positioning",
}: AIRegimeBannerProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-indigo-900/50 via-purple-900/40 to-indigo-900/50 border border-purple-500/30 rounded-xl p-4 mb-6"
        >
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                        <Brain className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-purple-300">AI Regime Detection</h3>
                        <p className="text-xs text-gray-400">Real-time market analysis</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-gray-300">Regime:</span>
                        <span className="text-sm font-bold text-yellow-400">{regime}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-gray-300">Confidence:</span>
                        <span className="text-sm font-bold text-cyan-400">{confidence}%</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-orange-400" />
                        <span className="text-sm text-gray-300">Multiplier:</span>
                        <span className="text-sm font-bold text-orange-400">{multiplier}x</span>
                    </div>

                    <div className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                        <span className="text-xs font-medium text-purple-300">{strategy}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
