import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  Upload, X, MapPin, AlertTriangle, CheckCircle, Sparkles, Image,
  FileText, ChevronDown, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const categories = [
  { value: "pothole", label: "Pothole / Road Damage", icon: "🛣️" },
  { value: "streetlight", label: "Street Light Issue", icon: "💡" },
  { value: "garbage", label: "Garbage / Waste", icon: "🗑️" },
  { value: "water", label: "Water / Sewer", icon: "💧" },
  { value: "graffiti", label: "Graffiti / Vandalism", icon: "🎨" },
  { value: "traffic", label: "Traffic Signal", icon: "🚦" },
  { value: "parks", label: "Parks & Recreation", icon: "🌳" },
  { value: "noise", label: "Noise Complaint", icon: "🔊" },
  { value: "other", label: "Other", icon: "📋" },
];

const priorities = [
  { value: "low", label: "Low", desc: "Minor issue, no urgency", color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/30" },
  { value: "medium", label: "Medium", desc: "Moderate inconvenience", color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/30" },
  { value: "high", label: "High", desc: "Significant problem", color: "text-orange-500", bg: "bg-orange-500/10 border-orange-500/30" },
  { value: "critical", label: "Critical", desc: "Immediate safety hazard", color: "text-red-500", bg: "bg-red-500/10 border-red-500/30" },
];

const districts = ["Downtown", "Westside", "Midtown", "Northgate", "Eastpark", "Harbor", "Riverside", "Industrial"];

export default function Report() {
  const [dragActive, setDragActive] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [aiCategory, setAiCategory] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
    if (files.length) {
      const seeds = ["img1", "img2", "img3"];
      const newImgs = files.slice(0, 3 - images.length).map((_, i) =>
        `https://picsum.photos/seed/${seeds[images.length + i]}/400/300`
      );
      setImages((prev) => [...prev, ...newImgs].slice(0, 3));
      triggerAiSuggestion();
    }
  }, [images]);

  const triggerAiSuggestion = async () => {
    setAiLoading(true);
    setAiCategory(null);
    await new Promise((r) => setTimeout(r, 1800));
    const suggestions = ["pothole", "garbage", "streetlight", "water"];
    setAiCategory(suggestions[Math.floor(Math.random() * suggestions.length)]);
    setAiLoading(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      const newImgs = files.slice(0, 3 - images.length).map((_, i) =>
        `https://picsum.photos/seed/uploaded${i + 1}/400/300`
      );
      setImages((prev) => [...prev, ...newImgs].slice(0, 3));
      triggerAiSuggestion();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !selectedCategory || !selectedPriority || !selectedDistrict) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setSubmitting(false);
    setSubmitted(true);
    toast({ title: "Report submitted!", description: "Your report #R016 has been filed. You'll get updates via email." });
  };

  if (submitted) {
    return (
      <AppLayout>
        <div className="p-6 flex items-center justify-center min-h-[calc(100vh-72px)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} className="text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Report Filed Successfully</h2>
            <p className="text-muted-foreground mb-2">Report ID: <span className="font-mono font-bold text-primary">#R016</span></p>
            <p className="text-muted-foreground text-sm mb-8">Your report has been assigned to the appropriate department. You'll receive status updates by email.</p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => setSubmitted(false)} data-testid="button-report-another">Report another</Button>
              <Button variant="outline" data-testid="button-view-dashboard">View dashboard</Button>
            </div>
          </motion.div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-1">Report a City Issue</h2>
          <p className="text-sm text-muted-foreground">Your report goes directly to the relevant city department. Average response time: 3 days.</p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image upload */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Image size={16} className="text-primary" /> Photos
                    <Badge variant="outline" className="text-xs ml-auto">Optional</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    onDragEnter={() => setDragActive(true)}
                    onDragLeave={() => setDragActive(false)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className={cn(
                      "border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer",
                      dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-accent/30"
                    )}
                    data-testid="dropzone-images"
                    onClick={() => document.getElementById("file-input")?.click()}
                  >
                    <Upload size={24} className={cn("mx-auto mb-3", dragActive ? "text-primary" : "text-muted-foreground")} />
                    <p className="text-sm font-medium text-foreground mb-1">
                      {dragActive ? "Drop images here" : "Drag & drop images"}
                    </p>
                    <p className="text-xs text-muted-foreground">or click to browse (up to 3 images)</p>
                    <input id="file-input" type="file" multiple accept="image/*" className="hidden" onChange={handleFileInput} />
                  </div>

                  {images.length > 0 && (
                    <div className="flex gap-3 mt-4">
                      {images.map((img, i) => (
                        <div key={i} className="relative rounded-xl overflow-hidden w-24 h-24 flex-shrink-0 group">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setImages((prev) => prev.filter((_, j) => j !== i))}
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                            data-testid={`button-remove-image-${i}`}
                          >
                            <X size={16} className="text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* AI suggestion */}
                  <AnimatePresence>
                    {(aiLoading || aiCategory) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 p-3 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-3"
                      >
                        {aiLoading ? (
                          <>
                            <Loader2 size={16} className="text-primary animate-spin" />
                            <span className="text-sm text-primary">AI analyzing image...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles size={16} className="text-primary" />
                            <div className="flex-1">
                              <span className="text-sm text-primary font-medium">AI suggests: </span>
                              <Badge className="bg-primary/10 text-primary text-xs capitalize ml-1">
                                {aiCategory?.replace("_", " ")}
                              </Badge>
                            </div>
                            <button
                              type="button"
                              onClick={() => setSelectedCategory(aiCategory || "")}
                              className="text-xs text-primary hover:underline font-medium"
                              data-testid="button-accept-ai-category"
                            >
                              Accept
                            </button>
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>

              {/* Details */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText size={16} className="text-primary" /> Issue Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-sm mb-1.5 block">Title <span className="text-red-500">*</span></Label>
                    <Input
                      id="title"
                      placeholder="Brief description of the issue"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      data-testid="input-report-title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-sm mb-1.5 block">Detailed Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the issue in detail — size, severity, duration, any safety concerns..."
                      rows={5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="resize-none"
                      data-testid="input-report-description"
                    />
                    <p className="text-xs text-muted-foreground mt-1">{description.length} / 1000 characters</p>
                  </div>

                  <div>
                    <Label className="text-sm mb-1.5 block">Category <span className="text-red-500">*</span></Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger data-testid="select-category">
                        <SelectValue placeholder="Select a category..." />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c.value} value={c.value} data-testid={`category-option-${c.value}`}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <MapPin size={16} className="text-primary" /> Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm mb-1.5 block">District <span className="text-red-500">*</span></Label>
                    <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                      <SelectTrigger data-testid="select-district">
                        <SelectValue placeholder="Select district..." />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((d) => (
                          <SelectItem key={d} value={d} data-testid={`district-option-${d}`}>{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-sm mb-1.5 block">Street Address</Label>
                    <div className="relative">
                      <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="address"
                        placeholder="e.g. 123 Main Street near Oak Ave"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="pl-9"
                        data-testid="input-address"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Priority */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle size={16} className="text-primary" /> Priority <span className="text-red-500">*</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {priorities.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setSelectedPriority(p.value)}
                      className={cn(
                        "w-full p-3 rounded-xl border text-left transition-all",
                        selectedPriority === p.value ? p.bg : "border-border hover:bg-accent/50"
                      )}
                      data-testid={`priority-option-${p.value}`}
                    >
                      <div className={cn("text-sm font-semibold", selectedPriority === p.value ? p.color : "text-foreground")}>{p.label}</div>
                      <div className="text-xs text-muted-foreground">{p.desc}</div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* Summary */}
              <Card className="border-primary/20 bg-primary/3">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Report Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium capitalize">{selectedCategory || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Priority</span>
                    <span className="font-medium capitalize">{selectedPriority || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">District</span>
                    <span className="font-medium">{selectedDistrict || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Photos</span>
                    <span className="font-medium">{images.length} attached</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Points earned</span>
                    <span className="font-medium text-amber-500">+50 pts</span>
                  </div>
                </CardContent>
              </Card>

              <Button
                type="submit"
                className="w-full h-12 shadow-lg shadow-primary/30 text-base"
                disabled={submitting}
                data-testid="button-submit-report"
              >
                {submitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Submitting report...
                  </div>
                ) : "Submit Report"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">Your report is anonymous to other citizens. City departments see your contact info.</p>
            </div>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
