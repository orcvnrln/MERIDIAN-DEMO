// Mock data for Institutional Intelligence page

export interface LegendaryInvestor {
    id: string;
    name: string;
    company: string;
    position: {
        shares: number;
        value: number;
        percentOfPortfolio: number;
    };
    quarterlyChange: {
        percent: number;
        shares: number;
        action: 'INCREASED' | 'REDUCED' | 'MAINTAINED' | 'NEW' | 'SOLD_OUT';
    };
    profile: {
        title: string;
        trackRecord: string;
        philosophy: string;
        aum?: string;
    };
    reasoning: {
        whyAction: string[];
        historicalPattern?: string;
        implication: string;
    };
    avatar?: string;
}

export interface FundFlow {
    type: 'Hedge Funds' | 'Mutual Funds' | 'Pension Funds' | 'ETF Rebalancing';
    inflow: number;
    outflow: number;
    net: number;
}

export interface Filing13F {
    investor: string;
    company: string;
    change: number;
    action: 'INCREASED' | 'DECREASED' | 'NEW' | 'SOLD_OUT';
}

export const legendaryInvestors: LegendaryInvestor[] = [
    {
        id: 'buffett',
        name: 'Warren Buffett',
        company: 'Berkshire Hathaway',
        position: {
            shares: 789_000_000,
            value: 156_800_000_000,
            percentOfPortfolio: 29.8,
        },
        quarterlyChange: {
            percent: -13.2,
            shares: -120_000_000,
            action: 'REDUCED',
        },
        profile: {
            title: '"Oracle of Omaha", value investor legend',
            trackRecord: '20% annual returns (1965-2024)',
            philosophy: '"Be fearful when greedy, greedy when fearful"',
        },
        reasoning: {
            whyAction: [
                'Tax strategy (pre-emptive before cap gains tax hike)',
                'Portfolio rebalancing (was 50%, now 30%)',
                'Valuation concerns (P/E 28.5x is high for him)',
                'But still #1 holder! ($156B invested)',
            ],
            historicalPattern:
                'When Buffett trims 10%+, stock underperforms by -8.2% on average over next 6 months (65% accuracy)',
            implication: 'Caution warranted, not panic',
        },
    },
    {
        id: 'dalio',
        name: 'Ray Dalio',
        company: 'Bridgewater Associates',
        position: {
            shares: 2_100_000,
            value: 417_000_000,
            percentOfPortfolio: 0.3,
        },
        quarterlyChange: {
            percent: 8.4,
            shares: 162_000,
            action: 'INCREASED',
        },
        profile: {
            title: 'Macro investing master, All Weather Portfolio',
            trackRecord: 'Predicted 2008 crisis',
            philosophy: 'Diversification and risk parity',
            aum: '$150B AUM, world\'s largest HF',
        },
        reasoning: {
            whyAction: [
                'Fed rate cuts = tech benefits',
                'Dollar weakness = multinationals gain (AAPL)',
                'Global slowdown, but AAPL has pricing power',
            ],
            implication: 'Macro tailwinds positive for AAPL',
        },
    },
    {
        id: 'druckenmiller',
        name: 'Stanley Druckenmiller',
        company: 'Duquesne Family Office',
        position: {
            shares: 1_800_000,
            value: 357_000_000,
            percentOfPortfolio: 2.1,
        },
        quarterlyChange: {
            percent: 0.2,
            shares: 3_600,
            action: 'MAINTAINED',
        },
        profile: {
            title: 'George Soros\' right hand, legendary trader',
            trackRecord: '30 years NO LOSING YEAR (!)',
            philosophy: 'Aggressive, big macro bets',
        },
        reasoning: {
            whyAction: [
                'Druck is usually very active (big buys or big sells)',
                'Maintaining = "I\'m watching, not convinced yet"',
                'Historical: He sold AAPL in 2020, bought back 2021',
                'He\'s a momentum player - waits for clear signal',
            ],
            implication: 'Waiting for breakout confirmation',
        },
    },
    {
        id: 'ackman',
        name: 'Bill Ackman',
        company: 'Pershing Square',
        position: {
            shares: 0,
            value: 0,
            percentOfPortfolio: 0,
        },
        quarterlyChange: {
            percent: 0,
            shares: 0,
            action: 'SOLD_OUT',
        },
        profile: {
            title: 'Activist investor (buys, changes management)',
            trackRecord: 'Chipotle (3x), Netflix (-70%), HLF disaster',
            philosophy: 'Concentrated (5-8 stocks only)',
        },
        reasoning: {
            whyAction: [
                'Ackman likes "broken" companies he can fix',
                'AAPL is "too perfect" - no activist opportunity',
                'Tim Cook already does everything right',
            ],
            implication: 'Neutral (not his style)',
        },
    },
    {
        id: 'tepper',
        name: 'David Tepper',
        company: 'Appaloosa Management',
        position: {
            shares: 1_200_000,
            value: 238_000_000,
            percentOfPortfolio: 1.8,
        },
        quarterlyChange: {
            percent: 15.3,
            shares: 1_200_000,
            action: 'NEW',
        },
        profile: {
            title: '"The Market Whisperer", distressed debt king',
            trackRecord: 'Bought banks in 2009 (5x return), tech in 2020',
            philosophy: 'Contrarian (buys when everyone sells)',
        },
        reasoning: {
            whyAction: [
                'He times market bottoms perfectly (70% accuracy)',
                'New position = fresh conviction (just analyzed now)',
                'Historical: His new positions +25% avg in 12mo',
            ],
            implication: 'Very bullish! Follow Tepper!',
        },
    },
];

