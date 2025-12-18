"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    TrendingUp,
    TrendingDown,
    Search,
    Sparkles,
    ChevronRight,
    AlertTriangle,
    CheckCircle,
    Info,
    ArrowRight,
    Zap,
    Globe,
    Building2,
    BarChart3,
    Shield,
    DollarSign,
    Percent,
    Activity,
    Brain,
    Calendar,
    Calculator,
    ExternalLink,
} from "lucide-react";

// Color palette - Dark theme with energetic vibrant colors
const palette = {
    bg: "#030306",
    bgDark: "#050508",
    card: "#0C0C14",
    cardDark: "#080810",
    text: "#FFFFFF",
    textSecondary: "#8A8AA0",
    border: "rgba(100, 100, 120, 0.25)",
    success: "#00FF7F",
    successLight: "rgba(0, 255, 127, 0.12)",
    warning: "#FF9500",
    warningLight: "rgba(255, 149, 0, 0.12)",
    danger: "#FF2D55",
    dangerLight: "rgba(255, 45, 85, 0.12)",
    primary: "#00D4FF",
    primaryLight: "rgba(0, 212, 255, 0.12)",
    accent: "#AF52DE",
};

// Trend forecast data
const trendData = [
    { month: "İyl", tarixi: 92, prognoz: null, range: null },
    { month: "Avq", tarixi: 95, prognoz: null, range: null },
    { month: "Sen", tarixi: 98, prognoz: null, range: null },
    { month: "Okt", tarixi: 100, prognoz: null, range: null },
    { month: "Noy", tarixi: 102, prognoz: null, range: null },
    { month: "Dek", tarixi: 100, prognoz: 100, range: [98, 102] },
    { month: "Yan", tarixi: null, prognoz: 102, range: [99, 105] },
    { month: "Fev", tarixi: null, prognoz: 105, range: [101, 109] },
    { month: "Mar", tarixi: null, prognoz: 108, range: [103, 113] },
    { month: "Apr", tarixi: null, prognoz: 112, range: [106, 118] },
    { month: "May", tarixi: null, prognoz: 118, range: [110, 126] },
    { month: "İyn", tarixi: null, prognoz: 125, range: [115, 135] },
];

// Stock Price Chart Data (last 30 days)
const priceChartData = [
    { date: "19 Noy", price: 189.50, volume: 52.1 },
    { date: "20 Noy", price: 191.20, volume: 48.3 },
    { date: "21 Noy", price: 190.80, volume: 45.7 },
    { date: "22 Noy", price: 192.30, volume: 58.2 },
    { date: "25 Noy", price: 194.10, volume: 61.4 },
    { date: "26 Noy", price: 193.50, volume: 43.8 },
    { date: "27 Noy", price: 195.20, volume: 67.2 },
    { date: "29 Noy", price: 196.80, volume: 72.5 },
    { date: "2 Dek", price: 195.40, volume: 55.3 },
    { date: "3 Dek", price: 193.20, volume: 48.9 },
    { date: "4 Dek", price: 194.80, volume: 52.1 },
    { date: "5 Dek", price: 196.50, volume: 63.7 },
    { date: "6 Dek", price: 198.20, volume: 78.4 },
    { date: "9 Dek", price: 197.50, volume: 54.2 },
    { date: "10 Dek", price: 196.80, volume: 49.8 },
    { date: "11 Dek", price: 198.50, volume: 68.3 },
    { date: "12 Dek", price: 199.20, volume: 82.1 },
    { date: "13 Dek", price: 198.80, volume: 71.5 },
    { date: "16 Dek", price: 200.50, volume: 95.2 },
    { date: "17 Dek", price: 198.50, volume: 76.8 },
];

// Instrument Info
const instrumentInfo = {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 198.50,
    change: 2.84,
    changePercent: 1.45,
    open: 195.66,
    high: 199.62,
    low: 195.10,
    prevClose: 195.66,
    volume: "76.8M",
    avgVolume: "58.2M",
    marketCap: "3.08T",
    pe: 28.5,
    eps: 6.97,
    dividend: 0.96,
    dividendYield: 0.48,
    week52High: 199.62,
    week52Low: 164.08,
    beta: 1.28,
    sector: "Technology",
    industry: "Consumer Electronics",
    exchange: "NASDAQ",
};

// Company Info - Şirkət haqqında
const companyInfo = {
    description: "Apple Inc. dizayn edir, istehsal edir və smartfonlar, fərdi kompüterlər, planşetlər, geyilə bilən cihazlar və aksesuarlar satır. Şirkət həmçinin müxtəlif əlaqəli xidmətlər təklif edir.",
    ceo: "Tim Cook",
    employees: "164,000",
    founded: "1976",
    headquarters: "Cupertino, California, ABŞ",
    website: "apple.com",
    description_full: "Apple dünyada ən böyük texnologiya şirkətlərindən biridir. iPhone, iPad, Mac, Apple Watch və AirPods kimi ikonik məhsulları ilə tanınır. Şirkət həmçinin App Store, Apple Music, iCloud, Apple TV+ və Apple Pay kimi rəqəmsal xidmətlər təqdim edir.",
    keyProducts: ["iPhone", "Mac", "iPad", "Apple Watch", "AirPods", "Apple TV"],
    revenueBreakdown: [
        { segment: "iPhone", percent: 52 },
        { segment: "Services", percent: 22 },
        { segment: "Mac", percent: 10 },
        { segment: "iPad", percent: 8 },
        { segment: "Wearables", percent: 8 },
    ],
};

// Score reasons with detailed explanations
const scoreReasons = [
    {
        id: 1,
        label: "Güclü Cash Flow",
        sublabel: "$100B+",
        score: 12,
        color: palette.success,
        details: {
            title: "Pul Axını Analizi",
            value: "$102.4B",
            trend: "+8.3% YoY",
            description: "Apple-ın sərbəst pul axını son 12 ayda $102.4 milyard olub ki, bu da sənaye ortalamasından 3x yüksəkdir.",
            metrics: [
                { label: "Əməliyyat Pul Axını", value: "$110.5B", status: "excellent" },
                { label: "Sərbəst Pul Axını", value: "$102.4B", status: "excellent" },
                { label: "Pul Konversiya Nisbəti", value: "98%", status: "excellent" },
                { label: "CapEx", value: "$8.1B", status: "good" },
            ],
            insight: "Güclü pul axını şirkətə dividend ödəmələri, geri alımlar və R&D yatırımları üçün əhəmiyyətli çeviklik verir."
        }
    },
    {
        id: 2,
        label: "Yüksək ROE",
        sublabel: "45%",
        score: 15,
        color: palette.success,
        details: {
            title: "Kapital Gəlirliliyi Analizi",
            value: "147.2%",
            trend: "+5.2% YoY",
            description: "Apple-ın ROE göstəricisi 147.2% ilə sənaye liderləri arasında ən yüksək səviyyədədir.",
            metrics: [
                { label: "ROE", value: "147.2%", status: "excellent" },
                { label: "ROA", value: "28.3%", status: "excellent" },
                { label: "ROIC", value: "56.2%", status: "excellent" },
                { label: "Profit Margin", value: "25.3%", status: "good" },
            ],
            insight: "Yüksək ROE səmərəli kapital idarəetməsini və güclü əməliyyat performansını göstərir."
        }
    },
    {
        id: 3,
        label: "P/E Ratio Normal",
        sublabel: "28x",
        score: 8,
        color: palette.primary,
        details: {
            title: "Qiymətləndirmə Analizi",
            value: "28.5x",
            trend: "+12% Premium",
            description: "P/E nisbəti sektor ortalamasından bir qədər yüksəkdir, lakin güclü keyfiyyət göstəriciləri bunu əsaslandırır.",
            metrics: [
                { label: "P/E Ratio", value: "28.5x", status: "fair" },
                { label: "Forward P/E", value: "26.2x", status: "good" },
                { label: "PEG Ratio", value: "2.1x", status: "fair" },
                { label: "EV/EBITDA", value: "21.3x", status: "fair" },
            ],
            insight: "Premium qiymətləndirmə güclü brend, ekosistem və marja profili ilə əsaslandırılır."
        }
    },
    {
        id: 4,
        label: "Makro Təzyiq",
        sublabel: "5.25%",
        score: -5,
        color: palette.warning,
        details: {
            title: "Makroiqtisadi Təsir Analizi",
            value: "Orta Təzyiq",
            trend: "Yaxşılaşma gözlənilir",
            description: "Yüksək faiz dərəcələri istehlakçı xərcləməsinə təzyiq göstərir, lakin 2024-cü ildə endirimi gözlənilir.",
            metrics: [
                { label: "Fed Faiz Dərəcəsi", value: "5.25%", status: "warning" },
                { label: "İnflyasiya (CPI)", value: "3.4%", status: "fair" },
                { label: "GDP Artımı", value: "2.1%", status: "good" },
                { label: "İşsizlik", value: "3.7%", status: "good" },
            ],
            insight: "Makro mühit qeyri-müəyyəndir, lakin Apple-ın güclü balans vərəqi bu risklərə qarşı davamlılıq təmin edir."
        }
    },
];

// Scenario data with expanded details
const scenarios = [
    {
        type: "Bull Case",
        probability: 45,
        color: palette.success,
        scoreRange: "92-98",
        priceTarget: "$245",
        upside: "+23%",
        points: ["Əlverişli makro + güclü icra", "FED faiz endirimlərini başlayır", "Dolar artımı 12%+ davam edir", "Yeni məhsul xətti uğurlu olur"],
        details: {
            drivers: [
                { factor: "Makro Mühit", impact: "Yüksək", description: "FED faiz endirmələri, güclü istehlakçı xərcləmə" },
                { factor: "Şirkət Performası", impact: "Yüksək", description: "AI funksiyaları upgrade dövrünü sürətləndirir" },
                { factor: "Sektor Dinamikası", impact: "Orta", description: "Texnologiyada güclü tələb davam edir" },
            ],
            catalysts: ["Apple Intelligence uğurlu lansmanı", "Services gəliri 15%+ artım", "Hindistan bazarında güclü genişlənmə", "Vision Pro kütləvi qəbul"],
            timeframe: "12-18 ay",
            confidence: 72,
        }
    },
    {
        type: "Base Case",
        probability: 40,
        color: palette.warning,
        scoreRange: "82-88",
        priceTarget: "$185",
        upside: "-7%",
        points: ["Mövcud trend davam edir", "Faizlər sabit qalır", "Gəlir artımı 5-8% aralığında", "Rəqabət təzyiqi davam edir"],
        details: {
            drivers: [
                { factor: "Makro Mühit", impact: "Orta", description: "Faizlər sabit, mülayim artım" },
                { factor: "Şirkət Performası", impact: "Orta", description: "iPhone satışları stabil, Services güclü" },
                { factor: "Sektor Dinamikası", impact: "Orta", description: "Normal tələb dövrü" },
            ],
            catalysts: ["Services 12% CAGR davam edir", "iPhone yeniləmə dövrü normal", "Marjalar 38% səviyyəsində saxlanır"],
            timeframe: "6-12 ay",
            confidence: 85,
        }
    },
    {
        type: "Bear Case",
        probability: 15,
        color: palette.danger,
        scoreRange: "60-72",
        priceTarget: "$145",
        upside: "-27%",
        points: ["Makro pisləşmə + zəif icra", "Resessiya başlayır", "Tələb kəskin azalır", "Marja təzyiqi artır"],
        details: {
            drivers: [
                { factor: "Makro Mühit", impact: "Yüksək", description: "Resessiya, yüksək işsizlik" },
                { factor: "Şirkət Performası", impact: "Yüksək", description: "iPhone satışlarında kəskin düşüş" },
                { factor: "Sektor Dinamikası", impact: "Orta", description: "Texnologiya xərcləri azalır" },
            ],
            catalysts: ["Çin bazarında güclü rəqabət", "Makro şok (geosiyasi)", "Tənzimləyici təzyiq ABŞ/AB-da"],
            timeframe: "6-12 ay",
            confidence: 65,
        }
    },
];

