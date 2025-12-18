"use client";

import { useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AnalysisTabs } from "@/components/markets/AnalysisTabs";
import Navbar from "@/components/trading/Navbar";
import { ArrowLeft, TrendingUp, TrendingDown, Activity, BarChart3, AlertTriangle } from "lucide-react";
import Link from "next/link";

type Palette = {
    bg: string;
    card: string;
    text: string;
    muted: string;
    grid: string;
    up: string;
    down: string;
    purple: string;
    accent: string;
    alert: string;
};

const darkPalette: Palette = {
    bg: "#0b1020",
    card: "#111827",
    text: "#e5e7eb",
    muted: "#9aa3b5",
    grid: "#1f2937",
    up: "#00ff88",
    down: "#ff4d4d",
    purple: "#1e3a8a",
    accent: "#5ea8ff",
    alert: "#f59e0b",
};

const lightPalette: Palette = {
    bg: "#f3f6fb",
    card: "#ffffff",
    text: "#0b1220",
    muted: "#5b6475",
    grid: "#e2e8f0",
    up: "#16a34a",
    down: "#dc2626",
    purple: "#1f4fbf",
    accent: "#5ea8ff",
    alert: "#f59e0b",
};

// Mock data generator
const generateMockData = (symbol: string) => {
    const seed = symbol.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const rand = (min: number, max: number) => min + ((seed * 9301 + 49297) % 233280) / 233280 * (max - min);

    return {
        symbol,
        name: getSymbolName(symbol),
        price: rand(10, 5000),
        change: rand(-5, 5),
        volume: rand(10, 500),
        marketCap: rand(100, 3000),
        high24h: rand(10, 5200),
        low24h: rand(8, 4800),
        pe: rand(10, 40),
        eps: rand(1, 15),
        beta: rand(0.5, 1.8),
        avgVolume: rand(50, 300),
    };
};

const getSymbolName = (symbol: string): string => {
    const names: Record<string, string> = {
        AAPL: "Apple Inc.",
        MSFT: "Microsoft Corporation",
        NVDA: "NVIDIA Corporation",
        TSLA: "Tesla Inc.",
        AMZN: "Amazon.com Inc.",
        META: "Meta Platforms Inc.",
        GOOGL: "Alphabet Inc.",
        BTC: "Bitcoin",
        ETH: "Ethereum",
        SPX: "S&P 500",
        EURUSD: "Euro / US Dollar",
        GOLD: "Gold",
    };
    return names[symbol] || symbol;
};

