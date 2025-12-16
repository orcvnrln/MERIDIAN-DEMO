import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, LineChart, Line } from "recharts";
import { Progress } from "@/components/ui/progress";

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
  sector: string;
  assetType: string;
  spark?: number[];
  logo?: string;
};

type Insight = {
  symbol: string;
  name: string;
  stance: "BUY" | "HOLD" | "SELL";
  potential: string;
  horizon: string;
  confidence: number;
  summary: string;
};

type NewsRow = { title: string; sentiment: string; symbol?: string };

export function DetailsDrawer({
  palette,
  open,
  onOpenChange,
  row,
  insight,
  news,
  onChart,
}: {
  palette: Palette;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  row?: MarketRow;
  insight?: Insight;
  news?: NewsRow[];
  onChart: (sym: string) => void;
}) {
  const isUp = row ? row.change >= 0 : true;
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl" style={{ backgroundColor: palette.card, color: palette.text }}>
        <SheetHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div
                className="h-12 w-12 rounded-full flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: `${palette.grid}55`, border: `1px solid ${palette.grid}` }}
              >
                {row?.logo ? (
                  <img src={row.logo} alt={row.symbol} className="h-full w-full object-contain" />
                ) : (
                  <span className="text-sm font-semibold" style={{ color: palette.text }}>
                    {row?.symbol?.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <SheetTitle style={{ color: palette.text }}>
                  {row?.symbol} · {row?.name}
                </SheetTitle>
                <div className="text-sm" style={{ color: palette.muted }}>
                  {row?.sector}
                </div>
              </div>
            </div>
            {row && (
              <Badge
                variant="outline"
                className="mt-1"
                style={{ borderColor: palette.grid, color: palette.text, backgroundColor: "transparent" }}
              >
                {row.assetType}
              </Badge>
            )}
          </div>
          {row && (
            <div className="flex gap-2 mt-2">
              <Button
                size="sm"
                style={{ backgroundColor: palette.accent, color: "#fff" }}
                onClick={() => onChart(row.symbol)}
              >
                View chart
              </Button>
              <Button
                size="sm"
                variant="ghost"
                style={{ color: palette.text }}
                asChild
              >
                <a href={`/?symbol=${row.symbol}`} target="_blank" rel="noreferrer">
                  Open full page
                </a>
              </Button>
            </div>
          )}
        </SheetHeader>
        {row && (
          <div className="mt-4 space-y-5">
            <div className="flex items-center gap-3 text-lg font-semibold">
              <span className="text-3xl tracking-tight">${row.price.toFixed(2)}</span>
              <Badge style={{ backgroundColor: isUp ? palette.up : palette.down, color: "#fff" }}>
                {isUp ? "+" : ""}
                {row.change.toFixed(2)}%
              </Badge>
            </div>
            <div className="h-52 w-full rounded-lg border" style={{ borderColor: palette.grid }}>
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
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Stat label="Volume" value={`${row.volume.toFixed(1)}B`} color={palette.text} muted={palette.muted} />
              <Stat label="Market Cap" value={`${row.marketCap.toFixed(0)}B`} color={palette.text} muted={palette.muted} />
              <Stat label="Asset" value={row.assetType} color={palette.text} muted={palette.muted} />
              <Stat label="Sector" value={row.sector} color={palette.text} muted={palette.muted} />
            </div>
            <Button className="w-full" style={{ backgroundColor: palette.accent, color: "#fff" }} asChild>
              <a href={`/?symbol=${row.symbol}`}>Trade</a>
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="w-full"
                style={{ borderColor: palette.grid, color: palette.icons }}
              >
                Set Alert
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                style={{ color: palette.text }}
              >
                Watchlist
              </Button>
            </div>
            {insight && (
              <div
                className="rounded-lg p-3 space-y-2"
                style={{
                  backgroundColor: `${palette.purple}10`,
                  border: `1px solid ${palette.purple}30`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold" style={{ color: palette.text }}>
                    AI Insight · {insight.symbol}
                  </div>
                  <Badge
                    className="text-[10px] font-semibold px-2 py-1"
                    style={{
                      backgroundColor:
                        insight.stance === "BUY" ? palette.up : insight.stance === "SELL" ? palette.down : palette.alert,
                      color: "#fff",
                    }}
                  >
                    {insight.stance}
                  </Badge>
                </div>
                <p className="text-sm" style={{ color: palette.text }}>
                  {insight.summary}
                </p>
                <div className="flex items-center gap-2 text-xs" style={{ color: palette.muted }}>
                  <span>Potential: {insight.potential}</span>
                  <span>•</span>
                  <span>Horizon: {insight.horizon}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs" style={{ color: palette.muted }}>
                    <span>AI Confidence</span>
                    <span className="font-mono" style={{ color: palette.text }}>
                      {insight.confidence}%
                    </span>
                  </div>
                  <Progress
                    value={insight.confidence}
                    className="h-2 bg-white/10 rounded-full"
                    indicatorClassName="rounded-full"
                    indicatorStyle={{ backgroundColor: "#fff" }}
                  />
                </div>
              </div>
            )}
            {news && news.length > 0 && (
              <div
                className="rounded-lg p-3 space-y-2"
                style={{ border: `1px solid ${palette.grid}`, backgroundColor: `${palette.card}` }}
              >
                <div className="text-sm font-semibold" style={{ color: palette.text }}>
                  Headlines
                </div>
                {news.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-sm" style={{ color: palette.text }}>
                      {item.title}
                    </div>
                    <div className="text-[11px]" style={{ color: palette.muted }}>
                      Sentiment:{" "}
                      <span style={{ color: item.sentiment === "Positive" ? palette.up : item.sentiment === "Negative" ? palette.down : palette.muted }}>
                        {item.sentiment}
                      </span>
                    </div>
                    {idx < news.length - 1 && <div className="h-px w-full" style={{ backgroundColor: palette.grid }} />}
                  </div>
                ))}
              </div>
            )}
            <div
              className="rounded-lg p-3 text-sm"
              style={{
                backgroundColor: `${palette.purple}15`,
                border: `1px solid ${palette.purple}40`,
                color: palette.text,
              }}
            >
              <div className="text-xs uppercase tracking-wide mb-1" style={{ color: palette.muted }}>
                Quick insight
              </div>
              {isUp
                ? `${row.symbol} is showing constructive momentum with supportive volume. Consider trailing stops near ${row.price.toFixed(2)}.`
                : `${row.symbol} is under pressure; watch for stabilization or reversal setups before adding exposure.`}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Stat({ label, value, color, muted }: { label: string; value: string; color: string; muted: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs" style={{ color: muted }}>
        {label}
      </span>
      <span className="font-medium" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

