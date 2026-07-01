import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ShieldQuestion, MapPin, Mail } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "What exactly is considered electronic waste (e-waste)?",
    answer: "E-waste encompasses any electrical or electronic equipment that has been discarded. This includes devices with battery power, electrical plugs, or wiring. Common examples are mobile phones, computers, monitors, batteries, adapters, microwaves, printers, keyboards, and cooling units."
  },
  {
    question: "Why is throwing electronics in household garbage considered a hazard?",
    answer: "Electronics contain hazardous toxic heavy compounds (like Lead, Mercury, and Cadmium). When crushed inside trash trucks or compacted in landfills, batteries can puncture and catch fire, while heavy elements wash into soil, polluting community aquifers and crops."
  },
  {
    question: "How do I secure personal data like passwords or bank info before recycling?",
    answer: "You must always execute a full factory data wipe or reset on computerized equipment before handing them off. Removing physical storage slots (such as SIM cards or microSD expansion pins) and employing disk scrubbing softwares ensures complete data isolation."
  },
  {
    question: "How can I reduce the quantity of electronic waste I create?",
    answer: "Practice the tech hierarchy of longevity: \n1. Buy only what is necessary.\n2. Opt for repairable or modular hardware.\n3. Repurpose old phones as secondary utilities (like desk clocks, remote controls, or offline players).\n4. Resell or donate working devices rather than storing them in drawers."
  },
  {
    question: "Does EcoBot physically collect e-waste items?",
    answer: "No, EcoBot is an educational, analytical, and awareness platform! We do not accept physical deliveries. Please check with your city's local waste department for certified recycling centers and municipal drop boxes."
  }
];

export default function ContactForm() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div id="contact-tab" className="max-w-3xl mx-auto space-y-6">
      
      {/* FAQ Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 md:p-8 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 border-b border-zinc-50 dark:border-zinc-800/80 pb-3 mb-4">
          <ShieldQuestion className="w-5 h-5 text-emerald-500" />
          <h4 className="font-display font-bold text-zinc-800 dark:text-zinc-100 text-sm">
            Common Questions FAQ
          </h4>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {FAQ_DATA.map((faq, idx) => (
            <div
              key={idx}
              className="border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/25"
            >
              <button
                onClick={() => setActiveFaq((curr) => (curr === idx ? null : idx))}
                className="w-full text-left px-4 py-3.5 flex justify-between items-center gap-3 cursor-pointer"
              >
                <span className="font-display font-semibold text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm">
                  {faq.question}
                </span>
                <ChevronDown className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform ${activeFaq === idx ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-4 pb-4 border-t border-zinc-100 dark:border-zinc-800 pt-2.5"
                  >
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Support channels card */}
      <div className="bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-100/30 p-6 rounded-2xl text-xs sm:text-sm space-y-3">
        <span className="font-bold text-emerald-700 dark:text-emerald-400 block uppercase tracking-wider text-[10px] sm:text-xs">
          Municipal Coordinator Contacts
        </span>
        <div className="space-y-2 text-zinc-600 dark:text-zinc-300">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-500" />
            <span>support@ecobot-recycling.gov</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-500" />
            <span>Headquarters: 100 Ecology Road, Suite A, Metropolis</span>
          </div>
        </div>
      </div>

    </div>
  );
}
