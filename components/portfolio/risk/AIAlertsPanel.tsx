"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, TrendingUp, TrendingDown } from "lucide-react";
import {
    mockActiveAlerts,
    getAlertSeverityColor,
    getAlertIcon,
    type AIAlert,
} from "@/lib/mock-data/ai-alerts";
import { useState } from "react";

export function AIAlertsPanel() {
    const [alerts, setAlerts] = useState(mockActiveAlerts.filter(a => a.isActive));

    const dismissAlert = (alertId: string) => {
        setAlerts(alerts.filter(a => a.id !== alertId));
    };

    if (alerts.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4">
            <AnimatePresence>
                {alerts.map((alert, index) => (
                    <AlertCard
                        key={alert.id}
                        alert={alert}
                        index={index}
                        onDismiss={() => dismissAlert(alert.id)}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}

function AlertCard({
    alert,
    index,
    onDismiss,
}: {
    alert: AIAlert;
    index: number;
    onDismiss: () => void;
}) {
    const riskReduction = alert.impact.riskReduction;
    const isPositiveImpact = riskReduction > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ delay: index * 0.1 }}
            className={`relative bg-[#12121a] border-l-4 rounded-xl overflow-hidden ${getAlertSeverityColor(
                alert.severity
            )}`}
        >
            {/* Close Button */}
            <button
                onClick={onDismiss}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
                <X className="w-5 h-5" />
            </button>

            <div className="p-6">
                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                    <span className="text-2xl">{getAlertIcon(alert.type)}</span>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">{alert.title}</h3>
                        <p className="text-sm text-gray-400">{alert.subtitle}</p>
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-300 mb-4">{alert.description}</p>

                {/* AI Analysis */}
                <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        AI Analysis
                    </h4>
                    <ul className="space-y-1.5">
                        {alert.analysis.map((point, i) => (
                            <li key={i} className="text-sm text-gray-300 flex items-start">
                                <span className="text-cyan-400 mr-2">•</span>
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Recommendation */}
                <div className="mb-4 p-4 bg-white/5 rounded-lg border border-gray-700/50">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        Recommendation
                    </h4>
                    <p className="text-sm font-medium text-white">{alert.recommendation}</p>
                </div>

                {/* Impact Metrics */}
                <div className="mb-6 p-4 bg-black/20 rounded-lg border border-gray-800/50">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        Impact
                    </h4>
                    <div className="flex items-center gap-4">
                        <div>
                            <div className="text-xs text-gray-500 mb-1">Current CVaR</div>
                            <div className="text-lg font-bold text-red-400">
                                {alert.impact.currentCVaR.toFixed(1)}%
                            </div>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                            {isPositiveImpact ? (
                                <TrendingDown className="w-6 h-6 text-emerald-400" />
                            ) : (
                                <TrendingUp className="w-6 h-6 text-red-400" />
                            )}
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 mb-1">Projected CVaR</div>
                            <div
                                className={`text-lg font-bold ${isPositiveImpact ? "text-emerald-400" : "text-red-400"
                                    }`}
                            >
                                {alert.impact.projectedCVaR.toFixed(1)}%
                            </div>
                        </div>
                        <div className="ml-4">
                            <div className="text-xs text-gray-500 mb-1">Risk Reduction</div>
                            <div className="text-lg font-bold text-emerald-400">
                                {isPositiveImpact ? "-" : "+"}
                                {Math.abs(riskReduction).toFixed(1)}%
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {alert.actions.map((action) => (
                        <Button
                            key={action.id}
                            variant={action.type === "primary" ? "default" : "ghost"}
                            size="sm"
                            className={
                                action.type === "primary"
                                    ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                                    : action.type === "danger"
                                        ? "bg-red-600 hover:bg-red-700 text-white"
                                        : "text-gray-400 hover:text-white"
                            }
                            onClick={() => {
                                console.log(`Action: ${action.action}`);
                                if (action.action === "dismiss") {
                                    onDismiss();
                                }
                            }}
                        >
                            {action.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Severity Indicator Glow (for crisis) */}
            {alert.severity === "crisis" && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-red-500/5 animate-pulse" />
                </div>
            )}
        </motion.div>
    );
}
