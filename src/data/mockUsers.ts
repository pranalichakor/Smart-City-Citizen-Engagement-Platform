export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  color: string;
}

export interface CitizenUser {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  points: number;
  rank: number;
  reportsSubmitted: number;
  reportsResolved: number;
  joinDate: string;
  district: string;
  badges: string[];
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond";
}

export const badges: Badge[] = [
  { id: "B001", name: "First Report", description: "Submit your first issue report", icon: "Flag", rarity: "common", color: "#6b7280" },
  { id: "B002", name: "Neighborhood Watch", description: "Submit 10 reports in one district", icon: "Eye", rarity: "common", color: "#6b7280" },
  { id: "B003", name: "Problem Solver", description: "Have 5 reports resolved", icon: "CheckCircle", rarity: "rare", color: "#3b82f6" },
  { id: "B004", name: "Community Champion", description: "Earn 1,000 points", icon: "Star", rarity: "rare", color: "#3b82f6" },
  { id: "B005", name: "Civic Hero", description: "Earn 5,000 points", icon: "Shield", rarity: "epic", color: "#8b5cf6" },
  { id: "B006", name: "City Guardian", description: "Earn 10,000 points", icon: "Award", rarity: "epic", color: "#8b5cf6" },
  { id: "B007", name: "Urban Legend", description: "Top 5 on leaderboard for 30 days", icon: "Trophy", rarity: "legendary", color: "#f59e0b" },
  { id: "B008", name: "Quick Reporter", description: "Submit 5 reports in one week", icon: "Zap", rarity: "common", color: "#6b7280" },
  { id: "B009", name: "Forum Leader", description: "Post 25 forum discussions", icon: "MessageCircle", rarity: "rare", color: "#3b82f6" },
  { id: "B010", name: "Eco Warrior", description: "Report 20 environmental issues", icon: "Leaf", rarity: "epic", color: "#10b981" },
];

export const tierThresholds = {
  bronze: { min: 0, max: 999, color: "#cd7f32" },
  silver: { min: 1000, max: 2999, color: "#9ca3af" },
  gold: { min: 3000, max: 7499, color: "#f59e0b" },
  platinum: { min: 7500, max: 14999, color: "#818cf8" },
  diamond: { min: 15000, max: Infinity, color: "#38bdf8" },
};

