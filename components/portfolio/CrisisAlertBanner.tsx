"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";

interface CrisisAlertBannerProps {
    message?: string;
    show?: boolean;
}

export function CrisisAlertBanner({
    message = "Geopolitical Shock Detected",
    show = true
}: CrisisAlertBannerProps) {
    const [visible, setVisible] = useState(show);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: -20, x: 20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed top-20 right-6 z-50"
                >
                    <div className="bg-red-600/90 backdrop-blur-sm text-white px-4 py-3 rounded-xl shadow-2xl shadow-red-500/30 flex items-center gap-3 animate-pulse">
                        <AlertTriangle className="w-5 h-5 text-white" />
                        <span className="font-medium text-sm">{message}</span>
                        <button
                            onClick={() => setVisible(false)}
                            className="ml-2 p-1 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
