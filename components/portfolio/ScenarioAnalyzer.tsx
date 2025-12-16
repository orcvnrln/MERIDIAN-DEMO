"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, Play, Save, TrendingDown, TrendingUp } from "lucide-react";

interface Scenario {
    id: string;
    name: string;
    description: string;
}

interface Impact {
    portfolio: number;
    tech: number;
    bonds: number;
}

const scenarios: Scenario[] = [
    { id: "fed-hike-50", name: "Fed hikes 50bps", description: "Federal Reserve raises rates by 0.5%" },
    { id: "recession-2024", name: "Recession (2024)", description: "Economic downturn scenario" },
    { id: "tech-crash", name: "Tech crash -30%", description: "Technology sector correction" },
    { id: "bull-surge", name: "Bull market surge", description: "Strong market rally" },
    { id: "china-growth", name: "China GDP +8%", description: "Chinese economy accelerates" },
];

const scenarioImpacts: Record<string, Impact> = {
    "fed-hike-50": { portfolio: -8.3, tech: -12.5, bonds: 2.1 },
    "recession-2024": { portfolio: -18.5, tech: -25.0, bonds: 5.5 },
    "tech-crash": { portfolio: -22.1, tech: -30.0, bonds: 1.2 },
    "bull-surge": { portfolio: 15.2, tech: 20.5, bonds: -0.8 },
    "china-growth": { portfolio: 6.8, tech: 9.2, bonds: 0.5 },
};

const savedScenarios = [
    "recession-2024",
    "tech-crash",
    "bull-surge",
];

export function ScenarioAnalyzer() {
    const [selectedScenario, setSelectedScenario] = useState<string>("fed-hike-50");
    const [impact, setImpact] = useState<Impact>(scenarioImpacts["fed-hike-50"]);

    const handleScenarioChange = (scenarioId: string) => {
        setSelectedScenario(scenarioId);
        setImpact(scenarioImpacts[scenarioId]);
    };

    const handleRunScenario = () => {
        // Simulate running scenario
        console.log("Running scenario:", selectedScenario);
    };

    const handleSaveScenario = () => {
        console.log("Saving scenario:", selectedScenario);
    };

    return (
        <Card className="bg-[#12121a] border border-gray-800/50 rounded-xl">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                        <HelpCircle className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                        <CardTitle className="text-lg text-white">Scenario Analyzer</CardTitle>
                        <p className="text-sm text-gray-400">What-If Simulator</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Scenario Selector */}
                <div>
                    <label className="text-xs text-gray-400 mb-2 block">Select Scenario:</label>
                    <select
                        value={selectedScenario}
                        onChange={(e) => handleScenarioChange(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-[#0B0B12] border border-cyan-500/20 text-white text-sm focus:outline-none focus:border-cyan-500/40"
                    >
                        {scenarios.map((scenario) => (
                            <option key={scenario.id} value={scenario.id}>
                                {scenario.name}
                            </option>
                        ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                        {scenarios.find(s => s.id === selectedScenario)?.description}
                    </p>
                </div>

                {/* Impact Display */}
                <div className="space-y-3">
                    <div className="text-xs text-gray-400 font-semibold">Impact:</div>

                    <motion.div
                        key={impact.portfolio}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`p-4 rounded-xl border ${impact.portfolio < 0
                            ? "bg-red-500/10 border-red-500/20"
                            : "bg-emerald-500/10 border-emerald-500/20"
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-300">Portfolio</span>
                            <div className="flex items-center gap-2">
                                {impact.portfolio < 0 ? (
                                    <TrendingDown className="w-4 h-4 text-red-400" />
                                ) : (
                                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                                )}
                                <span className={`text-lg font-bold ${impact.portfolio < 0 ? "text-red-400" : "text-emerald-400"
                                    }`}>
                                    {impact.portfolio > 0 ? "+" : ""}{impact.portfolio}%
                                </span>
                                {impact.portfolio < -5 && <span className="text-red-400">⚠️</span>}
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-[#0B0B12]/60 border border-cyan-500/20">
                            <div className="text-xs text-gray-400 mb-1">Tech stocks</div>
                            <div className={`text-base font-semibold ${impact.tech < 0 ? "text-red-400" : "text-emerald-400"
                                }`}>
                                {impact.tech > 0 ? "+" : ""}{impact.tech}%
                            </div>
                        </div>
                        <div className="p-3 rounded-xl bg-[#0B0B12]/60 border border-cyan-500/20">
                            <div className="text-xs text-gray-400 mb-1">Bonds</div>
                            <div className={`text-base font-semibold ${impact.bonds < 0 ? "text-red-400" : "text-emerald-400"
                                }`}>
                                {impact.bonds > 0 ? "+" : ""}{impact.bonds}%
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <Button
                        onClick={handleRunScenario}
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white"
                    >
                        <Play className="w-4 h-4 mr-2" />
                        Run Scenario
                    </Button>
                    <Button
                        onClick={handleSaveScenario}
                        variant="outline"
                        className="px-4 border-cyan-500/20 hover:bg-cyan-500/10"
                    >
                        <Save className="w-4 h-4" />
                    </Button>
                </div>

                {/* Saved Scenarios */}
                <div>
                    <div className="text-xs text-gray-400 font-semibold mb-2">Saved Scenarios ({savedScenarios.length}):</div>
                    <div className="space-y-1">
                        {savedScenarios.map((scenarioId) => {
                            const scenario = scenarios.find(s => s.id === scenarioId);
                            return (
                                <button
                                    key={scenarioId}
                                    onClick={() => handleScenarioChange(scenarioId)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedScenario === scenarioId
                                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                                        : "bg-[#0B0B12]/40 text-gray-300 border border-transparent hover:bg-[#0B0B12]"
                                        }`}
                                >
                                    • {scenario?.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
