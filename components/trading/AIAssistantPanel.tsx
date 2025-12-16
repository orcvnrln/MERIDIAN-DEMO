"use client";

import { useState } from 'react';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown,
  Target,
  Shield,
  RefreshCw,
  MessageSquare,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  BarChart3,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface AIAssistantPanelProps {
  symbol?: string;
  timeframe?: string;
}

const AIAssistantPanel = ({ symbol = 'AAPL', timeframe = '1D' }: AIAssistantPanelProps) => {
  const [isCalculating, setIsCalculating] = useState(false);

  // Mock analysis data
  const analysis = {
    signal: 'BULLISH',
    confidence: 78,
    trend: {
      direction: 'UP',
      strength: 'Strong',
      description: 'Price above SMA50 & SMA200'
    },
    volatility: {
      level: 'Moderate',
      atr: 12.45,
      percentile: 62
    },
    support: [905.20, 892.50, 878.00],
    resistance: [920.00, 935.50, 950.00],
    breakout: {
      upProbability: 68,
      downProbability: 32
    },
    entry: {
      aggressive: 911.50,
      conservative: 906.80,
      ideal: 908.20
    },
    exit: {
      tp1: 920.00,
      tp2: 935.50,
      tp3: 950.00
    },
    stopLoss: {
      tight: 902.50,
      normal: 897.80,
      wide: 890.00
    },
    risk: {
      riskPercent: 2.1,
      positionSize: 45,
      maxLoss: 450,
      riskReward: 2.8
    }
  };

  const handleRecalculate = () => {
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 1500);
  };

  return (
    <div className="h-full flex flex-col bg-card rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-border bg-secondary/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-primary/10">
              <Brain className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">AI Trading Assistant</h3>
              <p className="text-[10px] text-muted-foreground">{symbol} · {timeframe}</p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={`text-[10px] ${analysis.signal === 'BULLISH' ? 'border-up text-up' : 'border-down text-down'}`}
          >
            {analysis.signal}
          </Badge>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        
        {/* Signal Summary */}
        <section>
          <div className="flex items-center gap-1.5 mb-2">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <h4 className="text-xs font-semibold text-foreground">Signal Summary</h4>
          </div>
          <div className="space-y-2 bg-secondary/30 rounded-md p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">Trend</span>
              <div className="flex items-center gap-1">
                {analysis.trend.direction === 'UP' ? (
                  <TrendingUp className="w-3.5 h-3.5 text-up" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 text-down" />
                )}
                <span className="text-[11px] font-medium text-foreground">{analysis.trend.strength}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">Volatility</span>
              <span className="text-[11px] font-medium text-foreground">{analysis.volatility.level} (ATR: {analysis.volatility.atr})</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">Breakout ↑</span>
              <div className="flex items-center gap-2">
                <Progress value={analysis.breakout.upProbability} className="w-16 h-1.5" />
                <span className="text-[11px] font-medium text-up">{analysis.breakout.upProbability}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">Breakdown ↓</span>
              <div className="flex items-center gap-2">
                <Progress value={analysis.breakout.downProbability} className="w-16 h-1.5" />
                <span className="text-[11px] font-medium text-down">{analysis.breakout.downProbability}%</span>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Support & Resistance */}
        <section>
          <div className="flex items-center gap-1.5 mb-2">
            <BarChart3 className="w-3.5 h-3.5 text-primary" />
            <h4 className="text-xs font-semibold text-foreground">S/R Zones</h4>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-up/10 rounded-md p-2">
              <span className="text-[10px] font-medium text-up block mb-1">Resistance</span>
              {analysis.resistance.map((level, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">R{i + 1}</span>
                  <span className="text-[11px] font-mono text-foreground">${level.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="bg-down/10 rounded-md p-2">
              <span className="text-[10px] font-medium text-down block mb-1">Support</span>
              {analysis.support.map((level, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">S{i + 1}</span>
                  <span className="text-[11px] font-mono text-foreground">${level.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        {/* Entry Levels */}
        <section>
          <div className="flex items-center gap-1.5 mb-2">
            <ArrowUpRight className="w-3.5 h-3.5 text-up" />
            <h4 className="text-xs font-semibold text-foreground">Entry Levels</h4>
          </div>
          <div className="space-y-1.5 bg-secondary/30 rounded-md p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">Aggressive</span>
              <span className="text-[11px] font-mono font-medium text-foreground">${analysis.entry.aggressive.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Target className="w-3 h-3 text-primary" />
                <span className="text-[11px] text-primary font-medium">Ideal Entry</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-primary">${analysis.entry.ideal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">Conservative</span>
              <span className="text-[11px] font-mono font-medium text-foreground">${analysis.entry.conservative.toFixed(2)}</span>
            </div>
          </div>
        </section>

        <Separator />

        {/* Exit Levels */}
        <section>
          <div className="flex items-center gap-1.5 mb-2">
            <ArrowDownRight className="w-3.5 h-3.5 text-indicator" />
            <h4 className="text-xs font-semibold text-foreground">Exit Levels</h4>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1.5 bg-up/5 rounded-md p-2">
              <span className="text-[10px] font-medium text-up block">Take Profit</span>
              <div className="flex justify-between">
                <span className="text-[10px] text-muted-foreground">TP1</span>
                <span className="text-[11px] font-mono text-foreground">${analysis.exit.tp1.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] text-muted-foreground">TP2</span>
                <span className="text-[11px] font-mono text-foreground">${analysis.exit.tp2.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] text-muted-foreground">TP3</span>
                <span className="text-[11px] font-mono text-foreground">${analysis.exit.tp3.toFixed(2)}</span>
              </div>
            </div>
            <div className="space-y-1.5 bg-down/5 rounded-md p-2">
              <span className="text-[10px] font-medium text-down block">Stop Loss</span>
              <div className="flex justify-between">
                <span className="text-[10px] text-muted-foreground">Tight</span>
                <span className="text-[11px] font-mono text-foreground">${analysis.stopLoss.tight.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] text-muted-foreground">Normal</span>
                <span className="text-[11px] font-mono text-foreground">${analysis.stopLoss.normal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] text-muted-foreground">Wide</span>
                <span className="text-[11px] font-mono text-foreground">${analysis.stopLoss.wide.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Risk Model */}
        <section>
          <div className="flex items-center gap-1.5 mb-2">
            <Shield className="w-3.5 h-3.5 text-primary" />
            <h4 className="text-xs font-semibold text-foreground">Risk Model</h4>
          </div>
          <div className="grid grid-cols-2 gap-2 bg-secondary/30 rounded-md p-2.5">
            <div className="text-center">
              <span className="text-[10px] text-muted-foreground block">Risk %</span>
              <span className="text-lg font-bold text-foreground">{analysis.risk.riskPercent}%</span>
            </div>
            <div className="text-center">
              <span className="text-[10px] text-muted-foreground block">Position Size</span>
              <span className="text-lg font-bold text-foreground">{analysis.risk.positionSize}</span>
            </div>
            <div className="text-center">
              <span className="text-[10px] text-muted-foreground block">Max Loss</span>
              <span className="text-sm font-semibold text-down">${analysis.risk.maxLoss}</span>
            </div>
            <div className="text-center">
              <span className="text-[10px] text-muted-foreground block">R:R Ratio</span>
              <span className="text-sm font-semibold text-up">1:{analysis.risk.riskReward}</span>
            </div>
          </div>
        </section>

        <Separator />

        {/* Confidence Score */}
        <section>
          <div className="flex items-center gap-1.5 mb-2">
            <Activity className="w-3.5 h-3.5 text-primary" />
            <h4 className="text-xs font-semibold text-foreground">Confidence Score</h4>
          </div>
          <div className="bg-secondary/30 rounded-md p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-foreground">{analysis.confidence}%</span>
              <Badge className="bg-up/20 text-up border-0 text-[10px]">High Confidence</Badge>
            </div>
            <Progress value={analysis.confidence} className="h-2" />
            <p className="text-[10px] text-muted-foreground mt-2">
              Based on trend alignment, volume confirmation, and technical indicators.
            </p>
          </div>
        </section>
      </div>

      {/* Action Buttons */}
      <div className="p-3 border-t border-border bg-secondary/20 space-y-2">
        <Button 
          variant="default" 
          size="sm" 
          className="w-full h-8 text-xs"
          onClick={handleRecalculate}
          disabled={isCalculating}
        >
          <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isCalculating ? 'animate-spin' : ''}`} />
          {isCalculating ? 'Calculating...' : 'Recalculate'}
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
            Explain
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <Clock className="w-3.5 h-3.5 mr-1.5" />
            24h Forecast
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPanel;
