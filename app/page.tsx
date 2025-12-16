import Navbar from "@/components/trading/Navbar";
import TradingChart from "@/components/trading/TradingChart";
import Watchlist from "@/components/trading/Watchlist";
import AlertsPanel from "@/components/trading/AlertsPanel";
import StockInfo from "@/components/trading/StockInfo";
import OrderTicket from "@/components/trading/OrderTicket";
import BottomTabs from "@/components/trading/BottomTabs";
import Sidebar from "@/components/trading/Sidebar";
import AIAssistantPanel from "@/components/trading/AIAssistantPanel";

const currentStock = {
  symbol: "AAPL",
  name: "Apple Inc",
  exchange: "Nasdaq",
  sector: "Electronic Technology · Telecommunications Equipment",
  price: 198.50,
  change: 2.84,
  changePercent: 1.45,
};

type HomeProps = {
  searchParams?: {
    symbol?: string;
  };
};

const stockLookup: Record<string, typeof currentStock> = {
  AAPL: currentStock,
  MSFT: { ...currentStock, symbol: "MSFT", name: "Microsoft", price: 312.2, change: 0.88, changePercent: 0.28 },
  NVDA: { ...currentStock, symbol: "NVDA", name: "Nvidia", price: 889.5, change: -2.44, changePercent: -0.27 },
  TSLA: { ...currentStock, symbol: "TSLA", name: "Tesla", price: 189.4, change: -1.12, changePercent: -0.59 },
  AMZN: { ...currentStock, symbol: "AMZN", name: "Amazon", price: 171.6, change: 2.41, changePercent: 1.42 },
};

export default function HomePage({ searchParams }: HomeProps) {
  const sym = searchParams?.symbol?.toUpperCase?.();
  const stock = (sym && stockLookup[sym]) || currentStock;

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Navbar
        symbol={stock.symbol}
        price={stock.price}
        change={stock.change}
        changePercent={stock.changePercent}
      />

      <div className="flex-1 flex min-h-0">
        <Sidebar />

        <main className="flex-1 p-3 min-w-0">
          <TradingChart symbol={stock.symbol} />
        </main>

        <aside className="w-80 border-l border-border bg-background p-3 flex flex-col gap-3 overflow-y-auto">
          <Watchlist />
          <AlertsPanel />
          <StockInfo {...stock} />
          <OrderTicket symbol={stock.symbol} currentPrice={stock.price} />
        </aside>

        <aside className="w-80 border-l border-border bg-background p-3 overflow-y-auto">
          <AIAssistantPanel symbol={stock.symbol} timeframe="1D" />
        </aside>
      </div>

      <BottomTabs />
    </div>
  );
}
