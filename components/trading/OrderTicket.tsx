"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpDown, Info } from 'lucide-react';

interface OrderTicketProps {
  symbol: string;
  currentPrice: number;
}

const OrderTicket = ({ symbol, currentPrice }: OrderTicketProps) => {
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [quantity, setQuantity] = useState('1');
  const [limitPrice, setLimitPrice] = useState(currentPrice.toString());

  const estimatedTotal = parseFloat(quantity || '0') * (orderType === 'market' ? currentPrice : parseFloat(limitPrice || '0'));

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border">
        <h3 className="font-semibold">Order Ticket</h3>
      </div>

      <div className="p-4 space-y-4">
        {/* Order Type Tabs */}
        <Tabs value={orderType} onValueChange={(v) => setOrderType(v as 'market' | 'limit')}>
          <TabsList className="grid w-full grid-cols-2 h-9">
            <TabsTrigger value="market" className="text-xs">Market</TabsTrigger>
            <TabsTrigger value="limit" className="text-xs">Limit</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Symbol */}
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Symbol</label>
          <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg">
            <div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center">
              <span className="text-card text-[10px] font-bold">{symbol[0]}</span>
            </div>
            <span className="font-medium text-sm">{symbol}</span>
            <span className="text-xs text-muted-foreground ml-auto">${currentPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Quantity</label>
          <div className="relative">
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="pr-16"
              min="1"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button className="px-1.5 py-0.5 text-xs bg-secondary rounded hover:bg-secondary/80">25%</button>
              <button className="px-1.5 py-0.5 text-xs bg-secondary rounded hover:bg-secondary/80">MAX</button>
            </div>
          </div>
        </div>

        {/* Limit Price (only for limit orders) */}
        {orderType === 'limit' && (
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Limit Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                type="number"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                className="pl-7"
                step="0.01"
              />
            </div>
          </div>
        )}

        {/* Estimated Total */}
        <div className="flex items-center justify-between py-2 border-t border-border">
          <span className="text-sm text-muted-foreground">Est. Total</span>
          <span className="font-semibold font-mono">${estimatedTotal.toFixed(2)}</span>
        </div>

        {/* Fee Notice */}
        <div className="flex items-start gap-2 p-2 bg-secondary/50 rounded-lg">
          <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Commission: $0.00 · Est. slippage: ~0.02%
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button className="bg-up hover:bg-up/90 text-up-foreground h-10">
            Buy {symbol}
          </Button>
          <Button className="bg-down hover:bg-down/90 text-down-foreground h-10">
            Sell {symbol}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderTicket;
