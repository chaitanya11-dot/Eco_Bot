import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, RefreshCw, Trophy, ChevronRight, HelpCircle, AlertCircle, ShieldCheck, Heart } from "lucide-react";
import { QuizQuestion, QuizResult } from "../types";

// Standard static questions to avoid fetching errors
const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "What percentage of global e-waste is currently documented as properly collected and recycled?",
    options: ["Only about 20%", "Roughly 50%", "Nearly 75%", "Over 90%"],
    correctAnswerIndex: 0,
    explanation: "According to the UN Global E-waste Monitor, only about 17.4% to 20% of global electronic waste is formally collected and recycled. The remaining 80% is dumped in landfills, incinerated, or illegally traded."
  },
  {
    id: "q2",
    question: "Which toxic heavy metal represents up to 4 kilograms of weight inside older CRT glass tube monitors?",
    options: ["Arsenic", "Lithium", "Lead", "Nickel"],
    correctAnswerIndex: 2,
    explanation: "Cathode Ray Tube (CRT) televisions and computer screens contain massive amounts of lead (up to 4kg per monitor) inside the glass funnels to shield consumers from radiation. Breaking them releases dangerous lead dust."
  },
  {
    id: "q3",
    question: "Why is throwing rechargeable Lithium-Ion batteries in common home trash bins considered highly dangerous?",
    options: ["They leak sulfuric acid", "They can puncture and trigger heavy chemical garbage truck fires", "They degrade the landfill lining", "They deplete local power grids"],
    correctAnswerIndex: 1,
    explanation: "Lithium-ion batteries are highly pressurized and volatile. When compacted inside garbage trucks or bulldozed in landfills, they puncture, short-circuit, and trigger intense chemical fires that are incredibly hard to extinguish."
  },
  {
    id: "q4",
    question: "What does the term 'Urban Mining' refer to?",
    options: [
      "Mining coal underneath city suburbs",
      "Scavenging structural steel from abandoned buildings",
      "Recovering gold, silver, and copper directly from discarded electronic waste",
      "Prospecting for diamonds in concrete sewage channels"
    ],
    correctAnswerIndex: 2,
    explanation: "Urban Mining is the process of retrieving precious metals and rare earth elements from obsolete equipment. It is highly efficient; a ton of smartphones contains up to 100 times more gold than a ton of gold ore."
  },
  {
    id: "q5",
    question: "What is the critical first action you should complete before parting with any laptop, tablet, or smartphone?",
    options: [
      "Polish the display glass",
      "Wipe all personal files and execute a certified factory data reset",
      "Remove the metal serial numbers",
      "Drain the battery to zero"
    ],
    correctAnswerIndex: 1,
    explanation: "To protect your identity, credit cards, and passwords, you must always back up your files and execute a full factory data reset before recycling or donating devices."
  },
  {
    id: "q6",
    question: "Which regulatory framework forces manufacturers to finance and organize recycling systems for their hardware?",
    options: [
      "Extended Producer Responsibility (EPR)",
      "Tech Longevity Standard",
      "The Green Consumer Directive",
      "Circular Material Act"
    ],
    correctAnswerIndex: 0,
    explanation: "Extended Producer Responsibility (EPR) laws hold manufacturers accountable for the entire lifecycle of their products, incentivizing them to design modular, easy-to-recycle devices."
  },
  {
    id: "q7",
    question: "How long does a printer toner ink cartridge take to naturally decompose if sent to a common landfill?",
    options: ["About 10 years", "Approximately 50 years", "Up to 450 years", "It never decomposes"],
    correctAnswerIndex: 2,
    explanation: "The high-grade industrial plastics inside printer cartridges can take up to 450 years to naturally degrade, while the leftover fine powder ink particles represent microplastic and toxic inhalation hazards."
  },
  {
    id: "q8",
    question: "What is the energy benefit of recovering copper through recycling versus primary open-pit mining?",
    options: [
      "Saves about 10% of energy",
      "Saves about 40% of energy",
      "Saves up to 85% of energy",
      "Recycling actually consumes more energy"
    ],
    correctAnswerIndex: 2,
    explanation: "Recycling copper saves up to 85% of the energy consumed in primary raw ore extraction, dramatically reducing fossil-fuel greenhouse gas emissions globally."
  }
];

