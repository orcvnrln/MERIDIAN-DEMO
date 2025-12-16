"use client";

import { motion } from "framer-motion";
import { Brain, AlertTriangle, Activity, Power } from "lucide-react";
import { mockRegimeDetection } from "@/lib/mock-data/risk-metrics";

export function RegimeAIPanel() {
    const regime = mockRegimeDetection;
    const isCrisis = regime.regime === "crisis";

    const getRegimeColor = () => {
        switch (regime.regime) {
            case "trend":
                return "text-blue-400 bg-blue-500/10 border-blue-500/20";
            case "range":
                return "text-gray-400 bg-gray-500/10 border-gray-500/20";
            case "volatility_spike":
                return "text-orange-400 bg-orange-500/10 border-orange-500/20";
            case "crisis":
                return "text-red-500 bg-red-500/20 border-red-500/30";
            default:
                return "text-gray-400 bg-gray-500/10 border-gray-500/20";
        }
    };

    const getSentimentColor = () => {
        return regime.sentiment === "risk_on"
            ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
            : "text-orange-400 bg-orange-500/10 border-orange-500/20";
    };

    const getRiskMultiplierColor = () => {
        if (regime.riskMultiplier >= 1.2) return "text-red-400";
        if (regime.riskMultiplier <= 0.8) return "text-emerald-400";
        return "text-amber-400";
    };

    return (
        <div className="bg-[#12121a] border border-gray-800/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-purple-500/10">
                    <Brain className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-white">Regime AI Layer</h2>
                    <p className="text-sm text-gray-400">Market regime detection and strategy control</p>
                </div>
            </div>

            {/* Central Regime Badge */}
            <div className="flex justify-center mb-8">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <div
                        className={`inline-flex flex-col items-center px-8 py-6 rounded-2xl border-2 ${getSentimentColor()}`}
                    >
                        <div className="text-3xl font-bold uppercase tracking-wider mb-2">
                            {regime.sentiment === "risk_on" ? "RISK-ON" : "RISK-OFF"}
                        </div>
                        <div className="text-sm text-gray-400">
                            Confidence: <span className="font-semibold text-white">{regime.confidence}%</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Regime Details Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-white/5 rounded-lg border border-gray-800/50">
                    <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-gray-400" />
                        <div className="text-xs text-gray-500 uppercase tracking-wider">Current Regime</div>
                    </div>
                    <div className={`text-lg font-bold capitalize ${getRegimeColor().split(" ")[0]}`}>
                        {regime.regime.replace("_", " ")}
                    </div>
                </div>

                <div className="p-4 bg-white/5 rounded-lg border border-gray-800/50">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-gray-400" />
                        <div className="text-xs text-gray-500 uppercase tracking-wider">Risk Multiplier</div>
                    </div>
                    <div className={`text-lg font-bold ${getRiskMultiplierColor()}`}>
                        {regime.riskMultiplier.toFixed(1)}x
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                        {regime.riskMultiplier > 1 ? "Above Normal" : regime.riskMultiplier < 1 ? "Below Normal" : "Normal"}
                    </div>
                </div>

                <div className="p-4 bg-white/5 rounded-lg border border-gray-800/50">
                    <div className="flex items-center gap-2 mb-2">
                        <Power className="w-4 h-4 text-gray-400" />
                        <div className="text-xs text-gray-500 uppercase tracking-wider">Strategy Status</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div
                            className={`w-3 h-3 rounded-full ${regime.strategyStatus === "on" ? "bg-emerald-500 animate-pulse" : "bg-gray-500"
                                }`}
                        />
                        <div
                            className={`text-lg font-bold ${regime.strategyStatus === "on" ? "text-emerald-400" : "text-gray-400"
                                }`}
                        >
                            {regime.strategyStatus.toUpperCase()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="p-4 bg-black/20 rounded-lg border border-gray-800/50 mb-6">
                <p className="text-sm text-gray-300">{regime.description}</p>
            </div>

            {/* Crisis Mode Banner */}
            {isCrisis && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border-2 border-red-500/30 rounded-lg"
                >
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 animate-pulse" />
                        <div>
                            <div className="text-sm font-bold text-red-500 mb-1">⚠ CRISIS MODE DETECTED</div>
                            <div className="text-sm text-gray-300">
                                Reduce leverage immediately. High-risk strategies have been automatically disabled.
                                Portfolio is in defensive mode.
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Risk Multiplier Gauge */}
            <div className="mt-6">
                <div className="text-xs text-gray-500 mb-2">Risk Multiplier Range</div>
                <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div className="absolute inset-0 flex">
                        <div className="flex-1 bg-emerald-500/30" />
                        <div className="flex-1 bg-amber-500/30" />
                        <div className="flex-1 bg-red-500/30" />
                    </div>
                    <motion.div
                        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
                        initial={{ left: "50%" }}
                        animate={{ left: `${((regime.riskMultiplier - 0.6) / 0.9) * 100}%` }}
                        transition={{ type: "spring", stiffness: 100 }}
                    />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0.6x</span>
                    <span>1.0x</span>
                    <span>1.5x</span>
                </div>
            </div>
        </div>
    );
}
