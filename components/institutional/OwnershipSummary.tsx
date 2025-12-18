import React from "react";
import { Card } from "@/components/ui/card";
import { StatCard } from "./StatCard";

interface OwnershipSummaryProps {
    breakdown: {
        institutional: number;
        retail: number;
        insiders: number;
        other: number;
        totalHolders: number;
        top10Control: number;
        top10Value: number;
        concentrationRisk: string;
        herfindahlIndex: number;
    };
}

export const OwnershipSummary: React.FC<OwnershipSummaryProps> = ({ breakdown }) => (
    <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-600/50 p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            💰 INSTITUTIONAL OWNERSHIP: {breakdown.institutional}% ($
            {(breakdown.institutional * 30.8).toFixed(2)}T)
        </h3>
        <div className="grid grid-cols-6 gap-6 mb-8">
            <StatCard label="Institutional" value={`${breakdown.institutional}%`} bg="bg-blue-600/20" text="text-blue-400" />
            <StatCard label="Retail" value={`${breakdown.retail}%`} bg="bg-green-600/20" text="text-green-400" />
            <StatCard label="Insiders" value={`${breakdown.insiders}%`} bg="bg-yellow-600/20" text="text-yellow-400" />
            <StatCard label="Other" value={`${breakdown.other}%`} bg="bg-slate-600/20" text="text-slate-400" />
            <StatCard label="Total Holders" value={breakdown.totalHolders.toLocaleString()} bg="bg-emerald-600/20" text="text-emerald-400" />
            <StatCard label="Top 10 Control" value={`${breakdown.top10Control}%`} bg="bg-cyan-600/20" text="text-cyan-400" />
        </div>
        <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
                <div className="text-white font-semibold">{breakdown.totalHolders.toLocaleString()} institutions</div>
            </div>
            <div>
                <div className="text-slate-400">Top 10 Control</div>
                <div className="text-white font-semibold">{breakdown.top10Control}% (${(breakdown.top10Value / 1_000_000_000).toFixed(1)}B)</div>
            </div>
            <div>
                <div className="text-slate-400">Concentration Risk</div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{breakdown.concentrationRisk} (Herfindahl: {breakdown.herfindahlIndex})</Badge>
            </div>
        </div>
    </Card>
);
