<div align="center">

<!-- HERO BANNER -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=KPT%20Optimizer&fontSize=60&fontColor=fff&animation=fadeIn&fontAlignY=38&desc=Zomathon%20%7C%20Coding%20Ninjas%20%C3%97%20Eternal%20%7C%20Feb%202026&descAlignY=55&descAlign=50" alt="KPT Optimizer Banner" width="100%"/>

<br/>

<!-- BADGES ROW 1 -->
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)


<br/>

<h1>🍽️ Zomato KPT Optimizer</h1>

<h3><em>"Fixing food delivery, one data point at a time."</em></h3>

<p>
A full-stack <strong>multi-role simulation prototype</strong> built for India's biggest data hackathon —<br/>
addressing the root causes of inaccurate Kitchen Preparation Time (KPT) prediction<br/>
in real-world food delivery ecosystems.
</p>

<br/>

<!-- QUICK STATS ROW -->
<table>
  <tr>
    <td align="center"><b>🎯 Problem Domains</b><br/>3 Solved</td>
    <td align="center"><b>👤 User Roles</b><br/>Customer · Merchant · Rider</td>
    <td align="center"><b>⚡ Features</b><br/>7 Core Innovations</td>
    <td align="center"><b>🏆 Hackathon</b><br/>Coding Ninjas × Eternal</td>
  </tr>
</table>

<br/>

---

</div>

## 📋 Table of Contents

