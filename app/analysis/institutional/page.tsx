"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    Info,
    Bell,
    Users,
    DollarSign,
    FileText,
    Target,
    Shield,
    Activity,
    Zap,
    CheckCircle,
    XCircle,
    ArrowRight,
    BarChart3,
    LineChart,
    Sparkles,
} from "lucide-react";
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    AreaChart,
    Area,
    LineChart as RechartsLineChart,
    Line,
} from "recharts";
import {
    legendaryInvestors,
    fundFlows,
    recent13FFilings,
    ownershipBreakdown,
    smartMoneyMetrics,
    historicalWinRate,
} from "@/lib/mock-data/institutional-data";

// Monte Carlo simulation data
const monteCarloData = {
    simulations: 10000,
    timeHorizon: "12 months",
    scenarios: {
        bullish: { probability: 35, targetPrice: 245, return: 23.5 },
        base: { probability: 45, targetPrice: 215, return: 8.3 },
        bearish: { probability: 20, targetPrice: 175, return: -11.8 },
    },
    confidenceIntervals: {
        ci90: { low: 168, high: 258 },
        ci75: { low: 185, high: 242 },
        ci50: { low: 198, high: 228 },
    },
    expectedValue: 218.50,
    volatility: 28.5,
    sharpeRatio: 1.42,
    maxDrawdown: -18.2,
};

// Monte Carlo chart data
const monteCarloChartData = [
    { month: "Jan", p10: 185, p25: 192, p50: 200, p75: 208, p90: 218 },
    { month: "Feb", p10: 180, p25: 190, p50: 202, p75: 215, p90: 228 },
    { month: "Mar", p10: 175, p25: 188, p50: 205, p75: 222, p90: 238 },
    { month: "Apr", p10: 172, p25: 186, p50: 208, p75: 228, p90: 245 },
    { month: "May", p10: 170, p25: 185, p50: 210, p75: 232, p90: 250 },
    { month: "Jun", p10: 168, p25: 184, p50: 212, p75: 236, p90: 255 },
    { month: "Jul", p10: 166, p25: 183, p50: 215, p75: 240, p90: 258 },
    { month: "Aug", p10: 168, p25: 185, p50: 218, p75: 242, p90: 260 },
    { month: "Sep", p10: 170, p25: 188, p50: 220, p75: 245, p90: 262 },
    { month: "Oct", p10: 172, p25: 190, p50: 222, p75: 248, p90: 265 },
    { month: "Nov", p10: 175, p25: 193, p50: 225, p75: 250, p90: 268 },
    { month: "Dec", p10: 178, p25: 198, p50: 228, p75: 255, p90: 272 },
];

// Forecast data
const forecastData = {
    shortTerm: {
        period: "1-3 ay",
        outlook: "Bullish",
        confidence: 78,
        drivers: [
            "iPhone 16 Pro satışları gözləntiləri aşıb",
            "AI xidmətləri genişlənməsi",
            "Bayram mövsümü güclü başlayıb",
        ],
        risks: [
            "Çin bazarında rəqabət",
            "Fed faiz qərarları",
        ],
        targetRange: "$205 - $225",
    },
    mediumTerm: {
        period: "3-12 ay",
        outlook: "Cautiously Bullish",
        confidence: 65,
        drivers: [
            "Vision Pro 2.0 buraxılışı",
            "Services revenue +18% gözlənilir",
            "Buyback proqramı davam edir ($90B)",
        ],
        risks: [
            "Makroiqtisadi qeyri-müəyyənlik",
            "Antitrust təzyiqləri",
            "Rəqabət mühiti",
        ],
        targetRange: "$215 - $260",
    },
    longTerm: {
        period: "1-3 il",
        outlook: "Strong Buy",
        confidence: 82,
        drivers: [
            "AI ekosistem inteqrasiyası",
            "AR/VR bazar lideri ola bilər",
            "Healthcare-ə giriş",
            "India istehsalı genişlənməsi",
        ],
        risks: [
            "İnnovasiya tempi",
            "Tim Cook-dan sonrakı dövr",
        ],
        targetRange: "$280 - $350",
    },
};

