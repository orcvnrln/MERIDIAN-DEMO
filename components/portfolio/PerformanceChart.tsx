"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, ReferenceLine } from "recharts";
import { TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

// Seeded random generator for consistent SSR/CSR values
const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

// Generate sample performance data
const generatePerformanceData = () => {
    const data = [];
    const startDate = new Date(2024, 0, 1);
    const benchmarkStart = 100000;
    const portfolioStart = 100000;
    let benchmarkValue = benchmarkStart;
    let portfolioValue = portfolioStart;
    let maxPortfolioValue = portfolioValue;

    for (let i = 0; i < 252; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);

        // Simulate returns using seeded random
        const benchmarkReturn = (seededRandom(i * 2 + 100) - 0.48) * 0.02;
        const portfolioReturn = (seededRandom(i * 2 + 101) - 0.45) * 0.025;

        benchmarkValue *= (1 + benchmarkReturn);
        portfolioValue *= (1 + portfolioReturn);
        maxPortfolioValue = Math.max(maxPortfolioValue, portfolioValue);

        const drawdown = ((portfolioValue - maxPortfolioValue) / maxPortfolioValue) * 100;

        data.push({
            date: date.toISOString().split('T')[0],
            month: date.toLocaleDateString('en-US', { month: 'short' }),
            portfolio: Math.round(portfolioValue),
            benchmark: Math.round(benchmarkValue),
            drawdown: drawdown,
        });
    }

    return data;
};

const performanceData = generatePerformanceData();

type TimePeriod = "1D" | "1W" | "1M" | "3M" | "YTD" | "1Y" | "ALL";

export function PerformanceChart() {
    const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("YTD");

    const periods: TimePeriod[] = ["1D", "1W", "1M", "3M", "YTD", "1Y", "ALL"];

    const getFilteredData = () => {
        const now = performanceData.length - 1;
        switch (selectedPeriod) {
            case "1D": return performanceData.slice(-1);
            case "1W": return performanceData.slice(-5);
            case "1M": return performanceData.slice(-21);
            case "3M": return performanceData.slice(-63);
            case "YTD": return performanceData;
            case "1Y": return performanceData.slice(-252);
            case "ALL": return performanceData;
            default: return performanceData;
        }
    };

    const filteredData = getFilteredData();
    const latestData = performanceData[performanceData.length - 1];
    const startData = filteredData[0];

    const cumulativeReturn = ((latestData.portfolio - startData.portfolio) / startData.portfolio * 100).toFixed(2);
    const annualizedReturn = (parseFloat(cumulativeReturn) * (252 / filteredData.length)).toFixed(2);
    const sharpeRatio = "1.82";
    const maxDrawdown = Math.min(...performanceData.map(d => d.drawdown)).toFixed(2);

    return (
        <Card className="bg-[#1A1A28]/60 border border-cyan-500/20 backdrop-blur-sm">
            <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                            <TrendingUp className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                            <CardTitle className="text-lg text-white">Performance Chart</CardTitle>
                            <p className="text-sm text-gray-400">Interactive TradingView Style</p>
                        </div>
                    </div>

                    {/* Time Period Selector */}
                    <div className="flex items-center gap-2 bg-[#0B0B12]/60 p-1 rounded-lg border border-cyan-500/20">
                        {periods.map((period) => (
                            <Button
                                key={period}
                                onClick={() => setSelectedPeriod(period)}
                                size="sm"
                                variant="ghost"
                                className={`h-8 px-3 text-xs font-medium transition-all ${selectedPeriod === period
                                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {period}
                            </Button>
                        ))}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {/* Chart */}
                <div className="h-[500px] mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4} />
                                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="drawdownGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <XAxis
                                dataKey="month"
                                stroke="#4b5563"
                                tick={{ fill: '#9ca3af', fontSize: 11 }}
                                axisLine={{ stroke: '#374151' }}
                            />
                            <YAxis
                                yAxisId="left"
                                domain={['dataMin - 5000', 'dataMax + 5000']}
                                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                                stroke="#4b5563"
                                tick={{ fill: '#9ca3af', fontSize: 11 }}
                                axisLine={{ stroke: '#374151' }}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                domain={['dataMin', 0]}
                                tickFormatter={(v) => `${v.toFixed(0)}%`}
                                stroke="#4b5563"
                                tick={{ fill: '#9ca3af', fontSize: 11 }}
                                axisLine={{ stroke: '#374151' }}
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1A1A28',
                                    border: '1px solid rgba(6, 182, 212, 0.3)',
                                    borderRadius: '12px',
                                    padding: '12px'
                                }}
                                labelStyle={{ color: '#9ca3af' }}
                                formatter={(value: number, name: string) => [
                                    name === 'drawdown'
                                        ? `${value.toFixed(2)}%`
                                        : `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
                                    name === 'portfolio' ? 'Portfolio' : name === 'benchmark' ? 'S&P 500' : 'Drawdown'
                                ]}
                            />

                            <Legend
                                wrapperStyle={{ paddingTop: '20px' }}
                                iconType="line"
                                formatter={(value) => (
                                    <span className="text-gray-300 text-sm">
                                        {value === 'portfolio' ? 'Portfolio' : value === 'benchmark' ? 'S&P 500' : 'Drawdown'}
                                    </span>
                                )}
                            />

                            <ReferenceLine yAxisId="left" y={100000} stroke="#8b5cf6" strokeDasharray="3 3" />

                            <Area
                                yAxisId="left"
                                type="monotone"
                                dataKey="portfolio"
                                stroke="#06b6d4"
                                fill="url(#portfolioGradient)"
                                strokeWidth={2}
                            />
                            <Area
                                yAxisId="left"
                                type="monotone"
                                dataKey="benchmark"
                                stroke="#8b5cf6"
                                fill="url(#benchmarkGradient)"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                            />
                            <Area
                                yAxisId="right"
                                type="monotone"
                                dataKey="drawdown"
                                stroke="#ef4444"
                                fill="url(#drawdownGradient)"
                                strokeWidth={1}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-[#0B0B12]/60 border border-cyan-500/20"
                >
                    <div>
                        <div className="text-xs text-gray-400 mb-1">Cumulative Return</div>
                        <div className={`text-lg font-bold ${parseFloat(cumulativeReturn) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {parseFloat(cumulativeReturn) >= 0 ? '+' : ''}{cumulativeReturn}%
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-400 mb-1">Annualized Return</div>
                        <div className={`text-lg font-bold ${parseFloat(annualizedReturn) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {parseFloat(annualizedReturn) >= 0 ? '+' : ''}{annualizedReturn}%
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-400 mb-1">Sharpe Ratio</div>
                        <div className="text-lg font-bold text-cyan-400">{sharpeRatio}</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-400 mb-1">Max Drawdown</div>
                        <div className="text-lg font-bold text-red-400">{maxDrawdown}%</div>
                    </div>
                </motion.div>
            </CardContent>
        </Card>
    );
}
