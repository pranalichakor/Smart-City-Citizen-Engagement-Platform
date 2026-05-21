import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Search, Layers, MapPin, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockReports, categoryColors, priorityColors, statusColors, ReportStatus } from "@/data/mockReports";
import { cn } from "@/lib/utils";

const categories = ["All", "pothole", "streetlight", "garbage", "water", "graffiti", "traffic", "parks", "noise"];
const priorityList = ["All", "low", "medium", "high", "critical"];

const cityBlocks = [
  { x: 10, y: 10, w: 18, h: 12, label: "Downtown" },
  { x: 32, y: 10, w: 14, h: 12, label: "Midtown" },
  { x: 50, y: 10, w: 18, h: 12, label: "Northgate" },
  { x: 10, y: 30, w: 14, h: 14, label: "Westside" },
  { x: 28, y: 28, w: 20, h: 16, label: "Harbor" },
  { x: 52, y: 28, w: 16, h: 16, label: "Eastpark" },
  { x: 10, y: 52, w: 18, h: 14, label: "Riverside" },
  { x: 32, y: 52, w: 14, h: 14, label: "Industrial" },
  { x: 50, y: 52, w: 18, h: 14, label: "Southbay" },
];

const markerPositions: Record<string, { x: number; y: number }> = {
  R001: { x: 18, y: 16 }, R002: { x: 14, y: 37 }, R003: { x: 36, y: 16 },
  R004: { x: 54, y: 34 }, R005: { x: 59, y: 34 }, R006: { x: 20, y: 16 },
  R007: { x: 13, y: 57 }, R008: { x: 36, y: 57 }, R009: { x: 55, y: 16 },
  R010: { x: 30, y: 35 }, R011: { x: 15, y: 35 }, R012: { x: 36, y: 15 },
  R013: { x: 60, y: 35 }, R014: { x: 14, y: 55 }, R015: { x: 32, y: 35 },
};

