"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    MessageSquare,
    Twitter,
    Newspaper,
    Radio,
    TrendingUp,
    TrendingDown,
    Users,
    Heart,
    ThumbsUp,
    ThumbsDown,
    RefreshCw,
    AlertCircle,
    Zap,
    Clock,
} from "lucide-react";
import { cadencePalette } from "@/lib/cadence-palette";

// Analysis stages
const analysisStages = [
    { id: 1, name: "Collecting news data", duration: 1000 },
    { id: 2, name: "Scanning social media", duration: 1200 },
    { id: 3, name: "Analyzing sentiment patterns", duration: 1500 },
    { id: 4, name: "Processing options flow", duration: 1000 },
    { id: 5, name: "Generating sentiment score", duration: 800 },
];

const metricCards = [
    { id: "overall", label: "Overall", value: "72/100", detail: "Bullish bias", icon: Heart, color: cadencePalette.success },
    { id: "social", label: "Social", value: "78/100", detail: "High engagement", icon: Twitter, color: cadencePalette.primary },
    { id: "news", label: "News", value: "65/100", detail: "Neutral coverage", icon: Newspaper, color: cadencePalette.warning },
    { id: "options", label: "Options", value: "82/100", detail: "Call flow heavy", icon: TrendingUp, color: cadencePalette.success },
    { id: "institutional", label: "Institutional", value: "68/100", detail: "Net buying", icon: Users, color: cadencePalette.primary },
    { id: "retail", label: "Retail", value: "75/100", detail: "Strong interest", icon: Radio, color: cadencePalette.secondary },
];

const socialSentiment = [
    { source: "Twitter/X", mentions: 15200, sentiment: 72, change: 12, icon: Twitter },
    { source: "Reddit", mentions: 8200, sentiment: 68, change: -5, icon: MessageSquare },
    { source: "StockTwits", mentions: 4500, sentiment: 75, change: 22, icon: Radio },
    { source: "News", mentions: 320, sentiment: 65, change: 8, icon: Newspaper },
];

const sentimentTrend = [
    { date: "Mon", bullish: 58, bearish: 22, neutral: 20 },
    { date: "Tue", bullish: 62, bearish: 20, neutral: 18 },
    { date: "Wed", bullish: 55, bearish: 28, neutral: 17 },
    { date: "Thu", bullish: 68, bearish: 18, neutral: 14 },
    { date: "Fri", bullish: 72, bearish: 15, neutral: 13 },
    { date: "Today", bullish: 75, bearish: 12, neutral: 13 },
];

const sentimentBreakdown = [
    { name: "Bullish", value: 58, color: cadencePalette.success },
    { name: "Neutral", value: 28, color: cadencePalette.primary },
    { name: "Bearish", value: 14, color: cadencePalette.destructive },
];

const optionsFlow = [
    { strike: 180, calls: 12000, puts: 4500, premium: 2.4, expiry: "Dec 20" },
    { strike: 190, calls: 18000, puts: 6000, premium: 4.8, expiry: "Dec 20" },
    { strike: 200, calls: 25000, puts: 15000, premium: 8.2, expiry: "Jan 17" },
    { strike: 210, calls: 8000, puts: 22000, premium: 3.1, expiry: "Jan 17" },
];

const recentNews = [
    { title: "Apple AI Features Drive Holiday Sales Expectations", source: "Bloomberg", time: "2h ago", sentiment: "bullish" },
    { title: "Services Revenue Hits Record High in Q4", source: "Reuters", time: "4h ago", sentiment: "bullish" },
    { title: "China Market Share Faces Competition", source: "WSJ", time: "6h ago", sentiment: "bearish" },
    { title: "Warren Buffett Maintains Apple Position", source: "CNBC", time: "8h ago", sentiment: "neutral" },
];

