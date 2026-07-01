import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Leaf, Recycle, Lightbulb, CheckSquare, Bookmark, BookmarkCheck, Heart } from "lucide-react";
import { EcoTip } from "../types";

export default function TipsManager() {
  const [allTips, setAllTips] = useState<EcoTip[]>([]);
  const [dailyTip, setDailyTip] = useState<EcoTip | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load local bookmarks and completes
    const savedBookmarks = localStorage.getItem("eco-bookmarked-tips");
    if (savedBookmarks) setBookmarkedIds(JSON.parse(savedBookmarks));

    const savedCompletes = localStorage.getItem("eco-completed-tips");
    if (savedCompletes) setCompletedIds(JSON.parse(savedCompletes));

    fetchTipsData();
  }, []);

  const fetchTipsData = async () => {
    setIsLoading(true);
    try {
      const [allRes, dailyRes] = await Promise.all([
        fetch("/api/tips"),
        fetch("/api/tips/daily")
      ]);

      if (allRes.ok) {
        const allData = await allRes.json();
        setAllTips(allData);
      }
      if (dailyRes.ok) {
        const dailyData = await dailyRes.json();
        setDailyTip(dailyData);
      }
    } catch (e) {
      console.error("Failed to load eco tips from API:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleBookmark = (id: string) => {
    let updated;
    if (bookmarkedIds.includes(id)) {
      updated = bookmarkedIds.filter((bid) => bid !== id);
    } else {
      updated = [...bookmarkedIds, id];
    }
    setBookmarkedIds(updated);
    localStorage.setItem("eco-bookmarked-tips", JSON.stringify(updated));
  };

  const toggleComplete = (id: string) => {
    let updated;
    if (completedIds.includes(id)) {
      updated = completedIds.filter((cid) => cid !== id);
    } else {
      updated = [...completedIds, id];
    }
    setCompletedIds(updated);
    localStorage.setItem("eco-completed-tips", JSON.stringify(updated));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "reduction":
        return <Leaf className="w-4 h-4 text-emerald-500" />;
      case "reuse":
        return <Lightbulb className="w-4 h-4 text-amber-500" />;
      case "recycling":
        return <Recycle className="w-4 h-4 text-blue-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-teal-500" />;
    }
  };

  const filteredTips = selectedCategory === "all"
    ? allTips
    : allTips.filter((t) => t.category === selectedCategory);

  return (
    <div id="tips-tab" className="space-y-8">
      {/* Daily Tip Highlight Card */}
      {dailyTip && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-zinc-950 dark:to-zinc-900 border border-emerald-100 dark:border-emerald-950 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 p-4 shrink-0">
            <span className="bg-emerald-500 text-white font-mono text-[10px] uppercase font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              Daily Eco Tip
            </span>
          </div>

          <div className="max-w-xl pr-12">
            <h3 className="font-display text-xl font-bold text-emerald-800 dark:text-emerald-400">
              {dailyTip.title}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300 text-xs md:text-sm mt-3 leading-relaxed">
              {dailyTip.content}
            </p>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => toggleBookmark(dailyTip.id)}
                className={`text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
                  bookmarkedIds.includes(dailyTip.id)
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-emerald-500"
                }`}
              >
                {bookmarkedIds.includes(dailyTip.id) ? (
                  <BookmarkCheck className="w-4 h-4" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
                {bookmarkedIds.includes(dailyTip.id) ? "Saved" : "Save Tip"}
              </button>
              <button
                onClick={() => toggleComplete(dailyTip.id)}
                className={`text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
                  completedIds.includes(dailyTip.id)
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50"
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-emerald-500"
                }`}
              >
                <CheckSquare className="w-4 h-4" />
                {completedIds.includes(dailyTip.id) ? "Actioned! 👍" : "Mark as Applied"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Library Filter Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
        <div>
          <h4 className="font-display text-lg font-bold text-zinc-800 dark:text-zinc-100">
            E-Waste Habit Library
          </h4>
          <p className="text-zinc-400 text-xs mt-0.5">Explore our guidelines split by electronic circular goals.</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {["all", "reduction", "reuse", "recycling", "awareness"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-xl border capitalize transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-emerald-600 border-emerald-600 text-white font-medium"
                  : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-emerald-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tips Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-5 rounded-2xl animate-pulse space-y-3">
              <div className="w-1/3 h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="w-full h-12 bg-zinc-100 dark:bg-zinc-950 rounded" />
              <div className="w-24 h-6 bg-zinc-100 dark:bg-zinc-950 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip) => (
            <div
              key={tip.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-5 rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-300 text-[10px] px-2.5 py-1 rounded-full uppercase font-mono tracking-wider flex items-center gap-1">
                    {getCategoryIcon(tip.category)}
                    {tip.category}
                  </span>

                  <button
                    onClick={() => toggleBookmark(tip.id)}
                    className="text-zinc-400 hover:text-emerald-500 transition-colors p-1 rounded hover:bg-zinc-50 dark:hover:bg-zinc-950 cursor-pointer"
                    title="Bookmark tip"
                  >
                    {bookmarkedIds.includes(tip.id) ? (
                      <BookmarkCheck className="w-4.5 h-4.5 text-emerald-500" />
                    ) : (
                      <Bookmark className="w-4.5 h-4.5" />
                    )}
                  </button>
                </div>

                <h5 className="font-display font-bold text-zinc-800 dark:text-zinc-100 text-sm leading-snug">
                  {tip.title}
                </h5>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">
                  {tip.content}
                </p>
              </div>

              <div className="mt-4 border-t border-zinc-50 dark:border-zinc-800/60 pt-3 flex justify-between items-center">
                <button
                  onClick={() => toggleComplete(tip.id)}
                  className={`text-[11px] font-medium flex items-center gap-1 transition-all cursor-pointer ${
                    completedIds.includes(tip.id)
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  {completedIds.includes(tip.id) ? "Applied! Clean Tech." : "Implement Habit"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
