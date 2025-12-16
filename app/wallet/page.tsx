"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Minus,
  RefreshCw,
  CreditCard,
  Building,
  Bitcoin,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  Copy,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layout/AppLayout";

const balances = [
  { asset: "USD", name: "US Dollar", amount: 52840.50, icon: DollarSign, color: "text-emerald-400" },
  { asset: "BTC", name: "Bitcoin", amount: 1.2534, icon: Bitcoin, color: "text-amber-400" },
  { asset: "ETH", name: "Ethereum", amount: 15.8, icon: TrendingUp, color: "text-purple-400" },
];

const transactions = [
  { id: 1, type: "deposit", asset: "USD", amount: 10000, status: "completed", date: "2024-01-15", method: "Bank Transfer" },
  { id: 2, type: "withdraw", asset: "USD", amount: 2500, status: "pending", date: "2024-01-14", method: "Bank Transfer" },
  { id: 3, type: "deposit", asset: "BTC", amount: 0.5, status: "completed", date: "2024-01-12", method: "Crypto Wallet" },
  { id: 4, type: "withdraw", asset: "ETH", amount: 2.5, status: "completed", date: "2024-01-10", method: "Crypto Wallet" },
  { id: 5, type: "deposit", asset: "USD", amount: 25000, status: "completed", date: "2024-01-08", method: "Wire Transfer" },
];

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "deposit" | "withdraw">("overview");

  const totalUSD = 52840.50 + (1.2534 * 42150) + (15.8 * 2245);

  return (
    <AppLayout>
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <Wallet className="w-8 h-8 text-pink-400" />
            <h1 className="text-3xl font-bold text-white">Cüzdan</h1>
          </div>
          <p className="text-gray-400">Hesab balansı və əməliyyatları</p>
        </motion.div>

        {/* Total Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-pink-500/20 via-purple-500/10 to-cyan-500/20 border border-pink-500/30 rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Ümumi Balans</p>
              <p className="text-4xl font-bold text-white">${totalUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              <p className="text-sm text-emerald-400 mt-2 flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4" />
                +$3,421 (+0.70%) bu gün
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Depozit
              </Button>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-white/10">
                <Minus className="w-4 h-4 mr-2" />
                Çıxarış
              </Button>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-white/10">
                <RefreshCw className="w-4 h-4 mr-2" />
                Transfer
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Balances Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {balances.map((balance, idx) => {
            const Icon = balance.icon;
            return (
              <motion.div
                key={balance.asset}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + idx * 0.05 }}
                className="bg-[#12121a] border border-gray-800/50 rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center ${balance.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{balance.asset}</p>
                      <p className="text-xs text-gray-400">{balance.name}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-2xl font-bold text-white">
                  {balance.asset === "USD" ? "$" : ""}{balance.amount.toLocaleString()}
                  {balance.asset !== "USD" && ` ${balance.asset}`}
                </p>
                {balance.asset !== "USD" && (
                  <p className="text-sm text-gray-400 mt-1">
                    ≈ ${(balance.amount * (balance.asset === "BTC" ? 42150 : 2245)).toLocaleString()}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#12121a] border border-gray-800/50 rounded-xl p-5 mb-8"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Ödəniş Metodları</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-gray-800">
              <CreditCard className="w-8 h-8 text-cyan-400" />
              <div>
                <p className="font-medium text-white">Visa •••• 4532</p>
                <p className="text-xs text-gray-400">Expires 12/25</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-gray-800">
              <Building className="w-8 h-8 text-emerald-400" />
              <div>
                <p className="font-medium text-white">Bank of America</p>
                <p className="text-xs text-gray-400">•••• 7891</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-dashed border-gray-700 cursor-pointer hover:border-gray-600">
              <Plus className="w-8 h-8 text-gray-400" />
              <div>
                <p className="font-medium text-gray-400">Yeni metod əlavə et</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Transaction History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-[#12121a] border border-gray-800/50 rounded-xl"
        >
          <div className="p-5 border-b border-gray-800/50">
            <h2 className="text-lg font-semibold text-white">Əməliyyat Tarixçəsi</h2>
          </div>
          <div className="divide-y divide-gray-800/30">
            {transactions.map((tx, idx) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + idx * 0.03 }}
                className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tx.type === "deposit" ? "bg-emerald-500/20" : "bg-red-500/20"
                    }`}>
                    {tx.type === "deposit" ?
                      <ArrowDownRight className="w-5 h-5 text-emerald-400" /> :
                      <ArrowUpRight className="w-5 h-5 text-red-400" />
                    }
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      {tx.type === "deposit" ? "Depozit" : "Çıxarış"} - {tx.asset}
                    </p>
                    <p className="text-xs text-gray-400">{tx.method}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${tx.type === "deposit" ? "text-emerald-400" : "text-red-400"}`}>
                    {tx.type === "deposit" ? "+" : "-"}
                    {tx.asset === "USD" ? "$" : ""}{tx.amount.toLocaleString()}
                    {tx.asset !== "USD" && ` ${tx.asset}`}
                  </p>
                  <div className="flex items-center justify-end gap-2 text-xs">
                    <span className={`flex items-center gap-1 ${tx.status === "completed" ? "text-emerald-400" : "text-amber-400"
                      }`}>
                      {tx.status === "completed" ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {tx.status === "completed" ? "Tamamlandı" : "Gözləyir"}
                    </span>
                    <span className="text-gray-500">{tx.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
