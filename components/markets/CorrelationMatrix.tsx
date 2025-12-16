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

type MatrixRow = {
  symbol: string;
  values: number[];
};

export function CorrelationMatrix({
  palette,
  symbols,
  data,
}: {
  palette: Palette;
  symbols: string[];
  data: MatrixRow[];
}) {
  const colorFor = (v: number) => {
    // v in [-1,1] map to red->neutral->purple
    if (v >= 0) {
      const t = Math.min(1, v);
      return lerpColor("#2d1b46", palette.purple, t);
    }
    const t = Math.min(1, Math.abs(v));
    return lerpColor("#3b0b0b", palette.down, t);
  };

  return (
    <Card style={{ backgroundColor: palette.card, borderColor: palette.grid }}>
      <CardHeader>
        <CardTitle className="text-base">Correlation Matrix</CardTitle>
        <p className="text-sm" style={{ color: palette.muted }}>Mock correlations across key symbols</p>
      </CardHeader>
      <CardContent className="overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th
                className="text-left pr-2 sticky left-0 top-0 z-20"
                style={{ color: palette.muted, backgroundColor: palette.card }}
              >
                Sym
              </th>
              {symbols.map((s) => (
                <th
                  key={s}
                  className="text-center px-2 sticky top-0 z-10"
                  style={{ color: palette.muted, backgroundColor: palette.card }}
                >
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.symbol}>
                <td
                  className="py-1 pr-2 font-medium sticky left-0 z-10"
                  style={{ color: palette.text, backgroundColor: palette.card }}
                >
                  {row.symbol}
                </td>
                {row.values.map((v, idx) => (
                  <td key={idx} className="text-center px-2 py-1" title={`${v.toFixed(2)}`}>
                    <div
                      className="rounded-sm text-xs font-semibold"
                      style={{
                        backgroundColor: colorFor(v),
                        color: "#fff",
                        padding: "4px",
                      }}
                    >
                      {v.toFixed(2)}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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

