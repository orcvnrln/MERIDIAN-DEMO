import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

type HeatItem = {
  symbol: string;
  name: string;
  change: number;
  weight?: number;
};

export function HeatmapBoard({
  palette,
  items,
  onSelect,
}: {
  palette: Palette;
  items: HeatItem[];
  onSelect?: (sym: string) => void;
}) {
  const colorFor = (v: number) => {
    // map change [-5%, +5%] into down/up gradient
    const clamped = Math.max(-5, Math.min(5, v));
    if (clamped >= 0) {
      const t = clamped / 5;
      return lerpColor("#1f2e1f", palette.up, t);
    }
    const t = Math.abs(clamped) / 5;
    return lerpColor("#2f1b1b", palette.down, t);
  };

  return (
    <Card style={{ backgroundColor: palette.card, borderColor: palette.grid }}>
      <CardHeader>
        <CardTitle className="text-base" style={{ color: palette.text }}>
          Market Heatmap
        </CardTitle>
        <p className="text-sm" style={{ color: palette.muted }}>Mock movers by change %</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
          {items.map((item) => (
            <button
              key={item.symbol}
              className="rounded-md p-3 text-left transition-transform hover:-translate-y-0.5"
              style={{
                backgroundColor: colorFor(item.change),
                color: "#fff",
                border: `1px solid ${palette.grid}55`,
              }}
              title={`${item.symbol} ${item.change >= 0 ? "+" : ""}${item.change.toFixed(2)}%`}
              onClick={() => onSelect?.(item.symbol)}
            >
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>{item.symbol}</span>
                <span>{item.change >= 0 ? "+" : ""}{item.change.toFixed(2)}%</span>
              </div>
              <div className="text-xs mt-1 opacity-80">{item.name}</div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function lerpColor(c1: string, c2: string, t: number) {
  const a = hexToRgb(c1);
  const b = hexToRgb(c2);
  if (!a || !b) return c1;
  const r = Math.round(a.r + (b.r - a.r) * t);
  const g = Math.round(a.g + (b.g - a.g) * t);
  const bl = Math.round(a.b + (b.b - a.b) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

function hexToRgb(hex: string) {
  const sanitized = hex.replace("#", "");
  if (sanitized.length !== 6) return null;
  const num = parseInt(sanitized, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

