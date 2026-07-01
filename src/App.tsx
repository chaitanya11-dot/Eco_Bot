import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Bot,
  Camera,
  MapPin,
  Trophy,
  Sparkles,
  BarChart3,
  Lightbulb,
  BookOpen,
  HelpCircle,
  Info,
  Menu,
  X,
  Lock,
  Globe,
  Award
} from "lucide-react";

import Dashboard from "./components/Dashboard";
import Chatbot from "./components/Chatbot";
import TipsManager from "./components/TipsManager";
import ArticlesViewer from "./components/ArticlesViewer";
import QuizModule from "./components/QuizModule";
import ContactForm from "./components/ContactForm";
import AboutUs from "./components/AboutUs";
import AdminPanel from "./components/AdminPanel";
import Logo from "./components/Logo";

type ActiveTab =
  | "home"
  | "chatbot"
  | "dashboard"
  | "tips"
  | "articles"
  | "quiz"
  | "contact"
  | "about"
  | "admin";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize theme mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("eco-theme");
    const root = window.document.documentElement;
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0C0A09] text-zinc-800 dark:text-zinc-200 flex flex-col font-sans transition-colors duration-300">
      
      {/* Header element */}
      <header className="sticky top-0 z-40 bg-[#FAFAF9]/85 dark:bg-[#0C0A09]/85 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/60 py-3.5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo brand */}
          <div
            onClick={() => handleTabChange("home")}
            className="flex items-center gap-2 cursor-pointer select-none group"
            id="app-brand"
          >
            <Logo className="w-9 h-9 select-none group-hover:rotate-6 transition-transform duration-300 shrink-0" />
            <div>
              <h1 className="font-display font-bold text-base md:text-lg tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
                EcoBot <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono px-1.5 py-0.5 rounded uppercase">Beta</span>
              </h1>
              <p className="text-[10px] text-zinc-400 hidden sm:block">Sustainable E-Waste Assistant</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-medium">
            <button
              onClick={() => handleTabChange("home")}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === "home" ? "bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 font-semibold" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleTabChange("chatbot")}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === "chatbot" ? "bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 font-semibold" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
            >
              AI Chatbot
            </button>
            <button
              onClick={() => handleTabChange("dashboard")}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === "dashboard" ? "bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 font-semibold" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
            >
              Awareness Dashboard
            </button>
            <button
              onClick={() => handleTabChange("tips")}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === "tips" ? "bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 font-semibold" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
            >
              Daily Tips
            </button>
            <button
              onClick={() => handleTabChange("articles")}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === "articles" ? "bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 font-semibold" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
            >
              Articles
            </button>
            <button
              onClick={() => handleTabChange("quiz")}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === "quiz" ? "bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 font-semibold" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
            >
              Challenge Quiz
            </button>
            <button
              onClick={() => handleTabChange("contact")}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === "contact" ? "bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 font-semibold" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
            >
              FAQ / Help
            </button>
          </nav>

          {/* Theme Switch & Hamburger Menu Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer text-zinc-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden border-b border-zinc-200/50 dark:border-zinc-800/80 bg-[#FAFAF9] dark:bg-[#0C0A09] absolute top-16 inset-x-0 p-5 space-y-2 z-30 shadow-xl flex flex-col"
          >
            {[
              { id: "home", label: "Home" },
              { id: "chatbot", label: "AI Chatbot" },
              { id: "dashboard", label: "Awareness Dashboard" },
              { id: "tips", label: "Daily Tips" },
              { id: "articles", label: "Educational Articles" },
              { id: "quiz", label: "Challenge Quiz" },
              { id: "contact", label: "Contact / FAQ" },
              { id: "about", label: "About Project" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleTabChange(link.id as ActiveTab)}
                className={`text-left text-xs p-3 rounded-xl transition-all cursor-pointer font-medium ${
                  activeTab === link.id
                    ? "bg-emerald-600 text-white"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                }`}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="h-full"
          >
            {/* Landing page state */}
            {activeTab === "home" && (
              <div id="landing-hero" className="space-y-12">
                
                {/* Editorial Visual Hero */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 md:pt-8">
                  <div className="lg:col-span-7 space-y-6">
                    <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] uppercase font-bold px-3 py-1 rounded-full border border-emerald-500/10">
                      <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
                      Awareness, Security, Circular Economy
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight leading-[1.08]">
                      Tackling the <span className="text-emerald-600 dark:text-emerald-400">E-Waste Crisis</span> with Intelligence.
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed">
                      E-waste is growing three times faster than other household trash. Meet <strong>EcoBot</strong>: your zero-setup circular e-waste assistant. Ask our intelligent chatbot about recycling, test your eco knowledge, and track your ecological impact.
                    </p>
                    
                    {/* Hero CTA buttons */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        onClick={() => handleTabChange("chatbot")}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-6 py-3 rounded-xl shadow shadow-emerald-600/10 cursor-pointer transition-all"
                      >
                        Launch EcoBot Chat
                      </button>
                      <button
                        onClick={() => handleTabChange("dashboard")}
                        className="bg-white dark:bg-zinc-900 border border-zinc-200 hover:border-emerald-500 dark:border-zinc-800 hover:bg-zinc-50 text-zinc-700 dark:text-zinc-300 font-semibold text-xs px-6 py-3 rounded-xl cursor-pointer transition-all"
                      >
                        View Impact Dashboard
                      </button>
                    </div>
                  </div>

                  {/* Quick stats panel */}
                  <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-3xl shadow-sm space-y-6">
                    <h3 className="font-display font-bold text-sm uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                      <Award className="w-4.5 h-4.5 text-emerald-500" />
                      Eco Milestones (2026 Target)
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
                        <div>
                          <div className="text-xl font-bold font-display text-zinc-800 dark:text-zinc-100">62.0 Million</div>
                          <div className="text-[10px] text-zinc-400">Metric tons generated annually</div>
                        </div>
                        <span className="text-xs text-red-500 bg-red-500/10 font-bold px-2 py-0.5 rounded uppercase">+3.5% Yr</span>
                      </div>

                      <div className="flex justify-between items-center pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
                        <div>
                          <div className="text-xl font-bold font-display text-emerald-600 dark:text-emerald-400">17.4% Only</div>
                          <div className="text-[10px] text-zinc-400">Formally documented as recycled</div>
                        </div>
                        <span className="text-xs text-amber-500 bg-amber-500/10 font-bold px-2 py-0.5 rounded uppercase">Urgent Goal</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xl font-bold font-display text-zinc-800 dark:text-zinc-100">$57 Billion</div>
                          <div className="text-[10px] text-zinc-400">Value of lost raw metals annually</div>
                        </div>
                        <span className="text-xs text-emerald-500 bg-emerald-500/10 font-bold px-2 py-0.5 rounded uppercase">Recoverable</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grid of Modular Features */}
                <div className="space-y-6">
                  <div className="text-center space-y-1.5">
                    <h3 className="font-display text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                      Explore Our Awareness Modules
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs max-w-sm mx-auto">
                      All tools are fully functional immediately without accounts or external credential configurations.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                      onClick={() => handleTabChange("chatbot")}
                      className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-2xl shadow-sm hover:border-emerald-500 dark:hover:border-emerald-500 transition-all cursor-pointer group"
                    >
                      <Bot className="w-8 h-8 text-emerald-500 mb-3" />
                      <h4 className="font-display font-bold text-zinc-800 dark:text-zinc-100 text-sm group-hover:text-emerald-600 transition-colors">
                        Intelligent AI Chatbot
                      </h4>
                      <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1.5 leading-relaxed">
                        Query about specific component hazards, privacy wipes, or compliance questions with custom NLP keyword mappings.
                      </p>
                    </div>

                    <div
                      onClick={() => handleTabChange("dashboard")}
                      className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-2xl shadow-sm hover:border-emerald-500 dark:hover:border-emerald-500 transition-all cursor-pointer group"
                    >
                      <BarChart3 className="w-8 h-8 text-emerald-500 mb-3" />
                      <h4 className="font-display font-bold text-zinc-800 dark:text-zinc-100 text-sm group-hover:text-emerald-600 transition-colors">
                        Awareness Dashboard
                      </h4>
                      <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1.5 leading-relaxed">
                        Visualize e-waste volume projections and log items you recycle to compute CO2 offsets, and copper/gold mining reductions.
                      </p>
                    </div>

                    <div
                      onClick={() => handleTabChange("quiz")}
                      className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-2xl shadow-sm hover:border-emerald-500 dark:hover:border-emerald-500 transition-all cursor-pointer group"
                    >
                      <Trophy className="w-8 h-8 text-emerald-500 mb-3" />
                      <h4 className="font-display font-bold text-zinc-800 dark:text-zinc-100 text-sm group-hover:text-emerald-600 transition-colors">
                        Eco Quiz Challenge
                      </h4>
                      <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1.5 leading-relaxed">
                        Put your green circular-economy knowledge to the test. Accumulate unique points and save achievements on our leaderboard.
                      </p>
                    </div>

                    <div
                      onClick={() => handleTabChange("articles")}
                      className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-2xl shadow-sm hover:border-emerald-500 dark:hover:border-emerald-500 transition-all cursor-pointer group"
                    >
                      <BookOpen className="w-8 h-8 text-emerald-500 mb-3" />
                      <h4 className="font-display font-bold text-zinc-800 dark:text-zinc-100 text-sm group-hover:text-emerald-600 transition-colors">
                        Educational Briefings
                      </h4>
                      <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1.5 leading-relaxed">
                        Study deep briefings written by municipal coordinators on legal producer standards, toxic heavy compounds, and soil leaches.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Child routers states mapping */}
            {activeTab === "chatbot" && <Chatbot />}
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "tips" && <TipsManager />}
            {activeTab === "articles" && <ArticlesViewer />}
            {activeTab === "quiz" && <QuizModule />}
            {activeTab === "contact" && <ContactForm />}
            {activeTab === "about" && <AboutUs />}
            {activeTab === "admin" && <AdminPanel />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer element */}
      <footer className="border-t border-zinc-200/50 dark:border-zinc-800/60 bg-white dark:bg-[#060505] py-8 px-4 md:px-8 mt-12 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo brand */}
          <div className="flex items-center gap-2">
            <Logo className="w-8 h-8 shrink-0" />
            <div>
              <span className="font-display font-bold text-xs md:text-sm text-zinc-800 dark:text-zinc-100">EcoBot Project</span>
              <p className="text-[10px] text-zinc-400">Promoting urban mining and molecular compound isolates.</p>
            </div>
          </div>

          {/* Links and secondary Admin route shortcut */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <button onClick={() => handleTabChange("about")} className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer">About us</button>
            <button onClick={() => handleTabChange("contact")} className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer">FAQ</button>
            <button onClick={() => handleTabChange("contact")} className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer" id="contact-btn">Partner Contact</button>
            
            {/* Secret administrative gate entrance */}
            <button
              onClick={() => handleTabChange("admin")}
              className="hover:text-red-500 font-mono text-[10px] flex items-center gap-1 border border-dashed border-zinc-200 dark:border-zinc-800 px-2.5 py-1 rounded-md hover:border-red-500/50 transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3" /> System Console
            </button>
          </div>

          <div className="text-[10px] font-mono text-zinc-400 text-center md:text-right">
            © 2026 EcoBot full-stack environment. Licensed R2 safe compliance.
          </div>

        </div>
      </footer>
    </div>
  );
}
