"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MarketsTable } from "@/components/markets/MarketsTable";
import { MarketsCards } from "@/components/markets/MarketsCards";
import { MoversSidebar } from "@/components/markets/MoversSidebar";
import { MarketsKpis } from "@/components/markets/MarketsKpis";
import { MarketsAiInsights } from "@/components/markets/MarketsAiInsights";
import { CorrelationMatrix } from "@/components/markets/CorrelationMatrix";
import { HeatmapBoard } from "@/components/markets/HeatmapBoard";
import { Filter, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Navbar from "@/components/trading/Navbar";
import { ChartModal } from "@/components/markets/ChartModal";

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
  liteGrayLine: string;
  icons: string;
};

type MarketRow = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  marketCap: number;
  sector: string;
  assetType: "Crypto" | "Forex" | "Stocks" | "Indices" | "Commodities" | "Bonds";
  spark?: number[];
  logo?: string;
};

const darkPalette: Palette = {
  bg: "#0b1020",
  card: "#111827",
  text: "#e5e7eb",
  muted: "#9aa3b5",
  grid: "#1f2937",
  up: "#00ff88",
  down: "#ff4d4d",
  purple: "#1e3a8a", // deep navy blue
  accent: "#5ea8ff", // soft branded blue
  alert: "#f59e0b",
  liteGrayLine: "#283144",
  icons: "#9aa3b5",
};

const lightPalette: Palette = {
  bg: "#f3f6fb",
  card: "#ffffff",
  text: "#0b1220",
  muted: "#5b6475",
  grid: "#e2e8f0",
  up: "#16a34a",
  down: "#dc2626",
  purple: "#1f4fbf", // professional navy-blue
  accent: "#5ea8ff", // soft sky blue
  alert: "#f59e0b",
  liteGrayLine: "#d7dde6",
  icons: "#6b7280",
};

const categoryTabs = ["All", "Crypto", "Forex", "Stocks", "Indices", "Commodities", "Bonds"];

const logoMap: Record<string, string> = {
  AAPL: "https://logo.clearbit.com/apple.com",
  MSFT: "https://logo.clearbit.com/microsoft.com",
  NVDA: "https://logo.clearbit.com/nvidia.com",
  TSLA: "https://logo.clearbit.com/tesla.com",
  AMZN: "https://logo.clearbit.com/amazon.com",
  META: "https://logo.clearbit.com/meta.com",
  GOOGL: "https://logo.clearbit.com/abc.xyz",
  SPX: "https://logo.clearbit.com/spglobal.com",
  DJI: "https://logo.clearbit.com/dow.com",
  IXIC: "https://logo.clearbit.com/nasdaq.com",
  FTSE: "https://logo.clearbit.com/londonstockexchange.com",
  DAX: "https://logo.clearbit.com/deutsche-boerse.com",
  GOLD: "https://logo.clearbit.com/gold.org",
  SILVER: "https://logo.clearbit.com/lme.com",
  OIL: "https://logo.clearbit.com/exxonmobil.com",
  NATGAS: "https://logo.clearbit.com/chevron.com",
  COPPER: "https://logo.clearbit.com/freeport-mcmoran.com",
  BTC: "https://cryptoicons.org/api/icon/btc/200",
  ETH: "https://cryptoicons.org/api/icon/eth/200",
  BNB: "https://cryptoicons.org/api/icon/bnb/200",
  SOL: "https://cryptoicons.org/api/icon/sol/200",
  ADA: "https://cryptoicons.org/api/icon/ada/200",
  EURUSD: "https://flagcdn.com/w40/eu.png",
  GBPUSD: "https://flagcdn.com/w40/gb.png",
  USDJPY: "https://flagcdn.com/w40/jp.png",
  AUDUSD: "https://flagcdn.com/w40/au.png",
  USDCAD: "https://flagcdn.com/w40/ca.png",
  US10Y: "https://logo.clearbit.com/treasury.gov",
  US30Y: "https://logo.clearbit.com/treasury.gov",
  DE10Y: "https://flagcdn.com/w40/de.png",
  JP10Y: "https://flagcdn.com/w40/jp.png",
  UK10Y: "https://flagcdn.com/w40/gb.png",
};

