import React from 'react';
import { ArrowUpRight, Sparkles, Building2, Clock } from 'lucide-react';

export default function HeroGrid({ featuredArticles, onArticleClick }) {
  if (!featuredArticles || featuredArticles.length === 0) return null;

  const mainStory = featuredArticles[0];
  const secondaryStories = featuredArticles.slice(1, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 pt-6 pb-4">
      <div className="flex items-center justify-between mb-4 border-b border-zinc-200 pb-2">
        <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-verge-pink flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Featured Deep Tech Breakthroughs
        </h2>
        <span className="text-xs text-zinc-500 font-mono">Curated Innovations</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main Hero Tile (Occupies 7 cols on large screens) */}
        {mainStory && (
          <div 
            onClick={() => onArticleClick(mainStory)}
            className="lg:col-span-7 group cursor-pointer bg-white border border-zinc-200 rounded-lg overflow-hidden hover:border-verge-pink transition shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-zinc-100">
              <img
                src={mainStory.heroImage}
                alt={mainStory.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Category Badge & Startup Tag */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="bg-verge-pink text-white text-[11px] font-extrabold px-2.5 py-1 uppercase tracking-wider rounded">
                  {mainStory.category}
                </span>
                <span className="bg-black/75 backdrop-blur text-cyan-300 border border-cyan-400/30 text-[11px] font-mono px-2.5 py-1 rounded flex items-center gap-1">
                  <Building2 className="w-3 h-3" /> {mainStory.startupName}
                </span>
              </div>
            </div>

            <div className="p-6 bg-white flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 group-hover:text-verge-pink transition leading-tight verge-title mb-3">
                  {mainStory.title}
                </h3>
                <p className="text-zinc-700 text-sm line-clamp-3 leading-relaxed mb-4">
                  {mainStory.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-100 text-xs text-zinc-500 font-mono">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-zinc-700">{mainStory.source}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {mainStory.readTime}</span>
                </div>
                <span className="text-verge-pink font-bold group-hover:translate-x-1 transition flex items-center gap-0.5">
                  Read Full Post <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Stories Stack (Occupies 5 cols on large screens) */}
        <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
          {secondaryStories.map((story) => (
            <div
              key={story.id}
              onClick={() => onArticleClick(story)}
              className="group cursor-pointer bg-white border border-zinc-200 rounded-lg p-5 hover:border-verge-pink transition shadow-sm hover:shadow-md flex flex-col justify-between flex-1"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-verge-pink uppercase tracking-widest bg-pink-50 px-2 py-0.5 rounded border border-pink-200">
                    {story.category}
                  </span>
                  <span className="text-[11px] text-zinc-500 font-mono font-semibold">{story.startupName}</span>
                </div>
                <h4 className="text-lg font-black text-gray-900 group-hover:text-verge-pink transition leading-snug line-clamp-2 mb-2 verge-title">
                  {story.title}
                </h4>
                <p className="text-xs text-zinc-600 line-clamp-2 leading-normal mb-3">
                  {story.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono pt-3 border-t border-zinc-100">
                <span>{story.source}</span>
                <span className="text-zinc-800 group-hover:text-verge-pink flex items-center gap-1 font-bold">
                  Open Reader <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
