"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Target,
  Plus,
  Bell,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  History,
  LineChart,
  Milestone,
  Shield,
  ShoppingBag,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine
} from "recharts";
import {
  mockPortfolioMetrics,
  mockPositions,
  mockPerformanceData,
  mockSectorAllocation,
  formatCurrency,
  formatPercent,
  getPositionTypeColor,
} from "@/lib/mock-data/portfolio";

// Import components
import { RecentTransactions } from "@/components/portfolio/RecentTransactions";
import { PortfolioAIAdvisor } from "@/components/portfolio/PortfolioAIAdvisor";
import { AIBotButton } from "@/components/portfolio/AIBotButton";
import { PortfolioPerformanceChart } from "@/components/portfolio/PortfolioPerformanceChart";

// Import dashboard components
import { ComprehensiveMetricsGrid } from "@/components/portfolio/ComprehensiveMetricsGrid";
import { AssetAllocationDonut } from "@/components/portfolio/AssetAllocationDonut";
import { RiskContributionWaterfall } from "@/components/portfolio/RiskContributionWaterfall";
import { RiskControlsPanel } from "@/components/portfolio/RiskControlsPanel";
import { RiskAnalysisCards } from "@/components/portfolio/RiskAnalysisCards";

// Import new AI & Risk panels
import { AIPortfolioScore } from "@/components/portfolio/AIPortfolioScore";
import { GeopoliticalRiskPanel } from "@/components/portfolio/GeopoliticalRiskPanel";
import { MacroContextPanel } from "@/components/portfolio/MacroContextPanel";
import { StressTestResults } from "@/components/portfolio/StressTestResults";

// Import existing analysis components
import { CorrelationMatrix } from "@/components/portfolio/CorrelationMatrix";
import { MonteCarloChart } from "@/components/portfolio/MonteCarloChart";

// Import sidebar
import { AIAlertsSidebar } from "@/components/portfolio/risk/AIAlertsSidebar";
import { QuickTradeModal } from "@/components/portfolio/QuickTradeModal";

// Time period filter options
const timePeriods = ["2 Years", "1 Year", "6 Months", "3 Months"] as const;