const seededSpark = (base: number, seed: string, volatility = 0.1) => {
  const points: number[] = [];
  let current = base;
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  const nextRand = () => {
    h = (h * 1664525 + 1013904223) % 4294967296;
    return (h >>> 0) / 4294967296;
  };
  for (let i = 0; i < 20; i++) {
    const bump = (nextRand() - 0.5) * base * volatility;
    current += bump;
    points.push(Math.max(0, parseFloat(current.toFixed(2))));
  }
  return points;
};

const baseMarkets: Record<string, MarketRow[]> = {
  crypto: [
    { symbol: "BTC", name: "Bitcoin", price: 43250.5, change: 3.45, volume: 28.5, marketCap: 845, sector: "Cryptocurrency", assetType: "Crypto" },
    { symbol: "ETH", name: "Ethereum", price: 2325.1, change: 2.12, volume: 18.2, marketCap: 280, sector: "Cryptocurrency", assetType: "Crypto" },
    { symbol: "BNB", name: "Binance Coin", price: 318.6, change: 1.02, volume: 1.9, marketCap: 49, sector: "Cryptocurrency", assetType: "Crypto" },
    { symbol: "SOL", name: "Solana", price: 98.4, change: -0.8, volume: 3.2, marketCap: 42, sector: "Cryptocurrency", assetType: "Crypto" },
    { symbol: "ADA", name: "Cardano", price: 0.62, change: 0.5, volume: 1.1, marketCap: 21, sector: "Cryptocurrency", assetType: "Crypto" },
  ],
  forex: [
    { symbol: "EURUSD", name: "Euro / US Dollar", price: 1.0921, change: 0.18, volume: 520, marketCap: 0, sector: "FX", assetType: "Forex" },
    { symbol: "GBPUSD", name: "British Pound / US Dollar", price: 1.2734, change: -0.12, volume: 410, marketCap: 0, sector: "FX", assetType: "Forex" },
    { symbol: "USDJPY", name: "US Dollar / Japanese Yen", price: 147.12, change: 0.21, volume: 600, marketCap: 0, sector: "FX", assetType: "Forex" },
    { symbol: "AUDUSD", name: "Australian Dollar / US Dollar", price: 0.659, change: 0.08, volume: 280, marketCap: 0, sector: "FX", assetType: "Forex" },
    { symbol: "USDCAD", name: "US Dollar / Canadian Dollar", price: 1.354, change: -0.04, volume: 240, marketCap: 0, sector: "FX", assetType: "Forex" },
  ],
  stocks: [
    { symbol: "AAPL", name: "Apple Inc.", price: 191.12, change: 1.24, volume: 82.4, marketCap: 2980, sector: "Tech", assetType: "Stocks" },
    { symbol: "MSFT", name: "Microsoft", price: 312.8, change: 0.88, volume: 61.1, marketCap: 2840, sector: "Tech", assetType: "Stocks" },
    { symbol: "NVDA", name: "Nvidia", price: 889.5, change: -2.44, volume: 42.9, marketCap: 2200, sector: "Tech", assetType: "Stocks" },
    { symbol: "TSLA", name: "Tesla", price: 189.4, change: -1.12, volume: 73.2, marketCap: 615, sector: "Auto", assetType: "Stocks" },
    { symbol: "AMZN", name: "Amazon", price: 171.6, change: 2.41, volume: 54.8, marketCap: 1760, sector: "Retail", assetType: "Stocks" },
  ],
  indices: [
    { symbol: "SPX", name: "S&P 500", price: 5145.6, change: 0.22, volume: 92.1, marketCap: 0, sector: "Index", assetType: "Indices" },
    { symbol: "DJI", name: "Dow Jones", price: 38720.4, change: 0.14, volume: 76.3, marketCap: 0, sector: "Index", assetType: "Indices" },
    { symbol: "IXIC", name: "Nasdaq Composite", price: 16232.5, change: 0.36, volume: 88.1, marketCap: 0, sector: "Index", assetType: "Indices" },
    { symbol: "FTSE", name: "FTSE 100", price: 8145.3, change: -0.22, volume: 85, marketCap: 0, sector: "Index", assetType: "Indices" },
    { symbol: "DAX", name: "German DAX", price: 18230.1, change: 0.14, volume: 90, marketCap: 0, sector: "Index", assetType: "Indices" },
  ],
  commodities: [
    { symbol: "GOLD", name: "Gold", price: 2355.6, change: 0.27, volume: 150, marketCap: 0, sector: "Metals", assetType: "Commodities" },
    { symbol: "SILVER", name: "Silver", price: 28.4, change: 0.72, volume: 88, marketCap: 0, sector: "Metals", assetType: "Commodities" },
    { symbol: "OIL", name: "Crude Oil", price: 79.12, change: -0.54, volume: 180, marketCap: 0, sector: "Energy", assetType: "Commodities" },
    { symbol: "NATGAS", name: "Natural Gas", price: 2.18, change: -1.14, volume: 120, marketCap: 0, sector: "Energy", assetType: "Commodities" },
    { symbol: "COPPER", name: "Copper", price: 4.12, change: 0.38, volume: 64, marketCap: 0, sector: "Metals", assetType: "Commodities" },
  ],
  bonds: [
    { symbol: "US10Y", name: "US 10Y Note", price: 4.23, change: 0.05, volume: 210, marketCap: 0, sector: "Rates", assetType: "Bonds" },
    { symbol: "US30Y", name: "US 30Y Bond", price: 4.36, change: 0.04, volume: 180, marketCap: 0, sector: "Rates", assetType: "Bonds" },
    { symbol: "DE10Y", name: "German 10Y", price: 2.42, change: -0.02, volume: 95, marketCap: 0, sector: "Rates", assetType: "Bonds" },
    { symbol: "JP10Y", name: "Japan 10Y", price: 0.89, change: 0.01, volume: 82, marketCap: 0, sector: "Rates", assetType: "Bonds" },
    { symbol: "UK10Y", name: "UK 10Y Gilt", price: 4.01, change: -0.06, volume: 70, marketCap: 0, sector: "Rates", assetType: "Bonds" },
  ],
};

