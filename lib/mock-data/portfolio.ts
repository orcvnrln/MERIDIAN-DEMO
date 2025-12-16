// Portfolio Mock Data - Move to API/backend when ready
// This file contains all mock data for the portfolio page
// Replace with real API calls when integrating backend

export interface PortfolioMetrics {
    // Core Values
    totalValue: number;
    todaysPL: number;
    todaysPLPercent: number;
    openPositions: number;
    winRate: number;
    winRateChange: number;

    // Returns
    ytdReturn: number;
    annualizedReturn: number;
    cumulativeReturn: number;
    spComparison: number;  // vs S&P 500 %

    // Risk Metrics
    var95: number;
    var99: number;
    maxDrawdown: number;
    volatility: number;

    // Ratios
    sharpeRatio: number;
    sortinoRatio: number;
    calmarRatio: number;
    beta: number;
    alpha: number;

    // Diversification
    diversificationIndex: number;  // 0-100

    // AI Scores
    aiConfidence: number;
    fundamentalAIScore: number;  // 0-100
    geopoliticalRiskIndex: number;  // 0-100 (GRI)

    // Macro Context
    fedRate: number;
    inflation: number;
    fedRateImpact: string;
    inflationImpact: string;
}

export interface Position {
    symbol: string;
    name: string;
    type: "crypto" | "stock" | "etf" | "forex";
    quantity: number;
    entryPrice: number;
    currentPrice: number;
    pl: number;
    plPercent: number;
    weight: number;
}

export interface PerformanceDataPoint {
    date: string;
    month: string;
    portfolio: number;
    benchmark: number;
    drawdown: number;
}

export interface SectorAllocation {
    name: string;
    value: number;
    color: string;
}

export interface RiskMetric {
    id: string;
    title: string;
    value: string;
    status: "critical" | "warning" | "caution" | "good";
    details: {
        what: string;
        why: string;
        portfolio: string;
    };
}

// Stress Test Scenario
export interface StressScenario {
    id: string;
    name: string;
    description: string;
    impact: number;  // % impact on portfolio
    probability: "low" | "medium" | "high";
}

// What-If Scenario
export interface WhatIfScenario {
    id: string;
    name: string;
    parameters: {
        marketChange: number;
        sectorShift: string;
        volatilityChange: number;
    };
    projectedImpact: number;
}

// ======================
// MOCK DATA
// ======================

export const mockPortfolioMetrics: PortfolioMetrics = {
    // Core Values
    totalValue: 487250.32,
    todaysPL: 3421.15,
    todaysPLPercent: 0.70,
    openPositions: 12,
    winRate: 68.5,
    winRateChange: 2.3,

    // Returns
    ytdReturn: 24.5,
    annualizedReturn: 18.7,
    cumulativeReturn: 59.2,
    spComparison: 6.8,  // Outperforming S&P by 6.8%

    // Risk Metrics
    var95: 18200,
    var99: 28500,
    maxDrawdown: 8.2,
    volatility: 24.5,

    // Ratios
    sharpeRatio: 1.82,
    sortinoRatio: 2.15,
    calmarRatio: 2.28,
    beta: 1.2,
    alpha: 4.5,

    // Diversification
    diversificationIndex: 72,

    // AI Scores
    aiConfidence: 87,
    fundamentalAIScore: 78,
    geopoliticalRiskIndex: 42,

    // Macro Context
    fedRate: 5.25,
    inflation: 3.2,
    fedRateImpact: "Yüksək faiz dərəcəsi texnologiya səhmlərini əzir. Portfeldə -2.3% təsir gözlənilir.",
    inflationImpact: "İnflyasiya normadan yüksəkdir. Əmtəə aktivləri və TIPS təklif olunur.",
};

// Stress Test Scenarios
export const mockStressScenarios: StressScenario[] = [
    {
        id: "market-crash",
        name: "Market Crash (-20%)",
        description: "S&P 500-in 20% düşməsi",
        impact: -16.5,
        probability: "low",
    },
    {
        id: "fed-hike",
        name: "Fed +50bp Rate Hike",
        description: "Gözlənilməz faiz artımı",
        impact: -6.2,
        probability: "medium",
    },
    {
        id: "crypto-crash",
        name: "Crypto -40% Crash",
        description: "Bitcoin və altcoin çöküşü",
        impact: -8.8,
        probability: "medium",
    },
    {
        id: "geopolitical",
        name: "Geopolitik Böhran",
        description: "Regional münaqişə eskalasiyası",
        impact: -12.3,
        probability: "low",
    },
];

