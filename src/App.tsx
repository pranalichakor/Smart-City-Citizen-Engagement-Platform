import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "wouter";

import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ForgotPassword from "@/pages/ForgotPassword";
import Dashboard from "@/pages/Dashboard";
import Report from "@/pages/Report";
import Map from "@/pages/Map";
import Analytics from "@/pages/Analytics";
import Leaderboard from "@/pages/Leaderboard";
import Forum from "@/pages/Forum";
import Admin from "@/pages/Admin";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15 } },
};

function AnimatedRoute({ component: Component }: { component: React.ComponentType }) {
  return (
    <motion.div
      key={Component.name}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-full"
    >
      <Component />
    </motion.div>
  );
}

function Router() {
  const [location] = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Switch key={location}>
        <Route path="/" component={() => <AnimatedRoute component={Landing} />} />
        <Route path="/login" component={() => <AnimatedRoute component={Login} />} />
        <Route path="/signup" component={() => <AnimatedRoute component={Signup} />} />
        <Route path="/forgot-password" component={() => <AnimatedRoute component={ForgotPassword} />} />
        <Route path="/dashboard" component={() => <AnimatedRoute component={Dashboard} />} />
        <Route path="/report" component={() => <AnimatedRoute component={Report} />} />
        <Route path="/map" component={() => <AnimatedRoute component={Map} />} />
        <Route path="/analytics" component={() => <AnimatedRoute component={Analytics} />} />
        <Route path="/leaderboard" component={() => <AnimatedRoute component={Leaderboard} />} />
        <Route path="/forum" component={() => <AnimatedRoute component={Forum} />} />
        <Route path="/admin" component={() => <AnimatedRoute component={Admin} />} />
        <Route path="/settings" component={() => <AnimatedRoute component={Settings} />} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
