import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, User, Clock, ArrowRight, X, Heart, Sparkles, BookMarked } from "lucide-react";
import { Article } from "../types";

export default function ArticlesViewer() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedLikes = localStorage.getItem("eco-liked-articles");
    if (savedLikes) setLikedIds(JSON.parse(savedLikes));

    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/articles");
      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      }
    } catch (e) {
      console.error("Failed to load eco articles:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated;
    if (likedIds.includes(id)) {
      updated = likedIds.filter((lid) => lid !== id);
    } else {
      updated = [...likedIds, id];
    }
    setLikedIds(updated);
    localStorage.setItem("eco-liked-articles", JSON.stringify(updated));
  };

  return (
    <div id="articles-tab" className="space-y-8">
      {/* Intro descriptive text */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-2xl shadow-sm">
        <h3 className="font-display text-lg font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-500" />
          E-Waste Education & Scientific Insights
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1.5 leading-relaxed">
          Deepen your ecological comprehension. Read authoritative briefings regarding circular urban mining, hazardous compound extraction, and the socio-economic scope of electronic circularity policies.
        </p>
      </div>

      {/* Articles Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl overflow-hidden animate-pulse h-96 space-y-4">
              <div className="h-48 bg-zinc-200 dark:bg-zinc-800 w-full" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-zinc-100 dark:bg-zinc-950 w-2/3 rounded" />
                <div className="h-12 bg-zinc-100 dark:bg-zinc-950 w-full rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-lg hover:border-emerald-200 dark:hover:border-emerald-900/40 transition-all flex flex-col justify-between cursor-pointer group h-full"
            >
              {/* Cover Photo */}
              <div className="h-48 overflow-hidden relative bg-zinc-100 dark:bg-zinc-950">
                {art.imageUrl ? (
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500">
                    <BookMarked className="w-12 h-12 stroke-1" />
                  </div>
                )}
                {/* Category tag overlay */}
                <div className="absolute bottom-3 left-3">
                  <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md">
                    {art.category}
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-3.5">
                  <div className="flex items-center gap-4 text-[10px] text-zinc-400 font-mono">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {art.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {art.readTime}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-zinc-800 dark:text-zinc-100 text-sm md:text-base leading-snug group-hover:text-emerald-600 transition-colors">
                    {art.title}
                  </h4>

                  <p className="text-zinc-500 dark:text-zinc-400 text-xs line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="mt-5 border-t border-zinc-50 dark:border-zinc-800/60 pt-3.5 flex justify-between items-center text-xs">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>

                  <button
                    onClick={(e) => toggleLike(art.id, e)}
                    className="text-zinc-400 hover:text-red-500 p-1 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-950/40 cursor-pointer"
                    aria-label="Like article"
                  >
                    <Heart className={`w-4 h-4 transition-transform ${likedIds.includes(art.id) ? "fill-red-500 text-red-500 scale-110" : ""}`} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Slide-over Full formatted Reader modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-black"
            />

            {/* Container body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white dark:bg-zinc-900 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative z-10 max-h-[85vh] flex flex-col border border-zinc-100 dark:border-zinc-800"
            >
              {/* Header Image Cover */}
              <div className="h-56 relative shrink-0 bg-zinc-100 dark:bg-zinc-950">
                {selectedArticle.imageUrl && (
                  <img
                    src={selectedArticle.imageUrl}
                    alt={selectedArticle.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                )}
                {/* Visual gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white hover:bg-black p-2 rounded-full cursor-pointer transition-colors"
                  aria-label="Close reader"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 inset-x-6 text-white">
                  <span className="bg-emerald-500 text-white text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md">
                    {selectedArticle.category}
                  </span>
                  <h3 className="font-display text-lg md:text-2xl font-bold mt-2 leading-tight">
                    {selectedArticle.title}
                  </h3>
                </div>
              </div>

              {/* Body Scrolled area */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-4 text-xs text-zinc-400 font-mono border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-emerald-500" />
                    By: {selectedArticle.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    Read time: {selectedArticle.readTime}
                  </span>
                </div>

                <div className="text-zinc-600 dark:text-zinc-300 text-xs md:text-sm leading-relaxed space-y-4 whitespace-pre-wrap">
                  {selectedArticle.content}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/45 text-right flex justify-between items-center shrink-0">
                <span className="text-[10px] text-zinc-400 italic">
                  Thanks for building your e-waste awareness! 🌿
                </span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs px-5 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Finished Reading
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
