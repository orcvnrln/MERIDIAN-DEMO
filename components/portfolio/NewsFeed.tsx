"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const newsItems = [
    {
        title: "NVDA Q4 beats estimates",
        symbol: "NVDA",
        impact: 5.2,
        time: "2h ago",
        summary: "Strong datacenter revenue growth",
    },
    {
        title: "Fed signals rate pause",
        symbol: null,
        impact: null,
        time: "5h ago",
        summary: "Market optimism increases",
    },
    {
        title: "AAPL services revenue up 12%",
        symbol: "AAPL",
        impact: 2.8,
        time: "1d ago",
        summary: "Subscription growth continues",
    },
    {
        title: "Tech sector rotation concerns",
        symbol: null,
        impact: -3.5,
        time: "1d ago",
        summary: "Investors moving to value",
    },
];

export function NewsFeed() {
    return (
        <Card className="bg-[#1A1A28]/60 border border-cyan-500/20 backdrop-blur-sm">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                        <Newspaper className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                        <CardTitle className="text-lg text-white">News Feed</CardTitle>
                        <p className="text-sm text-gray-400">Portfolio Impact</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {newsItems.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        className="p-3 rounded-lg bg-[#0B0B12]/60 border border-cyan-500/10 hover:border-cyan-500/30 transition-all cursor-pointer group"
                    >
                        <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    {item.symbol && (
                                        <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                                            {item.symbol}
                                        </span>
                                    )}
                                    <span className="text-xs text-gray-500">{item.time}</span>
                                </div>
                                <h4 className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                                    {item.title}
                                </h4>
                                <p className="text-xs text-gray-400 mt-1">{item.summary}</p>
                            </div>
                            {item.impact !== null && (
                                <div className={`flex items-center gap-1 px-2 py-1 rounded ${item.impact > 0
                                        ? "bg-emerald-500/10 text-emerald-400"
                                        : "bg-red-500/10 text-red-400"
                                    }`}>
                                    {item.impact > 0 ? (
                                        <TrendingUp className="w-3 h-3" />
                                    ) : (
                                        <TrendingDown className="w-3 h-3" />
                                    )}
                                    <span className="text-xs font-semibold">
                                        {item.impact > 0 ? "+" : ""}{item.impact}%
                                    </span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}

                <Button
                    variant="ghost"
                    className="w-full text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                >
                    View All News
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <p className="text-xs text-gray-500 text-center">
                    AI-curated news for your holdings
                </p>
            </CardContent>
        </Card>
    );
}
