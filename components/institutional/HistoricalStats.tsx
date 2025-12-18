import React from "react";
import { Card } from "@/components/ui/card";

interface HistoricalStatsProps {
    winRate: string;
    avgReturn: string;
    maxDrawdown: string;
}

export const HistoricalStats: React.FC<HistoricalStatsProps> = ({ winRate, avgReturn, maxDrawdown }) => (
    <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-emerald-950/30 border-emerald-500/30 p-6 shadow-xl">
            <div className="text-sm text-slate-400">Win Rate</div>
            <div className="text-3xl font-bold text-emerald-400">{winRate}</div>
        </Card>
        <Card className="bg-gradient-to-br from-blue-950/30 border-blue-500/30 p-6 shadow-xl">
            <div className="text-sm text-slate-400">Avg Return</div>
            <div className="text-3xl font-bold text-blue-400">{avgReturn}</div>
        </Card>
        <Card className="bg-gradient-to-br from-rose-950/30 border-rose-500/30 p-6 shadow-xl">
            <div className="text-sm text-slate-400">Max Drawdown</div>
            <div className="text-3xl font-bold text-rose-400">{maxDrawdown}</div>
        </Card>
    </div>
);
