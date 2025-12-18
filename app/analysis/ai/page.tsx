"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    AreaChart,
    Area,
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
    Zap,
    Brain,
    TrendingUp,
    TrendingDown,
    Target,
    AlertTriangle,
    Lightbulb,
    RefreshCw,
    Eye,
    Sparkles,
    CheckCircle,
    Clock,
    BarChart3,
} from "lucide-react";
import { cadencePalette } from "@/lib/cadence-palette";

const analysisStages = [
    { id: 1, name: "Processing historical data", duration: 800 },
    { id: 2, name: "Running ML models", duration: 1500 },
    { id: 3, name: "Detecting anomalies", duration: 1000 },
    { id: 4, name: "Generating predictions", duration: 1200 },
    { id: 5, name: "Compiling insights", duration: 800 },
];

const metricCards = [
    { id: "confidence", label: "AI Confidence", value: "85%", detail: "High reliability", icon: Target, color: cadencePalette.success },
    { id: "signals", label: "Active Signals", value: "7", detail: "5 bullish, 2 bearish", icon: Zap, color: cadencePalette.primary },
    { id: "patterns", label: "Patterns Found", value: "12", detail: "3 high-confidence", icon: Eye, color: cadencePalette.secondary },
    { id: "anomalies", label: "Anomalies", value: "2", detail: "Volume spike detected", icon: AlertTriangle, color: cadencePalette.warning },
    { id: "accuracy", label: "Model Accuracy", value: "78%", detail: "30-day lookback", icon: Brain, color: cadencePalette.primary },
    { id: "predictions", label: "Predictions", value: "4", detail: "Next 30 days", icon: Sparkles, color: cadencePalette.success },
];

const aiInsights = [
    {
        id: 1,
        title: "Strong Momentum Continuation Expected",
        description: "Machine learning models detect 78% probability of continued upward momentum based on volume patterns and price action.",
        confidence: 85,
        type: "bullish",
        timeframe: "1-2 weeks",
    },
    {
        id: 2,
        title: "Earnings Sentiment Shift Detected",
        description: "NLP analysis of recent earnings calls shows increasingly positive management sentiment around Services growth.",
        confidence: 72,
        type: "bullish",
        timeframe: "1-3 months",
    },
    {
        id: 3,
        title: "Unusual Options Activity",
        description: "Detected significant call buying at $210 strike for January expiry. Smart money positioning identified.",
        confidence: 68,
        type: "bullish",
        timeframe: "30 days",
    },
    {
        id: 4,
        title: "Valuation Stretch Warning",
        description: "Current P/E exceeds historical 2-standard deviation band. Mean reversion risk elevated.",
        confidence: 65,
        type: "warning",
        timeframe: "3-6 months",
    },
];

const predictions = [
    { timeframe: "1 Week", target: 202, probability: 72, direction: "up" },
    { timeframe: "2 Weeks", target: 208, probability: 65, direction: "up" },
    { timeframe: "1 Month", target: 215, probability: 58, direction: "up" },
    { timeframe: "3 Months", target: 195, probability: 45, direction: "down" },
];

const predictionHistory = [
    { date: "Nov 1", predicted: 185, actual: 182, accuracy: 98 },
    { date: "Nov 15", predicted: 190, actual: 188, accuracy: 99 },
    { date: "Dec 1", predicted: 195, actual: 194, accuracy: 99 },
    { date: "Dec 15", predicted: 200, actual: 198, accuracy: 99 },
];

const anomalyData = [
    { date: "Mon", normal: 45, anomaly: null },
    { date: "Tue", normal: 52, anomaly: null },
    { date: "Wed", normal: 48, anomaly: 85 },
    { date: "Thu", normal: 55, anomaly: null },
    { date: "Fri", normal: 58, anomaly: null },
    { date: "Today", normal: 62, anomaly: 95 },
];

const patternRecognition = [
    { pattern: "Cup and Handle", confidence: 82, status: "Forming", implication: "Bullish continuation" },
    { pattern: "Golden Cross", confidence: 95, status: "Confirmed", implication: "Long-term bullish" },
    { pattern: "Volume Breakout", confidence: 78, status: "Active", implication: "Momentum building" },
    { pattern: "RSI Divergence", confidence: 55, status: "Watch", implication: "Potential reversal" },
];

