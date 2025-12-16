import { apiGet } from "./client";

export type WatchItem = { symbol: string; name: string; price: number; change: number; changePercent: number };

export async function fetchWatchlist(): Promise<WatchItem[]> {
  try {
    return await apiGet<WatchItem[]>("/api/watchlist");
  } catch {
    return [
      { symbol: "AAPL", name: "Apple Inc.", price: 105.12, change: 1.24, changePercent: 1.2 },
      { symbol: "TSLA", name: "Tesla Inc.", price: 189.44, change: -2.15, changePercent: -1.12 },
      { symbol: "MSFT", name: "Microsoft", price: 312.2, change: 0.88, changePercent: 0.28 },
    ];
  }
}

