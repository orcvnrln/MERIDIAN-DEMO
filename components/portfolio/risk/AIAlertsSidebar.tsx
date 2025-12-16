"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import {
    mockActiveAlerts,
    getAlertSeverityColor,
    getAlertIcon,
    type AIAlert,
} from "@/lib/mock-data/ai-alerts";
import { useState } from "react";

export function AIAlertsSidebar() {
    const [alerts, setAlerts] = useState(mockActiveAlerts.filter(a => a.isActive));
    const [expandedAlert, setExpandedAlert] = useState<string | null>(alerts[0]?.id || null);

    const dismissAlert = (alertId: string) => {
        setAlerts(alerts.filter(a => a.id !== alertId));
        if (expandedAlert === alertId) {
            setExpandedAlert(alerts.find(a => a.id !== alertId)?.id || null);
        }
    };

    if (alerts.length === 0) {
        return null;
    }

    return (
        <div className="fixed right-0 top-16 bottom-0 w-[420px] bg-[#0a0a0f] border-l border-gray-800/50 overflow-y-auto z-40">
            <div className="p-4">
                {/* Header */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                        <AlertCircle className="w-5 h-5 text-amber-400" />
                        <h2 className="text-lg font-semibold text-white">AI Alerts</h2>
                    </div>
                    <p className="text-xs text-gray-400">
                        {alerts.length} active alert{alerts.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {/* Alerts List */}
                <div className="space-y-3">
                    <AnimatePresence>
                        {alerts.map((alert, index) => (
                            <AlertCard
                                key={alert.id}
                                alert={alert}
                                index={index}
                                isExpanded={expandedAlert === alert.id}
                                onToggle={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
                                onDismiss={() => dismissAlert(alert.id)}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

function AlertCard({
    alert,
    index,
    isExpanded,
    onToggle,
    onDismiss,
}: {
    alert: AIAlert;
    index: number;
    isExpanded: boolean;
    onToggle: () => void;
    onDismiss: () => void;
}) {
    const riskReduction = alert.impact.riskReduction;
    const isPositiveImpact = riskReduction > 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: index * 0.05 }}
            className={`relative bg-[#12121a] border-l-4 rounded-lg overflow-hidden cursor-pointer ${getAlertSeverityColor(
                alert.severity
            )}`}
            onClick={onToggle}
        >
            {/* Compact Header (Always Visible) */}
            <div className="p-4">
                <div className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">{getAlertIcon(alert.type)}</span>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-white mb-1 line-clamp-2">{alert.title}</h3>
                        <p className="text-xs text-gray-400 line-clamp-1">{alert.subtitle}</p>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDismiss();
                        }}
                        className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Compact Impact Preview */}
                {!isExpanded && (
                    <div className="mt-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500">CVaR:</span>
                            <span className="text-red-400">{alert.impact.currentCVaR.toFixed(1)}%</span>
                            <span className="text-gray-500">→</span>
                            <span className="text-emerald-400">{alert.impact.projectedCVaR.toFixed(1)}%</span>
                        </div>
                        <div className="text-emerald-400 font-semibold">
                            -{Math.abs(riskReduction).toFixed(1)}%
                        </div>
                    </div>
                )}
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-gray-800/50"
                    >
                        <div className="p-4 space-y-4">
                            {/* Description */}
                            <p className="text-xs text-gray-300">{alert.description}</p>

                            {/* AI Analysis */}
                            <div>
                                <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                    AI Analysis
                                </h4>
                                <ul className="space-y-1">
                                    {alert.analysis.slice(0, 3).map((point, i) => (
                                        <li key={i} className="text-xs text-gray-300 flex items-start">
                                            <span className="text-cyan-400 mr-1.5 flex-shrink-0">•</span>
                                            <span className="line-clamp-2">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Recommendation */}
                            <div className="p-3 bg-white/5 rounded-lg border border-gray-700/50">
                                <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                    Recommendation
                                </h4>
                                <p className="text-xs font-medium text-white line-clamp-2">{alert.recommendation}</p>
                            </div>

                            {/* Impact Metrics */}
                            <div className="p-3 bg-black/20 rounded-lg border border-gray-800/50">
                                <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                    Impact
                                </h4>
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div>
                                        <div className="text-[10px] text-gray-500 mb-0.5">Current</div>
                                        <div className="text-sm font-bold text-red-400">
                                            {alert.impact.currentCVaR.toFixed(1)}%
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        {isPositiveImpact ? (
                                            <TrendingDown className="w-4 h-4 text-emerald-400" />
                                        ) : (
                                            <TrendingUp className="w-4 h-4 text-red-400" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-gray-500 mb-0.5">Projected</div>
                                        <div className="text-sm font-bold text-emerald-400">
                                            {alert.impact.projectedCVaR.toFixed(1)}%
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2">
                                {alert.actions.slice(0, 2).map((action) => (
                                    <Button
                                        key={action.id}
                                        variant={action.type === "primary" ? "default" : "ghost"}
                                        size="sm"
                                        className={`w-full text-xs h-8 ${action.type === "primary"
                                                ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                                                : "text-gray-400 hover:text-white"
                                            }`}
                                        onClick={(e) => {
                                            e.stopPropagation();
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
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Severity Indicator Glow (for crisis) */}
            {alert.severity === "crisis" && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-red-500/5 animate-pulse" />
                </div>
            )}
        </motion.div>
    );
}
