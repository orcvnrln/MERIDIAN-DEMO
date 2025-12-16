// TradePro Portfolio Mock Data for AI Analysis

export interface PortfolioHolding {
    symbol: string;
    name: string;
    shares: number;
    avgCost: number;
    currentPrice: number;
    value: number;
    weight: number;
    change: number;
    changePercent: number;
    beta: number;
    sector: string;
}

export interface PortfolioMetrics {
    totalValue: number;
    totalCost: number;
    totalReturn: number;
    totalReturnPercent: number;
    annualizedReturn: number;
    maxDrawdown: number;
    volatility: number;
    sharpeRatio: number;
    sortinoRatio: number;
    calmarRatio: number;
    beta: number;
    alpha: number;
    var95: number;
    var99: number;
    cvar95: number;
}

export interface MonteCarloResult {
    simulations: number;
    horizon: string;
    expectedReturn: number;
    bestCase: { return: number; probability: number };
    baseCase: { return: number; probability: number };
    worstCase: { return: number; probability: number };
    var95: number;
    distributionBars: number[];
}

export interface CorrelationPair {
    asset1: string;
    asset2: string;
    correlation: number;
}

export interface PortfolioData {
    holdings: PortfolioHolding[];
    metrics: PortfolioMetrics;
    monteCarlo: MonteCarloResult;
    correlations: CorrelationPair[];
    fundamentalScore: number;
    geopoliticalRiskIndex: number;
    masterMarketView: {
        sentiment: "Bullish" | "Neutral" | "Bearish";
        confidence: number;
        keyDrivers: string[];
    };
}

// Mock portfolio data
export const MOCK_PORTFOLIO: PortfolioData = {
    holdings: [
        {
            symbol: "NVDA",
            name: "NVIDIA Corporation",
            shares: 25,
            avgCost: 450.00,
            currentPrice: 875.50,
            value: 21887.50,
            weight: 35.2,
            change: 425.50,
            changePercent: 94.6,
            beta: 1.85,
            sector: "Technology"
        },
        {
            symbol: "TSLA",
            name: "Tesla Inc.",
            shares: 40,
            avgCost: 220.00,
            currentPrice: 248.50,
            value: 9940.00,
            weight: 16.0,
            change: 28.50,
            changePercent: 12.9,
            beta: 2.05,
            sector: "Automotive"
        },
        {
            symbol: "AAPL",
            name: "Apple Inc.",
            shares: 50,
            avgCost: 165.00,
            currentPrice: 198.50,
            value: 9925.00,
            weight: 16.0,
            change: 33.50,
            changePercent: 20.3,
            beta: 1.23,
            sector: "Technology"
        },
        {
            symbol: "MSFT",
            name: "Microsoft Corporation",
            shares: 30,
            avgCost: 350.00,
            currentPrice: 425.75,
            value: 12772.50,
            weight: 20.5,
            change: 75.75,
            changePercent: 21.6,
            beta: 0.95,
            sector: "Technology"
        },
        {
            symbol: "JPM",
            name: "JPMorgan Chase",
            shares: 35,
            avgCost: 155.00,
            currentPrice: 218.50,
            value: 7647.50,
            weight: 12.3,
            change: 63.50,
            changePercent: 41.0,
            beta: 1.12,
            sector: "Financial"
        }
    ],
    metrics: {
        totalValue: 62172.50,
        totalCost: 45250.00,
        totalReturn: 16922.50,
        totalReturnPercent: 37.4,
        annualizedReturn: 28.5,
        maxDrawdown: 32.1,
        volatility: 24.3,
        sharpeRatio: 1.82,
        sortinoRatio: 0.78,
        calmarRatio: 0.89,
        beta: 1.45,
        alpha: 8.2,
        var95: 7450,
        var99: 11200,
        cvar95: 9850
    },
    monteCarlo: {
        simulations: 10000,
        horizon: "12 ay",
        expectedReturn: 8.2,
        bestCase: { return: 32.5, probability: 15 },
        baseCase: { return: 8.2, probability: 60 },
        worstCase: { return: -18.7, probability: 25 },
        var95: 7450,
        distributionBars: [5, 10, 20, 35, 55, 75, 90, 100, 85, 60, 40, 25, 15, 8, 3]
    },
    correlations: [
        { asset1: "NVDA", asset2: "TSLA", correlation: 0.72 },
        { asset1: "NVDA", asset2: "AAPL", correlation: 0.65 },
        { asset1: "NVDA", asset2: "MSFT", correlation: 0.78 },
        { asset1: "TSLA", asset2: "AAPL", correlation: 0.45 },
        { asset1: "TSLA", asset2: "MSFT", correlation: 0.52 },
        { asset1: "AAPL", asset2: "MSFT", correlation: 0.85 },
        { asset1: "JPM", asset2: "NVDA", correlation: 0.35 },
        { asset1: "JPM", asset2: "TSLA", correlation: 0.28 }
    ],
    fundamentalScore: 72,
    geopoliticalRiskIndex: 45,
    masterMarketView: {
        sentiment: "Bullish",
        confidence: 68,
        keyDrivers: [
            "AI/ML sektor artımı",
            "FED faiz enişi gözləntiləri",
            "Güclü korporativ gəlirlər",
            "Geosiyasi gərginlik azalması"
        ]
    }
};

