"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lightbulb } from "lucide-react";
import { NewsItem } from "@/lib/mock-data/portfolio-news";
import { Button } from "@/components/ui/button";

interface NewsDetailModalProps {
    news: NewsItem | null;
    isOpen: boolean;
    onClose: () => void;
}

export function NewsDetailModal({ news, isOpen, onClose }: NewsDetailModalProps) {
    // ESC key handler
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
            // Prevent body scroll when modal is open
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!news) return null;

    const severityConfig = {
        critical: {
            border: 'border-red-500/40',
            bg: 'bg-red-500/10',
            iconBg: 'bg-red-500/20',
            text: 'text-red-400',
        },
        warning: {
            border: 'border-yellow-500/40',
            bg: 'bg-yellow-500/10',
            iconBg: 'bg-yellow-500/20',
            text: 'text-yellow-400',
        },
        info: {
            border: 'border-blue-500/40',
            bg: 'bg-blue-500/10',
            iconBg: 'bg-blue-500/20',
            text: 'text-blue-400',
        },
    };

    const config = severityConfig[news.severity];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop - rgba(0,0,0,0.75) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
                    />

                    {/* Modal Container - Centered, max-width 600px */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div
                            className="bg-[#12121a] border border-gray-800/50 rounded-2xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6">
                                {/* Header: Icon + Title + Time + Close Button */}
                                <div className="flex items-start justify-between mb-5">
                                    <div className="flex items-center gap-3">
                                        <div className={`${config.iconBg} w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                                            {news.icon}
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-white mb-1">
                                                {news.title}
                                            </h2>
                                            <p className="text-sm text-gray-400">
                                                Posted {news.timestamp}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                                        aria-label="Close modal"
                                    >
                                        <X className="w-5 h-5 text-gray-400" />
                                    </button>
                                </div>

                                {/* Impact Badge: Metric change (large, colored) */}
                                <div className={`${config.bg} border ${config.border} rounded-xl p-4 mb-5`}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-gray-400 uppercase tracking-wider">Impact: {news.impact.metric}</span>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-gray-400 text-sm">{news.impact.before}</span>
                                                <span className="text-gray-500">→</span>
                                                <span className="text-white font-medium text-sm">{news.impact.after}</span>
                                            </div>
                                        </div>
                                        <span className={`text-3xl font-bold ${config.text}`}>
                                            {news.impact.change}
                                        </span>
                                    </div>
                                </div>

                                {/* Overview: Description text */}
                                <div className="mb-5">
                                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Overview</h3>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        {news.description}
                                    </p>
                                </div>

                                {/* Market Sentiment: 2 small metric cards */}
                                {news.sentiment && news.sentiment.length > 0 && (
                                    <div className="mb-5">
                                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Market Sentiment</h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            {news.sentiment.slice(0, 2).map((s, idx) => {
                                                const sentimentColors: Record<string, string> = {
                                                    emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
                                                    gray: 'bg-gray-500/10 border-gray-500/30 text-gray-400',
                                                    red: 'bg-red-500/10 border-red-500/30 text-red-400',
                                                };
                                                const colorClass = sentimentColors[s.color] || sentimentColors.gray;
                                                return (
                                                    <div
                                                        key={idx}
                                                        className={`px-4 py-3 rounded-lg border ${colorClass}`}
                                                    >
                                                        <div className="text-xs opacity-80 mb-1">{s.label}</div>
                                                        <div className="text-lg font-bold">{s.value}</div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* AI Recommendation: Purple card with lightbulb icon */}
                                <div className="bg-gradient-to-r from-purple-500/15 to-blue-500/10 border border-purple-500/30 rounded-xl p-4 mb-5">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                            <Lightbulb className="w-4 h-4 text-purple-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-purple-300 mb-1">
                                                AI Recommendation
                                            </h4>
                                            <p className="text-sm text-gray-300 leading-relaxed">
                                                {news.aiInsight}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons: 3 buttons at bottom */}
                                <div className="flex flex-wrap gap-3">
                                    {news.actions.map((action, idx) => (
                                        <Button
                                            key={idx}
                                            size="default"
                                            onClick={() => {
                                                console.log('Action:', action.label);
                                                if (action.type !== 'primary') {
                                                    // Secondary/tertiary actions close the modal
                                                }
                                            }}
                                            className={`${idx === 0
                                                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                                                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                                                }`}
                                        >
                                            {action.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
