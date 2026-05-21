import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Download, FileSpreadsheet, FileText, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PieChart, Pie, Cell
} from "recharts";
import { monthlyResolutionData, mockDepartments, districtIssueData, categoryBreakdownData } from "@/data/mockDepartments";
import { useToast } from "@/hooks/use-toast";

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08 } }) };

const kpis = [
  { label: "Total Reports (May)", value: "191", change: "+7.3%", up: true },
  { label: "Resolved This Month", value: "174", change: "+6.7%", up: true },
  { label: "Avg Resolution Days", value: "3.4", change: "-0.8 days", up: true },
  { label: "Citizen Satisfaction", value: "87%", change: "+2%", up: true },
];

export default function Analytics() {
  const [period, setPeriod] = useState("12m");
  const { toast } = useToast();

  const handleExport = (type: "pdf" | "excel") => {
    toast({ title: `Exporting as ${type.toUpperCase()}...`, description: "Your report will download shortly." });
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">Analytics Dashboard</h2>
            <p className="text-sm text-muted-foreground">City-wide issue management metrics and performance tracking</p>
          </div>
          <div className="flex items-center gap-3">
            <Tabs value={period} onValueChange={setPeriod}>
              <TabsList>
                <TabsTrigger value="3m">3M</TabsTrigger>
                <TabsTrigger value="6m">6M</TabsTrigger>
                <TabsTrigger value="12m">12M</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="sm" onClick={() => handleExport("pdf")} data-testid="button-export-pdf">
              <FileText size={14} className="mr-1.5" /> PDF
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport("excel")} data-testid="button-export-excel">
              <FileSpreadsheet size={14} className="mr-1.5" /> Excel
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((k, i) => (
            <motion.div key={k.label} custom={i} initial="hidden" animate="visible" variants={fadeUp}>
              <Card>
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground mb-3">{k.label}</p>
                  <p className="text-3xl font-bold text-foreground mb-1">{k.value}</p>
                  <div className="flex items-center gap-1 text-xs">
                    {k.up ? <TrendingUp size={12} className="text-emerald-500" /> : <TrendingDown size={12} className="text-red-500" />}
                    <span className={k.up ? "text-emerald-500" : "text-red-500"}>{k.change}</span>
                    <span className="text-muted-foreground">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Resolution trend */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Resolution Trends</CardTitle>
              <Badge variant="outline" className="text-xs">Last 12 months</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={monthlyResolutionData}>
                <defs>
                  <linearGradient id="gReports" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: 12 }} />
                <Legend />
                <Area type="monotone" dataKey="reports" name="Submitted" stroke="#6366f1" fill="url(#gReports)" strokeWidth={2} />
                <Area type="monotone" dataKey="resolved" name="Resolved" stroke="#10b981" fill="url(#gResolved)" strokeWidth={2} />
                <Line type="monotone" dataKey="target" name="Target" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Dept performance + District density */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Department Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={mockDepartments} layout="vertical" margin={{ left: 10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis dataKey="shortName" type="category" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} width={64} />
                  <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: 12 }} />
                  <Bar dataKey="resolved" name="Resolved" fill="#10b981" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="pending" name="Pending" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Area-wise Issue Density</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={districtIssueData} layout="vertical" margin={{ left: 10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis dataKey="district" type="category" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} width={64} />
                  <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: 12 }} />
                  <Bar dataKey="issues" name="Total" fill="#6366f1" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="resolved" name="Resolved" fill="#10b981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Category breakdown + Department table */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={categoryBreakdownData} cx="50%" cy="50%" outerRadius={80} paddingAngle={3} dataKey="value" label={({ name, value }) => `${value}%`} labelLine={false}>
                    {categoryBreakdownData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-3">
                {categoryBreakdownData.map((d) => (
                  <div key={d.name} className="flex items-center gap-2 text-xs">
                    <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: d.color }} />
                    <span className="flex-1 text-muted-foreground">{d.name}</span>
                    <span className="font-semibold text-foreground">{d.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Department Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockDepartments.map((d) => {
                  const rate = Math.round((d.resolved / d.totalAssigned) * 100);
                  return (
                    <div key={d.id} className="flex items-center gap-3" data-testid={`dept-row-${d.id}`}>
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">{d.name}</span>
                          <span className="text-xs text-muted-foreground">{rate}%</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${rate}%`, background: d.color }} />
                        </div>
                      </div>
                      <div className="text-right text-xs flex-shrink-0">
                        <div className="text-foreground font-semibold">{d.resolved}</div>
                        <div className="text-muted-foreground">resolved</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
