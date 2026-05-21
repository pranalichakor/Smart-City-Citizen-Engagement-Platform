import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { User, Bell, Palette, Shield, Camera, Save, Eye, EyeOff, LogOut, Smartphone, Monitor, Moon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const notifSettings = [
  { id: "report_updates", label: "Report Status Updates", desc: "Notifications when your reports change status", enabled: true },
  { id: "community_replies", label: "Forum Replies", desc: "When someone replies to your posts", enabled: true },
  { id: "badge_earned", label: "Badge Achievements", desc: "When you unlock new badges or tier upgrades", enabled: true },
  { id: "events_nearby", label: "Nearby Events", desc: "Community events in your district", enabled: false },
  { id: "city_alerts", label: "City Announcements", desc: "Important notices from the city", enabled: true },
  { id: "weekly_digest", label: "Weekly Digest", desc: "Summary of city activity every Monday", enabled: false },
  { id: "neighbor_upvotes", label: "Neighbor Upvotes", desc: "When neighbors upvote your reports", enabled: false },
];

const activeSessions = [
  { device: "MacBook Pro — Chrome", location: "Downtown, City", lastActive: "Now (current)", current: true },
  { device: "iPhone 15 Pro — Safari", location: "Westside, City", lastActive: "2 hours ago", current: false },
  { device: "Windows PC — Firefox", location: "Midtown, City", lastActive: "3 days ago", current: false },
];

const themeOptions = [
  { id: "light", label: "Light", icon: Monitor, desc: "Clean and bright" },
  { id: "dark", label: "Dark", icon: Moon, desc: "Easy on the eyes" },
  { id: "system", label: "System", icon: Smartphone, desc: "Follows your OS" },
];

export default function Settings() {
  const [notifications, setNotifications] = useState(notifSettings);
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const toggleNotif = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, enabled: !n.enabled } : n));
  };

  const handleSave = () => {
    toast({ title: "Settings saved", description: "Your changes have been applied." });
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground">Settings</h2>
          <p className="text-sm text-muted-foreground">Manage your profile, preferences, and account security</p>
        </div>

        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile" className="gap-2"><User size={14} /> Profile</TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2"><Bell size={14} /> Notifications</TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2"><Palette size={14} /> Appearance</TabsTrigger>
            <TabsTrigger value="security" className="gap-2"><Shield size={14} /> Security</TabsTrigger>
          </TabsList>

          {/* Profile */}
          <TabsContent value="profile">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-base">Profile Information</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <img
                        src="https://picsum.photos/seed/uc/100/100"
                        alt="Profile"
                        className="w-20 h-20 rounded-2xl object-cover ring-2 ring-primary/30"
                      />
                      <button
                        className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
                        data-testid="button-change-avatar"
                      >
                        <Camera size={14} className="text-white" />
                      </button>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Alex Chen</p>
                      <p className="text-sm text-muted-foreground">alex@urbanpulse.city</p>
                      <Badge className="mt-1 bg-primary/10 text-primary text-xs">Silver Tier · 2,840 pts</Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first-name" className="text-sm mb-1.5 block">First Name</Label>
                      <Input id="first-name" defaultValue="Alex" data-testid="input-first-name" />
                    </div>
                    <div>
                      <Label htmlFor="last-name" className="text-sm mb-1.5 block">Last Name</Label>
                      <Input id="last-name" defaultValue="Chen" data-testid="input-last-name" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm mb-1.5 block">Email Address</Label>
                      <Input id="email" type="email" defaultValue="alex@urbanpulse.city" data-testid="input-settings-email" />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm mb-1.5 block">Phone (optional)</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" data-testid="input-phone" />
                    </div>
                    <div>
                      <Label htmlFor="username" className="text-sm mb-1.5 block">Username</Label>
                      <Input id="username" defaultValue="alexc" data-testid="input-username" />
                    </div>
                    <div>
                      <Label htmlFor="district" className="text-sm mb-1.5 block">District</Label>
                      <Input id="district" defaultValue="Downtown" data-testid="input-district" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio" className="text-sm mb-1.5 block">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={3}
                      defaultValue="Passionate about making Downtown a better place. 142 reports submitted and counting."
                      className="resize-none"
                      data-testid="input-bio"
                    />
                  </div>

                  <Button onClick={handleSave} className="gap-2 shadow-lg shadow-primary/20" data-testid="button-save-profile">
                    <Save size={14} /> Save Changes
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader><CardTitle className="text-base">Notification Preferences</CardTitle></CardHeader>
                <CardContent className="space-y-1">
                  {notifications.map((n, i) => (
                    <div key={n.id}>
                      <div className="flex items-center justify-between py-4">
                        <div className="flex-1 min-w-0 pr-4">
                          <p className="text-sm font-medium text-foreground">{n.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                        </div>
                        <Switch
                          checked={n.enabled}
                          onCheckedChange={() => toggleNotif(n.id)}
                          data-testid={`toggle-notif-${n.id}`}
                        />
                      </div>
                      {i < notifications.length - 1 && <Separator />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Appearance */}
          <TabsContent value="appearance">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-base">Theme</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {themeOptions.map((t) => {
                      const Icon = t.icon;
                      const isActive = theme === t.id;
                      return (
                        <button
                          key={t.id}
                          onClick={() => setTheme(t.id)}
                          className={cn(
                            "p-5 rounded-2xl border-2 transition-all text-center",
                            isActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                          )}
                          data-testid={`theme-option-${t.id}`}
                        >
                          <div className={cn("w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center", isActive ? "bg-primary/10" : "bg-accent")}>
                            <Icon size={20} className={isActive ? "text-primary" : "text-muted-foreground"} />
                          </div>
                          <p className={cn("text-sm font-semibold", isActive ? "text-primary" : "text-foreground")}>{t.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{t.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Display</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Compact mode</p>
                      <p className="text-xs text-muted-foreground">Reduce spacing in lists and tables</p>
                    </div>
                    <Switch data-testid="toggle-compact-mode" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Animations</p>
                      <p className="text-xs text-muted-foreground">Enable smooth transitions and animations</p>
                    </div>
                    <Switch defaultChecked data-testid="toggle-animations" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-base">Change Password</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm mb-1.5 block">Current Password</Label>
                    <div className="relative">
                      <Input type={showCurrentPwd ? "text" : "password"} placeholder="Enter current password" className="pr-10" data-testid="input-current-password" />
                      <button onClick={() => setShowCurrentPwd(!showCurrentPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" data-testid="button-toggle-current-pwd">
                        {showCurrentPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm mb-1.5 block">New Password</Label>
                    <div className="relative">
                      <Input type={showNewPwd ? "text" : "password"} placeholder="At least 8 characters" className="pr-10" data-testid="input-new-password" />
                      <button onClick={() => setShowNewPwd(!showNewPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" data-testid="button-toggle-new-pwd">
                        {showNewPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm mb-1.5 block">Confirm New Password</Label>
                    <Input type="password" placeholder="Confirm new password" data-testid="input-confirm-password" />
                  </div>
                  <Button className="gap-2" data-testid="button-update-password">
                    <Save size={14} /> Update Password
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Two-Factor Authentication</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Enable 2FA</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Add an extra layer of security with an authenticator app</p>
                    </div>
                    <Switch checked={twoFA} onCheckedChange={setTwoFA} data-testid="toggle-2fa" />
                  </div>
                  {twoFA && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <p className="text-sm text-emerald-600 font-medium">2FA is enabled</p>
                      <p className="text-xs text-emerald-600/70 mt-0.5">Your account is protected with two-factor authentication.</p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Active Sessions</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {activeSessions.map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border" data-testid={`session-${i}`}>
                      <div>
                        <p className="text-sm font-medium text-foreground flex items-center gap-2">
                          {s.device}
                          {s.current && <Badge className="text-[10px] bg-emerald-500/10 text-emerald-600">Current</Badge>}
                        </p>
                        <p className="text-xs text-muted-foreground">{s.location} · {s.lastActive}</p>
                      </div>
                      {!s.current && (
                        <button className="text-xs text-destructive hover:underline" data-testid={`button-revoke-session-${i}`}>
                          Revoke
                        </button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" className="w-full gap-2 text-destructive border-destructive/30 hover:bg-destructive/5" data-testid="button-signout-all">
                    <LogOut size={14} /> Sign out all other sessions
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
