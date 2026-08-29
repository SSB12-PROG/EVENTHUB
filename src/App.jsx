import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroGrid from './components/HeroGrid';
import ArticleFeed from './components/ArticleFeed';
import RightReaderDrawer from './components/RightReaderDrawer';
import NewsletterModal from './components/NewsletterModal';
import ScraperControl from './components/ScraperControl';
import StartupDirectory from './components/StartupDirectory';

export default function App() {
  const [articles, setArticles] = useState([]);
  const [startups, setStartups] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]);
  const [isScraping, setIsScraping] = useState(false);
  const [scraperLogs, setScraperLogs] = useState([]);
  const [isScraperLogsOpen, setIsScraperLogsOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch articles on mount or when category/search changes
  useEffect(() => {
    fetchArticles();
  }, [selectedCategory]);

  useEffect(() => {
    fetchStartups();
    fetchScraperLogs();
    
    // Load saved bookmarks from localStorage
    try {
      const saved = localStorage.getItem('deeptech_saved_articles');
      if (saved) setSavedArticles(JSON.parse(saved));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      let url = `/api/articles?category=${encodeURIComponent(selectedCategory)}`;
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setArticles(data.articles);
      }
    } catch (err) {
      console.error('Failed fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStartups = async () => {
    try {
      const res = await fetch('/api/startups');
      const data = await res.json();
      if (data.success) setStartups(data.startups);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchScraperLogs = async () => {
    try {
      const res = await fetch('/api/scraper/logs');
      const data = await res.json();
      if (data.success) setScraperLogs(data.logs);
    } catch (e) {
      console.error(e);
    }
  };

  const handleTriggerScrape = async () => {
    setIsScraping(true);
    try {
      const res = await fetch('/api/scrape', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        await fetchArticles();
        await fetchScraperLogs();
      }
    } catch (err) {
      alert('Scraper failed: ' + err.message);
    } finally {
      setIsScraping(false);
    }
  };

  const handleToggleSave = (article) => {
    let updated;
    if (savedArticles.some(a => a.id === article.id)) {
      updated = savedArticles.filter(a => a.id !== article.id);
    } else {
      updated = [...savedArticles, article];
    }
    setSavedArticles(updated);
    localStorage.setItem('deeptech_saved_articles', JSON.stringify(updated));
  };

  // Article Drawer Navigation
  const activeIndex = articles.findIndex(a => a.id === activeArticle?.id);
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex >= 0 && activeIndex < articles.length - 1;

  const handleNavigatePrev = () => {
    if (hasPrev) setActiveArticle(articles[activeIndex - 1]);
  };

  const handleNavigateNext = () => {
    if (hasNext) setActiveArticle(articles[activeIndex + 1]);
  };

  const featuredArticles = articles.filter(a => a.featured || articles.indexOf(a) < 3);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans selection:bg-verge-pink selection:text-white">
      
      {/* Header Bar */}
      <Header
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onTriggerScrape={handleTriggerScrape}
        isScraping={isScraping}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
        onOpenScraperLogs={() => setIsScraperLogsOpen(true)}
        savedCount={savedArticles.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Verge Hero 3-Tile Section */}
        {selectedCategory === 'All' && !searchQuery && (
          <HeroGrid
            featuredArticles={featuredArticles}
            onArticleClick={(article) => setActiveArticle(article)}
          />
        )}

        {/* Startup Directory Row Showcase */}
        {selectedCategory === 'All' && !searchQuery && (
          <StartupDirectory startups={startups} />
        )}

        {/* Article Feed Section */}
        <ArticleFeed
          articles={articles}
          onArticleClick={(article) => setActiveArticle(article)}
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            fetchArticles();
          }}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onTriggerScrape={handleTriggerScrape}
          isScraping={isScraping}
          savedArticles={savedArticles}
          onToggleSave={handleToggleSave}
          startups={startups}
          onOpenNewsletter={() => setIsNewsletterOpen(true)}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-100 py-8 px-4 text-xs font-mono text-zinc-600 text-center space-y-2">
        <p className="text-zinc-900 font-extrabold tracking-wide">DEEPTECH // INDIA AGGREGATOR & NEWSLETTER</p>
        <p className="text-zinc-600">Tracking SpaceTech • Semiconductors & RISC-V • BioTech • ClimateTech • Defense • Quantum</p>
        <p>© {new Date().getFullYear()} DeepTech India. Inspired by The Verge.</p>
      </footer>

      {/* Right Reader Drawer (35% screen width on desktop lg:w-[35vw]) */}
      <RightReaderDrawer
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        onNavigatePrev={handleNavigatePrev}
        onNavigateNext={handleNavigateNext}
        hasPrev={hasPrev}
        hasNext={hasNext}
        isSaved={savedArticles.some(a => a.id === activeArticle?.id)}
        onToggleSave={handleToggleSave}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
      />

      {/* Newsletter Modal */}
      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />

      {/* Scraper Logs Terminal Modal */}
      <ScraperControl
        isOpen={isScraperLogsOpen}
        onClose={() => setIsScraperLogsOpen(false)}
        logs={scraperLogs}
        onTriggerScrape={handleTriggerScrape}
        isScraping={isScraping}
      />

    </div>
  );
}
