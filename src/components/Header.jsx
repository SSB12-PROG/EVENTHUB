import React from 'react';
import { Cpu, Rocket, Mail, RefreshCw, Bookmark, Sparkles, Flame, Shield, Dna, Leaf, Atom } from 'lucide-react';

const CATEGORIES = [
  { id: 'All', label: 'All Tech', icon: Sparkles },
  { id: 'SpaceTech', label: 'SpaceTech', icon: Rocket },
  { id: 'AI & Chips', label: 'AI & Chips', icon: Cpu },
  { id: 'BioTech', label: 'BioTech', icon: Dna },
  { id: 'ClimateTech', label: 'ClimateTech', icon: Leaf },
  { id: 'DefenseTech', label: 'DefenseTech', icon: Shield },
  { id: 'Quantum', label: 'Quantum', icon: Atom },
];

export default function Header({ 
  selectedCategory, 
  onSelectCategory, 
  onTriggerScrape, 
  isScraping, 
  onOpenNewsletter, 
  onOpenScraperLogs,
  savedCount 
}) {
  return (
    <header className="border-b border-zinc-200 bg-white sticky top-0 z-30 shadow-xs">
      {/* Top Ticker Banner */}
      <div className="bg-gradient-to-r from-verge-pink via-purple-600 to-rose-600 text-white text-xs font-semibold py-1.5 px-4 flex items-center justify-between overflow-hidden">
        <div className="flex items-center space-x-2 shrink-0">
          <span className="bg-black/25 text-white px-2 py-0.5 rounded text-[10px] uppercase font-extrabold tracking-wider flex items-center gap-1">
            <Flame className="w-3 h-3 text-yellow-300 animate-pulse" /> Live Ticker
          </span>
          <p className="truncate max-w-xl md:max-w-3xl">
            <span className="font-bold text-yellow-200">AGNIKUL COSMOS:</span> Flight test of 3D-printed rocket engine successful • <span className="font-bold text-cyan-200">MINDGROVE LABS:</span> Commercial 28nm RISC-V chip launches • <span className="font-bold text-emerald-200">STRING BIO:</span> Methane-to-protein bioreactor scaling
          </p>
        </div>
        <div className="hidden md:flex items-center space-x-4 text-[11px] font-mono">
          <span>Bengaluru • Hyderabad • Chennai • NCR</span>
        </div>
      </div>

      {/* Main Brand Section */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Logo & Tagline */}
        <div className="flex items-center space-x-3">
          <div className="bg-verge-pink text-white font-mono font-black text-2xl px-3 py-1.5 tracking-tighter transform -skew-x-6 shadow-verge">
            DT//IN
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 flex items-center gap-2 verge-title">
              DEEPTECH <span className="text-verge-pink">//</span> INDIA
            </h1>
            <p className="text-xs text-zinc-500 font-mono tracking-wide">
              Scraping & Tracking Frontier Tech Innovations & Startups
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Run Scraper Button */}
          <button
            onClick={onTriggerScrape}
            disabled={isScraping}
            className="flex items-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold px-3 py-2 rounded-md border border-zinc-300 transition disabled:opacity-50"
            title="Scrape live web feeds for new Indian DeepTech news"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-verge-pink ${isScraping ? 'animate-spin' : ''}`} />
            <span>{isScraping ? 'Scraping Feeds...' : 'Run Web Scraper'}</span>
          </button>

          {/* Scraper Logs Link */}
          <button
            onClick={onOpenScraperLogs}
            className="text-xs text-zinc-600 hover:text-black px-2 py-1 underline font-mono font-medium"
          >
            Status Logs
          </button>

          {/* Newsletter Subscribe Button */}
          <button
            onClick={onOpenNewsletter}
            className="flex items-center gap-1.5 bg-gradient-to-r from-verge-pink to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-xs font-bold px-3.5 py-2 rounded-md shadow-sm transition"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Get Weekly Newsletter</span>
          </button>

          {/* Saved Count */}
          {savedCount > 0 && (
            <div className="flex items-center gap-1 bg-zinc-100 border border-zinc-300 text-zinc-800 text-xs font-bold px-2.5 py-1.5 rounded">
              <Bookmark className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{savedCount} Saved</span>
            </div>
          )}
        </div>
      </div>

      {/* Category Nav Bar */}
      <div className="bg-zinc-50 border-t border-zinc-200 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 flex items-center space-x-1 py-1.5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full transition whitespace-nowrap ${
                  active
                    ? 'bg-verge-pink text-white shadow-xs'
                    : 'text-zinc-700 hover:text-black hover:bg-zinc-200/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-zinc-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
