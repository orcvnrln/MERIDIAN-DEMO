"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Tooltip } from "recharts";
import { Activity, Info, TrendingUp, TrendingDown } from "lucide-react";

interface MonteCarloChartProps {
    isVisible?: boolean;
}


// Seeded random generator for consistent SSR/CSR values
const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

// Generate Monte Carlo simulation paths
function generateSimulationPaths(
    initialValue: number,
    numPaths: number,
    numSteps: number,
    annualReturn: number,
    annualVolatility: number
) {
    const dt = 1 / 252; // Daily steps
    const drift = (annualReturn - 0.5 * annualVolatility ** 2) * dt;
    const diffusion = annualVolatility * Math.sqrt(dt);

    const paths: number[][] = [];

    for (let p = 0; p < numPaths; p++) {
        const path = [initialValue];
        let value = initialValue;

        for (let t = 1; t <= numSteps; t++) {
            // Use seeded random for consistent results
            const randomShock = (seededRandom(p * numSteps + t) - 0.5) * 2 * 1.5; // Approximate normal
            value = value * Math.exp(drift + diffusion * randomShock);
            path.push(value);
        }
        paths.push(path);
    }

    return paths;
}

// Calculate percentiles
function getPercentile(values: number[], percentile: number): number {
    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.floor((percentile / 100) * sorted.length);
    return sorted[index];
}

