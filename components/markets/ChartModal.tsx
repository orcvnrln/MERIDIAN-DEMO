import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, LineChart, Line, Tooltip, CartesianGrid } from "recharts";
import { AnalysisTabs } from "./AnalysisTabs";
import { Separator } from "@/components/ui/separator";
import { ArrowDownRight, ArrowUpRight, X } from "lucide-react";

type Palette = {
  bg: string;
  card: string;
  text: string;
  muted: string;
  grid: string;
  up: string;
  down: string;
  purple: string;
  accent: string;
  alert: string;
  liteGrayLine: string;
  icons: string;
};

type MarketRow = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  marketCap: number;
  spark?: number[];
  sector: string;
  assetType: string;
  logo?: string;
};

export function ChartModal({
  open,
  onOpenChange,
  row,
  palette,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  row?: MarketRow;
  palette: Palette;
}) {
  const sparkData = (row?.spark ?? (row?.price ? [row.price] : [0])).map((v, i) => ({ i, v }));
  const isUp = (row?.change ?? 0) >= 0;
  const sparkChange =
    sparkData.length > 1 && sparkData[0].v !== 0
      ? ((sparkData[sparkData.length - 1].v - sparkData[0].v) / Math.abs(sparkData[0].v)) * 100
      : 0;

  const formatBillions = (value?: number) => {
    if (value === undefined || value === null) return "—";
    const digits = value >= 100 ? 0 : 1;
    return `${value.toFixed(digits)}B`;
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-5xl w-[95vw] p-0 overflow-hidden border"
        style={{ backgroundColor: palette.card, borderColor: palette.grid }}
      >
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 20% 20%, ${palette.accent}22, transparent 40%), radial-gradient(circle at 80% 0%, ${palette.purple}22, transparent 35%)`,
            }}
          />

          <div className="absolute right-2 top-2">
            <DialogClose asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                style={{ color: palette.text }}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>

          <div className="border-b px-5 py-4 flex flex-wrap items-start gap-3 justify-between relative" style={{ borderColor: palette.grid }}>
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-xl" style={{ color: palette.text }}>
                {row?.symbol ?? "—"} · {row?.name ?? ""}
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-2 text-sm" style={{ color: palette.muted }}>
                <span>{row?.assetType ?? "Asset"}</span>
                <Separator orientation="vertical" className="h-4" style={{ backgroundColor: palette.grid }} />
                <span>{row?.sector ?? "Sector"}</span>
              </div>
            </DialogHeader>

            <div className="flex flex-wrap items-center gap-2">
              <Badge
                className="text-xs"
                style={{
                  background: isUp
                    ? `linear-gradient(135deg, ${palette.up}, ${palette.accent})`
                    : palette.down,
                  color: "#fff",
                  boxShadow: isUp ? `0 10px 22px ${palette.up}66` : `0 10px 22px ${palette.down}44`,
                  border: `1px solid ${isUp ? palette.up : palette.down}`,
                }}
              >
                {isUp ? "+" : ""}
                {row?.change.toFixed?.(2) ?? "0.00"}%
              </Badge>
              <Badge
                variant="outline"
                className="text-xs"
                style={{ borderColor: palette.grid, color: palette.text, backgroundColor: `${palette.bg}aa` }}
              >
                {sparkChange >= 0 ? "Trend: building momentum" : "Trend: cooling off"}
              </Badge>
            </div>
          </div>

          <div className="grid gap-6 p-5 lg:grid-cols-[1.6fr,1fr] relative">
            <div className="space-y-4">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-4xl font-semibold leading-none" style={{ color: palette.text }}>
                    {row ? `$${row.price.toFixed(2)}` : "—"}
                  </div>
                  <div className="text-sm" style={{ color: palette.muted }}>
                    Spot price · live market snapshot
                  </div>
                </div>
                <div
                  className="flex items-center gap-2 rounded-full px-3 py-1 text-sm border shadow-sm"
                  style={{
                    backgroundColor: `${palette.bg}dd`,
                    borderColor: palette.grid,
                    color: isUp ? palette.up : palette.down,
                    boxShadow: isUp ? `0 8px 18px ${palette.up}44` : `0 8px 18px ${palette.down}33`,
                  }}
                >
                  {isUp ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  <span>{row ? `${isUp ? "+" : ""}${row.change.toFixed(2)}% today` : "Awaiting data"}</span>
                </div>
              </div>

              <div
                className="h-64 w-full rounded-xl overflow-hidden border shadow-lg"
                style={{
                  backgroundColor: palette.bg,
                  borderColor: palette.grid,
                  boxShadow: `0 18px 38px ${palette.bg}aa, 0 8px 18px ${palette.purple}55`,
                  backgroundImage: `linear-gradient(180deg, ${palette.bg} 0%, ${palette.purple}0f 100%)`,
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparkData} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
                    <defs>
                      <linearGradient id="sparkline" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={palette.accent} />
                        <stop offset="50%" stopColor={isUp ? palette.up : palette.down} />
                        <stop offset="100%" stopColor={palette.purple} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={`${palette.grid}88`} />
                    <Line
                      type="monotone"
                      dataKey="v"
                      stroke="url(#sparkline)"
                      strokeWidth={2.8}
                      dot={false}
                      style={{ filter: `drop-shadow(0px 0px 8px ${isUp ? palette.up : palette.down})` }}
                    />
                    <Tooltip
                      contentStyle={{ background: palette.card, borderColor: palette.grid, color: palette.text }}
                      labelStyle={{ color: palette.muted }}
                      formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "24h Volume", value: formatBillions(row?.volume) },
                  { label: "Market cap", value: formatBillions(row?.marketCap) },
                  { label: "Spark change", value: `${sparkChange >= 0 ? "+" : ""}${sparkChange.toFixed(2)}%` },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border px-3 py-2"
                    style={{ borderColor: palette.grid, backgroundColor: `${palette.bg}aa` }}
                  >
                    <div className="text-xs" style={{ color: palette.muted }}>
                      {stat.label}
                    </div>
                    <div className="text-sm font-semibold" style={{ color: palette.text }}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="space-y-4 rounded-xl p-4 lg:border-l"
              style={{ borderColor: palette.grid, backgroundColor: `${palette.bg}55` }}
            >
              <div className="space-y-2">
                <div className="text-sm font-semibold" style={{ color: palette.text }}>
                  Session highlight
                </div>
                <p className="text-sm leading-relaxed" style={{ color: palette.muted }}>
                  {sparkChange >= 2
                    ? "Buyers are in control with a steady bid and improving intraday structure."
                    : sparkChange <= -2
                    ? "Supply is pressuring price; monitor support zones before sizing in."
                    : "Momentum is balanced — watch for a breakout catalyst before committing size."}
                </p>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" style={{ backgroundColor: palette.accent, color: "#fff" }} asChild>
                  <a href={row ? `/?symbol=${row.symbol}` : "/"} target="_blank" rel="noreferrer">
                    Trade
                  </a>
                </Button>
                <Button className="flex-1" variant="outline" style={{ borderColor: palette.grid, color: palette.text }}>
                  Set Alert
                </Button>
              </div>

              <div className="rounded-lg border px-3 py-2 space-y-2" style={{ borderColor: palette.grid }}>
                <div className="flex items-center gap-2 text-xs" style={{ color: palette.muted }}>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: palette.accent }} />
                  Quick facts
                </div>
                <div className="space-y-1 text-sm" style={{ color: palette.text }}>
                  <div className="flex justify-between gap-2">
                    <span style={{ color: palette.muted }}>Sector</span>
                    <span>{row?.sector ?? "—"}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span style={{ color: palette.muted }}>Asset</span>
                    <span>{row?.assetType ?? "—"}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span style={{ color: palette.muted }}>Symbol</span>
                    <span>{row?.symbol ?? "—"}</span>
                  </div>
                </div>
              </div>

              {row?.symbol && (
                <Button
                  variant="ghost"
                  className="w-full justify-between"
                  style={{ color: palette.text }}
                  asChild
                >
                  <a href={`/analysis?symbol=${row.symbol}`} target="_blank" rel="noreferrer">
                    Open analysis page
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          <div className="p-5 border-t" style={{ borderColor: palette.grid }}>
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold" style={{ color: palette.text }}>
                Analysis breakdown
              </div>
              {row?.symbol && (
                <Badge
                  variant="outline"
                  className="text-xs"
                  style={{ borderColor: palette.grid, color: palette.text, backgroundColor: `${palette.bg}88` }}
                >
                  {row.symbol}
                </Badge>
              )}
            </div>
            <AnalysisTabs
              palette={{
                card: palette.card,
                text: palette.text,
                muted: palette.muted,
                grid: palette.grid,
                accent: palette.accent,
                up: palette.up,
                down: palette.down,
                bg: palette.bg,
              }}
              symbol={row?.symbol}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


