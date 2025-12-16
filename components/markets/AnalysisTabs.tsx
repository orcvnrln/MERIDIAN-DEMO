"use client";

import type { ComponentType } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, BarChart3, Brain, Shield, Sparkles, TrendingUp } from "lucide-react";

const sections = {
  fundamental: {
    title: "Fundamental",
    summary: "Revenue growth is steady with margin resilience; cash generation supports buybacks while leverage stays contained.",
    bullets: [
      "3Y revenue CAGR ~8% with gross margin holding near 42% despite mix shift.",
      "Operating margin tracking above 25%; opex growth below top-line for FY.",
      "Net cash position after buybacks; interest coverage remains strong.",
      "Guide points to low-double-digit EPS growth if costs stay disciplined.",
    ],
    score: 74,
  },
  sentiment: {
    title: "Sentiment",
    summary: "Headline tone is modestly positive; options skew neutral with call demand balanced by put hedging.",
    bullets: [
      "News tone: +0.18 last 5d; no outsized negative clusters detected.",
      "Social +1.2x baseline engagement; retail flow still constructive.",
      "Put/Call near 0.94; skew not flashing stress, demand capped near money.",
      "Short interest drifts lower; borrow cost benign versus peers.",
    ],
    score: 63,
  },
  technical: {
    title: "Technical",
    summary: "Price holds above medium-term trend with healthy breadth; watch support near the 50-day and recent gap levels.",
    bullets: [
      "Trend: trading above 50d/200d with positive slope on both.",
      "Momentum: RSI in the low 60s, no immediate overbought risk.",
      "Volume: up-days > down-days 5 of last 7 sessions.",
      "Key levels: support near 50d; resistance at recent swing high.",
    ],
    score: 68,
  },
  quant: {
    title: "Quant",
    summary: "Factor exposure leans quality and growth; beta is close to market with contained residual volatility.",
    bullets: [
      "Factor tilt: overweight quality/growth, underweight value/cyclicals.",
      "Beta ~1.05; idiosyncratic vol trending lower versus 3m average.",
      "Earnings revisions breadth positive; estimate dispersion narrowing.",
      "Pair spreads versus peer basket show modest long bias.",
    ],
    score: 59,
  },
  institutional: {
    title: "Institutional",
    summary: "Flow data shows steady ETF demand and light de-grossing from hedge funds; no sign of forced selling.",
    bullets: [
      "ETF flows +$420m over 5d; demand concentrated in core funds.",
      "Prime book shows mild net buying; gross exposure stable week over week.",
      "Dark pool prints consistent with steady accumulation rather than blocks.",
      "Insider activity quiet; no new lock-up or blackout catalysts flagged.",
    ],
    score: 52,
  },
  ai: {
    title: "AI",
    summary: "LLM read: constructive bias while momentum holds; pullbacks to first support look buyable with tight risk.",
    bullets: [
      "Model stance: BUY with medium-term horizon; conviction aided by breadth.",
      "Risk: watch macro prints and USD strength for potential drag.",
      "Setup: prefer staggered entries near support; trail stops below last swing low.",
      "Catalyst map: earnings window + product updates over next 4-6 weeks.",
    ],
    score: 79,
  },
};

type AnalysisSectionKey = keyof typeof sections;

const style = `@keyframes fadeSlide {
  0% { opacity: 0; transform: translateY(6px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes pulseGlow {
  0% { box-shadow: 0 0 0 0 rgba(94, 168, 255, 0.35); }
  70% { box-shadow: 0 0 0 9px rgba(94, 168, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(94, 168, 255, 0); }
}`;

export type AnalysisPalette = {
  card: string;
  text: string;
  muted: string;
  grid: string;
  accent: string;
  up: string;
  down: string;
  purple?: string;
  bg?: string;
};

type AnalysisTabsProps = {
  palette: AnalysisPalette;
  symbol?: string;
  defaultTab?: AnalysisSectionKey;
  compact?: boolean;
  withFrame?: boolean;
};

