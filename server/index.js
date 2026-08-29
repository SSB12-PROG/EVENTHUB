import express from 'express';
import cors from 'cors';
import { 
  getArticles, 
  getSubscribers, 
  addSubscriber, 
  getStartups, 
  getScraperLogs 
} from './storage.js';
import { runScraper } from './scraper.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// GET /api/articles
app.get('/api/articles', (req, res) => {
  try {
    let articles = getArticles();
    const { category, search, startup, featured } = req.query;

    if (category && category !== 'All') {
      articles = articles.filter(a => a.category.toLowerCase() === category.toLowerCase());
    }

    if (startup) {
      articles = articles.filter(a => a.startupName.toLowerCase().includes(startup.toLowerCase()));
    }

    if (featured === 'true') {
      articles = articles.filter(a => a.featured);
    }

    if (search) {
      const q = search.toLowerCase();
      articles = articles.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.excerpt.toLowerCase().includes(q) || 
        a.startupName.toLowerCase().includes(q) ||
        (a.tags && a.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    res.json({
      success: true,
      count: articles.length,
      articles
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/articles/:id
app.get('/api/articles/:id', (req, res) => {
  try {
    const articles = getArticles();
    const article = articles.find(a => a.id === req.params.id || a.slug === req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    res.json({ success: true, article });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/scrape - Trigger manual scraper run
app.post('/api/scrape', async (req, res) => {
  try {
    const result = await runScraper();
    const updatedArticles = getArticles();
    res.json({
      success: true,
      message: `Scraper finished. Scraped ${result.itemsScraped} items, added ${result.itemsAdded} new articles.`,
      result,
      totalArticles: updatedArticles.length
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/scraper/logs
app.get('/api/scraper/logs', (req, res) => {
  try {
    const logs = getScraperLogs();
    res.json({ success: true, logs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/newsletter/subscribe
app.post('/api/newsletter/subscribe', (req, res) => {
  try {
    const { email, sectors } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Valid email address required' });
    }
    addSubscriber(email, sectors || []);
    res.json({
      success: true,
      message: `Successfully subscribed ${email} to Indian Deep Tech Briefings!`
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/newsletter/generate - Generate Curated Newsletter Briefing Preview
app.post('/api/newsletter/generate', (req, res) => {
  try {
    const { category } = req.body;
    let articles = getArticles();
    if (category && category !== 'All') {
      articles = articles.filter(a => a.category.toLowerCase() === category.toLowerCase());
    }
    const topArticles = articles.slice(0, 5);

    const digestHtml = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111; border: 1px solid #ddd; padding: 20px;">
  <div style="background: #121214; color: #fff; padding: 20px; text-align: center;">
    <h1 style="color: #E20074; margin: 0; font-size: 24px; text-transform: uppercase; tracking: 2px;">DEEPTECH // INDIA</h1>
    <p style="margin: 5px 0 0 0; font-size: 12px; color: #aaa;">Weekly Frontier Tech & Startup Briefing</p>
  </div>
  <div style="padding: 20px 0;">
    <h2 style="border-bottom: 2px solid #E20074; padding-bottom: 5px;">Top Deep Tech Innovations This Week</h2>
    ${topArticles.map(a => `
      <div style="margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px;">
        <span style="background: #E20074; color: #fff; padding: 2px 6px; font-size: 10px; font-weight: bold; text-transform: uppercase;">${a.category}</span>
        <h3 style="margin: 8px 0 4px 0;"><a href="${a.sourceUrl}" style="color: #111; text-decoration: none;">${a.title}</a></h3>
        <p style="color: #555; font-size: 14px; margin: 0 0 8px 0;">${a.excerpt}</p>
        <span style="font-size: 12px; color: #888;">Startup: <strong>${a.startupName}</strong> | ${a.readTime}</span>
      </div>
    `).join('')}
  </div>
  <div style="background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666;">
    <p>You received this email because you subscribed to DeepTech India Newsletter.</p>
  </div>
</div>
    `;

    res.json({
      success: true,
      subject: `[DeepTech India] ${topArticles[0]?.startupName || 'Frontier Tech'} & Top Indian Innovation News`,
      articleCount: topArticles.length,
      digestHtml
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/startups
app.get('/api/startups', (req, res) => {
  try {
    const startups = getStartups();
    res.json({ success: true, startups });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default app;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`DeepTech India backend running at http://localhost:${PORT}`);
  });
}
