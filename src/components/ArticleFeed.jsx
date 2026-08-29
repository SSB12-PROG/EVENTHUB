import React from 'react';
import { Search, Filter, ArrowUpRight, Clock, Building2, ExternalLink, Bookmark, Sparkles, RefreshCw, Mail } from 'lucide-react';

export default function ArticleFeed({ 
  articles, 
  onArticleClick, 
  searchQuery, 
  onSearchChange, 
  selectedCategory, 
  onSelectCategory,
  onTriggerScrape,
  isScraping,
  savedArticles,
  onToggleSave,
  startups,
  onOpenNewsletter
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      
      {/* Search & Toolbar Bar */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3.5 mb-6 flex flex-col md:flex-row gap-3 items-center justify-between shadow-xs">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search deep tech startups, chips, rockets, biotech..."
            className="w-full bg-white border border-zinc-300 rounded-md pl-9 pr-4 py-2 text-xs text-gray-900 placeholder-zinc-400 focus:outline-none focus:border-verge-pink font-mono"
          />
        </div>

        {/* Info & Category Filter Info */}
        <div className="flex items-center space-x-3 text-xs text-zinc-600 font-mono w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-verge-pink" />
            <span>Category: <strong className="text-gray-900 font-bold">{selectedCategory}</strong></span>
          </div>
          <span>•</span>
          <span>Showing <strong className="text-gray-900 font-bold">{articles.length}</strong> posts</span>
        </div>
      </div>

      {/* Main Grid + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Main Article Stream (Occupies 8 Cols) */}
        <div className="lg:col-span-8 space-y-5">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-verge-pink" /> Latest Deep Tech Feed
            </h3>
            <span className="text-[11px] font-mono text-zinc-500">Click any post to open right drawer reader</span>
          </div>

          {articles.length === 0 ? (
            <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-10 text-center space-y-3">
              <p className="text-sm text-zinc-600 font-mono">No articles found matching your query.</p>
              <button
                onClick={onTriggerScrape}
                disabled={isScraping}
                className="bg-verge-pink text-white text-xs font-bold px-4 py-2 rounded shadow-xs transition inline-flex items-center gap-2"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isScraping ? 'animate-spin' : ''}`} />
                <span>Run Scraper Now</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {articles.map((article) => {
                const isSaved = savedArticles.some(s => s.id === article.id);
                return (
                  <article
                    key={article.id}
                    onClick={() => onArticleClick(article)}
                    className="group cursor-pointer bg-white border border-zinc-200 hover:border-verge-pink rounded-lg overflow-hidden transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative h-44 w-full overflow-hidden bg-zinc-100">
                        <img
                          src={article.heroImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800'}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        
                        {/* Category & Save Button */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="bg-white/90 text-verge-pink border border-verge-pink/40 text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded backdrop-blur shadow-xs">
                            {article.category}
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleSave(article);
                            }}
                            className="bg-white/90 hover:bg-white p-1.5 rounded text-zinc-600 hover:text-amber-500 transition backdrop-blur border border-zinc-200"
                            title={isSaved ? 'Saved' : 'Save article'}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'text-amber-500 fill-amber-500' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2">
                        {/* Startup Tag */}
                        <div className="flex items-center gap-1 text-[11px] font-mono text-cyan-700 font-bold">
                          <Building2 className="w-3 h-3 text-cyan-600" />
                          <span>{article.startupName}</span>
                        </div>

                        <h4 className="text-base font-extrabold text-gray-900 group-hover:text-verge-pink transition line-clamp-2 leading-snug verge-title">
                          {article.title}
                        </h4>

                        <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-zinc-400" />
                        <span>{article.readTime}</span>
                      </div>
                      <span className="text-zinc-800 group-hover:text-verge-pink font-bold flex items-center gap-0.5">
                        Read Story <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Sidebar (Occupies 4 Cols) */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Newsletter Box Widget */}
          <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 border border-pink-200 rounded-lg p-5 shadow-xs">
            <span className="bg-verge-pink text-white text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded tracking-wide inline-block mb-2">
              Free Weekly Digest
            </span>
            <h4 className="text-lg font-black text-gray-900 verge-title mb-1">
              Indian Deep Tech Dispatch
            </h4>
            <p className="text-xs text-zinc-600 mb-4 leading-relaxed">
              Get the latest scraped breakthroughs in SpaceTech, RISC-V Chips, BioTech & Quantum sent directly to your inbox every Friday.
            </p>
            <button
              onClick={onOpenNewsletter}
              className="w-full bg-verge-pink hover:bg-pink-600 text-white font-bold text-xs py-2.5 rounded shadow transition flex items-center justify-center gap-2"
            >
              <Mail className="w-3.5 h-3.5" /> Subscribe to Newsletter
            </button>
          </div>

          {/* Indian Deep Tech Startups Spotlight */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-2 mb-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-800 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-cyan-600" /> Startup Directory
              </h4>
              <span className="text-[10px] text-zinc-500 font-mono">Top Indian Labs</span>
            </div>

            <div className="space-y-3">
              {startups && startups.slice(0, 5).map((st, i) => (
                <div key={i} className="p-2.5 bg-white border border-zinc-200 rounded hover:border-zinc-300 transition shadow-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-gray-900">{st.name}</span>
                    <span className="text-[10px] font-mono bg-cyan-50 text-cyan-700 border border-cyan-200 px-1.5 py-0.5 rounded font-semibold">
                      {st.sector}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-600 leading-tight">
                    {st.highlight}
                  </p>
                  <div className="mt-1.5 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                    <span>📍 {st.location}</span>
                    <span className="text-emerald-700 font-bold">{st.valuation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Web Scraper Info Box */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 font-mono text-xs text-zinc-600 space-y-2">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-1.5 text-zinc-900 font-bold">
              <span>SCRAPER ENGINE</span>
              <span className="text-emerald-700 text-[10px] uppercase font-mono bg-emerald-100 border border-emerald-300 px-1.5 py-0.5 rounded">Active</span>
            </div>
            <p className="text-[11px] text-zinc-600 leading-normal">
              Aggregating live RSS and news feeds from Google News India, TechCrunch, Inc42, YourStory, and LiveMint.
            </p>
            <button
              onClick={onTriggerScrape}
              disabled={isScraping}
              className="w-full bg-white hover:bg-zinc-100 text-zinc-800 font-bold text-[11px] py-1.5 rounded border border-zinc-300 transition flex items-center justify-center gap-1.5 mt-2"
            >
              <RefreshCw className={`w-3 h-3 text-verge-pink ${isScraping ? 'animate-spin' : ''}`} />
              <span>{isScraping ? 'Scraping Feeds...' : 'Trigger Scraping Cycle'}</span>
            </button>
          </div>

        </aside>

      </div>
    </section>
  );
}
