"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Binary,
    TrendingUp,
    TrendingDown,
    Activity,
    BarChart3,
    Target,
    Zap,
    RefreshCw,
    Gauge,
    Percent,
    AlertTriangle,
    CheckCircle,
} from "lucide-react";
import { cadencePalette } from "@/lib/cadence-palette";

const analysisStages = [
    { id: 1, name: "Loading factor data", duration: 800 },
    { id: 2, name: "Calculating exposures", duration: 1000 },
    { id: 3, name: "Running backtests", duration: 1500 },
    { id: 4, name: "Monte Carlo simulation", duration: 1200 },
    { id: 5, name: "Generating quant score", duration: 800 },
];

const metricCards = [
    { id: "momentum", label: "Momentum", value: "85/100", detail: "Strong 12M return", icon: TrendingUp, color: cadencePalette.success },
    { id: "quality", label: "Quality", value: "92/100", detail: "High ROE, margins", icon: Target, color: cadencePalette.success },
    { id: "volatility", label: "Volatility", value: "55/100", detail: "Below average", icon: Activity, color: cadencePalette.warning },
    { id: "liquidity", label: "Liquidity", value: "95/100", detail: "Very high", icon: BarChart3, color: cadencePalette.success },
    { id: "correlation", label: "Correlation", value: "70/100", detail: "Beta: 1.24", icon: Gauge, color: cadencePalette.primary },
    { id: "alpha", label: "Alpha", value: "78/100", detail: "+5.2% vs SPX", icon: Zap, color: cadencePalette.secondary },
];

const factorExposures = [
    { factor: "Momentum", exposure: 1.45, zScore: 2.1, signal: "Strong", color: cadencePalette.success },
    { factor: "Quality", exposure: 1.82, zScore: 2.8, signal: "Strong", color: cadencePalette.success },
    { factor: "Value", exposure: -0.65, zScore: -1.2, signal: "Weak", color: cadencePalette.destructive },
    { factor: "Size", exposure: 2.15, zScore: 3.1, signal: "Large Cap", color: cadencePalette.primary },
    { factor: "Volatility", exposure: 0.85, zScore: 0.8, signal: "Normal", color: cadencePalette.warning },
    { factor: "Growth", exposure: 1.28, zScore: 1.5, signal: "Moderate", color: cadencePalette.primary },
];

const riskMetrics = [
    { metric: "Sharpe Ratio", value: 1.42, benchmark: 1.0, interpretation: "Strong risk-adjusted returns" },
    { metric: "Sortino Ratio", value: 2.15, benchmark: 1.5, interpretation: "Low downside risk" },
    { metric: "Max Drawdown", value: -12.5, benchmark: -18.0, interpretation: "Better than market" },
    { metric: "Volatility (Ann.)", value: 24.2, benchmark: 20.0, interpretation: "Moderate" },
    { metric: "VaR (95%)", value: -3.2, benchmark: -4.0, interpretation: "Controlled risk" },
];

const momentumData = [
    { period: "1W", return: 2.5, rank: 85 },
    { period: "1M", return: 5.8, rank: 78 },
    { period: "3M", return: 12.4, rank: 82 },
    { period: "6M", return: 18.2, rank: 75 },
    { period: "12M", return: 32.5, rank: 88 },
];

const radarData = [
    { metric: "Momentum", value: 85 },
    { metric: "Quality", value: 92 },
    { metric: "Volatility", value: 55 },
    { metric: "Liquidity", value: 95 },
    { metric: "Correlation", value: 70 },
    { metric: "Alpha", value: 78 },
];

const backtestResults = [
    { year: "2019", strategy: 28.5, benchmark: 31.5 },
    { year: "2020", strategy: 82.3, benchmark: 18.4 },
    { year: "2021", strategy: 34.6, benchmark: 28.7 },
    { year: "2022", strategy: -26.4, benchmark: -18.1 },
    { year: "2023", strategy: 48.2, benchmark: 26.3 },
    { year: "2024", strategy: 32.5, benchmark: 25.1 },
];

