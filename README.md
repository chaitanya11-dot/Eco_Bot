# EcoBot – Sustainable E-Waste Awareness Assistant

EcoBot is a premium, fully responsive, production-ready full-stack web application designed to raise community awareness, secure personal devices, and promote circular economies surrounding electronic scraps (e-waste).

The application runs seamlessly out-of-the-box with **zero setup** or external credentials, utilizing a local file-based database to track user achievements, contact reports, and custom eco-tips.

---

## 🌟 Core Features

1. **Editorial Landing Page**: High-impact displaying typography outlining modern e-waste statistics and quick-launch pathways for all modules.
2. **AI Chatbot**: A robust local conversational assistant that parses e-waste queries, answers toxicity questions, and details specific device lifecycles.
3. **E-Waste Optical Identifier**: A simulated optical camera scanner with interactive scannable lasers that analyzes file details to identify toxicity grades, hazardous chemical elements, and recovery instructions.
4. **Interactive Stats Dashboard**: Built with Recharts, this modules visualizes e-waste generation growth trends and categories, including an **Impact Calculator** to log personal recycled items.
5. **Daily Eco Tips**: Interactive tips index pulling dynamic "Daily Highlights" with options to save or bookmark habits locally.
6. **Educational Articles Briefing**: Well-researched briefings concerning heavy metal soil leaching, urban mining benefits, and corporate Extended Producer Responsibility (EPR) laws.
7. **Recycling Drop Locator**: A localized routing guide displaying registered facilities with City and Device filters, alongside a simulated GPS map and directions engine.
8. **Quiz Challenge & Leaderboard**: An 8-level interactive multiple-choice quiz assigning custom badges ("Green Champion", "E-Waste Learner") that publishes scores to a live scoreboard.
9. **FAQ & Feedback form**: Interactive accordion-style help deck and verified contact ticket registry.
10. **Administrative Suite**: A secure console unlocked with a passphrase (hint: `admin`) to read incident tickets, mark them read/replied, and publish new tips dynamically into the system.

---

## 🛠️ Full-Stack Technical Stack

- **Frontend**: React 19, Tailwind CSS v4 (Base typography variables configured dynamically), Framer Motion (Animations imported from `motion/react`), Recharts.
- **Backend**: Node.js, Express.js.
- **Database Layer**: High-reliability file-based JSON collections (mocking MongoDB/Mongoose model query structures with `find`, `create`, `findByIdAndUpdate`, and seeding initial records dynamically).
- **Architecture**: MVC (Model-View-Controller) structure.

---

## 📂 Folder Structure

```text
├── .data/                       # Persistent JSON database storage (auto-seeded)
├── server/                      # Full-Stack Express Backend
│   ├── db/
│   │   └── jsonDb.ts            # Local CRUD database engine mimicking MongoDB
│   ├── models/
│   │   └── index.ts             # Seeding files & database models
│   ├── controllers/
│   │   └── apiController.ts     # MVC Controllers (Tips, Articles, Quiz, Contacts)
│   ├── routes/
│   │   └── apiRoutes.ts         # RESTful API endpoints router
│   ├── middleware/
│   │   └── auth.ts              # Simple header-based Admin authorization
│   └── utils/
│       └── knowledgeBase.ts     # Local Chatbot NLP search & keyword mapping
├── src/                         # Modern React Frontend
│   ├── components/
│   │   ├── AboutUs.tsx          # Vision & Mission overview
│   │   ├── AdminPanel.tsx       # Secured Administrative deck
│   │   ├── ArticlesViewer.tsx   # Briefings list & Modal Reader
│   │   ├── Chatbot.tsx          # Chat Assistant with suggested questions
│   │   ├── ContactForm.tsx      # Feedback tickets & Accordion FAQs
│   │   ├── Dashboard.tsx        # Recharts visual logs & Impact Calculator
│   │   ├── Identifier.tsx       # Drag-and-drop simulated optical scanner
│   │   ├── QuizModule.tsx       # Stepped Quiz console & high-scores scoreboard
│   │   ├── RecyclingGuide.tsx   # Verified recycling drop finder & simulated GPS routing
│   │   ├── ThemeToggle.tsx      # LocalStorage dark/light toggle
│   ├── App.tsx                  # Primary layouts & Navigation controller
│   ├── index.css                # Global styles, fonts, and theme maps
│   ├── main.tsx                 # React entry mount
│   └── types.ts                 # Type contracts shared between client and server
├── metadata.json                # Project settings & metadata
├── package.json                 # Core dependencies and Full-Stack scripts
├── server.ts                    # Coordinating Express server file (served in port 3000)
└── tsconfig.json                # TypeScript compilation parameters
```

---

## 🚀 Installation & Local Execution

### 1. Extract and Install Dependencies
Install all package configurations:
```bash
npm install
```

### 2. Run the Full-Stack Application
Start the unified Express + Vite server locally:
```bash
npm run dev
```
The server will boot and bind on **http://localhost:3000**.
- **API Endpoint**: Accessible under `/api` (e.g., `/api/health`, `/api/tips/daily`).
- **Web Interface**: Rich visual preview dynamically served from port 3000 with complete hot-reload capacities.

### 3. Production Build
Generate optimized bundle files:
```bash
npm run build
```
This command compiles static files under `/dist` and bundles the Express server to a compiled standalone CommonJS `dist/server.cjs` via `esbuild`.

To launch in production mode:
```bash
npm run start
```
https://ecobot-eight.vercel.app/
