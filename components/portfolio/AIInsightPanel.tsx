"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Brain, TrendingUp, TrendingDown, Activity, Shield, Zap } from "lucide-react";

interface AIInsightPanelProps {
    hoveredStock: {
        symbol: string;
        name: string;
        price: string;
        change: string;
        isPositive: boolean;
    } | null;
}

// Mock AI data for each stock
const stockInsights: Record<string, {
    riskLevel: number;
    beta: number;
    volatility: number;
    sharpeRatio: number;
    recommendation: string;
    sentiment: "bullish" | "neutral" | "bearish";
    keyFactors: string[];
}> = {
    JPM: {
        riskLevel: 45,
        beta: 1.12,
        volatility: 18.5,
        sharpeRatio: 1.67,
        recommendation: "Maliyyə sektorunda güclü mövqe. Faiz dərəcələrinin artması ilə gəlirlər artacaq.",
        sentiment: "bullish",
        keyFactors: ["Güclü kapital bazası", "Dividend artımı", "M&A aktivliyi"]
    },
    AAPL: {
        riskLevel: 35,
        beta: 1.23,
        volatility: 24.5,
        sharpeRatio: 1.45,
        recommendation: "iPhone satışları stabil. Services bölməsi artımda. Qısamüddətli volatillik gözlənilir.",
        sentiment: "neutral",
        keyFactors: ["Services artımı", "Yeni məhsullar", "Çin riski"]
    },
    TSLA: {
        riskLevel: 78,
        beta: 2.05,
        volatility: 52.3,
        sharpeRatio: 0.89,
        recommendation: "Yüksək volatillik. Rəqabət artır. Margin təzyiqi var. Hedcinq tövsiyə olunur.",
        sentiment: "bearish",
        keyFactors: ["Qiymət müharibəsi", "Çin rəqabəti", "FSD gecikmələri"]
    },
    MSFT: {
        riskLevel: 28,
        beta: 0.95,
        volatility: 19.2,
        sharpeRatio: 1.92,
        recommendation: "AI lideri. Azure buludunun artımı davam edir. Uzunmüddətli güclü investisiya.",
        sentiment: "bullish",
        keyFactors: ["AI/Copilot", "Azure artımı", "Enterprise gücü"]
    },
    GOOGL: {
        riskLevel: 42,
        beta: 1.08,
        volatility: 26.1,
        sharpeRatio: 1.34,
        recommendation: "Reklam gəlirləri bərpa olur. AI rəqabəti narahatlıq yaradır. Dəyərləmə cəlbedicidir.",
        sentiment: "neutral",
        keyFactors: ["Gemini AI", "YouTube Premium", "Antitrust riski"]
    }
};

export function AIInsightPanel({ hoveredStock }: AIInsightPanelProps) {
    const insight = hoveredStock ? stockInsights[hoveredStock.symbol] : null;

    return (
        <AnimatePresence>
            {hoveredStock && insight && (
                <motion.div
                    initial={{ opacity: 0, x: -20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="fixed left-6 top-1/2 -translate-y-1/2 z-50 w-80"
                >
                    <div className="bg-[#1e1b4b]/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-5 shadow-2xl shadow-cyan-500/10">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                                <Brain className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-lg">AI Insight</h3>
                                <p className="text-cyan-400 text-sm">{hoveredStock.symbol} Analizi</p>
                            </div>
                        </div>

                        {/* Stock Info */}
                        <div className="bg-[#2d2a5d]/50 rounded-xl p-3 mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-white font-medium">{hoveredStock.symbol}</span>
                                <span className={`text-sm font-medium ${hoveredStock.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                    {hoveredStock.change}
                                </span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">{hoveredStock.name.split('\n')[0]}</p>
                        </div>

                        {/* Risk Meter */}
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-400 text-sm flex items-center gap-1">
                                    <Shield className="w-4 h-4" /> Risk Səviyyəsi
                                </span>
                                <span className={`text-sm font-medium ${insight.riskLevel < 40 ? 'text-green-400' :
                                    insight.riskLevel < 60 ? 'text-yellow-400' : 'text-red-400'
                                    }`}>
                                    {insight.riskLevel < 40 ? 'Aşağı' : insight.riskLevel < 60 ? 'Orta' : 'Yüksək'}
                                </span>
                            </div>
                            <div className="h-2 bg-[#2d2a5d] rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${insight.riskLevel}%` }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className={`h-full rounded-full ${insight.riskLevel < 40 ? 'bg-gradient-to-r from-green-500 to-green-400' :
                                        insight.riskLevel < 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                                            'bg-gradient-to-r from-red-500 to-red-400'
                                        }`}
                                />
                            </div>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            <div className="bg-[#2d2a5d]/50 rounded-lg p-2 text-center">
                                <div className="text-cyan-400 text-xs mb-1">Beta</div>
                                <div className="text-white font-semibold">{insight.beta}</div>
                            </div>
                            <div className="bg-[#2d2a5d]/50 rounded-lg p-2 text-center">
                                <div className="text-cyan-400 text-xs mb-1">Volatility</div>
                                <div className="text-white font-semibold">{insight.volatility}%</div>
                            </div>
                            <div className="bg-[#2d2a5d]/50 rounded-lg p-2 text-center">
                                <div className="text-cyan-400 text-xs mb-1">Sharpe</div>
                                <div className="text-white font-semibold">{insight.sharpeRatio}</div>
                            </div>
                        </div>

                        {/* Sentiment Badge */}
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-gray-400 text-sm">Sentiment:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${insight.sentiment === 'bullish' ? 'bg-green-500/20 text-green-400' :
                                insight.sentiment === 'bearish' ? 'bg-red-500/20 text-red-400' :
                                    'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                {insight.sentiment === 'bullish' ? <TrendingUp className="w-3 h-3" /> :
                                    insight.sentiment === 'bearish' ? <TrendingDown className="w-3 h-3" /> :
                                        <Activity className="w-3 h-3" />}
                                {insight.sentiment === 'bullish' ? 'Bullish' :
                                    insight.sentiment === 'bearish' ? 'Bearish' : 'Neutral'}
                            </span>
                        </div>

                        {/* AI Recommendation */}
                        <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl p-3 border border-cyan-500/20">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap className="w-4 h-4 text-cyan-400" />
                                <span className="text-cyan-400 text-sm font-medium">AI Tövsiyəsi</span>
                            </div>
                            <p className="text-gray-300 text-xs leading-relaxed">
                                {insight.recommendation}
                            </p>
                        </div>

                        {/* Key Factors */}
                        <div className="mt-3">
                            <div className="text-gray-400 text-xs mb-2">Əsas Amillər:</div>
                            <div className="flex flex-wrap gap-1">
                                {insight.keyFactors.map((factor, i) => (
                                    <span key={i} className="px-2 py-1 bg-[#2d2a5d] rounded text-xs text-gray-300">
                                        {factor}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
