"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, TrendingUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const upcomingEvents = [
    {
        date: "Mon 16",
        symbol: "AAPL",
        event: "Earnings",
        impact: "High",
        color: "red",
    },
    {
        date: "Wed 18",
        symbol: null,
        event: "Fed Decision",
        impact: "Critical",
        color: "red",
    },
    {
        date: "Thu 19",
        symbol: "NVDA",
        event: "Earnings",
        impact: "High",
        color: "amber",
    },
    {
        date: "Fri 20",
        symbol: "MSFT",
        event: "Product Launch",
        impact: "Medium",
        color: "cyan",
    },
];

export function EventCalendar() {
    return (
        <Card className="bg-[#1A1A28]/60 border border-cyan-500/20 backdrop-blur-sm">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20">
                        <CalendarIcon className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                        <CardTitle className="text-lg text-white">Event Calendar</CardTitle>
                        <p className="text-sm text-gray-400">Upcoming Events</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {upcomingEvents.map((event, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        className={`p-3 rounded-lg border cursor-pointer ${event.color === "red"
                                ? "bg-red-500/10 border-red-500/20 hover:bg-red-500/15"
                                : event.color === "amber"
                                    ? "bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/15"
                                    : "bg-cyan-500/10 border-cyan-500/20 hover:bg-cyan-500/15"
                            }`}
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                                <div className="text-xs text-gray-400 mb-1">{event.date}</div>
                                <div className="text-sm font-semibold text-white mb-1">
                                    {event.symbol && (
                                        <span className="text-cyan-400 mr-2">{event.symbol}</span>
                                    )}
                                    {event.event}
                                </div>
                                <div className="flex items-center gap-1">
                                    <AlertCircle className={`w-3 h-3 ${event.color === "red" ? "text-red-400" :
                                            event.color === "amber" ? "text-amber-400" :
                                                "text-cyan-400"
                                        }`} />
                                    <span className={`text-xs font-medium ${event.color === "red" ? "text-red-400" :
                                            event.color === "amber" ? "text-amber-400" :
                                                "text-cyan-400"
                                        }`}>
                                        Impact: {event.impact}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

                <Button
                    variant="outline"
                    className="w-full border-purple-500/20 hover:bg-purple-500/10 text-purple-400"
                >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Run Stress Test
                </Button>

                <p className="text-xs text-gray-500 text-center">
                    Events may impact your portfolio
                </p>
            </CardContent>
        </Card>
    );
}
