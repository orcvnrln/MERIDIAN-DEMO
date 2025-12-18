"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    TrendingUp,
    TrendingDown,
    Activity,
    BarChart3,
    Target,
    Zap,
    ArrowUpRight,
    ArrowDownRight,
    AlertTriangle,
    Eye,
    RefreshCw,
    Gauge,
} from "lucide-react";
import { cadencePalette } from "@/lib/cadence-palette";

// Price data
const priceData = [
    { date: "Jan", price: 165, sma20: 162, sma50: 158, volume: 45 },
    { date: "Feb", price: 172, sma20: 168, sma50: 162, volume: 52 },
    { date: "Mar", price: 178, sma20: 174, sma50: 166, volume: 48 },
    { date: "Apr", price: 175, sma20: 176, sma50: 170, volume: 38 },
    { date: "May", price: 182, sma20: 178, sma50: 173, volume: 55 },
    { date: "Jun", price: 188, sma20: 183, sma50: 176, volume: 62 },
    { date: "Jul", price: 185, sma20: 186, sma50: 180, volume: 42 },
    { date: "Aug", price: 192, sma20: 188, sma50: 183, volume: 58 },
    { date: "Sep", price: 196, sma20: 192, sma50: 186, volume: 65 },
    { date: "Oct", price: 194, sma20: 194, sma50: 189, volume: 48 },
    { date: "Nov", price: 198, sma20: 196, sma50: 192, volume: 72 },
    { date: "Dec", price: 198, sma20: 197, sma50: 194, volume: 68 },
];

const rsiData = [
    { date: "Jan", rsi: 45 },
    { date: "Feb", rsi: 55 },
    { date: "Mar", rsi: 62 },
    { date: "Apr", rsi: 58 },
    { date: "May", rsi: 72 },
    { date: "Jun", rsi: 75 },
    { date: "Jul", rsi: 62 },
    { date: "Aug", rsi: 78 },
    { date: "Sep", rsi: 71 },
    { date: "Oct", rsi: 68 },
    { date: "Nov", rsi: 73 },
    { date: "Dec", rsi: 65 },
];

const metricCards = [
    { id: "trend", label: "Trend", value: "85/100", detail: "Strong uptrend", icon: TrendingUp, color: cadencePalette.success },
    { id: "momentum", label: "Momentum", value: "68/100", detail: "RSI 65, neutral", icon: Activity, color: cadencePalette.primary },
    { id: "volatility", label: "Volatility", value: "55/100", detail: "ATR $4.25", icon: Gauge, color: cadencePalette.warning },
    { id: "volume", label: "Volume", value: "72/100", detail: "Above average", icon: BarChart3, color: cadencePalette.primary },
    { id: "signals", label: "Signals", value: "76/100", detail: "3 buy, 1 sell", icon: Target, color: cadencePalette.success },
    { id: "patterns", label: "Patterns", value: "65/100", detail: "Bull flag forming", icon: Eye, color: cadencePalette.secondary },
];

const indicators = [
    {
        id: "rsi",
        name: "RSI (14)",
        value: "65.2",
        status: "neutral",
        signal: "Neutral",
        color: cadencePalette.primary,
        description: "Relative Strength Index shows neutral momentum",
    },
    {
        id: "macd",
        name: "MACD (12,26,9)",
        value: "-0.2",
        status: "watch",
        signal: "Bearish Crossover",
        color: cadencePalette.warning,
        description: "MACD showing slight bearish divergence",
    },
    {
        id: "sma",
        name: "SMA Crossover",
        value: "Bullish",
        status: "good",
        signal: "Buy",
        color: cadencePalette.success,
        description: "20-day SMA above 50-day SMA - bullish trend",
    },
    {
        id: "bollinger",
        name: "Bollinger Bands",
        value: "Mid-Range",
        status: "neutral",
        signal: "Neutral",
        color: cadencePalette.primary,
        description: "Price trading within normal volatility range",
    },
    {
        id: "atr",
        name: "ATR (14)",
        value: "$4.25",
        status: "neutral",
        signal: "Normal Vol",
        color: cadencePalette.primary,
        description: "Average True Range indicates normal volatility",
    },
    {
        id: "stochastic",
        name: "Stochastic (14,3)",
        value: "72/68",
        status: "watch",
        signal: "Overbought",
        color: cadencePalette.warning,
        description: "Stochastic oscillator approaching overbought",
    },
];

