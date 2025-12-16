"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface QuickTradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    position: {
        symbol: string;
        name: string;
        currentPrice: number;
        quantity: number;
    };
    action: "buy" | "sell";
}

export function QuickTradeModal({ isOpen, onClose, position, action }: QuickTradeModalProps) {
    const [quantity, setQuantity] = useState(position.quantity);
    const [orderType, setOrderType] = useState<"market" | "limit">("market");
    const [limitPrice, setLimitPrice] = useState(position.currentPrice);

    const total = quantity * (orderType === "market" ? position.currentPrice : limitPrice);
    const isBuy = action === "buy";

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#12121a] border border-gray-800/50 rounded-2xl w-full max-w-md shadow-2xl"
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className={`px-6 py-4 border-b border-gray-800/50 ${isBuy ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isBuy ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                                            {isBuy ?
                                                <TrendingUp className="w-5 h-5 text-emerald-400" /> :
                                                <TrendingDown className="w-5 h-5 text-red-400" />
                                            }
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">
                                                {isBuy ? 'Buy' : 'Sell'} {position.symbol}
                                            </h3>
                                            <p className="text-sm text-gray-400">{position.name}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-6 space-y-4">
                                {/* Current Price */}
                                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                    <span className="text-sm text-gray-400">Current Price</span>
                                    <span className="text-lg font-semibold text-white">
                                        ${position.currentPrice.toFixed(2)}
                                    </span>
                                </div>

                                {/* Order Type */}
                                <div>
                                    <label className="text-sm text-gray-400 mb-2 block">Order Type</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => setOrderType("market")}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${orderType === "market"
                                                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                                : "bg-white/5 text-gray-400 hover:bg-white/10"
                                                }`}
                                        >
                                            Market
                                        </button>
                                        <button
                                            onClick={() => setOrderType("limit")}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${orderType === "limit"
                                                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                                : "bg-white/5 text-gray-400 hover:bg-white/10"
                                                }`}
                                        >
                                            Limit
                                        </button>
                                    </div>
                                </div>

                                {/* Limit Price */}
                                {orderType === "limit" && (
                                    <div>
                                        <label className="text-sm text-gray-400 mb-2 block">Limit Price</label>
                                        <Input
                                            type="number"
                                            value={limitPrice}
                                            onChange={(e) => setLimitPrice(Number(e.target.value))}
                                            className="bg-white/5 border-gray-800 text-white"
                                        />
                                    </div>
                                )}

                                {/* Quantity */}
                                <div>
                                    <label className="text-sm text-gray-400 mb-2 block">Quantity</label>
                                    <Input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        className="bg-white/5 border-gray-800 text-white"
                                    />
                                </div>

                                {/* Total */}
                                <div className="flex items-center justify-between p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/20 rounded-lg">
                                    <span className="text-sm font-medium text-gray-300">Total</span>
                                    <span className="text-xl font-bold text-white">
                                        ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                </div>

                                {/* Warning */}
                                <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                                    <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-xs text-amber-200">
                                        This is a demo. No real trades will be executed.
                                    </p>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-4 border-t border-gray-800/50 flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={onClose}
                                    className="flex-1 border-gray-700 text-gray-300 hover:bg-white/10"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => {
                                        // Handle trade execution
                                        console.log(`${action} ${quantity} ${position.symbol} at ${orderType === 'market' ? 'market' : limitPrice}`);
                                        onClose();
                                    }}
                                    className={`flex-1 ${isBuy
                                        ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700'
                                        : 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700'
                                        }`}
                                >
                                    {isBuy ? 'Buy' : 'Sell'} {position.symbol}
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
