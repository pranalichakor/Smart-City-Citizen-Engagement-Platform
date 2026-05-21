import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { FileText, CheckCircle, Star, TrendingUp, ArrowRight, Clock, MapPin, AlertTriangle, Calendar, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { mockReports, statusColors, categoryColors } from "@/data/mockReports";
import { mockEvents } from "@/data/mockEvents";
import { monthlyResolutionData, categoryBreakdownData } from "@/data/mockDepartments";

const statCards = [
  { label: "Total Reports", value: "142", change: "+12%", icon: FileText, color: "text-primary", bg: "bg-primary/10" },
  { label: "Resolved Issues", value: "118", change: "+8%", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Points Earned", value: "2,840", change: "+340 this month", icon: Star, color: "text-amber-500", bg: "bg-amber-500/10" },
  { label: "Response Rate", value: "83%", change: "City avg: 71%", icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-500/10" },
];

const activityFeed = [
  { id: 1, action: "Report R009 moved to in-progress", time: "5m ago", type: "update", icon: Clock },
  { id: 2, action: "Your R006 traffic signal report was resolved", time: "2h ago", type: "resolved", icon: CheckCircle },
  { id: 3, action: "10 neighbors upvoted your R004 report", time: "4h ago", type: "social", icon: TrendingUp },
  { id: 4, action: "New comment on your R001 pothole report", time: "6h ago", type: "comment", icon: FileText },
  { id: 5, action: "Badge 'Quick Reporter' unlocked", time: "1d ago", type: "badge", icon: Star },
  { id: 6, action: "Your R003 garbage report was resolved", time: "2d ago", type: "resolved", icon: CheckCircle },
  { id: 7, action: "Community poll result: Park renovation wins", time: "3d ago", type: "social", icon: Users },
  { id: 8, action: "Downtown Cleanup event added near you", time: "4d ago", type: "event", icon: Calendar },
];

const activityColor: Record<string, string> = {
  update: "bg-blue-500/10 text-blue-500",
  resolved: "bg-emerald-500/10 text-emerald-500",
  social: "bg-purple-500/10 text-purple-500",
  comment: "bg-amber-500/10 text-amber-500",
  badge: "bg-amber-500/10 text-amber-500",
  event: "bg-pink-500/10 text-pink-500",
};

function StatCard({ card, index }: { card: typeof statCards[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const Icon = card.icon;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="hover:shadow-md transition-shadow" data-testid={`stat-card-${index}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">{card.label}</span>
            <div className={`w-9 h-9 rounded-xl ${card.bg} flex items-center justify-center`}>
              <Icon size={16} className={card.color} />
            </div>
          </div>
          <div className="text-3xl font-bold text-foreground mb-1">{card.value}</div>
          <div className="text-xs text-muted-foreground">{card.change}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Dashboard() {
  const recentReports = mockReports.slice(0, 5);
  const upcomingEvents = mockEvents.filter((e) => e.isJoined).slice(0, 3);
  const allEvents = mockEvents.slice(0, 4);

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Good morning, Alex!</h2>
            <p className="text-sm text-muted-foreground">You have 3 open reports and 2 upcoming events.</p>
          </div>
          <Link href="/report">
            <Button className="shadow-lg shadow-primary/20" data-testid="button-report-new">
              <FileText size={14} className="mr-2" /> Report Issue
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((c, i) => <StatCard key={c.label} card={c} index={i} />)}
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Area chart */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Issue Reports — Last 12 Months</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={monthlyResolutionData}>
                  <defs>
                    <linearGradient id="gradReports" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradResolved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: 12 }} />
                  <Area type="monotone" dataKey="reports" stroke="#6366f1" fill="url(#gradReports)" strokeWidth={2} name="Reports" />
                  <Area type="monotone" dataKey="resolved" stroke="#10b981" fill="url(#gradResolved)" strokeWidth={2} name="Resolved" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">By Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={categoryBreakdownData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                    {categoryBreakdownData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-1 mt-2">
                {categoryBreakdownData.map((d) => (
                  <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                    <span className="truncate">{d.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom row */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent reports */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <CardTitle className="text-base">Recent Reports</CardTitle>
              <Link href="/map">
                <Button variant="ghost" size="sm" className="text-xs gap-1" data-testid="button-view-map">
                  View map <ArrowRight size={12} />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentReports.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/50 transition-colors group"
                  data-testid={`report-row-${r.id}`}
                >
                  <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={r.imageUrl} alt={r.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{r.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <MapPin size={10} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground truncate">{r.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge
                      className="text-xs capitalize"
                      style={{ background: statusColors[r.status] + "22", color: statusColors[r.status] }}
                    >
                      {r.status.replace("_", " ")}
                    </Badge>
                    <Badge
                      className="text-xs capitalize"
                      variant="outline"
                    >
                      {r.priority}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Events + Activity */}
          <div className="space-y-6">
            {/* Activity feed */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {activityFeed.slice(0, 5).map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <motion.div
                      key={a.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-2.5"
                      data-testid={`activity-item-${a.id}`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${activityColor[a.type]}`}>
                        <Icon size={12} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-foreground leading-relaxed">{a.action}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{a.time}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Points progress */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Points Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-2xl font-bold text-foreground">2,840</p>
                    <p className="text-xs text-muted-foreground">Silver Tier</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-amber-500">Gold</p>
                    <p className="text-xs text-muted-foreground">at 3,000 pts</p>
                  </div>
                </div>
                <Progress value={(2840 / 3000) * 100} className="h-2 mb-1" />
                <p className="text-xs text-muted-foreground">160 points to Gold tier</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upcoming events */}
        <Card>
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-base">Upcoming Community Events</CardTitle>
            <Link href="/forum">
              <Button variant="ghost" size="sm" className="text-xs gap-1" data-testid="button-view-events">
                All events <ArrowRight size={12} />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {allEvents.map((e, i) => (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-accent/30 transition-all cursor-pointer"
                  data-testid={`event-card-${e.id}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={13} className="text-primary" />
                    <span className="text-xs text-muted-foreground">{new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground line-clamp-2 mb-2">{e.title}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users size={10} />
                      {e.attendees}
                    </div>
                    {e.isJoined && <Badge className="bg-emerald-500/10 text-emerald-600 text-[10px]">Joined</Badge>}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