// Risk matrix data with expanded details
const riskMatrix = {
    overall: "Orta",
    overallScore: 32.5,
    risks: [
        {
            name: "Makro Risk",
            level: 45,
            status: "Orta",
            color: palette.warning,
            icon: "Globe",
            description: "Faiz dərəcələri yüksək qalır, lakin endirimi gözlənir",
            factors: ["Faiz dərəcələri", "İnflyasiya", "Resessiya ehtimalı"],
            details: {
                subFactors: [
                    { name: "Fed Faiz Dərəcəsi", value: "5.25%", impact: 35, trend: "sabit" },
                    { name: "İnflyasiya (CPI)", value: "3.4%", impact: 25, trend: "azalan" },
                    { name: "GDP Artımı", value: "2.1%", impact: 20, trend: "stabil" },
                    { name: "İşsizlik", value: "3.7%", impact: 20, trend: "stabil" },
                ],
                mitigation: "Güclü pul axını və diversifikasiya olunmuş gəlir strukturu makro şoklara qarşı müdafiə təmin edir.",
                historicalRange: { min: 20, max: 65, current: 45 },
                outlook: "6 ay ərzində faiz endirimi gözlənilir - risk azalacaq",
            }
        },
        {
            name: "Sektor Riski",
            level: 25,
            status: "Aşağı",
            color: palette.success,
            icon: "BarChart3",
            description: "Texnologiya sektoru güclü mövqedə, rəqabət sabit",
            factors: ["Rəqabət", "Tənzimləmə", "Texnoloji dəyişiklik"],
            details: {
                subFactors: [
                    { name: "Rəqabət Təzyiqi", value: "Aşağı", impact: 30, trend: "stabil" },
                    { name: "Tənzimləyici Risk", value: "Orta", impact: 35, trend: "artan" },
                    { name: "AI Disruption", value: "Fürsət", impact: 20, trend: "pozitiv" },
                    { name: "Bazar Payı", value: "Güclü", impact: 15, trend: "stabil" },
                ],
                mitigation: "Ekosistem üstünlüyü və brend loyallığı rəqabətdən qoruyur.",
                historicalRange: { min: 15, max: 45, current: 25 },
                outlook: "AI trendləri sektora dəstək verir",
            }
        },
        {
            name: "Şirkət Riski",
            level: 20,
            status: "Aşağı",
            color: palette.success,
            icon: "Building2",
            description: "Güclü balans, diversifikasiya olunmuş gəlir",
            factors: ["İdarəetmə", "Finansal", "Hüquqi"],
            details: {
                subFactors: [
                    { name: "İdarəetmə Keyfiyyəti", value: "Əla", impact: 25, trend: "stabil" },
                    { name: "Borc Səviyyəsi", value: "Sağlam", impact: 30, trend: "stabil" },
                    { name: "Pul Vəziyyəti", value: "$62B", impact: 25, trend: "güclü" },
                    { name: "Hüquqi Risklər", value: "Aşağı", impact: 20, trend: "stabil" },
                ],
                mitigation: "Təcrübəli idarəetmə komandası və güclü korporativ qulluq.",
                historicalRange: { min: 10, max: 35, current: 20 },
                outlook: "Tim Cook rəhbərliyində strateji davam edir",
            }
        },
        {
            name: "Qiymət Riski",
            level: 40,
            status: "Orta",
            color: palette.warning,
            icon: "DollarSign",
            description: "P/E sektor ortalamasından bir qədər yuxarı",
            factors: ["P/E Ratio", "EV/EBITDA", "Tarixi müqayisə"],
            details: {
                subFactors: [
                    { name: "P/E vs Sektor", value: "+28%", impact: 40, trend: "yüksək" },
                    { name: "EV/EBITDA", value: "21.3x", impact: 25, trend: "premium" },
                    { name: "PEG Ratio", value: "2.1x", impact: 20, trend: "ədalətli" },
                    { name: "FCF Yield", value: "3.8%", impact: 15, trend: "orta" },
                ],
                mitigation: "Premium qiymətləndirmə güclü fundamental göstəricilərlə əsaslandırılır.",
                historicalRange: { min: 25, max: 60, current: 40 },
                outlook: "Gəlir artımı qiymətləndirməni dəstəkləyir",
            }
        },
    ]
};

// Macro data with detailed explanations
const macroData = {
    gdpGrowth: 2.1,
    gdpChange: 0.3,
    inflation: 3.4,
    inflationChange: -0.8,
    interestRate: 5.25,
    interestChange: 0,
    consumerConfidence: 102.5,
    confidenceChange: 0.5,
    explanations: {
        gdp: {
            title: "ÜDM Artımı nədir?",
            text: "Ümumi Daxili Məhsul artımı iqtisadiyyatın ümumi sağlamlığını göstərir. 2.1% artım mülayim, lakin sağlam iqtisadi genişlənməyə işarə edir.",
            impact: "Apple üçün bu, sabit istehlakçı tələbi və korporativ xərcləmə deməkdir."
        },
        inflation: {
            title: "İnflyasiya niyə vacibdir?",
            text: "3.4% inflyasiya FED hədəfindən yuxarıdır, lakin azalma trendi müsbətdir. Bu, faiz endirmələrinə yol açır.",
            impact: "Aşağı inflyasiya = aşağı faizlər = texnologiya səhmləri üçün əlverişli mühit."
        },
        interest: {
            title: "Faiz dərəcələrinin təsiri",
            text: "5.25% tarixi yüksək səviyyədədir və istehlakçı kreditini bahalandırır. Lakin FED 2024-cü ildə endirimi planlaşdırır.",
            impact: "Faiz endirmələri gözləntiləri texnologiya səhmlərini dəstəkləyir."
        },
        confidence: {
            title: "İstehlakçı Etibari",
            text: "102.5 indeksi istehlakçıların iqtisadiyyata nikbin baxdığını göstərir. 100-dən yuxarı dəyər müsbətdir.",
            impact: "Yüksək etibar = daha çox iPhone, Mac və Services satışı."
        }
    },
    summary: "Makro mühit qarışıqdır, lakin yaxşılaşma trendindədir. Faiz endirmələri gözlənilir ki, bu texnologiya sektoru üçün müsbətdir.",
    recommendation: "Makro mühit 6 ay ərzində yaxşılaşacaq. Mövcud çəkiliş fürsət ola bilər.",
    aiScore: 72
};

// Sector data with detailed explanations
const sectorData = {
    trend: "Yüksəlişdə",
    peRatio: 28,
    sectorPe: 25,
    premium: 12,
    competitors: ["AAPL", "MSFT", "GOOGL"],
    competitorScores: [95, 88, 82],
    explanations: {
        trend: {
            title: "Sektor Trendi nə deməkdir?",
            text: "Texnologiya sektoru AI boom-undan güclü nəticələr göstərir. Bulud, süni intellekt və rəqəmsal xidmətlər tələbat artımı yaşayır.",
            impact: "Apple AI strategiyası (Apple Intelligence) şirkəti bu trendə uyğunlaşdırır."
        },
        pe: {
            title: "P/E Premium nədir?",
            text: "Apple 28x P/E ilə sektor ortalamasından (25x) 12% yuxarıdır. Bu, Premium qiymətləndirmədir.",
            impact: "Premium güclü brend, ekosistem və gəlir artımı ilə əsaslandırılır."
        },
        competition: {
            title: "Rəqabət Mövqeyi",
            text: "Apple bazarda lider mövqeyini saxlayır. Microsoft AI ilə güclənir, Google reklam gəliri ilə çətinlik yaşayır.",
            impact: "Rəqabət riski aşağıdır - Apple ekosistemi müştəri loyallığı yaradır."
        }
    },
    summary: "Texnologiya sektoru struktural artım trendindədir. Apple sektorda ən güclü əsas göstəricilərə malikdir.",
    recommendation: "Sektor perspektivi müsbətdir. Apple sector daxilində ən yaxşı risk/mükafat balansına malikdir.",
    aiScore: 85
};

// Company data with detailed explanations
const companyData = {
    revenue: 5,
    margin: 25,
    cash: "$100B",
    deRatio: "1.5x",
    roc: 45,
    roic: 30,
    quarterlyRevenue: [89.5, 94.8, 90.8, 119.6],
    explanations: {
        revenue: {
            title: "Gəlir Artımı niyə vacibdir?",
            text: "+5% gəlir artımı Apple ölçüsündəki şirkət üçün sağlamdır. Services bölməsi 10%+ artımla kompensasiya edir.",
            impact: "Gəlir diversifikasiyası Apple-ı iPhone asılılığından qoruyur."
        },
        margin: {
            title: "Gross Margin nədir?",
            text: "25% əməliyyat marjası sənaye ən yüksəklərindən biridir. Premium qiymətləndirmə və güclü brend gücünü əks etdirir.",
            impact: "Yüksək marja = hər satışdan daha çox mənfəət."
        },
        cash: {
            title: "Pul Vəziyyəti niyə əhəmiyyətlidir?",
            text: "$100B+ nağd pul Apple-a böyük strateji çeviklik verir - M&A, R&D, dividendlər və geri alımlar üçün.",
            impact: "Güclü balans şirkəti iqtisadi şoklara qarşı qoruyur."
        },
        ratios: {
            title: "ROC/ROIC nədir?",
            text: "45% ROC və 30% ROIC şirkətin kapitalı çox səmərəli istifadə etdiyini göstərir. Bu, yatırım keyfiyyətinin göstəricisidir.",
            impact: "Yüksək ROIC = hər investisiya dollarından daha çox gəlir."
        }
    },
    summary: "Apple fundamental olaraq sənayenin ən güclü şirkətlərindən biridir: yüksək marja, güclü balans və əla kapital idarəetməsi.",
    recommendation: "Şirkət keyfiyyəti yüksəkdir. Mövcud qiymət premium olsa da, güclü fundamentlər bunu dəstəkləyir.",
    aiScore: 91
};

// Valuation data - DCF, Comparable, DDM models
const valuationData = {
    currentPrice: 198.50,
    fairValue: 215,
    dcfValue: 220,
    comparableValue: 210,
    ddmValue: 195,
    premiumDiscount: 8, // % premium to fair value
    priceRange: { min: 200, max: 225 },
    models: [
        { name: "DCF Model", value: 220, upside: 11, confidence: 75, description: "10yr Free Cash Flow proqnozu, 8% WACC" },
        { name: "Comparable", value: 210, upside: 6, confidence: 82, description: "P/E, EV/EBITDA peer müqayisəsi" },
        { name: "DDM", value: 195, upside: -2, confidence: 65, description: "Dividend Discount Model, 3% terminal artım" },
    ],
    summary: "Apple ədalətli qiymətə yaxın ticarət olunur. DCF ən yüksək dəyəri göstərir.",
    recommendation: "Mövcud qiymət makul. Pullback-də almaq daha yaxşı risk/mükafat verir."
};

// Earnings data - EPS history, beat rate
const earningsData = {
    nextEarnings: "25 Yan 2024",
    daysUntilEarnings: 38,
    quarters: [
        { quarter: "Q4'23", eps: 2.18, estimate: 2.08, surprise: 5, revenue: 119.6, beat: true },
        { quarter: "Q3'23", eps: 1.46, estimate: 1.43, surprise: 2, revenue: 90.8, beat: true },
        { quarter: "Q2'23", eps: 1.26, estimate: 1.27, surprise: -1, revenue: 94.8, beat: false },
        { quarter: "Q1'23", eps: 1.52, estimate: 1.46, surprise: 4, revenue: 89.5, beat: true },
    ],
    beatRate: 87.5,
    avgSurprise: 2.5,
    epsGrowth: 8,
    revenueGrowth: 5,
    analystEstimates: { current: 2.15, nextYear: 2.45, growth: 14 },
    summary: "Apple 87.5% beat rate ilə güclü hesabat tarixinə malikdir. Növbəti rübdə gözləntilər yüksəkdir."
};

// Dividend data
const dividendData = {
    yield: 0.52,
    annualDividend: 0.96,
    payoutRatio: 15,
    exDate: "10 Feb 2024",
    payDate: "15 Feb 2024",
    frequency: "Quarterly",
    growthRate5y: 7.2,
    growthRate10y: 8.5,
    yearsOfGrowth: 12,
    history: [
        { year: "2023", dividend: 0.96 },
        { year: "2022", dividend: 0.92 },
        { year: "2021", dividend: 0.88 },
        { year: "2020", dividend: 0.82 },
    ],
    summary: "Apple 12 illik ardıcıl dividend artımına malikdir. Aşağı yield, lakin güclü artım tarixi."
};

// Financial Health metrics
const financialHealthData = {
    currentRatio: 1.07,
    quickRatio: 0.98,
    debtToEquity: 1.51,
    interestCoverage: 28.4,
    altmanZ: 4.82,
    altmanZStatus: "Güclü", // > 3 = Güclü
    piotroskiF: 7,
    piotroskiFStatus: "Yaxşı", // 7-9 = Yaxşı
    workingCapital: 35.2, // $B
    freeCashFlow: 102.4, // $B
    metrics: [
        { name: "Current Ratio", value: "1.07", status: "yaxşı", description: "Qısamüddətli öhdəlikləri ödəmə qabiliyyəti" },
        { name: "Quick Ratio", value: "0.98", status: "orta", description: "İnventar olmadan likvidlik" },
        { name: "Debt/Equity", value: "1.51", status: "orta", description: "Borc səviyyəsi - sənaye normasında" },
        { name: "Interest Coverage", value: "28.4x", status: "əla", description: "Faiz ödəmə qabiliyyəti - çox güclü" },
    ],
    summary: "Apple maliyyə cəhətdən çox sağlam şirkətdir. Altman Z-Score iflas riskinin olmadığını göstərir."
};

// Insider & Institutional data
const insiderData = {
    netActivity3m: -2.1, // $M, negative = net selling
    netActivity12m: -8.5,
    ceoActivity: "Satış yoxdur",
    cfoActivity: "$500K satış",
    insiderOwnership: 0.07, // %
    recentTransactions: [
        { name: "Luca Maestri", role: "CFO", type: "Satış", amount: 500000, date: "15 Dec" },
        { name: "Jeff Williams", role: "COO", type: "Satış", amount: 320000, date: "10 Dec" },
    ],
    institutional: {
        ownership: 73,
        trend: 1.2, // % change last quarter
        topHolders: [
            { name: "Vanguard", shares: "8.1%", change: "+0.2%" },
            { name: "BlackRock", shares: "6.5%", change: "+0.1%" },
            { name: "Berkshire", shares: "5.8%", change: "0%" },
        ]
    },
    summary: "İnsayderlər son 3 ayda $2.1M net satış edib - bu böyük şirkətlər üçün normaldır. İnstitutlar mövqelərini artırır."
};

// Monte Carlo Simulation Data
const monteCarloData = {
    simulations: 10000,
    timeHorizon: "12 ay",
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
    explanation: "Monte Carlo simulyasiyası 10,000 fərqli bazar ssenarisi yaradır. Hər simulyasiyada təsadüfi volatillik, trend və xəbər hadisələri nəzərə alınır. Nəticədə qiymət diapazonları və ehtimalları əldə edilir ki, bu da investorlara daha yaxşı risk qiymətləndirməsinə imkan verir."
};