// Final decision summary
const finalDecision = {
    overallSignal: "STRONG BUY",
    confidenceScore: 85,
    keyFindings: [
        { text: "Smart Money akkumulyasiya edir (+$4.2B)", positive: true },
        { text: "Buffett satır (-13.2%)", positive: false },
        { text: "Tepper yeni mövqe açıb", positive: true },
        { text: "Net institutional flow pozitiv", positive: true },
        { text: "Ownership konsentrasiyası sağlam", positive: true },
    ],
    expectations: [
        "12 ayda +15-25% potensial return",
        "Monte Carlo median: $228",
        "Win rate: 82% (similar situations)",
    ],
    recommendations: [
        {
            type: "Aggressive",
            action: "Full position at market",
            allocation: "5-7% portfolio",
        },
        {
            type: "Conservative",
            action: "50% now, 50% on dips",
            allocation: "3-5% portfolio",
        },
        {
            type: "Defensive",
            action: "Wait for pullback to $190",
            allocation: "2-3% portfolio",
        },
    ],
    riskLevel: "Medium",
    timeHorizon: "12-24 months",
};

export default function InstitutionalPage() {
    const [selectedRecommendation, setSelectedRecommendation] = useState(0);

    const totalInflow = fundFlows.reduce((sum, f) => sum + f.inflow, 0);
    const totalOutflow = fundFlows.reduce((sum, f) => sum + f.outflow, 0);
    const netFlow = totalInflow - totalOutflow;

    const fundFlowChartData = [
        { month: "Jul", inflow: 2.1, outflow: 1.8 },
        { month: "Aug", inflow: 1.8, outflow: 2.2 },
        { month: "Sep", inflow: 2.5, outflow: 1.5 },
        { month: "Oct", inflow: 3.2, outflow: 1.9 },
        { month: "Nov", inflow: 2.8, outflow: 1.6 },
        { month: "Dec", inflow: 3.5, outflow: 2.3 },
    ];

    const ownershipPieData = [
        { name: "Institutional", value: ownershipBreakdown.institutional, color: "#3b82f6" },
        { name: "Retail", value: ownershipBreakdown.retail, color: "#10b981" },
        { name: "Insiders", value: ownershipBreakdown.insiders, color: "#f59e0b" },
        { name: "Other", value: ownershipBreakdown.other, color: "#6b7280" },
    ];

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-900">
            {/* Main Content */}
            <div className="flex-1 p-8 space-y-8 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Institutional Analysis</h1>
                        <p className="text-slate-400">AAPL - Apple Inc.</p>
                    </div>
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-4 py-2">
                        <Sparkles className="w-4 h-4 mr-2" />
                        AI-Powered Analysis
                    </Badge>
                </div>

                {/* Smart Money Index Hero */}
                <Card className="bg-gradient-to-br from-blue-950/80 to-purple-950/80 border-blue-500/30 p-8 shadow-2xl shadow-blue-500/20">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                🏦 SMART MONEY INDEX: ACCUMULATING ({smartMoneyMetrics.sentiment}/100)
                            </h2>
                            <div className="flex items-center gap-4 text-sm">
                                <span className="text-green-400">
                                    Net Flows: +${smartMoneyMetrics.netFlow30d.toFixed(1)}B (30d)
                                </span>
                                <span className="text-blue-400">
                                    Trend: ↗️ {smartMoneyMetrics.trendDirection}
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-5xl font-bold text-green-400">{smartMoneyMetrics.sentiment}</div>
                            <div className="text-sm text-slate-400">Bullish Signal</div>
                        </div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                        <div className="flex items-start gap-2">
                            <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-slate-300">
                                <strong className="text-white">📚 NƏ DEMƏKDIR:</strong> {`"Smart Money" institutional investorların hərəkətlərini izləyir. Hedge funds və pension funds retail investorlardan əvvəl hərəkət edir. Net flow +$4.2B = güclü akkumulyasiya siqnalı.`}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Monte Carlo Simulation */}
                <Card className="bg-gradient-to-br from-purple-950/80 to-indigo-950/80 border-purple-500/30 p-8 shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-purple-400" />
                        🎲 MONTE CARLO SİMULYASİYASI - Gələcək Proqnozu
                    </h3>

                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                            <div className="text-xs text-slate-400">Simulyasiya sayı</div>
                            <div className="text-2xl font-bold text-white">{monteCarloData.simulations.toLocaleString()}</div>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                            <div className="text-xs text-slate-400">Gözlənilən Dəyər</div>
                            <div className="text-2xl font-bold text-green-400">${monteCarloData.expectedValue}</div>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                            <div className="text-xs text-slate-400">Volatillik (Ann.)</div>
                            <div className="text-2xl font-bold text-yellow-400">{monteCarloData.volatility}%</div>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                            <div className="text-xs text-slate-400">Sharpe Ratio</div>
                            <div className="text-2xl font-bold text-blue-400">{monteCarloData.sharpeRatio}</div>
                        </div>
                    </div>

                    {/* Monte Carlo Chart */}
                    <div className="h-64 mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monteCarloChartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="month" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" domain={[150, 300]} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#1e293b",
                                        border: "1px solid #334155",
                                        borderRadius: "8px",
                                    }}
                                />
                                <Area type="monotone" dataKey="p90" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} name="90th Percentile" />
                                <Area type="monotone" dataKey="p75" stackId="2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} name="75th Percentile" />
                                <Area type="monotone" dataKey="p50" stackId="3" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} name="Median" />
                                <Area type="monotone" dataKey="p25" stackId="4" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} name="25th Percentile" />
                                <Area type="monotone" dataKey="p10" stackId="5" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} name="10th Percentile" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Scenario Analysis */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="bg-green-950/30 rounded-xl p-4 border border-green-500/30">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-green-400 font-semibold">🚀 Bullish Ssenari</span>
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{monteCarloData.scenarios.bullish.probability}%</Badge>
                            </div>
                            <div className="text-2xl font-bold text-white">${monteCarloData.scenarios.bullish.targetPrice}</div>
                            <div className="text-sm text-green-400">+{monteCarloData.scenarios.bullish.return}%</div>
                        </div>
                        <div className="bg-blue-950/30 rounded-xl p-4 border border-blue-500/30">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-blue-400 font-semibold">📊 Baza Ssenari</span>
                                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{monteCarloData.scenarios.base.probability}%</Badge>
                            </div>
                            <div className="text-2xl font-bold text-white">${monteCarloData.scenarios.base.targetPrice}</div>
                            <div className="text-sm text-blue-400">+{monteCarloData.scenarios.base.return}%</div>
                        </div>
                        <div className="bg-red-950/30 rounded-xl p-4 border border-red-500/30">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-red-400 font-semibold">⚠️ Bearish Ssenari</span>
                                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">{monteCarloData.scenarios.bearish.probability}%</Badge>
                            </div>
                            <div className="text-2xl font-bold text-white">${monteCarloData.scenarios.bearish.targetPrice}</div>
                            <div className="text-sm text-red-400">{monteCarloData.scenarios.bearish.return}%</div>
                        </div>
                    </div>

                    {/* Educational Box */}
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                        <div className="flex items-start gap-2">
                            <Info className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-slate-300">
                                <strong className="text-white">📚 MONTE CARLO NƏDİR?</strong> 10,000 fərqli bazar ssenarisi simulyasiya edilir.
                                Hər simulyasiyada təsadüfi parametrlər (volatillik, trend, xəbərlər) istifadə olunur.
                                Nəticədə qiymət diapazonları və ehtimalları əldə edilir. Bu, riskləri daha yaxşı qiymətləndirməyə kömək edir.
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Forecast Section */}
                <Card className="bg-gradient-to-br from-indigo-950/80 to-blue-950/80 border-indigo-500/30 p-8 shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <LineChart className="w-5 h-5 text-indigo-400" />
                        📈 PROQNOZ VƏ GƏLƏCƏK BAXIŞI
                    </h3>

                    <div className="grid grid-cols-3 gap-6">
                        {/* Short Term */}
                        <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-700/50">
                            <div className="flex items-center justify-between mb-3">
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                    Qısamüddətli
                                </Badge>
                                <span className="text-slate-400 text-sm">{forecastData.shortTerm.period}</span>
                            </div>
                            <div className="text-2xl font-bold text-green-400 mb-2">{forecastData.shortTerm.outlook}</div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex-1 bg-slate-700 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${forecastData.shortTerm.confidence}%` }} />
                                </div>
                                <span className="text-sm text-slate-400">{forecastData.shortTerm.confidence}%</span>
                            </div>
                            <div className="text-lg font-semibold text-white mb-3">{forecastData.shortTerm.targetRange}</div>
                            <div className="space-y-2">
                                <div className="text-xs text-green-400 font-semibold">✅ Sürücülər:</div>
                                {forecastData.shortTerm.drivers.map((d, i) => (
                                    <div key={i} className="text-xs text-slate-300">• {d}</div>
                                ))}
                                <div className="text-xs text-red-400 font-semibold mt-2">⚠️ Risklər:</div>
                                {forecastData.shortTerm.risks.map((r, i) => (
                                    <div key={i} className="text-xs text-slate-300">• {r}</div>
                                ))}
                            </div>
                        </div>

                        {/* Medium Term */}
                        <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-700/50">
                            <div className="flex items-center justify-between mb-3">
                                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                                    Ortamüddətli
                                </Badge>
                                <span className="text-slate-400 text-sm">{forecastData.mediumTerm.period}</span>
                            </div>
                            <div className="text-2xl font-bold text-yellow-400 mb-2">{forecastData.mediumTerm.outlook}</div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex-1 bg-slate-700 rounded-full h-2">
                                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${forecastData.mediumTerm.confidence}%` }} />
                                </div>
                                <span className="text-sm text-slate-400">{forecastData.mediumTerm.confidence}%</span>
                            </div>
                            <div className="text-lg font-semibold text-white mb-3">{forecastData.mediumTerm.targetRange}</div>
                            <div className="space-y-2">
                                <div className="text-xs text-green-400 font-semibold">✅ Sürücülər:</div>
                                {forecastData.mediumTerm.drivers.map((d, i) => (
                                    <div key={i} className="text-xs text-slate-300">• {d}</div>
                                ))}
                                <div className="text-xs text-red-400 font-semibold mt-2">⚠️ Risklər:</div>
                                {forecastData.mediumTerm.risks.map((r, i) => (
                                    <div key={i} className="text-xs text-slate-300">• {r}</div>
                                ))}
                            </div>
                        </div>

                        {/* Long Term */}
                        <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-700/50">
                            <div className="flex items-center justify-between mb-3">
                                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                    Uzunmüddətli
                                </Badge>
                                <span className="text-slate-400 text-sm">{forecastData.longTerm.period}</span>
                            </div>
                            <div className="text-2xl font-bold text-blue-400 mb-2">{forecastData.longTerm.outlook}</div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex-1 bg-slate-700 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${forecastData.longTerm.confidence}%` }} />
                                </div>
                                <span className="text-sm text-slate-400">{forecastData.longTerm.confidence}%</span>
                            </div>
                            <div className="text-lg font-semibold text-white mb-3">{forecastData.longTerm.targetRange}</div>
                            <div className="space-y-2">
                                <div className="text-xs text-green-400 font-semibold">✅ Sürücülər:</div>
                                {forecastData.longTerm.drivers.map((d, i) => (
                                    <div key={i} className="text-xs text-slate-300">• {d}</div>
                                ))}
                                <div className="text-xs text-red-400 font-semibold mt-2">⚠️ Risklər:</div>
                                {forecastData.longTerm.risks.map((r, i) => (
                                    <div key={i} className="text-xs text-slate-300">• {r}</div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                        <div className="flex items-start gap-2">
                            <Info className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-slate-300">
                                <strong className="text-white">📚 PROQNOZ NECƏ HAZIRLANIR?</strong> Fundamental analiz (maliyyə hesabatları),
                                texniki analiz (qrafik nümunələri), sentiment analizi (xəbərlər, sosial media), və institutional hərəkətlər
                                birləşdirilərək kompleks bir model yaradılır. Confidence % modelin özünə inamını göstərir.
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Ownership Breakdown */}
                <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 p-8 shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-400" />
                        📊 MÜLKİYYƏT BÖLGÜSÜ
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={ownershipPieData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {ownershipPieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-3">
                            {ownershipPieData.map((item) => (
                                <div key={item.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-slate-300">{item.name}</span>
                                    </div>
                                    <span className="text-white font-semibold">{item.value}%</span>
                                </div>
                            ))}
                            <div className="mt-4 pt-4 border-t border-slate-700">
                                <div className="text-sm text-slate-300">
                                    <strong className="text-white">📚 ƏHƏMIYYƏT:</strong> 61.2% institutional ownership optimal səviyyədir.
                                    80%-dən yuxarı = həddindən artıq konsentrasiya riski. 40%-dən aşağı = retail dominantlığı (volatil).
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Fund Flow Analysis */}
                <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-green-500/30 p-8 shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-400" />
                        💰 FOND AXINLARI (Son 90 Gün)
                    </h3>

                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="bg-green-950/30 rounded-xl p-4 border border-green-500/30">
                            <div className="text-sm text-slate-400">Total Giriş</div>
                            <div className="text-2xl font-bold text-green-400">${totalInflow.toFixed(1)}B</div>
                        </div>
                        <div className="bg-red-950/30 rounded-xl p-4 border border-red-500/30">
                            <div className="text-sm text-slate-400">Total Çıxış</div>
                            <div className="text-2xl font-bold text-red-400">${totalOutflow.toFixed(1)}B</div>
                        </div>
                        <div className="bg-blue-950/30 rounded-xl p-4 border border-blue-500/30">
                            <div className="text-sm text-slate-400">Net Axın</div>
                            <div className="text-2xl font-bold text-blue-400">+${netFlow.toFixed(1)}B</div>
                        </div>
                        <div className="bg-purple-950/30 rounded-xl p-4 border border-purple-500/30">
                            <div className="text-sm text-slate-400">Aylıq Orta</div>
                            <div className="text-2xl font-bold text-purple-400">+${(netFlow / 3).toFixed(1)}B</div>
                        </div>
                    </div>

                    <div className="h-64 mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={fundFlowChartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="month" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }} />
                                <Legend />
                                <Bar dataKey="inflow" fill="#10b981" name="Giriş" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="outflow" fill="#ef4444" name="Çıxış" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                        <div className="text-sm text-slate-300">
                            <strong className="text-white">📚 FOND AXINLARI NƏDİR?</strong> Institutional investorlar (hedge funds, ETFs, pension funds)
                            nə qədər pul axıtdığını göstərir. Net pozitiv axın = akkumulyasiya (bullish). Net neqativ = dağıtım (bearish).
                        </div>
                    </div>
                </Card>

                {/* Legendary Investors */}
                <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-purple-500/30 p-8 shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-purple-400" />
                        👑 ƏFSANƏVI İNVESTORLAR
                    </h3>

                    <div className="space-y-4">
                        {legendaryInvestors.slice(0, 3).map((investor, index) => (
                            <div
                                key={investor.id}
                                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold text-white">
                                            {investor.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold text-white">{investor.name}</div>
                                            <div className="text-sm text-slate-400">{investor.company}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        {investor.quarterlyChange.action === 'REDUCED' && (
                                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                                                🔴 SATIR {investor.quarterlyChange.percent}%
                                            </Badge>
                                        )}
                                        {investor.quarterlyChange.action === 'INCREASED' && (
                                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                                🟢 ALIR +{investor.quarterlyChange.percent}%
                                            </Badge>
                                        )}
                                        {investor.quarterlyChange.action === 'NEW' && (
                                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                                ⚡ YENİ MOVQe
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-3 text-sm text-slate-300">
                                    <strong className="text-purple-400">Niyə?</strong> {investor.reasoning.whyAction[0]}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                        <div className="text-sm text-slate-300">
                            <strong className="text-white">📚 NIYƏ ÖNƏMLİDİR?</strong> {`Bu investorlar bazarı "döyən" track record-a sahibdirlər. Onların hərəkətləri çox vaxt bazardan 3-6 ay əvvəl olur. Buffett satdıqda ehtiyatlı olun, amma Tepper aldıqda diqqət edin.`}
                        </div>
                    </div>
                </Card>
            </div>

            {/* Right Sidebar - Yekun Qərar */}
            <aside className="w-96 border-l border-slate-700/50 bg-gradient-to-b from-slate-900 to-slate-950 p-6 sticky top-0 h-screen overflow-y-auto">
                {/* Final Decision Header */}
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        YEKUN QƏRAR
                    </h2>
                    <p className="text-sm text-slate-400">AI Xülasəsi və Tövsiyələr</p>
                </div>

                {/* Overall Signal */}
                <div className="bg-gradient-to-br from-green-950/50 to-emerald-950/50 rounded-xl p-5 border border-green-500/30 mb-6">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-400 mb-1">{finalDecision.overallSignal}</div>
                        <div className="text-sm text-slate-400">Ümumi Siqnal</div>
                        <div className="mt-3 flex items-center justify-center gap-2">
                            <div className="text-sm text-slate-400">İnam:</div>
                            <div className="flex-1 max-w-24 bg-slate-700 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${finalDecision.confidenceScore}%` }} />
                            </div>
                            <div className="text-sm font-bold text-green-400">{finalDecision.confidenceScore}%</div>
                        </div>
                    </div>
                </div>

                {/* Key Findings */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                        📋 ÖNƏMLİ TAPINTILAR
                    </h3>
                    <div className="space-y-2">
                        {finalDecision.keyFindings.map((finding, index) => (
                            <div
                                key={index}
                                className={`flex items-start gap-2 p-2 rounded-lg ${finding.positive ? "bg-green-950/30" : "bg-red-950/30"
                                    }`}
                            >
                                {finding.positive ? (
                                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                ) : (
                                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                                )}
                                <span className="text-sm text-slate-300">{finding.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Expectations */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                        🎯 GÖZLƏNTİLƏR
                    </h3>
                    <div className="bg-slate-800/50 rounded-xl p-4 space-y-2">
                        {finalDecision.expectations.map((exp, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-slate-300">
                                <ArrowRight className="w-4 h-4 text-blue-400" />
                                {exp}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recommendations */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                        💡 TÖVSİYƏLƏR
                    </h3>
                    <div className="space-y-2">
                        {finalDecision.recommendations.map((rec, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedRecommendation(index)}
                                className={`w-full text-left p-3 rounded-lg border transition-all ${selectedRecommendation === index
                                    ? "bg-blue-950/50 border-blue-500/50"
                                    : "bg-slate-800/50 border-slate-700/50 hover:border-slate-600"
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className={`text-sm font-semibold ${rec.type === "Aggressive" ? "text-green-400" :
                                        rec.type === "Conservative" ? "text-yellow-400" : "text-blue-400"
                                        }`}>
                                        {rec.type}
                                    </span>
                                    <Badge className="bg-slate-700 text-slate-300 border-0 text-xs">
                                        {rec.allocation}
                                    </Badge>
                                </div>
                                <div className="text-sm text-slate-300">{rec.action}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Risk & Time Horizon */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                        <div className="text-xs text-slate-400">Risk Səviyyəsi</div>
                        <div className="text-lg font-bold text-yellow-400">{finalDecision.riskLevel}</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                        <div className="text-xs text-slate-400">Zaman Horizontu</div>
                        <div className="text-lg font-bold text-blue-400">{finalDecision.timeHorizon}</div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        AL - Buy Order
                    </Button>
                    <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-800">
                        <Bell className="w-4 h-4 mr-2" />
                        Qiymət Xəbərdarlığı Qur
                    </Button>
                </div>

                {/* Disclaimer */}
                <div className="mt-6 p-3 bg-yellow-950/20 rounded-lg border border-yellow-900/30">
                    <div className="text-xs text-yellow-400/80">
                        ⚠️ Bu analiz yalnız informativ məqsəd daşıyır və investisiya tövsiyəsi deyil.
                        Qərar vermədən əvvəl öz araşdırmanızı aparın.
                    </div>
                </div>
            </aside>
        </div>
    );
}
