import { ShieldAlert, Globe, Sparkles, Scale, BookOpen, Heart } from "lucide-react";

export default function AboutUs() {
  const objectives = [
    {
      icon: <Globe className="w-6 h-6 text-emerald-500" />,
      title: "Promote Urban Mining",
      description: "Extracting copper, silver, and gold from consumer scraps consumes 80% less fossil fuels than primary industrial underground blast mining."
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-emerald-500" />,
      title: "Neutralize Toxins",
      description: "Keeping Lead, Mercury, and Cadmium contained inside secure recycling channels stops them from leaking into soils and drinking wells."
    },
    {
      icon: <Scale className="w-6 h-6 text-emerald-500" />,
      title: "Circular Design Shift",
      description: "Supporting modular systems (like Framework laptops or original parts take-backs) forces manufacturers to design electronics with easy recovery in mind."
    }
  ];

  return (
    <div id="about-us-tab" className="space-y-8">
      {/* Editorial Hero block */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 md:p-8 rounded-2xl shadow-sm text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] uppercase font-bold px-3 py-1 rounded-full">
          Our Vision & Mission
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-zinc-800 dark:text-zinc-100">
          Reimagining Electronic Waste as Resources
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm leading-relaxed">
          EcoBot was founded in 2026 to bridge the gap between complex recycling logistics and everyday consumer behaviors. Technology evolves rapidly, leaving a trail of outdated hardware. We believe that with proper education and simplified awareness tracking, we can transition from a wasteful linear cycle to an elegant circular future.
        </p>
      </div>

      {/* Main Core Objectives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {objectives.map((obj, i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-2xl shadow-sm space-y-3"
          >
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl w-11 h-11 flex items-center justify-center">
              {obj.icon}
            </div>
            <h4 className="font-display font-bold text-zinc-800 dark:text-zinc-100 text-sm">
              {obj.title}
            </h4>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">
              {obj.description}
            </p>
          </div>
        ))}
      </div>

      {/* Educational highlights banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-800 rounded-2xl p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h4 className="font-display text-lg font-bold">Want to bring EcoBot to your municipality?</h4>
          <p className="text-emerald-100 text-xs leading-relaxed">
            We offer white-labeled deployment blueprints for city municipalities, universities, and commercial business districts looking to promote education and track collaborative green recycling goals.
          </p>
        </div>
        <button
          onClick={() => {
            const contactTab = document.getElementById("contact-btn");
            if (contactTab) contactTab.click();
          }}
          className="bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-semibold px-5 py-2.5 rounded-xl shrink-0 transition-all cursor-pointer"
        >
          Partner with EcoBot
        </button>
      </div>
    </div>
  );
}
