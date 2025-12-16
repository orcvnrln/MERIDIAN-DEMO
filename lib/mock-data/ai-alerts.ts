// AI Alerts and Event Detection Mock Data

export type AlertType = 'geopolitical' | 'macro' | 'earnings' | 'institutional_flow' | 'sentiment_shift' | 'cvar_spike' | 'drawdown' | 'regime_change' | 'liquidity_stress';
export type AlertSeverity = 'low' | 'normal' | 'high' | 'crisis';

export interface AIAlert {
    id: string;
    type: AlertType;
    severity: AlertSeverity;
    title: string;
    subtitle: string;
    description: string;
    analysis: string[];
    recommendation: string;
    impact: {
        currentCVaR: number;
        projectedCVaR: number;
        riskReduction: number; // Percentage
    };
    actions: AlertAction[];
    timestamp: Date;
    isActive: boolean;
}

export interface AlertAction {
    id: string;
    label: string;
    type: 'primary' | 'secondary' | 'danger';
    action: string; // e.g., "add_gold_7_percent"
}

export interface InstitutionalFlow {
    asset: string;
    flow: number; // Dollar amount
    direction: 'inflow' | 'outflow';
    sentiment: 'bullish' | 'neutral' | 'bearish';
    timeframe: '24h' | '7d' | '30d';
    source: 'etf' | 'dark_pool' | 'options' | 'cot';
}

export interface EventDetection {
    id: string;
    eventType: 'war' | 'geopolitical' | 'rate_decision' | 'inflation' | 'earnings' | 'crisis';
    title: string;
    description: string;
    impactedAssets: string[];
    probability: number; // 0-100
    timeframe: string;
    detectedAt: Date;
}

// Mock Active Alerts
export const mockActiveAlerts: AIAlert[] = [
    {
        id: 'alert_001',
        type: 'geopolitical',
        severity: 'high',
        title: 'GEOPOLITICAL SHOCK DETECTED',
        subtitle: 'Middle East conflict escalated - Safe haven flows accelerating',
        description: 'Escalation in Middle East tensions has triggered significant capital flows into safe-haven assets. Gold and USD showing strong institutional demand.',
        analysis: [
            'Portfolio CVaR increased from 11.2% to 14.3% in last 24 hours',
            'Institutional flows: $2.4B into gold ETFs (GLD, IAU)',
            'Your current gold exposure: 8% (below optimal for current regime)',
            'Correlation between equities and gold at -0.42 (strong hedge)',
        ],
        recommendation: 'Increase XAU (Gold) allocation from 8% to 15%',
        impact: {
            currentCVaR: 14.3,
            projectedCVaR: 11.8,
            riskReduction: 17.5,
        },
        actions: [
            {
                id: 'action_001',
                label: 'Execute: +7% Gold',
                type: 'primary',
                action: 'add_gold_7_percent',
            },
            {
                id: 'action_002',
                label: 'View Details',
                type: 'secondary',
                action: 'view_details',
            },
            {
                id: 'action_003',
                label: 'Dismiss',
                type: 'secondary',
                action: 'dismiss',
            },
        ],
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        isActive: true,
    },
    {
        id: 'alert_002',
        type: 'cvar_spike',
        severity: 'normal',
        title: 'CVaR Spike Alert',
        subtitle: 'Portfolio risk increased above threshold',
        description: 'Portfolio CVaR has increased by 28% in the last 48 hours, primarily driven by Bitcoin volatility.',
        analysis: [
            'CVaR 95%: 11.2% → 14.3% (+27.7%)',
            'Primary contributor: BTC (+5.4% CVaR contribution)',
            'Bitcoin volatility: 45% → 68% (30-day rolling)',
            'Recommended action: Reduce BTC exposure or add hedge',
        ],
        recommendation: 'Reduce BTC allocation from 10% to 6% OR add protective put options',
        impact: {
            currentCVaR: 14.3,
            projectedCVaR: 12.1,
            riskReduction: 15.4,
        },
        actions: [
            {
                id: 'action_004',
                label: 'Reduce BTC -4%',
                type: 'primary',
                action: 'reduce_btc_4_percent',
            },
            {
                id: 'action_005',
                label: 'Add Hedge',
                type: 'secondary',
                action: 'add_btc_hedge',
            },
            {
                id: 'action_006',
                label: 'Dismiss',
                type: 'secondary',
                action: 'dismiss',
            },
        ],
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        isActive: true,
    },
    {
        id: 'alert_003',
        type: 'earnings',
        severity: 'normal',
        title: 'Apple Earnings Tomorrow',
        subtitle: 'High volatility expected - Options flow shows defensive positioning',
        description: 'Apple (AAPL) reports earnings tomorrow after market close. Institutional options flow indicates defensive positioning with elevated put buying.',
        analysis: [
            'Your AAPL exposure: 18% of portfolio ($87,705)',
            'Options flow: Put/Call ratio 2.1 (bearish tilt)',
            'Implied volatility: +45% vs 30-day average',
            'Dark pool activity: $420M block trades (neutral)',
        ],
        recommendation: 'Consider reducing AAPL position by 30-50% before earnings OR add protective collar',
        impact: {
            currentCVaR: 14.3,
            projectedCVaR: 13.2,
            riskReduction: 7.7,
        },
        actions: [
            {
                id: 'action_007',
                label: 'Reduce AAPL -5%',
                type: 'primary',
                action: 'reduce_aapl_5_percent',
            },
            {
                id: 'action_008',
                label: 'Add Collar',
                type: 'secondary',
                action: 'add_aapl_collar',
            },
            {
                id: 'action_009',
                label: 'Monitor',
                type: 'secondary',
                action: 'monitor',
            },
        ],
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
        isActive: true,
    },
];

