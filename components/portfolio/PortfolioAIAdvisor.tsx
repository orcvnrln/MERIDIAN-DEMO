"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Brain,
    Send,
    X,
    Sparkles,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    Target,
    Activity,
    PieChart,
    HelpCircle,
    ChevronDown,
    ChevronUp,
    RefreshCw,
    Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    followUpQuestions?: string[];
}

interface QuickAction {
    id: string;
    label: string;
    prompt: string;
    icon: string;
}

const quickActions: QuickAction[] = [
    { id: "mdd", label: "Maximum Drawdown", prompt: "Portföyümün Maximum Drawdown göstəricisini izah et.", icon: "TrendingDown" },
    { id: "var", label: "VaR hesabla", prompt: "Portföyümün Value at Risk göstəricisini izah et.", icon: "AlertTriangle" },
    { id: "sharpe", label: "Sharpe Ratio", prompt: "Portföyümün Sharpe nisbətini izah et.", icon: "Target" },
    { id: "monte-carlo", label: "Monte Carlo", prompt: "Monte Carlo simulyasiyasını izah et.", icon: "Activity" },
    { id: "diversification", label: "Diversifikasiya", prompt: "Portföyümün diversifikasiya vəziyyətini analiz et.", icon: "PieChart" },
    { id: "what-if", label: "What-If Ssenari", prompt: "Faiz dərəcələri artsa portföyümə necə təsir edər?", icon: "HelpCircle" },
];

const iconMap: Record<string, React.ElementType> = {
    TrendingDown,
    AlertTriangle,
    Target,
    Activity,
    PieChart,
    HelpCircle,
};

export function PortfolioAIAdvisor() {
    const [isOpen, setIsOpen] = useState(true);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: `**Salam! Mən TradePro AI Asistantıyam.**

Portföyünüzün risk və performans göstəricilərini real vaxtda təhlil edirəm. Dual Brain arxitekturası və Master Fusion Engine (MFE) prinsipləri əsasında işləyirəm.

– **Investor Beyni:** Uzunmüddətli strateji qərarlar
– **Treder Beyni:** Qısamüddətli taktiki sinyallar

Aşağıdakı sürətli suallardan birini seçin və ya öz sualınızı yazın.`,
            timestamp: new Date(),
            followUpQuestions: ["MDD nədir?", "Risk profilim necədir?", "Monte Carlo analizi"],
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (prompt?: string, queryType?: string) => {
        const messageText = prompt || inputValue.trim();
        if (!messageText) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: messageText,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        try {
            const response = await fetch("/api/ai/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: messageText, queryType }),
            });

            const data = await response.json();

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.response || "Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.",
                timestamp: new Date(),
                followUpQuestions: data.followUpQuestions,
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "Bağlantı xətası. Zəhmət olmasa internet bağlantınızı yoxlayın.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const formatMessage = (content: string) => {
        // Simple markdown-like formatting
        return content
            .split("\n")
            .map((line, i) => {
                // Bold text
                let formatted = line.replace(/\*\*(.+?)\*\*/g, '<strong class="text-cyan-400">$1</strong>');
                // Tables (simple detection)
                if (line.startsWith("|") && line.endsWith("|")) {
                    return `<div key="${i}" class="font-mono text-xs bg-[#2d2a5d]/50 px-2 py-1">${formatted}</div>`;
                }
                // Headers
                if (line.startsWith("–") || line.startsWith("•")) {
                    return `<div key="${i}" class="ml-2">${formatted}</div>`;
                }
                return formatted;
            })
            .join("<br/>");
    };

    if (!isOpen) {
        return (
            <motion.button
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                onClick={() => setIsOpen(true)}
                className="fixed right-4 bottom-4 p-4 rounded-full shadow-2xl z-50 bg-gradient-to-r from-cyan-500 to-purple-600"
            >
                <Brain size={24} className="text-white" />
            </motion.button>
        );
    }

    return (
        <motion.div
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="fixed right-0 top-0 h-screen w-[420px] border-l flex flex-col z-50 bg-[#1a1a2e]/95 backdrop-blur-xl border-cyan-500/20"
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-cyan-500/20 bg-gradient-to-r from-[#1e1b4b]/80 to-[#2d2a5d]/80">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600">
                        <Brain size={20} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-white">TradePro AI Advisor</h3>
                        <p className="text-xs text-cyan-400/80">Dual Brain + MFE</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsMinimized(!isMinimized)}
                        className="text-gray-400 hover:text-cyan-400"
                    >
                        {isMinimized ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 hover:text-red-400"
                    >
                        <X size={18} />
                    </Button>
                </div>
            </div>

            <AnimatePresence>
                {!isMinimized && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="flex-1 flex flex-col overflow-hidden"
                    >
                        {/* Quick Actions */}
                        <div className="p-3 border-b border-cyan-500/20 bg-[#1e1b4b]/30">
                            <p className="text-xs text-gray-400 mb-2">Sürətli analiz:</p>
                            <div className="grid grid-cols-3 gap-2">
                                {quickActions.map((action) => {
                                    const IconComponent = iconMap[action.icon] || Activity;
                                    return (
                                        <button
                                            key={action.id}
                                            onClick={() => handleSend(action.prompt, action.id)}
                                            className="flex flex-col items-center gap-1 p-2 rounded-lg text-xs text-center transition-all hover:scale-[1.02] bg-[#2d2a5d]/50 hover:bg-[#2d2a5d] border border-cyan-500/10 hover:border-cyan-500/30"
                                        >
                                            <IconComponent size={14} className="text-cyan-400" />
                                            <span className="text-gray-300 text-[10px]">{action.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[90%] p-3 rounded-2xl ${message.role === "user"
                                            ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white"
                                            : "bg-[#2d2a5d]/70 text-gray-200 border border-cyan-500/20"
                                            }`}
                                    >
                                        <div
                                            className="text-sm whitespace-pre-wrap leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                                        />
                                        {message.role === "assistant" && message.followUpQuestions && (
                                            <div className="mt-3 pt-2 border-t border-cyan-500/20">
                                                <p className="text-[10px] text-gray-400 mb-1">Əlaqəli suallar:</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {message.followUpQuestions.map((q, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => handleSend(q)}
                                                            className="text-[10px] px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                                                        >
                                                            {q}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        <p
                                            className={`text-[10px] mt-2 ${message.role === "user" ? "text-white/70" : "text-gray-500"
                                                }`}
                                        >
                                            {message.timestamp.toLocaleTimeString("az-AZ", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                    <div className="p-3 rounded-2xl flex items-center gap-2 bg-[#2d2a5d]/70 border border-cyan-500/20">
                                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
                                            <Sparkles size={16} className="text-cyan-400" />
                                        </motion.div>
                                        <span className="text-sm text-gray-400">AI analiz edir...</span>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-cyan-500/20 bg-[#1e1b4b]/50">
                            <div className="flex items-center gap-2 p-2 rounded-xl bg-[#0f0e2e] border border-cyan-500/20">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Risk haqqında sual verin..."
                                    className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-gray-500"
                                />
                                <Button
                                    size="sm"
                                    onClick={() => handleSend()}
                                    disabled={!inputValue.trim() || isTyping}
                                    className="rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90"
                                >
                                    <Send size={16} />
                                </Button>
                            </div>
                            <p className="text-[10px] mt-2 text-center text-gray-500">
                                Bu təhlil yalnız məlumat məqsədlidir və investisiya təklifi deyil.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