export function AnalysisTabs({
  palette,
  symbol,
  defaultTab = "fundamental",
  compact = false,
  withFrame = false,
}: AnalysisTabsProps) {
  const activeSymbol = symbol?.toUpperCase?.() || "SYMBOL";
  const icons: Record<AnalysisSectionKey, ComponentType<any>> = {
    fundamental: BarChart3,
    sentiment: Sparkles,
    technical: TrendingUp,
    quant: Activity,
    institutional: Shield,
    ai: Brain,
  };

  return (
    <div
      className={withFrame ? "rounded-lg border p-3" : ""}
      style={
        withFrame
          ? { backgroundColor: palette.card, borderColor: palette.grid, color: palette.text }
          : undefined
      }
    >
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList
          className="flex flex-wrap gap-2 bg-transparent"
          style={{ backgroundColor: `${palette.bg ?? palette.card}10`, border: `1px solid ${palette.grid}` }}
        >
          {Object.keys(sections).map((key) => (
            <TabsTrigger key={key} value={key} className="capitalize data-[state=active]:shadow-sm">
              {key}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(sections).map(([key, section]) => {
          const Icon = icons[key as AnalysisSectionKey];
          return (
            <TabsContent key={key} value={key} className="mt-3 space-y-3 animate-[fadeSlide_260ms_ease]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: palette.text }}>
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-lg"
                    style={{
                      background: `linear-gradient(140deg, ${palette.accent}22, ${palette.up}15)`,
                      border: `1px solid ${palette.grid}`,
                      boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                    }}
                  >
                    <Icon className="h-4 w-4" style={{ color: palette.accent }} />
                  </span>
                  {activeSymbol} · {section.title} view
                </div>
                <Badge
                  className="text-[11px] font-semibold px-2 py-1"
                  style={{
                    background: `linear-gradient(120deg, ${palette.accent}, ${palette.purple ?? palette.accent})`,
                    color: "#fff",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
                  }}
                >
                  {section.score}% conviction
                </Badge>
              </div>

              <p
                className={`text-sm ${compact ? "leading-snug" : "leading-relaxed"}`}
                style={{ color: palette.muted }}
              >
                {section.summary}
              </p>

              <div
                className={`grid gap-2 ${
                  compact ? "md:grid-cols-1" : "md:grid-cols-2"
                }`}
              >
                {section.bullets.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-lg border px-3 py-2.5 text-sm transition-transform hover:-translate-y-[1px] animate-[fadeSlide_260ms_ease]"
                    style={{
                      borderColor: palette.grid,
                      backgroundColor: `${palette.bg ?? palette.card}12`,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                    }}
                  >
                    <span
                      className="mt-1 h-8 w-1.5 rounded-full"
                      style={{
                        background: `linear-gradient(180deg, ${palette.accent}, ${palette.purple ?? palette.accent}99)`,
                        boxShadow: "0 8px 18px rgba(0,0,0,0.18)",
                      }}
                    />
                    <div className="space-y-1">
                      <div
                        className="flex items-center gap-2 text-xs uppercase tracking-wide"
                        style={{ color: palette.muted }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: idx === 0 ? palette.accent : palette.grid }}
                        />
                        Signal
                      </div>
                      <span style={{ color: palette.text }}>{item}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px]" style={{ color: palette.muted }}>
                  <span>Conviction gauge</span>
                  <span className="font-mono" style={{ color: palette.text }}>
                    {section.score}%
                  </span>
                </div>
                <Progress
                  value={section.score}
                  className="h-2 bg-white/10 rounded-full shadow-inner"
                  indicatorClassName="rounded-full"
                  indicatorStyle={{
                    background: `linear-gradient(90deg, ${palette.accent}, ${palette.purple ?? palette.accent})`,
                    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
                    animation: "pulseGlow 2.8s ease-in-out infinite",
                  }}
                />
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}

// Inject local keyframes for subtle entry/glow (scoped by id)
if (typeof document !== "undefined" && !document.getElementById("analysis-tabs-style")) {
  const tag = document.createElement("style");
  tag.id = "analysis-tabs-style";
  tag.innerHTML = style;
  document.head.appendChild(tag);
}

