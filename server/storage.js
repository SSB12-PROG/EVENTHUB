import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const ARTICLES_FILE = path.join(DATA_DIR, 'articles.json');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json');
const SCRAPER_LOGS_FILE = path.join(DATA_DIR, 'scraper_logs.json');

// Initial seed articles about Indian Deep Tech Startups & Innovations
const INITIAL_ARTICLES = [
  {
    id: 'dt-001',
    title: 'Agnikul Cosmos Successfully Conducts Flight of Custom 3D-Printed Semi-Cryogenic Rocket SubOrbital SFA',
    slug: 'agnikul-cosmos-3d-printed-semi-cryo-rocket-test-flight',
    source: 'TechCrunch Space / Inc42',
    sourceUrl: 'https://inc42.com/features/agnikul-cosmos-3d-printed-rocket-launch-india-spacetech/',
    author: 'Aarav Sharma',
    publishedAt: '2026-08-28T14:30:00Z',
    category: 'SpaceTech',
    startupName: 'Agnikul Cosmos',
    startupLocation: 'Chennai, Tamil Nadu',
    fundingStage: 'Series B ($35M Raised)',
    readTime: '6 min read',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'Chennai-based spacetech pioneer Agnikul Cosmos has achieved a world first by launching Agnibaan SOrTeD powered by a single-piece 3D-printed semi-cryogenic engine manufactured entirely in India.',
    innovationHighlights: [
      'Single-piece 3D-printed rocket engine (Agnite) manufactured without a single welded seam.',
      'Operates on sub-cooled kerosene (Isosene) and liquid oxygen (LOX) semi-cryogenic propellants.',
      'Mobile launchpad "Dhanush" allows launch capability from any location on Earth.',
      'Customizable payload capacity up to 300kg to Low Earth Orbit (LEO).'
    ],
    fullContent: `
### Breakthrough in Additive Space Manufacturing

Chennai-based space startup **Agnikul Cosmos**, incubated at IIT Madras, has carved a milestone in global aerospace engineering by completing the maiden flight of its Agnibaan SOrTeD (Sub-Orbital Technological Demonstrator). The rocket utilizes the world's first single-piece 3D-printed engine, designed and manufactured entirely in Agnikul's Rocket Factory 1 in Chennai.

Unlike traditional rocket engines that require thousands of handcrafted components, Agnikul's patented engine is printed as a unified block using high-strength nickel alloy in under 72 hours. This radical design reduces payload assembly time from months to days while cutting production costs by over 60%.

### Powered by Semi-Cryogenic Technology

The Agnibaan rocket leverages a semi-cryogenic engine utilizing industrial Kerosene and Liquid Oxygen (LOX). Semi-cryogenic engines offer higher specific impulse and safety compared to standard solid boosters, while avoiding the extreme thermal storage challenges of full liquid hydrogen cryogenics.

> "Today's successful flight test proves that complex aerospace hardware can be rapidly prototyped and produced at scale using additive manufacturing right here in India," remarked **Srinath Ravichandran**, Co-founder & CEO of Agnikul Cosmos.

### Indian Spacetech Ecosystem Momentum

India's private space industry has witnessed unprecedented growth following the government's deregulation of the space sector and IN-SPACe authorization framework. Agnikul, alongside peer Skyroot Aerospace, is positioning India as the world's leading cost-effective satellite launch hub for small to medium satellite constellations.

With commercial launches scheduled for early 2027, Agnikul is expanding its client pipeline across Europe, Japan, and Southeast Asian Earth-observation satellite operators.
    `,
    tags: ['SpaceTech', '3D Printing', 'Rocketry', 'IIT Madras', 'IN-SPACe']
  },
  {
    id: 'dt-002',
    title: 'Mindgrove Labs Unveils "SecureIoT": India\'s First Commercial 28nm RISC-V System-on-Chip',
    slug: 'mindgrove-labs-india-first-commercial-riscv-chip-secureiot',
    source: 'EE Times India / ETtech',
    sourceUrl: 'https://economictimes.indiatimes.com/tech/startups/mindgrove-labs-risc-v-chip',
    author: 'Priya Sundaram',
    publishedAt: '2026-08-27T09:15:00Z',
    category: 'AI & Chips',
    startupName: 'Mindgrove Labs',
    startupLocation: 'Bengaluru, Karnataka',
    fundingStage: 'Seed ($6M Raised)',
    readTime: '5 min read',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'Fabless semiconductor startup Mindgrove Labs launches SecureIoT, a high-efficiency 28nm RISC-V microcontroller designed for smart grids, wearables, and industrial automation.',
    innovationHighlights: [
      'Built on the open-source RISC-V instruction set architecture tailored for edge computing.',
      'Consumes 30% less power than equivalent ARM Cortex-M4 microcontrollers.',
      'Hardware-level cryptographic engine with secure boot and post-quantum encryption ready.',
      'Designed in India under the National Semiconductor Mission initiative.'
    ],
    fullContent: `
### Pushing India into Commercial Semiconductor IP

Deep tech chip design startup **Mindgrove Labs** has officially launched **SecureIoT**, marking India's entry into high-volume commercial RISC-V SoC production. Backed by Peak XV Partners and the IIT Madras Pravartak Technologies Foundation, Mindgrove designed the chip targeting connected devices, EV battery management systems, and smart electricity meters.

The chip leverages a 28nm node process fabricated through foundry partners, offering local OEMs a domestic alternative to imported microcontrollers that currently dominate 90% of Indian electronics manufacturing.

### Edge Computing and Security Architecture

SecureIoT integrates an in-house hardware security module (HSM) capable of executing AES-256, RSA-4096, and ECC encryption at line speed without burdening the primary CPU core. 

> "India imports billions of dollars in basic microcontrollers annually," explained **Shashwath TR**, CEO of Mindgrove Labs. "SecureIoT delivers enterprise-grade security at a price point that makes domestic IoT manufacturing economically unassailable."

### Strategic Alignment with India Semiconductor Mission (ISM)

With India committing $10 Billion in subsidies for semiconductor fabs and chip design, Mindgrove represents a successful wave of fabless startups creating indigenous IP. The company plans to follow up with an edge AI processor capable of running compressed LLM vision models on sub-5W power envelopes.
    `,
    tags: ['Semiconductors', 'RISC-V', 'DeepTech', 'Edge AI', 'Hardware']
  },
  {
    id: 'dt-003',
    title: 'String Bio Engineers Methane-Eating Microbes to Produce High-Protein Sustainable Feeds',
    slug: 'string-bio-methane-fermentation-single-cell-protein',
    source: 'YourStory BioTech / Forbes India',
    sourceUrl: 'https://yourstory.com/2026/08/string-bio-methane-protein-climate-tech',
    author: 'Vikramaditya Roy',
    publishedAt: '2026-08-26T18:45:00Z',
    category: 'BioTech',
    startupName: 'String Bio',
    startupLocation: 'Bengaluru, Karnataka',
    fundingStage: 'Series B ($20M Raised)',
    readTime: '7 min read',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'Bengaluru-based synthetic biology innovator String Bio converts potent greenhouse gas methane into high-grade proteins for aquaculture and agriculture using gas fermentation.',
    innovationHighlights: [
      'SIMP (String Integrated Methane Platform) converts greenhouse gas into bio-based ingredients.',
      'Reduces carbon footprint by 80% compared to traditional soy and fishmeal protein sourcing.',
      'Produces PROTINIUM™ feed ingredients for poultry and aquaculture markets.',
      'Scalable gas-fermentation bioreactors operating continuously on industrial waste gas.'
    ],
    fullContent: `
### Converting Greenhouse Emissions into Food Security

Synthetic biology startup **String Bio** has reached commercial scale at its multi-ton production facility in Bengaluru. By harnessing methanotrophic bacteria that consume methane gas as their sole energy source, String Bio transforms harmful industrial gas into rich single-cell protein (SCP).

Methane has a global warming potential 28 times greater than carbon dioxide over a 100-year timescale. String Bio's process traps waste methane from landfills, bio-digesters, and industrial flaring, feeding it into gas-fermentation reactors.

### Addressing Global Protein Supply Chain Bottlenecks

The resulting product, **PROTINIUM™**, boasts a 70%+ protein concentration with an amino acid profile superior to conventional soybean meal and fishmeal, without requiring arable land or fresh water irrigation.

> "We are proving that biology can solve climate change and food security simultaneously," stated **Dr. Ezhil Subbian**, Co-founder and CEO of String Bio. "Our platform turns a potent pollutant into a valuable nutrition input for global supply chains."

### Global Expansion into Human Nutrition and Materials

String Bio is now partnering with international agribusiness conglomerates across Asia-Pacific and Latin America to license its gas-fermentation bioreactor blueprints, opening new horizons for biological climate technology.
    `,
    tags: ['BioTech', 'ClimateTech', 'Synthetic Biology', 'Methane', 'Sustainability']
  },
  {
    id: 'dt-004',
    title: 'Netradyne Raises $100M to Scale Vision AI and Edge Driver Safety Systems Globally',
    slug: 'netradyne-vision-ai-driver-safety-100m-expansion',
    source: 'TechInAsia / LiveMint',
    sourceUrl: 'https://livemint.com/technology/netradyne-ai-funding-edge-computing',
    author: 'Neha Kapoor',
    publishedAt: '2026-08-25T11:20:00Z',
    category: 'AI & Chips',
    startupName: 'Netradyne',
    startupLocation: 'Bengaluru / San Diego',
    fundingStage: 'Series D ($100M Raised)',
    readTime: '4 min read',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1558442074-3c19857bc1dc?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'Deep learning startup Netradyne has processed over 15 billion commercial driving miles with Driveri®, its quad-camera vision AI edge hardware platform.',
    innovationHighlights: [
      'Quad-camera vision AI platform running high-speed neural networks directly on vehicle edge processors.',
      'Real-time automated driver safety feedback and hazard detection with 99.4% accuracy.',
      'Analyses 100% of driving time rather than trigger-only inertial event logging.'
    ],
    fullContent: `
### Redefining Fleet Safety through High-Speed Vision Processing

Bengaluru and California-headquartered **Netradyne** continues to dominate commercial fleet safety AI with its **Driveri®** device. Utilizing edge GPUs mounted behind driver windshields, the system continuously analyzes video streams to detect stop-sign compliance, tailgating, pedestrian crosswalks, driver fatigue, and mobile phone usage.

### The Power of Full-Time Edge Inference

Most legacy dashcam systems only record video when sharp braking or G-force spikes occur. Netradyne's edge platform computes vision models in real-time, rewarding positive driving behavior while issuing audio alerts before accidents happen.

> "Our vision algorithms process millions of visual data points every second right inside the cabin," said **Avneesh Agrawal**, CEO of Netradyne. "This capital influx will accelerate our autonomous heavy vehicle perception R&D."
    `,
    tags: ['AI', 'Computer Vision', 'Edge AI', 'Fleet Safety', 'Autonomous Vehicles']
  },
  {
    id: 'dt-005',
    title: 'Bugworks Research Begins Phase 2 Clinical Trials for Broad-Spectrum Superbug Antibiotic',
    slug: 'bugworks-phase-2-trials-superbug-antibiotic-bgy-02',
    source: 'BioWorld / Economic Times',
    sourceUrl: 'https://economictimes.indiatimes.com/prime/pharma-and-healthcare/bugworks-superbug-antibiotic',
    author: 'Dr. Siddharth Nair',
    publishedAt: '2026-08-24T16:10:00Z',
    category: 'BioTech',
    startupName: 'Bugworks Research',
    startupLocation: 'Bengaluru, Karnataka',
    fundingStage: 'Series B ($30M Raised)',
    readTime: '6 min read',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'Biopharmaceutical startup Bugworks initiates global clinical trials for BGY-02, a novel dual-target agent battling multidrug-resistant Gram-negative superbugs.',
    innovationHighlights: [
      'Dual-action mechanism inhibiting bacterial DNA Gyrase and Topoisomerase IV simultaneously.',
      'Zero cross-resistance with existing commercial antibiotic classes.',
      'First antibiotic candidate originating from India to enter global CARB-X Phase 2 clinical trials.'
    ],
    fullContent: `
### Combating the Antimicrobial Resistance (AMR) Crisis

Bengaluru-incubated drug discovery startup **Bugworks Research** has achieved a major milestone in global health by advancing its novel antibiotic drug candidate, **BGY-02**, into Phase 2 human clinical trials. Antimicrobial resistance causes over 1.2 million deaths annually worldwide, with Gram-negative superbugs posing the highest mortality threat in hospital ICUs.

### Dual-Targeting Molecular Design

Developed using proprietary structure-guided computational biophysics, BGY-02 paralyzes two critical bacterial enzymes simultaneously. This dual-target mechanism makes it virtually impossible for bacteria to mutate single point resistance.

> "No new class of broad-spectrum Gram-negative antibiotics has reached patients in over 50 years," noted **Dr. Anand Anandkumar**, CEO of Bugworks. "BGY-02 represents Indian biotech innovation leading the charge against AMR."
    `,
    tags: ['BioTech', 'Pharma', 'Drug Discovery', 'AMR', 'CARB-X']
  },
  {
    id: 'dt-006',
    title: 'Chakra Innovation & Log9 Partner to Deploy Rapid-Charging Graphene-Enhanced LTO Batteries',
    slug: 'log9-chakra-graphene-lto-rapid-charge-battery-tech',
    source: 'Autocar Professional / CleanTech India',
    sourceUrl: 'https://autocarpro.in/news/log9-materials-graphene-lto-ev-batteries',
    author: 'Kavita Sundaram',
    publishedAt: '2026-08-23T10:05:00Z',
    category: 'ClimateTech',
    startupName: 'Log9 Materials',
    startupLocation: 'Bengaluru, Karnataka',
    fundingStage: 'Series B ($40M Raised)',
    readTime: '5 min read',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'Nanotechnology pioneer Log9 Materials scales 9-minute rapid charging InstaCharge batteries for commercial 2W and 3W electric fleets across 15 Indian cities.',
    innovationHighlights: [
      'Graphene-boosted Lithium Titanate Oxide (LTO) cell chemistry with 9-minute 0-100% fast charging.',
      'Operates reliably between -30°C and 60°C without risk of thermal runaway fires.',
      'Battery lifespan exceeding 15,000 charge cycles (~15 years operational life).'
    ],
    fullContent: `
### Revolutionizing Commercial Electric Mobility

Indian deep tech battery pioneer **Log9 Materials** has commercially deployed over 10,000 rapid-charging **InstaCharge** battery packs built on proprietary graphene-infused LTO cells. Designed specifically for tropical temperatures and heavy commercial delivery usage, Log9's technology solves the twin battery challenges of thermal safety and downtime.

### Graphene Nanotechnology Advantage

By embedding synthesized graphene sheets into battery anodes, Log9 dramatically lowers internal electrical resistance and heat buildup during hyper-fast charging. Commercial drivers can fully recharge their vehicles during a 10-minute tea break, eliminating range anxiety.

> "Our battery technology isn't just imported and assembled; we synthesize graphene and engineer cell chemistry in Bengaluru," said **Dr. Akshay Singhal**, Founder & CEO of Log9.
    `,
    tags: ['ClimateTech', 'Energy Storage', 'Batteries', 'Graphene', 'EV']
  }
];