// Geopolitical Risk Factors
export const mockGeopoliticalFactors = [
    { region: "Orta Şərq", risk: 65, trend: "up" },
    { region: "Şərqi Avropa", risk: 72, trend: "stable" },
    { region: "Şərqi Asiya", risk: 48, trend: "down" },
    { region: "ABŞ-Çin", risk: 58, trend: "up" },
];

export const mockPositions: Position[] = [
    {
        symbol: "BTC/USD",
        name: "Bitcoin",
        type: "crypto",
        quantity: 0.5,
        entryPrice: 41200,
        currentPrice: 42150,
        pl: 475.00,
        plPercent: 2.31,
        weight: 16.5,
    },
    {
        symbol: "ETH/USD",
        name: "Ethereum",
        type: "crypto",
        quantity: 5.2,
        entryPrice: 2180,
        currentPrice: 2245,
        pl: 338.00,
        plPercent: 2.98,
        weight: 9.2,
    },
    {
        symbol: "AAPL",
        name: "Apple Inc.",
        type: "stock",
        quantity: 50,
        entryPrice: 178.50,
        currentPrice: 182.34,
        pl: 192.00,
        plPercent: 2.15,
        weight: 7.2,
    },
    {
        symbol: "MSFT",
        name: "Microsoft Corporation",
        type: "stock",
        quantity: 30,
        entryPrice: 365.20,
        currentPrice: 378.45,
        pl: 397.50,
        plPercent: 3.63,
        weight: 8.9,
    },
    {
        symbol: "TSLA",
        name: "Tesla, Inc.",
        type: "stock",
        quantity: 25,
        entryPrice: 242.80,
        currentPrice: 238.65,
        pl: -103.75,
        plPercent: -1.71,
        weight: 4.7,
    },
    {
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        type: "stock",
        quantity: 20,
        entryPrice: 138.90,
        currentPrice: 141.25,
        pl: 47.00,
        plPercent: 1.69,
        weight: 2.2,
    },
    {
        symbol: "NVDA",
        name: "NVIDIA Corporation",
        type: "stock",
        quantity: 15,
        entryPrice: 485.50,
        currentPrice: 498.20,
        pl: 190.50,
        plPercent: 2.62,
        weight: 5.9,
    },
    {
        symbol: "SOL/USD",
        name: "Solana",
        type: "crypto",
        quantity: 45,
        entryPrice: 98.50,
        currentPrice: 105.80,
        pl: 328.50,
        plPercent: 7.41,
        weight: 3.7,
    },
    {
        symbol: "SPY",
        name: "S&P 500 ETF",
        type: "etf",
        quantity: 40,
        entryPrice: 445.20,
        currentPrice: 452.80,
        pl: 304.00,
        plPercent: 1.71,
        weight: 14.2,
    },
    {
        symbol: "QQQ",
        name: "Nasdaq 100 ETF",
        type: "etf",
        quantity: 35,
        entryPrice: 385.60,
        currentPrice: 392.15,
        pl: 229.25,
        plPercent: 1.70,
        weight: 10.8,
    },
    {
        symbol: "EUR/USD",
        name: "Euro/US Dollar",
        type: "forex",
        quantity: 10000,
        entryPrice: 1.0850,
        currentPrice: 1.0892,
        pl: 42.00,
        plPercent: 0.39,
        weight: 8.5,
    },
    {
        symbol: "GBP/USD",
        name: "British Pound/USD",
        type: "forex",
        quantity: 8000,
        entryPrice: 1.2650,
        currentPrice: 1.2712,
        pl: 49.60,
        plPercent: 0.49,
        weight: 8.0,
    },
];