const MARKETS_DATA: Record<string, MarketRow[]> = Object.fromEntries(
  Object.entries(baseMarkets).map(([key, list]) => [
    key,
    list.map((item) => ({
      ...item,
      spark: seededSpark(item.price, item.symbol, 0.08),
      logo: logoMap[item.symbol],
    })),
  ]),
) as Record<string, MarketRow[]>;

const AI_INSIGHTS = [
  { symbol: "BTC", name: "Bitcoin", stance: "BUY" as const, potential: "+12%", horizon: "swing", confidence: 82, summary: "Breakout above trend with rising on-chain flows; pullbacks bid." },
  { symbol: "AAPL", name: "Apple Inc.", stance: "HOLD" as const, potential: "+6%", horizon: "medium-term", confidence: 68, summary: "Stable momentum; watch services growth and hardware cadence." },
  { symbol: "NVDA", name: "Nvidia", stance: "BUY" as const, potential: "+15%", horizon: "short-term", confidence: 74, summary: "Leadership intact; monitor supply and hyperscaler capex updates." },
  { symbol: "EURUSD", name: "Euro / USD", stance: "SELL" as const, potential: "-1%", horizon: "short-term", confidence: 65, summary: "Rate divergence favors USD; watch inflation surprises." },
] satisfies Parameters<typeof MarketsAiInsights>[0]["items"];

const NEWS = [
  { title: "Semis ease after record run; investors focus on guidance quality", sentiment: "Neutral", symbol: "NVDA" },
  { title: "Cloud demand keeps megacaps buoyant ahead of earnings", sentiment: "Positive", symbol: "AAPL" },
  { title: "Crude slips; inventory build tempers energy complex", sentiment: "Neutral", symbol: "OIL" },
  { title: "Bond yields steady as traders weigh inflation path", sentiment: "Neutral", symbol: "US10Y" },
  { title: "BTC flow data shows continued bid from institutional desks", sentiment: "Positive", symbol: "BTC" },
  { title: "EURUSD slips as rate divergence narrative firms", sentiment: "Negative", symbol: "EURUSD" },
  { title: "Nvidia guides above street; supply tightness persists", sentiment: "Positive", symbol: "NVDA" },
  { title: "TSLA trims margins to defend share; investors cautious", sentiment: "Negative", symbol: "TSLA" },
  { title: "Gold holds bid as real yields soften into Fed minutes", sentiment: "Positive", symbol: "GOLD" },
];

