import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Zap, Eye, EyeOff, ArrowRight, Mail, Lock } from "lucide-react";
import { SiGoogle, SiGithub } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast({ title: "Welcome back!", description: "Redirecting to your dashboard..." });
    setTimeout(() => setLocation("/dashboard"), 500);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-indigo-600 to-purple-700 relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-white/5 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-white"
        >
          <div className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Zap size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl">UrbanPulse AI</span>
          </div>

          <h2 className="text-4xl font-bold mb-4 leading-tight">Your city gets better<br />every time you log in.</h2>
          <p className="text-primary-foreground/70 text-lg mb-10 leading-relaxed">142 reports submitted. 118 resolved. Every one of them made a real difference.</p>

          <div className="space-y-4">
            {[
              { label: "Reports resolved this month", value: "174" },
              { label: "Active citizens in your district", value: "2,840" },
              { label: "Your current rank", value: "#11" },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
                <span className="text-sm text-primary-foreground/80">{s.label}</span>
                <span className="font-bold">{s.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6 lg:hidden">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-bold">UrbanPulse AI</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>

          {/* Social */}
          <div className="space-y-3 mb-6">
            <Button variant="outline" className="w-full h-11 gap-3" data-testid="button-login-google">
              <SiGoogle size={16} className="text-red-500" />
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full h-11 gap-3" data-testid="button-login-github">
              <SiGithub size={16} />
              Continue with GitHub
            </Button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or continue with email</span>
            <Separator className="flex-1" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm mb-1.5 block">Email address</Label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 h-11"
                  data-testid="input-email"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label htmlFor="password" className="text-sm">Password</Label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-10 h-11"
                  data-testid="input-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  data-testid="button-toggle-password"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 shadow-lg shadow-primary/30"
              disabled={loading}
              data-testid="button-submit-login"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                <>Sign in <ArrowRight size={14} className="ml-2" /></>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary font-medium hover:underline">Create one free</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
