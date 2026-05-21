import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { ThumbsUp, MessageCircle, TrendingUp, Plus, X, Send, Hash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { mockForumPosts, forumCategories, trendingTopics } from "@/data/mockForum";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function Forum() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [posts, setPosts] = useState(mockForumPosts);
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const { toast } = useToast();

  const filtered = activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);

  const handleUpvote = (id: string) => {
    setPosts((prev) => prev.map((p) =>
      p.id === id ? { ...p, isUpvoted: !p.isUpvoted, upvotes: p.isUpvoted ? p.upvotes - 1 : p.upvotes + 1 } : p
    ));
  };

  const handleVote = (postId: string, optionIndex: number) => {
    setPosts((prev) => prev.map((p) => {
      if (p.id !== postId || !p.poll) return p;
      if (p.poll.userVoted !== undefined) return p;
      const newOptions = p.poll.options.map((o, i) =>
        i === optionIndex ? { ...o, votes: o.votes + 1 } : o
      );
      return { ...p, poll: { ...p.poll, options: newOptions, totalVotes: p.poll.totalVotes + 1, userVoted: optionIndex } };
    }));
  };

  const handleNewPost = () => {
    if (!newPostTitle.trim()) return;
    const newPost = {
      id: `F${Date.now()}`,
      title: newPostTitle,
      content: newPostContent,
      author: "Alex Chen",
      authorAvatar: "https://picsum.photos/seed/uc/100/100",
      date: new Date().toISOString().split("T")[0],
      category: "General",
      tags: [],
      upvotes: 0,
      comments: 0,
      isUpvoted: false,
      isTrending: false,
    };
    setPosts((prev) => [newPost, ...prev]);
    setNewPostOpen(false);
    setNewPostTitle("");
    setNewPostContent("");
    toast({ title: "Post published!", description: "Your discussion has been posted to the community." });
  };

  return (
    <AppLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">Community Forum</h2>
            <p className="text-sm text-muted-foreground">Discuss, vote, and organize around issues that matter</p>
          </div>
          <Button onClick={() => setNewPostOpen(true)} className="gap-2 shadow-lg shadow-primary/20" data-testid="button-new-post">
            <Plus size={14} /> New Discussion
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Posts */}
          <div className="lg:col-span-3 space-y-4">
            {/* Category tabs */}
            <div className="flex gap-2 flex-wrap">
              {forumCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn("px-3 py-1.5 rounded-xl text-sm font-medium transition-colors", activeCategory === cat ? "bg-primary text-white" : "bg-accent text-muted-foreground hover:text-foreground")}
                  data-testid={`forum-cat-${cat}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Posts list */}
            <AnimatePresence>
              {filtered.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Card className="hover:border-primary/30 transition-colors" data-testid={`forum-post-${post.id}`}>
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <img src={post.authorAvatar} alt={post.author} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            <span className="text-sm font-semibold text-foreground">{post.author}</span>
                            <Badge variant="outline" className="text-xs">{post.category}</Badge>
                            {post.isTrending && <Badge className="bg-red-500/10 text-red-500 text-xs">Trending</Badge>}
                            <span className="text-xs text-muted-foreground ml-auto">{post.date}</span>
                          </div>
                          <h3 className="text-base font-bold text-foreground mb-2 leading-tight">{post.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.content}</p>
                        </div>
                      </div>

                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="flex gap-1.5 flex-wrap mb-3">
                          {post.tags.slice(0, 4).map((tag) => (
                            <span key={tag} className="text-xs text-primary bg-primary/5 px-2 py-0.5 rounded-full">#{tag}</span>
                          ))}
                        </div>
                      )}

                      {/* Poll */}
                      {post.poll && (
                        <div className="mb-4 p-4 rounded-xl bg-accent/30 border border-border">
                          <p className="text-sm font-semibold text-foreground mb-3">{post.poll.question}</p>
                          <div className="space-y-2">
                            {post.poll.options.map((opt, optIdx) => {
                              const pct = Math.round((opt.votes / post.poll!.totalVotes) * 100);
                              const isVoted = post.poll!.userVoted === optIdx;
                              const hasVoted = post.poll!.userVoted !== undefined;
                              return (
                                <div key={optIdx} className="relative">
                                  <button
                                    onClick={() => handleVote(post.id, optIdx)}
                                    disabled={hasVoted}
                                    className={cn(
                                      "w-full text-left p-3 rounded-xl border transition-all relative overflow-hidden",
                                      isVoted ? "border-primary bg-primary/5" : hasVoted ? "border-border bg-card" : "border-border bg-card hover:border-primary/40 hover:bg-accent/50"
                                    )}
                                    data-testid={`poll-option-${post.id}-${optIdx}`}
                                  >
                                    {hasVoted && (
                                      <div
                                        className="absolute inset-y-0 left-0 rounded-xl transition-all"
                                        style={{ width: `${pct}%`, background: isVoted ? "hsl(var(--primary)/0.12)" : "hsl(var(--muted)/0.5)" }}
                                      />
                                    )}
                                    <div className="relative flex items-center justify-between">
                                      <span className={cn("text-sm", isVoted ? "font-semibold text-primary" : "text-foreground")}>{opt.label}</span>
                                      {hasVoted && <span className="text-xs font-bold text-muted-foreground">{pct}%</span>}
                                    </div>
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">{post.poll.totalVotes.toLocaleString()} votes</p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-4 pt-1">
                        <button
                          onClick={() => handleUpvote(post.id)}
                          className={cn("flex items-center gap-1.5 text-sm transition-colors", post.isUpvoted ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground")}
                          data-testid={`button-upvote-${post.id}`}
                        >
                          <ThumbsUp size={14} className={post.isUpvoted ? "fill-current" : ""} />
                          {post.upvotes}
                        </button>
                        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid={`button-comment-${post.id}`}>
                          <MessageCircle size={14} />
                          {post.comments}
                        </button>
                        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto" data-testid={`button-share-${post.id}`}>
                          Share
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp size={14} className="text-primary" /> Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {trendingTopics.map((t, i) => (
                  <button
                    key={t.tag}
                    className="w-full flex items-center justify-between hover:bg-accent/50 p-2 rounded-lg transition-colors text-left"
                    data-testid={`trending-topic-${i}`}
                  >
                    <div className="flex items-center gap-2">
                      <Hash size={12} className="text-primary" />
                      <span className="text-sm text-foreground font-medium">{t.tag.replace("#", "")}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{t.count}</span>
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Plus size={18} className="text-primary" />
                </div>
                <p className="text-sm font-semibold text-foreground mb-1">Share your thoughts</p>
                <p className="text-xs text-muted-foreground mb-3">Start a discussion or create a poll</p>
                <Button className="w-full" size="sm" onClick={() => setNewPostOpen(true)} data-testid="button-new-post-sidebar">
                  New Post
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* New post dialog */}
      <Dialog open={newPostOpen} onOpenChange={setNewPostOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>New Discussion</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Discussion title..."
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                className="text-base font-semibold"
                data-testid="input-post-title"
              />
            </div>
            <div>
              <Textarea
                placeholder="What's on your mind? Share details, ask questions, or propose ideas..."
                rows={5}
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="resize-none"
                data-testid="input-post-content"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setNewPostOpen(false)} data-testid="button-cancel-post">Cancel</Button>
              <Button onClick={handleNewPost} className="gap-2" data-testid="button-submit-post">
                <Send size={14} /> Publish
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
