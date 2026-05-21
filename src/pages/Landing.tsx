import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import {
  Zap, MapPin, BarChart3, Trophy, MessageSquare, Shield, ArrowRight,
  CheckCircle, Star, ChevronDown, Globe, Users, FileText, TrendingUp, Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, end]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const features = [
  { icon: FileText, title: "Smart Issue Reporting", desc: "AI-powered categorization and priority scoring for every citizen report. Photo uploads, location tagging, and real-time status tracking." },
  { icon: MapPin, title: "Interactive City Map", desc: "Live heatmap of active issues across all districts. Filter by category, priority, and status with sub-second response times." },
  { icon: BarChart3, title: "Data-Driven Analytics", desc: "Department performance dashboards, resolution trends, and area-wise density analysis. Export to PDF or Excel in one click." },
  { icon: Trophy, title: "Civic Rewards System", desc: "Earn points, unlock badges, and rise through the leaderboard by actively participating in your community's improvement." },
  { icon: MessageSquare, title: "Community Forum", desc: "Discuss, vote on polls, and organize around the issues that matter most. Real decision-making power for residents." },
  { icon: Shield, title: "Admin Command Center", desc: "Kanban-style issue management, department assignment, bulk actions, and full audit trails for city administrators." },
];

const testimonials = [
  { name: "Mayor Sandra Chen", role: "City of Millbrook", avatar: "https://picsum.photos/seed/t1/100/100", text: "UrbanPulse AI transformed how we engage with residents. Issue resolution time dropped by 40% in the first quarter." },
  { name: "James Okafor", role: "Community Organizer", avatar: "https://picsum.photos/seed/t2/100/100", text: "I've filed 58 reports and seen 48 resolved. The transparency is remarkable — you can watch progress in real time." },
  { name: "Dr. Priya Nair", role: "Urban Planning Researcher, MIT", avatar: "https://picsum.photos/seed/t3/100/100", text: "The data density and civic engagement metrics from UrbanPulse are unprecedented. A genuine breakthrough." },
];

const plans = [
  { name: "Starter", price: "Free", period: "", features: ["Up to 500 citizens", "Basic reporting", "Community forum", "Mobile app access", "Email support"], highlighted: false, cta: "Get started free" },
  { name: "City", price: "$2,499", period: "/month", features: ["Unlimited citizens", "AI categorization", "Full analytics suite", "Admin dashboard", "API access", "Priority support", "Custom branding"], highlighted: true, cta: "Start free trial" },
  { name: "Enterprise", price: "Custom", period: "", features: ["Multi-city deployment", "White-label solution", "Custom integrations", "Dedicated success team", "SLA guarantee", "On-premise option", "Security audit"], highlighted: false, cta: "Contact sales" },
];

const stats = [
  { label: "Issues Resolved", value: 847000, suffix: "+" },
  { label: "Active Cities", value: 124, suffix: "" },
  { label: "Citizen Users", value: 2100000, suffix: "+" },
  { label: "Avg Resolution", value: 3, suffix: " days" },
];

