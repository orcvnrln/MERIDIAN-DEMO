"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronRight, TrendingUp, TrendingDown, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const positions = [
    {
        symbol: "JPM",
        name: "JP Morgan Chase & Co.",
        weight: "5.00%",
        price: 168.55,
        change: 0.19,
        quantity: 500,
        value: 84275,
        pl: 6.12,
        isPositive: true,
    },
    {
        symbol: "AAPL",
        name: "Apple Inc.",
        weight: "8.00%",
        price: 160.34,
        change: -0.68,
        quantity: 500,
        value: 80170,
        pl: -2.15,
        isPositive: false,
    },
    {
        symbol: "TSLA",
        name: "Tesla, Inc.",
        weight: "14.00%",
        price: 101.65,
        change: -0.77,
        quantity: 500,
        value: 50825,
        pl: 12.25,
        isPositive: true,
    },
    {
        symbol: "MSFT",
        name: "Microsoft Corporation",
        weight: "3.00%",
        price: 333.28,
        change: 0.65,
        quantity: 500,
        value: 166640,
        pl: 9.08,
        isPositive: true,
    },
    {
        symbol: "GOOGL",
        name: "Alphabet Inc. Class A",
        weight: "12.00%",
        price: 2899.28,
        change: -0.56,
        quantity: 50,
        value: 144964,
        pl: -5.23,
        isPositive: false,
    },
];

export type StockPosition = typeof positions[0];

interface TopPositionsProps {
    onHover?: (stock: StockPosition | null) => void;
    hoveredSymbol?: string | null;
}

