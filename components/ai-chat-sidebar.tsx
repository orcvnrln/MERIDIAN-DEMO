"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Brain,
    Send,
    X,
    Sparkles,
    MessageCircle,
    Lightbulb,
    TrendingUp,
    TrendingDown,
    HelpCircle,
    BookOpen,
    Target,
    Zap,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const palette = {
    bg: "#0D0D14",
    card: "#1A1A25",
    elevated: "#252532",
    text: "#E2E2F0",
    muted: "#A0A0B8",
    faded: "#6B6B7F",
    success: "#00F5A8",
    warning: "#FFA500",
    danger: "#FF4D8D",
    info: "#4A55E0",
    border: "rgba(74,85,224,0.2)",
    purple: "#A855F7",
};

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

interface QuickAction {
    icon: typeof Brain;
    label: string;
    prompt: string;
}

const quickActions: QuickAction[] = [
    { icon: TrendingUp, label: "Bu səhm alınmalıdır?", prompt: "Bu səhmi almaq üçün uyğun vaxtdır?" },
    { icon: Target, label: "Hədəf qiymət nədir?", prompt: "Bu səhm üçün hədəf qiymət nə olmalıdır?" },
    { icon: HelpCircle, label: "RSI nə deməkdir?", prompt: "RSI indikatoru nədir və necə istifadə olunur?" },
    { icon: Zap, label: "Ən güclü siqnal?", prompt: "Hazırda ən güclü texniki siqnal hansıdır?" },
];

// Pre-defined AI responses
const aiResponses: Record<string, string> = {
    "Bu səhmi almaq üçün uyğun vaxtdır?": `📊 **AAPL Analiz Nəticəsi:**

✅ **Texniki:** RSI 65.2 (neutral), MACD bullish
✅ **Fundamental:** P/E 28.5x, güclü FCF
✅ **Sentiment:** 72% pozitiv sosial sentiment

**Tövsiyə:** HOLD/BUY - Geri çəkilmələrdə almaq strategiyası.

⚠️ Risk: $185 support səviyyəsini izləyin.`,

    "Bu səhm üçün hədəf qiymət nə olmalıdır?": `🎯 **Hədəf Qiymət Analizi:**

| Ssenaari | Qiymət | Əsas |
|----------|--------|------|
| 🐻 Bear | $165 | DCF pessimist |
| ⚖️ Base | $195 | Konsensus |
| 🐂 Bull | $235 | Services growth |

**Cari:** $198.50
**12 aylıq hədəf:** $210 (+6%)

💡 Services segmentinin 15%+ artımı bull case-i aktivləşdirə bilər.`,

    "RSI indikatoru nədir və necə istifadə olunur?": `📈 **RSI (Relative Strength Index)**

**Nədir?**
RSI qiymətin həddindən artıq alındığını (overbought) və ya satıldığını (oversold) ölçür.

**Səviyyələr:**
- 🔴 70+ = Overbought (satış siqnalı)
- 🟢 30- = Oversold (alış siqnalı)
- ⚪ 30-70 = Neutral zona

**AAPL cari RSI:** 65.2 (Neutral, yuxarıya meyl)

**Pro Tip:** Divergensiyalar güclü siqnallardır - qiymət yüksəlir, RSI düşürsə bu bearish divergence-dir.`,

    "Hazırda ən güclü texniki siqnal hansıdır?": `⚡ **Ən Güclü Siqnallar:**

1. **🟢 SMA Crossover** - 20-day > 50-day > 200-day
   - Güclü uptrend konfirmasiyası
   - Tarixi win rate: 72%

2. **🟢 Support Bounce** - $185 səviyyəsindən sıçrama
   - 4 dəfə test edilib, möhkəm

3. **🟡 RSI Neutral** - 65.2
   - Hələ overbought deyil
   - Yuxarıya hərəkət üçün yer var

**Zəif siqnal:** MACD bearish crossover (-0.2)

**Net:** 3/4 bullish = **BULLISH BIAS**`,
};

