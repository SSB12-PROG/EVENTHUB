import React, { useEffect } from 'react';
import { 
  X, ExternalLink, Bookmark, Share2, ChevronLeft, ChevronRight, 
  Building2, MapPin, DollarSign, Clock, Sparkles, CheckCircle2,
  Calendar, Layers, ShieldCheck, Mail
} from 'lucide-react';

export default function RightReaderDrawer({ 
  article, 
  onClose, 
  onNavigatePrev, 
  onNavigateNext, 
  hasPrev, 
  hasNext,
  isSaved,
  onToggleSave,
  onOpenNewsletter
}) {
  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!article) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/40 drawer-backdrop z-40 transition-opacity duration-300 animate-fadeIn"
      />

      {/* Slide-Over Drawer Container (Width set strictly to 35vw on desktop lg screens per user feedback) */}
      <div className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[500px] md:w-[45vw] lg:w-[35vw] bg-white border-l border-zinc-200 shadow-2xl flex flex-col transition-transform duration-300 ease-out transform translate-x-0">
        
        {/* Drawer Header Controls */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-zinc-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="bg-verge-pink text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wide shadow-xs">
              {article.category}
            </span>
            <span className="text-xs text-zinc-600 font-mono font-semibold truncate max-w-[150px]">
              {article.source}
            </span>
          </div>

          <div className="flex items-center space-x-1">
            {/* Prev / Next Nav */}
            <button
              onClick={onNavigatePrev}
              disabled={!hasPrev}
              className="p-1.5 text-zinc-600 hover:text-black disabled:opacity-30 rounded hover:bg-zinc-100"
              title="Previous Article"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNavigateNext}
              disabled={!hasNext}
              className="p-1.5 text-zinc-600 hover:text-black disabled:opacity-30 rounded hover:bg-zinc-100"
              title="Next Article"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-zinc-200 mx-1" />

            {/* Bookmark */}
            <button
              onClick={() => onToggleSave(article)}
              className="p-1.5 text-zinc-600 hover:text-amber-500 rounded hover:bg-zinc-100 transition"
              title={isSaved ? 'Saved to bookmarks' : 'Save article'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'text-amber-500 fill-amber-500' : ''}`} />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-1.5 text-zinc-600 hover:text-cyan-600 rounded hover:bg-zinc-100 transition"
              title="Share link"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-600 hover:text-black bg-zinc-100 hover:bg-zinc-200 rounded-full transition ml-1"
              title="Close reader panel (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Drawer Body Scroll Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 text-gray-900">
          
          {/* Target Startup Metadata Card */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 shadow-xs">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-extrabold text-verge-pink uppercase tracking-wider block mb-1">
                  Featured Indian Startup
                </span>
                <h3 className="text-lg font-black text-gray-900 flex items-center gap-1.5 verge-title">
                  <Building2 className="w-4 h-4 text-cyan-600" /> {article.startupName || 'DeepTech Pioneer'}
                </h3>
              </div>
              {article.fundingStage && (
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                  {article.fundingStage}
                </span>
              )}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono text-zinc-600 pt-3 border-t border-zinc-200">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>{article.startupLocation || 'India'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-zinc-400" />
                <span>{article.category}</span>
              </div>
            </div>
          </div>

          {/* Title & Metadata */}
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight verge-title mb-3">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-600 pb-4 border-b border-zinc-200">
              <span>By <strong className="text-gray-900">{article.author || 'DeepTech Desk'}</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(article.publishedAt).toLocaleDateString()}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
            </div>
          </div>

          {/* Hero Image */}
          {article.heroImage && (
            <div className="rounded-lg overflow-hidden border border-zinc-200 bg-zinc-50">
              <img 
                src={article.heroImage} 
                alt={article.title} 
                className="w-full h-52 object-cover"
              />
              <div className="p-2 bg-zinc-50 text-[11px] text-zinc-500 font-mono text-right border-t border-zinc-200">
                Image source: {article.source}
              </div>
            </div>
          )}

          {/* AI Innovation Key Takeaways Box */}
          {article.innovationHighlights && article.innovationHighlights.length > 0 && (
            <div className="bg-purple-50/80 border border-purple-200 rounded-lg p-4">
              <h4 className="text-xs font-mono font-bold text-purple-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" /> Key Innovation Takeaways
              </h4>
              <ul className="space-y-2">
                {article.innovationHighlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-zinc-800 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Scraped Content Formatting */}
          <div className="prose prose-sm max-w-none space-y-4 text-zinc-800 leading-relaxed text-sm">
            {article.fullContent ? (
              article.fullContent.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-base font-bold text-gray-900 pt-2 border-b border-zinc-200 pb-1 verge-title">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('> ')) {
                  return (
                    <blockquote key={idx} className="border-l-2 border-verge-pink pl-3 py-1 my-3 text-zinc-800 italic bg-zinc-50 rounded-r">
                      {paragraph.replace('> ', '')}
                    </blockquote>
                  );
                }
                return (
                  <p key={idx}>
                    {paragraph}
                  </p>
                );
              })
            ) : (
              <p>{article.excerpt}</p>
            )}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-4 border-t border-zinc-200">
              <span className="text-xs text-zinc-500 font-mono block mb-2">SECTOR TAGS:</span>
              <div className="flex flex-wrap gap-1.5">
                {article.tags.map((tag, i) => (
                  <span key={i} className="bg-zinc-100 border border-zinc-300 text-zinc-700 text-[11px] px-2 py-0.5 rounded font-mono font-semibold">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="pt-4 border-t border-zinc-200 space-y-3">
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-black text-white font-bold text-xs py-2.5 rounded shadow transition"
            >
              <span>Visit Original Article on {article.source}</span>
              <ExternalLink className="w-3.5 h-3.5 text-verge-pink" />
            </a>

            {/* Newsletter Callout */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded p-3 text-center">
              <p className="text-xs text-zinc-700 mb-2">
                Want weekly updates on <strong className="text-gray-900">{article.startupName || article.category}</strong> and Indian deep tech?
              </p>
              <button
                onClick={onOpenNewsletter}
                className="bg-verge-pink hover:bg-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded transition flex items-center gap-1 mx-auto shadow-xs"
              >
                <Mail className="w-3.5 h-3.5" /> Subscribe Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
