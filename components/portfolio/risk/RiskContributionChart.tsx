"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from "recharts";
import { mockRiskContributions, mockRiskMetrics } from "@/lib/mock-data/risk-metrics";

export function RiskContributionChart() {
    const contributions = mockRiskContributions;
    const totalCVaR = mockRiskMetrics.cvar95 / 1000; // Convert to thousands

    // Sort by absolute contribution (highest risk first)
    const sortedData = [...contributions].sort(
        (a, b) => Math.abs(b.cvarContribution) - Math.abs(a.cvarContribution)
    );

    // Find biggest contributor
    const biggestContributor = sortedData[0];
    const contributionPercent = (
        (Math.abs(biggestContributor.cvarContribution) / totalCVaR) *
        100
    ).toFixed(0);

    return (
        <div className="bg-[#12121a] border border-gray-800/50 rounded-xl p-6">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-white">Risk Contribution by Asset</h2>
                <p className="text-sm text-gray-400">
                    {biggestContributor.symbol} contributing {contributionPercent}% of total portfolio risk
                </p>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sortedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                    <XAxis
                        dataKey="symbol"
                        stroke="#6b7280"
                        tick={{ fill: "#9ca3af", fontSize: 12 }}
                        axisLine={{ stroke: "#374151" }}
                    />
                    <YAxis
                        stroke="#6b7280"
                        tick={{ fill: "#9ca3af", fontSize: 12 }}
                        axisLine={{ stroke: "#374151" }}
                        tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#1a1a24",
                            border: "1px solid #374151",
                            borderRadius: "8px",
                        }}
                        labelStyle={{ color: "#9ca3af" }}
                        formatter={(value: number) => [`${value.toFixed(2)}%`, "CVaR Contribution"]}
                    />
                    <ReferenceLine y={0} stroke="#6b7280" strokeDasharray="3 3" />
                    <Bar dataKey="cvarContribution" radius={[4, 4, 0, 0]}>
                        {sortedData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.cvarContribution >= 0 ? "#ef4444" : "#10b981"}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            {/* Summary Stats */}
            <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-gray-800/50">
                <div>
                    <div className="text-xs text-gray-500 mb-1">Total CVaR</div>
                    <div className="text-lg font-bold text-white">{totalCVaR.toFixed(1)}k</div>
                </div>
                <div>
                    <div className="text-xs text-gray-500 mb-1">Risk Adding Assets</div>
                    <div className="text-lg font-bold text-red-400">
                        {contributions.filter((c) => c.cvarContribution > 0).length}
                    </div>
                </div>
                <div>
                    <div className="text-xs text-gray-500 mb-1">Risk Reducing Assets</div>
                    <div className="text-lg font-bold text-emerald-400">
                        {contributions.filter((c) => c.cvarContribution < 0).length}
                    </div>
                </div>
            </div>

            {/* Top Contributors List */}
            <div className="mt-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Top Risk Contributors
                </h3>
                <div className="space-y-2">
                    {sortedData.slice(0, 3).map((asset) => (
                        <div
                            key={asset.symbol}
                            className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                        >
                            <div className="flex items-center gap-3">
                                <div className="text-sm font-semibold text-white">{asset.symbol}</div>
                                <div className="text-xs text-gray-500">
                                    {asset.riskBudgetUsage > 0 ? "+" : ""}
                                    {asset.riskBudgetUsage}% budget
                                </div>
                            </div>
                            <div
                                className={`text-sm font-bold ${asset.cvarContribution >= 0 ? "text-red-400" : "text-emerald-400"
                                    }`}
                            >
                                {asset.cvarContribution >= 0 ? "+" : ""}
                                {asset.cvarContribution.toFixed(1)}%
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
