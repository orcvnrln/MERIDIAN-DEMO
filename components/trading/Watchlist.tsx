"use client";

import { Plus, RefreshCw, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWatchlist, WatchItem } from "@/lib/api/trading";

const Watchlist = () => {
  const [expandedSections, setExpandedSections] = useState({
    shares: true,
    futures: false,
    crypto: false,
  });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["watchlist"],
    queryFn: fetchWatchlist,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="font-semibold">Watchlist</h3>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Plus className="w-4 h-4" />
          </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-4 gap-2 px-4 py-2 text-xs text-muted-foreground border-b border-border">
        <span>Symbol</span>
        <span className="text-right">Last</span>
        <span className="text-right">Change</span>
        <span className="text-right">Change%</span>
      </div>

      {/* Watchlist Items */}
      <div className="divide-y divide-border">
        {isLoading && (
          <div className="px-4 py-2 text-sm text-muted-foreground">Loading...</div>
        )}
        {!isLoading && data?.map((item) => (
          <WatchlistRow key={item.symbol} item={{ ...item, color: '#6B7280' }} />
        ))}
      </div>

      {/* Sections */}
      <div className="border-t border-border">
        <SectionToggle 
          label="Shares" 
          expanded={expandedSections.shares} 
          onClick={() => toggleSection('shares')} 
        />
        <SectionToggle 
          label="Futures" 
          expanded={expandedSections.futures} 
          onClick={() => toggleSection('futures')} 
        />
        <SectionToggle 
          label="Cryptocurrencies" 
          expanded={expandedSections.crypto} 
          onClick={() => toggleSection('crypto')} 
        />
      </div>
    </div>
  );
};

const WatchlistRow = ({ item }: { item: WatchItem & { color?: string } }) => {
  const isPositive = item.change >= 0;
  
  return (
    <div className="grid grid-cols-4 gap-2 px-4 py-2.5 hover:bg-secondary/50 transition-colors cursor-pointer group">
      <div className="flex items-center gap-2">
        <div 
          className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-card"
          style={{ backgroundColor: item.color }}
        >
          {item.symbol[0]}
        </div>
        <span className="font-medium text-sm">{item.symbol}</span>
      </div>
      <span className="text-right font-mono text-sm">{item.price.toLocaleString()}</span>
      <span className={`text-right font-mono text-sm ${isPositive ? 'text-up' : 'text-down'}`}>
        {isPositive ? '+' : ''}{item.change.toFixed(2)}
      </span>
      <span className={`text-right font-mono text-sm ${isPositive ? 'text-up' : 'text-down'}`}>
        {isPositive ? '+' : ''}{item.changePercent.toFixed(2)}%
      </span>
    </div>
  );
};

const SectionToggle = ({ label, expanded, onClick }: { label: string; expanded: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
  >
    {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
    {label}
  </button>
);

export default Watchlist;