// Mock Institutional Flows
export const mockInstitutionalFlows: InstitutionalFlow[] = [
    {
        asset: 'Gold (GLD, IAU)',
        flow: 2400000000,
        direction: 'inflow',
        sentiment: 'bullish',
        timeframe: '24h',
        source: 'etf',
    },
    {
        asset: 'Tech Equities (QQQ)',
        flow: -1800000000,
        direction: 'outflow',
        sentiment: 'bearish',
        timeframe: '24h',
        source: 'etf',
    },
    {
        asset: 'USD Futures',
        flow: 890000000,
        direction: 'inflow',
        sentiment: 'bullish',
        timeframe: '24h',
        source: 'cot',
    },
    {
        asset: 'Treasury Bonds (TLT)',
        flow: 1200000000,
        direction: 'inflow',
        sentiment: 'bullish',
        timeframe: '24h',
        source: 'etf',
    },
    {
        asset: 'AAPL Dark Pool',
        flow: 420000000,
        direction: 'inflow',
        sentiment: 'neutral',
        timeframe: '24h',
        source: 'dark_pool',
    },
    {
        asset: 'NVDA Dark Pool',
        flow: 680000000,
        direction: 'outflow',
        sentiment: 'bearish',
        timeframe: '24h',
        source: 'dark_pool',
    },
];

// Mock Event Detections
export const mockEventDetections: EventDetection[] = [
    {
        id: 'event_001',
        eventType: 'geopolitical',
        title: 'Middle East Conflict Escalation',
        description: 'Tensions escalating in Middle East region. Oil prices spiking, safe-haven demand increasing.',
        impactedAssets: ['Gold', 'USD', 'Oil', 'Equities'],
        probability: 85,
        timeframe: 'Immediate',
        detectedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
    {
        id: 'event_002',
        eventType: 'rate_decision',
        title: 'Fed Rate Decision Next Week',
        description: 'Federal Reserve meeting scheduled. Market pricing in 25bps cut with 68% probability.',
        impactedAssets: ['USD', 'Bonds', 'Gold', 'Equities'],
        probability: 68,
        timeframe: '7 days',
        detectedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
    {
        id: 'event_003',
        eventType: 'earnings',
        title: 'Big Tech Earnings Week',
        description: 'AAPL, MSFT, GOOGL, AMZN reporting earnings this week. High volatility expected.',
        impactedAssets: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'QQQ'],
        probability: 95,
        timeframe: '3-5 days',
        detectedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    },
];

// Helper functions
export const getAlertSeverityColor = (severity: AlertSeverity): string => {
    switch (severity) {
        case 'low':
            return 'border-blue-500/30 bg-blue-500/5';
        case 'normal':
            return 'border-amber-500/30 bg-amber-500/5';
        case 'high':
            return 'border-orange-500/30 bg-orange-500/5';
        case 'crisis':
            return 'border-red-500/40 bg-red-500/10 animate-pulse';
        default:
            return 'border-gray-500/20 bg-gray-500/5';
    }
};

export const getAlertIcon = (type: AlertType): string => {
    switch (type) {
        case 'geopolitical':
            return '🚨';
        case 'macro':
            return '📊';
        case 'earnings':
            return '📈';
        case 'institutional_flow':
            return '🏦';
        case 'sentiment_shift':
            return '💭';
        case 'cvar_spike':
            return '⚠️';
        case 'drawdown':
            return '📉';
        case 'regime_change':
            return '🔄';
        case 'liquidity_stress':
            return '💧';
        default:
            return '📌';
    }
};

export const formatFlowAmount = (amount: number): string => {
    const absAmount = Math.abs(amount);
    if (absAmount >= 1_000_000_000) {
        return `$${(absAmount / 1_000_000_000).toFixed(1)}B`;
    } else if (absAmount >= 1_000_000) {
        return `$${(absAmount / 1_000_000).toFixed(0)}M`;
    } else {
        return `$${absAmount.toLocaleString()}`;
    }
};

export const getSentimentColor = (sentiment: InstitutionalFlow['sentiment']): string => {
    switch (sentiment) {
        case 'bullish':
            return 'text-emerald-400';
        case 'bearish':
            return 'text-red-400';
        case 'neutral':
            return 'text-gray-400';
        default:
            return 'text-gray-400';
    }
};

export const getSentimentIcon = (sentiment: InstitutionalFlow['sentiment']): string => {
    switch (sentiment) {
        case 'bullish':
            return '↑';
        case 'bearish':
            return '↓';
        case 'neutral':
            return '→';
        default:
            return '→';
    }
};