- [🔥 The Problem We Solved](#-the-problem-we-solved)
- [💡 Our Solution](#-our-solution)
- [✨ Features](#-features)
- [🎮 Live Demo](#-live-demo)
- [🏗️ Architecture](#️-architecture)
- [⚙️ How It Works](#️-how-it-works)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🗺️ Future Roadmap](#️-future-roadmap)
- [👥 The Team](#-the-team)
- [🏆 Acknowledgements](#-acknowledgements)

---

## 🔥 The Problem We Solved

> Modern food delivery platforms like Zomato collect billions of data points every day — yet fundamental gaps in **data integrity and real-world signal capture** cause cascading failures across the entire delivery pipeline.

We identified **3 critical, interconnected problem domains** that silently corrupt Kitchen Preparation Time (KPT) predictions:

<br/>

### ⚠️ Problem 1 — The "False Ready" Signal

```
[Timeline of a Corrupted Handover]

 12:00 PM  ── Order Placed
 12:12 PM  ── Rider dispatched (ETA: 10 min)
 12:18 PM  ── Rider arrives at restaurant
 12:19 PM  ── Merchant marks "Food Ready" ← FRAUDULENT SIGNAL
                (Food isn't actually ready. Merchant wants to avoid
                 Late Preparation penalty. Rider is already there.)
 12:26 PM  ── Food actually ready. 8-min wait recorded on rider end.
 12:27 PM  ── KPT model records: "Prep Time = 19 min" ← CORRUPTED DATA
                (Real prep time was 27 min. Model is now wrong.)
```

**Impact:** Model drift. False ETA predictions. Systematic underestimation of actual cook times.
**Root Cause:** No physical verification mechanism between "digital ready signal" and actual food handover.

---

### 📊 Problem 2 — The "Hidden Surge" (Invisible Kitchen Load)

```
What Zomato's KPT Model Sees:          What's Actually Happening:
┌──────────────────────────┐           ┌──────────────────────────────┐
│                          │           │  Zomato Orders:    8 active  │
│   8 Active Orders        │     vs    │  Swiggy Orders:    5 active  │
│   "Normal Load"          │           │  Walk-in Dine:     6 tables  │
│   KPT Prediction: 22min  │           │  Phone Orders:     3 active  │
│                          │           │  ─────────────────────────── │
└──────────────────────────┘           │  REAL Total:      22 orders  │
                                       │  Actual KPT:      ~48 min    │
                                       └──────────────────────────────┘
```

**Impact:** Wildly inaccurate ETA during peak hours. Customer dissatisfaction. Model blind spots.
**Root Cause:** Platform data silos. No mechanism for merchants to signal cross-platform demand surges.

---

### 🚴 Problem 3 — Rider Wait Time & Fleet Inefficiency

```
Cascading Effect Chain:
─────────────────────────────────────────────────────────────────────
Inaccurate KPT          →   Rider dispatched too early
Rider dispatched early  →   Rider arrives before food is ready
Rider waits at kitchen  →   Rider earnings drop; frustration increases
Merchant sees rider     →   Merchant marks food "ready" prematurely
Premature signal        →   Problem 1 repeats → Data corrupted again
─────────────────────────────────────────────────────────────────────
```

**Impact:** Reduced rider earnings, higher customer ETAs, platform inefficiency, compounding data corruption.

---

## 💡 Our Solution

We built a **three-layered data integrity and operational transparency system** that works from the ground up:

<br/>

<div align="center">

| Problem | Our Solution | Mechanism |
|:-------:|:------------:|:---------:|
| ⚠️ False Ready Signal | **Location-Gated OTP Handover** | OTP only unlocks when rider is ≤ 50m away. Merchant must verify physically. |
| 📊 Hidden Surge | **Merchant Rush Mode Toggle** | Merchants signal overload manually; system adjusts KPT with incentive alignment. |
| 🚴 Rider Wait Time | **Dynamic KPT Recalibration** | KPT auto-adjusts based on rush state; riders get accurate arrival windows. |

</div>

<br/>

> **Philosophy:** Don't try to infer what you can't see. Instead, build **lightweight feedback mechanisms** that let ground-truth data flow into the system from the humans who have it.

---

## ✨ Features

### 🔐 1. Location-Gated OTP Handover System

The crown jewel of our solution. Inspired by banking-grade OTP systems, adapted for the last-mile delivery context.

**How it works:**
- When a merchant marks food "Ready," a **4-digit OTP is generated** server-side
- The OTP is **hidden from the rider** until they are within **50 metres** of the restaurant
- Only after GPS proximity is confirmed does the OTP appear on the rider's screen
- The merchant enters the OTP received from the rider to **complete the handover**
- This creates an **immutable, time-stamped proof** of physical handover

```
Rider App (Distance > 50m):          Rider App (Distance ≤ 50m):
┌────────────────────────────┐        ┌────────────────────────────┐
│                            │        │                            │
│  🔒 OTP Hidden             │   →    │  ✅ Your Handover OTP:     │
│                            │  moves │                            │
│  Reach within 50m to       │  closer│       [ 7 4 2 8 ]          │
│  view OTP                  │        │                            │
│                            │        │  ⚠️  Expires in 5:00       │
└────────────────────────────┘        └────────────────────────────┘
```

**Why this works:** A merchant cannot fake giving food to a rider who hasn't physically arrived. Data integrity is restored at the point of handover.

---

### 🔥 2. Rush Mode Toggle with Smart Incentive Design

A merchant-controlled signal that communicates real-world kitchen load to the platform — without requiring hardware sensors.

**Mechanism:**
- Merchant toggles **"Rush Mode ON"** when kitchen is overwhelmed (offline orders, walk-ins, etc.)
- Platform immediately adjusts KPT prediction: **30 min → 45 min** for incoming orders
- Customer sees a live **"High Demand at Kitchen"** warning before placing orders → better-informed decisions
- **Penalty exemption:** Merchants who activate Rush Mode are exempt from Late Prep penalties

**Incentive Alignment:**
```
Without Rush Mode:  Late order → Penalty charged to merchant
With Rush Mode:     Late order → Penalty waived (merchant was honest)
Abuse of mode:      System tracks frequency; repeated abuse flags merchant for audit
```

This creates a **self-correcting incentive loop** — merchants are rewarded for honest signal reporting.

---

### ⚡ 3. Real-Time Automated Penalty Engine

A background accountability system that monitors three types of violations every 5 seconds:

```typescript
// Three Penalty Triggers (simplified):

// 1. Late Prep without Rush Mode
if (status === 'preparing' && elapsedMinutes > expectedPrepTime && !isRushHourOrder)
  → Penalty: "Late Prep (Rush Mode Not Used)"

// 2. Premature Ready Signal
if (status === 'ready_for_pickup' && riderDistance > 500m && waitingTooLong)
  → Penalty: "Premature Ready Signal Detected"

// 3. Handover Delay
if (status === 'handover_pending' && merchantDelayedOtpVerification)
  → Penalty: "Handover Delay (Rider Waiting)"
```

All penalties are **visible across all role views** — creating shared accountability.

---

### 🎭 4. Multi-Role Simulation Dashboard

Three fully-realised role perspectives, all synchronized through a shared state layer:

<div align="center">

| 👛 Customer View | 🍳 Merchant Kitchen | 🏍️ Rider Dashboard |
|:---:|:---:|:---:|
| Browse restaurants | Live order queue | Map-based navigation |
| Rush Hour warnings | Rush Mode toggle | Distance slider (GPS sim) |
| Live rider tracking | Rider proximity display | OTP reveal system |
| 7-state order timeline | OTP verification | Arrival trigger |
| Transparent ETAs | Penalty indicators | Real-time food status |

</div>

All three views update in real-time — when a merchant toggles Rush Mode, the customer sees the warning immediately. When a rider moves closer, the merchant's dashboard updates their proximity indicator instantly.

---

### 📍 5. Live Order State Machine

```
Order Lifecycle (7 States):

  [placed] ──→ [preparing] ──→ [ready_for_pickup] ──→ [rider_arrived]
                                       │                      │
                                       └──────────────────────┘
                                              ↓
                                    [handover_pending]
                                              ↓
                                         [picked_up]
                                              ↓
                                         [delivered]
```

Each state transition is guarded by real-world conditions (rider proximity, OTP verification), not just button clicks.

---

### 📊 6. KPT Transparency for Customers

Customers are no longer left guessing. The platform now:
- Shows a **live rush indicator** when kitchen load is high
- Adjusts displayed ETA upfront instead of delivering a "sorry for the delay" notification
- Displays real-time rider proximity as a progress bar
- Tags orders placed during rush with a transparent **"Rush Hour Order"** badge

---

### 🛡️ 7. Data-Integrity-First Design

Every feature is designed around a core principle: **don't let bad data enter the system**.

- Handover is physically verified (OTP + proximity)
- KPT data is context-tagged (rush vs non-rush)
- Premature signals are flagged and penalized before they corrupt model training data
- All timestamps are event-driven, not merchant-controlled

---

## 🎮 Live Demo

<div align="center">

🌐 **[Launch the Live App →](https://zomathon-three.vercel.app/)**

</div>

> The app is deployed on **Google AI Studio (Cloud Run)**. No login required — just open and explore.

**Suggested Demo Flow for Maximum Impact:**

```
Step 1: Open Customer View → Browse "Biryani Blues" → Place an order
Step 2: Switch to Merchant View → Notice the order appearing in "Preparing Now"
Step 3: In Merchant View → Toggle "Rush Mode ON" → Switch back to Customer
         → Observe the orange Rush Hour banner appear on the restaurant page
Step 4: Switch to Rider View → Drag the distance slider closer to the restaurant
Step 5: Switch to Merchant View → Notice "Rider is X km away" update live
Step 6: In Rider View → Move slider to 0 km → Switch to Merchant
         → Click "Mark Food Ready" → Enter the OTP that appears on Rider screen
Step 7: Watch the order status flow through all 7 states across all views
```

---

## 🏗️ Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         NEXT.JS 15 APP ROUTER                           │
│                                                                         │
│   ┌─────────────┐   ┌────────────────┐   ┌──────────────────────────┐  │
│   │  /customer  │   │   /merchant    │   │        /rider            │  │
│   │  page.tsx   │   │   page.tsx     │   │       page.tsx           │  │
│   └──────┬──────┘   └───────┬────────┘   └──────────┬───────────────┘  │
│          │                  │                        │                  │
│          └──────────────────┼────────────────────────┘                  │
│                             │                                           │
│                    ┌────────▼─────────┐                                 │
│                    │ SimulationContext │  ← Single Source of Truth      │
│                    │  (React Context) │                                 │
│                    │                  │                                 │
│                    │  • orders[]      │                                 │
│                    │  • isRushHour    │                                 │
│                    │  • placeOrder()  │                                 │
│                    │  • markReady()   │                                 │
│                    │  • verifyOtp()   │                                 │
│                    │  • penaltyEngine │                                 │
│                    └──────────────────┘                                 │
│                                                                         │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │                    Shared Components                             │  │
│   │   RoleSwitcher (Fixed Nav)    │    lib/data.ts (Restaurant DB)  │  │
│   └──────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │    Google AI Studio          │
                    │    (Cloud Run Deployment)    │
                    │    + Gemini API (AI Layer)   │
                    └─────────────────────────────┘
```

### Data Flow Diagram

```
Customer places order
        │
        ▼
placeOrder() called in SimulationContext
        │
        ├── KPT set to 30 min (normal) OR 45 min (rush)
        ├── isRushHourOrder flag tagged
        ├── riderDistance initialized to 2,000m
        └── Order pushed to orders[] state
                │
    ┌───────────┼────────────────┐
    ▼           ▼                ▼
Customer      Merchant         Rider
sees order    sees it in       receives
in Orders     "Preparing Now"  assignment
    │               │                │
    │         marks food ready       │
    │               │          slides closer
    │               ▼                │
    │         [isRiderClose?]        │
    │          ├── YES → handover_pending + OTP generated
    │          └── NO  → ready_for_pickup (penalty timer starts)
    │                         │
    │               OTP revealed only when
    │               riderDistance < 100m
    │                         │
    │               Merchant verifies OTP
    │                         │
    ▼                         ▼
Status updates        Order → picked_up
flow to all                    │
role views            Customer sees
                      "Out for Delivery"
```

---

## ⚙️ How It Works

### The OTP Handover — Step by Step

```
MERCHANT SIDE                              RIDER SIDE
─────────────                              ──────────
                                           
1. Rider assigned to order                 1. Rider starts 2km away
   (starts 2km away)                          OTP Panel: 🔒 HIDDEN
                                           
2. Merchant sees:                          2. Rider moves closer...
   "Rider is 1.8km away"                      OTP Panel: 🔒 HIDDEN
                                           
3. Merchant marks                          3. Rider reaches < 50m
   "Food Ready" →                             OTP Panel: ✅ REVEALED
   OTP: 7428 (internal)                       Shows: [ 7 4 2 8 ]
                                           
4. Merchant sees OTP                       4. Rider shows OTP to
   entry field appears:                       merchant verbally/visually
   [____] Enter Rider OTP                  
                                           
5. Merchant enters 7428                    5. Status flips:
   → Verify & Handover                        "Order Picked Up"
   → ✅ Success                               Rider heads to customer
```

### The Rush Mode Lifecycle

```
Normal State:                    Rush Mode Active:
────────────                     ────────────────
KPT Model: 30 min base          KPT Model: 45 min base (+50%)
Customer: No banner             Customer: 🟠 Rush Hour warning
Penalty: Full applies           Penalty: Late prep waived
Data Tag: isRushHour=false      Data Tag: isRushHour=true
                                Model Training: Rush-adjusted
```

---

## 🛠️ Tech Stack

<div align="center">

### Core Framework

| Technology | Version | Role |
|:---:|:---:|:---:|
| ![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js) | 15.4.9 | App framework, routing, SSR |
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) | 19.2.1 | UI rendering, component model |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | 5.9.3 | Static typing, interfaces |

### Styling & Animation

| Technology | Version | Role |
|:---:|:---:|:---:|
| ![TailwindCSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) | 4.1.11 | Utility-first styling |
| ![Framer Motion](https://img.shields.io/badge/Motion-black?style=flat-square&logo=framer) | 12.23.24 | Animations, AnimatePresence |
| ![Lucide](https://img.shields.io/badge/Lucide_React-F56565?style=flat-square) | 0.553.0 | Icon system |

### AI & Infrastructure

| Technology | Version | Role |
|:---:|:---:|:---:|
| ![Google AI](https://img.shields.io/badge/Google_Gemini-4285F4?style=flat-square&logo=google&logoColor=white) | 1.17.0 | AI-powered KPT prediction layer |
| ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black) | 15.0.0 | Deployment tooling |
| ![Google Cloud](https://img.shields.io/badge/Cloud_Run-4285F4?style=flat-square&logo=googlecloud&logoColor=white) | — | Production hosting |

### Developer Experience

| Technology | Role |
|:---:|:---:|
| `next/font` (Inter + JetBrains Mono) | Typography system |
| `clsx` + `tailwind-merge` | Conditional class handling |
| `ESLint` + `tsconfig` strict mode | Code quality |
| `output: 'standalone'` | Container-optimized build |

</div>

---

## 📁 Project Structure

```
Zomathon-hackathon/
│
├── 📂 app/                          # Next.js App Router pages
│   ├── 📄 layout.tsx                # Root layout + SimulationProvider wrapper
│   ├── 📄 page.tsx                  # Landing page with role selection cards
│   ├── 📂 customer/
│   │   └── 📄 page.tsx              # Customer: Browse, order, track
│   ├── 📂 merchant/
│   │   └── 📄 page.tsx              # Merchant: Kitchen dashboard, rush mode, OTP
│   └── 📂 rider/
│       └── 📄 page.tsx              # Rider: Map view, distance sim, OTP reveal
│
├── 📂 components/
│   ├── 📄 simulation-context.tsx    # 🧠 Core: Global state, business logic, penalties
│   └── 📄 role-switcher.tsx         # Fixed floating navigation pill
│
├── 📂 lib/
│   ├── 📄 data.ts                   # Restaurant & menu data (4 restaurants, typed)
│   └── 📄 utils.ts                  # cn() utility (clsx + tailwind-merge)
│
├── 📂 hooks/
│   └── 📄 use-mobile.ts             # Responsive breakpoint detection hook
│
├── 📄 metadata.json                 # AI Studio applet configuration
├── 📄 next.config.ts                # Next.js config (standalone, image domains)
├── 📄 package.json                  # Dependencies
├── 📄 tsconfig.json                 # TypeScript configuration
├── 📄 .env.example                  # Environment variable reference
└── 📄 README.md                     # You are here 👋
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

```bash
node >= 18.0.0
npm >= 9.0.0
```

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Zomathon-hackathon.git
cd Zomathon-hackathon
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Then open `.env.local` and fill in:

```env
# Required for AI-powered KPT features
GEMINI_API_KEY="your_gemini_api_key_here"

# Auto-injected by AI Studio in production; set to localhost for development
APP_URL="http://localhost:3000"
```

> 💡 Get a free Gemini API key at [aistudio.google.com](https://aistudio.google.com)

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Explore the App

Navigate between the three role views:

| Route | Role | What to explore |
|:---:|:---:|:---|
| `/` | — | Landing page with problem overview |
| `/customer` | 🛍️ Customer | Browse restaurants, place an order, track delivery |
| `/merchant` | 🍳 Merchant | Toggle Rush Mode, mark food ready, verify OTP |
| `/rider` | 🚴 Rider | Simulate approaching restaurant, view OTP, trigger arrival |

### Production Build

```bash
npm run build
npm start
```

### Deploy to Firebase / Cloud Run

```bash
npm install -g firebase-tools
firebase login
firebase deploy
```

---

## 🗺️ Future Roadmap

We built this as a prototype under hackathon constraints. Here's what we'd build next:

<details>
<summary><b>🔵 Phase 1 — Real Data Integration (Click to expand)</b></summary>

- [ ] **Live Gemini AI KPT Prediction** — Replace the hardcoded 30/45 min model with a real Gemini API call that factors in: order complexity, time of day, kitchen history, and Rush Mode state
- [ ] **Browser Geolocation API** — Replace the distance slider with actual GPS coordinates for the rider view
- [ ] **WebSocket Real-Time Sync** — Replace React Context with WebSocket/Supabase Realtime so the app works across multiple physical devices simultaneously

</details>

<details>
<summary><b>🟡 Phase 2 — Platform Intelligence (Click to expand)</b></summary>

- [ ] **Computer Vision Kitchen Load** — Camera-based passive telemetry to automatically estimate kitchen occupancy (hardware-lite: uses existing CCTV)
- [ ] **Historical Rush Pattern Learning** — ML model trained on merchant Rush Mode usage history to proactively suggest toggling during predicted surge windows
- [ ] **Cross-Platform Demand Aggregation** — API integrations with Swiggy, POS systems, and offline order tracking to give Zomato's KPT model full kitchen load visibility
- [ ] **P90 Error Rate Dashboard** — Analytics panel showing KPT prediction accuracy before and after Rush Mode adoption

</details>

<details>
<summary><b>🟢 Phase 3 — Ecosystem Scale (Click to expand)</b></summary>

- [ ] **Rider ETA Optimization Engine** — Dispatch riders only when food will be ready within their travel window (not before)
- [ ] **Merchant Accountability Score** — Reputation system based on Rush Mode usage honesty, OTP delay times, and false-ready frequency
- [ ] **Customer Preference Engine** — Let customers opt-in to "Rush Hour Pricing" for guaranteed slots with honest ETAs
- [ ] **Open API for Restaurant POS Systems** — Allow restaurant POS software to auto-signal Rush Mode based on active table count

</details>

---

## 👥 The Team

<div align="center">

*Built with ☕, 🔥, and a lot of debugging at 2 AM for Zomathon 2026.*

<br/>

<table>
  <tr>
    <td align="center" width="250px">
      <br/>
      <b>Aman Aaryan</b>
      <br/>
      <sub>Full Stack Development</sub>
      <br/>
      <sub>System Architecture · UI/UX Design</sub>
      <br/><br/>
      <a href="https://github.com/thestethoguy"><img src="https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white"/></a>
      <a href="https://www.linkedin.com/in/aman-a-54034a202/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white"/></a>
    </td>
    <td align="center" width="250px">
      <br/>
      <b>Priyam Prakash</b>
      <br/>
      <sub>Product Design & Strategy</sub>
      <br/>
      <sub>Problem Research · Feature Design</sub>
      <br/><br/>
      <a href="https://github.com/PriyamPrakash12"><img src="https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white"/></a>
      <a href="https://www.linkedin.com/in/priyam-prakash-660bb6307/><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white"/></a>
    </td>
    <td align="center" width="250px">
      <br/>
      <b>Ashish Kumar</b>
      <br/>
      <sub>Data Engineering & AI</sub>
      <br/>
      <sub>Business Logic · Penalty Engine</sub>
      <br/><br/>
      <a href="https://github.com/ashishkumar"><img src="https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white"/></a>
      <a href="https://www.linkedin.com/in/ashish-kumar-838509364/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white"/></a>
    </td>
  </tr>
</table>

</div>

---

## 🏆 Acknowledgements

<div align="center">

| | |
|:---:|:---|
| 🎯 | **[Coding Ninjas 10X Club](https://www.codingninjas.com/landing/10x-club/)** — For organising Zomathon and creating a platform for real-world problem solving |
| 🤝 | **[Eternal](https://blockseblock.com/hackathon_details/Zomathon)** — For partnering on India's biggest data hackathon |
| 🍕 | **[Zomato](https://www.zomato.com/)** — For the real-world problem domain that inspired this solution |
| ⚡ | **[Google AI Studio](https://aistudio.google.com/)** — For the development and deployment platform |
| 🌊 | **[Vercel / Next.js Team](https://nextjs.org/)** — For Next.js 15 and the App Router paradigm |

</div>

---

<div align="center">

### 💬 The Philosophy Behind This Project

> *"The best solutions to data problems aren't always algorithmic.*
> *Sometimes, you just need to design a system where lying becomes harder than telling the truth."*

<br/>

**If this project helped you or gave you ideas, drop a ⭐ on the repo!**

<br/>

---

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" width="100%"/>

*Made with ❤️ in India · Zomathon 2026 · Team KPT Optimizer*

</div>