// Static performance data for the last 2 years (pre-generated to avoid hydration errors)
export const mockPerformanceData: PerformanceDataPoint[] = [
    { date: "2022-11-01", month: "Nov '22", portfolio: 80000, benchmark: 80000, drawdown: 0 },
    { date: "2022-11-08", month: "Nov '22", portfolio: 80950, benchmark: 80320, drawdown: 0 },
    { date: "2022-11-15", month: "Nov '22", portfolio: 81420, benchmark: 80580, drawdown: 0 },
    { date: "2022-11-22", month: "Nov '22", portfolio: 80890, benchmark: 80210, drawdown: -0.65 },
    { date: "2022-11-29", month: "Nov '22", portfolio: 81680, benchmark: 80750, drawdown: 0 },
    { date: "2022-12-06", month: "Dec '22", portfolio: 82150, benchmark: 81020, drawdown: 0 },
    { date: "2022-12-13", month: "Dec '22", portfolio: 81520, benchmark: 80680, drawdown: -0.77 },
    { date: "2022-12-20", month: "Dec '22", portfolio: 82890, benchmark: 81250, drawdown: 0 },
    { date: "2022-12-27", month: "Dec '22", portfolio: 83420, benchmark: 81580, drawdown: 0 },
    { date: "2023-01-03", month: "Jan '23", portfolio: 84150, benchmark: 82100, drawdown: 0 },
    { date: "2023-01-10", month: "Jan '23", portfolio: 84890, benchmark: 82450, drawdown: 0 },
    { date: "2023-01-17", month: "Jan '23", portfolio: 85620, benchmark: 82890, drawdown: 0 },
    { date: "2023-01-24", month: "Jan '23", portfolio: 85120, benchmark: 82520, drawdown: -0.58 },
    { date: "2023-01-31", month: "Jan '23", portfolio: 86250, benchmark: 83150, drawdown: 0 },
    { date: "2023-02-07", month: "Feb '23", portfolio: 85680, benchmark: 82780, drawdown: -0.66 },
    { date: "2023-02-14", month: "Feb '23", portfolio: 86520, benchmark: 83250, drawdown: 0 },
    { date: "2023-02-21", month: "Feb '23", portfolio: 87150, benchmark: 83680, drawdown: 0 },
    { date: "2023-02-28", month: "Feb '23", portfolio: 86420, benchmark: 83120, drawdown: -0.84 },
    { date: "2023-03-07", month: "Mar '23", portfolio: 87580, benchmark: 83750, drawdown: 0 },
    { date: "2023-03-14", month: "Mar '23", portfolio: 88250, benchmark: 84120, drawdown: 0 },
    { date: "2023-03-21", month: "Mar '23", portfolio: 87620, benchmark: 83680, drawdown: -0.71 },
    { date: "2023-03-28", month: "Mar '23", portfolio: 88920, benchmark: 84350, drawdown: 0 },
    { date: "2023-04-04", month: "Apr '23", portfolio: 89580, benchmark: 84720, drawdown: 0 },
    { date: "2023-04-11", month: "Apr '23", portfolio: 90250, benchmark: 85150, drawdown: 0 },
    { date: "2023-04-18", month: "Apr '23", portfolio: 89520, benchmark: 84680, drawdown: -0.81 },
    { date: "2023-04-25", month: "Apr '23", portfolio: 90850, benchmark: 85320, drawdown: 0 },
    { date: "2023-05-02", month: "May '23", portfolio: 91520, benchmark: 85780, drawdown: 0 },
    { date: "2023-05-09", month: "May '23", portfolio: 90780, benchmark: 85250, drawdown: -0.81 },
    { date: "2023-05-16", month: "May '23", portfolio: 92150, benchmark: 86020, drawdown: 0 },
    { date: "2023-05-23", month: "May '23", portfolio: 92850, benchmark: 86450, drawdown: 0 },
    { date: "2023-05-30", month: "May '23", portfolio: 93580, benchmark: 86920, drawdown: 0 },
    { date: "2023-06-06", month: "Jun '23", portfolio: 92780, benchmark: 86350, drawdown: -0.85 },
    { date: "2023-06-13", month: "Jun '23", portfolio: 94250, benchmark: 87120, drawdown: 0 },
    { date: "2023-06-20", month: "Jun '23", portfolio: 94920, benchmark: 87580, drawdown: 0 },
    { date: "2023-06-27", month: "Jun '23", portfolio: 94150, benchmark: 86920, drawdown: -0.81 },
    { date: "2023-07-04", month: "Jul '23", portfolio: 95580, benchmark: 87650, drawdown: 0 },
    { date: "2023-07-11", month: "Jul '23", portfolio: 96250, benchmark: 88120, drawdown: 0 },
    { date: "2023-07-18", month: "Jul '23", portfolio: 95420, benchmark: 87520, drawdown: -0.86 },
    { date: "2023-07-25", month: "Jul '23", portfolio: 96850, benchmark: 88350, drawdown: 0 },
    { date: "2023-08-01", month: "Aug '23", portfolio: 97520, benchmark: 88780, drawdown: 0 },
    { date: "2023-08-08", month: "Aug '23", portfolio: 96680, benchmark: 88150, drawdown: -0.86 },
    { date: "2023-08-15", month: "Aug '23", portfolio: 98150, benchmark: 89020, drawdown: 0 },
    { date: "2023-08-22", month: "Aug '23", portfolio: 98850, benchmark: 89450, drawdown: 0 },
    { date: "2023-08-29", month: "Aug '23", portfolio: 97920, benchmark: 88780, drawdown: -0.94 },
    { date: "2023-09-05", month: "Sep '23", portfolio: 99350, benchmark: 89620, drawdown: 0 },
    { date: "2023-09-12", month: "Sep '23", portfolio: 100050, benchmark: 90120, drawdown: 0 },
    { date: "2023-09-19", month: "Sep '23", portfolio: 99120, benchmark: 89450, drawdown: -0.93 },
    { date: "2023-09-26", month: "Sep '23", portfolio: 100580, benchmark: 90350, drawdown: 0 },
    { date: "2023-10-03", month: "Oct '23", portfolio: 101280, benchmark: 90820, drawdown: 0 },
    { date: "2023-10-10", month: "Oct '23", portfolio: 100320, benchmark: 90120, drawdown: -0.95 },
    { date: "2023-10-17", month: "Oct '23", portfolio: 101850, benchmark: 91050, drawdown: 0 },
    { date: "2023-10-24", month: "Oct '23", portfolio: 102580, benchmark: 91520, drawdown: 0 },
    { date: "2023-10-31", month: "Oct '23", portfolio: 101520, benchmark: 90780, drawdown: -1.03 },
    { date: "2023-11-07", month: "Nov '23", portfolio: 103150, benchmark: 91780, drawdown: 0 },
    { date: "2023-11-14", month: "Nov '23", portfolio: 103920, benchmark: 92250, drawdown: 0 },
    { date: "2023-11-21", month: "Nov '23", portfolio: 102850, benchmark: 91520, drawdown: -1.03 },
    { date: "2023-11-28", month: "Nov '23", portfolio: 104520, benchmark: 92580, drawdown: 0 },
    { date: "2023-12-05", month: "Dec '23", portfolio: 105280, benchmark: 93120, drawdown: 0 },
    { date: "2023-12-12", month: "Dec '23", portfolio: 104150, benchmark: 92350, drawdown: -1.07 },
    { date: "2023-12-19", month: "Dec '23", portfolio: 105850, benchmark: 93420, drawdown: 0 },
    { date: "2023-12-26", month: "Dec '23", portfolio: 106620, benchmark: 93920, drawdown: 0 },
    { date: "2024-01-02", month: "Jan '24", portfolio: 105420, benchmark: 93120, drawdown: -1.13 },
    { date: "2024-01-09", month: "Jan '24", portfolio: 107150, benchmark: 94250, drawdown: 0 },
    { date: "2024-01-16", month: "Jan '24", portfolio: 107920, benchmark: 94720, drawdown: 0 },
    { date: "2024-01-23", month: "Jan '24", portfolio: 106680, benchmark: 93850, drawdown: -1.15 },
    { date: "2024-01-30", month: "Jan '24", portfolio: 108450, benchmark: 95020, drawdown: 0 },
    { date: "2024-02-06", month: "Feb '24", portfolio: 109250, benchmark: 95520, drawdown: 0 },
    { date: "2024-02-13", month: "Feb '24", portfolio: 107920, benchmark: 94620, drawdown: -1.22 },
    { date: "2024-02-20", month: "Feb '24", portfolio: 109780, benchmark: 95850, drawdown: 0 },
    { date: "2024-02-27", month: "Feb '24", portfolio: 110580, benchmark: 96350, drawdown: 0 },
    { date: "2024-03-05", month: "Mar '24", portfolio: 109150, benchmark: 95420, drawdown: -1.29 },
    { date: "2024-03-12", month: "Mar '24", portfolio: 111050, benchmark: 96720, drawdown: 0 },
    { date: "2024-03-19", month: "Mar '24", portfolio: 111880, benchmark: 97250, drawdown: 0 },
    { date: "2024-03-26", month: "Mar '24", portfolio: 110420, benchmark: 96280, drawdown: -1.31 },
    { date: "2024-04-02", month: "Apr '24", portfolio: 112350, benchmark: 97620, drawdown: 0 },
    { date: "2024-04-09", month: "Apr '24", portfolio: 113180, benchmark: 98150, drawdown: 0 },
    { date: "2024-04-16", month: "Apr '24", portfolio: 111680, benchmark: 97150, drawdown: -1.33 },
    { date: "2024-04-23", month: "Apr '24", portfolio: 113720, benchmark: 98520, drawdown: 0 },
    { date: "2024-04-30", month: "Apr '24", portfolio: 114580, benchmark: 99080, drawdown: 0 },
    { date: "2024-05-07", month: "May '24", portfolio: 112950, benchmark: 98050, drawdown: -1.42 },
    { date: "2024-05-14", month: "May '24", portfolio: 115020, benchmark: 99450, drawdown: 0 },
    { date: "2024-05-21", month: "May '24", portfolio: 115920, benchmark: 100020, drawdown: 0 },
    { date: "2024-05-28", month: "May '24", portfolio: 114220, benchmark: 98950, drawdown: -1.47 },
    { date: "2024-06-04", month: "Jun '24", portfolio: 116380, benchmark: 100420, drawdown: 0 },
    { date: "2024-06-11", month: "Jun '24", portfolio: 117280, benchmark: 101020, drawdown: 0 },
    { date: "2024-06-18", month: "Jun '24", portfolio: 115520, benchmark: 99920, drawdown: -1.50 },
    { date: "2024-06-25", month: "Jun '24", portfolio: 117780, benchmark: 101450, drawdown: 0 },
    { date: "2024-07-02", month: "Jul '24", portfolio: 118720, benchmark: 102050, drawdown: 0 },
    { date: "2024-07-09", month: "Jul '24", portfolio: 116850, benchmark: 100920, drawdown: -1.58 },
    { date: "2024-07-16", month: "Jul '24", portfolio: 119220, benchmark: 102520, drawdown: 0 },
    { date: "2024-07-23", month: "Jul '24", portfolio: 120180, benchmark: 103150, drawdown: 0 },
    { date: "2024-07-30", month: "Jul '24", portfolio: 118220, benchmark: 101980, drawdown: -1.63 },
    { date: "2024-08-06", month: "Aug '24", portfolio: 120720, benchmark: 103620, drawdown: 0 },
    { date: "2024-08-13", month: "Aug '24", portfolio: 121720, benchmark: 104280, drawdown: 0 },
    { date: "2024-08-20", month: "Aug '24", portfolio: 119650, benchmark: 103080, drawdown: -1.70 },
    { date: "2024-08-27", month: "Aug '24", portfolio: 122280, benchmark: 104780, drawdown: 0 },
    { date: "2024-09-03", month: "Sep '24", portfolio: 123320, benchmark: 105450, drawdown: 0 },
    { date: "2024-09-10", month: "Sep '24", portfolio: 121150, benchmark: 104220, drawdown: -1.76 },
    { date: "2024-09-17", month: "Sep '24", portfolio: 123920, benchmark: 105920, drawdown: 0 },
    { date: "2024-09-24", month: "Sep '24", portfolio: 125020, benchmark: 106620, drawdown: 0 },
    { date: "2024-10-01", month: "Oct '24", portfolio: 122720, benchmark: 105350, drawdown: -1.84 },
    { date: "2024-10-08", month: "Oct '24", portfolio: 125580, benchmark: 107120, drawdown: 0 },
    { date: "2024-10-15", month: "Oct '24", portfolio: 126720, benchmark: 107850, drawdown: 0 },
    { date: "2024-10-22", month: "Oct '24", portfolio: 124320, benchmark: 106550, drawdown: -1.89 },
    { date: "2024-10-29", month: "Oct '24", portfolio: 127280, benchmark: 108350, drawdown: 0 },
];

