"use client";

import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

// Seeded random generator for consistent SSR/CSR values
const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

// Mock data for 2 years - using seed for SSR consistency
const generatePerformanceData = () => {
    const data = [];
    const startDate = new Date('2022-09-01');
    const startValue = 75000;
    let currentValue = startValue;

    for (let i = 0; i < 104; i++) { // 2 years of weekly data
        const date = new Date(startDate);
        date.setDate(date.getDate() + (i * 7));

        // Simulate growth with some volatility using seeded random
        const growth = 1 + (seededRandom(i + 42) * 0.04 - 0.01); // -1% to +3% weekly
        currentValue = currentValue * growth;

        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
            value: Math.round(currentValue),
        });
    }

    return data;
};

const performanceData = generatePerformanceData();

export function PortfolioPerformanceChart() {
    const [timeRange, setTimeRange] = useState<'2Y' | '1Y' | '6M' | '3M'>('2Y');

    const getFilteredData = () => {
        switch (timeRange) {
            case '3M': return performanceData.slice(-13);
            case '6M': return performanceData.slice(-26);
            case '1Y': return performanceData.slice(-52);
            case '2Y': return performanceData;
            default: return performanceData;
        }
    };

    const filteredData = getFilteredData();
    const startValue = filteredData[0]?.value || 0;
    const endValue = filteredData[filteredData.length - 1]?.value || 0;
    const totalReturn = ((endValue - startValue) / startValue) * 100;

    return (
        <div className="bg-[#12121a] border border-gray-800/50 rounded-xl mb-6 overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-gray-800/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-500/10">
                            <TrendingUp className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white">Portfolio History</h2>
                            <p className="text-sm text-gray-400">
                                {timeRange === '2Y' ? '2 Years' : timeRange === '1Y' ? '1 Year' : timeRange === '6M' ? '6 Months' : '3 Months'} Performance:
                                <span className={`ml-2 font-medium ${totalReturn >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(2)}%
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Time Range Selector */}
                    <div className="flex items-center gap-1 bg-[#1a1a24] rounded-lg p-1">
                        {(['3M', '6M', '1Y', '2Y'] as const).map((range) => (
                            <Button
                                key={range}
                                variant="ghost"
                                size="sm"
                                onClick={() => setTimeRange(range)}
                                className={`h-7 px-3 text-xs ${timeRange === range
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {range}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="h-[300px] p-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                        <XAxis
                            dataKey="date"
                            stroke="#4b5563"
                            tick={{ fill: '#6b7280', fontSize: 11 }}
                            axisLine={{ stroke: '#1f2937' }}
                            tickLine={false}
                        />
                        <YAxis
                            domain={['dataMin - 5000', 'dataMax + 5000']}
                            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                            stroke="#4b5563"
                            tick={{ fill: '#6b7280', fontSize: 11 }}
                            axisLine={{ stroke: '#1f2937' }}
                            tickLine={false}
                        />
                        <Tooltip
                            cursor={{ stroke: '#10b981', strokeWidth: 1, strokeDasharray: '5 5' }}
                            contentStyle={{
                                backgroundColor: '#1a1a24',
                                border: '1px solid #374151',
                                borderRadius: '8px',
                                padding: '12px',
                            }}
                            labelStyle={{ color: '#9ca3af', marginBottom: '4px' }}
                            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#10b981"
                            fill="url(#portfolioGradient)"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
