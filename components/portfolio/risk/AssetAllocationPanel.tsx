"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { AlertTriangle } from "lucide-react";
import { mockAssetAllocation } from "@/lib/mock-data/risk-metrics";

const COLORS = {
    equities: "#10b981", // emerald
    fx: "#a855f7", // purple
    commodities: "#f59e0b", // amber
    crypto: "#ec4899", // pink
};

export function AssetAllocationPanel() {
    const allocation = mockAssetAllocation;

    // Prepare data for donut chart
    const assetClassData = [
        { name: "Equities", value: allocation.assetClass.equities, color: COLORS.equities },
        { name: "FX", value: allocation.assetClass.fx, color: COLORS.fx },
        { name: "Commodities", value: allocation.assetClass.commodities, color: COLORS.commodities },
        { name: "Crypto", value: allocation.assetClass.crypto, color: COLORS.crypto },
    ];

    // Check for single asset cap violation
    const hasCapViolation = allocation.instruments.some((inst) => inst.allocation > 20);
    const violatingAssets = allocation.instruments.filter((inst) => inst.allocation > 20);

    return (
        <div className="bg-[#12121a] border border-gray-800/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-white">Asset Allocation</h2>
                    <p className="text-sm text-gray-400">Portfolio composition by asset class</p>
                </div>
                {hasCapViolation && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="text-sm font-medium text-red-400">Cap Violation</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-8">
                {/* Left: Donut Chart */}
                <div>
                    <ResponsiveContainer width="100%" height={240}>
                        <PieChart>
                            <Pie
                                data={assetClassData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {assetClassData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#1a1a24",
                                    border: "1px solid #374151",
                                    borderRadius: "8px",
                                }}
                                formatter={(value: number) => `${value}%`}
                            />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Legend */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        {assetClassData.map((item) => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <div className="flex-1">
                                    <div className="text-xs text-gray-400">{item.name}</div>
                                    <div className="text-sm font-semibold text-white">{item.value}%</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Instruments Breakdown */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                        By Instrument
                    </h3>
                    <div className="space-y-3">
                        {allocation.instruments.map((inst) => (
                            <div key={inst.symbol}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-white">{inst.symbol}</span>
                                    <span
                                        className={`text-sm font-semibold ${inst.allocation > 20 ? "text-red-400" : "text-gray-300"
                                            }`}
                                    >
                                        {inst.allocation}%
                                    </span>
                                </div>
                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all ${inst.allocation > 20 ? "bg-red-500" : "bg-cyan-500"
                                            }`}
                                        style={{ width: `${inst.allocation}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Exposure Metrics */}
                    <div className="mt-6 pt-6 border-t border-gray-800/50">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-xs text-gray-500 mb-1">Net Exposure</div>
                                <div className="text-xl font-bold text-white">{allocation.netExposure}%</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 mb-1">Gross Exposure</div>
                                <div className="text-xl font-bold text-white">{allocation.grossExposure}%</div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="text-xs text-gray-500 mb-1">Leverage</div>
                            <div className="flex items-center gap-2">
                                <div className="text-xl font-bold text-white">{allocation.leverage.toFixed(2)}x</div>
                                <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${allocation.leverage > 2 ? "bg-red-500" : "bg-emerald-500"
                                            }`}
                                        style={{ width: `${(allocation.leverage / 2) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Warning Messages */}
            {hasCapViolation && (
                <div className="mt-6 p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                        <div>
                            <div className="text-sm font-semibold text-red-400 mb-1">
                                Single Asset Cap Exceeded
                            </div>
                            <div className="text-sm text-gray-300">
                                {violatingAssets.map((asset) => asset.symbol).join(", ")} exceed 20% allocation
                                limit. Consider rebalancing to reduce concentration risk.
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
