"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Brain, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIBotButtonProps {
    onClick?: () => void;
}

export function AIBotButton({ onClick }: AIBotButtonProps) {
    const [notificationCount] = useState(3);

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50"
        >
            <Button
                onClick={onClick}
                size="lg"
                className="relative h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 shadow-2xl border-2 border-purple-400/50"
            >
                {/* Pulse Animation */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0 rounded-full bg-purple-500"
                />

                {/* Icon */}
                <Brain className="w-8 h-8 text-white relative z-10" />

                {/* Notification Badge */}
                {notificationCount > 0 && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-[#050509]"
                    >
                        <span className="text-xs font-bold text-white">{notificationCount}</span>
                    </motion.div>
                )}
            </Button>

            {/* Tooltip */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute right-20 top-1/2 -translate-y-1/2 px-3 py-2 bg-[#1A1A28] border border-cyan-500/20 rounded-lg whitespace-nowrap pointer-events-none"
            >
                <div className="text-sm font-medium text-white">AI Assistant</div>
                <div className="text-xs text-gray-400">{notificationCount} new insights</div>
            </motion.div>
        </motion.div>
    );
}
