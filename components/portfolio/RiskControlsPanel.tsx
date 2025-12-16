"use client";

import { motion } from "framer-motion";
import { Shield, TrendingDown, Layers, Power } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function RiskControlsPanel() {
    const [killSwitchActive, setKillSwitchActive] = useState(false);

    const controls = [
        { label: "Leverage Limit", value: "1.5x", icon: <Layers className="w-4 h-4" />, status: "active" },
        { label: "Stop-Loss", value: "Active", icon: <TrendingDown className="w-4 h-4" />, status: "active" },
        { label: "Hedge", value: "Not Set", icon: <Shield className="w-4 h-4" />, status: "inactive" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#12121a] border border-gray-800/50 rounded-xl p-5 mb-6"
        >
            <h3 className="text-lg font-semibold text-white mb-4">Risk Controls</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {controls.map((ctrl) => (
                    <div
                        key={ctrl.label}
                        className={`p-3 rounded-lg border ${ctrl.status === 'active'
                                ? 'bg-emerald-500/10 border-emerald-500/30'
                                : 'bg-gray-800/30 border-gray-700/50'
                            }`}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <span className={ctrl.status === 'active' ? 'text-emerald-400' : 'text-gray-500'}>
                                {ctrl.icon}
                            </span>
                            <span className="text-xs text-gray-400">{ctrl.label}</span>
                        </div>
                        <span className={`text-sm font-bold ${ctrl.status === 'active' ? 'text-emerald-400' : 'text-gray-500'
                            }`}>
                            {ctrl.value}
                        </span>
                    </div>
                ))}

                {/* Kill Switch */}
                <div className="relative">
                    <Button
                        onClick={() => setKillSwitchActive(!killSwitchActive)}
                        className={`w-full h-full min-h-[72px] rounded-lg border-2 font-bold transition-all ${killSwitchActive
                                ? 'bg-red-600 border-red-500 text-white hover:bg-red-700'
                                : 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20'
                            }`}
                    >
                        <div className="flex flex-col items-center gap-1">
                            <Power className={`w-5 h-5 ${killSwitchActive ? 'animate-pulse' : ''}`} />
                            <span className="text-xs">Kill Switch</span>
                        </div>
                    </Button>

                    {killSwitchActive && (
                        <div className="absolute inset-0 rounded-lg bg-red-500/20 animate-pulse pointer-events-none" />
                    )}
                </div>
            </div>
        </motion.div>
    );
}
