"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface StockTab {
  symbol: string;
  name: string;
  icon?: string;
  active?: boolean;
}

const defaultTabs: StockTab[] = [
  { symbol: "NVDA", name: "Nvidia Corp", icon: "🟢" },
  { symbol: "MBG", name: "Mercedes-Benz AG", icon: "🚗" },
  { symbol: "MSFT", name: "Microsoft Corp", icon: "🔷" },
  { symbol: "AAPL", name: "Apple Inc", icon: "🍎", active: true },
  { symbol: "TSLA", name: "Tesla Inc", icon: "⚡" },
  { symbol: "AMZN", name: "Amazon", icon: "📦" },
];

const BottomTabs = () => {
  const pathname = usePathname();
  const [tabs, setTabs] = useState<StockTab[]>(defaultTabs);
  const [activeTab, setActiveTab] = useState("AAPL");

  const handleTabClick = (symbol: string) => {
    setActiveTab(symbol);
    // Navigate to chart with symbol
    window.location.href = `/?symbol=${symbol}`;
  };

  const handleCloseTab = (symbol: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTabs(tabs.filter((t) => t.symbol !== symbol));
  };

  return (
    <div className="h-12 border-t border-border bg-card px-3 flex items-center gap-2 overflow-x-auto">
      {/* Add New Tab Button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0 border border-dashed border-border hover:border-primary hover:text-primary"
      >
        <Plus className="w-4 h-4" />
      </Button>

      {/* Stock Tabs */}
      <div className="flex items-center gap-1 flex-1">
        {tabs.map((tab) => (
          <button
            key={tab.symbol}
            onClick={() => handleTabClick(tab.symbol)}
            className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap
              ${activeTab === tab.symbol
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
          >
            {tab.icon && <span className="text-sm">{tab.icon}</span>}
            <span>{tab.symbol}</span>
            <span className="hidden md:inline text-xs opacity-60">· {tab.name}</span>
            {/* Close button */}
            <span
              onClick={(e) => handleCloseTab(tab.symbol, e)}
              className="ml-1 p-0.5 rounded hover:bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={12} />
            </span>
          </button>
        ))}
      </div>

      {/* Quick Navigation */}
      <div className="flex items-center gap-1 border-l border-border pl-3 ml-2">
        <Link
          href="/markets"
          className={`px-2 py-1 rounded text-xs transition-all ${pathname === "/markets" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
        >
          Markets
        </Link>
        <Link
          href="/analysis"
          className={`px-2 py-1 rounded text-xs transition-all ${pathname?.startsWith("/analysis") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
        >
          Analysis
        </Link>
        <Link
          href="/portfolio"
          className={`px-2 py-1 rounded text-xs transition-all ${pathname === "/portfolio" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
        >
          Portfolio
        </Link>
        <Link
          href="/news"
          className={`px-2 py-1 rounded text-xs transition-all ${pathname === "/news" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
        >
          News
        </Link>
      </div>
    </div>
  );
};

export default BottomTabs;
