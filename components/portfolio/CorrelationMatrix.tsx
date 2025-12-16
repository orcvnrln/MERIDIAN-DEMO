"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Brain } from "lucide-react";

const correlationMatrix = [
    { symbol: "AAPL", values: [1.0, 0.75, 0.45, 0.82, 0.68] },
    { symbol: "NVDA", values: [0.75, 1.0, 0.62, 0.78, 0.71] },
    { symbol: "TSLA", values: [0.45, 0.62, 1.0, 0.52, 0.58] },
    { symbol: "MSFT", values: [0.82, 0.78, 0.52, 1.0, 0.73] },
    { symbol: "META", values: [0.68, 0.71, 0.58, 0.73, 1.0] },
];

const symbols = ["AAPL", "NVDA", "TSLA", "MSFT", "META"];

const getCorrelationColor = (value: number) => {
    if (value === 1.0) return "bg-gray-700";
    if (value > 0.7) return "bg-red-500/60";
    if (value > 0.4) return "bg-amber-500/60";
    return "bg-emerald-500/60";
};

const getCorrelationLabel = (value: number) => {
    if (value === 1.0) return "Self";
    if (value > 0.7) return "High";
    if (value > 0.4) return "Medium";
    return "Low";
};

const getAIExplanation = (symbol1: string, symbol2: string, correlation: number) => {
    if (correlation === 1.0) return `${symbol1} correlation with itself.`;
    if (correlation > 0.7) {
        return `${symbol1} and ${symbol2} move together ${(correlation * 100).toFixed(0)}% of the time. This increases portfolio risk during market downturns as both positions may decline simultaneously.`;
    }
    if (correlation > 0.4) {
        return `${symbol1} and ${symbol2} have moderate correlation (${(correlation * 100).toFixed(0)}%). Some diversification benefit exists.`;
    }
    return `${symbol1} and ${symbol2} have low correlation (${(correlation * 100).toFixed(0)}%). Good diversification - they often move independently.`;
};

export function CorrelationMatrix() {
    const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

    return (
        <Card className="bg-[#12121a] border border-gray-800/50 rounded-xl">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                        <Activity className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                        <CardTitle className="text-lg text-white">Correlation Matrix</CardTitle>
                        <p className="text-sm text-gray-400">Interactive Heatmap</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {/* Matrix */}
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full">
                        {/* Header Row */}
                        <div className="flex items-center mb-1">
                            <div className="w-16" /> {/* Empty corner */}
                            {symbols.map((symbol) => (
                                <div key={symbol} className="w-16 text-center text-xs font-semibold text-cyan-400">
                                    {symbol}
                                </div>
                            ))}
                        </div>

                        {/* Matrix Rows */}
                        {correlationMatrix.map((row, rowIndex) => (
                            <div key={row.symbol} className="flex items-center mb-1">
                                <div className="w-16 text-xs font-semibold text-cyan-400">
                                    {row.symbol}
                                </div>
                                {row.values.map((value, colIndex) => (
                                    <motion.div
                                        key={colIndex}
                                        whileHover={{ scale: 1.1, zIndex: 10 }}
                                        onMouseEnter={() => setHoveredCell({ row: rowIndex, col: colIndex })}
                                        onMouseLeave={() => setHoveredCell(null)}
                                        className={`w-12 h-10 mx-0.5 rounded-md ${getCorrelationColor(value)} 
                      flex items-center justify-center cursor-pointer transition-all
                      ${hoveredCell?.row === rowIndex || hoveredCell?.col === colIndex ? 'ring-2 ring-cyan-400' : ''}`}
                                    >
                                        <span className="text-xs font-semibold text-white">
                                            {value.toFixed(2)}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-red-500/60" />
                        <span className="text-xs text-gray-400">High (&gt;0.7)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-amber-500/60" />
                        <span className="text-xs text-gray-400">Medium (0.4-0.7)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-emerald-500/60" />
                        <span className="text-xs text-gray-400">Low (&lt;0.4)</span>
                    </div>
                </div>

                {/* AI Explanation on Hover */}
                <AnimatePresence>
                    {hoveredCell && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="mt-4 p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20"
                        >
                            <div className="flex items-start gap-3">
                                <Brain className="w-5 h-5 text-cyan-400 mt-0.5" />
                                <div>
                                    <div className="text-sm font-semibold text-cyan-400 mb-1">
                                        AI Correlation Analysis
                                    </div>
                                    <p className="text-sm text-gray-300">
                                        {getAIExplanation(
                                            symbols[hoveredCell.row],
                                            symbols[hoveredCell.col],
                                            correlationMatrix[hoveredCell.row].values[hoveredCell.col]
                                        )}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <p className="text-xs text-gray-500 mt-4 text-center">
                    Hover over any cell to see AI explanation
                </p>
            </CardContent>
        </Card>
    );
}
