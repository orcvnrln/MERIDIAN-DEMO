import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, TrendingDown, Newspaper } from "lucide-react";

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

type MiniRow = { symbol: string; price?: number; change: number };
type NewsRow = { title: string; sentiment: string };

export function MoversSidebar({
  palette,
  hotToday,
  gainers,
  losers,
  news,
}: {
  palette: Palette;
  hotToday: MiniRow[];
  gainers: MiniRow[];
  losers: MiniRow[];
  news: NewsRow[];
}) {
  return (
    <div className="space-y-4 w-full lg:w-[320px]">
      {/* Hot Today */}
      <Card style={{ backgroundColor: palette.card, borderColor: palette.grid }}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md" style={{ backgroundColor: `${palette.alert}20` }}>
              🔥
            </div>
            <CardTitle className="text-sm font-semibold" style={{ color: palette.text }}>
              Hot Today
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {hotToday.map((item) => {
            const isUp = item.change >= 0;
            return (
              <div key={item.symbol} className="flex items-center justify-between hover:bg-white/5 p-2 rounded-md transition-colors cursor-pointer">
                <div>
                  <div className="font-semibold text-sm" style={{ color: palette.text }}>{item.symbol}</div>
                  <div className="text-xs" style={{ color: palette.muted }}>
                    ${item.price?.toFixed(2) ?? "-"}
                  </div>
                </div>
                <Badge
                  className="text-xs font-semibold"
                  style={{ backgroundColor: isUp ? palette.up : palette.down, color: "#fff" }}
                >
                  {isUp ? "+" : ""}
                  {item.change.toFixed(2)}%
                </Badge>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Top Gainers */}
      <Card style={{ backgroundColor: palette.card, borderColor: palette.grid }}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} style={{ color: palette.up }} />
            <CardTitle className="text-sm font-semibold" style={{ color: palette.text }}>
              Top Gainers
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {gainers.map((g) => (
            <Row key={g.symbol} palette={palette} item={g} />
          ))}
        </CardContent>
      </Card>

      {/* Top Losers */}
      <Card style={{ backgroundColor: palette.card, borderColor: palette.grid }}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <TrendingDown size={16} style={{ color: palette.down }} />
            <CardTitle className="text-sm font-semibold" style={{ color: palette.text }}>
              Top Losers
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {losers.map((g) => (
            <Row key={g.symbol} palette={palette} item={g} />
          ))}
        </CardContent>
      </Card>

      {/* Market News */}
      <Card style={{ backgroundColor: palette.card, borderColor: palette.grid }}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Newspaper size={16} style={{ color: palette.accent }} />
            <CardTitle className="text-sm font-semibold" style={{ color: palette.text }}>
              Market News
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {news.map((n, idx) => (
            <div key={idx} className="space-y-1 hover:bg-white/5 p-2 rounded-md transition-colors cursor-pointer">
              <div className="text-sm leading-snug" style={{ color: palette.text }}>{n.title}</div>
              <div className="flex items-center gap-2 text-xs" style={{ color: palette.muted }}>
                <Badge 
                  variant="outline" 
                  className="text-[10px] px-1.5 py-0"
                  style={{ 
                    borderColor: palette.grid, 
                    color: n.sentiment === "Positive" ? palette.up : n.sentiment === "Negative" ? palette.down : palette.muted 
                  }}
                >
                  {n.sentiment}
                </Badge>
                <Separator orientation="vertical" className="h-3" />
                <span>Today</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function Row({ item, palette }: { item: MiniRow; palette: Palette }) {
  const isUp = item.change >= 0;
  return (
    <div className="flex items-center justify-between hover:bg-white/5 p-2 rounded-md transition-colors cursor-pointer">
      <div className="font-medium text-sm" style={{ color: palette.text }}>{item.symbol}</div>
      <span className="font-mono text-xs font-semibold" style={{ color: isUp ? palette.up : palette.down }}>
        {isUp ? "+" : ""}
        {item.change.toFixed(2)}%
      </span>
    </div>
  );
}