"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Send,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  Brain,
  MessageSquare,
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppLayout } from "@/components/layout/AppLayout";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedPrompts = [
  { icon: TrendingUp, text: "Portfelimi analiz et", color: "text-emerald-400" },
  { icon: AlertTriangle, text: "Risk səviyyəmi qiymətləndir", color: "text-amber-400" },
  { icon: BarChart3, text: "Bu həftə üçün bazar proqnozu ver", color: "text-cyan-400" },
  { icon: Lightbulb, text: "İnvestisiya tövsiyəsi ver", color: "text-purple-400" },
];

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content: `Salam! 👋 Mən sizin AI investisiya köməkçinizəm. Portfelinizi analiz etmək, bazar haqqında məlumat vermək və investisiya strategiyaları haqqında tövsiyələr təqdim etmək üçün buradayam.

**Nə edə bilərəm:**
- 📊 Portfel analizi və optimallaşdırma
- ⚠️ Risk qiymətləndirməsi
- 📈 Bazar proqnozları
- 💡 İnvestisiya tövsiyələri
- 🔍 Aktiv araşdırması

Sizə necə kömək edə bilərəm?`,
    timestamp: new Date()
  }
];

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        "portfel": `**Portfel Analizi** 📊

Sizin portfeliniz haqqında ümumi məlumat:

| Metrik | Dəyər | Status |
|--------|-------|--------|
| Ümumi Dəyər | $487,250 | ✅ |
| Gündəlik P&L | +$3,421 (+0.70%) | 📈 |
| YTD Gəlir | +24.5% | 🎯 |
| Sharpe Nisbəti | 1.82 | ⭐ |

**Güclü tərəflər:**
- Diversifikasiya yaxşıdır (72%)
- S&P 500-ü 6.8% üstələyir

**Təkmilləşdirmə sahələri:**
- Texnologiya sektoruna həddindən artıq məruz qalma (35%)
- Volatillik bazardan yüksəkdir (24.5% vs 18%)

Daha ətraflı analiz istəyirsiniz?`,

        "risk": `**Risk Qiymətləndirməsi** ⚠️

Portfelinizin risk profili:

🔴 **Kritik Xəbərdarlıqlar:**
- Max Drawdown: 8.2% (hədəf: <10%) - Normal
- VaR 95%: $18,200 (gündəlik)

🟡 **Diqqət tələb edən:**
- Beta: 1.2 (bazardan 20% daha volatil)
- Kripto məruz qalma: 29% (yüksək)

🟢 **Müsbət:**
- Sharpe: 1.82 (əla)
- Sortino: 2.15 (əla)
- Calmar: 2.28 (çox yaxşı)

**Tövsiyə:** Kripto pozisiyalarını 20%-ə azaldın.`,

        "bazar": `**Həftəlik Bazar Proqnozu** 📈

**Makro Kontekst:**
- Fed faizləri sabit (5.25%)
- İnflyasiya azalır (3.2%)
- İşsizlik aşağı (3.7%)

**Sektorlar:**
| Sektor | Proqnoz | Səbəb |
|--------|---------|-------|
| Texnologiya | 📈 Bullish | AI tələbatı |
| Maliyyə | ➡️ Neytral | Faiz gözləntisi |
| Enerji | 📉 Bearish | Neft düşür |

**Əsas hadisələr:**
- Çərşənbə: CPI məlumatı
- Cümə: Qazanc hesabatları (AAPL, MSFT)

**Tövsiyə:** Texnologiya pozisiyalarını saxlayın.`,

        "tovsiye": `**İnvestisiya Tövsiyələri** 💡

Sizin risk profilinizə əsasən:

**Alış Tövsiyələri:**
1. **NVDA** - AI lideri, güclü fundamental
2. **MSFT** - Sabit qazanc, Azure artımı
3. **SPY** - Diversifikasiya üçün ETF

**Satış/Azaltma:**
1. **TSLA** - Volatillik yüksək, rəqabət artır
2. **Kripto** - Ümumi məruz qalmanı 20%-ə endir

**Portfolio Optimallaşdırma:**
- $10,000 texnologiyadan çıxarıb SPY-a yönləndir
- Stop-loss əlavə et (TSLA: $220)

Bu tövsiyələrdən hansını ətraflı izah edim?`
      };

      let response = "Sizin sualınızı başa düşdüm. Daha konkret məlumat versəniz, daha dəqiq cavab verə bilərəm. Məsələn, portfel analizi, risk qiymətləndirməsi və ya bazar proqnozu haqqında soruşa bilərsiniz.";

      const inputLower = input.toLowerCase();
      if (inputLower.includes("portfel") || inputLower.includes("analiz")) {
        response = responses["portfel"];
      } else if (inputLower.includes("risk")) {
        response = responses["risk"];
      } else if (inputLower.includes("bazar") || inputLower.includes("proqnoz") || inputLower.includes("həftə")) {
        response = responses["bazar"];
      } else if (inputLower.includes("tövsiyə") || inputLower.includes("investisiya")) {
        response = responses["tovsiye"];
      }

      const aiMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <AppLayout>
      <div className="max-w-[1200px] mx-auto px-6 py-6 h-[calc(100vh-64px)] flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AI Köməkçi</h1>
              <p className="text-sm text-gray-400">Portfel analizi və investisiya tövsiyələri</p>
            </div>
          </div>
        </motion.div>

        {/* Suggested Prompts */}
        {messages.length <= 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4"
          >
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handlePromptClick(prompt.text)}
                className="flex items-center gap-2 p-3 bg-[#12121a] border border-gray-800/50 rounded-xl hover:border-purple-500/50 transition-all text-left"
              >
                <prompt.icon className={`w-5 h-5 ${prompt.color}`} />
                <span className="text-sm text-gray-300">{prompt.text}</span>
              </button>
            ))}
          </motion.div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message, idx) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] ${message.role === "user" ? "order-2" : ""}`}>
                <div className={`rounded-2xl p-4 ${message.role === "user"
                    ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                    : "bg-[#12121a] border border-gray-800/50 text-gray-200"
                  }`}>
                  <div className="text-sm whitespace-pre-wrap prose prose-invert prose-sm max-w-none">
                    {message.content.split('\n').map((line, i) => (
                      <p key={i} className="mb-1">{line}</p>
                    ))}
                  </div>
                </div>
                {message.role === "assistant" && (
                  <div className="flex items-center gap-2 mt-2 px-2">
                    <Button variant="ghost" size="icon" className="w-7 h-7 text-gray-500 hover:text-white">
                      <Copy className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-7 h-7 text-gray-500 hover:text-emerald-400">
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-7 h-7 text-gray-500 hover:text-red-400">
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-[#12121a] border border-gray-800/50 rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="text-sm text-gray-400">AI düşünür...</span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-3"
        >
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Sualınızı yazın..."
              className="h-12 bg-[#12121a] border-gray-800 text-white placeholder:text-gray-500 pr-12"
            />
            <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
          </div>
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="h-12 px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Send className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </AppLayout>
  );
}