export const mockUsers: CitizenUser[] = [
  { id: "U001", name: "Sarah Johnson", username: "sarahj", email: "sarah@example.com", avatar: "https://picsum.photos/seed/u1/100/100", points: 15420, rank: 1, reportsSubmitted: 89, reportsResolved: 74, joinDate: "2024-01-15", district: "Downtown", badges: ["B001","B002","B003","B004","B005","B006","B007"], tier: "diamond" },
  { id: "U002", name: "Marcus Chen", username: "mchen", email: "marcus@example.com", avatar: "https://picsum.photos/seed/u2/100/100", points: 12850, rank: 2, reportsSubmitted: 72, reportsResolved: 61, joinDate: "2024-02-08", district: "Westside", badges: ["B001","B002","B003","B004","B005","B006"], tier: "diamond" },
  { id: "U003", name: "Elena Rodriguez", username: "elenaar", email: "elena@example.com", avatar: "https://picsum.photos/seed/u3/100/100", points: 10200, rank: 3, reportsSubmitted: 65, reportsResolved: 52, joinDate: "2024-01-28", district: "Midtown", badges: ["B001","B002","B003","B004","B005"], tier: "platinum" },
  { id: "U004", name: "James Okafor", username: "jamesokafor", email: "james@example.com", avatar: "https://picsum.photos/seed/u4/100/100", points: 9750, rank: 4, reportsSubmitted: 58, reportsResolved: 48, joinDate: "2024-03-10", district: "Northgate", badges: ["B001","B002","B003","B004","B005"], tier: "platinum" },
  { id: "U005", name: "Priya Sharma", username: "priyash", email: "priya@example.com", avatar: "https://picsum.photos/seed/u5/100/100", points: 8300, rank: 5, reportsSubmitted: 49, reportsResolved: 40, joinDate: "2024-02-20", district: "Eastpark", badges: ["B001","B002","B003","B004"], tier: "platinum" },
  { id: "U006", name: "David Kim", username: "davidk", email: "david@example.com", avatar: "https://picsum.photos/seed/u6/100/100", points: 6900, rank: 6, reportsSubmitted: 43, reportsResolved: 35, joinDate: "2024-04-05", district: "Harbor", badges: ["B001","B002","B003","B004"], tier: "gold" },
  { id: "U007", name: "Aisha Williams", username: "aishaw", email: "aisha@example.com", avatar: "https://picsum.photos/seed/u7/100/100", points: 5600, rank: 7, reportsSubmitted: 38, reportsResolved: 29, joinDate: "2024-03-22", district: "Riverside", badges: ["B001","B002","B003"], tier: "gold" },
  { id: "U008", name: "Tom Nakamura", username: "tomnak", email: "tom@example.com", avatar: "https://picsum.photos/seed/u8/100/100", points: 4800, rank: 8, reportsSubmitted: 31, reportsResolved: 24, joinDate: "2024-05-01", district: "Industrial", badges: ["B001","B002","B003"], tier: "gold" },
  { id: "U009", name: "Linda Petrov", username: "lindap", email: "linda@example.com", avatar: "https://picsum.photos/seed/u9/100/100", points: 3900, rank: 9, reportsSubmitted: 27, reportsResolved: 20, joinDate: "2024-04-15", district: "Midtown", badges: ["B001","B002"], tier: "gold" },
  { id: "U010", name: "Carlos Mendez", username: "carlosm", email: "carlos@example.com", avatar: "https://picsum.photos/seed/u10/100/100", points: 3100, rank: 10, reportsSubmitted: 22, reportsResolved: 16, joinDate: "2024-05-12", district: "Westside", badges: ["B001","B002"], tier: "gold" },
  { id: "U011", name: "Fiona Clarke", username: "fionac", email: "fiona@example.com", avatar: "https://picsum.photos/seed/u11/100/100", points: 2600, rank: 11, reportsSubmitted: 19, reportsResolved: 13, joinDate: "2024-06-01", district: "Downtown", badges: ["B001","B002"], tier: "silver" },
  { id: "U012", name: "Omar Hassan", username: "omarh", email: "omar@example.com", avatar: "https://picsum.photos/seed/u12/100/100", points: 2100, rank: 12, reportsSubmitted: 15, reportsResolved: 11, joinDate: "2024-06-10", district: "Northgate", badges: ["B001"], tier: "silver" },
  { id: "U013", name: "Yuki Tanaka", username: "yukit", email: "yuki@example.com", avatar: "https://picsum.photos/seed/u13/100/100", points: 1800, rank: 13, reportsSubmitted: 13, reportsResolved: 9, joinDate: "2024-06-18", district: "Eastpark", badges: ["B001"], tier: "silver" },
  { id: "U014", name: "Brendan O'Neill", username: "brendanon", email: "brendan@example.com", avatar: "https://picsum.photos/seed/u14/100/100", points: 1400, rank: 14, reportsSubmitted: 10, reportsResolved: 7, joinDate: "2024-07-02", district: "Harbor", badges: ["B001"], tier: "silver" },
  { id: "U015", name: "Naledi Dlamini", username: "naledid", email: "naledi@example.com", avatar: "https://picsum.photos/seed/u15/100/100", points: 1100, rank: 15, reportsSubmitted: 8, reportsResolved: 5, joinDate: "2024-07-15", district: "Riverside", badges: ["B001"], tier: "silver" },
  { id: "CURRENT", name: "Alex Chen", username: "alexc", email: "alex@urbanpulse.city", avatar: "https://picsum.photos/seed/uc/100/100", points: 2840, rank: 11, reportsSubmitted: 142, reportsResolved: 118, joinDate: "2024-03-05", district: "Downtown", badges: ["B001","B002","B003","B004","B008"], tier: "silver" },
];
