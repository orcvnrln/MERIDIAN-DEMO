import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, LineChart, Line } from "recharts";

type Palette = {
  bg: string;
  card: string;
  text: string;
  muted: string;
  grid: string;
  up: string;
  down: string;
  purple: string;
  liteGrayLine: string;
  icons: string;
  accent: string;
  alert: string;
};

type MarketRow = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  marketCap: number;
  spark?: number[];
  logo?: string;
};

export function MarketsTable({
  data,
  palette,
  selected,
  onSelect,
  onChart,
}: {
  data: MarketRow[];
  palette: Palette;
  selected: Set<string>;
  onSelect: (sym: string) => void;
  onChart: (sym: string) => void;
}) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[900px]">
        <div
          className="grid grid-cols-[1.2fr,1fr,1fr,1fr,1fr,1fr,1.2fr] px-4 py-2 text-[11px] font-semibold uppercase tracking-wide sticky top-0 z-10"
          style={{
            color: palette.muted,
            borderBottom: `1px solid ${palette.grid}`,
            backgroundColor: palette.card,
          }}
        >
          <span className="pl-1">Asset</span>
          <span className="text-right">Price</span>
          <span className="text-right">Change</span>
          <span className="text-right">Volume</span>
          <span className="text-right">Market Cap</span>
          <span className="text-right">Spark</span>
          <span className="text-right">Actions</span>
        </div>
        {data.map((row, idx) => {
          const isUp = row.change >= 0;
          const isSelected = selected.has(row.symbol);
          return (
            <div
              key={row.symbol}
              className="grid grid-cols-[1.2fr,1fr,1fr,1fr,1fr,1fr,1.2fr] px-4 py-3 items-center text-sm transition-colors hover:bg-white/5 cursor-pointer"
              style={{
                borderBottom: `1px solid ${palette.grid}`,
                borderLeft: isSelected ? `3px solid ${palette.accent}` : `3px solid transparent`,
                backgroundColor: idx % 2 === 0 ? palette.card : "rgba(255,255,255,0.03)",
              }}
              onClick={() => onSelect(row.symbol)}
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-9 w-9 rounded-full flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: `${palette.grid}55`, border: `1px solid ${palette.grid}` }}
                >
                  {row.logo ? (
                    <img
                      src={row.logo}
                      alt={row.symbol}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-sm font-semibold" style={{ color: palette.text }}>
                      {row.symbol.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold" style={{ color: palette.text }}>
                    {row.symbol}
                  </span>
                  <span className="text-xs" style={{ color: palette.muted }}>
                    {row.name}
                  </span>
                </div>
              </div>
              <span className="text-right font-mono" style={{ color: palette.text }}>
                ${row.price.toFixed(2)}
              </span>
              <div className="flex justify-end items-center gap-2">
                <span className="font-mono" style={{ color: isUp ? palette.up : palette.down }}>
                  {isUp ? "+" : ""}
                  {row.change.toFixed(2)}%
                </span>
                <Badge
                  variant="outline"
                  className="border px-2 py-0.5"
                  style={{
                    borderColor: palette.grid,
                    color: palette.text,
                    backgroundColor: "transparent",
                  }}
                >
                  {isUp ? "Bull" : "Bear"}
                </Badge>
              </div>
              <span className="text-right font-mono" style={{ color: palette.text }}>
                {row.volume.toFixed(1)}B
              </span>
              <span className="text-right font-mono" style={{ color: palette.text }}>
                {row.marketCap.toFixed(0)}B
              </span>
              <div className="flex justify-end">
                <div className="h-10 w-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={(row.spark ?? [row.price]).map((v, i) => ({ i, v }))}>
                      <Line
                        type="monotone"
                        dataKey="v"
                        stroke={isUp ? palette.up : palette.down}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8"
                  style={{ color: palette.icons }}
                onClick={(e) => e.stopPropagation()}
                >
                  Watch
                </Button>
              <Button
                size="sm"
                className="h-8"
                style={{ backgroundColor: palette.accent, color: "#fff" }}
                onClick={(e) => {
                  e.stopPropagation();
                  onChart(row.symbol);
                }}
              >
                View chart
              </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

