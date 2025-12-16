"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Newspaper,
  TrendingUp,
  TrendingDown,
  Clock,
  ExternalLink,
  Bookmark,
  Share2,
  Filter,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppLayout } from "@/components/layout/AppLayout";

const categories = ["Hamısı", "Kripto", "Səhmlər", "Forex", "Makro", "AI Analiz"];

const newsData = [
  {
    id: 1,
    title: "Bitcoin 42,000$ səviyyəsini keçdi, ETF təsdiqi gözlənilir",
    summary: "SEC tərəfindən spot Bitcoin ETF-lərinin təsdiqi bazarda optimizm yaratdı. Analitiklər 50,000$ hədəflərindən danışır.",
    category: "Kripto",
    source: "CryptoNews",
    time: "15 dəq əvvəl",
    sentiment: "positive",
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400"
  },
  {
    id: 2,
    title: "NVIDIA rekord məlumat mərkəzi gəliri elan etdi",
    summary: "AI çiplərinə tələbat NVIDIA-nın gəlirini $22.1 milyarda çatdırdı. Səhm tarixən ən yüksək səviyyəyə yaxınlaşdı.",
    category: "Səhmlər",
    source: "MarketWatch",
    time: "1 saat əvvəl",
    sentiment: "positive",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400"
  },
  {
    id: 3,
    title: "Fed faiz dərəcələrini sabit saxladı, 2024-cü ildə 3 endirim gözlənilir",
    summary: "Federal Ehtiyat faiz dərəcələrini 5.25-5.50% səviyyəsində saxladı. Bazar 2024-cü ildə azı 3 faiz endirimi gözləyir.",
    category: "Makro",
    source: "Reuters",
    time: "2 saat əvvəl",
    sentiment: "neutral",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400"
  },
  {
    id: 4,
    title: "EUR/USD paritə yaxınlığında, ECB qərarı gözlənilir",
    summary: "Avropa Mərkəzi Bankının sabahkı iclası əvvəl EUR/USD cütü təzyiq altındadır.",
    category: "Forex",
    source: "FXStreet",
    time: "3 saat əvvəl",
    sentiment: "negative",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400"
  },
  {
    id: 5,
    title: "Tesla Çində satışları artırdı, rəqabət şiddətlənir",
    summary: "Tesla Çin bazarında aylıq satış rekordu qırdı, lakin yerli EV istehsalçıları bazar payını artırır.",
    category: "Səhmlər",
    source: "Bloomberg",
    time: "4 saat əvvəl",
    sentiment: "neutral",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400"
  },
  {
    id: 6,
    title: "Ethereum 2.0 yeniləməsi uğurla tamamlandı",
    summary: "Şəbəkənin skalabiliti 10x artdı, qaz qiymətləri əhəmiyyətli dərəcədə azaldı.",
    category: "Kripto",
    source: "CoinDesk",
    time: "5 saat əvvəl",
    sentiment: "positive",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400"
  },
];

const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case "positive": return "text-emerald-400 bg-emerald-500/20";
    case "negative": return "text-red-400 bg-red-500/20";
    default: return "text-gray-400 bg-gray-500/20";
  }
};

const getSentimentIcon = (sentiment: string) => {
  switch (sentiment) {
    case "positive": return <TrendingUp className="w-3 h-3" />;
    case "negative": return <TrendingDown className="w-3 h-3" />;
    default: return <Clock className="w-3 h-3" />;
  }
};

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("Hamısı");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = newsData.filter(news =>
    (activeCategory === "Hamısı" || news.category === activeCategory) &&
    (searchQuery === "" || news.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
            <Newspaper className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl font-bold text-white">Xəbərlər</h1>
          </div>
          <p className="text-gray-400">Bazarların son xəbərləri və analizi</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-6"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Xəbərlərdə axtar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-gray-800 text-white placeholder:text-gray-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant="ghost"
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap ${activeCategory === cat
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news, idx) => (
            <motion.article
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              className="bg-[#12121a] border border-gray-800/50 rounded-xl overflow-hidden hover:border-gray-700 transition-all cursor-pointer group"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundImage: `url(${news.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white backdrop-blur-sm">
                    {news.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getSentimentColor(news.sentiment)}`}>
                    {getSentimentIcon(news.sentiment)}
                    {news.sentiment === "positive" ? "Müsbət" : news.sentiment === "negative" ? "Mənfi" : "Neytral"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                  {news.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                  {news.summary}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{news.source}</span>
                    <span>•</span>
                    <span>{news.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:text-white">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:text-white">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:text-white">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
