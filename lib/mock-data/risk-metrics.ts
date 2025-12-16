// Risk Metrics Mock Data for Institutional Portfolio Risk Management

export interface RiskMetrics {
    volatility: number; // Annualized volatility (%)
    maxDrawdown: number; // Maximum drawdown (%)
    var95: number; // Value at Risk 95% ($)
    cvar95: number; // Conditional Value at Risk 95% ($)
    beta: number; // Portfolio beta
    downsideDeviation: number; // Downside deviation (%)
    sharpeRatio: number;
    sortinoRatio: number;
}

export interface PortfolioSummary {
    totalEquity: number;
    cashBuffer: number; // Percentage
    dailyPL: number;
    dailyPLPercent: number;
    weeklyPL: number;
    weeklyPLPercent: number;
    riskStatus: 'low' | 'normal' | 'high' | 'crisis';
    marketRegime: 'risk_on' | 'risk_off';
}

export interface AssetAllocation {
    assetClass: {
        equities: number;
        fx: number;
        commodities: number;
        crypto: number;
    };
    instruments: {
        symbol: string;
        allocation: number; // Percentage
        value: number;
    }[];
    netExposure: number; // Percentage
    grossExposure: number; // Percentage
    leverage: number;
}

export interface RiskContribution {
    symbol: string;
    cvarContribution: number; // Percentage contribution to portfolio CVaR
    volatilityContribution: number;
    riskBudgetUsage: number;
}

export interface RegimeDetection {
    regime: 'trend' | 'range' | 'volatility_spike' | 'crisis';
    sentiment: 'risk_on' | 'risk_off';
    confidence: number; // 0-100
    riskMultiplier: number; // 0.6 - 1.5
    strategyStatus: 'on' | 'off';
    description: string;
}

export interface StressScenario {
    name: string;
    portfolioImpact: number; // Dollar impact
    cvarImpact: number; // New CVaR %
    drawdownImpact: number; // Expected drawdown %
    probability: number; // 0-100
}

export interface MonteCarloResult {
    percentile5: number;
    percentile50: number;
    percentile95: number;
    expectedReturn: number;
    distribution: { value: number; frequency: number }[];
}

// Mock Data
export const mockRiskMetrics: RiskMetrics = {
    volatility: 18.4,
    maxDrawdown: -8.2,
    var95: 12450,
    cvar95: 18720,
    beta: 1.24,
    downsideDeviation: 14.2,
    sharpeRatio: 1.45,
    sortinoRatio: 1.82,
};

export const mockPortfolioSummary: PortfolioSummary = {
    totalEquity: 487250,
    cashBuffer: 15.0,
    dailyPL: 3420.50,
    dailyPLPercent: 0.70,
    weeklyPL: 8750.25,
    weeklyPLPercent: 1.83,
    riskStatus: 'normal',
    marketRegime: 'risk_off',
};

export const mockAssetAllocation: AssetAllocation = {
    assetClass: {
        equities: 45,
        fx: 25,
        commodities: 20,
        crypto: 10,
    },
    instruments: [
        { symbol: 'AAPL', allocation: 18, value: 87705 },
        { symbol: 'TSLA', allocation: 12, value: 58470 },
        { symbol: 'MSFT', allocation: 15, value: 73087.50 },
        { symbol: 'EUR/USD', allocation: 15, value: 73087.50 },
        { symbol: 'GBP/USD', allocation: 10, value: 48725 },
        { symbol: 'Gold', allocation: 20, value: 97450 },
        { symbol: 'BTC', allocation: 10, value: 48725 },
    ],
    netExposure: 78,
    grossExposure: 112,
    leverage: 1.12,
};

export const mockRiskContributions: RiskContribution[] = [
    { symbol: 'BTC', cvarContribution: 5.4, volatilityContribution: 6.2, riskBudgetUsage: 43 },
    { symbol: 'TSLA', cvarContribution: 4.1, volatilityContribution: 4.8, riskBudgetUsage: 33 },
    { symbol: 'AAPL', cvarContribution: 3.2, volatilityContribution: 3.5, riskBudgetUsage: 26 },
    { symbol: 'EUR/USD', cvarContribution: 2.3, volatilityContribution: 2.1, riskBudgetUsage: 19 },
    { symbol: 'MSFT', cvarContribution: 2.8, volatilityContribution: 3.0, riskBudgetUsage: 23 },
    { symbol: 'GBP/USD', cvarContribution: 1.5, volatilityContribution: 1.4, riskBudgetUsage: 12 },
    { symbol: 'Gold', cvarContribution: -1.8, volatilityContribution: -2.1, riskBudgetUsage: -15 },
];

