import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Zap, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <Zap size={18} className="text-white" />
          </div>
          <span className="font-bold text-foreground">UrbanPulse AI</span>
        </div>

        <div className="p-8 rounded-2xl border border-border bg-card">
          {!sent ? (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground mb-2">Reset your password</h1>
                <p className="text-muted-foreground text-sm">Enter your email and we'll send you a reset link.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                      data-testid="input-reset-email"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full h-11" disabled={loading} data-testid="button-send-reset">
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : "Send reset link"}
                </Button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-emerald-500" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">Check your email</h2>
              <p className="text-muted-foreground text-sm mb-6">
                We've sent a password reset link to{" "}
                <span className="font-medium text-foreground">{email}</span>.
                It may take a few minutes.
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setSent(false)}
                data-testid="button-resend"
              >
                Didn't receive it? Resend
              </Button>
            </motion.div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5">
            <ArrowLeft size={14} /> Back to sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
