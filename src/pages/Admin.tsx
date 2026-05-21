import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Users, Building2, BarChart3, Search, MoreHorizontal, CheckCircle, Clock, AlertTriangle, XCircle, Filter, Download, Plus, GripVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { mockUsers } from "@/data/mockUsers";
import { mockReports, statusColors, priorityColors } from "@/data/mockReports";
import { mockDepartments } from "@/data/mockDepartments";
import { cn } from "@/lib/utils";

const kanbanColumns = [
  { id: "open", label: "New", icon: AlertTriangle, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: "in_progress", label: "In Progress", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
  { id: "resolved", label: "Resolved", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { id: "closed", label: "Closed", icon: XCircle, color: "text-gray-400", bg: "bg-gray-400/10" },
];

const adminStats = [
  { label: "Total Users", value: "2,847", change: "+142 this week", icon: Users, color: "text-primary", bg: "bg-primary/10" },
  { label: "Active Reports", value: "191", change: "53 awaiting assignment", icon: BarChart3, color: "text-amber-500", bg: "bg-amber-500/10" },
  { label: "Departments", value: "7", change: "All operational", icon: Building2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Resolved (May)", value: "174", change: "91% resolution rate", icon: CheckCircle, color: "text-purple-500", bg: "bg-purple-500/10" },
];

export default function Admin() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [draggedReport, setDraggedReport] = useState<string | null>(null);
  const [reportStatuses, setReportStatuses] = useState<Record<string, string>>(
    Object.fromEntries(mockReports.map((r) => [r.id, r.status]))
  );

  const filteredUsers = mockUsers.filter((u) =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const toggleUser = (id: string) => {
    setSelectedUsers((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const handleDrop = (targetStatus: string) => {
    if (!draggedReport) return;
    setReportStatuses((prev) => ({ ...prev, [draggedReport]: targetStatus }));
    setDraggedReport(null);
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Admin Dashboard</h2>
          <p className="text-sm text-muted-foreground">Manage users, departments, and city issue workflow</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {adminStats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-muted-foreground">{s.label}</span>
                      <div className={`w-8 h-8 rounded-xl ${s.bg} flex items-center justify-center`}>
                        <Icon size={14} className={s.color} />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-0.5">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.change}</div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <Tabs defaultValue="kanban">
          <TabsList>
            <TabsTrigger value="kanban">Issue Kanban</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
          </TabsList>

          {/* Kanban */}
          <TabsContent value="kanban" className="mt-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {kanbanColumns.map((col) => {
                const Icon = col.icon;
                const colReports = mockReports.filter((r) => (reportStatuses[r.id] || r.status) === col.id);
                return (
                  <div
                    key={col.id}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(col.id)}
                    className="min-h-64"
                    data-testid={`kanban-col-${col.id}`}
                  >
                    <div className={cn("flex items-center gap-2 px-3 py-2 rounded-xl mb-3 border", col.bg)}>
                      <Icon size={14} className={col.color} />
                      <span className="text-sm font-semibold">{col.label}</span>
                      <Badge className="ml-auto text-xs h-5 px-1.5">{colReports.length}</Badge>
                    </div>
                    <div className="space-y-2">
                      {colReports.map((r) => (
                        <div
                          key={r.id}
                          draggable
                          onDragStart={() => setDraggedReport(r.id)}
                          className="bg-card border border-border rounded-xl p-3 cursor-grab active:cursor-grabbing hover:border-primary/30 transition-all hover:shadow-sm group"
                          data-testid={`kanban-card-${r.id}`}
                        >
                          <div className="flex items-center gap-1.5 mb-2">
                            <GripVertical size={12} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                            <span className="text-[10px] font-mono text-muted-foreground">{r.id}</span>
                            <div className="ml-auto w-2 h-2 rounded-full flex-shrink-0" style={{ background: priorityColors[r.priority] }} />
                          </div>
                          <p className="text-xs font-semibold text-foreground leading-tight mb-1.5 line-clamp-2">{r.title}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-muted-foreground">{r.district}</span>
                            <Badge variant="outline" className="text-[9px] h-4 px-1 capitalize">{r.priority}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* Users */}
          <TabsContent value="users" className="mt-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="relative flex-1 min-w-48">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      className="pl-8 h-9"
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      data-testid="input-user-search"
                    />
                  </div>
                  {selectedUsers.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{selectedUsers.length} selected</span>
                      <Button variant="outline" size="sm" data-testid="button-bulk-action">Bulk Action</Button>
                    </div>
                  )}
                  <Button variant="outline" size="sm" className="gap-1.5" data-testid="button-export-users">
                    <Download size={13} /> Export
                  </Button>
                  <Button size="sm" className="gap-1.5" data-testid="button-add-user">
                    <Plus size={13} /> Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10"><Checkbox /></TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>District</TableHead>
                      <TableHead>Reports</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Tier</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.filter((u) => u.id !== "CURRENT").slice(0, 12).map((user) => (
                      <TableRow key={user.id} data-testid={`user-row-${user.id}`}>
                        <TableCell>
                          <Checkbox
                            checked={selectedUsers.includes(user.id)}
                            onCheckedChange={() => toggleUser(user.id)}
                            data-testid={`checkbox-user-${user.id}`}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2.5">
                            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                            <div>
                              <p className="text-sm font-medium text-foreground">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{user.district}</TableCell>
                        <TableCell className="text-sm text-foreground">{user.reportsSubmitted}</TableCell>
                        <TableCell className="text-sm font-semibold text-foreground">{user.points.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className="capitalize text-xs" variant="outline">{user.tier}</Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">{user.joinDate}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0" data-testid={`button-user-actions-${user.id}`}>
                                <MoreHorizontal size={14} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit user</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Suspend</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Departments */}
          <TabsContent value="departments" className="mt-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockDepartments.map((dept, i) => (
                <motion.div key={dept.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                  <Card className="hover:border-primary/30 transition-colors" data-testid={`dept-card-${dept.id}`}>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: dept.color + "22" }}>
                          <Building2 size={18} style={{ color: dept.color }} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">{dept.name}</p>
                          <p className="text-xs text-muted-foreground">Head: {dept.head}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="text-center p-2 rounded-lg bg-accent/50">
                          <div className="text-lg font-bold text-foreground">{dept.totalAssigned}</div>
                          <div className="text-[10px] text-muted-foreground">Total</div>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-emerald-500/10">
                          <div className="text-lg font-bold text-emerald-500">{dept.resolved}</div>
                          <div className="text-[10px] text-muted-foreground">Resolved</div>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-amber-500/10">
                          <div className="text-lg font-bold text-amber-500">{dept.pending}</div>
                          <div className="text-[10px] text-muted-foreground">Pending</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Resolution rate</span>
                          <span className="font-semibold text-foreground">{Math.round((dept.resolved / dept.totalAssigned) * 100)}%</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${(dept.resolved / dept.totalAssigned) * 100}%`, background: dept.color }} />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Avg {dept.avgResolutionDays} days</span>
                          <span>{dept.satisfactionScore}% satisfaction</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