export default function QuantPage() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [currentStage, setCurrentStage] = useState(0);
    const [progress, setProgress] = useState(0);
    const [analysisComplete, setAnalysisComplete] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("quant_analysis_AAPL");
        if (saved) {
            setAnalysisComplete(true);
        } else {
            setIsAnalyzing(true);
        }
    }, []);

    useEffect(() => {
        if (!isAnalyzing) return;
        let stageIndex = 0;
        let totalTime = 0;

        const runAnalysis = () => {
            if (stageIndex >= analysisStages.length) {
                setIsAnalyzing(false);
                setAnalysisComplete(true);
                localStorage.setItem("quant_analysis_AAPL", "complete");
                return;
            }
            setCurrentStage(stageIndex);
            const stageDuration = analysisStages[stageIndex]!.duration;
            totalTime += stageDuration;
            setProgress((totalTime / 5300) * 100);
            stageIndex++;
            setTimeout(runAnalysis, stageDuration);
        };
        runAnalysis();
    }, [isAnalyzing]);

    const resetAnalysis = () => {
        localStorage.removeItem("quant_analysis_AAPL");
        setIsAnalyzing(true);
        setCurrentStage(0);
        setProgress(0);
        setAnalysisComplete(false);
    };

    return (
        <div className="flex" style={{ backgroundColor: cadencePalette.bg, color: cadencePalette.text }}>
            <div className="flex-1 px-6 lg:px-8 py-6 overflow-y-auto">
                {/* Hero */}
                <section className="mb-6">
                    <div className="relative p-6 rounded-2xl overflow-hidden" style={{ background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`, border: `2px solid ${cadencePalette.blue}33` }}>
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: cadencePalette.blue }} />
                        </div>

                        <div className="relative z-10 flex items-center gap-8">
                            <div className="w-24 h-24 rounded-full p-1 flex-shrink-0" style={{ background: `conic-gradient(from 0deg, ${cadencePalette.blue}, ${cadencePalette.primary}, ${cadencePalette.blue})` }}>
                                <div className="w-full h-full rounded-full flex flex-col items-center justify-center" style={{ backgroundColor: cadencePalette.card }}>
                                    <p className="text-3xl font-bold">82</p>
                                    <p className="text-[10px]" style={{ color: cadencePalette.muted }}>QUANT SCORE</p>
                                </div>
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-medium uppercase px-2 py-1 rounded" style={{ backgroundColor: `${cadencePalette.blue}22`, color: cadencePalette.blue }}>
                                        Factor Analysis
                                    </span>
                                </div>
                                <h1 className="text-2xl font-bold mb-1" style={{ background: `linear-gradient(135deg, ${cadencePalette.blue}, ${cadencePalette.primary})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                    Quantitative Intelligence
                                </h1>
                                <p className="text-sm" style={{ color: cadencePalette.muted }}>Factor exposures, risk metrics, and backtesting analysis</p>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center">
                                    <p className="text-xs" style={{ color: cadencePalette.muted }}>Sharpe</p>
                                    <p className="text-xl font-bold">1.42</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs" style={{ color: cadencePalette.muted }}>Alpha</p>
                                    <p className="text-xl font-bold" style={{ color: cadencePalette.success }}>+5.2%</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs" style={{ color: cadencePalette.muted }}>Beta</p>
                                    <p className="text-xl font-bold">1.24</p>
                                </div>
                            </div>

                            <Button onClick={resetAnalysis} style={{ background: `linear-gradient(135deg, ${cadencePalette.blue}, ${cadencePalette.primary})` }}>
                                <RefreshCw size={16} className="mr-2" /> Re-run
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Loading */}
                <AnimatePresence mode="wait">
                    {isAnalyzing && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-2xl border p-8 mb-6" style={{ borderColor: cadencePalette.border, background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})` }}>
                            <div className="flex flex-col items-center justify-center space-y-6">
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                                    <div className="w-20 h-20 rounded-full border-4 border-t-transparent" style={{ borderColor: `${cadencePalette.blue}44`, borderTopColor: cadencePalette.blue }} />
                                </motion.div>
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold mb-2">Running Quant Analysis</h3>
                                    <p className="text-sm" style={{ color: cadencePalette.muted }}>{analysisStages[currentStage]?.name || "Initializing..."}</p>
                                </div>
                                <div className="w-full max-w-md">
                                    <div className="h-2 rounded-full" style={{ backgroundColor: `${cadencePalette.blue}22` }}>
                                        <motion.div className="h-2 rounded-full" style={{ backgroundColor: cadencePalette.blue }} initial={{ width: "0%" }} animate={{ width: `${progress}%` }} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {analysisComplete && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        {/* Metric Cards */}
                        <section className="grid grid-cols-6 gap-4">
                            {metricCards.map((card, i) => (
                                <motion.div key={card.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-4 rounded-xl hover:-translate-y-1 transition-all cursor-pointer" style={{ background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`, border: `1px solid ${cadencePalette.border}` }}>
                                    <card.icon size={20} style={{ color: card.color }} />
                                    <p className="text-2xl font-bold mt-2">{card.value}</p>
                                    <p className="text-sm font-medium" style={{ color: cadencePalette.textSecondary }}>{card.label}</p>
                                    <p className="text-xs mt-1" style={{ color: cadencePalette.muted }}>{card.detail}</p>
                                </motion.div>
                            ))}
                        </section>

                        {/* Factor Exposures & Radar */}
                        <section className="grid grid-cols-2 gap-6">
                            <div className="p-6 rounded-xl" style={{ background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`, border: `1px solid ${cadencePalette.border}` }}>
                                <h3 className="text-lg font-bold mb-4">Factor Exposures</h3>
                                <div className="space-y-3">
                                    {factorExposures.map((f) => (
                                        <div key={f.factor} className="p-3 rounded-lg" style={{ backgroundColor: `${cadencePalette.bg}80` }}>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-semibold">{f.factor}</p>
                                                    <p className="text-xs" style={{ color: cadencePalette.muted }}>Z-Score: {f.zScore}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-bold">{f.exposure.toFixed(2)}</p>
                                                    <Badge className="border-0" style={{ backgroundColor: `${f.color}22`, color: f.color }}>{f.signal}</Badge>
                                                </div>
                                            </div>
                                            <div className="mt-2 h-1.5 rounded-full" style={{ backgroundColor: `${f.color}22` }}>
                                                <div className="h-1.5 rounded-full" style={{ width: `${Math.min(100, Math.abs(f.exposure) * 30)}%`, backgroundColor: f.color }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 rounded-xl" style={{ background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`, border: `1px solid ${cadencePalette.border}` }}>
                                <h3 className="text-lg font-bold mb-4">Factor Radar</h3>
                                <div className="h-72">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart data={radarData}>
                                            <PolarGrid stroke={cadencePalette.border} />
                                            <PolarAngleAxis dataKey="metric" tick={{ fill: cadencePalette.muted, fontSize: 11 }} />
                                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: cadencePalette.muted, fontSize: 10 }} />
                                            <Radar name="Score" dataKey="value" stroke={cadencePalette.primary} fill={cadencePalette.primary} fillOpacity={0.3} strokeWidth={2} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </section>

                        {/* Risk Metrics & Backtest */}
                        <section className="grid grid-cols-2 gap-6">
                            <div className="p-6 rounded-xl" style={{ background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`, border: `1px solid ${cadencePalette.border}` }}>
                                <h3 className="text-lg font-bold mb-4">Risk Metrics</h3>
                                <div className="space-y-3">
                                    {riskMetrics.map((r) => (
                                        <div key={r.metric} className="flex items-center justify-between py-2 border-b" style={{ borderColor: cadencePalette.border }}>
                                            <div>
                                                <p className="font-semibold">{r.metric}</p>
                                                <p className="text-xs" style={{ color: cadencePalette.muted }}>{r.interpretation}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold">{typeof r.value === "number" && r.value < 0 ? r.value : r.value}%</p>
                                                <p className="text-xs" style={{ color: cadencePalette.muted }}>Benchmark: {r.benchmark}%</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 rounded-xl" style={{ background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`, border: `1px solid ${cadencePalette.border}` }}>
                                <h3 className="text-lg font-bold mb-4">Backtest Results (AAPL vs S&P 500)</h3>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={backtestResults}>
                                            <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                                            <XAxis dataKey="year" tick={{ fill: cadencePalette.muted, fontSize: 11 }} axisLine={false} />
                                            <YAxis tick={{ fill: cadencePalette.muted, fontSize: 11 }} axisLine={false} />
                                            <RechartsTooltip contentStyle={{ background: cadencePalette.card, border: `1px solid ${cadencePalette.border}`, borderRadius: "8px" }} />
                                            <Bar dataKey="strategy" fill={cadencePalette.primary} radius={[4, 4, 0, 0]} name="AAPL" />
                                            <Bar dataKey="benchmark" fill={cadencePalette.muted} radius={[4, 4, 0, 0]} name="S&P 500" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </section>

                        {/* Momentum Breakdown */}
                        <section className="p-6 rounded-xl" style={{ background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`, border: `1px solid ${cadencePalette.border}` }}>
                            <h3 className="text-lg font-bold mb-4">Momentum Breakdown</h3>
                            <div className="grid grid-cols-5 gap-4">
                                {momentumData.map((m) => (
                                    <div key={m.period} className="p-4 rounded-xl text-center" style={{ backgroundColor: `${cadencePalette.bg}80` }}>
                                        <p className="text-sm" style={{ color: cadencePalette.muted }}>{m.period}</p>
                                        <p className="text-2xl font-bold mt-1" style={{ color: m.return > 0 ? cadencePalette.success : cadencePalette.destructive }}>
                                            {m.return > 0 ? "+" : ""}{m.return}%
                                        </p>
                                        <p className="text-xs mt-1" style={{ color: cadencePalette.muted }}>Rank: {m.rank}th %ile</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </motion.div>
                )}
            </div>

            {/* Sidebar */}
            <aside className="w-80 border-l p-6 sticky top-[7.5rem] h-[calc(100vh-7.5rem)] overflow-y-auto flex-shrink-0" style={{ borderColor: cadencePalette.border, backgroundColor: cadencePalette.bgSecondary }}>
                <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: `${cadencePalette.success}11`, border: `1px solid ${cadencePalette.success}33` }}>
                    <h3 className="text-sm font-semibold mb-2">Quant Signal</h3>
                    <p className="text-3xl font-bold" style={{ color: cadencePalette.success }}>STRONG BUY</p>
                    <p className="text-xs mt-1" style={{ color: cadencePalette.muted }}>Top 15% across all factors</p>
                </div>

                <div className="mb-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: cadencePalette.muted }}>Performance</h3>
                    <div className="space-y-2">
                        {[
                            { label: "YTD Return", value: "+32.5%", color: cadencePalette.success },
                            { label: "vs S&P 500", value: "+7.4%", color: cadencePalette.success },
                            { label: "vs Nasdaq", value: "+2.1%", color: cadencePalette.success },
                            { label: "Max Drawdown", value: "-12.5%", color: cadencePalette.destructive },
                        ].map((p) => (
                            <div key={p.label} className="flex justify-between">
                                <span className="text-sm" style={{ color: cadencePalette.muted }}>{p.label}</span>
                                <span className="text-sm font-semibold" style={{ color: p.color }}>{p.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 rounded-xl" style={{ backgroundColor: cadencePalette.card, border: `1px solid ${cadencePalette.border}` }}>
                    <h3 className="text-sm font-semibold mb-3">Factor Signals</h3>
                    <div className="space-y-2">
                        {[
                            { factor: "Momentum", signal: "Strong", color: cadencePalette.success },
                            { factor: "Quality", signal: "Strong", color: cadencePalette.success },
                            { factor: "Value", signal: "Weak", color: cadencePalette.destructive },
                            { factor: "Growth", signal: "Neutral", color: cadencePalette.warning },
                        ].map((f) => (
                            <div key={f.factor} className="flex justify-between items-center">
                                <span className="text-sm" style={{ color: cadencePalette.muted }}>{f.factor}</span>
                                <Badge className="border-0" style={{ backgroundColor: `${f.color}22`, color: f.color }}>{f.signal}</Badge>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        </div>
    );
}
