import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FileText, Map, BarChart3, Trophy, MessageSquare,
  Settings, Shield, ChevronLeft, ChevronRight, Zap, Bell, Users
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/report", label: "Report Issue", icon: FileText, badge: "New" },
  { href: "/map", label: "City Map", icon: Map },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/forum", label: "Community", icon: MessageSquare, badge: "12" },
  { href: "/admin", label: "Admin", icon: Shield },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [location] = useLocation();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative flex-shrink-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border min-h-[72px]">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/30">
          <Zap size={18} className="text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="font-bold text-sidebar-foreground leading-none text-sm">UrbanPulse</p>
              <p className="text-xs text-muted-foreground mt-0.5">AI City Platform</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: collapsed ? 0 : 2 }}
                whileTap={{ scale: 0.98 }}
                data-testid={`nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 relative group",
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                )}
              >
                <Icon size={18} className="flex-shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="text-sm font-medium flex-1 whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {!collapsed && item.badge && (
                  <Badge
                    className={cn(
                      "text-xs h-5 px-1.5",
                      isActive ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
                {collapsed && (
                  <div className="absolute left-full ml-3 px-2 py-1 bg-popover border border-border rounded-lg text-xs text-popover-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
                    {item.label}
                  </div>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Notifications widget */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-3 mb-3 p-3 rounded-xl bg-primary/5 border border-primary/10"
          >
            <div className="flex items-center gap-2 mb-1">
              <Bell size={14} className="text-primary" />
              <span className="text-xs font-semibold text-primary">3 updates</span>
            </div>
            <p className="text-xs text-muted-foreground">Your R009 report was updated to in-progress</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User mini */}
      <div className="p-3 border-t border-sidebar-border">
        <div className={cn("flex items-center gap-3 px-2 py-2 rounded-xl", collapsed ? "justify-center" : "")}>
          <img
            src="https://picsum.photos/seed/uc/100/100"
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover flex-shrink-0 ring-2 ring-primary/30"
          />
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="text-xs font-semibold text-sidebar-foreground">Alex Chen</p>
                <p className="text-xs text-muted-foreground">2,840 pts · Silver</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        data-testid="sidebar-toggle"
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center hover:bg-accent transition-colors z-10 shadow-sm"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </motion.aside>
  );
}
