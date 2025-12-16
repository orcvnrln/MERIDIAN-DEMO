"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const assets = [
    { name: "Gold", pnl: 1200, pnlPercent: 8.2, risk: 20, positive: true },
    { name: "AAPL", pnl: 192, pnlPercent: 2.15, risk: 18, positive: true },
    { name: "BTC", pnl: 475, pnlPercent: 2.31, risk: 10, positive: true },
    { name: "TSLA", pnl: -103, pnlPercent: -1.71, risk: 12, positive: false },
];

export function AssetListTable() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#12121a] border border-gray-800/50 rounded-xl overflow-hidden mb-6"
        >
            <div className="p-4 border-b border-gray-800/50">
                <h3 className="text-lg font-semibold text-white">Asset Performance</h3>
            </div>

            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-800/50 text-xs text-gray-400 uppercase">
                        <th className="text-left py-3 px-4">Asset</th>
                        <th className="text-right py-3 px-4">P&L</th>
                        <th className="text-right py-3 px-4">Return</th>
                        <th className="text-right py-3 px-4">Risk %</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map((asset, idx) => (
                        <motion.tr
                            key={asset.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="border-b border-gray-800/30 hover:bg-white/5 transition-colors"
                        >
                            <td className="py-3 px-4">
                                <span className="font-medium text-white">{asset.name}</span>
                            </td>
                            <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-1">
                                    {asset.positive ? (
                                        <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                                    ) : (
                                        <ArrowDownRight className="w-4 h-4 text-red-400" />
                                    )}
                                    <span className={asset.positive ? 'text-emerald-400' : 'text-red-400'}>
                                        {asset.positive ? '+' : ''}${Math.abs(asset.pnl).toLocaleString()}
                                    </span>
                                </div>
                            </td>
                            <td className={`py-3 px-4 text-right font-medium ${asset.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                                {asset.positive ? '+' : ''}{asset.pnlPercent}%
                            </td>
                            <td className="py-3 px-4 text-right">
                                <span className="text-gray-400">{asset.risk}%</span>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </motion.div>
    );
}