export default function SentimentPage() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [currentStage, setCurrentStage] = useState(0);
    const [progress, setProgress] = useState(0);
    const [analysisComplete, setAnalysisComplete] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("sentiment_analysis_AAPL");
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
                localStorage.setItem("sentiment_analysis_AAPL", "complete");
                return;
            }
            setCurrentStage(stageIndex);
            const stageDuration = analysisStages[stageIndex]!.duration;
            totalTime += stageDuration;
            setProgress((totalTime / 5500) * 100);
            stageIndex++;
            setTimeout(runAnalysis, stageDuration);
        };
        runAnalysis();
    }, [isAnalyzing]);

    const resetAnalysis = () => {
        localStorage.removeItem("sentiment_analysis_AAPL");
        setIsAnalyzing(true);
        setCurrentStage(0);
        setProgress(0);
        setAnalysisComplete(false);
    };

    return (
        <div className="flex" style={{ backgroundColor: cadencePalette.bg, color: cadencePalette.text }}>
            <div className="flex-1 px-6 lg:px-8 py-6 overflow-y-auto">
                {/* Hero Section */}
                <section className="mb-6">
                    <div
                        className="relative p-6 rounded-2xl overflow-hidden"
                        style={{
                            background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`,
                            border: `2px solid ${cadencePalette.accent}33`,
                        }}
                    >
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-1/2 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: cadencePalette.accent }} />
                        </div>

                        <div className="relative z-10 flex items-center gap-8">
                            <div
                                className="w-24 h-24 rounded-full p-1 flex-shrink-0"
                                style={{ background: `conic-gradient(from 0deg, ${cadencePalette.accent}, ${cadencePalette.success}, ${cadencePalette.accent})` }}
                            >
                                <div className="w-full h-full rounded-full flex flex-col items-center justify-center" style={{ backgroundColor: cadencePalette.card }}>
                                    <p className="text-3xl font-bold">72</p>
                                    <p className="text-[10px]" style={{ color: cadencePalette.muted }}>SENTIMENT</p>
                                </div>
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-medium uppercase px-2 py-1 rounded" style={{ backgroundColor: `${cadencePalette.accent}22`, color: cadencePalette.accent }}>
                                        Social Intelligence
                                    </span>
                                    <span className="text-xs" style={{ color: cadencePalette.muted }}>Updated 2 min ago</span>
                                </div>
                                <h1 className="text-2xl font-bold mb-1" style={{ background: `linear-gradient(135deg, ${cadencePalette.accent}, ${cadencePalette.success})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                    Sentiment Analysis
                                </h1>
                                <p className="text-sm" style={{ color: cadencePalette.muted }}>News, social media, and options flow sentiment tracking</p>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center">
                                    <p className="text-xs" style={{ color: cadencePalette.muted }}>Mood</p>
                                    <p className="text-xl font-bold" style={{ color: cadencePalette.success }}>Bullish</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs" style={{ color: cadencePalette.muted }}>Mentions</p>
                                    <p className="text-xl font-bold">28.2K</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs" style={{ color: cadencePalette.muted }}>Trend</p>
                                    <p className="text-xl font-bold" style={{ color: cadencePalette.success }}>↑ +15%</p>
                                </div>
                            </div>

                            <Button onClick={resetAnalysis} style={{ background: `linear-gradient(135deg, ${cadencePalette.accent}, ${cadencePalette.success})` }}>
                                <RefreshCw size={16} className="mr-2" /> Refresh
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Loading State */}
                <AnimatePresence mode="wait">
                    {isAnalyzing && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-2xl border p-8 mb-6" style={{ borderColor: cadencePalette.border, background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})` }}>
                            <div className="flex flex-col items-center justify-center space-y-6">
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                                    <div className="w-20 h-20 rounded-full border-4 border-t-transparent" style={{ borderColor: `${cadencePalette.accent}44`, borderTopColor: cadencePalette.accent }} />
                                </motion.div>
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold mb-2">Analyzing Sentiment</h3>
                                    <p className="text-sm" style={{ color: cadencePalette.muted }}>{analysisStages[currentStage]?.name || "Initializing..."}</p>
                                </div>
                                <div className="w-full max-w-md">
                                    <div className="h-2 rounded-full" style={{ backgroundColor: `${cadencePalette.accent}22` }}>
                                        <motion.div className="h-2 rounded-full" style={{ backgroundColor: cadencePalette.accent }} initial={{ width: "0%" }} animate={{ width: `${progress}%` }} />
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

                        {/* Sentiment Trend & Breakdown */}
                        <section className="grid grid-cols-2 gap-6">
                            <div className="p-6 rounded-xl" style={{ background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`, border: `1px solid ${cadencePalette.border}` }}>
                                <h3 className="text-lg font-bold mb-4">Sentiment Trend (7 Days)</h3>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={sentimentTrend}>
                                            <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                                            <XAxis dataKey="date" tick={{ fill: cadencePalette.muted, fontSize: 11 }} axisLine={false} />
                                            <YAxis tick={{ fill: cadencePalette.muted, fontSize: 11 }} axisLine={false} />
                                            <RechartsTooltip contentStyle={{ background: cadencePalette.card, border: `1px solid ${cadencePalette.border}`, borderRadius: "8px" }} />
                                            <Area type="monotone" dataKey="bullish" stackId="1" stroke={cadencePalette.success} fill={cadencePalette.success} fillOpacity={0.6} />
                                            <Area type="monotone" dataKey="neutral" stackId="1" stroke={cadencePalette.primary} fill={cadencePalette.primary} fillOpacity={0.6} />
                                            <Area type="monotone" dataKey="bearish" stackId="1" stroke={cadencePalette.destructive} fill={cadencePalette.destructive} fillOpacity={0.6} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="p-6 rounded-xl" style={{ background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`, border: `1px solid ${cadencePalette.border}` }}>
                                <h3 className="text-lg font-bold mb-4">Current Sentiment Breakdown</h3>
                                <div className="h-64 flex items-center justify-center">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={sentimentBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                                                {sentimentBreakdown.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <RechartsTooltip contentStyle={{ background: cadencePalette.card, border: `1px solid ${cadencePalette.border}`, borderRadius: "8px" }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex justify-center gap-6 mt-4">
                                    {sentimentBreakdown.map((s) => (
                                        <div key={s.name} className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                                            <span className="text-sm">{s.name} {s.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Social Sources */}
                        <section className="p-6 rounded-xl" style={{ background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`, border: `1px solid ${cadencePalette.border}` }}>
                            <h3 className="text-lg font-bold mb-4">Social Media Sentiment by Source</h3>
                            <div className="grid grid-cols-4 gap-4">
                                {socialSentiment.map((source) => (
                                    <div key={source.source} className="p-4 rounded-xl" style={{ backgroundColor: `${cadencePalette.bg}80` }}>
                                        <div className="flex items-center gap-2 mb-3">
                                            <source.icon size={20} style={{ color: cadencePalette.primary }} />
                                            <span className="font-semibold">{source.source}</span>
                                        </div>
                                        <p className="text-2xl font-bold">{source.sentiment}%</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Badge className="border-0" style={{ backgroundColor: source.change > 0 ? `${cadencePalette.success}22` : `${cadencePalette.destructive}22`, color: source.change > 0 ? cadencePalette.success : cadencePalette.destructive }}>
                                                {source.change > 0 ? "+" : ""}{source.change}%
                                            </Badge>
                                            <span className="text-xs" style={{ color: cadencePalette.muted }}>{source.mentions.toLocaleString()} mentions</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Options Flow & News */}
                        <section className="grid grid-cols-2 gap-6">
                            <div className="p-6 rounded-xl" style={{ background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`, border: `1px solid ${cadencePalette.border}` }}>
                                <h3 className="text-lg font-bold mb-4">Options Flow</h3>
                                <div className="space-y-3">
                                    {optionsFlow.map((opt, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: `${cadencePalette.bg}80` }}>
                                            <div>
                                                <p className="font-bold">${opt.strike} Strike</p>
                                                <p className="text-xs" style={{ color: cadencePalette.muted }}>Exp: {opt.expiry}</p>
                                            </div>
                                            <div className="flex gap-4 text-sm">
                                                <span style={{ color: cadencePalette.success }}>{(opt.calls / 1000).toFixed(0)}K Calls</span>
                                                <span style={{ color: cadencePalette.destructive }}>{(opt.puts / 1000).toFixed(0)}K Puts</span>
                                            </div>
                                            <Badge className="border-0" style={{ backgroundColor: opt.calls > opt.puts ? `${cadencePalette.success}22` : `${cadencePalette.destructive}22`, color: opt.calls > opt.puts ? cadencePalette.success : cadencePalette.destructive }}>
                                                {opt.calls > opt.puts ? "Bullish" : "Bearish"}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 rounded-xl" style={{ background: `linear-gradient(145deg, ${cadencePalette.card}, ${cadencePalette.bgSecondary})`, border: `1px solid ${cadencePalette.border}` }}>
                                <h3 className="text-lg font-bold mb-4">Recent News</h3>
                                <div className="space-y-3">
                                    {recentNews.map((news, i) => (
                                        <div key={i} className="p-3 rounded-lg" style={{ backgroundColor: `${cadencePalette.bg}80` }}>
                                            <p className="font-semibold text-sm mb-1">{news.title}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs" style={{ color: cadencePalette.muted }}>{news.source}</span>
                                                <span className="text-xs" style={{ color: cadencePalette.muted }}>•</span>
                                                <span className="text-xs" style={{ color: cadencePalette.muted }}>{news.time}</span>
                                                <Badge className="border-0 ml-auto" style={{ backgroundColor: news.sentiment === "bullish" ? `${cadencePalette.success}22` : news.sentiment === "bearish" ? `${cadencePalette.destructive}22` : `${cadencePalette.primary}22`, color: news.sentiment === "bullish" ? cadencePalette.success : news.sentiment === "bearish" ? cadencePalette.destructive : cadencePalette.primary }}>
                                                    {news.sentiment}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </motion.div>
                )}
            </div>

            {/* Sidebar */}
            <aside className="w-80 border-l p-6 sticky top-[7.5rem] h-[calc(100vh-7.5rem)] overflow-y-auto flex-shrink-0" style={{ borderColor: cadencePalette.border, backgroundColor: cadencePalette.bgSecondary }}>
                <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: `${cadencePalette.success}11`, border: `1px solid ${cadencePalette.success}33` }}>
                    <h3 className="text-sm font-semibold mb-2">Overall Sentiment</h3>
                    <p className="text-3xl font-bold" style={{ color: cadencePalette.success }}>BULLISH</p>
                    <p className="text-xs mt-1" style={{ color: cadencePalette.muted }}>72% positive across all sources</p>
                </div>

                <div className="mb-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: cadencePalette.muted }}>Key Metrics</h3>
                    <div className="space-y-2">
                        {[
                            { label: "Total Mentions", value: "28.2K" },
                            { label: "Engagement Rate", value: "4.2%" },
                            { label: "Put/Call Ratio", value: "0.65" },
                            { label: "Institutional Flow", value: "Net Buy" },
                        ].map((m) => (
                            <div key={m.label} className="flex justify-between">
                                <span className="text-sm" style={{ color: cadencePalette.muted }}>{m.label}</span>
                                <span className="text-sm font-semibold">{m.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 rounded-xl" style={{ backgroundColor: cadencePalette.card, border: `1px solid ${cadencePalette.border}` }}>
                    <h3 className="text-sm font-semibold mb-3">Top Trending Topics</h3>
                    <div className="space-y-2">
                        {["#AppleAI", "#iPhone16", "#Services", "#WWDC", "#BuybackProgram"].map((tag) => (
                            <Badge key={tag} className="mr-2 border-0" style={{ backgroundColor: `${cadencePalette.primary}22`, color: cadencePalette.primary }}>
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </aside>
        </div>
    );
}
