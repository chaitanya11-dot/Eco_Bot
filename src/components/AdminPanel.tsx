import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, ShieldCheck, Mail, AlertTriangle, Trash, Check, MessageSquareCode, PlusCircle, CheckSquare, RefreshCw } from "lucide-react";
import { ContactMessage, EcoTip } from "../types";

export default function AdminPanel() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [passphrase, setPassphrase] = useState("");
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [newTipTitle, setNewTipTitle] = useState("");
  const [newTipContent, setNewTipContent] = useState("");
  const [newTipCategory, setNewTipCategory] = useState("reduction");
  const [newTipIsDaily, setNewTipIsDaily] = useState(false);
  const [isSubmittingTip, setIsSubmittingTip] = useState(false);
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);

  const ADMIN_SECRET = "ecobot-admin-secret-key-2026";

  useEffect(() => {
    // Check if passphrase was previously stored in session storage
    const savedSecret = sessionStorage.getItem("eco-admin-secret");
    if (savedSecret === ADMIN_SECRET) {
      setIsAdmin(true);
      fetchContacts(ADMIN_SECRET);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passphrase === "admin") {
      // Shorthand simple secret mapping
      setIsAdmin(true);
      sessionStorage.setItem("eco-admin-secret", ADMIN_SECRET);
      fetchContacts(ADMIN_SECRET);
    } else if (passphrase === ADMIN_SECRET) {
      setIsAdmin(true);
      sessionStorage.setItem("eco-admin-secret", ADMIN_SECRET);
      fetchContacts(ADMIN_SECRET);
    } else {
      alert("Invalid Administrator Passphrase. Please enter correct credentials.");
    }
  };

  const fetchContacts = async (secret: string) => {
    setIsLoadingContacts(true);
    try {
      const res = await fetch("/api/admin/contacts", {
        headers: {
          "x-admin-key": secret,
        },
      });

      if (res.ok) {
        const data = await res.json();
        // Sort contacts by date descending
        setContacts(data.reverse());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingContacts(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: "unread" | "read" | "replied") => {
    const secret = sessionStorage.getItem("eco-admin-secret") || "";
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": secret,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        fetchContacts(secret);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTipTitle || !newTipContent) return;

    setIsSubmittingTip(true);
    const secret = sessionStorage.getItem("eco-admin-secret") || "";

    try {
      const res = await fetch("/api/tips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": secret,
        },
        body: JSON.stringify({
          title: newTipTitle,
          content: newTipContent,
          category: newTipCategory,
          isDaily: newTipIsDaily,
        }),
      });

      if (res.ok) {
        alert("Eco Tip published successfully to public database!");
        setNewTipTitle("");
        setNewTipContent("");
        setNewTipCategory("reduction");
        setNewTipIsDaily(false);
      } else {
        alert("Failed to submit tip. Confirm key headers.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingTip(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("eco-admin-secret");
    setIsAdmin(false);
    setPassphrase("");
    setContacts([]);
  };

  return (
    <div id="admin-tab" className="space-y-8">
      
      {/* State 1: Locked Login */}
      {!isAdmin ? (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-8 rounded-2xl shadow-sm text-center max-w-md mx-auto space-y-6">
          <div className="w-12 h-12 bg-red-50 dark:bg-red-950/20 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6 animate-pulse" />
          </div>

          <div className="space-y-1.5">
            <h3 className="font-display text-lg font-bold text-zinc-800 dark:text-zinc-100">
              Administrator Access Gate
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">
              Unlock with local passphrase to view secure user feedback reports, illegal e-waste dump site reports, and publish custom daily tips.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              placeholder="Enter passphrase (hint: admin)..."
              required
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-center"
            />
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-2.5 rounded-xl transition-all cursor-pointer"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      ) : (
        /* State 2: Active Admin Console */
        <div className="space-y-8">
          <div className="bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100/30 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="font-display font-bold text-zinc-800 dark:text-zinc-100 text-sm">
                  EcoBot Admin Control Suite
                </h3>
                <p className="text-[10px] text-zinc-400">Moderating global feedback loops & tips databases</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="text-xs text-red-500 hover:text-red-400 border border-red-200 dark:border-red-950 px-3.5 py-1.5 rounded-xl hover:bg-red-50/30 cursor-pointer transition-colors"
            >
              Lock Panel
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left column: publish new tip */}
            <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-2xl shadow-sm space-y-4">
              <h4 className="font-display font-bold text-zinc-800 dark:text-zinc-100 text-xs uppercase tracking-wide flex items-center gap-1.5">
                <PlusCircle className="w-4.5 h-4.5 text-emerald-500" />
                Publish Custom Eco Tip
              </h4>

              <form onSubmit={handleAddTip} className="space-y-3.5">
                <div>
                  <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Tip Title</label>
                  <input
                    type="text"
                    value={newTipTitle}
                    onChange={(e) => setNewTipTitle(e.target.value)}
                    required
                    placeholder="e.g., The 1-in-1-out Rule"
                    className="w-full mt-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Tip Category</label>
                  <select
                    value={newTipCategory}
                    onChange={(e) => setNewTipCategory(e.target.value)}
                    className="w-full mt-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none"
                  >
                    <option value="reduction">Reduction Goals</option>
                    <option value="reuse">Reuse Options</option>
                    <option value="recycling">Recycling Compliance</option>
                    <option value="awareness">Social Awareness</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Tip Guidelines Content</label>
                  <textarea
                    value={newTipContent}
                    onChange={(e) => setNewTipContent(e.target.value)}
                    required
                    rows={4}
                    placeholder="Provide specific ecological advice..."
                    className="w-full mt-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isDaily"
                    checked={newTipIsDaily}
                    onChange={(e) => setNewTipIsDaily(e.target.checked)}
                    className="accent-emerald-500 w-4 h-4"
                  />
                  <label htmlFor="isDaily" className="text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer select-none">
                    Set as Daily Eco Tip highlight
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingTip}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-300 text-white font-semibold text-xs py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  {isSubmittingTip ? "Publishing Tip..." : "Publish to Database"}
                </button>
              </form>
            </div>

            {/* Right column: check submitted contact tickets */}
            <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-2xl shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-zinc-50 dark:border-zinc-800 pb-3">
                <h4 className="font-display font-bold text-zinc-800 dark:text-zinc-100 text-xs uppercase tracking-wide flex items-center gap-1.5">
                  <Mail className="w-4.5 h-4.5 text-emerald-500" />
                  Submitted Feedback & Incident Logs
                </h4>

                <button
                  onClick={() => fetchContacts(ADMIN_SECRET)}
                  className="text-zinc-400 hover:text-emerald-500 cursor-pointer"
                  title="Reload entries"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {isLoadingContacts ? (
                <div className="text-center py-12 text-xs text-zinc-400">
                  Retrieving tickets...
                </div>
              ) : contacts.length === 0 ? (
                <div className="text-center text-zinc-400 text-xs py-12">
                  Zero active feedback tickets present.
                </div>
              ) : (
                <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
                  {contacts.map((c) => (
                    <div
                      key={c.id}
                      className="bg-zinc-50/50 dark:bg-zinc-950/40 border border-zinc-100 dark:border-zinc-800/80 p-4 rounded-xl text-xs space-y-2 relative"
                    >
                      {/* Ticket status badge */}
                      <div className="absolute top-4 right-4 flex gap-1">
                        {c.status === "unread" && (
                          <span className="bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 text-[9px] px-2 py-0.5 rounded uppercase font-semibold">Unread</span>
                        )}
                        {c.status === "read" && (
                          <span className="bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 text-[9px] px-2 py-0.5 rounded uppercase font-semibold">Read</span>
                        )}
                        {c.status === "replied" && (
                          <span className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 text-[9px] px-2 py-0.5 rounded uppercase font-semibold">Replied</span>
                        )}
                      </div>

                      <div className="max-w-[80%]">
                        <div className="font-bold text-zinc-800 dark:text-zinc-100 text-xs flex items-center gap-1">
                          {c.subject === "illegal_dumping" && <AlertTriangle className="w-4.5 h-4.5 text-amber-500 shrink-0" />}
                          {c.name}
                        </div>
                        <div className="text-[10px] text-zinc-400 font-mono mt-0.5">{c.email}</div>
                      </div>

                      <div className="text-zinc-600 dark:text-zinc-300 italic pt-1 leading-relaxed border-t border-dashed border-zinc-200/50 dark:border-zinc-800">
                        "{c.message}"
                      </div>

                      {/* Ticket controls */}
                      <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex justify-end gap-1.5">
                        <button
                          onClick={() => handleUpdateStatus(c.id, "read")}
                          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] px-2.5 py-1 rounded hover:border-blue-500 hover:text-blue-500 cursor-pointer"
                        >
                          Mark Read
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(c.id, "replied")}
                          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] px-2.5 py-1 rounded hover:border-emerald-500 hover:text-emerald-500 cursor-pointer"
                        >
                          Mark Replied
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
