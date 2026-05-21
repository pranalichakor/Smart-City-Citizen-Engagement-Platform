import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Search, Sun, Moon, ChevronDown, Settings, LogOut, User, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const notifications = [
  { id: 1, type: "success", text: "Your report R006 has been resolved", time: "5m ago", read: false },
  { id: 2, type: "info", text: "New community event near you: Downtown Cleanup", time: "1h ago", read: false },
  { id: 3, type: "warning", text: "Your report R009 status changed to in-progress", time: "3h ago", read: false },
  { id: 4, type: "success", text: "You earned the 'Quick Reporter' badge", time: "1d ago", read: true },
  { id: 5, type: "info", text: "Forum poll you voted in has new results", time: "2d ago", read: true },
];

const pageTitles: Record<string, string> = {
  "/dashboard": "Citizen Dashboard",
  "/report": "Report an Issue",
  "/map": "City Map",
  "/analytics": "Analytics",
  "/leaderboard": "Leaderboard & Rewards",
  "/forum": "Community Forum",
  "/admin": "Admin Panel",
  "/settings": "Settings",
};

const notifIcon = {
  success: <CheckCircle size={14} className="text-emerald-500" />,
  warning: <AlertTriangle size={14} className="text-amber-500" />,
  info: <Info size={14} className="text-blue-500" />,
};

export function Navbar() {
  const [location] = useLocation();
  const [notifOpen, setNotifOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const unreadCount = notifications.filter((n) => !n.read).length;
  const title = pageTitles[location] ?? "UrbanPulse AI";

  return (
    <header className="h-[72px] border-b border-border bg-card/80 backdrop-blur-md flex items-center px-6 gap-4 sticky top-0 z-30">
      <div className="flex-1">
        <h1 className="text-lg font-bold text-foreground" data-testid="page-title">{title}</h1>
        <p className="text-xs text-muted-foreground">Smart City Citizen Engagement Platform</p>
      </div>

      {/* Search */}
      <div className="relative hidden md:block">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search reports, events..."
          className="pl-9 w-64 h-9 bg-background text-sm"
          data-testid="input-search"
        />
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setNotifOpen(!notifOpen)}
          data-testid="button-notifications"
          className="relative w-9 h-9 rounded-xl bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors"
        >
          <Bell size={16} className="text-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[10px] text-white flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}
        </button>

        <AnimatePresence>
          {notifOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-80 bg-popover border border-border rounded-2xl shadow-xl z-50 overflow-hidden"
              >
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <span className="font-semibold text-sm">Notifications</span>
                  <Badge className="bg-primary/10 text-primary text-xs">{unreadCount} new</Badge>
                </div>
                <div className="divide-y divide-border max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={cn("px-4 py-3 flex gap-3 hover:bg-accent/50 transition-colors", !n.read && "bg-primary/3")}
                    >
                      <div className="mt-0.5">{notifIcon[n.type as keyof typeof notifIcon]}</div>
                      <div className="flex-1 min-w-0">
                        <p className={cn("text-xs leading-relaxed", !n.read ? "text-foreground font-medium" : "text-muted-foreground")}>{n.text}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
                      </div>
                      {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />}
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border text-center">
                  <button className="text-xs text-primary hover:underline">Mark all as read</button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Theme toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        data-testid="button-theme-toggle"
        className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors"
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      {/* Profile */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            data-testid="button-profile-menu"
            className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-accent transition-colors"
          >
            <img
              src="https://picsum.photos/seed/uc/100/100"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/30"
            />
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold">Alex Chen</p>
              <p className="text-[10px] text-muted-foreground">Silver Tier</p>
            </div>
            <ChevronDown size={12} className="text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem data-testid="menu-profile">
            <User size={14} className="mr-2" /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem data-testid="menu-settings">
            <Settings size={14} className="mr-2" /> Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem data-testid="menu-logout" className="text-destructive">
            <LogOut size={14} className="mr-2" /> Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
