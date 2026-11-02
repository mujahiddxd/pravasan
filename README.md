# ಪ್ರವಾಸನ್ • Pravasan
### ಒಂದು ರಾಜ್ಯ, ಹಲವು ಜಗತ್ತುಗಳು • One State, Many Worlds

> **A curated, dynamic Karnataka tour planning & operations engine.**  
> Dedicated to exploring the royal heritage, mist-covered Western Ghats, UNESCO stone monuments, wild elephant corridors, and golden Arabian Sea coastlines of Karunadu.

[![Karnataka Tourism Theme](https://img.shields.io/badge/Theme-Karunadu%20Tourism-E51919?style=flat-square&logo=googlemaps&logoColor=FFD700)](https://backend-w79p.vercel.app)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI%200.115-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2016-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![PostgreSQL](https://img.shields.io/badge/Database-Neon%20Postgres-00E699?style=flat-square&logo=postgresql)](https://neon.tech)
[![License: MIT](https://img.shields.io/badge/License-MIT-FFD700?style=flat-square)](LICENSE)

---

## 🏛️ Welcome to Karunadu (ಕರುನಾಡು ಪ್ರವಾಸ)

From the towering monolithic Vijayanagara ruins in **Hampi** to the illuminated grandeur of **Mysuru Palace**; from the coffee estates of **Chikkamagaluru & Coorg** to the serene beaches of **Gokarna & Murudeshwar**; from **Kabini & Bandipur** tiger reserves to the ancient rock-cut cave temples of **Badami & Pattadakal** — **Pravasan (ಪ್ರವಾಸನ್)** is built exclusively for authentic travel across Karnataka.

Two sides, one unified ecosystem:
1. **ಯಾತ್ರಿಕರು (Travellers)**: Discover 25 curated Karnataka circuits and 82 authentic activities, architect dynamic multi-stop road trips, inspect large 880px interactive Karnataka maps, calculate real-time group split expenses, and book local tours.
2. **ಟೂರ್ ಆಪರೇಟರ್‌ಗಳು (Tour Operators & Guides)**: Manage customer bookings, transport logistics, jungle safaris, local homestays, and field coordinators from a centralized dispatch console.

---

## 🚩 The Differentiator: Dynamic Karnataka Circuit Adaptation

Most travel planners assume a trip goes exactly to plan. **Pravasan** is engineered for the realities of travelling through the Western Ghats and Deccan plateau: sudden monsoon roadblocks, national park safari permit changes, train schedule shifts, or travellers wanting to spend an extra day in Gokarna.

Whenever a change is proposed — shifting days, swapping a homestay in Sakleshpur, cancelling a trek in Kudremukh — Pravasan computes an **instant costed impact report** before anyone commits:

| The Report Answers | Computed From |
|---|---|
| **What does it cost?** | Cancellation rules snapshotted onto the booking at purchase time |
| **What breaks?** | Route clashes, stranded Western Ghats cab transfers, homestays orphaned by a moved stop |
| **Can it be done?** | Live availability in Karnataka regional vendor books |
| **Does it suit this traveller?** | Stated pace, comfort tier, vegetarian/Udupi dietary needs, and adventure preferences |
| **What else could work?** | Ranked alternative Karnataka circuits, each with an explainable score breakdown |

### Handling Monsoons & Disruptions
Tour operators can fire a regional **disruption event** (e.g. *heavy rainfall in Agumbe/Charmadi Ghat*, *forest department closure in Bandipur*), and the engine immediately costs the blast radius:
- Every booked stop and activity at risk.
- Refund amounts guaranteed under agreed terms.
- Pre-ranked fallback routes (e.g. divert from coastal road to interior heritage highways).

---

## 🌿 Curated Karnataka Destinations & Activities

Pravasan includes **100% Karnataka-scoped seed data** integrated with the **Google Places API (New)** for verified, high-resolution CDN photography (`https://lh3.googleusercontent.com/...`):

| Region | Featured Destinations | Iconic Activities & Heritage |
|---|---|---|
| **Royal Heritage & Plains** | Mysuru, Bengaluru, Vijayapura, Bidar, Chitradurga | Mysore Palace illumination, Chamundi Hills, Devaraja Market walk, Gol Gumbaz whispering gallery, Bidriware silver inlay, Chitradurga 7-ring fort hike |
| **Western Ghats & Coffee Hills** | Coorg (Madikeri), Chikkamagaluru, Sakleshpur, Kudremukh | Mullayanagiri sunrise peak trek, Abbey Falls, coffee picking masterclass, Bisle Ghat viewpoint, Shola grassland trail |
| **Karavali (Coastal Karnataka)** | Gokarna, Karwar, Murudeshwar, Udupi, Mangaluru | Om Beach to Paradise Beach trek, Murudeshwar Shiva statue & gopura lift, Sri Krishna Matha temple darshan, Malpe St. Mary's Island boat cruise, authentic Udupi thali & Mangalorean seafood |
| **UNESCO Chalukya & Hoysala** | Hampi, Badami, Pattadakal & Aihole, Belur & Halebidu, Shravanabelagola | Stone chariot & Vittala temple, Tungabhadra coracle ride, Badami sandstone cave temples, Chennakeshava Hoysala architecture walk, Gommateshwara Bahubali 600-step climb |
| **Wildlife & Rainforests** | Kabini, Bandipur, Dandeli, Shivamogga & Jog Falls | Kabini River boat safari for elephant herds, Kali River white-water rafting, Jog Falls panoramic gorge view, Dandeli hornbill canopy trail |

---

## 🛠️ Technology Stack

| Component | Technology | Role |
|---|---|---|
| **Backend** | **FastAPI (Python 3.12)** | Asynchronous REST API, OpenAPI/Swagger docs at `/docs` |
| **ORM & Database** | **SQLAlchemy 2.0 (asyncpg) + Neon PostgreSQL** | Scalable serverless database with connection pooling |
| **Frontend** | **Next.js 16 (App Router) + React 19** | Server-side rendering, dynamic routes, TypeScript |
| **Styling & Theme** | **Tailwind CSS v4 + Neo-Brutalism** | Bold borders, sharp drop shadows, Karnataka red (`#E51919`) and yellow (`#FFD700`) accents |
| **Typography** | **Noto Sans Kannada + Space Grotesk** | Native, elegant Kannada script (`ಕನ್ನಡ ಲಿಪಿ`) and bold Latin headers |
| **Maps & Geospatial** | **Leaflet + Google Maps / Places API** | Enlarged 880px route viewports, custom polyline sequencing, streetview fallback |
| **Authentication** | **Clerk + JWT** | Google/Gmail one-click sign in, role-based access (Explorer, Operator, Coordinator) |
| **Hosting & CI/CD** | **Vercel** | Serverless backend API (`/api/v1`) and high-performance Next.js frontend |

---

## 🚀 Live Deployments

- **Backend API**: [https://backend-w79p.vercel.app](https://backend-w79p.vercel.app)
  - Root: `GET /` $\rightarrow$ `{"name":"Pravasan","status":"online"}`
  - Health: `GET /health` $\rightarrow$ `{"status":"ok"}`
  - Interactive Docs: [https://backend-w79p.vercel.app/docs](https://backend-w79p.vercel.app/docs)
  - Karnataka Destinations Search: [https://backend-w79p.vercel.app/api/v1/destinations/search](https://backend-w79p.vercel.app/api/v1/destinations/search)
- **Frontend App**: Deployed on Vercel with automatic route optimization and Google Places imagery.

---

## 💻 Local Setup & Development

### Prerequisites
- **Python 3.12+**
- **Node.js 20+**
- Hosted PostgreSQL on [Neon](https://neon.tech)

### 1. Backend Setup
```bash
cd backend
python -m venv .venv

# Windows
.\.venv\Scripts\python.exe -m pip install -r requirements.txt

# macOS / Linux
source .venv/bin/activate && pip install -r requirements.txt
```

Create `backend/.env` with your Neon database credentials:
```env
DATABASE_URL=postgresql+asyncpg://<username>:<password>@<neon-pooler-host>/neondb?ssl=require
SECRET_KEY=your-32-char-random-secret
ENVIRONMENT=development
DEBUG=true
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
GOOGLE_PLACES_API=AIzaSy...
```

Run migrations and launch the FastAPI server:
```bash
python -m alembic upgrade head
python -m app.seed.seed --demo
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

Start the Next.js development server:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 👥 Demo Personas

| Role | Email | Password | Persona & Workspace |
|---|---|---|---|
| **ಯಾತ್ರಿಕ (Traveller)** | `traveller@pravasan.in` | `Travel@123` | Karnataka vacationer planning circuits |
| **ಪ್ರವಾಸಿ (Explorer)** | `explorer@pravasan.in` | `Explore@123` | Backpacker exploring coastal Gokarna & Kudremukh |
| **ಟೂರ್ ಆಪರೇಟರ್ (Owner)** | `operator@pravasan.in` | `Operate@123` | Tour company owner managing bus departures & homestays |
| **ಸಂಯೋಜಕ (Coordinator)** | `coordinator@pravasan.in` | `Coord@123` | Field coordinator in Mysuru / Hampi handling disruptions |
| **ನಿರ್ವಾಹಕ (Admin)** | `admin@pravasan.in` | `Admin@123` | Platform catalogue administrator |

---

## 📜 Repository Structure

```text
pravasan/
├── backend/
│   ├── api/index.py         # Vercel serverless entry point
│   ├── app/
│   │   ├── core/            # Config, security, exceptions, response envelope
│   │   ├── db/              # SQLAlchemy async engine & declarative session
│   │   ├── models/          # 31 PostgreSQL data tables
│   │   ├── repositories/    # Database queries & search aggregations
│   │   ├── routers/         # REST API endpoints (destinations, trips, stops, etc.)
│   │   ├── schemas/         # Pydantic v2 schemas
│   │   └── seed/            # Curated Karnataka destinations.json & activities.json
│   ├── requirements.txt     # Python dependencies
│   └── vercel.json          # Backend serverless routing
│
├── frontend/
│   ├── src/
│   │   ├── app/             # App Router pages (explore, trips, operator, auth)
│   │   ├── components/      # Neo-Brutalist UI widgets, 880px trip-map, PravasanLogo
│   │   ├── lib/             # Place image resolver, auth state, API utilities
│   │   ├── services/        # Typed API service consumers
│   │   └── types/           # Shared TypeScript interfaces
│   ├── package.json         # Next.js 16 dependencies
│   └── vercel.json          # Frontend build configuration
│
├── render.yaml              # Alternative Render deployment blueprint
└── README.md                # Comprehensive Karnataka documentation
```

---

## 🎨 Cultural Motto & Credits

> **"ಸರ್ವ ಜನಾಂಗದ ಶಾಂತಿಯ ತೋಟ"** — *Rashtrakavi Kuvempu*  
> Dedicated to celebrating the diverse landscapes, art forms (Yakshagana, Dollu Kunitha), Hoysala architecture, and hospitality of Karnataka.

*Crafted with pride for Karnataka Tourism by [mujahiddxd](https://github.com/mujahiddxd).*
