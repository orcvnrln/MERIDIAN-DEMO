"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Layers,
  LineChart,
  Eye,
  Bell,
  Clock,
  Copy,
  Calculator,
  Star,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const sidebarItems = [
  { icon: LayoutGrid, label: "Dashboard", href: "/" },
  { icon: Layers, label: "Layouts", href: "/orders" },
  { icon: LineChart, label: "Markets", href: "/markets" },
  { icon: Eye, label: "Watchlists", href: "/portfolio" },
  { icon: Bell, label: "Alerts", href: "/orders" },
  { icon: Clock, label: "History", href: "/orders" },
  { icon: Copy, label: "Templates", href: "/ai" },
  { icon: Calculator, label: "Functions", href: "/ai" },
  { icon: Star, label: "Favorites", href: "/wallet" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-12 bg-card border-r border-border flex flex-col items-center py-2 gap-1">
      {sidebarItems.map((item) => {
        const active = pathname === item.href || pathname?.startsWith(item.href);
        return (
          <Tooltip key={item.label} delayDuration={0}>
            <TooltipTrigger asChild>
              <Link href={item.href} aria-label={item.label}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`w-9 h-9 ${
                    active ? "bg-primary/10 text-primary" : "text-icons hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">
              {item.label}
            </TooltipContent>
          </Tooltip>
        );
      })}
      
      <div className="flex-1" />
      
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="w-9 h-9 text-icons hover:text-foreground">
            <Settings className="w-5 h-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" className="text-xs">
          Settings
        </TooltipContent>
      </Tooltip>
    </aside>
  );
};

export default Sidebar;
