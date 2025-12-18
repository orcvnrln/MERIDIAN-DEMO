import React from "react";
import { DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface SmartMoneyIndexProps {
    metrics: {
        sentiment: number;
        netFlow30d: number;
        trendDirection: string;
        status: string;
    };
}

export const SmartMoneyIndex: React.FC<SmartMoneyIndexProps> = ({ metrics }) => (
    <Card className="bg-gradient-to-br from-blue-950/80 to-purple-950/80 border-blue-500/30 p-8 shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.01]">
        <div className="flex items-center justify-between mb-4">
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                    🏦 SMART MONEY INDEX: ACCUMULATING ({metrics.sentiment}/100)
                </h2>
                <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-400">Net Flows: +{metrics.netFlow30d.toFixed(1)}B (30d)</span>
                    <span className="text-blue-400">Trend: ↗️ {metrics.trendDirection}</span>
                    <span className="text-purple-400">Status: {metrics.status}</span>
                </div>
            </div>
            <div className="text-right">
                <div className="text-5xl font-bold text-green-400">{metrics.sentiment}</div>
                <div className="text-sm text-slate-400">Bullish Signal</div>
            </div>
        </div>
    </Card>
);
