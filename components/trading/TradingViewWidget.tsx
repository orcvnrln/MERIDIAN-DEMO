"use client";

import { useEffect, useRef, memo } from "react";

interface TradingViewWidgetProps {
    symbol?: string;
    theme?: "light" | "dark";
    height?: number | string;
    width?: number | string;
    interval?: string;
    timezone?: string;
    style?: string;
    locale?: string;
    toolbar_bg?: string;
    enable_publishing?: boolean;
    allow_symbol_change?: boolean;
    hide_side_toolbar?: boolean;
    hide_top_toolbar?: boolean;
    withdateranges?: boolean;
    details?: boolean;
    hotlist?: boolean;
    calendar?: boolean;
    studies?: string[];
}

declare global {
    interface Window {
        TradingView: {
            widget: new (config: Record<string, unknown>) => void;
        };
    }
}

function TradingViewWidget({
    symbol = "NASDAQ:AAPL",
    theme = "dark",
    height = "100%",
    width = "100%",
    interval = "D",
    timezone = "Etc/UTC",
    style = "1",
    locale = "en",
    enable_publishing = false,
    allow_symbol_change = true,
    hide_side_toolbar = false,
    hide_top_toolbar = false,
    withdateranges = true,
    details = true,
    hotlist = true,
    calendar = false,
    studies = ["RSI@tv-basicstudies", "MASimple@tv-basicstudies"],
}: TradingViewWidgetProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const scriptRef = useRef<HTMLScriptElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Clear previous widget
        containerRef.current.innerHTML = "";

        // Create container div for widget
        const widgetContainer = document.createElement("div");
        widgetContainer.className = "tradingview-widget-container__widget";
        widgetContainer.style.height = "100%";
        widgetContainer.style.width = "100%";
        containerRef.current.appendChild(widgetContainer);

        // Create and load script
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = JSON.stringify({
            autosize: true,
            symbol: symbol,
            interval: interval,
            timezone: timezone,
            theme: theme,
            style: style,
            locale: locale,
            enable_publishing: enable_publishing,
            allow_symbol_change: allow_symbol_change,
            hide_side_toolbar: hide_side_toolbar,
            hide_top_toolbar: hide_top_toolbar,
            withdateranges: withdateranges,
            details: details,
            hotlist: hotlist,
            calendar: calendar,
            studies: studies,
            support_host: "https://www.tradingview.com",
        });

        containerRef.current.appendChild(script);
        scriptRef.current = script;

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = "";
            }
        };
    }, [
        symbol,
        theme,
        interval,
        timezone,
        style,
        locale,
        enable_publishing,
        allow_symbol_change,
        hide_side_toolbar,
        hide_top_toolbar,
        withdateranges,
        details,
        hotlist,
        calendar,
        studies,
    ]);

    return (
        <div
            className="tradingview-widget-container"
            ref={containerRef}
            style={{ height, width }}
        />
    );
}

export default memo(TradingViewWidget);
