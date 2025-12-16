"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, AlertTriangle, Lightbulb, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const alerts = [
    { type: "critical", message: "VaR exceeded by $3.2K", icon: AlertTriangle },
    { type: "warning", message: "Tech concentration at 75%", icon: AlertTriangle },
];

const actions = [
    { label: "Trim NVDA", impact: "-$8K", color: "amber" },
    { label: "Add Bonds", impact: "+$15K", color: "cyan" },
    { label: "Rebalance", impact: "Optimize", color: "purple" },
];

export function AIInsightsSidebar() {
    return (
        <Card className="bg-[#12121a] border border-gray-800/50 rounded-xl sticky top-20">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                    >
                        <Brain className="w-5 h-5 text-purple-400" />
                    </motion.div>
                    <div>
                        <CardTitle className="text-lg text-white">AI Insights</CardTitle>
                        <p className="text-sm text-gray-400">Dual Brain Analysis</p>
                    </div>
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="ml-auto"
                    >
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                    </motion.div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Alerts Section */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-semibold text-red-400">🚨 Critical Alerts</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">
                            {alerts.length}
                        </span>
                    </div>
                    <div className="space-y-2">
                        {alerts.map((alert, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-3 rounded-lg border ${alert.type === "critical"
                                    ? "bg-red-500/10 border-red-500/20"
                                    : "bg-amber-500/10 border-amber-500/20"
                                    }`}
                            >
                                <div className="flex items-start gap-2">
                                    <alert.icon className={`w-4 h-4 mt-0.5 ${alert.type === "critical" ? "text-red-400" : "text-amber-400"
                                        }`} />
                                    <span className="text-sm text-gray-200">{alert.message}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Actions Section */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-semibold text-cyan-400">🎯 Recommended Actions</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400">
                            {actions.length}
                        </span>
                    </div>
                    <div className="space-y-2">
                        {actions.map((action, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                className={`w-full justify-between border-${action.color}-500/20 hover:bg-${action.color}-500/10 text-left`}
                            >
                                <span className="text-sm text-white">{action.label}</span>
                                <span className={`text-xs font-semibold text-${action.color}-400`}>
                                    {action.impact}
                                </span>
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Forecast Section */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                    <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-semibold text-purple-400">🔮 30-Day Forecast</span>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">+2% to +7%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">Confidence</span>
                            <div className="flex items-center gap-2">
                                <div className="w-24 h-2 bg-[#0B0B12] rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "70%" }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                    />
                                </div>
                                <span className="text-sm font-semibold text-purple-400">70%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info */}
                <p className="text-xs text-gray-500 text-center">
                    AI continuously monitors your portfolio 24/7
                </p>
            </CardContent>
        </Card>
    );
}
