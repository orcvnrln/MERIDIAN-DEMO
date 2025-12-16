"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Brain, PieChart as PieChartIcon, DollarSign } from "lucide-react";

const allocationData = [
    { name: "Technology", value: 45, color: "#8b5cf6" },      // Purple
    { name: "Finance", value: 25, color: "#06b6d4" },         // Blue
    { name: "Healthcare", value: 20, color: "#10b981" },      // Green
    { name: "Other", value: 10, color: "#6b7280" },           // Gray
];

const sectorRisks = {
    "Technology": "High concentration risk. Consider reducing to 35-40%. Tech stocks highly correlated (0.78 avg).",
    "Finance": "Good diversification. Exposure appropriate for current market cycle.",
    "Healthcare": "Defensive sector. Good balance. Consider increasing if tech reduces.",
    "Other": "Minimal exposure. Consider increasing diversification.",
};

export function AllocationChart() {
    const [selectedSector, setSelectedSector] = useState<string | null>(null);

    const handleSectorClick = (sector: string) => {
        setSelectedSector(selectedSector === sector ? null : sector);
    };

    const totalValue = 1230000; // $1.23M

    return (
        <Card className="bg-[#12121a] border border-gray-800/50 rounded-xl">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                        <PieChartIcon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                        <CardTitle className="text-lg text-white">Portfolio Allocation</CardTitle>
                        <p className="text-sm text-gray-400">By Sector</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {/* Donut Chart - Exact 280×280px */}
                <div className="h-[280px] w-[280px] mx-auto relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={allocationData}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={110}
                                paddingAngle={2}
                                dataKey="value"
                                onClick={(data) => handleSectorClick(data.name)}
                                className="cursor-pointer"
                            >
                                {allocationData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                        opacity={selectedSector === null || selectedSector === entry.name ? 1 : 0.3}
                                        stroke={selectedSector === entry.name ? "#ffffff" : "none"}
                                        strokeWidth={selectedSector === entry.name ? 3 : 0}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1A1A28',
                                    border: '1px solid rgba(6, 182, 212, 0.3)',
                                    borderRadius: '12px',
                                    padding: '12px'
                                }}
                                formatter={(value: number) => [`${value}%`, 'Allocation']}
                            />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center Label - Total Value + Icon */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center">
                            <DollarSign className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
                            <div className="text-2xl font-bold text-white">${(totalValue / 1000000).toFixed(2)}M</div>
                            <div className="text-xs text-gray-400">Total Value</div>
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                    {allocationData.map((sector) => (
                        <div
                            key={sector.name}
                            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${selectedSector === sector.name ? 'bg-white/5' : 'hover:bg-white/5'
                                }`}
                            onClick={() => handleSectorClick(sector.name)}
                        >
                            <div className="w-3 h-3 rounded" style={{ backgroundColor: sector.color }} />
                            <div className="flex-1">
                                <div className="text-xs text-gray-300">{sector.name}</div>
                                <div className="text-sm font-semibold text-white">{sector.value}%</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* AI Risk Explanation */}
                {selectedSector && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 p-3 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20"
                    >
                        <div className="flex items-start gap-3">
                            <Brain className="w-5 h-5 text-cyan-400 mt-0.5" />
                            <div>
                                <div className="text-sm font-semibold text-cyan-400 mb-1">
                                    AI Analysis: {selectedSector}
                                </div>
                                <p className="text-sm text-gray-300">
                                    {sectorRisks[selectedSector as keyof typeof sectorRisks]}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                <p className="text-xs text-gray-500 mt-4 text-center">
                    Click on any sector to see AI risk analysis
                </p>
            </CardContent>
        </Card>
    );
}