const supportResistance = {
    resistance: [
        { level: 205, strength: "Strong", touches: 5 },
        { level: 200, strength: "Moderate", touches: 3 },
    ],
    support: [
        { level: 192, strength: "Strong", touches: 4 },
        { level: 185, strength: "Moderate", touches: 2 },
    ],
};

const patterns = [
    { name: "Bull Flag", reliability: 75, timeframe: "Daily", status: "Forming", icon: "📈" },
    { name: "Double Bottom", reliability: 82, timeframe: "Weekly", status: "Confirmed", icon: "📊" },
    { name: "Golden Cross", reliability: 78, timeframe: "Daily", status: "Active", icon: "✨" },
];

const volumeAnalysis = {
    avgVolume: 62000000,
    todayVolume: 68000000,
    trend: "above",
    onBalanceVolume: "Increasing",
    volumeRatio: 1.097,
};

export default function TechnicalPage() {
    const [selectedIndicator, setSelectedIndicator] = useState<string | null>(null);

    return (
        <div className="flex" style={{ backgroundColor: cadencePalette.bg, color: cadencePalette.text }}>
            {/* Main Content Area */}
            <div className="flex-1 px-6 lg:px-8 py-6 overflow-y-auto">
                {/* Hero Section */}
                <section className="mb-6">
                    <div
                        className="relative p-6 rounded-2xl overflow-hidden"
                        style={{
                            background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`,
                            border: `2px solid ${cadencePalette.secondary}33`,
                        }}
                    >
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: cadencePalette.secondary }} />
                        </div>

                        <div className="relative z-10 flex items-center gap-8">
                            {/* Score Circle */}
                            <div
                                className="w-24 h-24 rounded-full p-1 flex-shrink-0"
                                style={{
                                    background: `conic-gradient(from 0deg, ${cadencePalette.secondary}, ${cadencePalette.primary}, ${cadencePalette.secondary})`,
                                }}
                            >
                                <div
                                    className="w-full h-full rounded-full flex flex-col items-center justify-center"
                                    style={{ backgroundColor: cadencePalette.card }}
                                >
                                    <p className="text-3xl font-bold">78</p>
                                    <p className="text-[10px]" style={{ color: cadencePalette.muted }}>TECH SCORE</p>
                                </div>
                            </div>

                            {/* Title */}
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span
                                        className="text-xs font-medium uppercase px-2 py-1 rounded"
                                        style={{ backgroundColor: `${cadencePalette.secondary}22`, color: cadencePalette.secondary }}
                                    >
                                        Real-Time Analysis
                                    </span>
                                    <span className="text-xs" style={{ color: cadencePalette.muted }}>Updated 30s ago</span>
                                </div>
                                <h1
                                    className="text-2xl font-bold mb-1"
                                    style={{
                                        background: `linear-gradient(135deg, ${cadencePalette.secondary}, ${cadencePalette.primary})`,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    Technical Intelligence
                                </h1>
                                <p className="text-sm" style={{ color: cadencePalette.muted }}>
                                    Chart patterns, indicators, and price action analysis
                                </p>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center">
                                    <p className="text-xs" style={{ color: cadencePalette.muted }}>Signal</p>
                                    <p className="text-xl font-bold" style={{ color: cadencePalette.success }}>BUY</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs" style={{ color: cadencePalette.muted }}>Trend</p>
                                    <p className="text-xl font-bold">Bullish</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs" style={{ color: cadencePalette.muted }}>Strength</p>
                                    <p className="text-xl font-bold">78%</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2">
                                <Button
                                    className="text-sm font-semibold"
                                    style={{
                                        background: `linear-gradient(135deg, ${cadencePalette.secondary}, ${cadencePalette.primary})`,
                                        boxShadow: `0 0 20px ${cadencePalette.secondary}44`,
                                    }}
                                >
                                    <RefreshCw size={16} className="mr-2" />
                                    Refresh
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Metric Cards */}
                <section className="grid grid-cols-6 gap-4 mb-6">
                    {metricCards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="p-4 rounded-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer"
                            style={{
                                background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`,
                                border: `1px solid ${cadencePalette.border}`,
                            }}
                        >
                            <card.icon size={20} style={{ color: card.color }} />
                            <p className="text-2xl font-bold mt-2">{card.value}</p>
                            <p className="text-sm font-medium" style={{ color: cadencePalette.textSecondary }}>{card.label}</p>
                            <p className="text-xs mt-1" style={{ color: cadencePalette.muted }}>{card.detail}</p>
                        </motion.div>
                    ))}
                </section>

                {/* Price Chart */}
                <section
                    className="p-6 rounded-xl mb-6"
                    style={{
                        background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`,
                        border: `1px solid ${cadencePalette.border}`,
                    }}
                >
                    <h3 className="text-lg font-bold mb-4">Price Action with Moving Averages</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={priceData}>
                                <defs>
                                    <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={cadencePalette.primary} stopOpacity={0.3} />
                                        <stop offset="100%" stopColor={cadencePalette.primary} stopOpacity={0.05} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="date" tick={{ fill: cadencePalette.muted, fontSize: 11 }} axisLine={false} />
                                <YAxis tick={{ fill: cadencePalette.muted, fontSize: 11 }} axisLine={false} domain={['auto', 'auto']} />
                                <RechartsTooltip
                                    contentStyle={{
                                        background: cadencePalette.card,
                                        border: `1px solid ${cadencePalette.border}`,
                                        color: cadencePalette.text,
                                        borderRadius: "8px",
                                    }}
                                />
                                <Area type="monotone" dataKey="price" stroke={cadencePalette.primary} fill="url(#priceGrad)" strokeWidth={2} name="Price" />
                                <Line type="monotone" dataKey="sma20" stroke={cadencePalette.success} strokeWidth={2} dot={false} name="SMA 20" />
                                <Line type="monotone" dataKey="sma50" stroke={cadencePalette.warning} strokeWidth={2} dot={false} name="SMA 50" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </section>

                {/* Technical Indicators & RSI */}
                <section className="grid grid-cols-2 gap-6 mb-6">
                    {/* Indicators */}
                    <div
                        className="p-6 rounded-xl"
                        style={{
                            background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`,
                            border: `1px solid ${cadencePalette.border}`,
                        }}
                    >
                        <h3 className="text-lg font-bold mb-4">Technical Indicators</h3>
                        <div className="space-y-3">
                            {indicators.map((ind) => (
                                <div
                                    key={ind.id}
                                    className="p-3 rounded-lg cursor-pointer transition-all hover:scale-[1.02]"
                                    style={{
                                        backgroundColor: selectedIndicator === ind.id ? `${ind.color}22` : `${cadencePalette.bg}80`,
                                        border: `1px solid ${selectedIndicator === ind.id ? ind.color + "44" : cadencePalette.border}`,
                                    }}
                                    onClick={() => setSelectedIndicator(selectedIndicator === ind.id ? null : ind.id)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-semibold">{ind.name}</p>
                                            <p className="text-xs" style={{ color: cadencePalette.muted }}>{ind.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold">{ind.value}</p>
                                            <Badge
                                                className="border-0 text-xs"
                                                style={{
                                                    backgroundColor: `${ind.color}22`,
                                                    color: ind.color,
                                                }}
                                            >
                                                {ind.signal}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RSI Chart */}
                    <div
                        className="p-6 rounded-xl"
                        style={{
                            background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`,
                            border: `1px solid ${cadencePalette.border}`,
                        }}
                    >
                        <h3 className="text-lg font-bold mb-4">RSI (14)</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={rsiData}>
                                    <defs>
                                        <linearGradient id="rsiGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={cadencePalette.secondary} stopOpacity={0.3} />
                                            <stop offset="100%" stopColor={cadencePalette.secondary} stopOpacity={0.05} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="date" tick={{ fill: cadencePalette.muted, fontSize: 11 }} axisLine={false} />
                                    <YAxis tick={{ fill: cadencePalette.muted, fontSize: 11 }} axisLine={false} domain={[0, 100]} />
                                    <RechartsTooltip
                                        contentStyle={{
                                            background: cadencePalette.card,
                                            border: `1px solid ${cadencePalette.border}`,
                                            color: cadencePalette.text,
                                            borderRadius: "8px",
                                        }}
                                    />
                                    {/* Overbought/Oversold lines */}
                                    <Line type="monotone" dataKey={() => 70} stroke={cadencePalette.destructive} strokeDasharray="5 5" dot={false} />
                                    <Line type="monotone" dataKey={() => 30} stroke={cadencePalette.success} strokeDasharray="5 5" dot={false} />
                                    <Area type="monotone" dataKey="rsi" stroke={cadencePalette.secondary} fill="url(#rsiGrad)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-between mt-2 text-xs" style={{ color: cadencePalette.muted }}>
                            <span>Oversold (&lt;30)</span>
                            <span>Neutral (30-70)</span>
                            <span>Overbought (&gt;70)</span>
                        </div>
                    </div>
                </section>

                {/* Support/Resistance & Patterns */}
                <section className="grid grid-cols-2 gap-6 mb-6">
                    {/* Support/Resistance */}
                    <div
                        className="p-6 rounded-xl"
                        style={{
                            background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`,
                            border: `1px solid ${cadencePalette.border}`,
                        }}
                    >
                        <h3 className="text-lg font-bold mb-4">Support & Resistance Levels</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-semibold mb-2" style={{ color: cadencePalette.destructive }}>Resistance</p>
                                {supportResistance.resistance.map((r, i) => (
                                    <div key={i} className="flex items-center justify-between py-2 border-b" style={{ borderColor: cadencePalette.border }}>
                                        <div className="flex items-center gap-2">
                                            <ArrowUpRight size={16} style={{ color: cadencePalette.destructive }} />
                                            <span className="font-bold">${r.level}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Badge className="border-0" style={{ backgroundColor: `${cadencePalette.destructive}22`, color: cadencePalette.destructive }}>
                                                {r.strength}
                                            </Badge>
                                            <span className="text-xs" style={{ color: cadencePalette.muted }}>{r.touches} touches</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p className="text-sm font-semibold mb-2" style={{ color: cadencePalette.success }}>Support</p>
                                {supportResistance.support.map((s, i) => (
                                    <div key={i} className="flex items-center justify-between py-2 border-b" style={{ borderColor: cadencePalette.border }}>
                                        <div className="flex items-center gap-2">
                                            <ArrowDownRight size={16} style={{ color: cadencePalette.success }} />
                                            <span className="font-bold">${s.level}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Badge className="border-0" style={{ backgroundColor: `${cadencePalette.success}22`, color: cadencePalette.success }}>
                                                {s.strength}
                                            </Badge>
                                            <span className="text-xs" style={{ color: cadencePalette.muted }}>{s.touches} touches</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Chart Patterns */}
                    <div
                        className="p-6 rounded-xl"
                        style={{
                            background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`,
                            border: `1px solid ${cadencePalette.border}`,
                        }}
                    >
                        <h3 className="text-lg font-bold mb-4">Chart Patterns Detected</h3>
                        <div className="space-y-3">
                            {patterns.map((p, i) => (
                                <div
                                    key={i}
                                    className="p-4 rounded-lg"
                                    style={{
                                        backgroundColor: `${cadencePalette.bg}80`,
                                        border: `1px solid ${cadencePalette.border}`,
                                    }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{p.icon}</span>
                                            <div>
                                                <p className="font-semibold">{p.name}</p>
                                                <p className="text-xs" style={{ color: cadencePalette.muted }}>{p.timeframe} timeframe</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <Badge
                                                className="border-0 mb-1"
                                                style={{
                                                    backgroundColor: p.status === "Confirmed" ? `${cadencePalette.success}22` : `${cadencePalette.warning}22`,
                                                    color: p.status === "Confirmed" ? cadencePalette.success : cadencePalette.warning,
                                                }}
                                            >
                                                {p.status}
                                            </Badge>
                                            <p className="text-xs" style={{ color: cadencePalette.muted }}>{p.reliability}% reliability</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Volume Analysis */}
                <section
                    className="p-6 rounded-xl"
                    style={{
                        background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`,
                        border: `1px solid ${cadencePalette.border}`,
                    }}
                >
                    <h3 className="text-lg font-bold mb-4">Volume Analysis</h3>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="p-4 rounded-xl" style={{ backgroundColor: `${cadencePalette.bg}80` }}>
                            <p className="text-sm" style={{ color: cadencePalette.muted }}>Today&apos;s Volume</p>
                            <p className="text-2xl font-bold">{(volumeAnalysis.todayVolume / 1000000).toFixed(1)}M</p>
                            <Badge
                                className="border-0 mt-2"
                                style={{ backgroundColor: `${cadencePalette.success}22`, color: cadencePalette.success }}
                            >
                                Above Average
                            </Badge>
                        </div>
                        <div className="p-4 rounded-xl" style={{ backgroundColor: `${cadencePalette.bg}80` }}>
                            <p className="text-sm" style={{ color: cadencePalette.muted }}>Avg Volume</p>
                            <p className="text-2xl font-bold">{(volumeAnalysis.avgVolume / 1000000).toFixed(1)}M</p>
                            <p className="text-xs mt-2" style={{ color: cadencePalette.muted }}>20-day average</p>
                        </div>
                        <div className="p-4 rounded-xl" style={{ backgroundColor: `${cadencePalette.bg}80` }}>
                            <p className="text-sm" style={{ color: cadencePalette.muted }}>Volume Ratio</p>
                            <p className="text-2xl font-bold">{volumeAnalysis.volumeRatio.toFixed(2)}x</p>
                            <p className="text-xs mt-2" style={{ color: cadencePalette.muted }}>vs average</p>
                        </div>
                        <div className="p-4 rounded-xl" style={{ backgroundColor: `${cadencePalette.bg}80` }}>
                            <p className="text-sm" style={{ color: cadencePalette.muted }}>OBV Trend</p>
                            <p className="text-2xl font-bold" style={{ color: cadencePalette.success }}>{volumeAnalysis.onBalanceVolume}</p>
                            <p className="text-xs mt-2" style={{ color: cadencePalette.muted }}>On Balance Volume</p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Right Sidebar */}
            <aside
                className="w-80 border-l p-6 sticky top-[7.5rem] h-[calc(100vh-7.5rem)] overflow-y-auto flex-shrink-0"
                style={{
                    borderColor: cadencePalette.border,
                    backgroundColor: cadencePalette.bgSecondary,
                }}
            >
                {/* Signal Summary */}
                <div
                    className="p-4 rounded-xl mb-6"
                    style={{
                        backgroundColor: `${cadencePalette.success}11`,
                        border: `1px solid ${cadencePalette.success}33`,
                    }}
                >
                    <h3 className="text-sm font-semibold mb-2">Overall Signal</h3>
                    <p className="text-3xl font-bold" style={{ color: cadencePalette.success }}>BUY</p>
                    <p className="text-xs mt-1" style={{ color: cadencePalette.muted }}>Based on 12 indicators</p>
                </div>

                {/* Signal Breakdown */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: cadencePalette.muted }}>
                        Signal Breakdown
                    </h3>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-sm" style={{ color: cadencePalette.muted }}>Buy Signals</span>
                            <span className="text-sm font-bold" style={{ color: cadencePalette.success }}>8</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm" style={{ color: cadencePalette.muted }}>Neutral</span>
                            <span className="text-sm font-bold">2</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm" style={{ color: cadencePalette.muted }}>Sell Signals</span>
                            <span className="text-sm font-bold" style={{ color: cadencePalette.destructive }}>2</span>
                        </div>
                    </div>
                </div>

                {/* Key Levels */}
                <div
                    className="p-4 rounded-xl mb-6"
                    style={{
                        backgroundColor: cadencePalette.card,
                        border: `1px solid ${cadencePalette.border}`,
                    }}
                >
                    <h3 className="text-sm font-semibold mb-3">Key Levels</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-sm" style={{ color: cadencePalette.muted }}>Next Resistance</span>
                            <span className="text-sm font-bold" style={{ color: cadencePalette.destructive }}>$200</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm" style={{ color: cadencePalette.muted }}>Current</span>
                            <span className="text-sm font-bold">$198.50</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm" style={{ color: cadencePalette.muted }}>Next Support</span>
                            <span className="text-sm font-bold" style={{ color: cadencePalette.success }}>$192</span>
                        </div>
                    </div>
                </div>

                {/* Trend Analysis */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: cadencePalette.muted }}>
                        Trend Analysis
                    </h3>
                    <div className="space-y-3">
                        {[
                            { timeframe: "Short-term", trend: "Bullish", color: cadencePalette.success },
                            { timeframe: "Medium-term", trend: "Bullish", color: cadencePalette.success },
                            { timeframe: "Long-term", trend: "Bullish", color: cadencePalette.success },
                        ].map((t) => (
                            <div key={t.timeframe} className="flex justify-between items-center">
                                <span className="text-sm" style={{ color: cadencePalette.muted }}>{t.timeframe}</span>
                                <Badge className="border-0" style={{ backgroundColor: `${t.color}22`, color: t.color }}>
                                    {t.trend}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Watch Alerts */}
                <div
                    className="p-4 rounded-xl"
                    style={{
                        backgroundColor: `${cadencePalette.warning}11`,
                        border: `1px solid ${cadencePalette.warning}33`,
                    }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle size={16} style={{ color: cadencePalette.warning }} />
                        <h3 className="text-sm font-semibold">Watch Alert</h3>
                    </div>
                    <p className="text-xs" style={{ color: cadencePalette.muted }}>
                        Stochastic approaching overbought. Consider taking partial profits near $200 resistance.
                    </p>
                </div>
            </aside>
        </div>
    );
}
