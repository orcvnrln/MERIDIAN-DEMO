// Portfolio News & Alerts Mock Data

export interface NewsItem {
    id: string;
    severity: 'critical' | 'warning' | 'info';
    icon: string;
    title: string;
    asset: string;
    timestamp: string;
    impact: {
        metric: 'CVaR' | 'P&L' | 'Volatility';
        before: string;
        after: string;
        change: string;
    };
    description: string;
    sentiment?: {
        label: string;
        value: string;
        color: string;
    }[];
    aiInsight: string;
    actions: {
        label: string;
        type: 'primary' | 'secondary' | 'tertiary';
    }[];
}

export interface Alert {
    id: string;
    severity: 'critical' | 'warning' | 'info';
    icon: string;
    title: string;
    metric: string;
    change: string;
    action: {
        label: string;
    };
}

export const mockNewsItems: NewsItem[] = [
    {
        id: 'news-1',
        severity: 'critical',
        icon: '🔴',
        title: 'AAPL Earnings Tomorrow',
        asset: 'AAPL',
        timestamp: '2 hours ago',
        impact: {
            metric: 'CVaR',
            before: '14.3%',
            after: '15.1%',
            change: '-0.8%',
        },
        description: 'Apple reports Q4 earnings after market close. High volatility expected. Your 50 shares currently valued at $9,117.',
        sentiment: [
            { label: 'Bullish', value: '78%', color: 'emerald' },
            { label: 'Neutral', value: '15%', color: 'gray' },
            { label: 'Bearish', value: '7%', color: 'red' },
        ],
        aiInsight: 'Consider protective puts or take partial profit before earnings. CVaR expected to spike 2.1% if miss, drop 0.8% if beat. Options market pricing in ±5% move.',
        actions: [
            { label: 'Add Call Options', type: 'primary' },
            { label: 'View Details', type: 'secondary' },
            { label: 'Set Alert', type: 'tertiary' },
        ],
    },
    {
        id: 'news-2',
        severity: 'warning',
        icon: '⚠️',
        title: 'BTC Volatility Spike +68%',
        asset: 'BTC',
        timestamp: '4 hours ago',
        impact: {
            metric: 'Volatility',
            before: '42%',
            after: '68%',
            change: '+26%',
        },
        description: 'Safe-haven flows detected amid geopolitical tensions. Gold demand increased 12%. Bitcoin showing increased correlation with risk assets.',
        sentiment: [
            { label: 'Fear Index', value: '72', color: 'red' },
            { label: 'Institutional Flow', value: 'Selling', color: 'red' },
        ],
        aiInsight: 'Recommendation: Reduce BTC allocation from 10% to 6% of portfolio. Consider adding gold hedge (2-3% allocation) to offset crypto volatility. Safe-haven rotation in progress.',
        actions: [
            { label: 'Reduce Now', type: 'primary' },
            { label: 'Add Gold Hedge', type: 'secondary' },
            { label: 'View Analysis', type: 'tertiary' },
        ],
    },
    {
        id: 'news-3',
        severity: 'info',
        icon: '📊',
        title: 'Fed Meeting Tomorrow',
        asset: 'MACRO',
        timestamp: '6 hours ago',
        impact: {
            metric: 'P&L',
            before: '$3,421',
            after: '$3,200',
            change: 'Neutral',
        },
        description: 'Rate hold expected with 85% probability. Powell press conference at 2:30 PM EST. Tech sector likely to remain stable.',
        sentiment: [
            { label: 'Rate Hold', value: '85%', color: 'emerald' },
            { label: 'Rate Cut', value: '10%', color: 'gray' },
            { label: 'Rate Hike', value: '5%', color: 'red' },
        ],
        aiInsight: 'Your MSFT and AAPL positions likely to remain stable. Watch for hawkish/dovish language in statement. No immediate action required unless unexpected rate change occurs.',
        actions: [
            { label: 'Read Full Analysis', type: 'secondary' },
            { label: 'Set Alert', type: 'tertiary' },
        ],
    },
];

export const mockAlerts: Alert[] = [
    {
        id: 'alert-1',
        severity: 'critical',
        icon: '🔴',
        title: 'Geopolitical Shock',
        metric: 'CVaR: 14.3% → 18.3%',
        change: '-19.6%',
        action: {
            label: 'Reduce BTC 4%',
        },
    },
    {
        id: 'alert-2',
        severity: 'warning',
        icon: '⚠️',
        title: 'CVaR Spike Alert',
        metric: 'Risk ↑28%',
        change: '+28%',
        action: {
            label: 'View Details',
        },
    },
    {
        id: 'alert-3',
        severity: 'info',
        icon: '📊',
        title: 'AAPL Earnings',
        metric: 'Options bullish',
        change: '+5%',
        action: {
            label: 'Add Position',
        },
    },
];
