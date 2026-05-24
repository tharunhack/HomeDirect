# EstateX 🏠⚡
**India's Most Advanced Zero-Brokerage Real Estate Platform**

A stunning 2026-style real estate website inspired by NoBroker, built with Next.js 14, TypeScript, and Tailwind CSS.

---

## ✨ Features

- **Futuristic Dark UI** — Custom cursor, animated blobs, scan lines, noise texture, glitch effects
- **Zero Brokerage Model** — Browse freely, pay ₹1,000 one-time to contact owners
- **Auth + Payment Modal** — Triggered when user tries to buy/sell/contact
- **6 Featured Property Cards** — With hover effects, like button, verified badges
- **Responsive Design** — Mobile-first, works on all screen sizes
- **Animated Hero** — Floating particles, morphing blobs, glitch headline
- **Smooth Scroll & Transitions** — CSS animations throughout

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### 1. Install dependencies
```bash
cd estatex
npm install
```

### 2. Run development server
```bash
npm run dev
```

### 3. Open in browser
```
http://localhost:3000
```

---

## 📁 Project Structure

```
estatex/
├── app/
│   ├── globals.css          # Global styles, custom cursor, animations
│   ├── layout.tsx           # Root layout with Google Fonts
│   └── page.tsx             # Main homepage
├── components/
│   ├── Navbar.tsx           # Sticky navigation bar
│   ├── AuthModal.tsx        # Login/Signup + ₹1,000 payment modal
│   └── PropertyCard.tsx     # Individual property listing card
├── public/                  # Static assets
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 💡 How the Auth Flow Works

1. **Browsing** — Users can see all listings, hero, stats, testimonials freely
2. **Buy/Contact** — Clicking "Contact Owner" or "Buy" triggers Login modal
3. **Sell/List** — Clicking "List Property" triggers Signup flow
4. **Payment** — After signup, user is shown ₹1,000 one-time membership screen
5. **Success** — On payment, user gets full platform access

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary | `#FF4D1C` (Ember orange) |
| Accent | `#00E5CC` (Aqua) |
| Background | `#040608` (Void) |
| Surface | `#0C0F14` |
| Panel | `#111620` |
| Font Display | Syne (Google Fonts) |
| Font Body | DM Sans (Google Fonts) |

---

## 🛠️ Build for Production

```bash
npm run build
npm start
```

---

## 📦 Tech Stack

- **Next.js 14** — App Router
- **TypeScript** — Full type safety
- **Tailwind CSS** — Utility styling
- **Lucide React** — Icons
- **Google Fonts** — Syne + DM Sans

---

Made with ❤️ for EstateX 2026