function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const dots: { x: number; y: number; vx: number; vy: number; r: number; opacity: number }[] = [];
    for (let i = 0; i < 80; i++) {
      dots.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, r: Math.random() * 2 + 1, opacity: Math.random() * 0.5 + 0.1 });
    }
    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${d.opacity})`;
        ctx.fill();
      });
      dots.forEach((a, i) => {
        dots.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(99,102,241,${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className={className}>
      {children}
    </motion.div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-foreground">UrbanPulse <span className="text-primary">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#stats" className="hover:text-foreground transition-colors">Impact</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" data-testid="button-nav-login">Sign in</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="shadow-lg shadow-primary/30" data-testid="button-nav-signup">
                Get started <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <HeroCanvas />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(99,102,241,0.12),transparent_60%)]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Badge className="mb-6 bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 text-sm font-medium">
              Trusted by 124 cities worldwide
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-foreground leading-[1.05] tracking-tight mb-6"
          >
            Your city,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">
              intelligently
            </span>{" "}
            responsive.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            UrbanPulse AI connects citizens with their city government through smart reporting, transparent tracking, and community-powered decisions. Real change, measurably faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/signup">
              <Button size="lg" className="h-12 px-8 text-base shadow-xl shadow-primary/30" data-testid="button-hero-start">
                Start for free <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base" data-testid="button-hero-demo">
                <Play size={14} className="mr-2" /> View live demo
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-16 flex items-center justify-center gap-8 text-sm text-muted-foreground"
          >
            {["No credit card", "Free 30-day trial", "Cancel anytime"].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-emerald-500" />
                {t}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            <ChevronDown size={20} className="text-muted-foreground" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-20 border-y border-border bg-card/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeUp} className="text-center">
                <div className="text-4xl font-bold text-foreground mb-2">
                  <AnimatedCounter end={s.value} suffix={s.suffix} />
                </div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-6">
        <Section>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Platform Features</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">Everything your city needs</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">From pothole reports to community forums — one platform that handles the full lifecycle of urban issue management.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </Section>
      </section>

      {/* How it works */}
      <section className="py-24 bg-card/20 border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <Badge className="mb-4 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">How it works</Badge>
              <h2 className="text-4xl font-bold text-foreground mb-4">From report to resolution</h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">Three steps between a citizen noticing a problem and the city fixing it.</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Citizens Report", desc: "Submit issues with photos, location, and priority. AI suggests the right category automatically.", icon: FileText },
                { step: "02", title: "City Responds", desc: "Reports route to the right department instantly. Real-time status updates keep citizens informed.", icon: Globe },
                { step: "03", title: "Community Thrives", desc: "Resolved issues are celebrated. Citizens earn points and communities get stronger.", icon: Users },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <motion.div key={s.step} variants={fadeUp} className="relative text-center">
                    <div className="text-6xl font-black text-primary/8 mb-4">{s.step}</div>
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-2">{s.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </Section>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 max-w-6xl mx-auto px-6">
        <Section>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Trusted by cities and communities</h2>
            <p className="text-muted-foreground">Don't take our word for it.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                className="p-6 rounded-2xl border border-border bg-card"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" className="text-amber-400" />)}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-card/20 border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Pricing</Badge>
              <h2 className="text-4xl font-bold text-foreground mb-4">Simple, transparent pricing</h2>
              <p className="text-muted-foreground">Scale from a single neighborhood to an entire metropolitan area.</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6 items-stretch">
              {plans.map((p) => (
                <motion.div
                  key={p.name}
                  variants={fadeUp}
                  className={cn(
                    "p-8 rounded-2xl border flex flex-col",
                    p.highlighted
                      ? "border-primary bg-primary text-white shadow-2xl shadow-primary/30 scale-105"
                      : "border-border bg-card"
                  )}
                >
                  <div className="mb-6">
                    <p className={cn("text-sm font-semibold mb-2", p.highlighted ? "text-primary-foreground/70" : "text-muted-foreground")}>{p.name}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{p.price}</span>
                      <span className={cn("text-sm", p.highlighted ? "text-primary-foreground/60" : "text-muted-foreground")}>{p.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 flex-1 mb-8">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <CheckCircle size={14} className={p.highlighted ? "text-white" : "text-emerald-500"} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup">
                    <Button
                      className={cn("w-full", p.highlighted ? "bg-white text-primary hover:bg-white/90" : "")}
                      variant={p.highlighted ? "default" : "outline"}
                      data-testid={`button-plan-${p.name.toLowerCase()}`}
                    >
                      {p.cta}
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 max-w-4xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="p-16 rounded-3xl bg-gradient-to-br from-primary to-indigo-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_60%)]" />
            <h2 className="text-4xl font-bold text-white mb-4 relative">Ready to transform your city?</h2>
            <p className="text-primary-foreground/70 text-lg mb-8 relative">Join 124 cities already using UrbanPulse AI to build smarter, more responsive communities.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-12 px-8 text-base shadow-xl" data-testid="button-cta-start">
                  Get started free <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 h-12 px-8 text-base" data-testid="button-cta-demo">
                  View demo dashboard
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <Zap size={14} className="text-white" />
              </div>
              <span className="font-bold text-foreground">UrbanPulse AI</span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              {["Privacy", "Terms", "Security", "Status", "Docs"].map((l) => (
                <a key={l} href="#" className="hover:text-foreground transition-colors">{l}</a>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">2026 UrbanPulse Technologies, Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