const INITIAL_STARTUPS = [
  { name: 'Agnikul Cosmos', sector: 'SpaceTech', location: 'Chennai', valuation: '$250M', highlight: '3D-printed semi-cryo rockets' },
  { name: 'Mindgrove Labs', sector: 'AI & Chips', location: 'Bengaluru', valuation: '$45M', highlight: 'Indigenous 28nm RISC-V SoC' },
  { name: 'String Bio', sector: 'BioTech', location: 'Bengaluru', valuation: '$120M', highlight: 'Methane-to-protein bioreactors' },
  { name: 'Netradyne', sector: 'AI & Chips', location: 'Bengaluru / US', valuation: '$750M', highlight: 'Quad-camera edge vision AI' },
  { name: 'Bugworks', sector: 'BioTech', location: 'Bengaluru', valuation: '$150M', highlight: 'Dual-target superbug antibiotics' },
  { name: 'Log9 Materials', sector: 'ClimateTech', location: 'Bengaluru', valuation: '$220M', highlight: 'Graphene LTO 9-min fast battery' },
  { name: 'Skyroot Aerospace', sector: 'SpaceTech', location: 'Hyderabad', valuation: '$500M', highlight: 'Vikram series orbital launchers' },
  { name: 'GalaxEye Space', sector: 'SpaceTech', location: 'Bengaluru', valuation: '$60M', highlight: 'Multi-sensor SAR & optical satellites' }
];

