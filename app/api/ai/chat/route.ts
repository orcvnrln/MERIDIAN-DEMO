import { NextRequest, NextResponse } from "next/server";
import { TRADEPRO_SYSTEM_PROMPT, QUICK_ACTIONS } from "@/lib/ai/system-prompt";
import { MOCK_PORTFOLIO, generateAIResponse } from "@/lib/ai/portfolio-data";

export async function POST(request: NextRequest) {
    try {
        const { message, queryType } = await request.json();

        if (!message && !queryType) {
            return NextResponse.json(
                { error: "Message or queryType is required" },
                { status: 400 }
            );
        }

        // Generate AI response based on query type or message
        let response: string;
        let matchedQueryType = queryType;

        if (queryType) {
            response = generateAIResponse(queryType, MOCK_PORTFOLIO);
        } else {
            // Try to match message to a quick action
            const lowerMessage = message.toLowerCase();

            if (lowerMessage.includes("mdd") || lowerMessage.includes("drawdown") || lowerMessage.includes("itki")) {
                matchedQueryType = "mdd";
            } else if (lowerMessage.includes("var") || lowerMessage.includes("value at risk") || lowerMessage.includes("risk dəyəri")) {
                matchedQueryType = "var";
            } else if (lowerMessage.includes("sharpe") || lowerMessage.includes("şarp")) {
                matchedQueryType = "sharpe";
            } else if (lowerMessage.includes("monte carlo") || lowerMessage.includes("simulyasiya")) {
                matchedQueryType = "monte-carlo";
            } else if (lowerMessage.includes("diversifikasiya") || lowerMessage.includes("diversification") || lowerMessage.includes("korrelyasiya")) {
                matchedQueryType = "diversification";
            } else if (lowerMessage.includes("what-if") || lowerMessage.includes("əgər") || lowerMessage.includes("faiz")) {
                matchedQueryType = "what-if";
            }

            if (matchedQueryType) {
                response = generateAIResponse(matchedQueryType, MOCK_PORTFOLIO);
            } else {
                // Default overview response
                response = `**Portföy Xülasəsi**

Salam! Mən TradePro AI Asistantıyam. Sizin portföyünüzü təhlil etdim:

– **Portföy Dəyəri:** $${MOCK_PORTFOLIO.metrics.totalValue.toLocaleString()}
– **Ümumi Gəlir:** +${MOCK_PORTFOLIO.metrics.totalReturnPercent}%
– **Risk Profili:** ${MOCK_PORTFOLIO.metrics.beta > 1.3 ? "Aqressiv" : MOCK_PORTFOLIO.metrics.beta > 1.0 ? "Orta" : "Konservativ"}

– **Əsas Göstəricilər:**
• MDD: ${MOCK_PORTFOLIO.metrics.maxDrawdown}% — yüksək risk zonası
• Sharpe: ${MOCK_PORTFOLIO.metrics.sharpeRatio} — yaxşı risk/gəlir balansı
• VaR (95%): $${MOCK_PORTFOLIO.metrics.var95.toLocaleString()}
• Beta: ${MOCK_PORTFOLIO.metrics.beta}

– **Master Market View:** ${MOCK_PORTFOLIO.masterMarketView.sentiment} (${MOCK_PORTFOLIO.masterMarketView.confidence}% etibarlılıq)

Xüsusi bir göstərici haqqında ətraflı məlumat almaq istəyirsiniz?

Bu təhlil yalnız məlumat məqsədlidir və investisiya təklifi deyil.`;
            }
        }

        // Add disclaimer to all responses
        const disclaimer = "\n\nBu təhlil yalnız məlumat məqsədlidir və investisiya təklifi deyil.";
        if (!response.includes("investisiya təklifi deyil")) {
            response += disclaimer;
        }

        // Generate follow-up questions
        const followUpQuestions = [
            "MDD-ni necə azalda bilərəm?",
            "Stress testə baxmaq istəyirəm",
            "Diversifikasiya təklifləri ver"
        ];

        return NextResponse.json({
            success: true,
            response,
            queryType: matchedQueryType,
            followUpQuestions,
            portfolio: {
                totalValue: MOCK_PORTFOLIO.metrics.totalValue,
                metrics: MOCK_PORTFOLIO.metrics,
                masterMarketView: MOCK_PORTFOLIO.masterMarketView
            }
        });
    } catch (error) {
        console.error("AI Chat API Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    // Return available quick actions and portfolio summary
    return NextResponse.json({
        quickActions: QUICK_ACTIONS,
        portfolioSummary: {
            totalValue: MOCK_PORTFOLIO.metrics.totalValue,
            totalReturn: MOCK_PORTFOLIO.metrics.totalReturnPercent,
            holdings: MOCK_PORTFOLIO.holdings.length,
            topHolding: MOCK_PORTFOLIO.holdings[0].symbol,
            masterMarketView: MOCK_PORTFOLIO.masterMarketView
        }
    });
}
