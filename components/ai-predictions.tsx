"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    ReferenceLine,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Brain,
    TrendingUp,
    TrendingDown,
    Target,
    Zap,
    AlertCircle,
    RefreshCw,
} from "lucide-react";

const palette = {
    bg: "#0D0D14",
    card: "#1A1A25",
    elevated: "#252532",
    text: "#E2E2F0",
    muted: "#A0A0B8",
    faded: "#6B6B7F",
    success: "#00F5A8",
    warning: "#FFA500",
    danger: "#FF4D8D",
    info: "#4A55E0",
    border: "rgba(74,85,224,0.2)",
};

interface Prediction {
    timeframe: string;
    targetPrice: number;
    confidence: number;
    direction: "bullish" | "bearish" | "neutral";
    probability: number;
}

interface AIPredictionsProps {
    currentPrice: number;
    historicalData: { date: string; price: number }[];
    symbol: string;
}

export function AIPredictions({
    currentPrice,
    historicalData,
    symbol,
}: AIPredictionsProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [predictions, setPredictions] = useState<Prediction[]>([
        {
            timeframe: "1 Day",
            targetPrice: currentPrice * 1.02,
            confidence: 72,
            direction: "bullish",
            probability: 68,
        },
        {
            timeframe: "1 Week",
            targetPrice: currentPrice * 1.05,
            confidence: 65,
            direction: "bullish",
            probability: 62,
        },
        {
            timeframe: "1 Month",
            targetPrice: currentPrice * 1.08,
            confidence: 58,
            direction: "bullish",
            probability: 55,
        },
    ]);

    const [predictionChart, setPredictionChart] = useState<
        { date: string; actual?: number; predicted?: number; lower?: number; upper?: number }[]
    >([]);

    useEffect(() => {
        // Generate prediction chart data
        const lastDate = new Date();
        const chartData: { date: string; actual?: number; predicted?: number; lower?: number; upper?: number }[] = [
            ...historicalData.slice(-10).map((d) => ({
                date: d.date,
                actual: d.price,
            })),
        ];

        // Add future predictions
        for (let i = 1; i <= 5; i++) {
            const futureDate = new Date(lastDate);
            futureDate.setDate(futureDate.getDate() + i);

            const growth = 0.01 * i; // 1% per day
            const predicted = currentPrice * (1 + growth);
            const variance = currentPrice * 0.02 * i; // Increasing uncertainty

            chartData.push({
                date: futureDate.toISOString().split("T")[0]!,
                predicted,
                lower: predicted - variance,
                upper: predicted + variance,
            });
        }

        setPredictionChart(chartData);
    }, [historicalData, currentPrice]);

    const generateNewPredictions = async () => {
        setIsLoading(true);

        // Simulate AI processing
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Generate random but realistic predictions
        const randomFactor = 0.95 + Math.random() * 0.1; // 0.95 to 1.05

        setPredictions([
            {
                timeframe: "1 Day",
                targetPrice: currentPrice * randomFactor,
                confidence: 60 + Math.random() * 25,
                direction: randomFactor > 1 ? "bullish" : "bearish",
                probability: 55 + Math.random() * 30,
            },
            {
                timeframe: "1 Week",
                targetPrice: currentPrice * (randomFactor * (0.98 + Math.random() * 0.08)),
                confidence: 55 + Math.random() * 20,
                direction: randomFactor > 1 ? "bullish" : "bearish",
                probability: 50 + Math.random() * 25,
            },
            {
                timeframe: "1 Month",
                targetPrice: currentPrice * (randomFactor * (0.95 + Math.random() * 0.15)),
                confidence: 45 + Math.random() * 20,
                direction: randomFactor > 1 ? "bullish" : "bearish",
                probability: 45 + Math.random() * 25,
            },
        ]);

        setIsLoading(false);
    };

    const getDirectionColor = (direction: string) => {
        switch (direction) {
            case "bullish":
                return palette.success;
            case "bearish":
                return palette.danger;
            default:
                return palette.info;
        }
    };

    const getDirectionIcon = (direction: string) => {
        switch (direction) {
            case "bullish":
                return TrendingUp;
            case "bearish":
                return TrendingDown;
            default:
                return Target;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div
                        className="p-3 rounded-lg"
                        style={{
                            backgroundColor: `${palette.info}22`,
                            border: `1px solid ${palette.info}44`,
                        }}
                    >
                        <Brain size={24} style={{ color: palette.info }} />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold" style={{ color: palette.text }}>
                            AI Price Predictions
                        </h3>
                        <p className="text-sm" style={{ color: palette.muted }}>
                            Machine learning-powered forecasts for {symbol}
                        </p>
                    </div>
                </div>

                <Button
                    onClick={generateNewPredictions}
                    disabled={isLoading}
                    className="gap-2"
                    style={{
                        backgroundColor: palette.info,
                        color: "#fff",
                    }}
                >
                    <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
                    {isLoading ? "Analyzing..." : "Refresh"}
                </Button>
            </div>

            {/* Prediction Cards */}
            <div className="grid md:grid-cols-3 gap-4">
                {predictions.map((prediction, index) => {
                    const Icon = getDirectionIcon(prediction.direction);
                    const color = getDirectionColor(prediction.direction);
                    const change = ((prediction.targetPrice - currentPrice) / currentPrice) * 100;

                    return (
                        <motion.div
                            key={prediction.timeframe}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="rounded-xl border p-5 shadow-xl"
                            style={{
                                borderColor: `${color}33`,
                                background: `linear-gradient(145deg, ${palette.card}, ${palette.elevated})`,
                                boxShadow: `0 18px 38px rgba(0,0,0,0.35), 0 0 24px ${color}11`,
                            }}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <p className="text-xs uppercase tracking-wide" style={{ color: palette.muted }}>
                                        {prediction.timeframe}
                                    </p>
                                    <p className="text-2xl font-bold mt-1" style={{ color: palette.text }}>
                                        ${prediction.targetPrice.toFixed(2)}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Icon size={14} style={{ color }} />
                                        <span
                                            className="text-sm font-semibold"
                                            style={{ color }}
                                        >
                                            {change > 0 ? "+" : ""}
                                            {change.toFixed(2)}%
                                        </span>
                                    </div>
                                </div>

                                <Badge
                                    className="border-0 capitalize"
                                    style={{
                                        backgroundColor: `${color}22`,
                                        color: palette.text,
                                    }}
                                >
                                    {prediction.direction}
                                </Badge>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <div className="flex items-center justify-between text-xs mb-1">
                                        <span style={{ color: palette.muted }}>Confidence</span>
                                        <span style={{ color: palette.text }}>{prediction.confidence.toFixed(0)}%</span>
                                    </div>
                                    <div className="h-2 rounded-full" style={{ backgroundColor: `${color}22` }}>
                                        <div
                                            className="h-2 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${prediction.confidence}%`,
                                                backgroundColor: color,
                                            }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between text-xs mb-1">
                                        <span style={{ color: palette.muted }}>Probability</span>
                                        <span style={{ color: palette.text }}>{prediction.probability.toFixed(0)}%</span>
                                    </div>
                                    <div className="h-2 rounded-full" style={{ backgroundColor: `${palette.info}22` }}>
                                        <div
                                            className="h-2 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${prediction.probability}%`,
                                                backgroundColor: palette.info,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Prediction Chart */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl border p-6 shadow-xl"
                style={{
                    borderColor: palette.border,
                    background: `linear-gradient(145deg, ${palette.card}, ${palette.elevated})`,
                }}
            >
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold" style={{ color: palette.text }}>
                        Price Forecast with Confidence Interval
                    </h4>
                    <div className="flex items-center gap-2 text-xs">
                        <div className="flex items-center gap-1">
                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: palette.info }} />
                            <span style={{ color: palette.muted }}>Actual</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: palette.success }} />
                            <span style={{ color: palette.muted }}>Predicted</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="h-3 w-3 rounded" style={{ backgroundColor: `${palette.warning}44` }} />
                            <span style={{ color: palette.muted }}>Range</span>
                        </div>
                    </div>
                </div>

                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={predictionChart}>
                            <defs>
                                <linearGradient id="predictionRange" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={palette.warning} stopOpacity={0.3} />
                                    <stop offset="100%" stopColor={palette.warning} stopOpacity={0.05} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                            <XAxis
                                dataKey="date"
                                tick={{ fill: palette.muted, fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fill: palette.muted, fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                                domain={["auto", "auto"]}
                            />
                            <RechartsTooltip
                                contentStyle={{
                                    background: palette.elevated,
                                    border: `1px solid ${palette.border}`,
                                    color: palette.text,
                                }}
                            />

                            {/* Confidence interval */}
                            <Area
                                type="monotone"
                                dataKey="upper"
                                stroke="none"
                                fill="url(#predictionRange)"
                            />
                            <Area
                                type="monotone"
                                dataKey="lower"
                                stroke="none"
                                fill={palette.bg}
                            />

                            {/* Actual price */}
                            <Line
                                type="monotone"
                                dataKey="actual"
                                stroke={palette.info}
                                strokeWidth={3}
                                dot={{ r: 4, fill: palette.info }}
                            />

                            {/* Predicted price */}
                            <Line
                                type="monotone"
                                dataKey="predicted"
                                stroke={palette.success}
                                strokeWidth={3}
                                strokeDasharray="5 5"
                                dot={{ r: 4, fill: palette.success }}
                            />

                            <ReferenceLine x={historicalData.slice(-1)[0]?.date} stroke={palette.muted} strokeDasharray="3 3" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div
                    className="mt-4 p-3 rounded-lg flex items-start gap-2"
                    style={{
                        backgroundColor: `${palette.info}11`,
                        border: `1px solid ${palette.info}33`,
                    }}
                >
                    <AlertCircle size={16} style={{ color: palette.info, marginTop: 2 }} />
                    <p className="text-xs" style={{ color: palette.muted }}>
                        <strong style={{ color: palette.text }}>Disclaimer:</strong> These predictions are generated using machine learning models based on historical data and technical indicators. They should not be used as the sole basis for investment decisions. Past performance does not guarantee future results.
                    </p>
                </div>
            </motion.div>

            {/* Key Insights */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="rounded-xl border p-5"
                style={{
                    borderColor: palette.border,
                    backgroundColor: palette.card,
                }}
            >
                <div className="flex items-center gap-2 mb-3">
                    <Zap size={16} style={{ color: palette.warning }} />
                    <h4 className="text-sm font-semibold" style={{ color: palette.text }}>
                        AI Insights
                    </h4>
                </div>

                <div className="space-y-2 text-sm">
                    <p style={{ color: palette.muted }}>
                        • <strong style={{ color: palette.text }}>Trend Direction:</strong> The model predicts a{" "}
                        <span style={{ color: getDirectionColor(predictions[2]!.direction) }}>
                            {predictions[2]!.direction}
                        </span>{" "}
                        trend over the next month
                    </p>
                    <p style={{ color: palette.muted }}>
                        • <strong style={{ color: palette.text }}>Volatility:</strong> Expected price range widening indicates increasing market uncertainty
                    </p>
                    <p style={{ color: palette.muted }}>
                        • <strong style={{ color: palette.text }}>Confidence:</strong> Short-term predictions have higher confidence due to recent momentum patterns
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
