import React from 'react';
import { Building2, Rocket, Cpu, Dna, Leaf, Shield, Atom, ChevronRight } from 'lucide-react';

export default function StartupDirectory({ startups }) {
  if (!startups || startups.length === 0) return null;

  return (
    <section className="bg-zinc-50 border-y border-zinc-200 py-5 my-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-3 font-mono text-xs">
          <div className="flex items-center space-x-2 text-zinc-700">
            <span className="bg-cyan-100 text-cyan-800 border border-cyan-300 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase">
              INDIAN FRONTIER LABS
            </span>
            <span className="font-bold">Ecosystem Index</span>
          </div>
          <span className="text-zinc-500 font-medium">Active Startups Monitored</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {startups.map((st, i) => (
            <div 
              key={i} 
              className="bg-white border border-zinc-200 hover:border-verge-pink rounded-md p-3 flex flex-col justify-between transition group shadow-xs hover:shadow-sm"
            >
              <div>
                <span className="text-[9px] font-mono uppercase font-bold text-verge-pink tracking-wider block mb-1">
                  {st.sector}
                </span>
                <h4 className="text-xs font-bold text-gray-900 group-hover:text-verge-pink transition truncate">
                  {st.name}
                </h4>
              </div>
              <div className="mt-2 pt-2 border-t border-zinc-100 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>📍 {st.location}</span>
                <span className="text-emerald-700 font-bold">{st.valuation}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
