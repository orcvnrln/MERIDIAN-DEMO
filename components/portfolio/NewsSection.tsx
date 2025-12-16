"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { ArrowUpRight, ArrowDownRight, ExternalLink } from "lucide-react";

const news = [
    {
        title: "Is French copper cookware worth the big bucks? Chefs defend Vice President Kamala Harris's recent Parisian...",
        source: "MarketWatch",
        time: "12:38 PM ET",
    },
    {
        title: "Alibaba stock just suffered the biggest 5-day selloff in its history, but Susquehanna analyst stays 'positive'...",
        source: "MarketWatch",
        time: "12:38 PM ET",
    },
    {
        title: "Former Chinese official accused of sexual assault by tennis player Peng Shuai was pivotal figure in",
        source: "MarketWatch",
        time: "12:38 PM ET",
    },
    {
        title: "Danske Bank Puts Philippe Vollot in Charge of Group Compliance, Financial Crime Prevention",
        source: "MarketWatch",
        time: "12:38 PM ET",
    },
];

const indices = [
    {
        name: "DJIA",
        sub: "AAPL",
        value: "161.84",
        change: "-65.32 (-1.17%)",
        isPositive: false,
        data: [
            { v: 100 }, { v: 105 }, { v: 102 }, { v: 108 }, { v: 95 }, { v: 98 }, { v: 102 }, { v: 105 }, { v: 100 }, { v: 90 }, { v: 95 }, { v: 100 }, { v: 105 }, { v: 110 }, { v: 108 }, { v: 105 }, { v: 102 }, { v: 100 }, { v: 105 }, { v: 110 }
        ]
    },
    {
        name: "NASDAQ",
        sub: "NFLX",
        value: "602.12",
        change: "-14.32 (-0.11%)",
        isPositive: false,
        data: [
            { v: 100 }, { v: 102 }, { v: 105 }, { v: 103 }, { v: 108 }, { v: 110 }, { v: 108 }, { v: 105 }, { v: 102 }, { v: 100 }, { v: 102 }, { v: 105 }, { v: 108 }, { v: 110 }, { v: 112 }, { v: 115 }, { v: 112 }, { v: 110 }, { v: 108 }, { v: 105 }
        ]
    },
    {
        name: "S&P 500",
        sub: "AAPL",
        value: "11,154.03",
        change: "+2.32 (+0.11%)",
        isPositive: true,
        data: [
            { v: 100 }, { v: 98 }, { v: 95 }, { v: 98 }, { v: 100 }, { v: 102 }, { v: 105 }, { v: 108 }, { v: 110 }, { v: 108 }, { v: 105 }, { v: 102 }, { v: 100 }, { v: 98 }, { v: 95 }, { v: 92 }, { v: 95 }, { v: 98 }, { v: 100 }, { v: 102 }
        ]
    },
];

export function NewsSection() {
    return (
        <Card className="bg-[#1e1b4b] border-none text-white h-full">
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <div className="border-b-2 border-primary pb-1">
                    <CardTitle className="text-sm font-medium">News</CardTitle>
                </div>
                <div className="text-sm text-muted-foreground pb-1">Upcoming events</div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* News List */}
                    <div className="space-y-4">
                        <div className="text-xs text-[#fbbf24] font-medium mb-2">Top News</div>
                        {news.map((item, i) => (
                            <div key={i} className="border-b border-[#2d2a5d] pb-2 last:border-0">
                                <p className="text-xs text-gray-300 hover:text-white cursor-pointer line-clamp-2 mb-1">
                                    {item.title}
                                </p>
                                <div className="flex justify-between text-[10px] text-muted-foreground">
                                    <span>{item.source}</span>
                                    <span>{item.time}</span>
                                </div>
                            </div>
                        ))}
                        <div className="flex items-center text-xs text-[#fbbf24] cursor-pointer mt-2">
                            Read more news <ExternalLink className="ml-1 h-3 w-3" />
                        </div>
                    </div>

                    {/* Indices */}
                    <div className="grid grid-cols-3 gap-4">
                        {indices.map((index) => (
                            <div key={index.name} className="flex flex-col h-full">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <div className="text-[10px] text-muted-foreground">{index.name}</div>
                                        <div className="text-xs font-medium text-[#fbbf24]">{index.sub}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs font-medium">{index.value}</div>
                                        <div className={`text-[10px] ${index.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                            {index.change}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 min-h-[60px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={index.data}>
                                            <defs>
                                                <linearGradient id={`gradient-${index.name}`} x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <YAxis domain={['dataMin', 'dataMax']} hide />
                                            <Area
                                                type="monotone"
                                                dataKey="v"
                                                stroke="#fbbf24"
                                                fill={`url(#gradient-${index.name})`}
                                                strokeWidth={1.5}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex justify-between text-[8px] text-muted-foreground mt-1">
                                    <span>MON</span>
                                    <span>MON</span>
                                </div>
                                <div className="flex justify-between text-[8px] text-muted-foreground">
                                    <span>11A</span>
                                    <span>1P</span>
                                    <span>3P</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-6 grid grid-cols-3 gap-4 text-[10px] border-t border-[#2d2a5d] pt-4">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Crude Oil 70.51</span>
                        <span className="text-green-400">+1.15%</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Gold 1,892.77</span>
                        <span className="text-green-400">+0.15%</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">US 10 Year 10.23</span>
                        <span className="text-red-400">-1.22%</span>
                    </div>
                </div>
                <div className="mt-2 text-[8px] text-muted-foreground text-center">
                    AS OF 01/12/2021 04:32 PM ET - Oil Gold, 10 Yr Bond Data Delayed by 10 min **
                    <div className="text-blue-400 mt-1 cursor-pointer">View more market & sector performance</div>
                </div>

            </CardContent>
        </Card>
    );
}