export function TopPositions({ onHover, hoveredSymbol }: TopPositionsProps) {
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    const totalValue = positions.reduce((sum, pos) => sum + pos.value, 0);
    const totalPL = positions.reduce((sum, pos) => sum + (pos.value * pos.pl / 100), 0);
    const totalPLPercent = (totalPL / totalValue) * 100;

    return (
        <Card className="bg-[#1A1A28]/60 border border-cyan-500/20 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-x-4 pb-3">
                <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                        <TrendingUp className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                        <CardTitle className="text-lg text-white">Positions</CardTitle>
                        <p className="text-sm text-gray-400">Top Holdings</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="max-h-[450px] overflow-y-auto">
                    <Table>
                        <TableHeader className="sticky top-0 bg-[#1A1A28] z-10">
                            <TableRow className="border-b border-cyan-500/20 hover:bg-transparent">
                                <TableHead className="text-cyan-400 font-medium text-xs w-[30px]"></TableHead>
                                <TableHead className="text-cyan-400 font-medium text-xs">Symbol</TableHead>
                                <TableHead className="text-cyan-400 font-medium text-xs text-right">Qty</TableHead>
                                <TableHead className="text-cyan-400 font-medium text-xs text-right">Price</TableHead>
                                <TableHead className="text-cyan-400 font-medium text-xs text-right">Value</TableHead>
                                <TableHead className="text-cyan-400 font-medium text-xs text-right">P&L%</TableHead>
                                <TableHead className="text-cyan-400 font-medium text-xs text-right">Weight</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {positions.map((pos) => (
                                <>
                                    <TableRow
                                        key={pos.symbol}
                                        className={`border-b border-cyan-500/10 hover:bg-[#20202E]/50 transition-all duration-200 cursor-pointer h-[40px] ${hoveredSymbol === pos.symbol ? 'bg-cyan-500/10 border-l-2 border-l-cyan-400' : ''
                                            } ${expandedRow === pos.symbol ? 'bg-[#20202E]/30' : ''}`}
                                        onMouseEnter={() => onHover?.(pos)}
                                        onMouseLeave={() => onHover?.(null)}
                                        onClick={() => setExpandedRow(expandedRow === pos.symbol ? null : pos.symbol)}
                                    >
                                        <TableCell className="text-xs py-2">
                                            {expandedRow === pos.symbol ? (
                                                <ChevronDown className="w-3 h-3 text-gray-400" />
                                            ) : (
                                                <ChevronRight className="w-3 h-3 text-gray-400" />
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium text-cyan-400 text-sm py-2">{pos.symbol}</TableCell>
                                        <TableCell className="text-right text-xs text-gray-300 py-2">{pos.quantity}</TableCell>
                                        <TableCell className="text-right text-xs py-2">
                                            <div className="text-gray-300">${pos.price.toFixed(2)}</div>
                                            <div className={pos.change >= 0 ? "text-emerald-400 text-[10px]" : "text-red-400 text-[10px]"}>
                                                {pos.change >= 0 ? '+' : ''}{pos.change}%
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right text-sm font-semibold text-white py-2">
                                            ${pos.value.toLocaleString()}
                                        </TableCell>
                                        <TableCell className="text-right text-sm font-bold py-2">
                                            <span className={pos.pl >= 0 ? "text-emerald-400" : "text-red-400"}>
                                                {pos.pl >= 0 ? '+' : ''}{pos.pl.toFixed(2)}%
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right text-xs text-gray-300 py-2">{pos.weight}</TableCell>
                                    </TableRow>

                                    {/* Expandable Row Details */}
                                    <AnimatePresence>
                                        {expandedRow === pos.symbol && (
                                            <TableRow>
                                                <TableCell colSpan={7} className="p-0 border-none">
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="p-4 bg-[#0B0B12]/60 border-t border-b border-cyan-500/10">
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                                {/* Purchase History */}
                                                                <div className="bg-[#1A1A28]/40 rounded-lg p-3">
                                                                    <div className="text-xs font-semibold text-purple-400 mb-2">Purchase History</div>
                                                                    <div className="space-y-2 text-xs text-gray-300">
                                                                        <div className="flex justify-between">
                                                                            <span>Initial Purchase:</span>
                                                                            <span>250 @ ${(pos.price * 0.9).toFixed(2)}</span>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                            <span>Added Position:</span>
                                                                            <span>250 @ ${(pos.price * 0.95).toFixed(2)}</span>
                                                                        </div>
                                                                        <div className="flex justify-between border-t border-cyan-500/20 pt-2">
                                                                            <span className="font-semibold">Avg Cost:</span>
                                                                            <span className="font-semibold">${(pos.price * 0.925).toFixed(2)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Mini Performance */}
                                                                <div className="bg-[#1A1A28]/40 rounded-lg p-3">
                                                                    <div className="text-xs font-semibold text-cyan-400 mb-2">Recent Performance</div>
                                                                    <div className="h-20 flex items-end gap-1">
                                                                        {[...Array(20)].map((_, i) => {
                                                                            // Use seeded random for SSR consistency
                                                                            const seed = pos.symbol.charCodeAt(0) + i;
                                                                            const x = Math.sin(seed) * 10000;
                                                                            const seededVal = x - Math.floor(x);
                                                                            const height = 30 + seededVal * 50;
                                                                            const isUp = seededVal > 0.5;
                                                                            return (
                                                                                <div
                                                                                    key={i}
                                                                                    className={`flex-1 rounded-t ${isUp ? 'bg-emerald-500/40' : 'bg-red-500/40'}`}
                                                                                    style={{ height: `${height}%` }}
                                                                                />
                                                                            );
                                                                        })}
                                                                    </div>
                                                                    <div className="text-[10px] text-gray-500 mt-1 text-center">Last 20 days</div>
                                                                </div>

                                                                {/* AI Recommendation */}
                                                                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-3">
                                                                    <div className="flex items-center gap-2 mb-2">
                                                                        <Brain className="w-4 h-4 text-purple-400" />
                                                                        <div className="text-xs font-semibold text-purple-400">AI Recommendation</div>
                                                                    </div>
                                                                    <div className="text-xs text-gray-300 mb-2">
                                                                        {pos.pl >= 0
                                                                            ? `Strong performer. Consider taking partial profits if position exceeds ${parseFloat(pos.weight) + 2}% allocation.`
                                                                            : `Position underperforming. Hold for recovery or consider avg down if conviction remains high.`
                                                                        }
                                                                    </div>
                                                                    <div className={`text-xs font-semibold ${pos.pl >= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                                                                        {pos.pl >= 0 ? '✅ HOLD' : '⚠️ MONITOR'}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </AnimatePresence>
                                </>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Footer with Totals */}
                <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <div className="text-xs text-gray-400 mb-1">Total Value</div>
                            <div className="text-lg font-bold text-white">${totalValue.toLocaleString()}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400 mb-1">Total P&L</div>
                            <div className={`text-lg font-bold ${totalPLPercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                {totalPLPercent >= 0 ? '+' : ''}${totalPL.toLocaleString(undefined, { maximumFractionDigits: 0 })} ({totalPLPercent.toFixed(2)}%)
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400 mb-1">Allocation Status</div>
                            <div className="text-lg font-bold text-emerald-400">✅ Balanced</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