function AnalysisContent() {
    const searchParams = useSearchParams();
    const symbol = searchParams.get("symbol") || "AAPL";
    const { theme = "dark" } = useTheme();
    const palette = theme === "light" ? lightPalette : darkPalette;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const data = generateMockData(symbol);
    const isUp = data.change >= 0;

    return (
        <div className="min-h-screen" style={{ backgroundColor: palette.bg, color: palette.text }}>
            <Navbar
                symbol={data.symbol}
                price={data.price}
                change={data.change}
                changePercent={data.change}
            />

            <div className="max-w-[1600px] mx-auto px-4 py-6 space-y-6">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/markets">
                            <Button
                                variant="outline"
                                size="sm"
                                style={{ borderColor: palette.grid, color: palette.text }}
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Markets
                            </Button>
                        </Link>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold">{data.symbol}</h1>
                                <Badge
                                    style={{
                                        backgroundColor: isUp ? `${palette.up}20` : `${palette.down}20`,
                                        color: isUp ? palette.up : palette.down,
                                        border: `1px solid ${isUp ? palette.up : palette.down}`,
                                    }}
                                >
                                    {isUp ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                                    {isUp ? "+" : ""}{data.change.toFixed(2)}%
                                </Badge>
                            </div>
                            <p className="text-sm" style={{ color: palette.muted }}>{data.name}</p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button style={{ backgroundColor: palette.up, color: "#fff" }}>
                            Buy
                        </Button>
                        <Button style={{ backgroundColor: palette.down, color: "#fff" }}>
                            Sell
                        </Button>
                        <Button variant="outline" style={{ borderColor: palette.grid, color: palette.text }}>
                            Set Alert
                        </Button>
                    </div>
                </div>

                {/* Price & Stats Row */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card style={{ backgroundColor: palette.card, borderColor: palette.grid }}>
                        <CardContent className="p-4">
                            <div className="text-sm" style={{ color: palette.muted }}>Current Price</div>
                            <div className="text-3xl font-bold" style={{ color: palette.text }}>
                                ${data.price.toFixed(2)}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                {isUp ? (
                                    <TrendingUp className="h-4 w-4" style={{ color: palette.up }} />
                                ) : (
                                    <TrendingDown className="h-4 w-4" style={{ color: palette.down }} />
                                )}
                                <span style={{ color: isUp ? palette.up : palette.down }}>
                                    {isUp ? "+" : ""}{data.change.toFixed(2)}% today
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card style={{ backgroundColor: palette.card, borderColor: palette.grid }}>
                        <CardContent className="p-4">
                            <div className="text-sm" style={{ color: palette.muted }}>24h Range</div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-sm" style={{ color: palette.down }}>${data.low24h.toFixed(2)}</span>
                                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: palette.grid }}>
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            width: `${((data.price - data.low24h) / (data.high24h - data.low24h)) * 100}%`,
                                            background: `linear-gradient(90deg, ${palette.accent}, ${palette.purple})`,
                                        }}
                                    />
                                </div>
                                <span className="text-sm" style={{ color: palette.up }}>${data.high24h.toFixed(2)}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card style={{ backgroundColor: palette.card, borderColor: palette.grid }}>
                        <CardContent className="p-4">
                            <div className="text-sm" style={{ color: palette.muted }}>Volume (24h)</div>
                            <div className="text-xl font-semibold mt-1" style={{ color: palette.text }}>
                                ${data.volume.toFixed(1)}B
                            </div>
                            <div className="text-xs mt-1" style={{ color: palette.muted }}>
                                Avg: ${data.avgVolume.toFixed(1)}B
                            </div>
                        </CardContent>
                    </Card>

                    <Card style={{ backgroundColor: palette.card, borderColor: palette.grid }}>
                        <CardContent className="p-4">
                            <div className="text-sm" style={{ color: palette.muted }}>Market Cap</div>
                            <div className="text-xl font-semibold mt-1" style={{ color: palette.text }}>
                                ${data.marketCap.toFixed(0)}B
                            </div>
                            <div className="text-xs mt-1" style={{ color: palette.muted }}>
                                Beta: {data.beta.toFixed(2)}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Analysis Section */}
                <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
                    <Card style={{ backgroundColor: palette.card, borderColor: palette.grid }}>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5" style={{ color: palette.accent }} />
                                    Deep Analysis
                                </CardTitle>
                                <Badge variant="outline" style={{ borderColor: palette.accent, color: palette.accent }}>
                                    AI-Powered
                                </Badge>
                            </div>
                        </CardHeader>
                        <Separator style={{ backgroundColor: palette.grid }} />
                        <CardContent className="p-4">
                            <AnalysisTabs
                                palette={{
                                    card: palette.card,
                                    text: palette.text,
                                    muted: palette.muted,
                                    grid: palette.grid,
                                    accent: palette.accent,
                                    up: palette.up,
                                    down: palette.down,
                                    bg: palette.bg,
                                    purple: palette.purple,
                                }}
                                symbol={symbol}
                            />
                        </CardContent>
                    </Card>

                    {/* Side Panel */}
                    <div className="space-y-4">
                        <Card style={{ backgroundColor: palette.card, borderColor: palette.grid }}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Activity className="h-4 w-4" style={{ color: palette.accent }} />
                                    Key Metrics
                                </CardTitle>
                            </CardHeader>
                            <Separator style={{ backgroundColor: palette.grid }} />
                            <CardContent className="p-4 space-y-3">
                                {[
                                    { label: "P/E Ratio", value: data.pe.toFixed(2) },
                                    { label: "EPS", value: `$${data.eps.toFixed(2)}` },
                                    { label: "Beta", value: data.beta.toFixed(2) },
                                    { label: "Avg Volume", value: `${data.avgVolume.toFixed(1)}B` },
                                ].map((item) => (
                                    <div key={item.label} className="flex justify-between items-center">
                                        <span className="text-sm" style={{ color: palette.muted }}>{item.label}</span>
                                        <span className="font-mono text-sm" style={{ color: palette.text }}>{item.value}</span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card style={{ backgroundColor: palette.card, borderColor: palette.grid }}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4" style={{ color: palette.alert }} />
                                    Risk Signals
                                </CardTitle>
                            </CardHeader>
                            <Separator style={{ backgroundColor: palette.grid }} />
                            <CardContent className="p-4 space-y-3">
                                <div
                                    className="p-3 rounded-lg border"
                                    style={{ borderColor: palette.grid, backgroundColor: `${palette.bg}aa` }}
                                >
                                    <div className="flex items-center gap-2 text-sm font-medium" style={{ color: palette.text }}>
                                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: palette.up }} />
                                        Low Volatility
                                    </div>
                                    <p className="text-xs mt-1" style={{ color: palette.muted }}>
                                        Historical volatility is below 20th percentile
                                    </p>
                                </div>
                                <div
                                    className="p-3 rounded-lg border"
                                    style={{ borderColor: palette.grid, backgroundColor: `${palette.bg}aa` }}
                                >
                                    <div className="flex items-center gap-2 text-sm font-medium" style={{ color: palette.text }}>
                                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: palette.alert }} />
                                        Moderate Correlation
                                    </div>
                                    <p className="text-xs mt-1" style={{ color: palette.muted }}>
                                        0.72 correlation with S&P 500
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card style={{ backgroundColor: palette.card, borderColor: palette.grid }}>
                            <CardContent className="p-4">
                                <div className="text-sm font-medium mb-2" style={{ color: palette.text }}>
                                    Quick Actions
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full"
                                        style={{ borderColor: palette.grid, color: palette.text }}
                                    >
                                        Add to Watchlist
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full"
                                        style={{ borderColor: palette.grid, color: palette.text }}
                                    >
                                        Compare
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full"
                                        style={{ borderColor: palette.grid, color: palette.text }}
                                    >
                                        Export PDF
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full"
                                        style={{ borderColor: palette.grid, color: palette.text }}
                                    >
                                        Share
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AnalysisPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0b1020]" />}>
            <AnalysisContent />
        </Suspense>
    );
}