export default function AIPage() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [currentStage, setCurrentStage] = useState(0);
    const [progress, setProgress] = useState(0);
    const [analysisComplete, setAnalysisComplete] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("ai_analysis_AAPL");
        if (saved) setAnalysisComplete(true);
        else setIsAnalyzing(true);
    }, []);

    useEffect(() => {
        if (!isAnalyzing) return;
        let stageIndex = 0;
        let totalTime = 0;
        const runAnalysis = () => {
            if (stageIndex >= analysisStages.length) {
                setIsAnalyzing(false);
                setAnalysisComplete(true);
                localStorage.setItem("ai_analysis_AAPL", "complete");
                return;
            }
            setCurrentStage(stageIndex);
            totalTime += analysisStages[stageIndex]!.duration;
            setProgress((totalTime / 5300) * 100);
            stageIndex++;
            setTimeout(runAnalysis, analysisStages[stageIndex - 1]!.duration);
        };
        runAnalysis();
    }, [isAnalyzing]);

    const resetAnalysis = () => {
        localStorage.removeItem("ai_analysis_AAPL");
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
                    <div className="relative p-6 rounded-2xl overflow-hidden" style={{ background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`, border: `2px solid ${cadencePalette.primary}33` }}>
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: cadencePalette.primary }} />
                            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: cadencePalette.secondary }} />
                        </div>

                        <div className="relative z-10 flex items-center gap-8">
                            <div className="w-24 h-24 rounded-full p-1 flex-shrink-0" style={{ background: `conic-gradient(from 0deg, ${cadencePalette.primary}, ${cadencePalette.secondary}, ${cadencePalette.accent}, ${cadencePalette.primary})` }}>
                                <div className="w-full h-full rounded-full flex flex-col items-center justify-center" style={{ backgroundColor: cadencePalette.card }}>
                                    <Sparkles size={28} style={{ color: cadencePalette.primary }} />
                                    <p className="text-[10px] mt-1" style={{ color: cadencePalette.muted }}>AI POWERED</p>
                                </div>
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-medium uppercase px-2 py-1 rounded" style={{ backgroundColor: `${cadencePalette.primary}22`, color: cadencePalette.primary }}>
                                        Machine Learning
                                    </span>
                                    <span className="text-xs" style={{ color: cadencePalette.muted }}>Updated 1 min ago</span>
                                </div>
                                <h1 className="text-2xl font-bold mb-1" style={{ background: `linear-gradient(135deg, ${cadencePalette.primary}, ${cadencePalette.secondary}, ${cadencePalette.accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                    AI Intelligence Hub
                                </h1>
                                <p className="text-sm" style={{ color: cadencePalette.muted }}>ML predictions, pattern recognition, and anomaly detection</p>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center">
                                    <p className="text-xs" style={{ color: cadencePalette.muted }}>Confidence</p>
                                    <p className="text-xl font-bold">85%</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs" style={{ color: cadencePalette.muted }}>Signal</p>
                                    <p className="text-xl font-bold" style={{ color: cadencePalette.success }}>BULLISH</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs" style={{ color: cadencePalette.muted }}>Target</p>
                                    <p className="text-xl font-bold">$215</p>
                                </div>
                            </div>

                            <Button onClick={resetAnalysis} style={{ background: `linear-gradient(135deg, ${cadencePalette.primary}, ${cadencePalette.secondary})`, boxShadow: `0 0 30px ${cadencePalette.primary}44` }}>
                                <RefreshCw size={16} className="mr-2" /> Re-analyze
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
                                    <div className="w-20 h-20 rounded-full border-4 border-t-transparent" style={{ borderColor: `${cadencePalette.primary}44`, borderTopColor: cadencePalette.primary }} />
                                </motion.div>
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold mb-2">AI Analysis in Progress</h3>
                                    <p className="text-sm" style={{ color: cadencePalette.muted }}>{analysisStages[currentStage]?.name || "Initializing..."}</p>
                                </div>
                                <div className="w-full max-w-md">
                                    <div className="h-2 rounded-full" style={{ backgroundColor: `${cadencePalette.primary}22` }}>
                                        <motion.div className="h-2 rounded-full" style={{ background: `linear-gradient(90deg, ${cadencePalette.primary}, ${cadencePalette.secondary})` }} initial={{ width: "0%" }} animate={{ width: `${progress}%` }} />
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

                        {/* AI Insights */}
                        <section className="p-6 rounded-xl" style={{ background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`, border: `1px solid ${cadencePalette.border}` }}>
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Lightbulb size={20} style={{ color: cadencePalette.warning }} />
                                Key AI Insights
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {aiInsights.map((insight) => (
                                    <motion.div key={insight.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="p-4 rounded-xl" style={{ backgroundColor: `${insight.type === "bullish" ? cadencePalette.success : cadencePalette.warning}11`, border: `1px solid ${insight.type === "bullish" ? cadencePalette.success : cadencePalette.warning}33` }}>
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="font-semibold">{insight.title}</h4>
                                            <Badge className="border-0" style={{ backgroundColor: `${insight.type === "bullish" ? cadencePalette.success : cadencePalette.warning}22`, color: insight.type === "bullish" ? cadencePalette.success : cadencePalette.warning }}>
                                                {insight.confidence}% conf
                                            </Badge>
                                        </div>
                                        <p className="text-sm" style={{ color: cadencePalette.muted }}>{insight.description}</p>
                                        <div className="flex items-center gap-2 mt-3">
                                            <Clock size={14} style={{ color: cadencePalette.muted }} />
                                            <span className="text-xs" style={{ color: cadencePalette.muted }}>{insight.timeframe}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Predictions & Accuracy */}
                        <section className="grid grid-cols-2 gap-6">
                            <div className="p-6 rounded-xl" style={{ background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`, border: `1px solid ${cadencePalette.border}` }}>
                                <h3 className="text-lg font-bold mb-4">Price Predictions</h3>
                                <div className="space-y-3">
                                    {predictions.map((p) => (
                                        <div key={p.timeframe} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: `${cadencePalette.bg}80` }}>
                                            <div>
                                                <p className="font-semibold">{p.timeframe}</p>
                                                <p className="text-xs" style={{ color: cadencePalette.muted }}>{p.probability}% probability</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-bold" style={{ color: p.direction === "up" ? cadencePalette.success : cadencePalette.destructive }}>
                                                    ${p.target}
                                                </p>
                                                <div className="flex items-center gap-1 justify-end">
                                                    {p.direction === "up" ? <TrendingUp size={14} style={{ color: cadencePalette.success }} /> : <TrendingDown size={14} style={{ color: cadencePalette.destructive }} />}
                                                    <span className="text-xs" style={{ color: p.direction === "up" ? cadencePalette.success : cadencePalette.destructive }}>
                                                        {p.direction === "up" ? "+" : "-"}{Math.abs(((p.target - 198) / 198) * 100).toFixed(1)}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 rounded-xl" style={{ background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`, border: `1px solid ${cadencePalette.border}` }}>
                                <h3 className="text-lg font-bold mb-4">Prediction Accuracy (Last 30 Days)</h3>
                                <div className="h-48">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={predictionHistory}>
                                            <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                                            <XAxis dataKey="date" tick={{ fill: cadencePalette.muted, fontSize: 11 }} axisLine={false} />
                                            <YAxis tick={{ fill: cadencePalette.muted, fontSize: 11 }} axisLine={false} domain={['auto', 'auto']} />
                                            <RechartsTooltip contentStyle={{ background: cadencePalette.card, border: `1px solid ${cadencePalette.border}`, borderRadius: "8px" }} />
                                            <Line type="monotone" dataKey="predicted" stroke={cadencePalette.primary} strokeWidth={2} dot={{ fill: cadencePalette.primary }} name="Predicted" />
                                            <Line type="monotone" dataKey="actual" stroke={cadencePalette.success} strokeWidth={2} dot={{ fill: cadencePalette.success }} name="Actual" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="text-center mt-4 p-3 rounded-lg" style={{ backgroundColor: `${cadencePalette.success}11` }}>
                                    <p className="text-sm" style={{ color: cadencePalette.muted }}>Average Accuracy</p>
                                    <p className="text-2xl font-bold" style={{ color: cadencePalette.success }}>98.5%</p>
                                </div>
                            </div>
                        </section>

                        {/* Pattern Recognition & Anomalies */}
                        <section className="grid grid-cols-2 gap-6">
                            <div className="p-6 rounded-xl" style={{ background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`, border: `1px solid ${cadencePalette.border}` }}>
                                <h3 className="text-lg font-bold mb-4">Pattern Recognition</h3>
                                <div className="space-y-3">
                                    {patternRecognition.map((p) => (
                                        <div key={p.pattern} className="p-3 rounded-lg" style={{ backgroundColor: `${cadencePalette.bg}80` }}>
                                            <div className="flex items-center justify-between mb-2">
                                                <div>
                                                    <p className="font-semibold">{p.pattern}</p>
                                                    <p className="text-xs" style={{ color: cadencePalette.muted }}>{p.implication}</p>
                                                </div>
                                                <Badge className="border-0" style={{ backgroundColor: p.status === "Confirmed" ? `${cadencePalette.success}22` : p.status === "Active" ? `${cadencePalette.primary}22` : `${cadencePalette.warning}22`, color: p.status === "Confirmed" ? cadencePalette.success : p.status === "Active" ? cadencePalette.primary : cadencePalette.warning }}>
                                                    {p.status}
                                                </Badge>
                                            </div>
                                            <div className="h-1.5 rounded-full" style={{ backgroundColor: `${cadencePalette.primary}22` }}>
                                                <div className="h-1.5 rounded-full" style={{ width: `${p.confidence}%`, backgroundColor: cadencePalette.primary }} />
                                            </div>
                                            <p className="text-xs mt-1" style={{ color: cadencePalette.muted }}>{p.confidence}% confidence</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 rounded-xl" style={{ background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`, border: `1px solid ${cadencePalette.border}` }}>
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <AlertTriangle size={20} style={{ color: cadencePalette.warning }} />
                                    Anomaly Detection
                                </h3>
                                <div className="h-48">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={anomalyData}>
                                            <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                                            <XAxis dataKey="date" tick={{ fill: cadencePalette.muted, fontSize: 11 }} axisLine={false} />
                                            <YAxis tick={{ fill: cadencePalette.muted, fontSize: 11 }} axisLine={false} />
                                            <RechartsTooltip contentStyle={{ background: cadencePalette.card, border: `1px solid ${cadencePalette.border}`, borderRadius: "8px" }} />
                                            <Area type="monotone" dataKey="normal" stroke={cadencePalette.primary} fill={cadencePalette.primary} fillOpacity={0.3} name="Normal Volume" />
                                            <Area type="monotone" dataKey="anomaly" stroke={cadencePalette.warning} fill={cadencePalette.warning} fillOpacity={0.6} name="Anomaly" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: `${cadencePalette.warning}11`, border: `1px solid ${cadencePalette.warning}33` }}>
                                    <p className="text-sm font-semibold" style={{ color: cadencePalette.warning }}>⚠️ Volume Spike Detected</p>
                                    <p className="text-xs mt-1" style={{ color: cadencePalette.muted }}>Unusual volume 53% above normal. Often precedes significant price movement.</p>
                                </div>
                            </div>
                        </section>
                    </motion.div>
                )}
            </div>

            {/* Sidebar */}
            <aside className="w-80 border-l p-6 sticky top-[7.5rem] h-[calc(100vh-7.5rem)] overflow-y-auto flex-shrink-0" style={{ borderColor: cadencePalette.border, backgroundColor: cadencePalette.bgSecondary }}>
                <div className="p-4 rounded-xl mb-6" style={{ background: `linear-gradient(145deg, ${cadencePalette.primary}22, ${cadencePalette.secondary}22)`, border: `1px solid ${cadencePalette.primary}44` }}>
                    <h3 className="text-sm font-semibold mb-2">AI Verdict</h3>
                    <p className="text-3xl font-bold" style={{ background: `linear-gradient(135deg, ${cadencePalette.success}, ${cadencePalette.primary})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        BULLISH
                    </p>
                    <p className="text-xs mt-1" style={{ color: cadencePalette.muted }}>85% confidence • 7 active signals</p>
                </div>

                <div className="mb-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: cadencePalette.muted }}>Model Performance</h3>
                    <div className="space-y-2">
                        {[
                            { label: "30-Day Accuracy", value: "78%" },
                            { label: "Win Rate", value: "72%" },
                            { label: "Avg Return", value: "+2.4%" },
                            { label: "Sharpe Ratio", value: "1.85" },
                        ].map((m) => (
                            <div key={m.label} className="flex justify-between">
                                <span className="text-sm" style={{ color: cadencePalette.muted }}>{m.label}</span>
                                <span className="text-sm font-semibold">{m.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: cadencePalette.card, border: `1px solid ${cadencePalette.border}` }}>
                    <h3 className="text-sm font-semibold mb-3">Active Signals</h3>
                    <div className="space-y-2">
                        {[
                            { signal: "Momentum", direction: "Long", strength: "Strong" },
                            { signal: "Pattern", direction: "Long", strength: "Moderate" },
                            { signal: "Sentiment", direction: "Long", strength: "Strong" },
                            { signal: "Options Flow", direction: "Long", strength: "Strong" },
                        ].map((s) => (
                            <div key={s.signal} className="flex items-center justify-between">
                                <span className="text-sm" style={{ color: cadencePalette.muted }}>{s.signal}</span>
                                <Badge className="border-0" style={{ backgroundColor: `${cadencePalette.success}22`, color: cadencePalette.success }}>
                                    {s.direction}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 rounded-xl" style={{ backgroundColor: `${cadencePalette.warning}11`, border: `1px solid ${cadencePalette.warning}33` }}>
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <AlertTriangle size={14} style={{ color: cadencePalette.warning }} />
                        Risk Alert
                    </h3>
                    <p className="text-xs" style={{ color: cadencePalette.muted }}>
                        Model uncertainty increases beyond 30-day horizon. Consider position sizing accordingly.
                    </p>
                </div>
            </aside>
        </div>
    );
}
