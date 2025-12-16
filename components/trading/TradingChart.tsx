"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { createChart, ColorType, IChartApi, CandlestickData, Time, CandlestickSeries, HistogramSeries, LineSeries } from 'lightweight-charts';
import { ChevronDown, Maximize2, Camera, Settings2, FileText, ExternalLink, BarChart3, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnalysisTabs } from '@/components/markets/AnalysisTabs';
import TradingViewWidget from './TradingViewWidget';

interface TradingChartProps {
  symbol: string;
}

const generateMockData = (): CandlestickData<Time>[] => {
  const data: CandlestickData<Time>[] = [];
  let basePrice = 850;
  const now = new Date();

  for (let i = 100; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const volatility = Math.random() * 15;
    const open = basePrice + (Math.random() - 0.5) * volatility;
    const close = open + (Math.random() - 0.45) * volatility;
    const high = Math.max(open, close) + Math.random() * 5;
    const low = Math.min(open, close) - Math.random() * 5;

    data.push({
      time: date.toISOString().split('T')[0] as Time,
      open,
      high,
      low,
      close,
    });

    basePrice = close;
  }

  return data;
};

const getCssHsl = (name: string, fallback: string) => {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name)?.trim();
  return v ? `hsl(${v})` : fallback;
};

const TradingChart = ({ symbol }: TradingChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [timeframe, setTimeframe] = useState('1D');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [chartType, setChartType] = useState<'tradingview' | 'custom'>('tradingview');

  const colors = useMemo(() => {
    const bg = getCssHsl("--card", "transparent");
    const grid = getCssHsl("--grid", "#E5E7EB");
    const text = getCssHsl("--icons", "#6B7280");
    const up = getCssHsl("--up", "#1FB981");
    const down = getCssHsl("--down", "#E24A4A");
    const accent = getCssHsl("--purple", "#A64CE3");
    return { bg, grid, text, up, down, accent };
  }, []);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.bg },
        textColor: colors.text,
        fontFamily: 'Inter, system-ui, sans-serif',
      },
      grid: {
        vertLines: { color: colors.grid },
        horzLines: { color: colors.grid },
      },
      crosshair: {
        mode: 1,
        vertLine: {
          width: 1,
          color: colors.accent,
          style: 2,
        },
        horzLine: {
          width: 1,
          color: colors.accent,
          style: 2,
        },
      },
      rightPriceScale: {
        borderColor: '#E5E7EB',
        scaleMargins: {
          top: 0.1,
          bottom: 0.2,
        },
      },
      timeScale: {
        borderColor: '#E5E7EB',
        timeVisible: true,
      },
      handleScale: {
        axisPressedMouseMove: true,
      },
      handleScroll: {
        vertTouchDrag: false,
      },
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: colors.up,
      downColor: colors.down,
      borderUpColor: colors.up,
      borderDownColor: colors.down,
      wickUpColor: colors.up,
      wickDownColor: colors.down,
    });

    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: colors.grid,
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: 'volume',
    });

    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.85,
        bottom: 0,
      },
    });

    const data = generateMockData();
    candlestickSeries.setData(data);

    const volumeData = data.map(d => ({
      time: d.time,
      value: Math.random() * 10000000 + 5000000,
      color: d.close >= d.open ? 'rgba(31, 185, 129, 0.3)' : 'rgba(226, 74, 74, 0.3)',
    }));
    volumeSeries.setData(volumeData);

    // Add SMA indicator
    const smaData = data.map((_, i, arr) => {
      if (i < 20) return null;
      const sum = arr.slice(i - 20, i).reduce((acc, d) => acc + d.close, 0);
      return { time: arr[i].time, value: sum / 20 };
    }).filter(Boolean) as { time: Time; value: number }[];

    const smaSeries = chart.addSeries(LineSeries, {
      color: colors.accent,
      lineWidth: 2,
    });
    smaSeries.setData(smaData);

    chartRef.current = chart;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [colors.accent, colors.bg, colors.down, colors.grid, colors.text, colors.up]);

  const timeframes = ['1m', '5m', '15m', '1H', '4H', '1D', '1W'];

  const analysisPalette = useMemo(
    () => ({
      card: colors.bg,
      text: colors.text,
      muted: colors.text,
      grid: colors.grid,
      accent: colors.accent,
      up: colors.up,
      down: colors.down,
      bg: colors.bg,
    }),
    [colors],
  );

  return (
    <div className="flex flex-col h-full bg-card rounded-xl border border-border overflow-hidden">
      {/* Chart Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center">
              <span className="text-card text-xs font-bold">A</span>
            </div>
            <span className="font-semibold">{symbol}</span>
            <span className="text-xs bg-secondary px-1.5 py-0.5 rounded text-muted-foreground">Nasdaq</span>
          </div>

          <Button variant="destructive" size="sm" className="h-7 px-3 bg-down hover:bg-down/90">
            Sell 910.96
          </Button>
          <Button size="sm" className="h-7 px-3 bg-up hover:bg-up/90 text-up-foreground">
            Buy 911.30
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors
                  ${timeframe === tf
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Chart Type Toggle */}
          <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
            <button
              onClick={() => setChartType('tradingview')}
              className={`px-2 py-1 text-xs font-medium rounded transition-all flex items-center gap-1
                ${chartType === 'tradingview'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              <TrendingUp className="w-3 h-3" />
              TradingView
            </button>
            <button
              onClick={() => setChartType('custom')}
              className={`px-2 py-1 text-xs font-medium rounded transition-all flex items-center gap-1
                ${chartType === 'custom'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              <BarChart3 className="w-3 h-3" />
              Custom
            </button>
          </div>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Camera className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowAnalysis((v) => !v)}>
            <FileText className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
            <a href={`/analysis?symbol=${symbol}`} target="_blank" rel="noreferrer">
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Indicators Bar */}
      <div className="flex items-center gap-4 px-4 py-2 border-b border-border bg-secondary/50">
        <button className="flex items-center gap-1 text-xs font-medium text-indicator">
          <span className="w-2 h-2 rounded-full bg-indicator" />
          SMA (20)
        </button>
        <button className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground">
          <span className="w-2 h-2 rounded-full bg-primary" />
          Price
        </button>
        <button className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground">
          RTH
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      {/* Chart Area */}
      {chartType === 'tradingview' ? (
        <div className="flex-1 min-h-0">
          <TradingViewWidget
            symbol={`NASDAQ:${symbol}`}
            theme="dark"
            interval={timeframe === '1D' ? 'D' : timeframe === '1W' ? 'W' : timeframe.replace('m', '').replace('H', '60')}
            hide_side_toolbar={false}
            hide_top_toolbar={false}
            allow_symbol_change={true}
            studies={['RSI@tv-basicstudies', 'MASimple@tv-basicstudies', 'MACD@tv-basicstudies']}
          />
        </div>
      ) : (
        <div ref={chartContainerRef} className="flex-1 min-h-0" />
      )}

      {showAnalysis && (
        <div className="border-t border-border bg-card" style={{ height: '400px', overflow: 'hidden' }}>
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-secondary/30">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="font-semibold text-sm">Quick Analysis · {symbol}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Click tabs below for details</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setShowAnalysis(false)}
              >
                Close ✕
              </Button>
            </div>
          </div>
          <div className="h-[calc(100%-40px)] overflow-y-auto px-4 py-3">
            <AnalysisTabs palette={analysisPalette} symbol={symbol} compact={false} />
          </div>
        </div>
      )}

      {/* Volume Label */}
      <div className="flex items-center gap-4 px-4 py-2 border-t border-border text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="w-2 h-0.5 bg-muted-foreground/50" /> Volume
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-up/30" /> {symbol}
        </span>
      </div>
    </div>
  );
};

export default TradingChart;


