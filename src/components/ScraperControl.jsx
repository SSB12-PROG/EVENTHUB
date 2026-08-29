import React from 'react';
import { X, RefreshCw, CheckCircle2, AlertTriangle, Terminal } from 'lucide-react';

export default function ScraperControl({ isOpen, onClose, logs, onTriggerScrape, isScraping }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-zinc-200 rounded-xl max-w-2xl w-full p-6 shadow-2xl relative font-mono text-xs text-gray-900">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-zinc-600 hover:text-black bg-zinc-100 rounded-full transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-2 text-verge-pink font-bold uppercase tracking-wider mb-2">
          <Terminal className="w-4 h-4" />
          <span>DeepTech Web Scraper Diagnostic Terminal</span>
        </div>

        <p className="text-zinc-600 mb-4">
          Real-time log audit of automated web and RSS scraper runs targeting Indian frontier tech news sources.
        </p>

        <div className="flex items-center justify-between bg-zinc-50 border border-zinc-200 p-3 rounded mb-4">
          <div>
            <span className="text-zinc-500 block text-[10px] font-bold">ENGINE STATUS</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Ready & Active
            </span>
          </div>

          <button
            onClick={onTriggerScrape}
            disabled={isScraping}
            className="bg-verge-pink hover:bg-pink-600 text-white font-bold px-3 py-1.5 rounded transition flex items-center gap-1.5 shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScraping ? 'animate-spin' : ''}`} />
            <span>{isScraping ? 'Scraping...' : 'Run Scraper Now'}</span>
          </button>
        </div>

        {/* Logs List */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 max-h-72 overflow-y-auto space-y-2.5 text-zinc-200">
          {logs && logs.length > 0 ? (
            logs.map((log, idx) => (
              <div key={idx} className="p-2 bg-zinc-950 border border-zinc-800/80 rounded">
                <div className="flex items-center justify-between text-zinc-400 text-[10px] mb-1">
                  <span>{new Date(log.timestamp).toLocaleString()}</span>
                  <span className="text-cyan-300">Duration: {log.durationSeconds}s</span>
                </div>
                <div className="text-zinc-200">
                  Scraped: <strong className="text-white">{log.itemsScraped}</strong> items | Added: <strong className="text-emerald-400">{log.itemsAdded}</strong> new articles
                </div>
                {log.errors && log.errors.length > 0 && (
                  <div className="mt-1 text-rose-400 text-[10px] flex items-start gap-1">
                    <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
                    <span>{log.errors.join(', ')}</span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-zinc-500 text-center py-4">No scraper runs logged yet. Click "Run Scraper Now" above.</p>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-zinc-900 hover:bg-black text-white font-bold px-4 py-1.5 rounded transition"
          >
            Close Terminal
          </button>
        </div>

      </div>
    </div>
  );
}