// AI Response generator based on query type
export function generateAIResponse(queryType: string, portfolio: PortfolioData): string {
    const { metrics, holdings, monteCarlo, masterMarketView } = portfolio;

    const highBetaHoldings = holdings.filter(h => h.beta > 1.5);
    const highBetaWeight = highBetaHoldings.reduce((sum, h) => sum + h.weight, 0);

    const responses: Record<string, string> = {
        mdd: `**Maximum Drawdown (MDD): ${metrics.maxDrawdown}%**

– **Nədir?**
Portföyünüzün ən yüksək qiymətindən ən aşağı qiymətə qədər olan itkisidir. Bu, "ən pis vəziyyət" ssenarisini göstərir.

– **Niyə vacibdir?**
Bu, psixoloji dayanıqlılıq və kapitalın qorunması baxımından investorlar üçün ən vacib risk ölçülərindən biridir. 30%-dən yuxarı MDD, çoxlu investora ciddi narahatlıq yaradır - çünki ${metrics.maxDrawdown}% itki əldə etdikdən sonra, əvvəlki səviyyəyə qayıtmaq üçün ${((100 * metrics.maxDrawdown) / (100 - metrics.maxDrawdown)).toFixed(1)}% qazanc lazımdır.

– **Sizin portföyünüz üzrə:**
Son 18 ay ərzində MDD-niz **${metrics.maxDrawdown}%** olmuşdur. Bu, S&P 500 indeksinin eyni dövr üçün göstəricisindən (17%) təxminən iki dəfə çoxdur. Əsas səbəb: portföyünüzün ${highBetaWeight.toFixed(1)}% hissəsini yüksək beta aktivlər (${highBetaHoldings.map(h => h.symbol).join(", ")}) təşkil edir.

– **Təklif:**
Diversifikasiya üçün geniş bazar ETF-ləri (məsələn: VOO, QQQ) və ya sabit gəlirli fondlar (məsələn: AGG, BND) əlavə edə bilərsiniz.

– **Xəbərdarlıq:**
Makro iqtisadi şərait nəzərə alındıqda, növbəti 6 ayda MDD 40%-ə qədər artmaq potensialına malikdir.`,

        var: `**Value at Risk (VaR): $${metrics.var95.toLocaleString()} (95%)**

– **Nədir?**
VaR, normal bazar şəraitində bir gün ərzində itirə biləcəyiniz maksimum məbləği göstərir. 95% səviyyəsi o deməkdir ki, 100 günün 95-də itkiniz bu həddən az olacaq.

– **Niyə vacibdir?**
Bu, qısamüddətli likvidlik planlaması və risk büdcələməsi üçün əsas göstəricidir. Əgər bu gün bazar bağlananadək riskli keçitsə, 95% ehtimal ilə itkiniz $${metrics.var95.toLocaleString()}-dən çox olmayacaq.

– **Sizin portföyünüz üzrə:**
- VaR (95%): **$${metrics.var95.toLocaleString()}** — portföy dəyərinin ${((metrics.var95 / metrics.totalValue) * 100).toFixed(1)}%-i
- VaR (99%): **$${metrics.var99.toLocaleString()}** — daha nadir, lakin daha ciddi ssenarilər üçün
- CVaR (95%): **$${metrics.cvar95.toLocaleString()}** — həddən kənara çıxdıqda orta itki

– **Xəbərdarlıq:**
Sizin VaR portföy dəyərinin ${((metrics.var95 / metrics.totalValue) * 100).toFixed(1)}%-ni təşkil edir. Konservativ investorlar üçün bu 3%-5% aralığında olmalıdır.`,

        sharpe: `**Sharpe Ratio: ${metrics.sharpeRatio}**

– **Nədir?**
Sharpe nisbəti, hər vahid risk üçün əldə etdiyiniz əlavə gəliri göstərir. Başqa sözlə, "riski nə qədər effektiv istifadə edirsiniz?" sualına cavab verir.

– **Niyə vacibdir?**
- 1.0-dan yuxarı: Yaxşı risk/gəlir balansı
- 1.5-dən yuxarı: Əla performans
- 2.0-dən yuxarı: İnstitusional səviyyə

– **Sizin portföyünüz üzrə:**
Sharpe nisbətiniz **${metrics.sharpeRatio}** — bu, ${metrics.sharpeRatio >= 1.5 ? 'əla performans' : metrics.sharpeRatio >= 1.0 ? 'yaxşı' : 'orta'} kateqoriyasına aiddir. S&P 500-ün uzunmüddətli orta Sharpe nisbəti 0.9-1.0 civarındadır. Sizin ${metrics.sharpeRatio} göstəriciniz bazardan ${((metrics.sharpeRatio - 0.95) / 0.95 * 100).toFixed(0)}% daha yaxşıdır.

– **Qeyd:**
Yüksək beta aktivlərinizə baxmayaraq yaxşı Sharpe nisbəti, düzgün aktiv seçimini göstərir. Lakin Sortino nisbətinizin aşağı olması (${metrics.sortinoRatio}) zərərli volatilliyin risklərini vurğulayır.`,

        "monte-carlo": `**Monte Carlo Simulyasiyası: ${monteCarlo.simulations.toLocaleString()} Ssenariya**

– **Nədir?**
Monte Carlo, minlərlə müxtəlif bazar ssenarisi yaradaraq portföyünüzün gələcək performansını proqnozlaşdırır. Bu, "növbəti il nə baş verə bilər?" sualına ehtimallı cavablar verir.

– **Niyə vacibdir?**
Tək proqnoz əvəzinə bütün mümkün nəticələrin paylanmasını görürsünüz. Bu, risk idarəetməsi üçün əvəzsizdir.

– **Sizin portföyünüz üzrə (12 aylıq horizon):**

| Ssenari | Gəlir | Ehtimal |
|---------|-------|---------|
| Ən yaxşı | +${monteCarlo.bestCase.return}% | ${monteCarlo.bestCase.probability}% |
| Baza | +${monteCarlo.baseCase.return}% | ${monteCarlo.baseCase.probability}% |
| Ən pis | ${monteCarlo.worstCase.return}% | ${monteCarlo.worstCase.probability}% |

– **Gözlənilən Nəticə:**
${monteCarlo.simulations.toLocaleString()} ssenariya əsasında, 70% ehtimal ilə növbəti il gəliriniz **${(monteCarlo.expectedReturn - 10).toFixed(0)}% ilə ${(monteCarlo.expectedReturn + 15).toFixed(0)}%** aralığında olacaq.

– **Xəbərdarlıq:**
${monteCarlo.worstCase.probability}% ehtimalla ${monteCarlo.worstCase.return}% itki mümkündür. Bu, $${((metrics.totalValue * Math.abs(monteCarlo.worstCase.return)) / 100).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} itkiyə bərabərdir.`,

        diversification: `**Diversifikasiya Analizi**

– **Nədir?**
Diversifikasiya, riskin müxtəlif aktivlər arasında yayılmasıdır. Yaxşı diversifikasiya olunan portföy, tək aktivin düşməsindən daha az təsirlənir.

– **Niyə vacibdir?**
"Bütün yumurtaları bir səbətə qoymamaq" prinsipidir. Aktivlər arasındakı korrelyasiya nə qədər aşağıdırsa, portföy o qədər müdafiə olunur.

– **Sizin portföyünüz üzrə:**
- **Sektor konsentrasiyası:** Texnologiya sektorunun çəkisi ${holdings.filter(h => h.sector === 'Technology').reduce((sum, h) => sum + h.weight, 0).toFixed(1)}% — bu çox yüksəkdir
- **Korrelyasiya problemi:** AAPL-MSFT korrelyasiyası 0.85 — demək olar ki, eyni hərəkət edirlər
- **Beta riski:** Orta portföy betası ${metrics.beta} — bazar 10% düşsə, portföyünüz ~${(metrics.beta * 10).toFixed(0)}% düşə bilər

– **Təkliflər:**
1. Müdafiə sektorları əlavə edin: XLU (utilities), XLP (consumer staples)
2. Beynəlxalq diversifikasiya: VEA (developed markets), VWO (emerging markets)
3. Sabit gəlir: AGG (bonds), TIP (TIPS)

– **Master Market View:** ${masterMarketView.sentiment} (Etibarlılıq: ${masterMarketView.confidence}%)`,

        "what-if": `**What-If Ssenari: FED Faiz Artımı (+50 bps)**

– **Ssenari:**
Əgər Federal Reserve gözlənilməz şəkildə faiz dərəcələrini 50 basis nöqtə (0.5%) artırsa:

– **Gözlənilən Təsir:**

| Aktiv | Təsir | Səbəb |
|-------|-------|-------|
| NVDA | -8% ilə -12% | Yüksək beta, growth stock |
| TSLA | -10% ilə -15% | DCF dəyərləmə həssaslığı |
| AAPL | -4% ilə -6% | Nisbətən müdafiəvi |
| MSFT | -5% ilə -7% | Cloud gəlirləri stabil |
| JPM | +2% ilə +4% | NIM expansion |

– **Portföy Səviyyəsində:**
- Gözlənilən portföy dəyişikliyi: **-6% ilə -9%**
- Dollar ifadəsində: **-$${((metrics.totalValue * 0.075)).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}**
- Ən çox təsirlənən: TSLA (${holdings.find(h => h.symbol === 'TSLA')?.weight.toFixed(1)}% çəki)

– **Hedcinq Strategiyası:**
1. SH (Short S&P 500 ETF) ilə qorunma
2. TLT call options (bonds rally when stocks fall)
3. Pozisiya azaltma: TSLA, NVDA

– **Geosiyasi AI Qeydi:** GRİ=${portfolio.geopoliticalRiskIndex}/100 — orta risk`
    };

    return responses[queryType] || `Portföyünüz haqqında ümumi məlumat istəyirsiniz. Xüsusi sual verin - MDD, VaR, Sharpe və ya digər göstəricilər haqqında.`;
}