export default function QuizModule() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [nickname, setNickname] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [leaderboard, setLeaderboard] = useState<QuizResult[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("/api/quiz/leaderboard");
      if (res.ok) {
        const data = await res.json();
        setLeaderboard(data);
      }
    } catch (e) {
      console.error("Failed to fetch leaderboard logs:", e);
    }
  };

  const startQuiz = () => {
    setIsPlaying(true);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsSubmitted(false);
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (isAnswered) return;
    setSelectedAnswer(optionIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || isAnswered) return;

    setIsAnswered(true);
    if (selectedAnswer === QUIZ_QUESTIONS[currentIndex].correctAnswerIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setIsPlaying(false);
      setCurrentIndex(QUIZ_QUESTIONS.length); // triggers final score view
    }
  };

  const handleSaveScore = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedNick = nickname.trim();
    if (!trimmedNick || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: trimmedNick,
          score,
          totalQuestions: QUIZ_QUESTIONS.length,
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
        fetchLeaderboard();
      } else {
        alert("Server failed to commit score. Try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error reaching scoreboard servers.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeQuestion = QUIZ_QUESTIONS[currentIndex];

  return (
    <div id="quiz-tab" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Quiz Console Column */}
      <div className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-2xl shadow-sm flex flex-col justify-between min-h-[440px]">
        
        {/* State 1: Start Screen */}
        {!isPlaying && currentIndex === 0 && (
          <div className="text-center py-8 space-y-6 flex-1 flex flex-col justify-center items-center">
            <Trophy className="w-16 h-16 text-emerald-500 mx-auto stroke-1 animate-pulse" />
            <div className="space-y-2 max-w-md">
              <h3 className="font-display text-xl font-bold text-zinc-800 dark:text-zinc-100">
                Eco-Awareness E-Waste Quiz
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">
                Test your wisdom regarding urban mining efficiency, chemical cell hazards, and Extended Producer Responsibility (EPR) regulations. Gain eco-badges and compete in our localized leaderboard!
              </p>
            </div>
            <button
              onClick={startQuiz}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-6 py-3 rounded-xl shadow transition-all cursor-pointer"
            >
              Start E-Waste Challenge
            </button>
          </div>
        )}

        {/* State 2: Active Playing */}
        {isPlaying && activeQuestion && (
          <div className="space-y-6 flex-1 flex flex-col justify-between">
            {/* Steps Indicator */}
            <div className="flex justify-between items-center text-xs text-zinc-400 border-b border-zinc-50 dark:border-zinc-800/80 pb-3 font-mono">
              <span>Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}</span>
              <span>Correct Answers: {score}</span>
            </div>

            {/* Question Body */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-zinc-800 dark:text-zinc-100 text-sm md:text-base leading-snug">
                {activeQuestion.question}
              </h4>

              {/* Options Grid */}
              <div className="grid grid-cols-1 gap-2.5">
                {activeQuestion.options.map((opt, idx) => {
                  let buttonStyle = "border-zinc-200 dark:border-zinc-800 hover:border-emerald-400 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-950";
                  
                  if (selectedAnswer === idx) {
                    buttonStyle = "border-emerald-500 bg-emerald-50/20 text-emerald-700 dark:text-emerald-400";
                  }

                  if (isAnswered) {
                    if (idx === activeQuestion.correctAnswerIndex) {
                      buttonStyle = "border-emerald-600 bg-emerald-100/50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 font-medium";
                    } else if (selectedAnswer === idx) {
                      buttonStyle = "border-red-500 bg-red-100/30 text-red-700 dark:bg-red-950/20 dark:text-red-400";
                    } else {
                      buttonStyle = "border-zinc-100 dark:border-zinc-800/40 text-zinc-400 dark:text-zinc-600 bg-zinc-50/30 dark:bg-zinc-950/10 cursor-not-allowed";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(idx)}
                      disabled={isAnswered}
                      className={`text-left text-xs p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${buttonStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Answer Explanation Box */}
            <div className="min-h-[80px] flex items-center">
              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-4 bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-100/30 rounded-xl space-y-1 text-xs"
                  >
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5" /> Explanation Brief:
                    </span>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
                      "{activeQuestion.explanation}"
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex justify-end pt-4 border-t border-zinc-50 dark:border-zinc-800/80">
              {!isAnswered ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-200 disabled:dark:bg-zinc-800 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Confirm Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1 transition-all cursor-pointer"
                >
                  {currentIndex === QUIZ_QUESTIONS.length - 1 ? "View Results" : "Next Question"}
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* State 3: Final Score & Submission */}
        {!isPlaying && currentIndex === QUIZ_QUESTIONS.length && (
          <div className="py-6 space-y-6 flex-1 flex flex-col justify-center">
            <div className="text-center space-y-3">
              <span className="text-3xl">🎉</span>
              <h3 className="font-display text-xl font-bold text-zinc-800 dark:text-zinc-100">
                You Finished the Challenge!
              </h3>
              
              {/* Score breakdown */}
              <div className="max-w-xs mx-auto p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <div className="text-3xl font-display font-bold text-emerald-600 dark:text-emerald-400">
                  {score} / {QUIZ_QUESTIONS.length}
                </div>
                <div className="text-[10px] text-zinc-400 uppercase font-mono mt-1">Final Score</div>
                
                {/* Badge title */}
                <div className="mt-3 inline-block bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  Badge: {score >= 7 ? "Green Champion 🏆" : score >= 4 ? "E-Waste Learner 🎓" : "Eco-Novice 🌿"}
                </div>
              </div>
            </div>

            {/* Score submission form */}
            {!isSubmitted ? (
              <form onSubmit={handleSaveScore} className="max-w-md mx-auto w-full bg-zinc-50/50 dark:bg-zinc-950/20 p-5 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/60 space-y-3.5">
                <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide text-center">Save Achievement to Leaderboard</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                    placeholder="Enter green nickname..."
                    maxLength={15}
                    className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shrink-0"
                  >
                    {isSubmitting ? "Saving..." : "Submit"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50/50 dark:bg-emerald-950/20 py-3 rounded-xl max-w-sm mx-auto border border-emerald-100/30">
                Score registered! Check your standing on the scoreboard.
              </div>
            )}

            {/* Reset button */}
            <div className="text-center">
              <button
                onClick={startQuiz}
                className="text-xs text-emerald-600 hover:text-emerald-500 font-semibold inline-flex items-center gap-1.5 cursor-pointer hover:underline"
              >
                <RefreshCw className="w-4 h-4" /> Try Quiz Again
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Leaderboard High Scores Column */}
      <div className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
          <Trophy className="w-5 h-5 text-amber-500" />
          <h4 className="font-display font-bold text-zinc-800 dark:text-zinc-100 text-sm">
            Eco Scoreboard
          </h4>
        </div>

        <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
          {leaderboard.length === 0 ? (
            <div className="text-center text-xs text-zinc-400 py-12">
              Leaderboard empty. Be the first to register!
            </div>
          ) : (
            leaderboard.map((leader, i) => (
              <div
                key={leader.id}
                className="flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-950/40 p-2.5 rounded-xl border border-zinc-100/60 dark:border-zinc-800/30 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${
                    i === 0 ? "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400" :
                    i === 1 ? "bg-zinc-200 text-zinc-700 dark:bg-zinc-850 dark:text-zinc-300" :
                    i === 2 ? "bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400" :
                    "bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-500"
                  }`}>
                    {i + 1}
                  </span>
                  <div>
                    <div className="font-semibold text-zinc-700 dark:text-zinc-300 max-w-[120px] truncate">
                      {leader.nickname}
                    </div>
                    <div className="text-[9px] text-zinc-400">
                      {leader.level}
                    </div>
                  </div>
                </div>

                <div className="text-right font-display font-bold text-emerald-600 dark:text-emerald-400">
                  {leader.score} / {leader.totalQuestions}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
