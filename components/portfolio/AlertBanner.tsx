"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, TrendingDown, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Alert {
    id: string;
    type: "critical" | "warning" | "info";
    icon: string;
    message: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

const alerts: Alert[] = [
    {
        id: "1",
        type: "critical",
        icon: "🔴",
        message: "VaR exceeded by $3.2K",
        action: {
            label: "AI suggests: Trim NVDA -$8K [Fix]",
            onClick: () => console.log("Fix VaR issue"),
        },
    },
    {
        id: "2",
        type: "warning",
        icon: "🟠",
        message: "Tech concentration 75% (max: 50%)",
        action: {
            label: "Rebalance →",
            onClick: () => console.log("Rebalance portfolio"),
        },
    },
];

export function AlertBanner() {
    const [visibleAlerts, setVisibleAlerts] = useState<Alert[]>(alerts);
    const [autoHideTimers, setAutoHideTimers] = useState<Map<string, NodeJS.Timeout>>(new Map());

    useEffect(() => {
        // Set auto-hide timer for each alert
        visibleAlerts.forEach((alert) => {
            if (!autoHideTimers.has(alert.id)) {
                const timer = setTimeout(() => {
                    dismissAlert(alert.id);
                }, 10000); // 10 seconds
                setAutoHideTimers(new Map(autoHideTimers.set(alert.id, timer)));
            }
        });

        return () => {
            autoHideTimers.forEach((timer) => clearTimeout(timer));
        };
    }, []);

    const dismissAlert = (id: string) => {
        const timer = autoHideTimers.get(id);
        if (timer) {
            clearTimeout(timer);
            autoHideTimers.delete(id);
        }
        setVisibleAlerts(visibleAlerts.filter((alert) => alert.id !== id));
    };

    if (visibleAlerts.length === 0) return null;

    return (
        <div className="mb-6 space-y-2">
            <AnimatePresence>
                {visibleAlerts.map((alert, index) => (
                    <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, y: -20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, x: 100, height: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`relative overflow-hidden rounded-xl border backdrop-blur-sm ${alert.type === "critical"
                            ? "bg-red-500/10 border-red-500/30"
                            : alert.type === "warning"
                                ? "bg-amber-500/10 border-amber-500/30"
                                : "bg-cyan-500/10 border-cyan-500/30"
                            }`}
                    >
                        <div className="flex items-center justify-between gap-4 px-4 py-2 h-[50px]">
                            <div className="flex items-center gap-3 flex-1 overflow-hidden">
                                <span className="text-xl flex-shrink-0">{alert.icon}</span>
                                <span className="text-sm font-medium text-white truncate">{alert.message}</span>
                                {alert.action && (
                                    <Button
                                        onClick={alert.action.onClick}
                                        size="sm"
                                        className={`ml-auto h-7 text-xs px-3 whitespace-nowrap ${alert.type === "critical"
                                            ? "bg-red-500/20 hover:bg-red-500/30 text-red-300 border-red-500/30"
                                            : alert.type === "warning"
                                                ? "bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-500/30"
                                                : "bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border-cyan-500/30"
                                            } border`}
                                    >
                                        {alert.action.label}
                                    </Button>
                                )}
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => dismissAlert(alert.id)}
                                className="h-6 w-6 rounded-lg hover:bg-white/10 flex-shrink-0"
                            >
                                <X className="w-3 h-3 text-gray-400" />
                            </Button>
                        </div>

                        {/* Progress bar for auto-hide */}
                        <motion.div
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 10, ease: "linear" }}
                            className={`h-1 ${alert.type === "critical"
                                ? "bg-red-500/50"
                                : alert.type === "warning"
                                    ? "bg-amber-500/50"
                                    : "bg-cyan-500/50"
                                }`}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