const monteCarloChartData = [
    { month: "Yan", p10: 185, p25: 192, p50: 200, p75: 208, p90: 218 },
    { month: "Fev", p10: 180, p25: 190, p50: 202, p75: 215, p90: 228 },
    { month: "Mar", p10: 175, p25: 188, p50: 205, p75: 222, p90: 238 },
    { month: "Apr", p10: 172, p25: 186, p50: 208, p75: 228, p90: 245 },
    { month: "May", p10: 170, p25: 185, p50: 210, p75: 232, p90: 250 },
    { month: "İyn", p10: 168, p25: 184, p50: 212, p75: 236, p90: 255 },
    { month: "İyl", p10: 166, p25: 183, p50: 215, p75: 240, p90: 258 },
    { month: "Avq", p10: 168, p25: 185, p50: 218, p75: 242, p90: 260 },
    { month: "Sen", p10: 170, p25: 188, p50: 220, p75: 245, p90: 262 },
    { month: "Okt", p10: 172, p25: 190, p50: 222, p75: 248, p90: 265 },
    { month: "Noy", p10: 175, p25: 193, p50: 225, p75: 250, p90: 268 },
    { month: "Dek", p10: 178, p25: 198, p50: 228, p75: 255, p90: 272 },
];

// Forecast Data
const forecastData = {
    shortTerm: {
        period: "1-3 ay",
        outlook: "Bullish",
        confidence: 78,
        targetRange: "$205 - $225",
        drivers: ["iPhone 16 Pro satışları güclüdür", "Services segmenti 15%+ artım", "Bayram mövsümü gözləntiləri yüksəkdir"],
        risks: ["Çin bazarında rəqabət", "Fed faiz qərarları"],
    },
    mediumTerm: {
        period: "3-12 ay",
        outlook: "Ehtiyatlı Bullish",
        confidence: 65,
        targetRange: "$215 - $260",
        drivers: ["Vision Pro 2.0 buraxılışı", "AI funksiyalarının genişlənməsi", "$90B geri alım proqramı"],
        risks: ["Makroiqtisadi qeyri-müəyyənlik", "Tənzimləyici təzyiqlər"],
    },
    longTerm: {
        period: "1-3 il",
        outlook: "Strong Buy",
        confidence: 82,
        targetRange: "$280 - $350",
        drivers: ["AI ekosistemi inteqrasiyası", "AR/VR bazar lideri potensialı", "Healthcare sahəsinə giriş", "India istehsalının genişlənməsi"],
        risks: ["İnnovasiya tempi", "Rəhbərlik dəyişikliyi riski"],
    },
};

// Yekun Qərar (Final Decision) Data
const finalDecision = {
    overallSignal: "STRONG BUY",
    confidenceScore: 87,
    keyFindings: [
        { text: "Fundamental sağlamlıq skoru 85/100", positive: true },
        { text: "Güclü pul axını: $102.4B", positive: true },
        { text: "ROE 147% - sənaye lideri", positive: true },
        { text: "P/E 28x - bir qədər premium", positive: false },
        { text: "Makro mühit qeyri-müəyyən", positive: false },
        { text: "Services segmenti sürətlə böyüyür", positive: true },
    ],
    expectations: [
        "12 ayda +8-23% potensial return",
        "Monte Carlo median hədəf: $218",
        "Fair value: $215 (DCF modelinə görə)",
        "Win rate: 82% (oxşar vəziyyətlərdə)",
    ],
    recommendations: [
        { type: "Aqressiv", action: "Tam mövqe indi al", allocation: "5-7%" },
        { type: "Mühafizəkar", action: "50% indi, 50% pullback-də", allocation: "3-5%" },
        { type: "Ehtiyatlı", action: "$190-a çəkilməni gözlə", allocation: "2-3%" },
    ],
    riskLevel: "Orta",
    timeHorizon: "12-24 ay",
    whatHappened: [
        "Son rübdə gəlir +5% artıb",
        "Services segmenti rekord səviyyədə",
        "Çin satışları gözləntini aşıb",
        "AI strategiyası açıqlanıb",
    ],
    futureOutlook: [
        "2024-cü ildə faiz endirmələri gözlənilir",
        "iPhone 16 upgrade dövrü başlayır",
        "Vision Pro genişlənməsi planlaşdırılır",
        "Hindistan bazarında genişlənmə",
    ],
};

