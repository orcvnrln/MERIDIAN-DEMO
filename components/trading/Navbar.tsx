"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, Settings, User, TrendingUp, Newspaper, Bot, Briefcase, ShoppingCart, Wallet, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";

interface NavbarProps {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

const Navbar = ({ symbol, price, change, changePercent }: NavbarProps) => {
  const isPositive = change >= 0;
  const pathname = usePathname();
  const { theme = "light", setTheme } = useTheme();

  const navItems = [
    { icon: TrendingUp, label: "Trade", href: "/" },
    { icon: TrendingUp, label: "Markets", href: "/markets" },
    { icon: Newspaper, label: "News", href: "/news" },
    { icon: Bot, label: "AI", href: "/ai" },
    { icon: Briefcase, label: "Portfolio", href: "/portfolio" },
    { icon: ShoppingCart, label: "Orders", href: "/orders" },
    { icon: Wallet, label: "Wallet", href: "/wallet" },
  ];

  return (
    <nav className="h-14 border-b border-border bg-card px-4 flex items-center justify-between">
      {/* Left: Logo & Nav */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg">Lovable</span>
          <span className="text-xs bg-up/10 text-up px-1.5 py-0.5 rounded font-medium">PRO</span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href)
              }
            />
          ))}
        </div>
      </div>

      {/* Center: Search & Ticker */}
      <div className="flex items-center gap-4">
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search symbol..."
            className="pl-9 w-64 h-9 bg-secondary border-0"
          />
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary">
          <span className="font-semibold">{symbol}</span>
          <span className="font-mono font-semibold">{price.toFixed(2)}</span>
          <span className={`text-sm font-medium ${isPositive ? 'text-up' : 'text-down'}`}>
            {isPositive ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)
          </span>
        </div>
      </div>

      {/* Right: Stats & Profile */}
      <div className="flex items-center gap-4">
        <div className="hidden xl:flex items-center gap-6 text-sm">
          <div>
            <span className="text-muted-foreground">Portfolio</span>
            <div className="font-semibold">$39,551.76 <span className="text-up text-xs">+5.31%</span></div>
          </div>
          <div>
            <span className="text-muted-foreground">Funding</span>
            <div className="font-semibold">$7,960.11</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-icons hover:text-foreground"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>
          <Button variant="ghost" size="icon" className="text-icons hover:text-foreground">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-icons hover:text-foreground">
            <Settings className="w-5 h-5" />
          </Button>
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ icon: Icon, label, href, active = false }: { icon: any; label: string; href: string; active?: boolean }) => (
  <Link
    href={href}
    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors
      ${active
        ? "bg-primary/10 text-primary"
        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
      }`}
  >
    <Icon className="w-4 h-4" />
    {label}
  </Link>
);

export default Navbar;
