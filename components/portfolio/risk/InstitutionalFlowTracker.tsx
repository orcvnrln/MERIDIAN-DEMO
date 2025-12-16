"use client";

import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import {
    mockInstitutionalFlows,
    formatFlowAmount,
    getSentimentColor,
    getSentimentIcon,
} from "@/lib/mock-data/ai-alerts";

export function InstitutionalFlowTracker() {
    const flows = mockInstitutionalFlows;

    const getSourceBadge = (source: string) => {
        const badges = {
            etf: "ETF",
            dark_pool: "Dark Pool",
            options: "Options",
            cot: "COT",
        };
        return badges[source as keyof typeof badges] || source;
    };

    return (
        <div className="bg-[#12121a] border border-gray-800/50 rounded-xl p-6">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-white">Institutional Flow Tracker</h2>
                <p className="text-sm text-gray-400">Smart money positioning and whale activity (24h)</p>
            </div>

            {/* Flows List */}
            <div className="space-y-3">
                {flows.map((flow, index) => (
                    <div
                        key={index}
                        className="p-4 bg-white/5 rounded-lg border border-gray-800/50 hover:bg-white/[0.07] transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="text-sm font-semibold text-white">{flow.asset}</div>
                                    <span className="px-2 py-0.5 text-xs font-medium bg-gray-700/50 text-gray-300 rounded">
                                        {getSourceBadge(flow.source)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        {flow.direction === "inflow" ? (
                                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                                        ) : (
                                            <TrendingDown className="w-4 h-4 text-red-400" />
                                        )}
                                        <span className="text-xs text-gray-500 capitalize">{flow.direction}</span>
                                    </div>
                                    <div className="text-xs text-gray-500">{flow.timeframe}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <div
                                        className={`text-lg font-bold ${flow.direction === "inflow" ? "text-emerald-400" : "text-red-400"
                                            }`}
                                    >
                                        {flow.direction === "inflow" ? "+" : "-"}
                                        {formatFlowAmount(flow.flow)}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className={`text-2xl ${getSentimentColor(flow.sentiment)}`}>
                                        {getSentimentIcon(flow.sentiment)}
                                    </span>
                                    <span className={`text-sm font-semibold uppercase ${getSentimentColor(flow.sentiment)}`}>
                                        {flow.sentiment}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary Stats */}
            <div className="mt-6 pt-6 border-t border-gray-800/50">
                <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                        <div className="text-xs text-gray-500 mb-1">Total Inflows</div>
                        <div className="text-xl font-bold text-emerald-400">
                            {formatFlowAmount(
                                flows.filter((f) => f.direction === "inflow").reduce((sum, f) => sum + f.flow, 0)
                            )}
                        </div>
                    </div>
                    <div className="p-4 bg-red-500/5 rounded-lg border border-red-500/20">
                        <div className="text-xs text-gray-500 mb-1">Total Outflows</div>
                        <div className="text-xl font-bold text-red-400">
                            {formatFlowAmount(
                                flows.filter((f) => f.direction === "outflow").reduce((sum, f) => sum + f.flow, 0)
                            )}
                        </div>
                    </div>
                    <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
                        <div className="text-xs text-gray-500 mb-1">Net Flow</div>
                        <div className="text-xl font-bold text-blue-400">
                            {formatFlowAmount(
                                flows.reduce(
                                    (sum, f) => sum + (f.direction === "inflow" ? f.flow : -f.flow),
                                    0
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Insights */}
            <div className="mt-6 p-4 bg-black/20 rounded-lg border border-gray-800/50">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Key Insights
                </div>
                <ul className="space-y-1.5">
                    <li className="text-sm text-gray-300 flex items-start">
                        <span className="text-cyan-400 mr-2">•</span>
                        <span>Strong safe-haven demand: $2.4B into gold ETFs</span>
                    </li>
                    <li className="text-sm text-gray-300 flex items-start">
                        <span className="text-cyan-400 mr-2">•</span>
                        <span>Tech rotation: $1.8B outflow from QQQ</span>
                    </li>
                    <li className="text-sm text-gray-300 flex items-start">
                        <span className="text-cyan-400 mr-2">•</span>
                        <span>NVDA dark pool showing bearish tilt ($680M outflow)</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