export default function FundamentalPage() {
    const [searchQuery, setSearchQuery] = useState("AAPL");
    const [showAiExplanation, setShowAiExplanation] = useState(false);
    const [selectedReason, setSelectedReason] = useState<number | null>(null);
    const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
    const [selectedRisk, setSelectedRisk] = useState<string | null>(null);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    return (
        <div className="min-h-screen" style={{ backgroundColor: palette.bg }}>
            {/* Header */}
            <header
                className="sticky top-0 z-50 border-b backdrop-blur-xl"
                style={{ backgroundColor: `${palette.card}ee`, borderColor: palette.border }}
            >
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: `linear-gradient(135deg, ${palette.success}, ${palette.primary})` }}
                            >
                                <Sparkles size={20} color="#fff" />
                            </div>
                            <div>
                                <p className="font-bold text-lg" style={{ color: palette.text }}>AI Invest</p>
                                <p className="text-xs" style={{ color: palette.textSecondary }}>FUNDAMENTAL TƏHLİL</p>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="flex-1 max-w-md mx-8">
                            <div
                                className="flex items-center gap-2 px-4 py-2 rounded-xl"
                                style={{ backgroundColor: palette.bg, border: `1px solid ${palette.border}` }}
                            >
                                <Search size={18} style={{ color: palette.textSecondary }} />
                                <input
                                    type="text"
                                    placeholder="Şirkət simvolunu daxil edin (AAPL, MSFT, SOCAR)..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-1 bg-transparent outline-none text-sm"
                                    style={{ color: palette.text }}
                                />
                                <kbd className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: palette.card, color: palette.textSecondary }}>⌘K</kbd>
                            </div>
                        </div>

                        {/* User */}
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-sm font-semibold" style={{ color: palette.text }}>Analyst Pro</p>
                                <p className="text-xs" style={{ color: palette.textSecondary }}>✨ Premium Plan</p>
                            </div>
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center"
                                style={{ background: `linear-gradient(135deg, ${palette.accent}, ${palette.primary})` }}
                            >
                                <span className="text-white font-bold">A</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Layout with Sidebar */}
            <div className="flex flex-col lg:flex-row">
                {/* Main Content */}
                <main className="flex-1 px-3 lg:px-4 py-4 space-y-4 overflow-x-hidden">
                    {/* Hero Section - Instrument Chart & Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-3"
                    >
                        {/* Left - Instrument Info */}
                        <div
                            className="lg:col-span-1 p-3 lg:p-4 rounded-2xl"
                            style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}
                        >
                            {/* Symbol & Name */}
                            <div className="flex items-center gap-2 mb-3">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold"
                                    style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`, color: '#fff' }}
                                >
                                    {instrumentInfo.symbol.charAt(0)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-xl font-bold" style={{ color: palette.text }}>{instrumentInfo.symbol}</h2>
                                        <Badge style={{ backgroundColor: palette.primaryLight, color: palette.primary }}>{instrumentInfo.exchange}</Badge>
                                    </div>
                                    <p className="text-sm" style={{ color: palette.textSecondary }}>{instrumentInfo.name}</p>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="mb-3">
                                <div className="flex items-baseline gap-2 flex-wrap">
                                    <span className="text-2xl font-bold" style={{ color: palette.text }}>${instrumentInfo.price}</span>
                                    <span
                                        className="text-sm font-semibold"
                                        style={{ color: instrumentInfo.change >= 0 ? palette.success : palette.danger }}
                                    >
                                        {instrumentInfo.change >= 0 ? '+' : ''}{instrumentInfo.change} ({instrumentInfo.changePercent}%)
                                    </span>
                                </div>
                            </div>
                            {/* Key Stats Grid */}
                            <div className="grid grid-cols-2 gap-1.5 mb-3">
                                <div className="p-2 rounded-lg" style={{ backgroundColor: palette.bg }}>
                                    <div className="text-xs" style={{ color: palette.textSecondary }}>Açılış</div>
                                    <div className="text-sm font-semibold" style={{ color: palette.text }}>${instrumentInfo.open}</div>
                                </div>
                                <div className="p-2 rounded-lg" style={{ backgroundColor: palette.bg }}>
                                    <div className="text-xs" style={{ color: palette.textSecondary }}>Əvvəlki Bağ.</div>
                                    <div className="text-sm font-semibold" style={{ color: palette.text }}>${instrumentInfo.prevClose}</div>
                                </div>
                                <div className="p-2 rounded-lg" style={{ backgroundColor: palette.bg }}>
                                    <div className="text-xs" style={{ color: palette.textSecondary }}>Gün Max</div>
                                    <div className="text-sm font-semibold" style={{ color: palette.success }}>${instrumentInfo.high}</div>
                                </div>
                                <div className="p-2 rounded-lg" style={{ backgroundColor: palette.bg }}>
                                    <div className="text-xs" style={{ color: palette.textSecondary }}>Gün Min</div>
                                    <div className="text-sm font-semibold" style={{ color: palette.danger }}>${instrumentInfo.low}</div>
                                </div>
                                <div className="p-2 rounded-lg" style={{ backgroundColor: palette.bg }}>
                                    <div className="text-xs" style={{ color: palette.textSecondary }}>Həcm</div>
                                    <div className="text-sm font-semibold" style={{ color: palette.text }}>{instrumentInfo.volume}</div>
                                </div>
                                <div className="p-2 rounded-lg" style={{ backgroundColor: palette.bg }}>
                                    <div className="text-xs" style={{ color: palette.textSecondary }}>Ort. Həcm</div>
                                    <div className="text-sm font-semibold" style={{ color: palette.text }}>{instrumentInfo.avgVolume}</div>
                                </div>
                            </div>

                            {/* More Stats */}
                            <div className="space-y-1 pt-2 border-t" style={{ borderColor: palette.border }}>
                                <div className="flex justify-between text-xs">
                                    <span style={{ color: palette.textSecondary }}>Bazar Dəy.</span>
                                    <span className="font-semibold" style={{ color: palette.text }}>${instrumentInfo.marketCap}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span style={{ color: palette.textSecondary }}>P/E</span>
                                    <span className="font-semibold" style={{ color: palette.text }}>{instrumentInfo.pe}x</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span style={{ color: palette.textSecondary }}>EPS</span>
                                    <span className="font-semibold" style={{ color: palette.text }}>${instrumentInfo.eps}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span style={{ color: palette.textSecondary }}>Div. Gəliri</span>
                                    <span className="font-semibold" style={{ color: palette.success }}>{instrumentInfo.dividendYield}%</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span style={{ color: palette.textSecondary }}>52H</span>
                                    <span className="font-semibold" style={{ color: palette.text }}>${instrumentInfo.week52Low}-${instrumentInfo.week52High}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span style={{ color: palette.textSecondary }}>Beta</span>
                                    <span className="font-semibold" style={{ color: palette.text }}>{instrumentInfo.beta}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right - Price Chart */}
                        <div
                            className="lg:col-span-2 p-3 lg:p-4 rounded-2xl"
                            style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}
                        >
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                                <div className="flex items-center gap-2">
                                    <Activity size={20} style={{ color: palette.primary }} />
                                    <h3 className="text-lg font-bold" style={{ color: palette.text }}>Qiymət Qrafiki</h3>
                                </div>
                                <div className="flex gap-1 flex-wrap">
                                    {['1G', '1H', '1A', '3A', '1İ', 'YTD'].map((period, i) => (
                                        <button
                                            key={period}
                                            className="px-2 py-1 rounded-lg text-xs font-medium transition-colors"
                                            style={{
                                                backgroundColor: i === 2 ? `${palette.primary}22` : 'transparent',
                                                color: i === 2 ? palette.primary : palette.textSecondary,
                                                border: `1px solid ${i === 2 ? palette.primary : palette.border}`
                                            }}
                                        >
                                            {period}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Chart */}
                            <div className="h-40 sm:h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={priceChartData} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={palette.success} stopOpacity={0.4} />
                                                <stop offset="95%" stopColor={palette.success} stopOpacity={0.05} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke={palette.border} opacity={0.5} />
                                        <XAxis dataKey="date" stroke={palette.textSecondary} style={{ fontSize: 9 }} tickLine={false} axisLine={false} interval={3} />
                                        <YAxis stroke={palette.textSecondary} style={{ fontSize: 9 }} domain={[185, 205]} tickLine={false} axisLine={false} tickCount={5} />
                                        <RechartsTooltip
                                            contentStyle={{
                                                backgroundColor: palette.card,
                                                border: `1px solid ${palette.border}`,
                                                borderRadius: "8px",
                                            }}
                                            formatter={(value: number) => [`$${value}`, "Qiymət"]}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="price"
                                            stroke={palette.success}
                                            strokeWidth={2}
                                            fill="url(#priceGradient)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            {/* AI Recommendation */}
                            <div
                                className="mt-3 p-2 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-2"
                                style={{ background: `linear-gradient(135deg, ${palette.successLight}, ${palette.card})`, border: `1px solid ${palette.success}33` }}
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: palette.success }}
                                    >
                                        <TrendingUp size={20} color="#fff" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-bold" style={{ color: palette.success }}>AL</span>
                                            <Badge style={{ backgroundColor: palette.success, color: "#fff" }}>Strong Buy</Badge>
                                        </div>
                                        <p className="text-xs" style={{ color: palette.textSecondary }}>Güclü fundamental + məqbul risk</p>
                                    </div>
                                </div>
                                <div className="text-center sm:text-right">
                                    <p className="text-xs" style={{ color: palette.textSecondary }}>AI İnam</p>
                                    <p className="text-2xl font-bold" style={{ color: palette.success }}>87%</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Company Info Section - Şirkət haqqında */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="p-6 rounded-2xl"
                        style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})` }}
                                >
                                    <Building2 size={20} color="#fff" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold" style={{ color: palette.text }}>Şirkət Haqqında</h3>
                                    <p className="text-xs" style={{ color: palette.textSecondary }}>{instrumentInfo.name} • {instrumentInfo.industry}</p>
                                </div>
                            </div>
                            <Badge style={{ backgroundColor: palette.primaryLight, color: palette.primary }}>{instrumentInfo.sector}</Badge>
                        </div>

                        {/* Main Description */}
                        <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: palette.bg }}>
                            <p className="text-sm leading-relaxed" style={{ color: palette.textSecondary }}>
                                {companyInfo.description_full}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            {/* Column 1 - Key Info */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-semibold" style={{ color: palette.text }}>Əsas Məlumatlar</h4>
                                <div className="space-y-3">
                                    <div className="p-3 rounded-xl" style={{ backgroundColor: palette.bg }}>
                                        <p className="text-xs" style={{ color: palette.textSecondary }}>CEO</p>
                                        <p className="text-base font-semibold" style={{ color: palette.text }}>{companyInfo.ceo}</p>
                                    </div>
                                    <div className="p-3 rounded-xl" style={{ backgroundColor: palette.bg }}>
                                        <p className="text-xs" style={{ color: palette.textSecondary }}>İşçi Sayı</p>
                                        <p className="text-base font-semibold" style={{ color: palette.text }}>{companyInfo.employees}</p>
                                    </div>
                                    <div className="p-3 rounded-xl" style={{ backgroundColor: palette.bg }}>
                                        <p className="text-xs" style={{ color: palette.textSecondary }}>Qurulma İli</p>
                                        <p className="text-base font-semibold" style={{ color: palette.text }}>{companyInfo.founded}</p>
                                    </div>
                                    <div className="p-3 rounded-xl" style={{ backgroundColor: palette.bg }}>
                                        <p className="text-xs" style={{ color: palette.textSecondary }}>Baş Ofis</p>
                                        <p className="text-sm font-semibold" style={{ color: palette.text }}>{companyInfo.headquarters}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Column 2 - Products */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-semibold" style={{ color: palette.text }}>Əsas Məhsullar</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {companyInfo.keyProducts.map((product, idx) => (
                                        <div
                                            key={idx}
                                            className="p-3 rounded-xl text-center"
                                            style={{ backgroundColor: `${idx % 2 === 0 ? palette.primary : palette.accent}12` }}
                                        >
                                            <span className="text-sm font-medium" style={{ color: idx % 2 === 0 ? palette.primary : palette.accent }}>{product}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 rounded-xl flex items-center justify-between" style={{ backgroundColor: palette.bg }}>
                                    <div>
                                        <p className="text-xs" style={{ color: palette.textSecondary }}>Vebsayt</p>
                                        <p className="text-sm font-semibold" style={{ color: palette.primary }}>{companyInfo.website}</p>
                                    </div>
                                    <ExternalLink size={16} style={{ color: palette.primary }} />
                                </div>
                            </div>

                            {/* Column 3 & 4 - Revenue Breakdown */}
                            <div className="lg:col-span-2 space-y-4">
                                <h4 className="text-sm font-semibold" style={{ color: palette.text }}>Gəlir Paylanması</h4>
                                <div className="p-4 rounded-xl" style={{ backgroundColor: palette.bg }}>
                                    <div className="space-y-4">
                                        {companyInfo.revenueBreakdown.map((item, idx) => (
                                            <div key={idx}>
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-sm" style={{ color: palette.text }}>{item.segment}</span>
                                                    <span className="text-sm font-bold" style={{ color: idx === 0 ? palette.success : idx === 1 ? palette.primary : idx === 2 ? palette.accent : palette.warning }}>{item.percent}%</span>
                                                </div>
                                                <div className="h-3 rounded-full" style={{ backgroundColor: `${palette.primary}15` }}>
                                                    <div
                                                        className="h-full rounded-full transition-all"
                                                        style={{
                                                            width: `${item.percent}%`,
                                                            background: idx === 0
                                                                ? `linear-gradient(90deg, ${palette.success}, ${palette.success}88)`
                                                                : idx === 1
                                                                    ? `linear-gradient(90deg, ${palette.primary}, ${palette.primary}88)`
                                                                    : idx === 2
                                                                        ? `linear-gradient(90deg, ${palette.accent}, ${palette.accent}88)`
                                                                        : `linear-gradient(90deg, ${palette.warning}, ${palette.warning}88)`
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Key Financial Metrics */}
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="p-3 rounded-xl text-center" style={{ backgroundColor: palette.bg }}>
                                        <p className="text-xs mb-1" style={{ color: palette.textSecondary }}>Bazar Dəyəri</p>
                                        <p className="text-lg font-bold" style={{ color: palette.success }}>${instrumentInfo.marketCap}</p>
                                    </div>
                                    <div className="p-3 rounded-xl text-center" style={{ backgroundColor: palette.bg }}>
                                        <p className="text-xs mb-1" style={{ color: palette.textSecondary }}>P/E Nisbəti</p>
                                        <p className="text-lg font-bold" style={{ color: palette.primary }}>{instrumentInfo.pe}x</p>
                                    </div>
                                    <div className="p-3 rounded-xl text-center" style={{ backgroundColor: palette.bg }}>
                                        <p className="text-xs mb-1" style={{ color: palette.textSecondary }}>Dividend</p>
                                        <p className="text-lg font-bold" style={{ color: palette.accent }}>{instrumentInfo.dividendYield}%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left: Canlı Analiz */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="p-6 rounded-2xl"
                            style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: palette.success }} />
                                <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: palette.textSecondary }}>Canlı Analiz</span>
                            </div>

                            <div className="flex items-center gap-2 mb-6">
                                <h2 className="text-2xl font-bold" style={{ color: palette.text }}>Apple Inc.</h2>
                                <Badge style={{ backgroundColor: palette.primaryLight, color: palette.primary }}>AAPL</Badge>
                            </div>

                            <p className="text-sm mb-6" style={{ color: palette.textSecondary }}>
                                ⚡ Fundamental Sağlamlıq Skoru
                            </p>

                            {/* Gauge */}
                            <div className="flex flex-col items-center mb-6">
                                <div className="relative w-48 h-24 overflow-hidden">
                                    <svg viewBox="0 0 200 100" className="w-full h-full">
                                        {/* Background arc */}
                                        <path
                                            d="M 20 100 A 80 80 0 0 1 180 100"
                                            fill="none"
                                            stroke="#E5E7EB"
                                            strokeWidth="16"
                                            strokeLinecap="round"
                                        />
                                        {/* Colored arc - 85% */}
                                        <path
                                            d="M 20 100 A 80 80 0 0 1 180 100"
                                            fill="none"
                                            stroke="url(#gaugeGradient)"
                                            strokeWidth="16"
                                            strokeLinecap="round"
                                            strokeDasharray="251.2"
                                            strokeDashoffset="37.68"
                                        />
                                        <defs>
                                            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor={palette.primary} />
                                                <stop offset="100%" stopColor={palette.success} />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
                                        <span className="text-5xl font-bold" style={{ color: palette.text }}>85</span>
                                        <span className="text-sm" style={{ color: palette.textSecondary }}>/ 100 xal</span>
                                    </div>
                                </div>
                                <div
                                    className="mt-4 px-4 py-2 rounded-lg font-bold"
                                    style={{ backgroundColor: palette.successLight, color: palette.success }}
                                >
                                    ÇOX GÜCLÜ
                                </div>
                            </div>

                            {/* Score Trend Chart */}
                            <div className="mb-4">
                                <p className="text-xs mb-2" style={{ color: palette.textSecondary }}>📈 Son 12 ay skor trendi</p>
                                <div className="h-24">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={[
                                            { month: "Yan", score: 72 },
                                            { month: "Fev", score: 74 },
                                            { month: "Mar", score: 71 },
                                            { month: "Apr", score: 76 },
                                            { month: "May", score: 78 },
                                            { month: "İyn", score: 80 },
                                            { month: "İyl", score: 79 },
                                            { month: "Avq", score: 82 },
                                            { month: "Sen", score: 81 },
                                            { month: "Okt", score: 83 },
                                            { month: "Noy", score: 84 },
                                            { month: "Dek", score: 85 },
                                        ]}>
                                            <defs>
                                                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor={palette.success} stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor={palette.success} stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis dataKey="month" hide />
                                            <YAxis domain={[60, 100]} hide />
                                            <RechartsTooltip
                                                contentStyle={{
                                                    backgroundColor: palette.card,
                                                    border: `1px solid ${palette.border}`,
                                                    borderRadius: "8px",
                                                    fontSize: 12
                                                }}
                                                formatter={(value: number) => [`${value} xal`, "Skor"]}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="score"
                                                stroke={palette.success}
                                                strokeWidth={2}
                                                fill="url(#scoreGradient)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex justify-between text-xs mt-1" style={{ color: palette.textSecondary }}>
                                    <span>Yan</span>
                                    <span className="font-semibold" style={{ color: palette.success }}>+13 xal artım</span>
                                    <span>Dek</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-2 pt-4 border-t" style={{ borderColor: palette.border }}>
                                <Info size={16} style={{ color: palette.textSecondary }} />
                                <span className="text-sm" style={{ color: palette.textSecondary }}>Model Etibarlılığı:</span>
                                <span className="text-sm font-bold" style={{ color: palette.success }}>94%</span>
                            </div>
                        </motion.div>

                        {/* Right: AI Analiz */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="p-6 rounded-2xl"
                            style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: palette.success }} />
                                    <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: palette.textSecondary }}>AI Analiz</span>
                                </div>
                                <Badge style={{ backgroundColor: palette.successLight, color: palette.success }}>
                                    <Sparkles size={12} className="mr-1" /> AI Powered
                                </Badge>
                            </div>

                            <h3 className="text-xl font-bold mb-2" style={{ color: palette.text }}>Skorun Əsas Səbəbləri</h3>
                            <p className="text-sm mb-4" style={{ color: palette.textSecondary }}>Random Forest modeli ilə təhlil</p>

                            <div className="space-y-3">
                                {scoreReasons.map((reason) => (
                                    <div key={reason.id}>
                                        <div
                                            onClick={() => setSelectedReason(selectedReason === reason.id ? null : reason.id)}
                                            className="flex items-center justify-between p-3 rounded-xl transition-all hover:translate-x-1 cursor-pointer"
                                            style={{
                                                backgroundColor: `${reason.color}11`,
                                                border: `1px solid ${selectedReason === reason.id ? reason.color : `${reason.color}22`}`,
                                                boxShadow: selectedReason === reason.id ? `0 0 15px ${reason.color}22` : 'none'
                                            }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                                    style={{ backgroundColor: `${reason.color}22` }}
                                                >
                                                    {reason.score > 0 ?
                                                        <TrendingUp size={20} style={{ color: reason.color }} /> :
                                                        <TrendingDown size={20} style={{ color: reason.color }} />
                                                    }
                                                </div>
                                                <div>
                                                    <p className="font-semibold" style={{ color: palette.text }}>{reason.label}</p>
                                                    <p className="text-xs" style={{ color: palette.textSecondary }}>{reason.sublabel}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className="font-bold"
                                                    style={{ color: reason.color }}
                                                >
                                                    {reason.score > 0 ? "+" : ""}{reason.score}
                                                </span>
                                                <motion.div
                                                    animate={{ rotate: selectedReason === reason.id ? 90 : 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <ChevronRight size={16} style={{ color: palette.textSecondary }} />
                                                </motion.div>
                                            </div>
                                        </div>

                                        {/* Expanded Details */}
                                        {selectedReason === reason.id && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="mt-2 p-4 rounded-xl"
                                                style={{
                                                    backgroundColor: palette.bg,
                                                    border: `1px solid ${reason.color}33`
                                                }}
                                            >
                                                {/* Header */}
                                                <div className="flex items-center justify-between mb-4">
                                                    <div>
                                                        <h4 className="font-bold" style={{ color: palette.text }}>{reason.details.title}</h4>
                                                        <p className="text-xs" style={{ color: palette.textSecondary }}>{reason.details.description}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-2xl font-bold" style={{ color: reason.color }}>{reason.details.value}</p>
                                                        <p className="text-xs" style={{ color: palette.success }}>{reason.details.trend}</p>
                                                    </div>
                                                </div>

                                                {/* Metrics Grid */}
                                                <div className="grid grid-cols-2 gap-2 mb-3">
                                                    {reason.details.metrics.map((metric, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="p-2 rounded-lg flex items-center justify-between"
                                                            style={{ backgroundColor: palette.card }}
                                                        >
                                                            <span className="text-xs" style={{ color: palette.textSecondary }}>{metric.label}</span>
                                                            <span
                                                                className="text-sm font-semibold"
                                                                style={{
                                                                    color: metric.status === "excellent" ? palette.success :
                                                                        metric.status === "good" ? palette.primary :
                                                                            metric.status === "warning" ? palette.warning : palette.textSecondary
                                                                }}
                                                            >
                                                                {metric.value}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Insight */}
                                                <div
                                                    className="p-3 rounded-lg flex items-start gap-2"
                                                    style={{ backgroundColor: `${reason.color}11`, border: `1px solid ${reason.color}22` }}
                                                >
                                                    <Zap size={14} style={{ color: reason.color, marginTop: 2 }} />
                                                    <p className="text-xs" style={{ color: palette.text }}>{reason.details.insight}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div
                                className="mt-4 p-3 rounded-xl"
                                style={{ backgroundColor: palette.primaryLight, border: `1px solid ${palette.primary}22` }}
                            >
                                <p className="text-sm" style={{ color: palette.text }}>
                                    <strong>Ümumi Qiymət:</strong> Fundamental göstəricilər güclü vəziyyətdədir. Makro mühit təsiri məhduddur.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* AI İzahı Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-6 rounded-2xl"
                        style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: palette.primaryLight }}
                                >
                                    <Brain size={20} style={{ color: palette.primary }} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: palette.success }} />
                                        <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: palette.textSecondary }}>AI İzahı</span>
                                    </div>
                                    <h3 className="text-xl font-bold" style={{ color: palette.text }}>AI Niyə Bu Qərarı Verdi?</h3>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => setShowAiExplanation(!showAiExplanation)}
                                style={{ borderColor: palette.primary, color: palette.primary }}
                            >
                                <Sparkles size={16} className="mr-2" />
                                Explainable AI
                            </Button>
                        </div>

                        {/* Three Analysis Cards */}
                        <div className="grid grid-cols-3 gap-4">
                            {/* Makro Mühit */}
                            <div
                                className="p-4 rounded-xl cursor-pointer transition-all hover:shadow-lg"
                                onClick={() => setExpandedSection(expandedSection === "macro" ? null : "macro")}
                                style={{
                                    backgroundColor: palette.bg,
                                    border: `1px solid ${expandedSection === "macro" ? palette.warning : palette.border}`,
                                    boxShadow: expandedSection === "macro" ? `0 0 15px ${palette.warning}22` : 'none'
                                }}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <Globe size={18} style={{ color: palette.warning }} />
                                        <span className="font-semibold" style={{ color: palette.text }}>Makro Mühit</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge style={{ backgroundColor: palette.warningLight, color: palette.warning }}>
                                            AI: {macroData.aiScore}%
                                        </Badge>
                                        <motion.div animate={{ rotate: expandedSection === "macro" ? 90 : 0 }}>
                                            <ChevronRight size={14} style={{ color: palette.textSecondary }} />
                                        </motion.div>
                                    </div>
                                </div>
                                <p className="text-xs uppercase mb-3" style={{ color: palette.textSecondary }}>ARIMA MODEL</p>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs" style={{ color: palette.textSecondary }}>GDP Artımı</span>
                                        <span className="text-sm font-bold" style={{ color: palette.text }}>{macroData.gdpGrowth}% <span className="text-xs" style={{ color: palette.success }}>+{macroData.gdpChange}%</span></span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs" style={{ color: palette.textSecondary }}>İnflyasiya</span>
                                        <span className="text-sm font-bold" style={{ color: palette.text }}>{macroData.inflation}% <span className="text-xs" style={{ color: palette.success }}>{macroData.inflationChange}%</span></span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs" style={{ color: palette.textSecondary }}>Faiz Dərəcəsi</span>
                                        <span className="text-sm font-bold" style={{ color: palette.text }}>{macroData.interestRate}%</span>
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="mt-3 pt-3 border-t" style={{ borderColor: palette.border }}>
                                    <p className="text-xs" style={{ color: palette.textSecondary }}>{macroData.summary}</p>
                                </div>

                                {/* Expanded Details */}
                                {expandedSection === "macro" && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="mt-3 space-y-3"
                                    >
                                        <div className="p-3 rounded-lg" style={{ backgroundColor: palette.card }}>
                                            <p className="text-xs font-bold mb-1" style={{ color: palette.warning }}>{macroData.explanations.gdp.title}</p>
                                            <p className="text-xs mb-1" style={{ color: palette.textSecondary }}>{macroData.explanations.gdp.text}</p>
                                            <p className="text-xs" style={{ color: palette.success }}>→ {macroData.explanations.gdp.impact}</p>
                                        </div>
                                        <div className="p-3 rounded-lg" style={{ backgroundColor: palette.card }}>
                                            <p className="text-xs font-bold mb-1" style={{ color: palette.warning }}>{macroData.explanations.inflation.title}</p>
                                            <p className="text-xs mb-1" style={{ color: palette.textSecondary }}>{macroData.explanations.inflation.text}</p>
                                            <p className="text-xs" style={{ color: palette.success }}>→ {macroData.explanations.inflation.impact}</p>
                                        </div>
                                        <div className="p-3 rounded-lg" style={{ backgroundColor: palette.card }}>
                                            <p className="text-xs font-bold mb-1" style={{ color: palette.warning }}>{macroData.explanations.interest.title}</p>
                                            <p className="text-xs mb-1" style={{ color: palette.textSecondary }}>{macroData.explanations.interest.text}</p>
                                            <p className="text-xs" style={{ color: palette.success }}>→ {macroData.explanations.interest.impact}</p>
                                        </div>
                                        <div className="p-3 rounded-lg" style={{ backgroundColor: palette.warningLight, border: `1px solid ${palette.warning}33` }}>
                                            <div className="flex items-start gap-2">
                                                <Sparkles size={14} style={{ color: palette.warning, marginTop: 2 }} />
                                                <div>
                                                    <p className="text-xs font-bold" style={{ color: palette.text }}>AI Tövsiyəsi</p>
                                                    <p className="text-xs" style={{ color: palette.textSecondary }}>{macroData.recommendation}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Sektor Analizi */}
                            <div
                                className="p-4 rounded-xl cursor-pointer transition-all hover:shadow-lg"
                                onClick={() => setExpandedSection(expandedSection === "sector" ? null : "sector")}
                                style={{
                                    backgroundColor: palette.bg,
                                    border: `1px solid ${expandedSection === "sector" ? palette.success : palette.border}`,
                                    boxShadow: expandedSection === "sector" ? `0 0 15px ${palette.success}22` : 'none'
                                }}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <BarChart3 size={18} style={{ color: palette.success }} />
                                        <span className="font-semibold" style={{ color: palette.text }}>Sektor Analizi</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge style={{ backgroundColor: palette.successLight, color: palette.success }}>
                                            AI: {sectorData.aiScore}%
                                        </Badge>
                                        <motion.div animate={{ rotate: expandedSection === "sector" ? 90 : 0 }}>
                                            <ChevronRight size={14} style={{ color: palette.textSecondary }} />
                                        </motion.div>
                                    </div>
                                </div>
                                <p className="text-xs uppercase mb-3" style={{ color: palette.textSecondary }}>TEXNOLOGIYA</p>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs" style={{ color: palette.textSecondary }}>Trend</span>
                                        <span className="text-sm font-bold" style={{ color: palette.success }}>{sectorData.trend}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs" style={{ color: palette.textSecondary }}>P/E</span>
                                        <span className="text-sm font-bold" style={{ color: palette.text }}>{sectorData.peRatio}x vs {sectorData.sectorPe}x</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs" style={{ color: palette.textSecondary }}>Premium</span>
                                        <span className="text-sm font-bold" style={{ color: palette.success }}>+{sectorData.premium}%</span>
                                    </div>
                                </div>

                                {/* Rəqabət bars */}
                                <div className="mt-3 pt-3 border-t" style={{ borderColor: palette.border }}>
                                    <p className="text-xs mb-2" style={{ color: palette.textSecondary }}>Rəqabət Gücü</p>
                                    <div className="flex gap-1">
                                        {sectorData.competitors.map((comp, i) => (
                                            <div key={comp} className="flex-1">
                                                <div
                                                    className="h-1.5 rounded-full mb-1"
                                                    style={{
                                                        backgroundColor: i === 0 ? palette.success : i === 1 ? palette.primary : palette.warning,
                                                        width: `${sectorData.competitorScores[i]}%`
                                                    }}
                                                />
                                                <p className="text-[10px] text-center" style={{ color: palette.textSecondary }}>{comp}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {expandedSection === "sector" && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="mt-3 space-y-3"
                                    >
                                        <div className="p-3 rounded-lg" style={{ backgroundColor: palette.card }}>
                                            <p className="text-xs font-bold mb-1" style={{ color: palette.success }}>{sectorData.explanations.trend.title}</p>
                                            <p className="text-xs mb-1" style={{ color: palette.textSecondary }}>{sectorData.explanations.trend.text}</p>
                                            <p className="text-xs" style={{ color: palette.success }}>→ {sectorData.explanations.trend.impact}</p>
                                        </div>
                                        <div className="p-3 rounded-lg" style={{ backgroundColor: palette.card }}>
                                            <p className="text-xs font-bold mb-1" style={{ color: palette.success }}>{sectorData.explanations.pe.title}</p>
                                            <p className="text-xs mb-1" style={{ color: palette.textSecondary }}>{sectorData.explanations.pe.text}</p>
                                            <p className="text-xs" style={{ color: palette.success }}>→ {sectorData.explanations.pe.impact}</p>
                                        </div>
                                        <div className="p-3 rounded-lg" style={{ backgroundColor: palette.card }}>
                                            <p className="text-xs font-bold mb-1" style={{ color: palette.success }}>{sectorData.explanations.competition.title}</p>
                                            <p className="text-xs mb-1" style={{ color: palette.textSecondary }}>{sectorData.explanations.competition.text}</p>
                                            <p className="text-xs" style={{ color: palette.success }}>→ {sectorData.explanations.competition.impact}</p>
                                        </div>
                                        <div className="p-3 rounded-lg" style={{ backgroundColor: palette.successLight, border: `1px solid ${palette.success}33` }}>
                                            <div className="flex items-start gap-2">
                                                <Sparkles size={14} style={{ color: palette.success, marginTop: 2 }} />
                                                <div>
                                                    <p className="text-xs font-bold" style={{ color: palette.text }}>AI Tövsiyəsi</p>
                                                    <p className="text-xs" style={{ color: palette.textSecondary }}>{sectorData.recommendation}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Şirkət Analizi */}
                            <div
                                className="p-4 rounded-xl cursor-pointer transition-all hover:shadow-lg"
                                onClick={() => setExpandedSection(expandedSection === "company" ? null : "company")}
                                style={{
                                    backgroundColor: palette.bg,
                                    border: `1px solid ${expandedSection === "company" ? palette.primary : palette.border}`,
                                    boxShadow: expandedSection === "company" ? `0 0 15px ${palette.primary}22` : 'none'
                                }}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <Building2 size={18} style={{ color: palette.primary }} />
                                        <span className="font-semibold" style={{ color: palette.text }}>Şirkət Analizi</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge style={{ backgroundColor: palette.primaryLight, color: palette.primary }}>
                                            AI: {companyData.aiScore}%
                                        </Badge>
                                        <motion.div animate={{ rotate: expandedSection === "company" ? 90 : 0 }}>
                                            <ChevronRight size={14} style={{ color: palette.textSecondary }} />
                                        </motion.div>
                                    </div>
                                </div>
                                <p className="text-xs uppercase mb-3" style={{ color: palette.textSecondary }}>AAPL</p>

                                <div className="grid grid-cols-2 gap-2 mb-3">
                                    <div className="p-2 rounded-lg" style={{ backgroundColor: palette.card }}>
                                        <span className="text-xs" style={{ color: palette.textSecondary }}>Revenue</span>
                                        <p className="font-bold" style={{ color: palette.success }}>+{companyData.revenue}%</p>
                                    </div>
                                    <div className="p-2 rounded-lg" style={{ backgroundColor: palette.card }}>
                                        <span className="text-xs" style={{ color: palette.textSecondary }}>Margin</span>
                                        <p className="font-bold" style={{ color: palette.success }}>{companyData.margin}%</p>
                                    </div>
                                    <div className="p-2 rounded-lg" style={{ backgroundColor: palette.card }}>
                                        <span className="text-xs" style={{ color: palette.textSecondary }}>Cash</span>
                                        <p className="font-bold" style={{ color: palette.text }}>{companyData.cash}</p>
                                    </div>
                                    <div className="p-2 rounded-lg" style={{ backgroundColor: palette.card }}>
                                        <span className="text-xs" style={{ color: palette.textSecondary }}>D/E</span>
                                        <p className="font-bold" style={{ color: palette.text }}>{companyData.deRatio}</p>
                                    </div>
                                </div>

                                <div className="flex justify-between pt-2 border-t" style={{ borderColor: palette.border }}>
                                    <div className="text-center">
                                        <p className="text-xs" style={{ color: palette.textSecondary }}>ROC</p>
                                        <p className="font-bold" style={{ color: palette.success }}>{companyData.roc}%</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs" style={{ color: palette.textSecondary }}>ROIC</p>
                                        <p className="font-bold" style={{ color: palette.success }}>{companyData.roic}%</p>
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {expandedSection === "company" && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="mt-3 space-y-3"
                                    >
                                        <div className="p-3 rounded-lg" style={{ backgroundColor: palette.card }}>
                                            <p className="text-xs font-bold mb-1" style={{ color: palette.primary }}>{companyData.explanations.revenue.title}</p>
                                            <p className="text-xs mb-1" style={{ color: palette.textSecondary }}>{companyData.explanations.revenue.text}</p>
                                            <p className="text-xs" style={{ color: palette.success }}>→ {companyData.explanations.revenue.impact}</p>
                                        </div>
                                        <div className="p-3 rounded-lg" style={{ backgroundColor: palette.card }}>
                                            <p className="text-xs font-bold mb-1" style={{ color: palette.primary }}>{companyData.explanations.margin.title}</p>
                                            <p className="text-xs mb-1" style={{ color: palette.textSecondary }}>{companyData.explanations.margin.text}</p>
                                            <p className="text-xs" style={{ color: palette.success }}>→ {companyData.explanations.margin.impact}</p>
                                        </div>
                                        <div className="p-3 rounded-lg" style={{ backgroundColor: palette.card }}>
                                            <p className="text-xs font-bold mb-1" style={{ color: palette.primary }}>{companyData.explanations.cash.title}</p>
                                            <p className="text-xs mb-1" style={{ color: palette.textSecondary }}>{companyData.explanations.cash.text}</p>
                                            <p className="text-xs" style={{ color: palette.success }}>→ {companyData.explanations.cash.impact}</p>
                                        </div>
                                        <div className="p-3 rounded-lg" style={{ backgroundColor: palette.card }}>
                                            <p className="text-xs font-bold mb-1" style={{ color: palette.primary }}>{companyData.explanations.ratios.title}</p>
                                            <p className="text-xs mb-1" style={{ color: palette.textSecondary }}>{companyData.explanations.ratios.text}</p>
                                            <p className="text-xs" style={{ color: palette.success }}>→ {companyData.explanations.ratios.impact}</p>
                                        </div>
                                        <div className="p-3 rounded-lg" style={{ backgroundColor: palette.primaryLight, border: `1px solid ${palette.primary}33` }}>
                                            <div className="flex items-start gap-2">
                                                <Sparkles size={14} style={{ color: palette.primary, marginTop: 2 }} />
                                                <div>
                                                    <p className="text-xs font-bold" style={{ color: palette.text }}>AI Tövsiyəsi</p>
                                                    <p className="text-xs" style={{ color: palette.textSecondary }}>{companyData.recommendation}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Scenario Analysis and Risk Matrix Row */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* Ssenari Analizi */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="p-6 rounded-2xl"
                            style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: palette.success }} />
                                <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: palette.textSecondary }}>Ssenari Analizi</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4" style={{ color: palette.text }}>Gələcək Ehtimalları</h3>

                            <div className="space-y-3">
                                {scenarios.map((scenario) => (
                                    <div key={scenario.type}>
                                        <div
                                            onClick={() => setSelectedScenario(selectedScenario === scenario.type ? null : scenario.type)}
                                            className="p-4 rounded-xl cursor-pointer transition-all hover:scale-[1.01]"
                                            style={{
                                                backgroundColor: `${scenario.color}08`,
                                                border: `1px solid ${selectedScenario === scenario.type ? scenario.color : `${scenario.color}33`}`,
                                                boxShadow: selectedScenario === scenario.type ? `0 0 20px ${scenario.color}22` : 'none'
                                            }}
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                {scenario.type === "Bull Case" && <TrendingUp size={16} style={{ color: scenario.color }} />}
                                                {scenario.type === "Base Case" && <Activity size={16} style={{ color: scenario.color }} />}
                                                {scenario.type === "Bear Case" && <TrendingDown size={16} style={{ color: scenario.color }} />}
                                                <span className="font-semibold text-sm" style={{ color: palette.text }}>{scenario.type}</span>
                                                <span className="ml-auto font-bold text-lg" style={{ color: scenario.color }}>{scenario.probability}%</span>
                                            </div>
                                            <div className="flex items-center gap-4 mb-3">
                                                <div>
                                                    <span className="text-xs" style={{ color: palette.textSecondary }}>Qiymət Hədəfi</span>
                                                    <p className="font-bold" style={{ color: scenario.color }}>{scenario.priceTarget}</p>
                                                </div>
                                                <div>
                                                    <span className="text-xs" style={{ color: palette.textSecondary }}>Potensial</span>
                                                    <p className="font-bold" style={{ color: scenario.color }}>{scenario.upside}</p>
                                                </div>
                                                <div>
                                                    <span className="text-xs" style={{ color: palette.textSecondary }}>Skor</span>
                                                    <p className="font-bold" style={{ color: scenario.color }}>{scenario.scoreRange}</p>
                                                </div>
                                                <motion.div
                                                    className="ml-auto"
                                                    animate={{ rotate: selectedScenario === scenario.type ? 90 : 0 }}
                                                >
                                                    <ChevronRight size={16} style={{ color: palette.textSecondary }} />
                                                </motion.div>
                                            </div>
                                            <div
                                                className="h-1.5 rounded-full"
                                                style={{ backgroundColor: `${scenario.color}22` }}
                                            >
                                                <div
                                                    className="h-full rounded-full"
                                                    style={{ width: `${scenario.probability}%`, backgroundColor: scenario.color }}
                                                />
                                            </div>
                                        </div>

                                        {/* Expanded Details */}
                                        {selectedScenario === scenario.type && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                className="mt-2 p-4 rounded-xl"
                                                style={{ backgroundColor: palette.bg, border: `1px solid ${scenario.color}22` }}
                                            >
                                                {/* Drivers */}
                                                <div className="mb-4">
                                                    <p className="text-xs font-semibold mb-2" style={{ color: palette.text }}>Əsas Amillər</p>
                                                    <div className="space-y-2">
                                                        {scenario.details.drivers.map((driver, idx) => (
                                                            <div key={idx} className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: palette.card }}>
                                                                <span className="text-xs" style={{ color: palette.textSecondary }}>{driver.factor}</span>
                                                                <div className="flex items-center gap-2">
                                                                    <Badge style={{
                                                                        backgroundColor: driver.impact === "Yüksək" ? palette.successLight : palette.warningLight,
                                                                        color: driver.impact === "Yüksək" ? palette.success : palette.warning
                                                                    }}>{driver.impact}</Badge>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Catalysts */}
                                                <div className="mb-4">
                                                    <p className="text-xs font-semibold mb-2" style={{ color: palette.text }}>Katalizatorlar</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {scenario.details.catalysts.map((cat, idx) => (
                                                            <span key={idx} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${scenario.color}11`, color: scenario.color }}>
                                                                {cat}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Footer */}
                                                <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: palette.border }}>
                                                    <div>
                                                        <span className="text-xs" style={{ color: palette.textSecondary }}>Zaman Çərçivəsi</span>
                                                        <p className="text-sm font-semibold" style={{ color: palette.text }}>{scenario.details.timeframe}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-xs" style={{ color: palette.textSecondary }}>AI Etibarlılığı</span>
                                                        <p className="text-sm font-bold" style={{ color: scenario.color }}>{scenario.details.confidence}%</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Risk Matrisi */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="p-6 rounded-2xl"
                            style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: palette.danger }} />
                                    <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: palette.textSecondary }}>Risk Qiymətləndirməsi</span>
                                </div>
                                <Badge style={{ backgroundColor: palette.warningLight, color: palette.warning }}>
                                    Ümumi Risk: {riskMatrix.overall} ({riskMatrix.overallScore}%)
                                </Badge>
                            </div>
                            <h3 className="text-xl font-bold mb-4" style={{ color: palette.text }}>Risk Matrisi</h3>

                            <div className="space-y-3 mb-4">
                                {riskMatrix.risks.map((risk) => (
                                    <div key={risk.name}>
                                        <div
                                            onClick={() => setSelectedRisk(selectedRisk === risk.name ? null : risk.name)}
                                            className="p-3 rounded-xl cursor-pointer transition-all hover:translate-x-1"
                                            style={{
                                                backgroundColor: `${risk.color}08`,
                                                border: `1px solid ${selectedRisk === risk.name ? risk.color : `${risk.color}22`}`,
                                                boxShadow: selectedRisk === risk.name ? `0 0 15px ${risk.color}22` : 'none'
                                            }}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <Shield size={14} style={{ color: risk.color }} />
                                                    <span className="text-sm font-semibold" style={{ color: palette.text }}>{risk.name}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Badge style={{ backgroundColor: `${risk.color}22`, color: risk.color }}>{risk.status}</Badge>
                                                    <span className="font-bold" style={{ color: risk.color }}>{risk.level}%</span>
                                                    <motion.div animate={{ rotate: selectedRisk === risk.name ? 90 : 0 }}>
                                                        <ChevronRight size={14} style={{ color: palette.textSecondary }} />
                                                    </motion.div>
                                                </div>
                                            </div>
                                            <div className="h-1.5 rounded-full" style={{ backgroundColor: `${risk.color}22` }}>
                                                <div className="h-full rounded-full" style={{ width: `${risk.level}%`, backgroundColor: risk.color }} />
                                            </div>
                                            <p className="text-xs mt-2" style={{ color: palette.textSecondary }}>{risk.description}</p>
                                        </div>

                                        {/* Expanded Details */}
                                        {selectedRisk === risk.name && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                className="mt-2 p-4 rounded-xl"
                                                style={{ backgroundColor: palette.bg, border: `1px solid ${risk.color}22` }}
                                            >
                                                {/* Sub-factors */}
                                                <div className="mb-4">
                                                    <p className="text-xs font-semibold mb-2" style={{ color: palette.text }}>Alt Faktorlar</p>
                                                    <div className="space-y-2">
                                                        {risk.details.subFactors.map((factor, idx) => (
                                                            <div key={idx} className="flex items-center justify-between">
                                                                <span className="text-xs" style={{ color: palette.textSecondary }}>{factor.name}</span>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-xs font-semibold" style={{ color: palette.text }}>{factor.value}</span>
                                                                    <div className="w-16 h-1.5 rounded-full" style={{ backgroundColor: `${risk.color}22` }}>
                                                                        <div className="h-full rounded-full" style={{ width: `${factor.impact}%`, backgroundColor: risk.color }} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Historical Range */}
                                                <div className="mb-4">
                                                    <p className="text-xs font-semibold mb-2" style={{ color: palette.text }}>Tarixi Aralıq</p>
                                                    <div className="relative h-6 rounded-lg" style={{ backgroundColor: `${risk.color}11` }}>
                                                        <div className="absolute top-1/2 -translate-y-1/2 h-1 w-full rounded" style={{ backgroundColor: `${risk.color}22` }}>
                                                            <div
                                                                className="absolute h-3 w-3 rounded-full -top-1"
                                                                style={{
                                                                    left: `${risk.details.historicalRange.current}%`,
                                                                    backgroundColor: risk.color,
                                                                    transform: 'translateX(-50%)'
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="absolute top-1/2 -translate-y-1/2 left-0 text-[10px]" style={{ color: palette.textSecondary }}>Min: {risk.details.historicalRange.min}%</div>
                                                        <div className="absolute top-1/2 -translate-y-1/2 right-0 text-[10px]" style={{ color: palette.textSecondary }}>Max: {risk.details.historicalRange.max}%</div>
                                                    </div>
                                                </div>

                                                {/* Mitigation */}
                                                <div className="p-3 rounded-lg mb-3" style={{ backgroundColor: `${risk.color}11`, border: `1px solid ${risk.color}22` }}>
                                                    <div className="flex items-start gap-2">
                                                        <Shield size={14} style={{ color: risk.color, marginTop: 2 }} />
                                                        <div>
                                                            <p className="text-xs font-semibold" style={{ color: palette.text }}>Azaltma Strategiyası</p>
                                                            <p className="text-xs" style={{ color: palette.textSecondary }}>{risk.details.mitigation}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Outlook */}
                                                <div className="flex items-center gap-2 pt-2 border-t" style={{ borderColor: palette.border }}>
                                                    <Activity size={12} style={{ color: palette.primary }} />
                                                    <span className="text-xs" style={{ color: palette.text }}><strong>Perspektiv:</strong> {risk.details.outlook}</span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div
                                className="p-3 rounded-xl flex items-start gap-3"
                                style={{ backgroundColor: palette.warningLight, border: `1px solid ${palette.warning}33` }}
                            >
                                <AlertTriangle size={18} style={{ color: palette.warning }} />
                                <div>
                                    <p className="font-semibold text-sm" style={{ color: palette.text }}>Risk Xülasəsi</p>
                                    <p className="text-xs" style={{ color: palette.textSecondary }}>
                                        Ümumi risk profili ORTA səviyyədədir. Əsas narahatlıq makro mühit və qiymətləndirmədir. Şirkət daxili risklər minimaldır.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Valuation and Earnings Row */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* Valuation Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55 }}
                            className="p-6 rounded-2xl"
                            style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: palette.primary }} />
                                    <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: palette.textSecondary }}>Qiymətləndirmə</span>
                                </div>
                                <Badge style={{ backgroundColor: palette.primaryLight, color: palette.primary }}>
                                    Fair Value: ${valuationData.fairValue}
                                </Badge>
                            </div>
                            <h3 className="text-xl font-bold mb-4" style={{ color: palette.text }}>Valuation Modelləri</h3>

                            <div className="space-y-3 mb-4">
                                {valuationData.models.map((model, i) => (
                                    <div key={i} className="p-3 rounded-xl" style={{ backgroundColor: palette.bg, border: `1px solid ${palette.border}` }}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-semibold" style={{ color: palette.text }}>{model.name}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold" style={{ color: palette.text }}>${model.value}</span>
                                                <Badge style={{
                                                    backgroundColor: model.upside > 0 ? palette.successLight : palette.dangerLight,
                                                    color: model.upside > 0 ? palette.success : palette.danger
                                                }}>
                                                    {model.upside > 0 ? '+' : ''}{model.upside}%
                                                </Badge>
                                            </div>
                                        </div>
                                        <p className="text-xs" style={{ color: palette.textSecondary }}>{model.description}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-xs" style={{ color: palette.textSecondary }}>Etibarlılıq:</span>
                                            <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: palette.border }}>
                                                <div className="h-full rounded-full" style={{ width: `${model.confidence}%`, backgroundColor: palette.primary }} />
                                            </div>
                                            <span className="text-xs font-semibold" style={{ color: palette.text }}>{model.confidence}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Premium/Discount Bar */}
                            <div className="p-3 rounded-xl" style={{ backgroundColor: palette.bg, border: `1px solid ${palette.border}` }}>
                                <p className="text-xs mb-2" style={{ color: palette.textSecondary }}>Cari Qiymət vs Fair Value</p>
                                <div className="relative h-8 rounded-lg" style={{ backgroundColor: palette.primaryLight }}>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xs font-semibold" style={{ color: palette.text }}>
                                            ${valuationData.currentPrice} ({valuationData.premiumDiscount > 0 ? '+' : ''}{valuationData.premiumDiscount}% premium)
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 p-3 rounded-xl" style={{ backgroundColor: palette.primaryLight, border: `1px solid ${palette.primary}22` }}>
                                <div className="flex items-start gap-2">
                                    <Calculator size={14} style={{ color: palette.primary, marginTop: 2 }} />
                                    <p className="text-xs" style={{ color: palette.textSecondary }}>{valuationData.recommendation}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Earnings Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55 }}
                            className="p-6 rounded-2xl"
                            style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: palette.success }} />
                                    <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: palette.textSecondary }}>Earnings</span>
                                </div>
                                <Badge style={{ backgroundColor: palette.successLight, color: palette.success }}>
                                    <Calendar size={12} className="mr-1" />
                                    Növbəti: {earningsData.nextEarnings}
                                </Badge>
                            </div>
                            <h3 className="text-xl font-bold mb-4" style={{ color: palette.text }}>Hesabat Göstəriciləri</h3>

                            {/* Quarterly EPS */}
                            <div className="space-y-2 mb-4">
                                {earningsData.quarters.map((q, i) => (
                                    <div key={i} className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: palette.bg }}>
                                        <span className="text-sm font-semibold" style={{ color: palette.text }}>{q.quarter}</span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm" style={{ color: palette.textSecondary }}>EPS: ${q.eps}</span>
                                            <Badge style={{
                                                backgroundColor: q.beat ? palette.successLight : palette.dangerLight,
                                                color: q.beat ? palette.success : palette.danger
                                            }}>
                                                {q.beat ? 'Beat' : 'Miss'} {q.surprise > 0 ? '+' : ''}{q.surprise}%
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="p-3 rounded-xl text-center" style={{ backgroundColor: palette.bg }}>
                                    <p className="text-2xl font-bold" style={{ color: palette.success }}>{earningsData.beatRate}%</p>
                                    <p className="text-xs" style={{ color: palette.textSecondary }}>Beat Rate</p>
                                </div>
                                <div className="p-3 rounded-xl text-center" style={{ backgroundColor: palette.bg }}>
                                    <p className="text-2xl font-bold" style={{ color: palette.success }}>+{earningsData.avgSurprise}%</p>
                                    <p className="text-xs" style={{ color: palette.textSecondary }}>Ort. Surprise</p>
                                </div>
                            </div>

                            <div className="p-3 rounded-xl" style={{ backgroundColor: palette.successLight, border: `1px solid ${palette.success}22` }}>
                                <p className="text-xs" style={{ color: palette.textSecondary }}>{earningsData.summary}</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Financial Health and Insider Row */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* Financial Health */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.58 }}
                            className="p-6 rounded-2xl"
                            style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: palette.success }} />
                                    <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: palette.textSecondary }}>Maliyyə Sağlamlığı</span>
                                </div>
                                <div className="flex gap-2">
                                    <Badge style={{ backgroundColor: palette.successLight, color: palette.success }}>
                                        Z: {financialHealthData.altmanZ}
                                    </Badge>
                                    <Badge style={{ backgroundColor: palette.primaryLight, color: palette.primary }}>
                                        F: {financialHealthData.piotroskiF}/9
                                    </Badge>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                {financialHealthData.metrics.map((metric, i) => (
                                    <div key={i} className="p-3 rounded-xl" style={{ backgroundColor: palette.bg }}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs" style={{ color: palette.textSecondary }}>{metric.name}</span>
                                            <Badge style={{
                                                backgroundColor: metric.status === "əla" ? palette.successLight : metric.status === "yaxşı" ? palette.primaryLight : palette.warningLight,
                                                color: metric.status === "əla" ? palette.success : metric.status === "yaxşı" ? palette.primary : palette.warning,
                                                fontSize: '10px'
                                            }}>{metric.status}</Badge>
                                        </div>
                                        <p className="text-lg font-bold" style={{ color: palette.text }}>{metric.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Altman Z and Piotroski */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="p-3 rounded-xl" style={{ backgroundColor: palette.successLight, border: `1px solid ${palette.success}22` }}>
                                    <p className="text-xs mb-1" style={{ color: palette.textSecondary }}>Altman Z-Score</p>
                                    <p className="text-xl font-bold" style={{ color: palette.success }}>{financialHealthData.altmanZ}</p>
                                    <p className="text-xs" style={{ color: palette.success }}>{financialHealthData.altmanZStatus}</p>
                                </div>
                                <div className="p-3 rounded-xl" style={{ backgroundColor: palette.primaryLight, border: `1px solid ${palette.primary}22` }}>
                                    <p className="text-xs mb-1" style={{ color: palette.textSecondary }}>Piotroski F-Score</p>
                                    <p className="text-xl font-bold" style={{ color: palette.primary }}>{financialHealthData.piotroskiF}/9</p>
                                    <p className="text-xs" style={{ color: palette.primary }}>{financialHealthData.piotroskiFStatus}</p>
                                </div>
                            </div>

                            <div className="p-3 rounded-xl" style={{ backgroundColor: palette.bg, border: `1px solid ${palette.border}` }}>
                                <p className="text-xs" style={{ color: palette.textSecondary }}>{financialHealthData.summary}</p>
                            </div>
                        </motion.div>

                        {/* Insider & Institutional */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.58 }}
                            className="p-6 rounded-2xl"
                            style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: palette.warning }} />
                                    <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: palette.textSecondary }}>Insider & Institutional</span>
                                </div>
                                <Badge style={{ backgroundColor: palette.successLight, color: palette.success }}>
                                    {insiderData.institutional.ownership}% İnstitutional
                                </Badge>
                            </div>

                            {/* Insider Section */}
                            <div className="mb-4">
                                <h4 className="text-sm font-bold mb-3" style={{ color: palette.text }}>👔 İnsayder Aktivliyi</h4>
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <div className="p-3 rounded-xl" style={{ backgroundColor: palette.bg }}>
                                        <p className="text-xs" style={{ color: palette.textSecondary }}>Son 3 ay</p>
                                        <p className="text-lg font-bold" style={{ color: insiderData.netActivity3m < 0 ? palette.danger : palette.success }}>
                                            {insiderData.netActivity3m > 0 ? '+' : ''}${insiderData.netActivity3m}M
                                        </p>
                                    </div>
                                    <div className="p-3 rounded-xl" style={{ backgroundColor: palette.bg }}>
                                        <p className="text-xs" style={{ color: palette.textSecondary }}>Son 12 ay</p>
                                        <p className="text-lg font-bold" style={{ color: insiderData.netActivity12m < 0 ? palette.danger : palette.success }}>
                                            {insiderData.netActivity12m > 0 ? '+' : ''}${insiderData.netActivity12m}M
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {insiderData.recentTransactions.slice(0, 2).map((tx, i) => (
                                        <div key={i} className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: palette.bg }}>
                                            <div>
                                                <span className="text-xs font-semibold" style={{ color: palette.text }}>{tx.name}</span>
                                                <span className="text-xs ml-2" style={{ color: palette.textSecondary }}>{tx.role}</span>
                                            </div>
                                            <Badge style={{ backgroundColor: palette.dangerLight, color: palette.danger }}>{tx.type}</Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Institutional Section */}
                            <div>
                                <h4 className="text-sm font-bold mb-3" style={{ color: palette.text }}>🏛️ Top Holders</h4>
                                <div className="space-y-2">
                                    {insiderData.institutional.topHolders.map((holder, i) => (
                                        <div key={i} className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: palette.bg }}>
                                            <span className="text-sm font-semibold" style={{ color: palette.text }}>{holder.name}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm" style={{ color: palette.textSecondary }}>{holder.shares}</span>
                                                <span className="text-xs" style={{ color: holder.change.startsWith('+') ? palette.success : palette.textSecondary }}>{holder.change}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-3 p-3 rounded-xl" style={{ backgroundColor: palette.warningLight, border: `1px solid ${palette.warning}22` }}>
                                <p className="text-xs" style={{ color: palette.textSecondary }}>{insiderData.summary}</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Trend Analysis Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="p-6 rounded-2xl"
                        style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: palette.primaryLight }}
                                >
                                    <Activity size={20} style={{ color: palette.primary }} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: palette.success }} />
                                        <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: palette.textSecondary }}>AI Proqnoz</span>
                                    </div>
                                    <h3 className="text-xl font-bold" style={{ color: palette.text }}>Gələcək Baxışı və Trend Analizi</h3>
                                    <p className="text-sm" style={{ color: palette.textSecondary }}>Prophet & LSTM Model Nəticələri</p>
                                </div>
                            </div>
                            <Badge style={{ backgroundColor: palette.successLight, color: palette.success }}>
                                <Sparkles size={12} className="mr-1" /> AI Powered
                            </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {/* Chart */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <TrendingUp size={16} style={{ color: palette.primary }} />
                                    <span className="font-semibold" style={{ color: palette.text }}>Fundamental Trend Proqnozu</span>
                                    <Badge style={{ backgroundColor: palette.bg, color: palette.textSecondary }}>8 ay</Badge>
                                </div>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={trendData}>
                                            <defs>
                                                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor={palette.primary} stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor={palette.primary} stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid stroke="rgba(0,0,0,0.05)" />
                                            <XAxis
                                                dataKey="month"
                                                tick={{ fill: palette.textSecondary, fontSize: 11 }}
                                                axisLine={false}
                                            />
                                            <YAxis
                                                tick={{ fill: palette.textSecondary, fontSize: 11 }}
                                                axisLine={false}
                                                domain={[90, 140]}
                                            />
                                            <RechartsTooltip
                                                contentStyle={{
                                                    background: palette.card,
                                                    border: `1px solid ${palette.border}`,
                                                    borderRadius: "8px"
                                                }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="tarixi"
                                                stroke={palette.primary}
                                                strokeWidth={2}
                                                fill="url(#trendGradient)"
                                                name="Tarixi"
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="prognoz"
                                                stroke={palette.success}
                                                strokeWidth={2}
                                                strokeDasharray="5 5"
                                                dot={{ fill: palette.success }}
                                                name="Proqnoz"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex items-center justify-center gap-6 mt-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: palette.primary }} />
                                        <span className="text-xs" style={{ color: palette.textSecondary }}>Tarixi</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-0.5" style={{ backgroundColor: palette.success, borderStyle: "dashed" }} />
                                        <span className="text-xs" style={{ color: palette.textSecondary }}>Proqnoz</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded" style={{ backgroundColor: `${palette.primary}22` }} />
                                        <span className="text-xs" style={{ color: palette.textSecondary }}>İnam Aralığı</span>
                                    </div>
                                </div>
                            </div>

                            {/* LSTM Analysis */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Brain size={16} style={{ color: palette.success }} />
                                    <span className="font-semibold" style={{ color: palette.text }}>LSTM Model Analizi</span>
                                </div>

                                <div
                                    className="p-4 rounded-xl mb-4"
                                    style={{ backgroundColor: palette.successLight, border: `1px solid ${palette.success}33` }}
                                >
                                    <div className="flex items-start gap-3">
                                        <Info size={18} style={{ color: palette.success }} />
                                        <div>
                                            <p className="text-sm" style={{ color: palette.text }}>
                                                LSTM modeli şirkətin keçmiş iqtisadi şoklara reaksiyasını təhlil etdi. <strong style={{ color: palette.primary }}>AAPL</strong> oxşar makro şəraitdə yüksək dayanıqlılıq göstərir.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle size={16} style={{ color: palette.success }} />
                                        <span className="text-sm" style={{ color: palette.text }}>Şok dayanıqlılığı yüksək səviyyədə</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle size={16} style={{ color: palette.success }} />
                                        <span className="text-sm" style={{ color: palette.text }}>Makro dəyişikliklərə adaptasiya güclü</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle size={16} style={{ color: palette.success }} />
                                        <span className="text-sm" style={{ color: palette.text }}>Trend davam etmə ehtimalı 92%</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div
                                        className="p-3 rounded-xl text-center"
                                        style={{ backgroundColor: palette.bg, border: `1px solid ${palette.border}` }}
                                    >
                                        <p className="text-xs mb-1" style={{ color: palette.textSecondary }}>Şok Dayanıqlığı</p>
                                        <p className="text-xl font-bold" style={{ color: palette.success }}>Yüksək</p>
                                    </div>
                                    <div
                                        className="p-3 rounded-xl text-center"
                                        style={{ backgroundColor: palette.bg, border: `1px solid ${palette.border}` }}
                                    >
                                        <p className="text-xs mb-1" style={{ color: palette.textSecondary }}>Trend Etibarlığı</p>
                                        <p className="text-xl font-bold" style={{ color: palette.success }}>92%</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="mt-4 p-3 rounded-xl flex items-center justify-between"
                            style={{ backgroundColor: palette.bg, border: `1px solid ${palette.border}` }}
                        >
                            <div className="flex items-center gap-2">
                                <Info size={14} style={{ color: palette.textSecondary }} />
                                <p className="text-xs" style={{ color: palette.textSecondary }}>
                                    Bu proqnoz 10+ illik tarixi data və 50+ makro göstərici əsasında hazırlanıb. Model hər 24 saatda yenilənir.
                                </p>
                            </div>
                            <Button
                                variant="link"
                                className="text-xs"
                                style={{ color: palette.primary }}
                            >
                                Metodologiya haqqında <ArrowRight size={12} className="ml-1" />
                            </Button>
                        </div>
                    </motion.div>

                    {/* Monte Carlo Chart Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="p-6 rounded-2xl"
                        style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Activity size={20} style={{ color: palette.accent }} />
                                <h3 className="text-lg font-bold" style={{ color: palette.text }}>🎲 Monte Carlo Proqnozu</h3>
                            </div>
                            <Badge style={{ backgroundColor: `${palette.accent}22`, color: palette.accent }}>{monteCarloData.simulations.toLocaleString()} Simulyasiya</Badge>
                        </div>

                        {/* Chart */}
                        <div className="h-64 mb-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={monteCarloChartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={palette.border} />
                                    <XAxis dataKey="month" stroke={palette.textSecondary} style={{ fontSize: 12 }} />
                                    <YAxis stroke={palette.textSecondary} style={{ fontSize: 12 }} domain={[150, 300]} />
                                    <RechartsTooltip
                                        contentStyle={{
                                            backgroundColor: palette.card,
                                            border: `1px solid ${palette.border}`,
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Area type="monotone" dataKey="p90" stroke={palette.success} fill={palette.success} fillOpacity={0.1} name="90-cı persentil" />
                                    <Area type="monotone" dataKey="p75" stroke={palette.primary} fill={palette.primary} fillOpacity={0.15} name="75-ci persentil" />
                                    <Area type="monotone" dataKey="p50" stroke={palette.accent} fill={palette.accent} fillOpacity={0.3} name="Median" />
                                    <Area type="monotone" dataKey="p25" stroke={palette.warning} fill={palette.warning} fillOpacity={0.15} name="25-ci persentil" />
                                    <Area type="monotone" dataKey="p10" stroke={palette.danger} fill={palette.danger} fillOpacity={0.1} name="10-cu persentil" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Scenario Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="p-4 rounded-xl" style={{ backgroundColor: `${palette.success}11`, border: `1px solid ${palette.success}33` }}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-semibold" style={{ color: palette.success }}>🚀 Bullish</span>
                                    <Badge style={{ backgroundColor: `${palette.success}22`, color: palette.success }}>{monteCarloData.scenarios.bullish.probability}%</Badge>
                                </div>
                                <div className="text-2xl font-bold" style={{ color: palette.text }}>${monteCarloData.scenarios.bullish.targetPrice}</div>
                                <div className="text-sm" style={{ color: palette.success }}>+{monteCarloData.scenarios.bullish.return}%</div>
                            </div>
                            <div className="p-4 rounded-xl" style={{ backgroundColor: `${palette.primary}11`, border: `1px solid ${palette.primary}33` }}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-semibold" style={{ color: palette.primary }}>📊 Baza</span>
                                    <Badge style={{ backgroundColor: `${palette.primary}22`, color: palette.primary }}>{monteCarloData.scenarios.base.probability}%</Badge>
                                </div>
                                <div className="text-2xl font-bold" style={{ color: palette.text }}>${monteCarloData.scenarios.base.targetPrice}</div>
                                <div className="text-sm" style={{ color: palette.primary }}>+{monteCarloData.scenarios.base.return}%</div>
                            </div>
                            <div className="p-4 rounded-xl" style={{ backgroundColor: `${palette.danger}11`, border: `1px solid ${palette.danger}33` }}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-semibold" style={{ color: palette.danger }}>⚠️ Bearish</span>
                                    <Badge style={{ backgroundColor: `${palette.danger}22`, color: palette.danger }}>{monteCarloData.scenarios.bearish.probability}%</Badge>
                                </div>
                                <div className="text-2xl font-bold" style={{ color: palette.text }}>${monteCarloData.scenarios.bearish.targetPrice}</div>
                                <div className="text-sm" style={{ color: palette.danger }}>{monteCarloData.scenarios.bearish.return}%</div>
                            </div>
                        </div>

                        {/* Explanation */}
                        <div className="p-3 rounded-lg" style={{ backgroundColor: palette.bg }}>
                            <div className="flex items-start gap-2">
                                <Info size={14} style={{ color: palette.accent, marginTop: 2, flexShrink: 0 }} />
                                <p className="text-xs" style={{ color: palette.textSecondary }}>
                                    <strong style={{ color: palette.text }}>Monte Carlo nədir?</strong> {monteCarloData.explanation}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Footer */}
                    <div className="text-center py-8">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{ background: `linear-gradient(135deg, ${palette.success}, ${palette.primary})` }}
                            >
                                <Sparkles size={16} color="#fff" />
                            </div>
                            <span className="font-bold" style={{ color: palette.text }}>AI Invest</span>
                            <Badge style={{ backgroundColor: palette.primaryLight, color: palette.primary }}>Pro</Badge>
                        </div>
                        <p className="text-sm" style={{ color: palette.textSecondary }}>
                            Fundamental Təhlil Modulu v2.0 • Powered by AI
                        </p>
                    </div>
                </main>

                {/* Right Sidebar - Yekun Qərar */}
                <aside
                    className="hidden lg:block w-[380px] border-l p-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto flex-shrink-0"
                    style={{ borderColor: palette.border, backgroundColor: palette.card }}
                >
                    {/* Header - Centered */}
                    <div className="text-center mb-6">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <Zap size={20} style={{ color: palette.warning }} />
                            <h2 className="text-xl font-bold" style={{ color: palette.text }}>YEKUN QƏRAR</h2>
                        </div>
                        <p className="text-sm" style={{ color: palette.textSecondary }}>AI Xülasəsi və Tövsiyələr</p>
                    </div>

                    {/* Overall Signal - Centered & Larger */}
                    <div
                        className="rounded-2xl p-6 mb-6 text-center"
                        style={{ background: `linear-gradient(135deg, ${palette.successLight}, ${palette.card})`, border: `2px solid ${palette.success}44` }}
                    >
                        <div className="text-3xl font-bold mb-2" style={{ color: palette.success }}>{finalDecision.overallSignal}</div>
                        <div className="text-sm mb-4" style={{ color: palette.textSecondary }}>Ümumi Siqnal</div>
                        <div className="flex items-center justify-center gap-3">
                            <span className="text-sm" style={{ color: palette.textSecondary }}>İnam:</span>
                            <div className="flex-1 max-w-32 rounded-full h-3" style={{ backgroundColor: palette.bg }}>
                                <div className="h-3 rounded-full transition-all" style={{ width: `${finalDecision.confidenceScore}%`, backgroundColor: palette.success }} />
                            </div>
                            <span className="text-lg font-bold" style={{ color: palette.success }}>{finalDecision.confidenceScore}%</span>
                        </div>
                    </div>

                    {/* Monte Carlo Summary - Grid Layout */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 text-center" style={{ color: palette.textSecondary }}>🎲 Monte Carlo Simulyasiyası</h3>
                        <div className="grid grid-cols-3 gap-2 rounded-xl p-4" style={{ backgroundColor: palette.bg }}>
                            <div className="text-center">
                                <div className="text-xs mb-1" style={{ color: palette.textSecondary }}>Median</div>
                                <div className="text-lg font-bold" style={{ color: palette.primary }}>${monteCarloData.expectedValue}</div>
                            </div>
                            <div className="text-center border-x" style={{ borderColor: palette.border }}>
                                <div className="text-xs mb-1" style={{ color: palette.textSecondary }}>90% CI</div>
                                <div className="text-sm font-semibold" style={{ color: palette.text }}>${monteCarloData.confidenceIntervals.ci90.low}-${monteCarloData.confidenceIntervals.ci90.high}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-xs mb-1" style={{ color: palette.textSecondary }}>Sharpe</div>
                                <div className="text-lg font-bold" style={{ color: palette.success }}>{monteCarloData.sharpeRatio}</div>
                            </div>
                        </div>
                    </div>

                    {/* Key Findings - 2 Column Grid */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 text-center" style={{ color: palette.textSecondary }}>📋 Önəmli Tapıntılar</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {finalDecision.keyFindings.map((finding, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 p-2 rounded-lg text-xs"
                                    style={{ backgroundColor: finding.positive ? `${palette.success}11` : `${palette.danger}11` }}
                                >
                                    {finding.positive ? (
                                        <CheckCircle size={12} style={{ color: palette.success, flexShrink: 0 }} />
                                    ) : (
                                        <AlertTriangle size={12} style={{ color: palette.danger, flexShrink: 0 }} />
                                    )}
                                    <span style={{ color: palette.text, lineHeight: 1.2 }}>{finding.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* What Happened & Expectations - Side by Side */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider mb-2 text-center" style={{ color: palette.textSecondary }}>📰 Baş Verənlər</h3>
                            <div className="rounded-lg p-3 space-y-1" style={{ backgroundColor: palette.bg }}>
                                {finalDecision.whatHappened.map((item, index) => (
                                    <div key={index} className="flex items-start gap-1.5 text-xs" style={{ color: palette.text }}>
                                        <ArrowRight size={10} style={{ color: palette.primary, marginTop: 3, flexShrink: 0 }} />
                                        <span style={{ lineHeight: 1.3 }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider mb-2 text-center" style={{ color: palette.textSecondary }}>🎯 Gözləntilər</h3>
                            <div className="rounded-lg p-3 space-y-1" style={{ backgroundColor: `${palette.primary}11` }}>
                                {finalDecision.expectations.map((exp, index) => (
                                    <div key={index} className="flex items-start gap-1.5 text-xs" style={{ color: palette.text }}>
                                        <ArrowRight size={10} style={{ color: palette.success, marginTop: 3, flexShrink: 0 }} />
                                        <span style={{ lineHeight: 1.3 }}>{exp}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Future Outlook */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-2 text-center" style={{ color: palette.textSecondary }}>🔮 Gələcək Baxışı</h3>
                        <div className="rounded-xl p-3 space-y-1.5" style={{ backgroundColor: `${palette.accent}11`, border: `1px solid ${palette.accent}22` }}>
                            {finalDecision.futureOutlook.map((item, index) => (
                                <div key={index} className="flex items-start gap-2 text-xs" style={{ color: palette.text }}>
                                    <ArrowRight size={10} style={{ color: palette.accent, marginTop: 3, flexShrink: 0 }} />
                                    <span style={{ lineHeight: 1.3 }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recommendations - Improved */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 text-center" style={{ color: palette.textSecondary }}>💡 Tövsiyələr</h3>
                        <div className="space-y-2">
                            {finalDecision.recommendations.map((rec, index) => (
                                <div
                                    key={index}
                                    className="p-3 rounded-xl border-2 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg"
                                    style={{
                                        backgroundColor: palette.bg,
                                        borderColor: index === 0 ? palette.success : index === 1 ? palette.warning : palette.primary,
                                    }}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span
                                            className="text-sm font-bold"
                                            style={{ color: index === 0 ? palette.success : index === 1 ? palette.warning : palette.primary }}
                                        >
                                            {index === 0 ? "🚀" : index === 1 ? "⚖️" : "🛡️"} {rec.type}
                                        </span>
                                        <Badge style={{ backgroundColor: `${palette.primary}22`, color: palette.primary, fontSize: 11 }}>
                                            {rec.allocation}
                                        </Badge>
                                    </div>
                                    <div className="text-sm" style={{ color: palette.text }}>{rec.action}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Risk & Time - Centered */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="rounded-xl p-4 text-center" style={{ backgroundColor: `${palette.warning}11`, border: `1px solid ${palette.warning}33` }}>
                            <div className="text-xs mb-1" style={{ color: palette.textSecondary }}>Risk Səviyyəsi</div>
                            <div className="text-xl font-bold" style={{ color: palette.warning }}>{finalDecision.riskLevel}</div>
                        </div>
                        <div className="rounded-xl p-4 text-center" style={{ backgroundColor: `${palette.primary}11`, border: `1px solid ${palette.primary}33` }}>
                            <div className="text-xs mb-1" style={{ color: palette.textSecondary }}>Zaman Horizontu</div>
                            <div className="text-xl font-bold" style={{ color: palette.primary }}>{finalDecision.timeHorizon}</div>
                        </div>
                    </div>

                    {/* Action Buttons - Larger */}
                    <div className="space-y-3">
                        <Button
                            className="w-full h-12 text-base font-bold"
                            style={{ backgroundColor: palette.success, color: '#fff' }}
                        >
                            <TrendingUp size={20} className="mr-2" />
                            AL - Buy Order
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full h-10"
                            style={{ borderColor: palette.border, color: palette.text }}
                        >
                            <Activity size={18} className="mr-2" />
                            Qiymət Alert-i Qur
                        </Button>
                    </div>

                    {/* Disclaimer */}
                    <div
                        className="mt-6 p-4 rounded-xl text-center"
                        style={{ backgroundColor: `${palette.warning}11`, border: `1px solid ${palette.warning}33` }}
                    >
                        <div className="text-xs" style={{ color: palette.warning }}>
                            ⚠️ Bu analiz yalnız informativ məqsəd daşıyır və investisiya tövsiyəsi deyil.
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