export function AIChatSidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: "Salam! Mən sizin AI ticarət köməkçinizəm. 🤖\n\nAAPL haqqında istənilən sual verə bilərsiniz. Texniki, fundamental, sentiment - hər şeyi izah edə bilərəm!",
            timestamp: new Date(),
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

    const handleSend = async (prompt?: string) => {
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

        // Simulate AI thinking
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Get response
        let response = aiResponses[messageText];
        if (!response) {
            response = `📊 **${messageText}** haqqında analiz:

AAPL texniki vəziyyəti güclüdür:
- RSI: 65.2 (neutral)
- MACD: Bullish trend
- Support: $185 | Resistance: $205

💡 Ətraflı analiz üçün sol paneldəki qrafiklərə baxın.

Başqa sualınız var?`;
        }

        const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: response,
            timestamp: new Date(),
        };

        setIsTyping(false);
        setMessages((prev) => [...prev, assistantMessage]);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (!isOpen) {
        return (
            <motion.button
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                onClick={() => setIsOpen(true)}
                className="fixed right-4 bottom-4 p-4 rounded-full shadow-2xl z-50"
                style={{
                    background: `linear-gradient(135deg, ${palette.info}, ${palette.purple})`,
                }}
            >
                <MessageCircle size={24} color="#fff" />
            </motion.button>
        );
    }

    return (
        <motion.div
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="fixed right-0 top-0 h-screen w-[480px] border-l flex flex-col z-50"
            style={{
                backgroundColor: palette.card,
                borderColor: palette.border,
            }}
        >
            {/* Header */}
            <div
                className="flex items-center justify-between p-4 border-b"
                style={{ borderColor: palette.border }}
            >
                <div className="flex items-center gap-3">
                    <div
                        className="p-2 rounded-xl"
                        style={{
                            background: `linear-gradient(135deg, ${palette.info}, ${palette.purple})`,
                        }}
                    >
                        <Brain size={20} color="#fff" />
                    </div>
                    <div>
                        <h3 className="font-semibold" style={{ color: palette.text }}>
                            AI Köməkçi
                        </h3>
                        <p className="text-xs" style={{ color: palette.muted }}>
                            Ticarət analizi & izahat
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsMinimized(!isMinimized)}
                        style={{ color: palette.muted }}
                    >
                        {isMinimized ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsOpen(false)}
                        style={{ color: palette.muted }}
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
                        <div className="p-3 border-b" style={{ borderColor: palette.border }}>
                            <p className="text-xs mb-2" style={{ color: palette.muted }}>
                                Sürətli suallar:
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                                {quickActions.map((action) => (
                                    <button
                                        key={action.label}
                                        onClick={() => handleSend(action.prompt)}
                                        className="flex items-center gap-2 p-2 rounded-lg text-xs text-left transition-all hover:scale-[1.02]"
                                        style={{
                                            backgroundColor: `${palette.bg}80`,
                                            color: palette.muted,
                                            border: `1px solid ${palette.border}`,
                                        }}
                                    >
                                        <action.icon size={14} style={{ color: palette.info }} />
                                        <span>{action.label}</span>
                                    </button>
                                ))}
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
                                        className="max-w-[85%] p-3 rounded-2xl"
                                        style={{
                                            backgroundColor:
                                                message.role === "user"
                                                    ? palette.info
                                                    : `${palette.bg}`,
                                            color: palette.text,
                                            border: message.role === "assistant" ? `1px solid ${palette.border}` : "none",
                                        }}
                                    >
                                        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                                        <p
                                            className="text-[10px] mt-1"
                                            style={{ color: message.role === "user" ? "rgba(255,255,255,0.7)" : palette.faded }}
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
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div
                                        className="p-3 rounded-2xl flex items-center gap-2"
                                        style={{
                                            backgroundColor: `${palette.bg}`,
                                            border: `1px solid ${palette.border}`,
                                        }}
                                    >
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ repeat: Infinity, duration: 1 }}
                                        >
                                            <Sparkles size={16} style={{ color: palette.info }} />
                                        </motion.div>
                                        <span className="text-sm" style={{ color: palette.muted }}>
                                            AI düşünür...
                                        </span>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div
                            className="p-4 border-t"
                            style={{ borderColor: palette.border }}
                        >
                            <div
                                className="flex items-center gap-2 p-2 rounded-xl"
                                style={{
                                    backgroundColor: palette.bg,
                                    border: `1px solid ${palette.border}`,
                                }}
                            >
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Sual yazın..."
                                    className="flex-1 bg-transparent outline-none text-sm"
                                    style={{ color: palette.text }}
                                />
                                <Button
                                    size="sm"
                                    onClick={() => handleSend()}
                                    disabled={!inputValue.trim() || isTyping}
                                    className="rounded-lg"
                                    style={{
                                        backgroundColor: palette.info,
                                        color: "#fff",
                                    }}
                                >
                                    <Send size={16} />
                                </Button>
                            </div>
                            <p className="text-[10px] mt-2 text-center" style={{ color: palette.faded }}>
                                AI təklifləri məlumat məqsədlidir, maliyyə məsləhəti deyil.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