export default function PortfolioPage() {
  const [showAIAdvisor, setShowAIAdvisor] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<typeof timePeriods[number]>("2 Years");
  const [activeTab, setActiveTab] = useState<"overview" | "risk" | "history">("overview");
  const [tradeModal, setTradeModal] = useState<{ isOpen: boolean; position: any; action: "buy" | "sell" }>({
    isOpen: false,
    position: null,
    action: "buy"
  });

  const metrics = mockPortfolioMetrics;
  const positions = mockPositions;

  // Filter data based on selected period
  const getFilteredData = () => {
    switch (selectedPeriod) {
      case "3 Months": return mockPerformanceData.slice(-13);
      case "6 Months": return mockPerformanceData.slice(-26);
      case "1 Year": return mockPerformanceData.slice(-52);
      case "2 Years": return mockPerformanceData;
      default: return mockPerformanceData;
    }
  };

  const filteredData = getFilteredData();
  const currentValue = filteredData[filteredData.length - 1]?.portfolio || 0;
  const startValue = filteredData[0]?.portfolio || 0;
  const periodReturn = ((currentValue - startValue) / startValue) * 100;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <header className="border-b border-gray-800/50 bg-[#0a0a0f]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Portfolio</h1>
              <p className="text-sm text-gray-400">Track your investments and analyze performance</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("overview")}
                className={`h-9 px-4 ${activeTab === "overview"
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white"}`}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("risk")}
                className={`h-9 px-4 ${activeTab === "risk"
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white"}`}
              >
                <Shield className="w-4 h-4 mr-2" />
                Risk Management
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("history")}
                className={`h-9 px-4 ${activeTab === "history"
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white"}`}
              >
                <History className="w-4 h-4 mr-2" />
                History
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* AI Alerts Sidebar (Fixed Right) - On Risk and Overview tabs */}
      {(activeTab === "risk" || activeTab === "overview") && <AIAlertsSidebar />}

      {/* Main Content */}
      <main className={`max-w-[1800px] mx-auto px-6 py-6 ${(activeTab === "risk" || activeTab === "overview") ? "mr-[420px]" : ""}`}>

        {/* ===== OVERVIEW TAB ===== */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Comprehensive Metrics Grid - All 25+ metrics */}
              <ComprehensiveMetricsGrid />

              {/* Two-column layout: Allocation + Risk Contribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <AssetAllocationDonut />
                <RiskContributionWaterfall />
              </div>

              {/* Three-column: AI Score + GRI + Macro Context */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <AIPortfolioScore />
                <GeopoliticalRiskPanel />
                <MacroContextPanel />
              </div>

              {/* Portfolio Performance Chart */}
              <div className="mb-6">
                <PortfolioPerformanceChart />
              </div>

              {/* Correlation Matrix + Monte Carlo */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <CorrelationMatrix />
                <MonteCarloChart />
              </div>

              {/* Stress Test Results */}
              <div className="mb-6">
                <StressTestResults />
              </div>

              {/* Open Positions Table */}
              <div className="bg-[#12121a] border border-gray-800/50 rounded-xl">
                <div className="p-5 border-b border-gray-800/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-white">Open Positions</h2>
                      <p className="text-sm text-gray-400">{positions.length} active positions</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Sort by:</span>
                        <Button variant="ghost" size="sm" className="h-8 px-3 text-white bg-white/5">
                          P&L
                          <ChevronDown className="w-3 h-3 ml-1" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-3 text-gray-400">
                          Symbol
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-3 text-gray-400">
                          Type
                        </Button>
                      </div>
                      <Button size="sm" className="h-8 bg-white/5 hover:bg-white/10 text-white">
                        <Plus className="w-4 h-4 mr-1" />
                        Add Position
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-7 gap-4 px-5 py-3 border-b border-gray-800/30 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <div>Asset</div>
                  <div className="text-right">Quantity</div>
                  <div className="text-right">Entry Price</div>
                  <div className="text-right">Current Price</div>
                  <div className="text-right">P&L</div>
                  <div className="text-right">Actions</div>
                  <div></div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-800/30">
                  {positions.map((position, index) => (
                    <div
                      key={position.symbol}
                      className="grid grid-cols-7 gap-4 items-center px-5 py-4 hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-semibold text-white">{position.symbol}</div>
                          <div className="text-xs text-gray-400">{position.name}</div>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getPositionTypeColor(position.type)}`}>
                          {position.type}
                        </span>
                      </div>
                      <div className="text-right text-sm text-gray-300">{position.quantity.toLocaleString()}</div>
                      <div className="text-right text-sm text-gray-300">{formatCurrency(position.entryPrice)}</div>
                      <div className="text-right text-sm text-white font-medium">{formatCurrency(position.currentPrice)}</div>
                      <div className="text-right">
                        <div className={`font-semibold ${position.pl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {position.pl >= 0 ? '+' : ''}{formatCurrency(position.pl)}
                        </div>
                        <div className={`text-xs flex items-center justify-end gap-1 ${position.plPercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {position.plPercent >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {formatPercent(position.plPercent)}
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setTradeModal({ isOpen: true, position, action: "buy" })}
                          className="h-7 px-2 text-xs text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Buy
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setTradeModal({ isOpen: true, position, action: "sell" })}
                          className="h-7 px-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <TrendingDown className="w-3 h-3 mr-1" />
                          Sell
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-400 hover:text-amber-400 hover:bg-amber-500/10">
                          <Bell className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex justify-end">
                        <div className={`w-1.5 h-8 rounded-full ${position.pl >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ===== RISK MANAGEMENT TAB ===== */}
          {activeTab === "risk" && (
            <motion.div
              key="risk"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="min-h-screen"
            >
              {/* Risk Analysis Cards */}
              <RiskAnalysisCards />

              {/* Additional Risk Panels */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <StressTestResults />
                <GeopoliticalRiskPanel />
              </div>

              {/* Correlation + Monte Carlo */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <CorrelationMatrix />
                <MonteCarloChart />
              </div>
            </motion.div>
          )}


          {/* ===== HISTORY TAB ===== */}
          {activeTab === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <RecentTransactions />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating AI Bot Button */}
      <AIBotButton onClick={() => setShowAIAdvisor(!showAIAdvisor)} />

      {/* AI Advisor Panel */}
      {showAIAdvisor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setShowAIAdvisor(false)}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="absolute right-0 top-0 bottom-0 w-full md:w-[500px] overflow-y-auto"
          >
            <PortfolioAIAdvisor />
          </motion.div>
        </motion.div>
      )}

      {/* QuickTradeModal */}
      {tradeModal.isOpen && tradeModal.position && (
        <QuickTradeModal
          isOpen={tradeModal.isOpen}
          onClose={() => setTradeModal({ isOpen: false, position: null, action: "buy" })}
          position={tradeModal.position}
          action={tradeModal.action}
        />
      )}
    </div>
  );
}

