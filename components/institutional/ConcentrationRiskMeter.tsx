import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

interface ConcentrationRiskProps {
    breakdown: {
        concentrationRisk: string;
        herfindahlIndex: number;
    };
}

export const ConcentrationRiskMeter: React.FC<ConcentrationRiskProps> = ({ breakdown }) => (
    <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-600/50 p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-yellow-400" />
            Concentration Risk
        </h3>
        <div className="text-center text-slate-300">
            <span className="text-white">Herfindahl Index: {breakdown.herfindahlIndex.toFixed(3)}</span>
            <br />
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mt-2">
                {breakdown.concentrationRisk}
            </Badge>
        </div>
    </Card>
);
