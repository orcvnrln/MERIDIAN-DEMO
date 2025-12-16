"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RiskScenariosProps {
    isVisible: boolean;
}

const scenarios = [
    {
        type: "best",
        label: "Ən Yaxşı Ssenari",
        sublabel: "Best Case",
        return: "+32.5%",
        value: "$52,362",
        probability: "15%",
        icon: TrendingUp,
        gradient: "from-emerald-600 to-green-500",
        bgGradient: "from-emerald-500/20 to-green-500/10",
        borderColor: "border-emerald-500/30",
        description: "Bütün aktivlər güclü performans göstərir"
    },
    {
        type: "base",
        label: "Əsas Ssenari",
        sublabel: "Base Case",
        return: "+8.2%",
        value: "$42,794",
        probability: "60%",
        icon: Target,
        gradient: "from-blue-600 to-cyan-500",
        bgGradient: "from-blue-500/20 to-cyan-500/10",
        borderColor: "border-blue-500/30",
        description: "Tarixi ortalamaya uyğun artım"
    },
    {
        type: "worst",
        label: "Ən Pis Ssenari",
        sublabel: "Worst Case",
        return: "-18.7%",
        value: "$32,156",
        probability: "25%",
        icon: TrendingDown,
        gradient: "from-red-600 to-rose-500",
        bgGradient: "from-red-500/20 to-rose-500/10",
        borderColor: "border-red-500/30",
        description: "Bazar korreksiyası və ya resesiya"
    }
];

const riskMetrics = [
    { label: "VaR (95%)", value: "-$7,450", description: "1 günlük maksimum itki" },
    { label: "CVaR", value: "-$9,120", description: "Ən pis halların ortalaması" },
    { label: "Max Drawdown", value: "-24.3%", description: "Tarixdə ən böyük düşüş" },
    { label: "Sortino Ratio", value: "1.82", description: "Aşağı risk/gəlir nisbəti" }
];

export function RiskScenarios({ isVisible }: RiskScenariosProps) {
    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="bg-[#1e1b4b] border-none text-white overflow-hidden">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                                <Activity className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Risk Ssenariləri</CardTitle>
                                <p className="text-sm text-gray-400">12 aylıq proyeksiya</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-gray-400">Cari Portfel Dəyəri</div>
                            <div className="text-xl font-bold text-white">$39,551.76</div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Scenario Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {scenarios.map((scenario, index) => (
                            <motion.div
                                key={scenario.type}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative overflow-hidden rounded-xl border ${scenario.borderColor} bg-gradient-to-br ${scenario.bgGradient} p-4`}
                            >
                                {/* Background Glow */}
                                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${scenario.gradient} opacity-20 blur-2xl`} />

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${scenario.gradient} flex items-center justify-center`}>
                                            <scenario.icon className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-xs text-gray-400 bg-[#2d2a5d]/50 px-2 py-1 rounded-full">
                                            P: {scenario.probability}
                                        </span>
                                    </div>

                                    <div className="mb-2">
                                        <div className="text-sm text-gray-300">{scenario.label}</div>
                                        <div className="text-xs text-gray-500">{scenario.sublabel}</div>
                                    </div>

                                    <div className={`text-2xl font-bold mb-1 ${scenario.type === 'best' ? 'text-emerald-400' :
                                            scenario.type === 'base' ? 'text-cyan-400' : 'text-red-400'
                                        }`}>
                                        {scenario.return}
                                    </div>

                                    <div className="text-sm text-gray-400">{scenario.value}</div>

                                    <div className="mt-3 pt-3 border-t border-white/10">
                                        <p className="text-xs text-gray-400">{scenario.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Risk Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {riskMetrics.map((metric, index) => (
                            <motion.div
                                key={metric.label}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.05 }}
                                className="bg-[#2d2a5d]/50 rounded-xl p-3 border border-purple-500/20"
                            >
                                <div className="text-xs text-gray-400 mb-1">{metric.label}</div>
                                <div className={`text-lg font-semibold ${metric.value.startsWith('-') ? 'text-red-400' : 'text-cyan-400'
                                    }`}>
                                    {metric.value}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">{metric.description}</div>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