export function MonteCarloChart({ isVisible = true }: MonteCarloChartProps) {
    const [animationProgress, setAnimationProgress] = useState(0);

    const simulationData = useMemo(() => {
        const initialValue = 39551.76;
        const numPaths = 500;
        const numSteps = 252; // 1 year of trading days
        const paths = generateSimulationPaths(initialValue, numPaths, numSteps, 0.08, 0.20);

        // Sample every 5 days for performance
        const sampledSteps = Math.floor(numSteps / 5);
        const chartData = [];

        for (let t = 0; t <= sampledSteps; t++) {
            const dayIndex = t * 5;
            const values = paths.map(path => path[Math.min(dayIndex, numSteps)]);

            chartData.push({
                day: t * 5,
                month: Math.floor((t * 5) / 21), // ~21 trading days per month
                p5: getPercentile(values, 5),
                p25: getPercentile(values, 25),
                p50: getPercentile(values, 50),
                p75: getPercentile(values, 75),
                p95: getPercentile(values, 95),
                mean: values.reduce((a, b) => a + b) / values.length
            });
        }

        return chartData;
    }, []);

    const finalStats = useMemo(() => {
        if (simulationData.length === 0) return null;
        const last = simulationData[simulationData.length - 1];
        return {
            expected: last.mean,
            var95: last.p5,
            upside: last.p95,
            median: last.p50
        };
    }, [simulationData]);

    useEffect(() => {
        if (isVisible) {
            setAnimationProgress(0);
            const timer = setInterval(() => {
                setAnimationProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(timer);
                        return 100;
                    }
                    return prev + 2;
                });
            }, 20);
            return () => clearInterval(timer);
        }
    }, [isVisible]);

    if (!isVisible) return null;

    const visibleData = simulationData.slice(0, Math.floor(simulationData.length * animationProgress / 100) + 1);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
        >
            <Card className="bg-[#12121a] border border-gray-800/50 rounded-xl text-white overflow-hidden">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                                <Activity className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    Monte Carlo Simulyasiyası
                                    <span className="text-xs text-gray-400 font-normal bg-[#2d2a5d] px-2 py-1 rounded-full">
                                        500 yol
                                    </span>
                                </CardTitle>
                                <p className="text-sm text-gray-400">12 aylıq portfel proyeksiyası</p>
                            </div>
                        </div>

                        {/* Progress Indicator */}
                        <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-[#2d2a5d] rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                    style={{ width: `${animationProgress}%` }}
                                />
                            </div>
                            <span className="text-xs text-gray-400">{animationProgress}%</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Chart - Exact 250px height */}
                    <div className="h-[250px] mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={visibleData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    {/* Green gradient for 70% confidence area */}
                                    <linearGradient id="gradientP95" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                                        <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
                                    </linearGradient>
                                    <linearGradient id="gradientP75" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
                                    </linearGradient>
                                    {/* Yellow gradient for 20% tails */}
                                    <linearGradient id="gradientP25" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#eab308" stopOpacity={0.3} />
                                        <stop offset="100%" stopColor="#eab308" stopOpacity={0.05} />
                                    </linearGradient>
                                    {/* Red gradient for 10% extremes */}
                                    <linearGradient id="gradientP5" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                                        <stop offset="100%" stopColor="#ef4444" stopOpacity={0.05} />
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
                                    domain={['dataMin - 5000', 'dataMax + 5000']}
                                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                                    stroke="#4b5563"
                                    tick={{ fill: '#9ca3af', fontSize: 10 }}
                                    axisLine={{ stroke: '#374151' }}
                                />

                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e1b4b',
                                        border: '1px solid rgba(139, 92, 246, 0.3)',
                                        borderRadius: '12px',
                                        padding: '12px'
                                    }}
                                    labelStyle={{ color: '#9ca3af' }}
                                    formatter={(value: number, name: string) => [
                                        `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
                                        name === 'p95' ? '95%-tile (Best 10%)' :
                                            name === 'p75' ? '75%-tile' :
                                                name === 'p50' ? 'Median (Expected)' :
                                                    name === 'p25' ? '25%-tile' :
                                                        name === 'p5' ? '5%-tile (Worst 10%)' :
                                                            'Mean'
                                    ]}
                                />

                                <ReferenceLine y={39551.76} stroke="#8b5cf6" strokeDasharray="5 5" />

                                {/* Shaded areas for distribution - color coded */}
                                <Area type="monotone" dataKey="p95" stroke="#10b981" fill="url(#gradientP95)" strokeWidth={1} />
                                <Area type="monotone" dataKey="p75" stroke="#10b981" fill="url(#gradientP75)" strokeWidth={1} />
                                <Area type="monotone" dataKey="p50" stroke="#a855f7" fill="none" strokeWidth={2} />
                                <Area type="monotone" dataKey="p25" stroke="#eab308" fill="url(#gradientP25)" strokeWidth={1} />
                                <Area type="monotone" dataKey="p5" stroke="#ef4444" fill="url(#gradientP5)" strokeWidth={1} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Legend & Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <TrendingUp className="w-4 h-4 text-green-400" />
                                <span className="text-xs text-gray-400">95%-ci faiz</span>
                            </div>
                            <div className="text-lg font-semibold text-green-400">
                                ${finalStats?.upside.toLocaleString('en-US', { maximumFractionDigits: 0 }) || '—'}
                            </div>
                            <div className="text-xs text-gray-500">Ən yaxşı nəticə</div>
                        </div>

                        <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Activity className="w-4 h-4 text-cyan-400" />
                                <span className="text-xs text-gray-400">Gözlənilən</span>
                            </div>
                            <div className="text-lg font-semibold text-cyan-400">
                                ${finalStats?.expected.toLocaleString('en-US', { maximumFractionDigits: 0 }) || '—'}
                            </div>
                            <div className="text-xs text-gray-500">Orta dəyər</div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Info className="w-4 h-4 text-purple-400" />
                                <span className="text-xs text-gray-400">Median</span>
                            </div>
                            <div className="text-lg font-semibold text-purple-400">
                                ${finalStats?.median.toLocaleString('en-US', { maximumFractionDigits: 0 }) || '—'}
                            </div>
                            <div className="text-xs text-gray-500">50%-ci faiz</div>
                        </div>

                        <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <TrendingDown className="w-4 h-4 text-red-400" />
                                <span className="text-xs text-gray-400">VaR 95%</span>
                            </div>
                            <div className="text-lg font-semibold text-red-400">
                                ${finalStats?.var95.toLocaleString('en-US', { maximumFractionDigits: 0 }) || '—'}
                            </div>
                            <div className="text-xs text-gray-500">Ən pis nəticə</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
