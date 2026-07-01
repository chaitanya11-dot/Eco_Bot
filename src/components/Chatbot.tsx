import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, HelpCircle, AlertCircle, RefreshCw } from "lucide-react";
import { ChatMessage } from "../types";
import Logo from "./Logo";

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const initialBotMessage: ChatMessage = {
    id: "init-welcome",
    sender: "bot",
    text: "Hi there! I'm EcoBot, your local e-waste intelligence coordinator. 🌿\n\nAsk me how to safely dispose of items like batteries, printers, CRT monitors, or old phones! You can also click one of the quick suggestions below to begin.",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  // Load chat history from session storage if exists, or set initial
  useEffect(() => {
    const saved = sessionStorage.getItem("eco-chatbot-history");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        setMessages([initialBotMessage]);
      }
    } else {
      setMessages([initialBotMessage]);
    }
  }, []);

  const saveHistory = (newMsgs: ChatMessage[]) => {
    setMessages(newMsgs);
    sessionStorage.setItem("eco-chatbot-history", JSON.stringify(newMsgs));
  };

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    setInput("");
    
    // User message
    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      sender: "user",
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMsg];
    saveHistory(updatedMessages);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!response.ok) {
        throw new Error("Server responded with a fault");
      }

      const data = await response.json();
      
      const botMsg: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        sender: "bot",
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      saveHistory([...updatedMessages, botMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        sender: "bot",
        text: "My network fibers feel slightly damp! 🔌 I failed to connect to the knowledge engine. Please check your full-stack local server and try re-submitting.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      saveHistory([...updatedMessages, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend(input);
    }
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear your current conversation history?")) {
      saveHistory([initialBotMessage]);
    }
  };

  const quickSuggestions = [
    "What is e-waste?",
    "Why is e-waste toxic?",
    "How to recycle smartphones?",
    "Wipe personal data",
    "Lithium batteries danger"
  ];

  return (
    <div id="chatbot-tab" className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Informative Side Panel */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Logo className="w-5 h-5" />
            <h4 className="font-display font-bold text-zinc-800 dark:text-zinc-100 text-sm">Meet EcoBot</h4>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">
            I am programmed with a localized knowledge matrix covering electronic toxins, circular recyclability, and personal security wipes.
          </p>
          <div className="mt-4 border-t border-zinc-100 dark:border-zinc-800 pt-3">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Device Intelligence:</span>
            <ul className="text-xs text-zinc-500 mt-1 space-y-1">
              <li>• Smartphone components</li>
              <li>• Laptop circuit boards</li>
              <li>• Lithium cell chemical risks</li>
              <li>• Heavy metals in CRTs</li>
            </ul>
          </div>
        </div>

        <div className="bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100/30 p-5 rounded-2xl">
          <div className="flex items-center gap-1.5 mb-2 text-emerald-700 dark:text-emerald-400">
            <Sparkles className="w-4.5 h-4.5" />
            <span className="font-display text-xs font-semibold uppercase">Pro Recycling Tip</span>
          </div>
          <p className="text-emerald-800/80 dark:text-emerald-300/70 text-xs leading-relaxed">
            Specify a precise device name like <strong>"CRT TV"</strong> or <strong>"charger cables"</strong> for instant technical safety summaries!
          </p>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="lg:col-span-3 flex flex-col h-[550px] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <h3 className="font-display text-sm font-bold text-zinc-800 dark:text-zinc-100">EcoBot Chat Assistant</h3>
              <p className="text-[10px] text-zinc-400">Localized E-Waste Knowledge Node</p>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="text-xs text-zinc-400 hover:text-red-500 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
            title="Clear Chat History"
          >
            <RefreshCw className="w-3 h-3" />
            Reset
          </button>
        </div>

        {/* Message logs area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs whitespace-pre-wrap leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "bg-emerald-600 text-white rounded-br-none font-medium"
                      : "bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 border border-zinc-100 dark:border-zinc-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-zinc-400 mt-1 mx-1">{msg.timestamp}</span>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing simulation bubble */}
          {isTyping && (
            <div className="flex flex-col items-start">
              <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-3.5 rounded-bl-none flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries */}
        <div className="px-5 py-2 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
          <span className="text-[10px] text-zinc-400 uppercase font-mono shrink-0">Ask EcoBot:</span>
          {quickSuggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(suggestion)}
              className="bg-zinc-50 hover:bg-emerald-50 dark:bg-zinc-950 dark:hover:bg-emerald-950/20 text-zinc-600 hover:text-emerald-600 dark:text-zinc-300 dark:hover:text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-zinc-200/60 dark:border-zinc-800 transition-all cursor-pointer inline-block"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your e-waste inquiry here..."
            className="flex-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim()}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-300 disabled:dark:bg-zinc-800 text-white p-2.5 rounded-xl transition-all cursor-pointer shrink-0"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