export const mockSectorAllocation: SectorAllocation[] = [
    { name: "Technology", value: 35, color: "#8b5cf6" },
    { name: "Crypto", value: 30, color: "#06b6d4" },
    { name: "ETFs", value: 25, color: "#10b981" },
    { name: "Forex", value: 10, color: "#6b7280" },
];

export const mockRiskMetrics: RiskMetric[] = [
    {
        id: "var",
        title: "VaR 95%",
        value: "$18.2K",
        status: "warning",
        details: {
            what: "Value at Risk – Maximum expected daily loss (95% confidence)",
            why: "Essential for liquidity planning and risk budgeting",
            portfolio: "VaR = 12% of portfolio. Conservative norm: 3-5%"
        }
    },
    {
        id: "mdd",
        title: "Max DD",
        value: "32.1%",
        status: "critical",
        details: {
            what: "Maximum Drawdown – Peak to trough loss",
            why: "MDD > 30% creates serious concern. Need 47% gain to recover",
            portfolio: "Last 18mo MDD: 32.1% — 2x worse than S&P 500 (17%)"
        }
    },
    {
        id: "sharpe",
        title: "Sharpe",
        value: "1.82",
        status: "good",
        details: {
            what: "Risk-adjusted return – Return per unit of risk",
            why: "1.5+ excellent, 1.0+ good, <1.0 poor",
            portfolio: "1.82 — 92% above S&P 500 average (0.95)"
        }
    },
    {
        id: "beta",
        title: "Beta",
        value: "1.2",
        status: "caution",
        details: {
            what: "Portfolio sensitivity to market movements",
            why: "Beta > 1 means higher volatility than market",
            portfolio: "1.2 beta = 20% more volatile than S&P 500"
        }
    },
    {
        id: "winrate",
        title: "Win Rate",
        value: "68.5%",
        status: "good",
        details: {
            what: "Percentage of profitable trades",
            why: "Higher win rate indicates better trade selection",
            portfolio: "68.5% win rate is above average for active traders"
        }
    },
    {
        id: "volatility",
        title: "Volatility",
        value: "24.5%",
        status: "warning",
        details: {
            what: "Annual volatility (standard deviation)",
            why: "Higher volatility = wider price swings",
            portfolio: "24.5% vs S&P 500 at 18%. 36% more volatile"
        }
    },
];

// Monte Carlo simulation data
export const generateMonteCarloData = () => {
    const data = [];
    const startValue = 127450;

    for (let month = 0; month <= 12; month++) {
        const p5 = startValue * (1 + (-0.15 + month * 0.005));
        const p25 = startValue * (1 + (-0.05 + month * 0.01));
        const p50 = startValue * (1 + (0.02 + month * 0.015));
        const p75 = startValue * (1 + (0.08 + month * 0.02));
        const p95 = startValue * (1 + (0.15 + month * 0.025));

        data.push({
            month,
            p5: Math.round(p5),
            p25: Math.round(p25),
            p50: Math.round(p50),
            p75: Math.round(p75),
            p95: Math.round(p95),
        });
    }

    return data;
};

export const mockMonteCarloData = generateMonteCarloData();

// Helper function to format currency
export const formatCurrency = (value: number, currency = "USD"): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};

// Helper function to format percentage
export const formatPercent = (value: number): string => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
};

// Helper function to get position type badge color
export const getPositionTypeColor = (type: Position["type"]): string => {
    switch (type) {
        case "crypto": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
        case "stock": return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
        case "etf": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
        case "forex": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
        default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
};
