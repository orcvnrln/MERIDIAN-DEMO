import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type Palette = {
  bg: string;
  card: string;
  text: string;
  muted: string;
  grid: string;
  up: string; // #00C853
  down: string; // #FF4D4D
  purple: string; // #7B68EE
  liteGrayLine: string;
  icons: string;
  accent: string; // #9370DB
  alert: string; // #FFA500 (HOLD üçün)
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

// Emoji mapping for quick visual recognition
const stanceEmoji = {
  BUY: "📈",
  HOLD: "➖",
  SELL: "📉",
};

// Confidence bar color: higher = more white, lower = muted
const getConfidenceColor = (confidence: number, palette: Palette) => {
  if (confidence >= 80) return "#fff";
  if (confidence >= 60) return palette.up;
  return palette.muted;
};

export function MarketsAiInsights({ palette, items }: { palette: Palette; items: Insight[] }) {
  return (
    <Card
      className="overflow-hidden"
      style={{
        backgroundColor: palette.card,
        backgroundImage: `linear-gradient(150deg, ${palette.purple}18 0%, ${palette.accent}1f 70%)`,
        color: palette.text,
        border: `1px solid ${palette.grid}`,
      }}
    >
      <CardHeader className="pb-2 pt-3">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm font-semibold" style={{ color: palette.text }}>
            🤖 AI Insights
          </CardTitle>
          <span
            className="text-[10px] px-2 py-0.5 rounded"
            style={{ backgroundColor: `${palette.grid}`, color: palette.text }}
          >
            Market Sentiment
          </span>
        </div>
        <p className="text-[10px] mt-1" style={{ color: palette.muted }}>
          AI-driven stance snapshots with confidence bars
        </p>
      </CardHeader>
      <CardContent className="grid gap-2.5 md:grid-cols-2">
        {items.map((insight) => {
          const stanceColor =
            insight.stance === "BUY" ? palette.up :
            insight.stance === "SELL" ? palette.down :
            palette.icons;

          return (
            <div
              key={insight.symbol}
              className="rounded-lg p-2.5 space-y-2 relative overflow-hidden min-h-[120px]"
              style={{
                backgroundColor: `${stanceColor}10`,
                border: `1px solid ${stanceColor}30`,
              }}
            >
              {/* Small stance indicator top-right */}
              <div className="absolute top-2 right-2 text-xs opacity-80">
                {stanceEmoji[insight.stance]}
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-bold flex items-center gap-1" style={{ color: palette.text }}>
                    {insight.symbol}
                  </div>
                  <div className="text-[11px] mt-0.5" style={{ color: palette.muted }}>{insight.name}</div>
                </div>
                <Badge
                  className="text-[10px] font-semibold px-2 py-0.5 min-w-[58px] text-center"
                  style={{
                    backgroundColor: stanceColor,
                    color: "#fff",
                  }}
                >
                  {insight.stance}
                </Badge>
              </div>

              <p className="text-[12px] leading-relaxed" style={{ color: palette.text }}>
                {insight.summary}
              </p>

              <div className="flex items-center justify-between text-[11px]" style={{ color: palette.muted }}>
                <span>Potential: {insight.potential}</span>
                <span>Horizon: {insight.horizon}</span>
              </div>

              <div className="space-y-1 pt-0.5">
                <div className="flex items-center justify-between text-[11px]" style={{ color: palette.muted }}>
                  <span>AI Confidence</span>
                  <span className="font-mono" style={{ color: palette.text }}>{insight.confidence}%</span>
                </div>
                <Progress
                  value={insight.confidence}
                  className="h-1.5 bg-white/10 rounded-full"
                  indicatorClassName="rounded-full"
                  indicatorStyle={{
                    background: stanceColor,
                    boxShadow: `0 0 8px ${stanceColor}`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}