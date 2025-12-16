"use client";

import { ExternalLink, Pencil, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StockInfoProps {
  symbol: string;
  name: string;
  exchange: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
  preMarketPrice?: number;
  preMarketChange?: number;
  preMarketPercent?: number;
}

const StockInfo = ({
  symbol = 'AAPL',
  name = 'Apple Inc',
  exchange = 'Nasdaq',
  sector = 'Electronic Technology · Telecommunications Equipment',
  price = 911.30,
  change = 28.84,
  changePercent = 3.19,
  preMarketPrice = 911.07,
  preMarketChange = 28.75,
  preMarketPercent = 3.17,
}: StockInfoProps) => {
  const isPositive = change >= 0;
  const isPreMarketPositive = (preMarketChange || 0) >= 0;

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center">
            <span className="text-card font-bold text-sm">A</span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">{symbol}</span>
              <ExternalLink className="w-3 h-3 text-muted-foreground" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Star className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Pencil className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Company Info */}
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{sector}</p>
        </div>

        {/* Price */}
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold font-mono">{price.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground">USD</span>
            <span className={`text-sm font-medium ${isPositive ? 'text-up' : 'text-down'}`}>
              {isPositive ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Last update at 03:41 PM, UTC -5</p>
        </div>

        {/* Pre-market */}
        {preMarketPrice && (
          <div className="pt-2 border-t border-border">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold font-mono">{preMarketPrice.toFixed(2)}</span>
              <span className="text-xs text-muted-foreground">USD</span>
              <span className={`text-xs font-medium ${isPreMarketPositive ? 'text-up' : 'text-down'}`}>
                {isPreMarketPositive ? '+' : ''}{preMarketChange?.toFixed(2)} ({preMarketPercent?.toFixed(2)}%)
              </span>
            </div>
            <span className="inline-block mt-1 text-[10px] bg-secondary px-2 py-0.5 rounded text-muted-foreground">
              Pre-market
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockInfo;