export const fundFlows: FundFlow[] = [
    { type: 'Hedge Funds', inflow: 3.2, outflow: 1.8, net: 1.4 },
    { type: 'Mutual Funds', inflow: 2.8, outflow: 1.5, net: 1.3 },
    { type: 'Pension Funds', inflow: 1.4, outflow: 0.6, net: 0.8 },
    { type: 'ETF Rebalancing', inflow: 1.0, outflow: 0.3, net: 0.7 },
];

export const recent13FFilings: Filing13F[] = [
    { investor: 'David Tepper (Appaloosa)', company: 'AAPL', change: 15.3, action: 'NEW' },
    { investor: 'Ray Dalio (Bridgewater)', company: 'AAPL', change: 8.4, action: 'INCREASED' },
    { investor: 'Michael Burry (Scion)', company: 'AAPL', change: 6.2, action: 'INCREASED' },
    { investor: 'Seth Klarman (Baupost)', company: 'AAPL', change: 4.1, action: 'INCREASED' },
    { investor: 'Warren Buffett (Berkshire)', company: 'AAPL', change: -13.2, action: 'DECREASED' },
    { investor: 'Tiger Global', company: 'AAPL', change: -8.5, action: 'DECREASED' },
    { investor: 'Citadel (Ken Griffin)', company: 'AAPL', change: -3.2, action: 'DECREASED' },
];

export const ownershipBreakdown = {
    institutional: 61.2,
    retail: 23.8,
    insiders: 0.07,
    other: 14.93,
    totalHolders: 5842,
    top10Control: 23.4,
    top10Value: 720_000_000_000,
    concentrationRisk: 'LOW',
    herfindahlIndex: 0.042,
};

export const smartMoneyMetrics = {
    netFlow30d: 4.2,
    netFlow90d: 8.4,
    sentiment: 74,
    trendDirection: 'STRENGTHENING' as const,
    status: 'BULLISH' as const,
};

export const historicalWinRate = {
    whenScoreAbove85: {
        winRate: 78,
        avgReturn: 11.2,
        maxDrawdown: -8.3,
        avgHoldTime: 4.5,
        timeframe: 'last 5 years',
    },
    whenNetFlowAbove3B: {
        winRate: 82,
        avgReturn: 7.8,
        timeframe: 'next 3 months',
        period: 'last 10 years',
    },
};