export default function Map() {
  const [catFilter, setCatFilter] = useState("All");
  const [prioFilter, setPrioFilter] = useState("All");
  const [heatmap, setHeatmap] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = mockReports.filter((r) => {
    if (catFilter !== "All" && r.category !== catFilter) return false;
    if (prioFilter !== "All" && r.priority !== prioFilter) return false;
    if (searchTerm && !r.title.toLowerCase().includes(searchTerm.toLowerCase()) && !r.location.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const selectedReport = selected ? mockReports.find((r) => r.id === selected) : null;

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-72px)]">
        {/* Sidebar */}
        <div className="w-80 border-r border-border flex flex-col bg-card overflow-hidden flex-shrink-0">
          <div className="p-4 border-b border-border space-y-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search issues..."
                className="pl-9 h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="input-map-search"
              />
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1.5 font-medium">Category</p>
              <div className="flex flex-wrap gap-1">
                {categories.slice(0, 5).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCatFilter(c)}
                    className={cn("text-xs px-2 py-1 rounded-lg transition-colors capitalize", catFilter === c ? "bg-primary text-white" : "bg-accent text-muted-foreground hover:text-foreground")}
                    data-testid={`filter-category-${c}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1.5 font-medium">Priority</p>
              <div className="flex flex-wrap gap-1">
                {priorityList.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPrioFilter(p)}
                    className={cn("text-xs px-2 py-1 rounded-lg capitalize transition-colors", prioFilter === p ? "bg-primary text-white" : "bg-accent text-muted-foreground hover:text-foreground")}
                    data-testid={`filter-priority-${p}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{filtered.length}</span> issues shown
              </p>
              <button
                onClick={() => setHeatmap(!heatmap)}
                className={cn("flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg transition-colors", heatmap ? "bg-primary/10 text-primary" : "bg-accent text-muted-foreground")}
                data-testid="button-toggle-heatmap"
              >
                <Layers size={12} /> Heatmap
              </button>
            </div>
          </div>

          {/* Report list */}
          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {filtered.map((r) => (
              <motion.button
                key={r.id}
                whileHover={{ x: 2 }}
                onClick={() => setSelected(r.id === selected ? null : r.id)}
                className={cn("w-full text-left p-4 hover:bg-accent/50 transition-colors", selected === r.id && "bg-primary/5")}
                data-testid={`map-list-item-${r.id}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: priorityColors[r.priority] }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{r.title}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{r.location}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Badge
                        className="text-[10px] capitalize"
                        style={{ background: statusColors[r.status] + "22", color: statusColors[r.status] }}
                      >
                        {r.status.replace("_", " ")}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">{r.date}</span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative bg-muted/20 overflow-hidden">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 80 80"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0"
          >
            {/* Grid lines */}
            {[...Array(9)].map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 10} x2="80" y2={i * 10} stroke="hsl(var(--border))" strokeWidth="0.15" />
            ))}
            {[...Array(9)].map((_, i) => (
              <line key={`v${i}`} x1={i * 10} y1="0" x2={i * 10} y2="80" stroke="hsl(var(--border))" strokeWidth="0.15" />
            ))}

            {/* City blocks */}
            {cityBlocks.map((b) => (
              <g key={b.label}>
                <rect
                  x={b.x} y={b.y} width={b.w} height={b.h} rx="1"
                  fill="hsl(var(--muted)/0.4)"
                  stroke="hsl(var(--border))"
                  strokeWidth="0.3"
                />
                <text
                  x={b.x + b.w / 2} y={b.y + b.h / 2}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="1.6" fill="hsl(var(--muted-foreground))"
                  fontFamily="system-ui" fontWeight="500"
                >
                  {b.label}
                </text>
              </g>
            ))}

            {/* Main roads */}
            <line x1="0" y1="27" x2="80" y2="27" stroke="hsl(var(--background))" strokeWidth="1.5" />
            <line x1="0" y1="50" x2="80" y2="50" stroke="hsl(var(--background))" strokeWidth="1.5" />
            <line x1="27" y1="0" x2="27" y2="80" stroke="hsl(var(--background))" strokeWidth="1.5" />
            <line x1="50" y1="0" x2="50" y2="80" stroke="hsl(var(--background))" strokeWidth="1.5" />

            {/* Heatmap overlay */}
            {heatmap && (
              <>
                <ellipse cx="18" cy="16" rx="8" ry="6" fill="rgba(239,68,68,0.15)" />
                <ellipse cx="36" cy="35" rx="10" ry="7" fill="rgba(239,68,68,0.10)" />
                <ellipse cx="55" cy="16" rx="6" ry="5" fill="rgba(245,158,11,0.12)" />
                <ellipse cx="14" cy="55" rx="7" ry="5" fill="rgba(245,158,11,0.10)" />
              </>
            )}

            {/* Markers */}
            {filtered.map((r) => {
              const pos = markerPositions[r.id];
              if (!pos) return null;
              const isSelected = selected === r.id;
              const color = categoryColors[r.category];
              return (
                <g
                  key={r.id}
                  onClick={() => setSelected(r.id === selected ? null : r.id)}
                  style={{ cursor: "pointer" }}
                >
                  {r.status === "open" && (
                    <circle cx={pos.x} cy={pos.y} r="2.5" fill={color} opacity="0.25">
                      <animate attributeName="r" from="2" to="4" dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.25" to="0" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle
                    cx={pos.x} cy={pos.y}
                    r={isSelected ? "1.8" : "1.4"}
                    fill={color}
                    stroke="white"
                    strokeWidth="0.4"
                  />
                </g>
              );
            })}
          </svg>

          {/* Selected report popup */}
          <AnimatePresence>
            {selectedReport && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-6 left-6 w-80 bg-card border border-border rounded-2xl shadow-xl overflow-hidden"
                data-testid="map-popup"
              >
                <img src={selectedReport.imageUrl} alt="" className="w-full h-32 object-cover" />
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge
                      className="text-xs capitalize"
                      style={{ background: categoryColors[selectedReport.category] + "22", color: categoryColors[selectedReport.category] }}
                    >
                      {selectedReport.category}
                    </Badge>
                    <button
                      onClick={() => setSelected(null)}
                      className="text-muted-foreground hover:text-foreground"
                      data-testid="button-close-popup"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <h3 className="font-semibold text-sm text-foreground mb-1 leading-tight">{selectedReport.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                    <MapPin size={10} />
                    {selectedReport.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge
                      style={{ background: statusColors[selectedReport.status] + "22", color: statusColors[selectedReport.status] }}
                      className="text-xs capitalize"
                    >
                      {selectedReport.status.replace("_", " ")}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{selectedReport.upvotes} upvotes</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Legend */}
          <div className="absolute top-4 right-4 bg-card border border-border rounded-xl p-3 shadow-lg">
            <p className="text-xs font-semibold text-foreground mb-2">Status</p>
            {(["open", "in_progress", "resolved"] as ReportStatus[]).map((s) => (
              <div key={s} className="flex items-center gap-1.5 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ background: statusColors[s] }} />
                <span className="text-[10px] text-muted-foreground capitalize">{s.replace("_", " ")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