const corrSymbols = ["AAPL", "MSFT", "NVDA", "TSLA", "AMZN"];
const corrData = [
  { symbol: "AAPL", values: [1, 0.82, 0.76, 0.44, 0.68] },
  { symbol: "MSFT", values: [0.82, 1, 0.79, 0.41, 0.63] },
  { symbol: "NVDA", values: [0.76, 0.79, 1, 0.52, 0.57] },
  { symbol: "TSLA", values: [0.44, 0.41, 0.52, 1, 0.36] },
  { symbol: "AMZN", values: [0.68, 0.63, 0.57, 0.36, 1] },
];

export default function MarketsPage() {
  const { theme = "dark", setTheme } = useTheme();
  const palette = theme === "light" ? lightPalette : darkPalette;
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<"table" | "cards">("table");
  const [category, setCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [chartSymbol, setChartSymbol] = useState<string | null>(null);
  const [data, setData] = useState<MarketRow[]>(() => Object.values(MARKETS_DATA).flat());

  useEffect(() => {
    // Avoid hydration mismatch when theme resolves client-side
    setMounted(true);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) =>
        prev.map((m) => {
          const bump = (Math.random() - 0.5) * 0.8; // +/-0.4%
          const price = Math.max(0.01, m.price * (1 + bump / 100));
          const spark = [...(m.spark ?? [m.price]), price].slice(-20);
          return {
            ...m,
            price: parseFloat(price.toFixed(2)),
            change: parseFloat((m.change + bump).toFixed(2)),
            spark,
          };
        }),
      );
    }, 9000);
    return () => clearInterval(id);
  }, []);

  const categoryData = useMemo(() => {
    if (category === "All") return data;
    return data.filter((item) => item.assetType === category);
  }, [category, data]);

  const filteredData = useMemo(() => {
    const q = search.trim().toLowerCase();
    const base = categoryData;
    const filtered = !q
      ? base
      : base.filter(
        (item) =>
          item.symbol.toLowerCase().includes(q) ||
          item.name.toLowerCase().includes(q),
      );
    return [...filtered].sort((a, b) => b.marketCap - a.marketCap);
  }, [categoryData, search]);

  const metrics = useMemo(() => {
    const source = filteredData.length ? filteredData : data;
    const totalCap = source.reduce((acc, row) => acc + row.marketCap, 0);
    const volume = source.reduce((acc, row) => acc + row.volume, 0);
    const gainers = source.filter((row) => row.change >= 0).length;
    const losers = source.length - gainers;
    const avgChange = source.length ? source.reduce((acc, row) => acc + row.change, 0) / source.length : 0;
    const fearGreed = Math.min(90, Math.max(10, 50 + avgChange * 3));
    const volIndex = Math.min(
      100,
      Math.max(
        8,
        source.length ? (source.reduce((acc, row) => acc + Math.abs(row.change), 0) / source.length) * 8 : 0,
      ),
    );
    return { totalCap, volume, gainers, losers, avgChange, fearGreed, volIndex };
  }, [data, filteredData]);

  const kpis = useMemo(
    () => [
      {
        label: "Total Market Cap",
        value: `${metrics.totalCap.toFixed(0)}B`,
        delta: `${metrics.avgChange >= 0 ? "↑" : "↘"} ${Math.abs(metrics.avgChange).toFixed(2)}%`,
        deltaPositive: metrics.avgChange >= 0,
        progress: Math.min(100, (metrics.totalCap / 8000) * 100),
        subtitle: "Equities · FX · Crypto · Commodities",
      },
      {
        label: "24H Volume",
        value: `${metrics.volume.toFixed(0)}B`,
        delta: "↗ 0.8%",
        deltaPositive: true,
        progress: Math.min(100, (metrics.volume / 2000) * 100),
        subtitle: "Notional turnover (mock)",
      },
      {
        label: "Gainers",
        value: `${metrics.gainers} assets`,
        delta: "↑ breadth",
        deltaPositive: metrics.gainers >= metrics.losers,
        progress: Math.min(100, (filteredData.length || data.length) ? (metrics.gainers / (filteredData.length || data.length)) * 100 : 0),
        subtitle: "Symbols trading above prior close",
      },
      {
        label: "Losers",
        value: `${metrics.losers} assets`,
        delta: "↘ laggards",
        deltaPositive: false,
        progress: Math.min(100, (filteredData.length || data.length) ? (metrics.losers / (filteredData.length || data.length)) * 100 : 0),
        subtitle: "Symbols in drawdown",
      },
      {
        label: "Fear & Greed",
        value: metrics.fearGreed.toFixed(0),
        delta: metrics.fearGreed >= 50 ? "↗ risk-on" : "↘ caution",
        deltaPositive: metrics.fearGreed >= 50,
        progress: metrics.fearGreed,
        subtitle: "Sentiment proxy (mock)",
      },
      {
        label: "Volatility Index",
        value: metrics.volIndex.toFixed(0),
        delta: metrics.volIndex >= 50 ? "↗ elevated" : "↘ calm",
        deltaPositive: metrics.volIndex < 60,
        progress: metrics.volIndex,
        subtitle: "Cross-asset realized vol (mock)",
      },
    ],
    [metrics, data.length],
  );

  const hotToday = useMemo(
    () => filteredData.slice(0, 4).map((item) => ({ symbol: item.symbol, price: item.price, change: item.change })),
    [filteredData],
  );

  const gainers = useMemo(
    () =>
      [...(filteredData.length ? filteredData : data)]
        .sort((a, b) => b.change - a.change)
        .slice(0, 4)
        .map((item) => ({ symbol: item.symbol, change: item.change })),
    [data, filteredData],
  );

  const losers = useMemo(
    () =>
      [...(filteredData.length ? filteredData : data)]
        .sort((a, b) => a.change - b.change)
        .slice(0, 4)
        .map((item) => ({ symbol: item.symbol, change: item.change })),
    [data, filteredData],
  );

  const heatItems = useMemo(() => {
    const pool = filteredData.length ? filteredData : data;
    return pool.slice(0, 12).map(({ symbol, name, change }) => ({ symbol, name, change }));
  }, [filteredData, data]);

  const chartRow = useMemo(() => data.find((m) => m.symbol === chartSymbol), [data, chartSymbol]);

  const toggleSelected = (sym: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(sym)) next.delete(sym);
      else next.add(sym);
      return next;
    });
  };

  const clearSelected = () => setSelected(new Set());

  if (!mounted) {
    // Prevent rendering until theme + client state are ready
    return null;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: palette.bg, color: palette.text }}>
      <Navbar
        symbol={filteredData[0]?.symbol || "AAPL"}
        price={filteredData[0]?.price || 175}
        change={filteredData[0]?.change || 0}
        changePercent={filteredData[0]?.change || 0}
      />
      <div className="max-w-[1800px] mx-auto px-4 py-4 space-y-4">
        <header
          className="sticky top-0 z-30 -mx-4 px-4 py-3 backdrop-blur-xl border-b"
          style={{ backgroundColor: `${palette.bg}f8`, borderColor: palette.grid }}
        >
          <div className="flex flex-col gap-2">
            {/* Top Bar - Market Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-xl font-bold leading-tight">Markets</h1>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs" style={{ color: palette.up }}>Markets Open</span>
                    </div>
                    <span className="text-xs" style={{ color: palette.muted }}>•</span>
                    <span className="text-xs" style={{ color: palette.muted }}>NYSE 09:30 - 16:00 EST</span>
                  </div>
                </div>
                {/* Quick Stats */}
                <div className="hidden lg:flex items-center gap-3 ml-6 pl-6 border-l" style={{ borderColor: palette.grid }}>
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-wide" style={{ color: palette.muted }}>S&P 500</p>
                    <p className="text-sm font-semibold" style={{ color: palette.up }}>+0.42%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-wide" style={{ color: palette.muted }}>NASDAQ</p>
                    <p className="text-sm font-semibold" style={{ color: palette.up }}>+0.67%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-wide" style={{ color: palette.muted }}>DOW</p>
                    <p className="text-sm font-semibold" style={{ color: palette.down }}>-0.12%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-wide" style={{ color: palette.muted }}>VIX</p>
                    <p className="text-sm font-semibold" style={{ color: palette.muted }}>14.2</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-wide" style={{ color: palette.muted }}>BTC</p>
                    <p className="text-sm font-semibold" style={{ color: palette.up }}>+2.8%</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Input
                  placeholder="Axtar..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-48 h-8 text-sm"
                  style={{ backgroundColor: palette.card, color: palette.text, borderColor: palette.grid }}
                />
                <Button
                  variant="outline"
                  className="h-8 text-xs"
                  style={{ borderColor: palette.grid, color: palette.icons }}
                >
                  <Filter className="h-3 w-3 mr-1" />
                  Filter
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  style={{ borderColor: palette.grid, color: palette.icons }}
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  {theme === "light" ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
                </Button>
                <Tabs value={view} onValueChange={(v) => setView(v as "table" | "cards")}>
                  <TabsList className="h-8">
                    <TabsTrigger value="table" className="text-xs px-2">Table</TabsTrigger>
                    <TabsTrigger value="cards" className="text-xs px-2">Cards</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            {/* Category Tabs */}
            <Tabs value={category} onValueChange={setCategory}>
              <TabsList className="flex gap-1 w-full justify-start bg-transparent p-0">
                {categoryTabs.map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="px-3 py-1 text-xs rounded-full data-[state=active]:text-white transition-all"
                    style={{
                      backgroundColor: category === tab ? palette.accent : "transparent",
                      color: category === tab ? "#fff" : palette.muted,
                      border: category === tab ? "none" : `1px solid ${palette.grid}`,
                    }}
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </header>

        <MarketsKpis palette={palette} items={kpis} />
        <MarketsAiInsights palette={palette} items={AI_INSIGHTS} />

        <div className="grid gap-4 lg:grid-cols-2">
          <HeatmapBoard palette={palette} items={heatItems} onSelect={setChartSymbol} />
          <CorrelationMatrix palette={palette} symbols={corrSymbols} data={corrData} />
        </div>

        {selected.size > 0 && (
          <Card style={{ backgroundColor: palette.card, borderColor: palette.grid }}>
            <CardContent className="p-3 flex flex-wrap items-center gap-3 justify-between">
              <div className="text-sm" style={{ color: palette.text }}>
                {selected.size} selected
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  style={{ borderColor: palette.grid, color: palette.icons }}
                  onClick={() => window.open(`/?symbol=${Array.from(selected)[0] ?? ""}`, "_blank")}
                >
                  Open chart
                </Button>
                <Button size="sm" style={{ backgroundColor: palette.accent, color: "#fff" }}>
                  Add to Watchlist
                </Button>
                <Button variant="ghost" size="sm" onClick={clearSelected} style={{ color: palette.icons }}>
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 lg:grid-cols-[2fr,0.9fr]">
          <Card style={{ backgroundColor: palette.card, borderColor: palette.grid }} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Markets</CardTitle>
                <p className="text-sm" style={{ color: palette.muted }}>
                  Dense view with selection, charts, and quick links
                </p>
              </div>
              <Badge className="text-xs" style={{ backgroundColor: palette.accent, color: "#fff" }}>
                Live preview
              </Badge>
            </CardHeader>
            <Separator style={{ backgroundColor: palette.grid }} />
            <CardContent className="p-0">
              <Tabs value={view} onValueChange={(v) => setView(v as "table" | "cards")}>
                <TabsContent value="table" className="m-0">
                  <MarketsTable
                    data={filteredData}
                    palette={palette}
                    selected={selected}
                    onSelect={toggleSelected}
                    onChart={setChartSymbol}
                  />
                </TabsContent>
                <TabsContent value="cards" className="m-0">
                  <MarketsCards
                    data={filteredData}
                    palette={palette}
                    selected={selected}
                    onSelect={toggleSelected}
                    onChart={setChartSymbol}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <MoversSidebar palette={palette} hotToday={hotToday} gainers={gainers} losers={losers} news={NEWS} />
        </div>
      </div>

      <ChartModal open={!!chartSymbol} onOpenChange={(v) => !v && setChartSymbol(null)} row={chartRow} palette={palette} />
    </div>
  );
}
