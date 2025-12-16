"use client";

import { NewsItem } from "@/lib/mock-data/portfolio-news";

interface NewsKPICardProps {
    news: NewsItem;
    onClick: () => void;
}

export function NewsKPICard({ news, onClick }: NewsKPICardProps) {
    const severityConfig = {
        critical: {
            border: 'border-red-500/40',
            bg: 'bg-red-500/10',
            iconBg: 'bg-red-500/20',
        },
        warning: {
            border: 'border-yellow-500/40',
            bg: 'bg-yellow-500/10',
            iconBg: 'bg-yellow-500/20',
        },
        info: {
            border: 'border-blue-500/40',
            bg: 'bg-blue-500/10',
            iconBg: 'bg-blue-500/20',
        },
    };

    const config = severityConfig[news.severity];

    return (
        <div
            onClick={onClick}
            className={`${config.bg} border ${config.border} rounded-xl p-6 cursor-pointer transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:scale-[1.02]`}
        >
            {/* Icon and Title */}
            <div className="flex items-center gap-3 mb-4">
                <div className={`${config.iconBg} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
                    {news.icon}
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-white text-sm leading-tight">
                        {news.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                        {news.timestamp}
                    </p>
                </div>
            </div>

            {/* Metric */}
            <div className="mb-4">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{news.impact.metric} Impact</span>
                    <span className={`text-lg font-bold ${news.impact.change.includes('+') || news.impact.change.includes('↑')
                            ? 'text-emerald-400'
                            : news.impact.change === 'Neutral'
                                ? 'text-gray-400'
                                : 'text-red-400'
                        }`}>
                        {news.impact.change}
                    </span>
                </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log('Primary action:', news.actions[0]?.label);
                    }}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors"
                >
                    {news.actions[0]?.label || 'Action'}
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick();
                    }}
                    className="bg-white/10 hover:bg-white/20 text-white text-xs font-medium py-2 px-3 rounded-lg border border-white/20 transition-colors"
                >
                    Details
                </button>
            </div>
        </div>
    );
}
