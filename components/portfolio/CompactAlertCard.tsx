"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Alert } from "@/lib/mock-data/portfolio-news";

interface CompactAlertCardProps {
    alert: Alert;
}

export function CompactAlertCard({ alert }: CompactAlertCardProps) {
    const severityConfig = {
        critical: {
            border: 'border-red-500/40',
            bg: 'bg-red-500/10',
            text: 'text-red-400',
            pulse: true,
        },
        warning: {
            border: 'border-yellow-500/40',
            bg: 'bg-yellow-500/10',
            text: 'text-yellow-400',
            pulse: false,
        },
        info: {
            border: 'border-blue-500/40',
            bg: 'bg-blue-500/10',
            text: 'text-blue-400',
            pulse: false,
        },
    };

    const config = severityConfig[alert.severity];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${config.bg} border ${config.border} rounded-lg p-4 transition-all duration-200 hover:scale-[1.02] ${config.pulse ? 'animate-pulse-subtle' : ''
                }`}
        >
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
                <span className="text-xl">{alert.icon}</span>
                <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white mb-1">
                        {alert.title}
                    </h4>
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-400">{alert.metric}</p>
                        <span className={`text-xs font-bold ${config.text}`}>
                            {alert.change}
                        </span>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <Button
                size="sm"
                className={`w-full h-8 text-xs ${alert.severity === 'critical'
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : alert.severity === 'warning'
                            ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
            >
                {alert.action.label}
            </Button>
        </motion.div>
    );
}
