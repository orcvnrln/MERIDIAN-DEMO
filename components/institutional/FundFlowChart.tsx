import React from "react";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface FundFlowChartProps {
    data: { month: string; inflow: number; outflow: number }[];
}

export const FundFlowChart: React.FC<FundFlowChartProps> = ({ data }) => (
    <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-green-500/30 p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            💰 Institutional Money Flows (Last 90 Days)
        </h3>
        <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #334155",
                        borderRadius: "8px",
                    }}
                />
                <Legend />
                <Bar dataKey="inflow" fill="#10b981" name="Inflow" radius={[4, 4, 0, 0]} />
                <Bar dataKey="outflow" fill="#ef4444" name="Outflow" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    </Card>
);
