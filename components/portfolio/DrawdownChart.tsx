"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingDown, Info } from "lucide-react";

// Seeded random generator for consistent SSR/CSR values
const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

// Generate drawdown data
const generateDrawdownData = () => {
    const data = [];
    let currentDD = 0;
    let phase = 0;

    for (let i = 0; i < 365; i++) {
        if (i < 50) {
            // Recovery phase
            currentDD = Math.min(0, currentDD + 0.3);
        } else if (i < 150) {
            // Stable phase - using seeded random
            currentDD = -2 + seededRandom(i + 500) * 2;
        } else if (i < 250) {
            // Drawdown phase
            currentDD = Math.max(-32.1, currentDD - 0.5);
        } else {
            // Recovery
            currentDD = Math.min(0, currentDD + 0.4);
        }

        data.push({
            day: i,
            month: Math.floor(i / 30),
            drawdown: currentDD,
        });
    }

    return data;
};

const drawdownData = generateDrawdownData();
const currentDD = drawdownData[drawdownData.length - 1].drawdown;
const maxDD = Math.min(...drawdownData.map(d => d.drawdown));

export function DrawdownChart() {
    return (
        <Card className="bg-[#12121a] border border-gray-800/50 rounded-xl">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                        <TrendingDown className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                        <CardTitle className="text-lg text-white">Drawdown Chart</CardTitle>
                        <p className="text-sm text-gray-400">Historical DD Timeline</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {/* Chart */}
                <div className="h-[200px] mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={drawdownData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="ddGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.1} />
                                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0.4} />
                                </linearGradient>
                            </defs>

                            <XAxis
                                dataKey="month"
                                tickFormatter={(v) => `M${v}`}
                                stroke="#4b5563"
                                tick={{ fill: '#9ca3af', fontSize: 10 }}
                                axisLine={{ stroke: '#374151' }}
                            />
                            <YAxis
                                domain={[-35, 0]}
                                tickFormatter={(v) => `${v}%`}
                                stroke="#4b5563"
                                tick={{ fill: '#9ca3af', fontSize: 10 }}
                                axisLine={{ stroke: '#374151' }}
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1A1A28',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    borderRadius: '12px',
                                    padding: '12px'
                                }}
                                labelStyle={{ color: '#9ca3af' }}
                                formatter={(value: number) => [`${value.toFixed(2)}%`, 'Drawdown']}
                            />

                            <Area
                                type="monotone"
                                dataKey="drawdown"
                                stroke="#ef4444"
                                fill="url(#ddGradient)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-3 rounded-xl bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingDown className="w-4 h-4 text-red-400" />
                            <span className="text-xs text-gray-400">Current Drawdown</span>
                        </div>
                        <div className="text-2xl font-bold text-red-400">{currentDD.toFixed(1)}%</div>
                        <div className="text-xs text-gray-500 mt-1">From peak value</div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-3 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Info className="w-4 h-4 text-amber-400" />
                            <span className="text-xs text-gray-400">Max Drawdown</span>
                        </div>
                        <div className="text-2xl font-bold text-amber-400">{maxDD.toFixed(1)}%</div>
                        <div className="text-xs text-gray-500 mt-1">Worst decline</div>
                    </motion.div>
                </div>

                {/* AI Recovery Estimate */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 p-3 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20"
                >
                    <div className="flex items-start gap-3">
                        <div className="p-1.5 rounded-lg bg-cyan-500/20">
                            <Info className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-cyan-400 mb-1">
                                AI Recovery Estimate
                            </div>
                            <p className="text-sm text-gray-300">
                                Based on historical patterns, recovery to peak is estimated at <span className="font-semibold text-white">8-14 days</span> with 70% confidence.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </CardContent>
        </Card>
    );
}
