"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { NewsItem } from "@/lib/mock-data/portfolio-news";

interface AssetNewsCardProps {
    news: NewsItem;
}

export function AssetNewsCard({ news }: AssetNewsCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1a1f2e]/80 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-8 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/40"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                    <span className="text-4xl">{news.icon}</span>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{news.title}</h3>
                        <p className="text-sm text-gray-400">Posted {news.timestamp}</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-3 hover:bg-emerald-500/10 rounded-xl transition-colors"
                >
                    {isExpanded ? (
                        <ChevronUp className="w-6 h-6 text-emerald-400" />
                    ) : (
                        <ChevronDown className="w-6 h-6 text-emerald-400" />
                    )}
                </button>
            </div>

            {/* Impact Metrics */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5 mb-6">
                <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-gray-300">Impact: {news.impact.metric}</span>
                    <span className="text-lg font-bold text-emerald-400">
                        {news.impact.change}
                    </span>
                </div>
            </div>

            {/* Description */}
            <p className="text-base text-gray-300 mb-6 leading-relaxed">
                {news.description}
            </p>

            {/* Sentiment Indicators */}
            {news.sentiment && news.sentiment.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-6">
                    {news.sentiment.map((s, idx) => (
                        <div
                            key={idx}
                            className="px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-sm font-medium text-emerald-400"
                        >
                            {s.label}: {s.value}
                        </div>
                    ))}
                </div>
            )}

            {/* Expandable AI Insight */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-gradient-to-r from-emerald-500/15 to-emerald-400/10 border border-emerald-500/30 rounded-xl p-6 mb-6">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">💡</span>
                                <div>
                                    <h4 className="text-base font-semibold text-emerald-300 mb-3">
                                        AI Recommendation
                                    </h4>
                                    <p className="text-base text-gray-300 leading-relaxed">
                                        {news.aiInsight}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
                {news.actions.map((action, idx) => {
                    const buttonStyles = {
                        primary: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20',
                        secondary: 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
                        tertiary: 'bg-transparent hover:bg-emerald-500/10 text-emerald-400 hover:text-emerald-300 border border-emerald-500/20',
                    };
                    return (
                        <Button
                            key={idx}
                            size="lg"
                            className={`h-10 px-6 text-sm font-medium transition-all duration-200 hover:scale-105 ${buttonStyles[action.type]}`}
                        >
                            {action.label}
                        </Button>
                    );
                })}
            </div>
        </motion.div>
    );
}