export const mockRegimeDetection: RegimeDetection = {
    regime: 'volatility_spike',
    sentiment: 'risk_off',
    confidence: 87,
    riskMultiplier: 1.3,
    strategyStatus: 'on',
    description: 'Market experiencing elevated volatility. Defensive positioning recommended.',
};

export const mockStressScenarios: StressScenario[] = [
    {
        name: 'Interest Rates +2%',
        portfolioImpact: -24500,
        cvarImpact: 15.2,
        drawdownImpact: -12.4,
        probability: 35,
    },
    {
        name: 'USD Strength +10%',
        portfolioImpact: -18200,
        cvarImpact: 13.8,
        drawdownImpact: -9.8,
        probability: 28,
    },
    {
        name: 'Recession Scenario',
        portfolioImpact: -67400,
        cvarImpact: 24.1,
        drawdownImpact: -28.2,
        probability: 15,
    },
    {
        name: '2008 Financial Crisis',
        portfolioImpact: -206000,
        cvarImpact: 38.5,
        drawdownImpact: -42.3,
        probability: 5,
    },
    {
        name: '2020 COVID Crash',
        portfolioImpact: -155000,
        cvarImpact: 32.1,
        drawdownImpact: -31.8,
        probability: 8,
    },
];

export const mockMonteCarloResult: MonteCarloResult = {
    percentile5: -45000,
    percentile50: 12000,
    percentile95: 78000,
    expectedReturn: 8.4,
    distribution: [
        { value: -60000, frequency: 2 },
        { value: -50000, frequency: 5 },
        { value: -40000, frequency: 12 },
        { value: -30000, frequency: 28 },
        { value: -20000, frequency: 58 },
        { value: -10000, frequency: 120 },
        { value: 0, frequency: 180 },
        { value: 10000, frequency: 220 },
        { value: 20000, frequency: 180 },
        { value: 30000, frequency: 120 },
        { value: 40000, frequency: 75 },
        { value: 50000, frequency: 45 },
        { value: 60000, frequency: 28 },
        { value: 70000, frequency: 15 },
        { value: 80000, frequency: 8 },
        { value: 90000, frequency: 4 },
    ],
};

// Correlation Matrix (5x5 for main assets)
export const mockCorrelationMatrix = {
    assets: ['AAPL', 'TSLA', 'Gold', 'EUR/USD', 'BTC'],
    matrix: [
        [1.0, 0.78, -0.21, 0.12, 0.34],
        [0.78, 1.0, -0.15, 0.18, 0.52],
        [-0.21, -0.15, 1.0, -0.42, -0.28],
        [0.12, 0.18, -0.42, 1.0, 0.23],
        [0.34, 0.52, -0.28, 0.23, 1.0],
    ],
};

// Rolling risk trends (last 90 days)
export const mockRollingRiskTrends = {
    dates: Array.from({ length: 90 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (89 - i));
        return date.toISOString().split('T')[0];
    }),
    volatility: Array.from({ length: 90 }, () => 12 + Math.random() * 10),
    cvar: Array.from({ length: 90 }, () => 8 + Math.random() * 7),
    drawdown: Array.from({ length: 90 }, () => -Math.random() * 10),
};

// Helper functions
export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export const formatPercent = (value: number, decimals: number = 2): string => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
};

export const getRiskStatusColor = (status: PortfolioSummary['riskStatus']): string => {
    switch (status) {
        case 'low':
            return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
        case 'normal':
            return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
        case 'high':
            return 'text-red-400 bg-red-500/10 border-red-500/20';
        case 'crisis':
            return 'text-red-500 bg-red-500/20 border-red-500/30 animate-pulse';
        default:
            return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
};

export const getRegimeColor = (regime: PortfolioSummary['marketRegime']): string => {
    switch (regime) {
        case 'risk_on':
            return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
        case 'risk_off':
            return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
        default:
            return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
};
