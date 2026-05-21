import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Trophy, Star, Shield, Zap, Award, Eye, Flag, CheckCircle, MessageCircle, Leaf, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockUsers, badges, tierThresholds } from "@/data/mockUsers";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Flag, Eye, CheckCircle, Star, Shield, Award, Trophy, Zap, MessageCircle, Leaf,
};

const tierBadgeStyle: Record<string, string> = {
  bronze: "bg-amber-700/10 text-amber-700 border-amber-700/20",
  silver: "bg-gray-400/10 text-gray-500 border-gray-400/20",
  gold: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  platinum: "bg-indigo-400/10 text-indigo-400 border-indigo-400/20",
  diamond: "bg-sky-400/10 text-sky-500 border-sky-400/20",
};

const rankColors = ["text-amber-400", "text-gray-400", "text-amber-600"];

const rewards = [
  { title: "City Hall Pass", desc: "Skip the queue for permits", points: 5000, image: "https://picsum.photos/seed/r1/80/80" },
  { title: "Transit Monthly Pass", desc: "Free public transit for 30 days", points: 8000, image: "https://picsum.photos/seed/r2/80/80" },
  { title: "Park Membership", desc: "Annual gym & pool access", points: 12000, image: "https://picsum.photos/seed/r3/80/80" },
  { title: "Urban Hero Plaque", desc: "Permanent recognition at City Hall", points: 20000, image: "https://picsum.photos/seed/r4/80/80" },
];

export default function Leaderboard() {
  const [tab, setTab] = useState("all");
  const allUsers = [...mockUsers.filter((u) => u.id !== "CURRENT")].sort((a, b) => b.points - a.points);
  const currentUser = mockUsers.find((u) => u.id === "CURRENT")!;

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">Leaderboard & Rewards</h2>
            <p className="text-sm text-muted-foreground">Earn points by reporting and resolving city issues</p>
          </div>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="all">All-time</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
              <TabsTrigger value="district">My District</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Current user card */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-5">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="relative">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-primary" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                  #{currentUser.rank}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-foreground">{currentUser.name}</span>
                  <Badge className={cn("text-xs capitalize border", tierBadgeStyle[currentUser.tier])}>{currentUser.tier}</Badge>
                  <Badge variant="outline" className="text-xs">You</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{currentUser.points.toLocaleString()} points</span>
                  <span>{currentUser.reportsSubmitted} reports</span>
                  <span>{currentUser.reportsResolved} resolved</span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Progress to Gold</span>
                    <span className="text-amber-500 font-medium">{currentUser.points} / 3,000</span>
                  </div>
                  <Progress value={(currentUser.points / 3000) * 100} className="h-2" />
                </div>
              </div>
              <div className="flex gap-1 flex-wrap">
                {currentUser.badges.map((bid) => {
                  const badge = badges.find((b) => b.id === bid);
                  if (!badge) return null;
                  const Icon = iconMap[badge.icon] || Star;
                  return (
                    <div key={bid} title={badge.name} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: badge.color + "22" }}>
                      <Icon size={14} style={{ color: badge.color }} />
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Leaderboard table */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Top Citizens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {allUsers.map((user, i) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/50 transition-colors"
                  data-testid={`leaderboard-row-${user.id}`}
                >
                  <div className={cn("w-7 text-center text-sm font-bold", i < 3 ? rankColors[i] : "text-muted-foreground")}>
                    {i < 3 ? (i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉") : `#${i + 1}`}
                  </div>
                  <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{user.name}</span>
                      <Badge className={cn("text-[10px] capitalize border h-4 px-1", tierBadgeStyle[user.tier])}>{user.tier}</Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{user.district} · {user.reportsSubmitted} reports</span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-bold text-foreground">{user.points.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">pts</div>
                  </div>
                  <div className="flex gap-0.5">
                    {user.badges.slice(0, 3).map((bid) => {
                      const badge = badges.find((b) => b.id === bid);
                      if (!badge) return null;
                      const Icon = iconMap[badge.icon] || Star;
                      return (
                        <div key={bid} className="w-6 h-6 rounded flex items-center justify-center" style={{ background: badge.color + "22" }}>
                          <Icon size={10} style={{ color: badge.color }} />
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Right column */}
          <div className="space-y-6">
            {/* Badges grid */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Achievement Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {badges.map((badge) => {
                    const Icon = iconMap[badge.icon] || Star;
                    const earned = currentUser.badges.includes(badge.id);
                    return (
                      <div
                        key={badge.id}
                        className={cn("p-3 rounded-xl border text-center transition-all", earned ? "border-primary/20 bg-primary/5" : "border-border opacity-50 grayscale")}
                        data-testid={`badge-${badge.id}`}
                      >
                        <div className="w-9 h-9 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ background: badge.color + "22" }}>
                          <Icon size={16} style={{ color: badge.color }} />
                        </div>
                        <p className="text-[10px] font-semibold text-foreground leading-tight">{badge.name}</p>
                        <Badge className="text-[9px] mt-1 capitalize px-1 h-3" style={{ background: badge.color + "22", color: badge.color }}>
                          {badge.rarity}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Rewards catalog */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Rewards Catalog</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {rewards.map((r) => {
                  const canRedeem = currentUser.points >= r.points;
                  return (
                    <div key={r.title} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-accent/30 transition-colors" data-testid={`reward-${r.title}`}>
                      <img src={r.image} alt={r.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">{r.title}</p>
                        <p className="text-[10px] text-muted-foreground">{r.desc}</p>
                        <p className="text-xs font-bold text-amber-500 mt-0.5">{r.points.toLocaleString()} pts</p>
                      </div>
                      <button
                        disabled={!canRedeem}
                        className={cn("text-xs px-2 py-1 rounded-lg font-medium transition-colors flex-shrink-0", canRedeem ? "bg-primary text-white hover:bg-primary/90" : "bg-muted text-muted-foreground cursor-not-allowed")}
                        data-testid={`button-redeem-${r.title}`}
                      >
                        {canRedeem ? "Redeem" : "Locked"}
                      </button>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
