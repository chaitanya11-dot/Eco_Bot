import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Globe, Scale } from "lucide-react";

// Interactive chart data
const globalGrowthData = [
  { year: "2010", millionsTons: 33.8 },
  { year: "2013", millionsTons: 39.2 },
  { year: "2016", millionsTons: 44.7 },
  { year: "2019", millionsTons: 53.6 },
  { year: "2022", millionsTons: 59.4 },
  { year: "2024", millionsTons: 63.8 },
  { year: "2026 (Est)", millionsTons: 74.0 },
];

const categoryDistribution = [
  { name: "Small Equipment", value: 38, color: "#10B981" }, // emerald
  { name: "Large Appliances", value: 20, color: "#34D399" }, // light emerald
  { name: "IT & Telecom", value: 14, color: "#059669" }, // deep emerald
  { name: "Screens & Monitors", value: 12, color: "#EF4444" }, // red (high hazard)
  { name: "Heat Exchange Equipment", value: 7, color: "#F59E0B" }, // amber
  { name: "Batteries & Accessories", value: 9, color: "#3B82F6" }, // blue
];

export default function Dashboard() {
  return (
    <div id="dashboard-tab" className="space-y-8">
      {/* Overview Intro Banner */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-800 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10">
          <Globe className="w-96 h-96" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <span className="bg-emerald-500/30 text-emerald-100 font-mono text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            Global Impact metrics
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-bold mt-3 tracking-tight">
            The World's Fastest Growing Waste Stream
          </h2>
          <p className="text-emerald-100 mt-3 leading-relaxed text-sm md:text-base">
            Every minute, over 100,000 laptops, phones, and devices are thrown into trash cans. Less than 20% of global e-waste is formally recycled. The rest releases heavy neurotoxins into soil while precious copper, cobalt, and gold are lost forever.
          </p>
        </div>
      </div>

      {/* Global Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Growth Area Chart */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 p-6 rounded-2xl shadow-sm">
          <div className="mb-4">
            <h3 className="font-display text-lg font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-500" />
              Global E-Waste Generation (Millions of Metric Tons)
            </h3>
            <p className="text-zinc-400 text-xs mt-1">
              Annual compilation of global weight discarded. Source: UN Global E-Waste Monitor.
            </p>
          </div>
          <div className="h-64 mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={globalGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" stroke="#888888" fontSize={11} tickLine={false} />
                <YAxis stroke="#888888" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    borderColor: "#27272a",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                  formatter={(value) => [`${value}M Tons`, "E-Waste"]}
                />
                <Area type="monotone" dataKey="millionsTons" stroke="#10B981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorGrowth)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Pie Chart */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 p-6 rounded-2xl shadow-sm">
          <div className="mb-4">
            <h3 className="font-display text-lg font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-500" />
              Where Does E-Waste Come From?
            </h3>
            <p className="text-zinc-400 text-xs mt-1">
              Percentage split of electrical and electronic discard by product categories.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="h-48 sm:h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#18181b",
                      borderColor: "#27272a",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                    formatter={(value) => [`${value}%`, "Share"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Legend block */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {categoryDistribution.map((cat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="text-zinc-600 dark:text-zinc-300 text-xs font-medium truncate">
                    {cat.name} ({cat.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
