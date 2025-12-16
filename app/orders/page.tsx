"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Search,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppLayout } from "@/components/layout/AppLayout";

const tabs = ["Hamısı", "Açıq", "Tamamlanmış", "Ləğv edilmiş"];

const ordersData = [
  {
    id: "ORD-001",
    symbol: "AAPL",
    name: "Apple Inc.",
    type: "Limit",
    side: "Buy",
    quantity: 50,
    price: 180.00,
    filledPrice: 182.34,
    status: "filled",
    date: "2024-01-15 14:32:00",
    total: 9117.00
  },
  {
    id: "ORD-002",
    symbol: "BTC/USD",
    name: "Bitcoin",
    type: "Market",
    side: "Buy",
    quantity: 0.5,
    price: null,
    filledPrice: 42150.80,
    status: "filled",
    date: "2024-01-15 10:15:00",
    total: 21075.40
  },
  {
    id: "ORD-003",
    symbol: "TSLA",
    name: "Tesla Inc.",
    type: "Stop-Loss",
    side: "Sell",
    quantity: 25,
    price: 235.00,
    filledPrice: null,
    status: "open",
    date: "2024-01-14 16:45:00",
    total: 5875.00
  },
  {
    id: "ORD-004",
    symbol: "ETH/USD",
    name: "Ethereum",
    type: "Limit",
    side: "Sell",
    quantity: 5,
    price: 2300.00,
    filledPrice: null,
    status: "open",
    date: "2024-01-14 09:20:00",
    total: 11500.00
  },
  {
    id: "ORD-005",
    symbol: "NVDA",
    name: "NVIDIA",
    type: "Limit",
    side: "Buy",
    quantity: 10,
    price: 480.00,
    filledPrice: null,
    status: "cancelled",
    date: "2024-01-13 11:30:00",
    total: 4800.00
  },
  {
    id: "ORD-006",
    symbol: "MSFT",
    name: "Microsoft",
    type: "Market",
    side: "Buy",
    quantity: 30,
    price: null,
    filledPrice: 378.45,
    status: "filled",
    date: "2024-01-12 15:00:00",
    total: 11353.50
  },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case "filled":
      return { icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/20", label: "Tamamlanmış" };
    case "open":
      return { icon: Clock, color: "text-amber-400", bg: "bg-amber-500/20", label: "Açıq" };
    case "cancelled":
      return { icon: XCircle, color: "text-red-400", bg: "bg-red-500/20", label: "Ləğv edilmiş" };
    default:
      return { icon: AlertCircle, color: "text-gray-400", bg: "bg-gray-500/20", label: "Naməlum" };
  }
};

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("Hamısı");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = ordersData.filter(order => {
    const matchesTab = activeTab === "Hamısı" ||
      (activeTab === "Açıq" && order.status === "open") ||
      (activeTab === "Tamamlanmış" && order.status === "filled") ||
      (activeTab === "Ləğv edilmiş" && order.status === "cancelled");
    const matchesSearch = searchQuery === "" ||
      order.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const openOrdersValue = ordersData
    .filter(o => o.status === "open")
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <AppLayout>
      <div className="max-w-[1600px] mx-auto px-6 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="w-8 h-8 text-amber-400" />
            <h1 className="text-3xl font-bold text-white">Əmrlər</h1>
          </div>
          <p className="text-gray-400">Açıq və tamamlanmış əmrlərinizi idarə edin</p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-[#12121a] border border-gray-800/50 rounded-xl p-4"
          >
            <p className="text-sm text-gray-400 mb-1">Açıq Əmrlər</p>
            <p className="text-2xl font-bold text-white">
              {ordersData.filter(o => o.status === "open").length}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#12121a] border border-gray-800/50 rounded-xl p-4"
          >
            <p className="text-sm text-gray-400 mb-1">Açıq Dəyər</p>
            <p className="text-2xl font-bold text-amber-400">
              ${openOrdersValue.toLocaleString()}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-[#12121a] border border-gray-800/50 rounded-xl p-4"
          >
            <p className="text-sm text-gray-400 mb-1">Bu gün tamamlanmış</p>
            <p className="text-2xl font-bold text-emerald-400">
              {ordersData.filter(o => o.status === "filled").length}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#12121a] border border-gray-800/50 rounded-xl p-4"
          >
            <p className="text-sm text-gray-400 mb-1">Ləğv edilmiş</p>
            <p className="text-2xl font-bold text-red-400">
              {ordersData.filter(o => o.status === "cancelled").length}
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex flex-col md:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Əmr ID və ya simvol axtar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-gray-800 text-white placeholder:text-gray-500"
            />
          </div>
          <div className="flex items-center gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab(tab)}
                className={`${activeTab === tab
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {tab}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Orders Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#12121a] border border-gray-800/50 rounded-xl overflow-hidden"
        >
          {/* Table Header */}
          <div className="grid grid-cols-8 gap-4 px-5 py-3 border-b border-gray-800/50 text-xs font-medium text-gray-400 uppercase tracking-wider">
            <div>Əmr ID</div>
            <div>Simvol</div>
            <div>Növ</div>
            <div>Tərəf</div>
            <div className="text-right">Miqdar</div>
            <div className="text-right">Qiymət</div>
            <div className="text-center">Status</div>
            <div className="text-right">Tarix</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-800/30">
            {filteredOrders.map((order, idx) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 + idx * 0.03 }}
                  className="grid grid-cols-8 gap-4 items-center px-5 py-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="text-sm font-mono text-gray-300">{order.id}</div>
                  <div>
                    <div className="font-semibold text-white">{order.symbol}</div>
                    <div className="text-xs text-gray-400">{order.name}</div>
                  </div>
                  <div className="text-sm text-gray-300">{order.type}</div>
                  <div className={`text-sm font-medium ${order.side === "Buy" ? "text-emerald-400" : "text-red-400"}`}>
                    <span className="flex items-center gap-1">
                      {order.side === "Buy" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {order.side === "Buy" ? "Alış" : "Satış"}
                    </span>
                  </div>
                  <div className="text-right text-sm text-white">{order.quantity}</div>
                  <div className="text-right">
                    <div className="text-sm text-white">
                      {order.filledPrice ? `$${order.filledPrice.toLocaleString()}` :
                        order.price ? `$${order.price.toLocaleString()}` : "Market"}
                    </div>
                    {order.filledPrice && order.price && (
                      <div className="text-xs text-gray-400">Limit: ${order.price}</div>
                    )}
                  </div>
                  <div className="flex justify-center">
                    <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${statusConfig.bg} ${statusConfig.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {statusConfig.label}
                    </span>
                  </div>
                  <div className="text-right text-xs text-gray-400">{order.date}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
