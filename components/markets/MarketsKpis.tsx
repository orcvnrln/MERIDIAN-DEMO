import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, BarChart3, Activity, Shield, Zap, LineChart } from "lucide-react";

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

type Kpi = {
  label: string;
  value: string;
  delta: string;
  deltaPositive?: boolean;
  progress: number;
  subtitle: string;
};

export function MarketsKpis({ palette, items }: { palette: Palette; items: Kpi[] }) {
  const iconFor = (label: string) => {
    if (label.toLowerCase().includes("cap")) return BarChart3;
    if (label.toLowerCase().includes("volume")) return Activity;
    if (label.toLowerCase().includes("gainer")) return TrendingUp;
    if (label.toLowerCase().includes("loser")) return LineChart;
    if (label.toLowerCase().includes("fear")) return Shield;
    return Zap;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((kpi) => (
        <Card
          key={kpi.label}
          className="overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          style={{
            backgroundColor: palette.card,
            backgroundImage: `linear-gradient(140deg, ${palette.purple}22 0%, ${palette.accent}33 55%, transparent 100%)`,
            color: palette.text,
            boxShadow: "0 14px 28px rgba(0,0,0,0.25)",
            border: `1px solid ${palette.grid}`,
          }}
        >
          <CardContent className="p-4 space-y-2 animate-[fadeUp_280ms_ease]">
            <div className="flex items-center justify-between text-sm" style={{ color: palette.muted }}>
              <div className="flex items-center gap-2">
                <div
                  className="h-9 w-9 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${palette.accent}22`, border: `1px solid ${palette.accent}33` }}
                >
                  {(() => {
                    const Icon = iconFor(kpi.label);
                    return <Icon className="h-4 w-4" style={{ color: palette.accent }} />;
                  })()}
                </div>
                <span className="font-medium" style={{ color: palette.text }}>{kpi.label}</span>
              </div>
              <span
                className="font-semibold"
                style={{ color: kpi.deltaPositive === false ? palette.down : palette.up }}
              >
                {kpi.delta}
              </span>
            </div>
            <div className="text-2xl font-semibold tracking-tight" style={{ color: palette.text }}>
              {kpi.value}
            </div>
            <Progress
              value={kpi.progress}
              className="h-2"
              indicatorClassName=""
              indicatorStyle={{
                background: `linear-gradient(90deg, ${palette.accent}, ${palette.purple})`,
              }}
              style={{ backgroundColor: `${palette.grid}55` }}
            />
            <div className="text-xs" style={{ color: palette.muted }}>
              {kpi.subtitle}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// keyframe helper for subtle entry
// Tailwind not used to keep it component-scoped
const style = `
@keyframes fadeUp {
  0% { opacity: 0; transform: translateY(6px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

if (typeof document !== "undefined" && !document.getElementById("kpi-fade-style")) {
  const tag = document.createElement("style");
  tag.id = "kpi-fade-style";
  tag.innerHTML = style;
  document.head.appendChild(tag);
}

