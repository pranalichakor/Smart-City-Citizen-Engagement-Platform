import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Zap, Eye, EyeOff, ArrowRight, Mail, Lock, User } from "lucide-react";
import { SiGoogle, SiGithub } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    toast({ title: "Account created!", description: "Welcome to UrbanPulse AI. Let's get started." });
    setTimeout(() => setLocation("/dashboard"), 600);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-primary to-purple-700 relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_60%)]" />
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10 text-white"
        >
          <div className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Zap size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl">UrbanPulse AI</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Join your city's<br />civic movement.</h2>
          <p className="text-primary-foreground/70 text-lg mb-10">Every great city is built by citizens who care enough to act.</p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Cities", value: "124" }, { label: "Citizens", value: "2.1M" },
              { label: "Issues resolved", value: "847K" }, { label: "Avg response", value: "3 days" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-primary-foreground/60 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6 lg:hidden">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-bold">UrbanPulse AI</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Create your account</h1>
            <p className="text-muted-foreground">Free forever. No credit card required.</p>
          </div>

          <div className="space-y-3 mb-6">
            <Button variant="outline" className="w-full h-11 gap-3" data-testid="button-signup-google">
              <SiGoogle size={16} className="text-red-500" />
              Sign up with Google
            </Button>
            <Button variant="outline" className="w-full h-11 gap-3" data-testid="button-signup-github">
              <SiGithub size={16} />
              Sign up with GitHub
            </Button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or with email</span>
            <Separator className="flex-1" />
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm mb-1.5 block">Full name</Label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input id="name" type="text" placeholder="Your full name" className="pl-9 h-11" data-testid="input-name" required />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="text-sm mb-1.5 block">Email address</Label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" className="pl-9 h-11" data-testid="input-email" required />
              </div>
            </div>
            <div>
              <Label htmlFor="password" className="text-sm mb-1.5 block">Password</Label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  className="pl-9 pr-10 h-11"
                  data-testid="input-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  data-testid="button-toggle-password"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-11 shadow-lg shadow-primary/30" disabled={loading} data-testid="button-submit-signup">
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </div>
              ) : (
                <>Create free account <ArrowRight size={14} className="ml-2" /></>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-primary hover:underline">Terms of Service</a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
            </p>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
