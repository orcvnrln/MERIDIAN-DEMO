"use client";

import { motion } from "framer-motion";
import { Brain, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AIRiskSummaryBanner() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/30 rounded-xl p-4 mb-6"
        >
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                        <Brain className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-sm text-gray-300">
                        <span className="text-purple-300 font-semibold">AI Risk Summary: </span>
                        CVaR <span className="text-red-400">14%</span> → <span className="text-emerald-400">11.2%</span> (last 24h).
                        Geopolitical event → Gold demand ↑.
                        <span className="text-cyan-400 font-medium"> Recommendation: add 5% XAU.</span>
                    </div>
                </div>

                <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                    Buy XAU
                    <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
            </div>
        </motion.div>
    );
}
