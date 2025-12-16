"use client";

import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const allocationData = [
    { name: "Equities", value: 45, assets: "AAPL, TSLA, MSFT", color: "#3b82f6" },
    { name: "FX", value: 25, assets: "EUR/USD, GBP/USD", color: "#8b5cf6" },
    { name: "Commodities", value: 20, assets: "Gold", color: "#f59e0b", overexposed: true },
    { name: "Crypto", value: 10, assets: "BTC", color: "#10b981" },
];

export function AssetAllocationDonut() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#12121a] border border-gray-800/50 rounded-xl p-5 mb-6"
        >
            <h3 className="text-lg font-semibold text-white mb-4">Asset Allocation</h3>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Donut Chart */}
                <div className="h-[200px] w-full lg:w-1/2">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={allocationData}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {allocationData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1e1b4b',
                                    border: '1px solid rgba(139, 92, 246, 0.3)',
                                    borderRadius: '8px',
                                }}
                                formatter={(value: number, name: string) => [`${value}%`, name]}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Stacked Bar + Legend */}
                <div className="flex-1 space-y-3">
                    {allocationData.map((item) => (
                        <div key={item.name} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span className="text-white font-medium">{item.name}</span>
                                    <span className="text-gray-500 text-xs">({item.assets})</span>
                                </div>
                                <span className={`font-bold ${item.overexposed ? 'text-yellow-400' : 'text-white'}`}>
                                    {item.value}%
                                </span>
                            </div>
                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.value}%` }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className={`h-full rounded-full ${item.overexposed ? 'ring-2 ring-yellow-400/50' : ''}`}
                                    style={{ backgroundColor: item.color }}
                                />
                            </div>
                        </div>
                    ))}

                    {/* Warning for overexposure */}
                    <div className="mt-3 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <p className="text-xs text-yellow-400">
                            ⚠️ Commodities at 20% – approaching overexposure threshold
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
