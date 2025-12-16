import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

export function MarketsCards({
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
    <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">
      {data.map((row) => {
        const isUp = row.change >= 0;
        const isSelected = selected.has(row.symbol);
        return (
          <Card
            key={row.symbol}
            onClick={() => onSelect(row.symbol)}
            className="cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
            style={{
              backgroundColor: palette.card,
              borderColor: isSelected ? palette.accent : palette.grid,
              boxShadow: isSelected ? `0 0 0 2px ${palette.accent}55, 0 12px 30px rgba(0,0,0,0.35)` : "0 8px 20px rgba(0,0,0,0.2)",
              transform: isSelected ? "translateY(-3px)" : undefined,
            }}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex gap-3 items-center">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: `${palette.grid}55`, border: `1px solid ${palette.grid}` }}
                  >
                    {row.logo ? (
                      <img src={row.logo} alt={row.symbol} className="h-full w-full object-contain" />
                    ) : (
                      <span className="text-sm font-semibold" style={{ color: palette.text }}>
                        {row.symbol.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-base" style={{ color: palette.text }}>
                      {row.symbol}
                    </CardTitle>
                    <p className="text-sm" style={{ color: palette.muted }}>
                      {row.name}
                    </p>
                  </div>
                </div>
                <Badge
                  className="text-xs"
                  style={{
                    backgroundColor: isUp ? palette.up : palette.down,
                    color: "#fff",
                  }}
                >
                  {isUp ? "Up" : "Down"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold" style={{ color: palette.text }}>
                  ${row.price.toFixed(2)}
                </span>
                <span
                  className="font-mono text-sm"
                  style={{ color: isUp ? palette.up : palette.down }}
                >
                  {isUp ? "+" : ""}
                  {row.change.toFixed(2)}%
                </span>
              </div>
              <div className="text-sm flex items-center gap-3" style={{ color: palette.muted }}>
                <span>Vol: {row.volume.toFixed(1)}B</span>
                <span>Cap: {row.marketCap.toFixed(0)}B</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs" style={{ color: palette.muted }}>
                  Sparkline
                </span>
                <div className="h-12 w-full">
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
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8"
                  style={{ color: palette.icons }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  Add Watchlist
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
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