export function getArticles() {
  if (!fs.existsSync(ARTICLES_FILE)) {
    fs.writeFileSync(ARTICLES_FILE, JSON.stringify(INITIAL_ARTICLES, null, 2));
    return INITIAL_ARTICLES;
  }
  try {
    const raw = fs.readFileSync(ARTICLES_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading articles file:', err);
    return INITIAL_ARTICLES;
  }
}

export function saveArticles(articles) {
  fs.writeFileSync(ARTICLES_FILE, JSON.stringify(articles, null, 2));
}

export function addArticle(newArticle) {
  const articles = getArticles();
  // Check duplicate by title or sourceUrl
  const exists = articles.some(a => a.sourceUrl === newArticle.sourceUrl || a.title === newArticle.title);
  if (!exists) {
    articles.unshift(newArticle);
    saveArticles(articles);
    return true;
  }
  return false;
}

export function getSubscribers() {
  if (!fs.existsSync(SUBSCRIBERS_FILE)) {
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify([], null, 2));
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(SUBSCRIBERS_FILE, 'utf8'));
  } catch (err) {
    return [];
  }
}

export function addSubscriber(email, sectors = []) {
  const subs = getSubscribers();
  const existingIndex = subs.findIndex(s => s.email === email);
  if (existingIndex >= 0) {
    subs[existingIndex].sectors = sectors;
    subs[existingIndex].updatedAt = new Date().toISOString();
  } else {
    subs.push({
      email,
      sectors,
      createdAt: new Date().toISOString()
    });
  }
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subs, null, 2));
  return true;
}

export function getStartups() {
  return INITIAL_STARTUPS;
}

export function getScraperLogs() {
  if (!fs.existsSync(SCRAPER_LOGS_FILE)) {
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(SCRAPER_LOGS_FILE, 'utf8'));
  } catch (err) {
    return [];
  }
}

export function logScrapeRun(logEntry) {
  const logs = getScraperLogs();
  logs.unshift(logEntry);
  // Keep last 50 runs
  if (logs.length > 50) logs.pop();
  fs.writeFileSync(SCRAPER_LOGS_FILE, JSON.stringify(logs, null, 2));
}
